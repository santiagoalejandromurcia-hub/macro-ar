export type MundoSource = 'live' | 'manual' | 'derived';
export type MundoMetricKey = 'cpiYoy' | 'policyRate' | 'fxUsd';
export type MundoCountryId = 'AR' | 'BR' | 'CL' | 'UY' | 'MX' | 'US' | 'XM' | 'CN';

export interface MundoMetric {
  key: MundoMetricKey;
  value: number | null;
  asOf: string;
  source: MundoSource;
  sourceLabel: string;
  note?: string;
}

export interface MundoCountryMeta {
  id: MundoCountryId;
  name: string;
  currency: string;
  isHome?: boolean;
  fxCode: string; // key in open.er-api rates (EUR for XM)
}

/** Snapshot manual — actualizá cuando publiques CPI / TPM oficiales */
export const ACTUALIZADO_AL = '2026-09-16';

export const MUNDO_META: MundoCountryMeta[] = [
  { id: 'AR', name: 'Argentina', currency: 'ARS', isHome: true, fxCode: 'ARS' },
  { id: 'BR', name: 'Brasil', currency: 'BRL', fxCode: 'BRL' },
  { id: 'CL', name: 'Chile', currency: 'CLP', fxCode: 'CLP' },
  { id: 'UY', name: 'Uruguay', currency: 'UYU', fxCode: 'UYU' },
  { id: 'MX', name: 'México', currency: 'MXN', fxCode: 'MXN' },
  { id: 'US', name: 'Estados Unidos', currency: 'USD', fxCode: 'USD' },
  { id: 'XM', name: 'Eurozona', currency: 'EUR', fxCode: 'EUR' },
  { id: 'CN', name: 'China', currency: 'CNY', fxCode: 'CNY' },
];

/** CPI YoY % — solo para países sin feed free confiable en v1 */
export const MANUAL_CPI: Partial<
  Record<MundoCountryId, { value: number | null; asOf: string; note: string }>
> = {
  AR: {
    value: 33.5,
    asOf: '2026-08',
    note: 'INDEC IPC nivel general, variación interanual agosto 2026 (no el 1,7% mensual)',
  },
  CL: {
    value: 4.1,
    asOf: '2026-08',
    note: 'INE Chile IPC 12 meses, boletín 8/09/2026',
  },
  UY: {
    value: 4.55,
    asOf: '2026-08',
    note: 'INE Uruguay IPC 12 meses, publicado 3/09/2026',
  },
  MX: {
    value: 3.26,
    asOf: '2026-08',
    note: 'INEGI INPC 12 meses, agosto 2026',
  },
  CN: {
    value: 0.8,
    asOf: '2026-08',
    note: 'NBS CPI 12 meses, comunicado 10/09/2026',
  },
  XM: {
    value: 3.3,
    asOf: '2026-08',
    note: 'Eurostat HICP flash euro area, 1/09/2026 (definitivo 17/09)',
  },
};

/**
 * Policy rates que BIS no cubre bien:
 * - UY: no está en WS_CBPOL
 * - US/XM: BIS diario corta el 8/09; FOMC y BCE movieron el 16/09
 * - CN: BIS reporta LPR 1Y (3%), no la tasa de política (repo 7d = 1,40%)
 */
export const MANUAL_POLICY: Partial<
  Record<MundoCountryId, { value: number | null; asOf: string; note?: string; sourceLabel?: string }>
> = {
  UY: {
    value: 5.75,
    asOf: '2026-08-18',
    sourceLabel: 'MANUAL · BCU TPM',
    note: 'BCU COPOM TPM vigente (ratificada 18/08/2026; Tasa 1 Día 15/09 = 5,75%)',
  },
  US: {
    value: 3.875,
    asOf: '2026-09-16',
    sourceLabel: 'MANUAL · FOMC',
    note: 'Punto medio del rango objetivo 3,75–4,00% (alza 25 pb, comunicado FOMC 16/09/2026 14:00 EDT)',
  },
  XM: {
    value: 2.5,
    asOf: '2026-09-16',
    sourceLabel: 'MANUAL · BCE DFR',
    note: 'Deposit facility rate, el steering rate del BCE. +25 pb el 10/09, vigente 16/09 (no el MRO 2,65)',
  },
  CN: {
    value: 1.4,
    asOf: '2026-09-16',
    sourceLabel: 'MANUAL · PBOC 7d',
    note: 'Reverse repo 7 días PBOC (tasa de política operativa). No es el LPR 1Y = 3%',
  },
};

/** BIS WS_CBPOL: usable for these; US/XM/CN se pisan con fuentes más honestas */
export const BIS_POLICY_IDS: MundoCountryId[] = ['BR', 'CL', 'MX'];
