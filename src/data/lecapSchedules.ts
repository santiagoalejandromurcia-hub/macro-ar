import type { LecapSchedule } from '@/lib/lecapYtm';

/**
 * Solo filas verificadas (Boletín Oficial / prospecto Tesoro / IAMC).
 * NO copiar S30S5 → S30S6. Vacío a propósito hasta cargar datos reales.
 */
export const LECAP_VERIFIED: Record<string, LecapSchedule> = {
  // Ejemplo de forma (NO descomentar con datos inventados):
  // 'S30S6': {
  //   ticker: 'S30S6',
  //   fechaEmision: '2025-09-30',
  //   fechaVencimiento: '2026-09-30',
  //   temPct: 2.1,
  //   source: 'Boletín Oficial …',
  //   verified: true,
  // },
};

export function getVerifiedLecap(ticker: string): LecapSchedule | null {
  return LECAP_VERIFIED[ticker] ?? null;
}
