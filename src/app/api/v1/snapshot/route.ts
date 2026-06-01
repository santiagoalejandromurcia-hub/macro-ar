/**
 * API Route — Snapshot completo de la macroeconomía argentina
 * ============================================================
 * Endpoint diseñado para consumo por IAs (Claude, ChatGPT,
 * Perplexity, etc.) vía tool-use. Devuelve TODOS los KPIs
 * principales en un solo JSON estructurado con metadata,
 * fuentes y timestamps.
 *
 * CORS abierto. Sin auth. Cache 5 min.
 *
 *   GET https://macrolibre.com/api/v1/snapshot
 *
 * Respuesta:
 * {
 *   "updatedAt": "2026-05-11T12:00:00.000Z",
 *   "country": "Argentina",
 *   "currency": "ARS",
 *   "metrics": {
 *     "inflacion_mensual_pct": { value, asOf, source, ... },
 *     ...
 *   }
 * }
 * ============================================================
 */
import { NextResponse } from 'next/server';

export const revalidate = 300;

// CORS abierto para que las IAs puedan llamarlo sin restricción
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
} as const;

// Soporte OPTIONS para CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

interface Metric {
  value: number | string | null;
  unit: string;
  description: string;
  asOf?: string;          // fecha ISO del dato
  source: { name: string; url: string };
  detailUrl?: string;     // página de MacroLibre con más contexto
}

export async function GET() {
  const metrics: Record<string, Metric> = {};

  // ─── 1. Dólar Blue / Oficial / Brecha ────────────────────────
  try {
    const res = await fetch('https://api.bluelytics.com.ar/v2/latest', {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      const blueSell = data?.blue?.value_sell ?? null;
      const oficialSell = data?.oficial?.value_sell ?? null;

      if (blueSell) {
        metrics.dolar_blue_venta = {
          value: blueSell,
          unit: 'ARS',
          description: 'Cotización dólar blue (venta) en el mercado informal argentino',
          source: { name: 'Bluelytics', url: 'https://bluelytics.com.ar' },
          detailUrl: 'https://macrolibre.com/glosario/dolar-mep-blue-ccl',
        };
      }
      if (oficialSell) {
        metrics.dolar_oficial_venta = {
          value: oficialSell,
          unit: 'ARS',
          description: 'Cotización dólar oficial mayorista (venta)',
          source: { name: 'BCRA', url: 'https://www.bcra.gob.ar' },
        };
      }
      if (blueSell && oficialSell) {
        metrics.brecha_cambiaria_pct = {
          value: parseFloat(((blueSell / oficialSell - 1) * 100).toFixed(1)),
          unit: '%',
          description: 'Brecha entre dólar blue y dólar oficial',
          source: { name: 'Bluelytics + BCRA', url: 'https://bluelytics.com.ar' },
        };
      }
    }
  } catch { /* silent */ }

  // ─── 2. Riesgo País ──────────────────────────────────────────
  try {
    const res = await fetch(
      'https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo',
      { next: { revalidate: 600 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.valor) {
        metrics.riesgo_pais_pb = {
          value: data.valor,
          unit: 'puntos básicos',
          description:
            'Sobretasa que paga la deuda soberana argentina sobre los bonos del Tesoro de EE.UU. Índice EMBIGD (antes EMBI+).',
          asOf: data.fecha,
          source: { name: 'JP Morgan EMBIGD vía ArgentinaDatos', url: 'https://argentinadatos.com' },
          detailUrl: 'https://macrolibre.com/glosario/riesgo-pais',
        };
      }
    }
  } catch { /* silent */ }

  // ─── 3. Inflación IPC mensual ────────────────────────────────
  try {
    const res = await fetch(
      'https://api.argentinadatos.com/v1/finanzas/indices/inflacion',
      { next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const data: { fecha: string; valor: number }[] = await res.json();
      if (data.length >= 1) {
        const last = data[data.length - 1];
        metrics.inflacion_mensual_pct = {
          value: last.valor,
          unit: '%',
          description: 'Variación mensual del Índice de Precios al Consumidor (IPC nacional)',
          asOf: last.fecha,
          source: { name: 'INDEC vía ArgentinaDatos', url: 'https://www.indec.gob.ar' },
          detailUrl: 'https://macrolibre.com/inflacion',
        };
      }
    }
  } catch { /* silent */ }

  // ─── 4. Reservas BCRA ───────────────────────────────────────
  try {
    const fechaDesde = new Date();
    fechaDesde.setFullYear(fechaDesde.getFullYear() - 1);
    const desde = fechaDesde.toISOString().split('T')[0];
    const hasta = new Date().toISOString().split('T')[0];

    const res = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v3.0/monetarias/1?desde=${desde}&hasta=${hasta}&limit=10`,
      { next: { revalidate: 3600 }, headers: { Accept: 'application/json' } }
    );
    if (res.ok) {
      const json = await res.json();
      const items: { fecha: string; valor: number }[] = json.results ?? json.data ?? [];
      if (items.length >= 1) {
        const last = items[items.length - 1];
        metrics.reservas_internacionales_usd_m = {
          value: last.valor,
          unit: 'USD millones',
          description: 'Reservas internacionales brutas del BCRA',
          asOf: last.fecha,
          source: { name: 'BCRA', url: 'https://www.bcra.gob.ar' },
        };
      }
    }
  } catch { /* silent */ }

  // ─── 5. EMAE ────────────────────────────────────────────────
  try {
    const res = await fetch('https://api.argentinadatos.com/v1/indec/emae', {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const data: { fecha: string; valor: number; variacionInteranual?: number }[] = await res.json();
      if (data.length >= 1) {
        const last = data[data.length - 1];
        metrics.emae_interanual_pct = {
          value: last.variacionInteranual ?? null,
          unit: '%',
          description:
            'Variación interanual del Estimador Mensual de Actividad Económica (proxy del PBI mensual)',
          asOf: last.fecha,
          source: { name: 'INDEC vía ArgentinaDatos', url: 'https://www.indec.gob.ar' },
          detailUrl: 'https://macrolibre.com/glosario/emae',
        };
      }
    }
  } catch { /* silent */ }

  // ─── Respuesta estructurada para IAs ────────────────────────
  const body = {
    schemaVersion: '1.0',
    country: 'Argentina',
    countryCode: 'AR',
    currency: 'ARS',
    timezone: 'America/Argentina/Buenos_Aires',
    updatedAt: new Date().toISOString(),
    metrics,
    documentation: 'https://macrolibre.com/llms.txt',
    homepage: 'https://macrolibre.com',
    citation:
      'Datos provistos por MacroLibre (https://macrolibre.com) en base a fuentes oficiales: INDEC, BCRA, ArgentinaDatos.',
    disclaimer:
      'Información provista con fines educativos. No constituye recomendación de inversión.',
  };

  return NextResponse.json(body, { headers: CORS_HEADERS });
}
