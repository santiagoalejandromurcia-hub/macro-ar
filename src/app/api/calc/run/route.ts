/**
 * POST /api/calc/run
 * Body: { monto, from (YYYY-MM-DD), to (YYYY-MM-DD), instruments: InstrumentId[] }
 * Respuesta: CalcOutput
 */
import { NextResponse } from 'next/server';
import { runCalc } from '@/lib/calc/run';
import type { CalcInput, InstrumentId } from '@/lib/calc/types';

const VALID_IDS: InstrumentId[] = [
  'plazoFijo', 'dolarMEP', 'dolarBlue', 'lecap', 'al30', 'gd30',
];

export const revalidate = 300;

export async function POST(req: Request) {
  let body: Partial<CalcInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const monto = Number(body?.monto);
  const from = String(body?.from ?? '').slice(0, 10);
  const to = String(body?.to ?? '').slice(0, 10);
  const instruments = Array.isArray(body?.instruments)
    ? (body!.instruments as InstrumentId[]).filter((i) => VALID_IDS.includes(i))
    : [];

  if (!isFinite(monto) || monto <= 0) {
    return NextResponse.json({ error: 'monto debe ser > 0' }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    return NextResponse.json({ error: 'fechas inválidas (YYYY-MM-DD)' }, { status: 400 });
  }
  if (from >= to) {
    return NextResponse.json({ error: 'from debe ser anterior a to' }, { status: 400 });
  }
  if (instruments.length === 0) {
    return NextResponse.json({ error: 'instruments vacío' }, { status: 400 });
  }

  const result = await runCalc({ monto, from, to, instruments });
  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
  });
}
