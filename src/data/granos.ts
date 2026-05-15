// ============================================================
// MacroLibre — Mercado de Granos Argentina
// ============================================================
// Datos estáticos actualizados a mayo 2026.
// Fuentes: MAGyP (precios FOB), INDEC (exportaciones), DJVE.
//
// Para actualizar: reemplazar los arrays manteniendo el orden
// ascendente por fecha. Los KPIs se actualizan arriba.
// ============================================================

export const ACTUALIZADO_AL = '2026-05-12';
export const FUENTE_FOB   = 'MAGyP — Subsecretaría de Mercados Agropecuarios';
export const FUENTE_DJVE  = 'MAGyP — DJVE (Declaraciones Juradas de Ventas al Exterior)';
export const FUENTE_EXPORT = 'INDEC — Intercambio Comercial Argentino (ICA)';

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
    valor: 'USD 305',
    unidad: 'por tn',
    variacion: 2.3,
    mes: 'May 26',
    color: 'sol',
  },
  {
    label: 'FOB Maíz',
    valor: 'USD 198',
    unidad: 'por tn',
    variacion: -1.5,
    mes: 'May 26',
    color: 'celeste',
  },
  {
    label: 'FOB Trigo',
    valor: 'USD 238',
    unidad: 'por tn',
    variacion: 3.1,
    mes: 'May 26',
    color: 'magenta',
  },
  {
    label: 'DJVE Acumulado',
    valor: '41.2M',
    unidad: 'tn (ene-may 26)',
    mes: 'May 26',
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
  { mes: 'Ene 26', soja: 305, maiz: 199, trigo: 235, girasol: 428 },
  { mes: 'Feb 26', soja: 300, maiz: 201, trigo: 234, girasol: 425 },
  { mes: 'Mar 26', soja: 298, maiz: 197, trigo: 236, girasol: 430 },
  { mes: 'Abr 26', soja: 301, maiz: 196, trigo: 237, girasol: 432 },
  { mes: 'May 26', soja: 305, maiz: 198, trigo: 238, girasol: 435 },
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
  { mes: 'Ene 26', soja: 3.1, maiz: 2.8, trigo: 1.5, total: 7.4 },
  { mes: 'Feb 26', soja: 2.8, maiz: 2.5, trigo: 1.4, total: 6.7 },
  { mes: 'Mar 26', soja: 4.2, maiz: 3.1, trigo: 0.9, total: 8.2 },
  { mes: 'Abr 26', soja: 5.8, maiz: 3.4, trigo: 0.7, total: 9.9 },
  { mes: 'May 26', soja: 5.1, maiz: 3.2, trigo: 0.7, total: 9.0 },
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

// ─── Estimación de cosecha campaña 2025/26 (Mt) ──────────────
export interface Cosecha {
  grano: string;
  estimacion: number;   // millones de toneladas
  variacionYoY: number; // % vs campaña anterior
  estado: string;
}

export const cosecha2526: Cosecha[] = [
  { grano: 'Soja',    estimacion: 49.5, variacionYoY:  8.2,  estado: 'Cosecha en curso' },
  { grano: 'Maíz',   estimacion: 50.0, variacionYoY:  4.6,  estado: 'Cosecha en curso' },
  { grano: 'Trigo',  estimacion: 18.5, variacionYoY: -3.1,  estado: 'Cosechado (dic 25)' },
  { grano: 'Girasol',estimacion:  3.4, variacionYoY:  2.4,  estado: 'Cosechado (mar 26)' },
  { grano: 'Cebada', estimacion:  5.2, variacionYoY:  6.1,  estado: 'Cosechado (dic 25)' },
];
