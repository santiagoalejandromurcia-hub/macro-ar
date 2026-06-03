// ============================================================
// GET /api/break-even — Precios en vivo para el BEI
//
// Fuente: data912.com /live/arg_notes (refresh cada 20s)
//
// Para LECAPs/BONTEs TF (nominales, S-prefix):
//   TIR_implícita = (P_live / P_stored)^(365 / días_transcurridos) - 1
//   Usando el precio guardado en breakEven.ts como referencia.
//   Esto es la CAGR implícita del instrumento desde la fecha del snapshot.
//
// Para LECERs/BONCERs (CER, X-prefix):
//   No se puede derivar TIR real desde precio ARS sin el índice CER.
//   Solo se devuelve el precio actualizado; TIR permanece la guardada.
// ============================================================

import { NextResponse } from 'next/server';
import {
  bonosNominales,
  bonosReales,
  ACTUALIZADO_AL,
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
  prices:        Record<string, LiveBondPrice>; // keyed by ticker
  actualizadoAl: string;                         // fecha del snapshot base
  timestamp:     string;
  source:        'data912';
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

    const STORED_DATE  = new Date(ACTUALIZADO_AL);
    const today        = new Date();
    const elapsedDays  = (today.getTime() - STORED_DATE.getTime()) / 86_400_000;

    const prices: Record<string, LiveBondPrice> = {};

    // ── Nominales (S-prefix → TIR implícita calculable) ─────────────
    for (const bond of bonosNominales) {
      const nota = priceMap.get(bond.ticker);
      if (!nota) continue;

      // Precio mid (si bid/ask válidos), si no usar cierre
      const mid = nota.px_bid > 0 && nota.px_ask > 0
        ? (nota.px_bid + nota.px_ask) / 2
        : nota.c;

      // TIR implícita: CAGR desde el snapshot guardado
      // tirImplicita = (P_live / P_stored)^(365/días) - 1
      let tirImplicita: number | null = null;
      if (elapsedDays > 0 && bond.precioArs > 0 && mid > 0) {
        tirImplicita = Math.pow(mid / bond.precioArs, 365 / elapsedDays) - 1;
        // Sanidad: si fuera absurda (>200% o <-50%), usar guardada
        if (tirImplicita > 2 || tirImplicita < -0.5) {
          tirImplicita = bond.tirAnualPct / 100;
        }
      }

      prices[bond.ticker] = {
        ticker:        bond.ticker,
        precioArsLive: Math.round(mid * 100) / 100,
        pctChange:     Math.round(nota.pct_change * 100) / 100,
        tirImplicita:  tirImplicita !== null
          ? Math.round(tirImplicita * 10000) / 100  // en %
          : null,
        tirEsCER:      false,
        timestamp:     today.toISOString(),
      };
    }

    // ── CER (X-prefix → solo precio, TIR guardada) ──────────────────
    for (const bond of bonosReales) {
      const nota = priceMap.get(bond.ticker);
      if (!nota) continue;

      const mid = nota.px_bid > 0 && nota.px_ask > 0
        ? (nota.px_bid + nota.px_ask) / 2
        : nota.c;

      prices[bond.ticker] = {
        ticker:        bond.ticker,
        precioArsLive: Math.round(mid * 100) / 100,
        pctChange:     Math.round(nota.pct_change * 100) / 100,
        tirImplicita:  null,    // No computable sin índice CER
        tirEsCER:      true,
        timestamp:     today.toISOString(),
      };
    }

    const response: BreakEvenLiveResponse = {
      prices,
      actualizadoAl: ACTUALIZADO_AL,
      timestamp:     today.toISOString(),
      source:        'data912',
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
