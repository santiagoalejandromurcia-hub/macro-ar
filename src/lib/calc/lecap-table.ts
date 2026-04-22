// ============================================================
// Tabla de emisiones LECAP (Letras del Tesoro capitalizables)
// Fuente: Secretaría de Finanzas, Boletín Oficial, licitaciones.
// Datos aproximados de las principales emisiones 2024-2026.
// ============================================================

export interface LECAPIssuance {
  /** Ticker público (S15A4, S29A5, etc.) */
  ticker: string;
  /** Fecha de emisión YYYY-MM-DD */
  fechaEmision: string;
  /** Fecha de vencimiento YYYY-MM-DD */
  fechaVencimiento: string;
  /** Tasa Efectiva Mensual al momento de emisión (%) */
  tem: number;
}

/**
 * Emisiones ordenadas por fecha de emisión.
 * La calculadora elige la próxima vigente que venza después del cursor.
 */
export const LECAP_ISSUANCES: LECAPIssuance[] = [
  { ticker: 'S31E4', fechaEmision: '2024-03-25', fechaVencimiento: '2024-07-31', tem: 5.5 },
  { ticker: 'S13Y4', fechaEmision: '2024-04-15', fechaVencimiento: '2024-09-13', tem: 5.0 },
  { ticker: 'S30Y4', fechaEmision: '2024-05-13', fechaVencimiento: '2024-11-30', tem: 4.5 },
  { ticker: 'S14J4', fechaEmision: '2024-06-14', fechaVencimiento: '2025-01-14', tem: 4.2 },
  { ticker: 'S30G4', fechaEmision: '2024-07-29', fechaVencimiento: '2025-03-28', tem: 4.0 },
  { ticker: 'S30S4', fechaEmision: '2024-08-30', fechaVencimiento: '2025-05-30', tem: 3.9 },
  { ticker: 'S17O4', fechaEmision: '2024-09-30', fechaVencimiento: '2025-07-17', tem: 3.7 },
  { ticker: 'S31O4', fechaEmision: '2024-10-15', fechaVencimiento: '2025-10-31', tem: 3.6 },
  { ticker: 'S18N4', fechaEmision: '2024-11-18', fechaVencimiento: '2025-11-28', tem: 3.3 },
  { ticker: 'S16D4', fechaEmision: '2024-12-13', fechaVencimiento: '2025-12-12', tem: 2.9 },
  { ticker: 'S31E5', fechaEmision: '2025-01-31', fechaVencimiento: '2026-01-30', tem: 2.5 },
  { ticker: 'S28F5', fechaEmision: '2025-02-28', fechaVencimiento: '2026-02-27', tem: 2.4 },
  { ticker: 'S28M5', fechaEmision: '2025-03-31', fechaVencimiento: '2026-03-31', tem: 2.4 },
  { ticker: 'S30A5', fechaEmision: '2025-04-30', fechaVencimiento: '2026-04-30', tem: 2.3 },
  { ticker: 'S30Y5', fechaEmision: '2025-05-30', fechaVencimiento: '2026-05-29', tem: 2.2 },
  { ticker: 'S30J5', fechaEmision: '2025-06-30', fechaVencimiento: '2026-06-30', tem: 2.2 },
  { ticker: 'S31L5', fechaEmision: '2025-07-31', fechaVencimiento: '2026-07-31', tem: 2.1 },
  { ticker: 'S29G5', fechaEmision: '2025-08-29', fechaVencimiento: '2026-08-28', tem: 2.0 },
  { ticker: 'S30S5', fechaEmision: '2025-09-30', fechaVencimiento: '2026-09-30', tem: 2.0 },
  { ticker: 'S30O5', fechaEmision: '2025-10-31', fechaVencimiento: '2026-10-30', tem: 2.0 },
  { ticker: 'S28N5', fechaEmision: '2025-11-28', fechaVencimiento: '2026-11-27', tem: 2.0 },
  { ticker: 'S30D5', fechaEmision: '2025-12-30', fechaVencimiento: '2026-12-30', tem: 1.9 },
  { ticker: 'S30E6', fechaEmision: '2026-01-30', fechaVencimiento: '2027-01-29', tem: 1.9 },
  { ticker: 'S27F6', fechaEmision: '2026-02-27', fechaVencimiento: '2027-02-26', tem: 1.9 },
];
