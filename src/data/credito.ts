/** Crédito al privado — BCRA. Mora es snapshot del Informe de Bancos. */

export const ACTUALIZADO_AL = '2026-09-17';

export const CREDITO_FUENTE =
  'BCRA API v4 var 26/117/125 (saldos) · Informe de Bancos jun-26 (irregularidad)';

/** IPC nivel general, Ago-26 = 100. Reconstruido con variaciones mensuales INDEC. */
export const IPC_INDEX_AGO26: Record<string, number> = {
  'Abr 25': 69.45, 'May 25': 70.97, 'Jun 25': 72.11, 'Jul 25': 73.48, 'Ago 25': 74.87,
  'Sep 25': 76.45, 'Oct 25': 78.21, 'Nov 25': 80.16, 'Dic 25': 82.41,
  'Ene 26': 84.79, 'Feb 26': 87.25, 'Mar 26': 90.22, 'Abr 26': 92.57, 'May 26': 94.51,
  'Jun 26': 96.31, 'Jul 26': 98.33, 'Ago 26': 100.0,
};

/** Saldo fin de mes, préstamos al privado (var 26, millones ARS, ME+ML). Fuente BCRA 17/09/2026. */
export const creditoStockMensual: { mes: string; iso: string; stockArsM: number; ipc: number; realAgo26Bn: number }[] = [
  { mes: 'Abr 25', iso: '2025-04', stockArsM: 85889244, ipc: 69.45, realAgo26Bn: 123.7 },
  { mes: 'May 25', iso: '2025-05', stockArsM: 91068443, ipc: 70.97, realAgo26Bn: 128.3 },
  { mes: 'Jun 25', iso: '2025-06', stockArsM: 96067935, ipc: 72.11, realAgo26Bn: 133.2 },
  { mes: 'Jul 25', iso: '2025-07', stockArsM: 102500044, ipc: 73.48, realAgo26Bn: 139.5 },
  { mes: 'Ago 25', iso: '2025-08', stockArsM: 105097970, ipc: 74.87, realAgo26Bn: 140.4 },
  { mes: 'Sep 25', iso: '2025-09', stockArsM: 108616368, ipc: 76.45, realAgo26Bn: 142.1 },
  { mes: 'Oct 25', iso: '2025-10', stockArsM: 111937686, ipc: 78.21, realAgo26Bn: 143.1 },
  { mes: 'Nov 25', iso: '2025-11', stockArsM: 114807241, ipc: 80.16, realAgo26Bn: 143.2 },
  { mes: 'Dic 25', iso: '2025-12', stockArsM: 118802729, ipc: 82.41, realAgo26Bn: 144.2 },
  { mes: 'Ene 26', iso: '2026-01', stockArsM: 121440924, ipc: 84.79, realAgo26Bn: 143.2 },
  { mes: 'Feb 26', iso: '2026-02', stockArsM: 122386340, ipc: 87.25, realAgo26Bn: 140.3 },
  { mes: 'Mar 26', iso: '2026-03', stockArsM: 125880022, ipc: 90.22, realAgo26Bn: 139.5 },
  { mes: 'Abr 26', iso: '2026-04', stockArsM: 129311965, ipc: 92.57, realAgo26Bn: 139.7 },
  { mes: 'May 26', iso: '2026-05', stockArsM: 132876081, ipc: 94.51, realAgo26Bn: 140.6 },
  { mes: 'Jun 26', iso: '2026-06', stockArsM: 139445516, ipc: 96.31, realAgo26Bn: 144.8 },
  { mes: 'Jul 26', iso: '2026-07', stockArsM: 142258926, ipc: 98.33, realAgo26Bn: 144.7 },
  { mes: 'Ago 26', iso: '2026-08', stockArsM: 144840524, ipc: 100.0, realAgo26Bn: 144.8 },
];

/** Informe de Bancos BCRA — junio 2026 (publicado ago-26). */
export const MORA_OFICIAL = {
  asOf: '2026-06',
  released: '2026-08',
  source: 'BCRA Informe de Bancos jun-26',
  total: 7.6,
  familias: 12.8,
  empresas: 3.5,
  creditoPibPesos: 9.2,
  creditoPibTotal: 12.3,
};

/** CENDEU / PNFC. No es el mismo ratio que el Informe de Bancos. */
export const MORA_FINTECH = {
  asOf: '2026-05',
  source: 'CENDEU vía CEPA / 1816 (mayo 2026)',
  irregularPnfc: 28.7,
  note: 'Proveedores no financieros (billeteras, fintech). No comparable 1:1 con el 7,6% bancario.',
};

export const MORA_SERIE: { mes: string; total: number | null; familias: number | null; empresas: number | null; oficial: boolean }[] = [
  { mes: 'Oct 24', total: 1.5, familias: 2.5, empresas: 0.7, oficial: false },
  { mes: 'Abr 26', total: 7.3, familias: 12.1, empresas: null, oficial: true },
  { mes: 'May 26', total: 7.7, familias: 12.8, empresas: 3.5, oficial: false },
  { mes: 'Jun 26', total: 7.6, familias: 12.8, empresas: 3.5, oficial: true },
];

export const LINEAS_PRESTAMO = [
  { id: 110, label: 'Adelantos CC', color: '#74ACDF' },
  { id: 111, label: 'Documentos', color: '#5DC1E0' },
  { id: 112, label: 'Hipotecarios', color: '#10B981' },
  { id: 113, label: 'Prendarios', color: '#D4A843' },
  { id: 114, label: 'Personales', color: '#EC4899' },
  { id: 115, label: 'Tarjetas', color: '#A78BFA' },
  { id: 116, label: 'Otros', color: '#9CA3AF' },
];
