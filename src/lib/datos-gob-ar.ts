// ============================================================
// MacroLibre — Helper para la API de Series de datos.gob.ar
// Fuente oficial del gobierno argentino. No depende de terceros.
// Docs: https://apis.datos.gob.ar/series/api/
// ============================================================
//
// Para buscar series: https://datos.gob.ar/series
// Formato de respuesta:
//   { data: [["YYYY-MM-DD", value | null], ...], meta: [...] }
//
// ============================================================

const BASE = 'https://apis.datos.gob.ar/series/api/series/';

export interface DatosGobArResponse {
  data: [string, ...(number | null)[]][];
  meta: Array<{
    id: string;
    units?: string;
    frequency?: string;
    title?: string;
  }>;
  count: number;
  total: number;
}

/**
 * Fetchea una o varias series de datos.gob.ar.
 * @param ids   - ID(s) de serie separados por coma. Ej: 'emae_desest,emae_tendencia'
 * @param limit - Cantidad de períodos a traer (default 120 = 10 años mensuales)
 */
export async function fetchDatosGobAr(
  ids: string,
  limit = 120,
): Promise<DatosGobArResponse | null> {
  try {
    const url = `${BASE}?ids=${encodeURIComponent(ids)}&limit=${limit}&sort=desc&format=json`;
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as DatosGobArResponse;
  } catch {
    return null;
  }
}

/** Formatea "YYYY-MM-DD" → "Ene '24" */
export function fmtMes(fechaStr: string): string {
  // datos.gob.ar devuelve fechas en UTC, parseamos manualmente para evitar
  // el bug de zona horaria que convierte YYYY-MM-DD al día anterior.
  const [year, month] = fechaStr.split('-').map(Number);
  const date = new Date(year, month - 1, 1);
  const mes  = date.toLocaleString('es-AR', { month: 'short' });
  const anio = String(year).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} '${anio}`;
}

/** Formatea "YYYY-MM-DD" → "I-24", "II-24", etc. (trimestral) */
export function fmtTrim(fechaStr: string): string {
  const [year, month] = fechaStr.split('-').map(Number);
  const trimestre = Math.ceil(month / 3);
  return `${['I', 'II', 'III', 'IV'][trimestre - 1]}-${String(year).slice(2)}`;
}
