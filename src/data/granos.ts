// ============================================================
// MacroLibre — Mercado de Granos Argentina
// ============================================================
// FOB: circular MAGyP (primer embarque / min nearby) al 15-sep-2026.
// DJVE: MAGYP «Estadísticas DJVE de Granos y Subproductos» al 16-sep-2026.
//   Toneladas comprometidas por mes de embarque (soja + maíz + trigo pan),
//   sumando campañas 24/25 y 25/26 cuando se solapan.
// Cosecha 25/26: dato final SAGyP.
// ============================================================

export const ACTUALIZADO_AL = '2026-09-16';
export const FUENTE_FOB   = 'MAGyP — Subsecretaría de Mercados Agropecuarios';
export const FUENTE_DJVE  = 'MAGyP — DJVE por mes de embarque (al 16/09/2026)';
export const FUENTE_EXPORT = 'INDEC — Intercambio Comercial Argentino (ICA)';
export const FUENTE = FUENTE_FOB;
export const SERIES_ASOF = {
  fob: '2026-09-15',
  djveMensual: '2026-09',
  exportTotal: '2026-04',
  destinos: 'ene-abr 2026',
  cosecha: 'campaña 2025/26',
} as const;

// ─── KPIs destacados ─────────────────────────────────────────
export interface KpiGranos {
  label: string;
  valor: string | number;
  unidad: string;
  variacion?: number;     // % vs período anterior
  mes: string;
  color: 'celeste' | 'sol' | 'magenta' | 'up';
}

export const kpisGranos: KpiGranos[] = [
  {
    label: 'FOB Soja',
    valor: 'USD 510',
    unidad: 'por tn',
    variacion: 11.1, // vs 14-ago (USD 459)
    mes: '15 Sep 26',
    color: 'sol',
  },
  {
    label: 'FOB Maíz',
    valor: 'USD 224',
    unidad: 'por tn',
    variacion: 5.2, // vs 14-ago (USD 213)
    mes: '15 Sep 26',
    color: 'celeste',
  },
  {
    label: 'FOB Trigo',
    valor: 'USD 259',
    unidad: 'por tn',
    variacion: 7.0, // vs 14-ago (USD 242)
    mes: '15 Sep 26',
    color: 'magenta',
  },
  {
    label: 'Cosecha 25/26',
    valor: '163.2M',
    unidad: 'tn · récord histórico',
    variacion: 21.25,
    mes: 'Campaña 25/26',
    color: 'up',
  },
];

// ─── Precios FOB históricos (USD/tn) ─────────────────────────
// Basados en datos MAGyP webscraping y publicaciones oficiales.
export interface PrecioFOB {
  mes: string;
  soja: number;
  maiz: number;
  trigo: number;
  girasol: number;
}

export const preciosFOB: PrecioFOB[] = [
  { mes: 'Ene 25', soja: 341, maiz: 217, trigo: 248, girasol: 454 },
  { mes: 'Feb 25', soja: 362, maiz: 213, trigo: 248, girasol: 462 },
  { mes: 'Mar 25', soja: 373, maiz: 209, trigo: 241, girasol: 470 },
  { mes: 'Abr 25', soja: 367, maiz: 204, trigo: 237, girasol: 466 },
  { mes: 'May 25', soja: 360, maiz: 199, trigo: 230, girasol: 460 },
  { mes: 'Jun 25', soja: 352, maiz: 196, trigo: 225, girasol: 452 },
  { mes: 'Jul 25', soja: 348, maiz: 192, trigo: 219, girasol: 446 },
  { mes: 'Ago 25', soja: 344, maiz: 194, trigo: 223, girasol: 441 },
  { mes: 'Sep 25', soja: 338, maiz: 190, trigo: 228, girasol: 438 },
  { mes: 'Oct 25', soja: 330, maiz: 191, trigo: 232, girasol: 440 },
  { mes: 'Nov 25', soja: 318, maiz: 193, trigo: 236, girasol: 436 },
  { mes: 'Dic 25', soja: 310, maiz: 196, trigo: 237, girasol: 432 },
  { mes: 'Ene 26', soja: 404, maiz: 213, trigo: 205, girasol: 428 },
  { mes: 'Feb 26', soja: 440, maiz: 211, trigo: 207, girasol: 470 },
  { mes: 'Mar 26', soja: 427, maiz: 205, trigo: 213, girasol: 457 },
  { mes: 'Abr 26', soja: 421, maiz: 211, trigo: 227, girasol: 460 },
  { mes: 'May 26', soja: 425, maiz: 204, trigo: 236, girasol: 482 },
  { mes: 'Jun 26', soja: 418, maiz: 197, trigo: 235, girasol: 482 },
  { mes: 'Jul 26', soja: 452, maiz: 208, trigo: 227, girasol: 502 },
  { mes: 'Ago 26', soja: 459, maiz: 213, trigo: 242, girasol: 556 },
  { mes: 'Sep 26', soja: 510, maiz: 224, trigo: 259, girasol: 569 },
];

// ─── DJVE mensual (millones de toneladas) ─────────────────────
// Declaraciones Juradas de Ventas al Exterior
export interface DJVEMensual {
  mes: string;
  soja: number;
  maiz: number;
  trigo: number;
  total: number;
}

export const djveMensual: DJVEMensual[] = [
  { mes: 'Ene 26', soja: 0.01, maiz: 1.63, trigo: 3.99, total: 5.63 },
  { mes: 'Feb 26', soja: 0.01, maiz: 0.79, trigo: 2.76, total: 3.56 },
  { mes: 'Mar 26', soja: 0.00, maiz: 6.84, trigo: 1.22, total: 8.06 },
  { mes: 'Abr 26', soja: 0.53, maiz: 5.96, trigo: 0.77, total: 7.26 },
  { mes: 'May 26', soja: 1.78, maiz: 2.68, trigo: 0.41, total: 4.87 },
  { mes: 'Jun 26', soja: 0.59, maiz: 3.88, trigo: 0.56, total: 5.03 },
  { mes: 'Jul 26', soja: 0.25, maiz: 3.24, trigo: 0.99, total: 4.48 },
  { mes: 'Ago 26', soja: 0.67, maiz: 6.68, trigo: 0.74, total: 8.09 },
  { mes: 'Sep 26', soja: 1.36, maiz: 4.60, trigo: 0.50, total: 6.46 },
];

// ─── Exportaciones por grano (mil tn y USD M) ────────────────
export interface ExportGrano {
  mes: string;
  volumen: number;   // miles de toneladas
  valor: number;     // millones USD
}

export interface ExportacionesPorGrano {
  soja:     ExportGrano[];
  maiz:     ExportGrano[];
  trigo:    ExportGrano[];
  girasol:  ExportGrano[];
}

export const exportaciones: ExportacionesPorGrano = {
  soja: [
    { mes: 'Ene 26', volumen: 850,  valor: 259 },
    { mes: 'Feb 26', volumen: 920,  valor: 276 },
    { mes: 'Mar 26', volumen: 1340, valor: 399 },
    { mes: 'Abr 26', volumen: 2100, valor: 632 },
  ],
  maiz: [
    { mes: 'Ene 26', volumen: 1200, valor: 239 },
    { mes: 'Feb 26', volumen: 980,  valor: 197 },
    { mes: 'Mar 26', volumen: 1450, valor: 286 },
    { mes: 'Abr 26', volumen: 1680, valor: 329 },
  ],
  trigo: [
    { mes: 'Ene 26', volumen: 700,  valor: 165 },
    { mes: 'Feb 26', volumen: 620,  valor: 145 },
    { mes: 'Mar 26', volumen: 450,  valor: 106 },
    { mes: 'Abr 26', volumen: 380,  valor:  90 },
  ],
  girasol: [
    { mes: 'Ene 26', volumen: 120,  valor:  51 },
    { mes: 'Feb 26', volumen: 105,  valor:  45 },
    { mes: 'Mar 26', volumen: 195,  valor:  84 },
    { mes: 'Abr 26', volumen: 230,  valor:  99 },
  ],
};

// ─── Exportaciones totales mensuales (todos los granos) ──────
export interface ExportTotal {
  mes: string;
  volumen: number;   // miles de tn
  valor: number;     // millones USD
}

export const exportTotal: ExportTotal[] = [
  { mes: 'Ene 26', volumen: 2870, valor:  714 },
  { mes: 'Feb 26', volumen: 2625, valor:  663 },
  { mes: 'Mar 26', volumen: 3435, valor:  875 },
  { mes: 'Abr 26', volumen: 4390, valor: 1150 },
];

// ─── Destinos de exportación (participación %) ───────────────
export interface Destino {
  pais: string;
  participacion: number;
  grano: 'Soja' | 'Maíz' | 'Trigo' | 'Mix';
}

export const destinosPrincipales: Destino[] = [
  { pais: 'China',        participacion: 38.4, grano: 'Soja'  },
  { pais: 'Indonesia',    participacion: 9.2,  grano: 'Soja'  },
  { pais: 'Países Bajos', participacion: 7.8,  grano: 'Mix'   },
  { pais: 'Egipto',       participacion: 6.4,  grano: 'Trigo' },
  { pais: 'Brasil',       participacion: 5.9,  grano: 'Maíz'  },
  { pais: 'Vietnam',      participacion: 5.1,  grano: 'Maíz'  },
  { pais: 'España',       participacion: 4.3,  grano: 'Mix'   },
  { pais: 'Otros',        participacion: 22.9, grano: 'Mix'   },
];

// ─── Cosecha campaña 2025/26 (Mt) ────────────────────────────
// Fuente: Secretaría de Agricultura, Ganadería y Pesca
// DATO FINAL OFICIAL — Récord histórico total: 163.2 Mt (+21.25% vs campaña anterior)
export interface Cosecha {
  grano: string;
  estimacion: number;   // millones de toneladas
  variacionYoY: number; // % vs campaña anterior
  estado: string;
  rinde?: string;       // rendimiento por hectárea (qq/ha)
  esRecord?: boolean;
}

export const cosecha2526: Cosecha[] = [
  {
    grano: 'Maíz',
    estimacion: 70.0,
    variacionYoY: 22.8,
    estado: 'Cosechado · Récord 20 años',
    rinde: '72 qq/ha',
    esRecord: true,
  },
  {
    grano: 'Soja',
    estimacion: 49.9,
    variacionYoY: 0.8,
    estado: 'Cosechado',
    rinde: '30,6 qq/ha',
  },
  {
    grano: 'Trigo',
    estimacion: 27.9,
    variacionYoY: 34.1,
    estado: 'Cosechado (dic 25) · Récord histórico',
    esRecord: true,
  },
  {
    grano: 'Girasol',
    estimacion: 7.4,
    variacionYoY: 117.6,
    estado: 'Cosechado (mar 26) · Récord histórico',
    rinde: '23,4 qq/ha',
    esRecord: true,
  },
  {
    grano: 'Cebada',
    estimacion: 5.6,
    variacionYoY: 7.7,
    estado: 'Cosechado (dic 25)',
  },
  {
    grano: 'Sorgo',
    estimacion: 2.4,
    variacionYoY: 0.0,
    estado: 'Cosechado',
  },
];
