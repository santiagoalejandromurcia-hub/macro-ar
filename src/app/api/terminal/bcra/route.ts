/**
 * Series BCRA que la terminal muestra bajo Economía.
 * Mismo host que /api/kpis y /api/dolares: estadisticas/v4.0/monetarias.
 * TAMAR = id 44 (el que ya usa /api/kpis). Base monetaria = id 15
 * (descripción del catálogo: "Base monetaria", stock en millones de ARS).
 * UBA y SER no figuran en ese catálogo: no se inventan.
 */
import { NextResponse } from 'next/server';

export const revalidate = 3600;

const SERIES = [
  { id: 44, key: 'tamar', label: 'TAMAR', unit: '% n.a.' },
  { id: 15, key: 'base', label: 'Base monetaria', unit: 'millones ARS' },
] as const;

export async function GET() {
  const desde = new Date();
  desde.setDate(desde.getDate() - 21);
  const desdeIso = desde.toISOString().slice(0, 10);
  const hastaIso = new Date().toISOString().slice(0, 10);

  const series = await Promise.all(
    SERIES.map(async (serie) => {
      try {
        const res = await fetch(
          `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/${serie.id}?desde=${desdeIso}&hasta=${hastaIso}&limit=15`,
          { next: { revalidate: 3600 }, headers: { Accept: 'application/json' } },
        );
        if (!res.ok) return null;
        const json = await res.json();
        const detalle: { fecha?: string; valor?: number }[] = json.results?.[0]?.detalle ?? [];
        const puntos = detalle
          .filter((d) => typeof d.fecha === 'string' && typeof d.valor === 'number')
          .sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)));
        const last = puntos[puntos.length - 1];
        if (!last?.fecha || typeof last.valor !== 'number') return null;
        return {
          key: serie.key,
          label: serie.label,
          unit: serie.unit,
          idVariable: serie.id,
          valor: last.valor,
          fecha: last.fecha,
        };
      } catch {
        return null;
      }
    }),
  );

  return NextResponse.json(
    { series: series.filter((s) => s !== null) },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } },
  );
}
