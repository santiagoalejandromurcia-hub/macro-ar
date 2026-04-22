// ============================================================
// Cronogramas fijos AL30 / GD30 (prospecto)
// + paridad estimada mensual (fuente: Bolsar/Rava — histórico)
// ============================================================

import type { SeriesPoint } from './types';

export interface BondFlow {
  /** Fecha ISO YYYY-MM-DD del pago */
  fecha: string;
  /** Cupón de interés sobre VN (%) */
  interes: number;
  /** Amortización sobre VN (%) */
  amortizacion: number;
}

// ---- Cronograma AL30 (ley Arg) / GD30 (ley NY) --------------
// Ambos comparten prácticamente el mismo esquema. Tasas step-up:
// 2020-21: 0.125%, 2021-22: 0.50%, 2022-23: 1.75%, 2023-24: 3.25%,
// 2024-25: 3.75%, 2025-26: 4.125%, 2026-27: 4.375%, 2027-28: 4.625%,
// 2028-29: 4.750%, 2029-30: 4.750%. Cupón semestral (9 ene / 9 jul).
// Amortización: 13 cuotas iguales de ~7.69% empezando 9-jul-2024,
// terminando 9-jul-2030 (NOMINAL ORIGINAL: 100%).
//
// Para simplificar la calc, usamos cupón promedio sobre VN remanente.

const CUPONES_AL30: BondFlow[] = [
  { fecha: '2024-01-09', interes: 1.625, amortizacion: 0 },       // 3.25%/2
  { fecha: '2024-07-09', interes: 1.875, amortizacion: 7.6923 },  // 3.75%/2 + 1/13
  { fecha: '2025-01-09', interes: 1.875, amortizacion: 7.6923 },
  { fecha: '2025-07-09', interes: 2.0625, amortizacion: 7.6923 }, // 4.125%/2
  { fecha: '2026-01-09', interes: 2.0625, amortizacion: 7.6923 },
  { fecha: '2026-07-09', interes: 2.1875, amortizacion: 7.6923 }, // 4.375%/2
  { fecha: '2027-01-09', interes: 2.1875, amortizacion: 7.6923 },
  { fecha: '2027-07-09', interes: 2.3125, amortizacion: 7.6923 }, // 4.625%/2
  { fecha: '2028-01-09', interes: 2.3125, amortizacion: 7.6923 },
  { fecha: '2028-07-09', interes: 2.375,  amortizacion: 7.6923 }, // 4.75%/2
  { fecha: '2029-01-09', interes: 2.375,  amortizacion: 7.6923 },
  { fecha: '2029-07-09', interes: 2.375,  amortizacion: 7.6923 },
  { fecha: '2030-01-09', interes: 2.375,  amortizacion: 7.6923 },
  { fecha: '2030-07-09', interes: 2.375,  amortizacion: 7.6924 }, // última cuota
];

// GD30 es casi idéntico pero con leves variaciones por ser Ley NY.
// Para simplicidad usamos el mismo cronograma.
const CUPONES_GD30: BondFlow[] = CUPONES_AL30;

// ---- Paridad histórica estimada (USD cada 100 VN) -----------
// Mensual, al cierre. Fuente: Bolsar / Rava (aproximación).
const PARIDAD_AL30: SeriesPoint[] = [
  { date: '2022-01-01', value: 33.5 }, { date: '2022-06-01', value: 27.1 },
  { date: '2022-12-01', value: 31.8 }, { date: '2023-03-01', value: 27.4 },
  { date: '2023-06-01', value: 31.0 }, { date: '2023-09-01', value: 29.2 },
  { date: '2023-12-01', value: 34.6 }, { date: '2024-03-01', value: 48.1 },
  { date: '2024-06-01', value: 48.8 }, { date: '2024-09-01', value: 55.4 },
  { date: '2024-12-01', value: 69.3 }, { date: '2025-03-01', value: 67.2 },
  { date: '2025-06-01', value: 64.9 }, { date: '2025-09-01', value: 62.4 },
  { date: '2025-12-01', value: 69.5 }, { date: '2026-01-01', value: 70.8 },
  { date: '2026-03-01', value: 72.4 }, { date: '2026-04-01', value: 73.1 },
];

// GD30 cotiza levemente por encima del AL30 (premio por ley NY ~3-5%)
const PARIDAD_GD30: SeriesPoint[] = PARIDAD_AL30.map((p) => ({
  date: p.date,
  value: Math.min(100, p.value * 1.04),
}));

export const BONO_SCHEDULES: Record<string, BondFlow[] | SeriesPoint[]> = {
  AL30: CUPONES_AL30,
  GD30: CUPONES_GD30,
  AL30_PARITY: PARIDAD_AL30,
  GD30_PARITY: PARIDAD_GD30,
};
