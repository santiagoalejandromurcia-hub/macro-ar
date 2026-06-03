// ============================================================
// GET /api/embi — EMBI Argentina calculado internamente
//
// Fuentes:
//   • Precios de bonos: data912.com (mercado local, tiempo real)
//   • Curva de Treasuries: Treasury.gov (XML API)
//   • Cash flows: prospectos oficiales / SEC (hardcoded en definitions.ts)
//
// Metodología: Stripped spread = YTM_bono - Treasury_por_duración
// Ponderación: por monto outstanding (market cap approx.)
// Compatible con metodología EMBIGD de JP Morgan.
// ============================================================

import { NextResponse } from 'next/server';
import { EMBI_BONDS }    from '@/lib/bonds/definitions';
import {
  calcYTM,
  calcModifiedDuration,
  calcStrippedSpread,
} from '@/lib/bonds/calculator';
import { fetchTreasuryCurve } from '@/lib/bonds/treasury';

const DATA912_URL = 'https://data912.com/live/arg_bonds';

export interface BondResult {
  ticker: string;
  isin: string;
  maturityYear: number;
  price: number;              // USD por 100 VN remanente, mid (bid+ask)/2
  priceChange: number;        // % cambio en el día
  ytm: number | null;         // Yield to Maturity anual en % — null si amortizando
  duration: number | null;    // Duración modificada (años) — null si amortizando
  treasuryRef: number | null; // Treasury de referencia en % — null si amortizando
  spread: number | null;      // Stripped spread en bps — null si amortizando
  outstanding: number;        // Outstanding aprox. en USD millones
  embiEligible: boolean;      // false = precio distorsionado por amortización parcial
}

export interface EmbiResponse {
  embi: number;          // EMBI ponderado en bps
  bonds: BondResult[];
  treasuryCurve: Record<string, number>; // % formateado
  timestamp: string;
  source: 'calculated' | 'fallback';
}

export async function GET() {
  try {
    const settleDate = new Date();

    // ── 1. Precios de bonos desde data912 ──────────────────────────────
    const [priceRes, curve] = await Promise.all([
      fetch(DATA912_URL, { cache: 'no-store' }),
      fetchTreasuryCurve(),
    ]);

    if (!priceRes.ok) {
      return NextResponse.json({ error: 'data912 unavailable' }, { status: 503 });
    }

    type Data912Item = {
      symbol: string;
      px_bid: number;
      px_ask: number;
      c: number;
      pct_change: number;
    };

    const priceData: Data912Item[] = await priceRes.json();
    const priceMap = new Map(priceData.map((b) => [b.symbol, b]));

    if (!curve) {
      return NextResponse.json({ error: 'Treasury curve unavailable' }, { status: 503 });
    }

    // ── 2. Calcular YTM y spread para cada bono ────────────────────────
    // GD29/GD30 excluidos del cómputo EMBI: ya amortizaron parcialmente y
    // el precio de data912 es por $100 VN *remanente*, lo que distorsiona
    // el YTM. Se muestran en la tabla pero con spread = null.
    const EMBI_ELIGIBLE = new Set(['GD35D', 'GD38D', 'GD41D', 'GD46D']);
    const bonds: BondResult[] = [];

    for (const bond of EMBI_BONDS) {
      const p = priceMap.get(bond.ticker);
      if (!p) continue;

      // Precio mid en USD (data912 "D" variant ya viene en USD)
      const price = (p.px_bid + p.px_ask) / 2;
      if (price <= 0 || price > 200) continue;

      const isEligible = EMBI_ELIGIBLE.has(bond.ticker);

      // Solo calculamos YTM/spread para bonos largos (sin amortización aún)
      let ytm = 0, duration = 0, tsy = 0, spread: number | null = null;
      if (isEligible) {
        ytm      = calcYTM(price, bond.cashFlows, settleDate);
        duration = calcModifiedDuration(price, bond.cashFlows, settleDate);
        tsy      = interpolate(duration, curve);
        spread   = calcStrippedSpread(ytm, duration, curve);
      }

      bonds.push({
        ticker:       bond.ticker.replace('D', ''),
        isin:         bond.isin,
        maturityYear: bond.maturity.getUTCFullYear(),
        price:        Math.round(price * 100) / 100,
        priceChange:  Math.round(p.pct_change * 100) / 100,
        ytm:          isEligible ? Math.round(ytm * 10000) / 100 : null,
        duration:     isEligible ? Math.round(duration * 100) / 100 : null,
        treasuryRef:  isEligible ? Math.round(tsy * 10000) / 100 : null,
        spread,
        outstanding:  bond.outstandingM,
        embiEligible: isEligible,
      });
    }

    if (bonds.length === 0) {
      return NextResponse.json({ error: 'No bond data available' }, { status: 503 });
    }

    // ── 3. EMBI ponderado por outstanding (solo bonos elegibles) ──────
    const eligibleBonds = bonds.filter((b) => b.embiEligible && b.spread !== null);
    const totalOutstanding = eligibleBonds.reduce((s, b) => s + b.outstanding, 0);
    const embi = eligibleBonds.length > 0
      ? Math.round(
          eligibleBonds.reduce(
            (s, b) => s + (b.spread as number) * (b.outstanding / totalOutstanding),
            0,
          ),
        )
      : 0;

    // ── 4. Formatear curva de Treasuries para el cliente ──────────────
    const treasuryCurveFormatted: Record<string, number> = {};
    for (const [tenor, yld] of Object.entries(curve)) {
      treasuryCurveFormatted[`${tenor}y`] = Math.round(Number(yld) * 10000) / 100;
    }

    const response: EmbiResponse = {
      embi,
      bonds,
      treasuryCurve: treasuryCurveFormatted,
      timestamp: new Date().toISOString(),
      source: 'calculated',
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',
        'X-EMBI-Method': 'stripped-spread-ytm',
        'X-EMBI-Bonds':  bonds.map((b) => b.ticker).join(','),
      },
    });
  } catch (err) {
    console.error('[/api/embi]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function interpolate(t: number, curve: Record<number, number>): number {
  const keys = Object.keys(curve).map(Number).sort((a, b) => a - b);
  if (keys.length === 0) return 0;
  if (t <= keys[0]) return curve[keys[0]];
  if (t >= keys[keys.length - 1]) return curve[keys[keys.length - 1]];
  for (let i = 0; i < keys.length - 1; i++) {
    const lo = keys[i], hi = keys[i + 1];
    if (t >= lo && t <= hi) {
      const r = (t - lo) / (hi - lo);
      return curve[lo] + r * (curve[hi] - curve[lo]);
    }
  }
  return curve[keys[keys.length - 1]];
}
