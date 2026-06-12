// ============================================================
// GET /api/embi — EMBI Argentina calculado internamente (tiempo real)
//
// Metodología (exacta según BondTerminal / Ámbito / JP Morgan EMBIGD):
// - Riesgo país = spread ponderado de bonos elegibles ley extranjera (NY)
// - Criterios: ley NY, outstanding >=500M, plazo >=2.5 años
// - Bonos actuales elegibles (Ley NY): 
//   ARGENT 1 29 (2.1B), 0.75 30 (12.9B), 4.125 35 (20.5B),
//   5 38 (11.4B), 3.5 41 (10.5B), 4.125 46 (2.0B) → total ~59.4B
// - spread_i = YTM_bono - Treasury interpolado por duración del bono
// - Spread_BT = Σ(spread_i * outstanding_i) / Σ(outstanding_i)
// - Actualizado intraday con precios Data912 + Treasury.gov
//
// Bonos excluidos: solo ley Argentina (no entran en EMBI)
//
// Fuentes:
//   • Precios: data912.com/live/arg_bonds (mercado local)
//   • Curva Treasuries: home.treasury.gov (XML)
//   • Cash flows: prospectos oficiales
//   • Referencia oficial (fallback): ArgentinaDatos EMBI
// ============================================================

import { NextResponse } from 'next/server';
import { EMBI_BONDS, GD35_FLOWS }    from '@/lib/bonds/definitions';
import {
  calcYTM,
  calcModifiedDuration,
  calcStrippedSpread,
} from '@/lib/bonds/calculator';
import { fetchTreasuryCurve, type TreasuryCurve } from '@/lib/bonds/treasury';

const DATA912_LIVE = 'https://data912.com/live/arg_bonds';
const DATA912_HIST = (ticker: string) =>
  `https://data912.com/historical/bonds/${ticker}`;

// Bonos elegibles para el cálculo EMBI/EMBIGD (Ley NY, >500M outstanding, según metodología JP Morgan)
// Incluimos todos los listados como elegibles (incluyendo amortizables 29/30 según datos actuales de mercado)
const EMBI_ELIGIBLE = new Set(['GD29D', 'GD30D', 'GD35D', 'GD38D', 'GD41D', 'GD46D']);

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
  embi: number;               // Spread_BT ponderado actual (bps) - multi bono
  embiClose: number | null;   // Spread_BT ponderado ayer al cierre (bps)
  embiDelta: number | null;   // Variación = embi - embiClose (bps)
  bonds: BondResult[];
  treasuryCurve: Record<string, number>;
  timestamp: string;
  source: 'calculated';

  // Simple GD35C market risk (YTM GD35C - US 10y) - the one used by BondTerminal / traders for "real" riesgo país
  gd35c_ytm?: number | null;
  gd35c_spread?: number | null;  // this is the one to use for main live "Riesgo País" ticker
  us10y?: number | null;
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

    // ── Simple GD35C YTM-based riesgo país (BondTerminal style) ────────
    // Riesgo País = YTM(GD35C) - US Treasury 10y (approx risk free)
    // This is the "real" current market quote traders use (simple, using the liquid 2035 bond)
    let gd35c_ytm: number | null = null;
    let gd35c_spread: number | null = null;
    let us10y: number | null = null;

    const gd35cLive = priceMap.get('GD35C');
    if (gd35cLive && curve) {
      const priceC = (gd35cLive.px_bid + gd35cLive.px_ask) / 2;
      if (priceC > 0 && priceC < 200) {
        const ytmDec = calcYTM(priceC, GD35_FLOWS, settleDate);
        gd35c_ytm = Math.round(ytmDec * 10000) / 100;
        us10y = curve[10] || 0.0475;
        gd35c_spread = Math.round((ytmDec - us10y) * 10000);
      }
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
      gd35c_ytm,
      gd35c_spread,
      us10y: us10y ? Math.round(us10y * 10000)/100 : null,
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
