// ============================================================
// Calculadora de YTM y Stripped Spread para bonos soberanos
// Método: Newton-Raphson sobre flujos de caja descontados
// ============================================================

import type { CashFlow } from './definitions';

/**
 * Calcula el Yield to Maturity (anual, base ACT/ACT) dado un precio limpio.
 * Usa Newton-Raphson: itera hasta convergencia < 0.0001%.
 *
 * @param price        Precio limpio en USD (por cada 100 de VN original)
 * @param cashFlows    Flujos futuros (cupón + principal) en USD por 100 VN original
 * @param settleDate   Fecha de liquidación (default: hoy)
 * @returns            YTM anual en decimal (0.10 = 10%)
 */
export function calcYTM(
  price: number,
  cashFlows: CashFlow[],
  settleDate: Date = new Date(),
): number {
  const today = settleDate.getTime();

  // Solo flujos futuros
  const future = cashFlows.filter((cf) => cf.date.getTime() > today);
  if (future.length === 0) return 0;

  // Años fraccionarios desde hoy hasta cada flujo
  const YEAR_MS = 365.25 * 24 * 3600 * 1000;
  const times = future.map((cf) => (cf.date.getTime() - today) / YEAR_MS);
  const flows = future.map((cf) => cf.coupon + cf.principal);

  // Función a anular: PV(y) - precio = 0
  const pv = (y: number) =>
    flows.reduce((sum, cf, i) => sum + cf / Math.pow(1 + y, times[i]), 0);

  const dpv = (y: number) =>
    flows.reduce(
      (sum, cf, i) => sum - (times[i] * cf) / Math.pow(1 + y, times[i] + 1),
      0,
    );

  // Semilla inicial: YTM bruto aproximado
  let y = 0.10;
  for (let iter = 0; iter < 200; iter++) {
    const f = pv(y) - price;
    const df = dpv(y);
    if (Math.abs(df) < 1e-12) break;
    const y1 = y - f / df;
    if (y1 < -0.9999) y = Math.max(y * 0.5, 0.001);
    else y = y1;
    if (Math.abs(f / price) < 1e-8) break;
  }

  return y;
}

/**
 * Calcula la duración modificada (sensibilidad precio al yield).
 */
export function calcModifiedDuration(
  price: number,
  cashFlows: CashFlow[],
  settleDate: Date = new Date(),
): number {
  const ytm = calcYTM(price, cashFlows, settleDate);
  const today = settleDate.getTime();
  const YEAR_MS = 365.25 * 24 * 3600 * 1000;
  const future = cashFlows.filter((cf) => cf.date.getTime() > today);
  const times = future.map((cf) => (cf.date.getTime() - today) / YEAR_MS);
  const flows = future.map((cf) => cf.coupon + cf.principal);

  const pv = flows.reduce((s, cf, i) => s + cf / Math.pow(1 + ytm, times[i]), 0);
  const macaulay =
    flows.reduce((s, cf, i) => s + (times[i] * cf) / Math.pow(1 + ytm, times[i]), 0) / pv;

  return macaulay / (1 + ytm);
}

/**
 * Interpola linealmente en la curva de Treasuries por duración (años).
 *
 * @param durationYrs  Duración del bono (años)
 * @param curve        Mapa { años: yield_anual } — e.g. { 2: 0.042, 5: 0.044, 10: 0.047 }
 * @returns            Yield del Treasury interpolado (decimal)
 */
export function interpolateTreasury(
  durationYrs: number,
  curve: Record<number, number>,
): number {
  const keys = Object.keys(curve)
    .map(Number)
    .sort((a, b) => a - b);

  if (keys.length === 0) return 0;
  if (durationYrs <= keys[0]) return curve[keys[0]];
  if (durationYrs >= keys[keys.length - 1]) return curve[keys[keys.length - 1]];

  for (let i = 0; i < keys.length - 1; i++) {
    const lo = keys[i];
    const hi = keys[i + 1];
    if (durationYrs >= lo && durationYrs <= hi) {
      const t = (durationYrs - lo) / (hi - lo);
      return curve[lo] + t * (curve[hi] - curve[lo]);
    }
  }

  return curve[keys[keys.length - 1]];
}

/**
 * Calcula el stripped spread en puntos básicos.
 * stripped_spread = YTM_bono - Treasury_equivalente
 */
export function calcStrippedSpread(
  ytm: number,
  durationYrs: number,
  curve: Record<number, number>,
): number {
  const tsy = interpolateTreasury(durationYrs, curve);
  return Math.round((ytm - tsy) * 10000); // bps
}
