// ============================================================
// GET /api/break-even — Precios de referencia data912 + TIR CER estática
//
// Fuente: data912.com /live/arg_notes (refresh cada 20s)
//
// LECAPs/BONTEs y CER: solo precio live. tirImplicita siempre null —
// YTM LECAP requiere valor técnico/TEM; no inventar CAGR de precio.
// ============================================================

import { NextResponse } from 'next/server';
import {
  bonosNominales,
  bonosReales,
  ACTUALIZADO_AL,
  TIR_CER_ES_LIVE,
} from '@/data/breakEven';

const DATA912_URL = 'https://data912.com/live/arg_notes';

export interface LiveBondPrice {
  ticker:         string;
  precioArsLive:  number;        // Precio live mid (bid+ask)/2 o c
  pctChange:      number;        // % cambio intradía
  tirImplicita:   number | null; // TIR anual derivada de precio — null si CER
  tirEsCER:       boolean;       // true = TIR es real (no se actualizó)
  timestamp:      string;
}

export interface BreakEvenLiveResponse {
  prices:           Record<string, LiveBondPrice>;
  pricesExtra?:     Record<string, LiveBondPrice>;
  actualizadoAl:    string;   // base TIR (manual)
  timestamp:        string;
  preciosTimestamp: string;   // fetch data912
  tirCerLive:       boolean;
  source:           'data912+static-tir';
}

type NotaItem = {
  symbol:     string;
  c:          number;
  px_bid:     number;
  px_ask:     number;
  pct_change: number;
};

export async function GET() {
  try {
    const res = await fetch(DATA912_URL, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: 'data912 unavailable' }, { status: 503 });
    }

    const notas: NotaItem[] = await res.json();
    const priceMap = new Map(notas.map((n) => [n.symbol, n]));

    const today = new Date();
    const prices: Record<string, LiveBondPrice> = {};

    const midOf = (nota: NotaItem) =>
      nota.px_bid > 0 && nota.px_ask > 0 ? (nota.px_bid + nota.px_ask) / 2 : nota.c;

    // ── Nominales: precio live, TIR del snapshot (no CAGR) ──────────
    for (const bond of bonosNominales) {
      const nota = priceMap.get(bond.ticker);
      if (!nota) continue;
      const mid = midOf(nota);

      prices[bond.ticker] = {
        ticker:        bond.ticker,
        precioArsLive: Math.round(mid * 100) / 100,
        pctChange:     Math.round(nota.pct_change * 100) / 100,
        // YTM LECAP: ver src/lib/lecapYtm.ts + LECAP_VERIFIED.
        // Cablear recién cuando haya TEM+fechas verificadas por ticker:
        //   tirImplicita: getVerifiedLecap(bond.ticker)
        //     ? lecapTeaFromPrice(getVerifiedLecap(bond.ticker)!, mid, todayISO)
        //     : null
        tirImplicita:  null,
        tirEsCER:      false,
        timestamp:     today.toISOString(),
      };
    }

    // ── CER (X-prefix → solo precio, TIR guardada) ──────────────────
    for (const bond of bonosReales) {
      const nota = priceMap.get(bond.ticker);
      if (!nota) continue;

      const mid = midOf(nota);

      prices[bond.ticker] = {
        ticker:        bond.ticker,
        precioArsLive: Math.round(mid * 100) / 100,
        pctChange:     Math.round(nota.pct_change * 100) / 100,
        tirImplicita:  null,    // No computable sin índice CER
        tirEsCER:      true,
        timestamp:     today.toISOString(),
      };
    }

    const snapshotTickers = new Set([
      ...bonosNominales.map((b) => b.ticker),
      ...bonosReales.map((b) => b.ticker),
    ]);
    const pricesExtra: Record<string, LiveBondPrice> = {};
    for (const nota of notas) {
      if (snapshotTickers.has(nota.symbol)) continue;
      const isLecap = /^S\d/.test(nota.symbol) && !nota.symbol.endsWith('D');
      const isCer = /^X\d/.test(nota.symbol) && !nota.symbol.endsWith('D');
      if (!isLecap && !isCer) continue;
      const mid = midOf(nota);
      if (!(mid > 0)) continue;
      pricesExtra[nota.symbol] = {
        ticker:        nota.symbol,
        precioArsLive: Math.round(mid * 100) / 100,
        pctChange:     Math.round(nota.pct_change * 100) / 100,
        tirImplicita:  null,
        tirEsCER:      isCer,
        timestamp:     today.toISOString(),
      };
    }

    const nowIso = today.toISOString();
    const response: BreakEvenLiveResponse = {
      prices,
      pricesExtra,
      actualizadoAl:    ACTUALIZADO_AL,
      timestamp:        nowIso,
      preciosTimestamp: nowIso,
      tirCerLive:       TIR_CER_ES_LIVE,
      source:           'data912+static-tir',
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',
        'X-Matched-Tickers': Object.keys(prices).join(','),
      },
    });
  } catch (err) {
    console.error('[/api/break-even]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
