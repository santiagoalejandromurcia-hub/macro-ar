/**
 * Utilidades de filtrado y transformación de datos para gráficos
 */

/** Opciones estándar de período para gráficos mensuales */
export const MONTHLY_PERIODS = [
  { label: '12m', months: 12 },
  { label: '24m', months: 24 },
  { label: 'Todo', months: 0 },
] as const;

/** Opciones estándar de período para gráficos trimestrales (PBI) */
export const QUARTERLY_PERIODS = [
  { label: '8T', months: 8 },
  { label: '16T', months: 16 },
  { label: 'Todo', months: 0 },
] as const;

/**
 * Filtra un array de datos tomando los últimos N elementos.
 * Si months === 0 devuelve el array completo.
 */
export function filterByPeriod<T>(data: T[], months: number): T[] {
  if (months === 0 || data.length <= months) return data;
  return data.slice(-months);
}
