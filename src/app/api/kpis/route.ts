/**
 * API Route — KPIs del TopTicker
 * Solo dólar blue y riesgo país (datos en vivo desde APIs externas).
 * EMAE, Inflación, Reservas y TAMAR se sirven desde macroData.ts (estáticos).
 * Caché: 5 minutos
 */
import { NextResponse } from 'next/server';

export const revalidate = 300;

interface KPILive {
  id: string;
  value: string;
  change: number;
  changeLabel: string;
}

export async function GET() {
  const results: KPILive[] = [];

  // ── Dólar Blue (Bluelytics) ──────────────────────────────────
  try {
    const res = await fetch('https://api.bluelytics.com.ar/v2/latest', {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      const sell: number = data?.blue?.value_sell ?? 0;
      const buy: number = data?.blue?.value_buy ?? 0;
      if (sell > 0) {
        const brecha = data?.oficial?.value_sell > 0
          ? ((sell / data.oficial.value_sell - 1) * 100).toFixed(1)
          : '—';
        results.push({
          id: 'dolar-blue',
          value: `$${sell.toLocaleString('es-AR')}`,
          change: sell > buy ? 0.1 : 0,
          changeLabel: `Brecha: ${brecha}% · Compra: $${buy.toLocaleString('es-AR')}`,
        });
      }
    }
  } catch { /* silent */ }

  // ── Riesgo País (ArgentinaDatos) ────────────────────────────
  try {
    const res = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo', {
      next: { revalidate: 600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.valor) {
        results.push({
          id: 'riesgo-pais',
          value: `${data.valor} pb`,
          change: 0,
          changeLabel: `EMBI+ JP Morgan · ${data.fecha ?? ''}`,
        });
      }
    }
  } catch { /* silent */ }

  // EMAE, Inflación, Reservas y TAMAR: datos estáticos desde macroData.ts
  // (no se consumen APIs externas para evitar inconsistencias con el dashboard)

  return NextResponse.json(
    { kpis: results, updatedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
  );
}
