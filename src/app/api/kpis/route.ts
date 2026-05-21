/**
 * API Route — KPIs en vivo (agrega datos de múltiples fuentes)
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

  // ── Inflación IPC (ArgentinaDatos) ─────────────────────────
  try {
    const res = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacion', {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const data: { fecha: string; valor: number }[] = await res.json();
      if (data.length >= 2) {
        const last = data[data.length - 1];
        const prev = data[data.length - 2];
        const change = parseFloat((last.valor - prev.valor).toFixed(2));
        results.push({
          id: 'inflacion',
          value: `${last.valor}%`,
          change,
          changeLabel: `vs. mes anterior (${prev.valor}%)`,
        });
      }
    }
  } catch { /* silent */ }

  // ── Reservas BCRA ───────────────────────────────────────────
  try {
    const fechaDesde = new Date();
    fechaDesde.setFullYear(fechaDesde.getFullYear() - 1);
    const desde = fechaDesde.toISOString().split('T')[0];
    const hasta = new Date().toISOString().split('T')[0];

    const res = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/1?desde=${desde}&hasta=${hasta}&limit=10`,
      { next: { revalidate: 3600 }, headers: { Accept: 'application/json' } }
    );
    if (res.ok) {
      const json = await res.json();
      // v4.0: los datos vienen en results[0].detalle
      const detalle = json.results?.[0]?.detalle ?? json.results ?? json.data ?? [];
      const items: { fecha: string; valor: number }[] = detalle;
      if (items.length >= 2) {
        const last = items[items.length - 1];
        const prev = items[items.length - 2];
        const change = parseFloat(((last.valor / prev.valor - 1) * 100).toFixed(2));
        results.push({
          id: 'reservas',
          value: `USD ${last.valor.toLocaleString('es-AR')}M`,
          change,
          changeLabel: 'vs. dato anterior',
        });
      }
    }
  } catch { /* silent */ }

  // ── EMAE (ArgentinaDatos) ────────────────────────────────────
  try {
    const res = await fetch('https://api.argentinadatos.com/v1/indec/emae', {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const data: { fecha: string; valor: number; variacionInteranual?: number }[] = await res.json();
      if (data.length >= 2) {
        const last = data[data.length - 1];
        const prev = data[data.length - 2];
        const varInteranual = last.variacionInteranual ?? 0;
        const varMensual = prev.valor > 0
          ? parseFloat(((last.valor / prev.valor - 1) * 100).toFixed(1))
          : 0;
        results.push({
          id: 'emae',
          value: `${varInteranual > 0 ? '+' : ''}${varInteranual.toFixed(1)}%`,
          change: varMensual,
          changeLabel: 'var. interanual · INDEC',
        });
      }
    }
  } catch { /* silent */ }

  // ── TAMAR — Tasa Activa de Mercado (BCRA) ───────────────────
  // Variable 17: Tasa de adelantos en cta. cte. sector privado (TNA %)
  try {
    const fechaDesde = new Date();
    fechaDesde.setDate(fechaDesde.getDate() - 10);
    const desde = fechaDesde.toISOString().split('T')[0];
    const hasta = new Date().toISOString().split('T')[0];

    const res = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/17?desde=${desde}&hasta=${hasta}&limit=5`,
      { next: { revalidate: 3600 }, headers: { Accept: 'application/json' } }
    );
    if (res.ok) {
      const json = await res.json();
      const detalle = json.results?.[0]?.detalle ?? json.results ?? json.data ?? [];
      const items: { fecha: string; valor: number }[] = detalle;
      if (items.length >= 1) {
        const last = items[items.length - 1];
        const prev = items.length >= 2 ? items[items.length - 2] : null;
        const change = prev ? parseFloat((last.valor - prev.valor).toFixed(2)) : 0;
        results.push({
          id: 'tamar',
          value: `${last.valor.toFixed(2)}% TNA`,
          change,
          changeLabel: `Tasa activa mercado · ${last.fecha}`,
        });
      }
    }
  } catch { /* silent */ }

  return NextResponse.json(
    { kpis: results, updatedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
  );
}
