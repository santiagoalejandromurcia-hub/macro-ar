// ============================================================
// GET /api/embi — EMBI Argentina calculado internamente
//
// Fuentes:
//   • Precios de bonos: data912.com (mercado local, tiempo real)
//   • Curva de Treasuries: Treasury.gov (XML API)
//   • Cash flows: prospectos oficiales / SEC (hardcoded en definitions.ts)
//
// Metodología (idéntica a EMBIGD JP Morgan):
//   spread_i   = YTM_bono_i − Treasury_interpolado(duración_i)
//   Spread_BT  = Σ(spread_i × outstanding_i) ÷ Σ(outstanding_i)
//   Variación  = Spread_BT_ahora − Spread_BT_cierre_ayer
//
// Bonos elegibles: GD35, GD38, GD41, GD46 (ley NY, >$500M, sin amort. aún)
// GD29/GD30 en tabla solo (precio distorsionado por amort. parcial)
// ============================================================

import { NextResponse } from 'next/server';
import { EMBI_BONDS }    from '@/lib/bonds/definitions';
import {
  calcYTM,
  calcModifiedDuration,
  calcStrippedSpread,
} from '@/lib/bonds/calculator';
import { fetchTreasuryCurve, type TreasuryCurve } from '@/lib/bonds/treasury';

const DATA912_LIVE = 'https://data912.com/live/arg_bonds';
const DATA912_HIST = (ticker: string) =>
  `https://data912.com/historical/bonds/${ticker}`;

// Bonos cuyo precio es confiable vs $100 VN (no amortizando aún)
const EMBI_ELIGIBLE = new Set(['GD35D', 'GD38D', 'GD41D', 'GD46D']);

export interface BondResult {
  ticker: string;
  isin: string;
  maturityYear: number;
  price: number;              // USD por 100 VN, mid (bid+ask)/2
  priceClose: number | null;  // Precio cierre ayer (data912 histórico)
  priceChange: number;        // % cambio intradía
  ytm: number | null;         // YTM anual en % — null si amortizando
  ytmClose: number | null;    // YTM al cierre ayer — null si amortizando
  duration: number | null;    // Duración modificada (años)
  treasuryRef: number | null; // Treasury interpolado en %
  spread: number | null;      // Spread actual en bps
  spreadClose: number | null; // Spread cierre ayer en bps
  outstanding: number;        // Outstanding aprox. en USD millones
  embiEligible: boolean;
}

export interface EmbiResponse {
  embi: number;               // Spread_BT ponderado actual (bps)
  embiClose: number | null;   // Spread_BT ponderado ayer al cierre (bps)
  embiDelta: number | null;   // Variación = embi - embiClose (bps)
  bonds: BondResult[];
  treasuryCurve: Record<string, number>;
  timestamp: string;
  source: 'calculated';
}

export async function GET() {
  try {
    const settleDate = new Date();

    // ── 1. Fetch paralelo: precios live + curva Treasuries ─────────────
    const [priceRes, curve] = await Promise.all([
      fetch(DATA912_LIVE, { cache: 'no-store' }),
      fetchTreasuryCurve(),
    ]);

    if (!priceRes.ok) {
      return NextResponse.json({ error: 'data912 unavailable' }, { status: 503 });
    }
    if (!curve) {
      return NextResponse.json({ error: 'Treasury curve unavailable' }, { status: 503 });
    }

    type LiveItem = { symbol: string; px_bid: number; px_ask: number; c: number; pct_change: number };
    const priceData: LiveItem[] = await priceRes.json();
    const priceMap = new Map(priceData.map((b) => [b.symbol, b]));

    // ── 2. Fetch histórico (cierre ayer) para bonos elegibles ──────────
    // Solo los 4 bonos elegibles necesitan el historial para la variación
    const histResults = await Promise.allSettled(
      [...EMBI_ELIGIBLE].map(async (ticker) => {
        const res = await fetch(DATA912_HIST(ticker), { cache: 'no-store' });
        if (!res.ok) return { ticker, closePrice: null };
        type Candle = { date: string; o: number; h: number; l: number; c: number };
        const candles: Candle[] = await res.json();
        // Última vela = hoy (parcial), anteúltima = cierre ayer
        const idx = candles.length >= 2 ? candles.length - 2 : candles.length - 1;
        return { ticker, closePrice: candles[idx]?.c ?? null };
      }),
    );

    const closePriceMap = new Map<string, number | null>();
    for (const r of histResults) {
      if (r.status === 'fulfilled') {
        closePriceMap.set(r.value.ticker, r.value.closePrice);
      }
    }

    // ── 3. Calcular spreads (actual y cierre) para cada bono ──────────
    const bonds: BondResult[] = [];

    for (const bond of EMBI_BONDS) {
      const live = priceMap.get(bond.ticker);
      if (!live) continue;

      const price = (live.px_bid + live.px_ask) / 2;
      if (price <= 0 || price > 200) continue;

      const isEligible = EMBI_ELIGIBLE.has(bond.ticker);
      const closePrice = closePriceMap.get(bond.ticker) ?? null;

      let ytm:       number | null = null;
      let ytmClose:  number | null = null;
      let duration:  number | null = null;
      let tsy:       number | null = null;
      let spread:    number | null = null;
      let spreadClose: number | null = null;

      if (isEligible) {
        // Spread actual
        const y   = calcYTM(price, bond.cashFlows, settleDate);
        const dur = calcModifiedDuration(price, bond.cashFlows, settleDate);
        const t   = interpolate(dur, curve);

        ytm      = Math.round(y * 10000) / 100;
        duration = Math.round(dur * 100) / 100;
        tsy      = Math.round(t * 10000) / 100;
        spread   = calcStrippedSpread(y, dur, curve);

        // Spread cierre ayer
        if (closePrice !== null) {
          const yc  = calcYTM(closePrice, bond.cashFlows, settleDate);
          const durc = calcModifiedDuration(closePrice, bond.cashFlows, settleDate);
          ytmClose   = Math.round(yc * 10000) / 100;
          spreadClose = calcStrippedSpread(yc, durc, curve);
        }
      }

      bonds.push({
        ticker:       bond.ticker.replace('D', ''),
        isin:         bond.isin,
        maturityYear: bond.maturity.getUTCFullYear(),
        price:        Math.round(price * 100) / 100,
        priceClose:   closePrice !== null ? Math.round(closePrice * 100) / 100 : null,
        priceChange:  Math.round(live.pct_change * 100) / 100,
        ytm,
        ytmClose,
        duration,
        treasuryRef: tsy,
        spread,
        spreadClose,
        outstanding:  bond.outstandingM,
        embiEligible: isEligible,
      });
    }

    if (bonds.length === 0) {
      return NextResponse.json({ error: 'No bond data available' }, { status: 503 });
    }

    // ── 4. Spread_BT actual y Spread_BT cierre ─────────────────────────
    //
    // Spread_BT = Σ(spread_i × outstanding_i) ÷ Σ(outstanding_i)
    // Variación = Spread_BT_ahora − Spread_BT_cierre
    //
    const eligible = bonds.filter((b) => b.embiEligible && b.spread !== null);
    const totalOut  = eligible.reduce((s, b) => s + b.outstanding, 0);

    const embi = totalOut > 0
      ? Math.round(
          eligible.reduce((s, b) => s + (b.spread as number) * (b.outstanding / totalOut), 0),
        )
      : 0;

    // Cierre: solo si todos los elegibles tienen spreadClose
    const eligibleClose = eligible.filter((b) => b.spreadClose !== null);
    const totalOutClose = eligibleClose.reduce((s, b) => s + b.outstanding, 0);
    const embiClose = eligibleClose.length === eligible.length && totalOutClose > 0
      ? Math.round(
          eligibleClose.reduce(
            (s, b) => s + (b.spreadClose as number) * (b.outstanding / totalOutClose),
            0,
          ),
        )
      : null;

    const embiDelta = embiClose !== null ? embi - embiClose : null;

    // ── 5. Curva Treasuries formateada ────────────────────────────────
    const treasuryCurveFormatted: Record<string, number> = {};
    for (const [tenor, yld] of Object.entries(curve)) {
      treasuryCurveFormatted[`${tenor}y`] = Math.round(Number(yld) * 10000) / 100;
    }

    const response: EmbiResponse = {
      embi,
      embiClose,
      embiDelta,
      bonds,
      treasuryCurve: treasuryCurveFormatted,
      timestamp: new Date().toISOString(),
      source: 'calculated',
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',
        'X-EMBI-Method': 'stripped-spread-ytm-weighted-outstanding',
        'X-EMBI-Bonds':  eligible.map((b) => b.ticker).join(','),
      },
    });
  } catch (err) {
    console.error('[/api/embi]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function interpolate(t: number, curve: TreasuryCurve): number {
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
