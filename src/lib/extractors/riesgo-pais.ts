// ============================================================
// Riesgo País — EMBI+ / EMBIGD
// Fuente 1: ArgentinaDatos /v1/finanzas/indices/riesgo-pais (funciona)
// Fuente 2 (fallback): datos.gob.ar
//
// Series datos.gob.ar (fallback):
//   EMBI+ Argentina:  175.1_EMBI_0_D_26
// ============================================================

import { fetchDatosGobAr, fmtMes } from '@/lib/datos-gob-ar';

interface ApiItem { fecha: string; valor: number }

export async function fetchRiesgoPais(): Promise<unknown | null> {
  // Intentar ArgentinaDatos (este endpoint sigue vivo)
  try {
    const res = await fetch(
      'https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais',
      { cache: 'no-store' },
    );

    if (res.ok) {
      const raw: ApiItem[] = await res.json();
      if (raw && raw.length > 0) {
        return agruparPorMes(raw.map((i) => ({ fecha: i.fecha, valor: i.valor })));
      }
    }
  } catch { /* sigue al fallback */ }

  // Fallback: datos.gob.ar
  const EMBI_SERIES = '175.1_EMBI_0_D_26';
  const json = await fetchDatosGobAr(EMBI_SERIES, 1000);
  if (!json || json.data.length === 0) return null;

  const items = json.data
    .filter(([, v]) => v !== null)
    .map(([fecha, valor]) => ({ fecha, valor: valor as number }));

  return agruparPorMes(items);
}

function agruparPorMes(items: { fecha: string; valor: number }[]): unknown[] {
  // Tomar un punto por mes (último día del mes = mayor fecha)
  const byMonth: Record<string, number> = {};
  for (const item of items) {
    const key = item.fecha.slice(0, 7); // YYYY-MM
    if (!byMonth[key] || item.fecha > Object.keys(byMonth).find((k) => k === key)!) {
      byMonth[key] = item.valor;
    }
  }

  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-48)
    .map(([key, value]) => ({
      date:  fmtMes(`${key}-01`),
      value: Math.round(value),
    }));
}
