import { NextResponse } from 'next/server';
import { LINEAS_PRESTAMO } from '@/data/credito';

export const revalidate = 3600;

async function serie(id: number, limit = 8) {
  const res = await fetch(
    `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/${id}?limit=${limit}`,
    { next: { revalidate: 3600 }, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12_000) },
  );
  if (!res.ok) return [];
  const j = await res.json();
  return (j.results?.[0]?.detalle ?? []) as { fecha: string; valor: number }[];
}

export async function GET() {
  const liveOk = { stock: false, usd: false, lineas: false };
  let stock: { fecha: string; valor: number } | null = null;
  let usd: { fecha: string; valor: number } | null = null;
  const lineas: { id: number; label: string; valor: number; fecha: string }[] = [];

  try {
    const det = await serie(26, 5);
    if (det[0]) {
      liveOk.stock = true;
      stock = det[0];
    }
  } catch { /* */ }

  try {
    const det = await serie(125, 5);
    if (det[0]) {
      liveOk.usd = true;
      usd = det[0];
    }
  } catch { /* */ }

  try {
    const rows = await Promise.all(LINEAS_PRESTAMO.map((l) => serie(l.id, 1)));
    liveOk.lineas = rows.some((r) => r[0]);
    LINEAS_PRESTAMO.forEach((l, i) => {
      const d = rows[i][0];
      if (d) lineas.push({ id: l.id, label: l.label, valor: d.valor, fecha: d.fecha });
    });
  } catch { /* */ }

  return NextResponse.json(
    { asOf: new Date().toISOString(), liveOk, stock, usd, lineas },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } },
  );
}
