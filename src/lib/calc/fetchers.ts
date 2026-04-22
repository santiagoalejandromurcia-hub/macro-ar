// ============================================================
// Fetchers de series en vivo (corren server-side en Next.js)
// Todas las funciones son tolerantes a fallos: devuelven [] + warning.
// ============================================================

import type { SeriesPoint } from './types';

interface FetchResult {
  series: SeriesPoint[];
  warning?: string;
}

// ---- Helpers --------------------------------------------------
function toISO(d: string): string {
  // Soporta 'YYYY-MM-DD' o ISO extendido → normaliza al primer formato
  return d.slice(0, 10);
}

function monthKey(iso: string): string {
  return iso.slice(0, 7); // YYYY-MM
}

/**
 * Mantiene un punto por mes, el más reciente del mes.
 * Asume que la lista entra ordenada por fecha asc.
 */
function collapseMonthly(points: SeriesPoint[]): SeriesPoint[] {
  const byMonth = new Map<string, SeriesPoint>();
  for (const p of points) {
    byMonth.set(monthKey(p.date), p);
  }
  return Array.from(byMonth.values()).sort((a, b) => a.date.localeCompare(b.date));
}

// ---- IPC -----------------------------------------------------
export async function fetchIPC(): Promise<FetchResult> {
  try {
    const res = await fetch(
      'https://api.argentinadatos.com/v1/finanzas/indices/inflacion',
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return { series: [], warning: `IPC: HTTP ${res.status}` };
    const raw: { fecha: string; valor: number }[] = await res.json();
    const series = raw
      .filter((r) => r?.fecha && typeof r.valor === 'number')
      .map((r) => ({ date: toISO(r.fecha), value: r.valor }))
      .sort((a, b) => a.date.localeCompare(b.date));
    return { series };
  } catch (e) {
    return { series: [], warning: `IPC: ${(e as Error).message}` };
  }
}

// ---- Dólares (blue/mep) --------------------------------------
type DolarTipo = 'blue' | 'bolsa';

async function fetchDolar(tipo: DolarTipo): Promise<FetchResult> {
  try {
    const res = await fetch(
      `https://api.argentinadatos.com/v1/cotizaciones/dolares/${tipo}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return { series: [], warning: `Dólar ${tipo}: HTTP ${res.status}` };
    const raw: { fecha: string; venta: number; compra?: number }[] = await res.json();
    const monthly = collapseMonthly(
      raw
        .filter((r) => r?.fecha && typeof r.venta === 'number')
        .map((r) => ({ date: toISO(r.fecha), value: r.venta }))
        .sort((a, b) => a.date.localeCompare(b.date))
    );
    return { series: monthly };
  } catch (e) {
    return { series: [], warning: `Dólar ${tipo}: ${(e as Error).message}` };
  }
}

export const fetchDolarBlue = () => fetchDolar('blue');
export const fetchDolarMEP = () => fetchDolar('bolsa');

// ---- TNA Plazo Fijo BCRA (variable 29) -----------------------
export async function fetchTnaPF(): Promise<FetchResult> {
  try {
    const hasta = new Date().toISOString().slice(0, 10);
    const desde = '2019-01-01';
    const res = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v3.0/monetarias/29?desde=${desde}&hasta=${hasta}&limit=3000`,
      { next: { revalidate: 43200 }, headers: { Accept: 'application/json' } }
    );
    if (!res.ok) return { series: [], warning: `TNA PF: HTTP ${res.status}` };
    const json = await res.json();
    const items: { fecha: string; valor: number }[] = json?.results ?? json?.data ?? [];
    const monthly = collapseMonthly(
      items
        .filter((r) => r?.fecha && typeof r.valor === 'number')
        .map((r) => ({ date: toISO(r.fecha), value: r.valor }))
        .sort((a, b) => a.date.localeCompare(b.date))
    );
    return { series: monthly };
  } catch (e) {
    return { series: [], warning: `TNA PF: ${(e as Error).message}` };
  }
}

// ---- Orquestador --------------------------------------------
export async function fetchAllSeries() {
  const [ipc, blue, mep, tnaPF] = await Promise.all([
    fetchIPC(),
    fetchDolarBlue(),
    fetchDolarMEP(),
    fetchTnaPF(),
  ]);
  const warnings = [ipc.warning, blue.warning, mep.warning, tnaPF.warning].filter(
    (w): w is string => !!w
  );
  return {
    ipcMensual: ipc.series,
    tcBlue: blue.series,
    tcMEP: mep.series,
    tnaPF: tnaPF.series,
    warnings,
  };
}
