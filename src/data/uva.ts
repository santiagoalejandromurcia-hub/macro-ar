// ============================================================
// MacroLibre — Mercado de Uva / Vinos y Mostos Argentina
// ============================================================
// Datos oficiales del INV (Instituto Nacional de Vitivinicultura).
// Mercado externo: informe agosto 2026 (SIM, base 01/09/2026).
// Mercado interno: informe julio 2026 (base 24/08/2026).
// ============================================================

export const ACTUALIZADO_AL = '2026-09-01';
export const FUENTE_INV = 'INV — Instituto Nacional de Vitivinicultura · Sistema SIM';
export const SERIES_ASOF = {
  export: '2026-08',
  interno: '2026-07',
  internoSerieNota: 'faltan Abr–Jun 2026 en la serie interna',
} as const;

// ─── Mercado externo: vinos + mostos por mes (USD miles FOB) ─
export interface ExportMes {
  mes: string;
  vinosUsdMiles: number;
  mostosUsdMiles: number;
  totalUsdMiles: number;
}

export const exportMensual: ExportMes[] = [
  { mes: 'Ene-25', vinosUsdMiles: 38661, mostosUsdMiles: 7019,  totalUsdMiles: 45680 },
  { mes: 'Feb-25', vinosUsdMiles: 49743, mostosUsdMiles: 9534,  totalUsdMiles: 59277 },
  { mes: 'Mar-25', vinosUsdMiles: 52690, mostosUsdMiles: 9394,  totalUsdMiles: 62083 },
  { mes: 'Abr-25', vinosUsdMiles: 58323, mostosUsdMiles: 11022, totalUsdMiles: 69345 },
  { mes: 'May-25', vinosUsdMiles: 57828, mostosUsdMiles: 11587, totalUsdMiles: 69415 },
  { mes: 'Jun-25', vinosUsdMiles: 54163, mostosUsdMiles: 8381,  totalUsdMiles: 62543 },
  { mes: 'Jul-25', vinosUsdMiles: 63657, mostosUsdMiles: 13163, totalUsdMiles: 76821 },
  { mes: 'Ago-25', vinosUsdMiles: 59244, mostosUsdMiles: 13822, totalUsdMiles: 73066 },
  { mes: 'Sep-25', vinosUsdMiles: 63404, mostosUsdMiles: 12545, totalUsdMiles: 75949 },
  { mes: 'Oct-25', vinosUsdMiles: 57083, mostosUsdMiles: 13631, totalUsdMiles: 70714 },
  { mes: 'Nov-25', vinosUsdMiles: 49120, mostosUsdMiles: 12051, totalUsdMiles: 61171 },
  { mes: 'Dic-25', vinosUsdMiles: 57104, mostosUsdMiles: 13172, totalUsdMiles: 70276 },
  { mes: 'Ene-26', vinosUsdMiles: 40360, mostosUsdMiles: 9596,  totalUsdMiles: 49956 },
  { mes: 'Feb-26', vinosUsdMiles: 44902, mostosUsdMiles: 10883, totalUsdMiles: 55785 },
  { mes: 'Mar-26', vinosUsdMiles: 56423, mostosUsdMiles: 13389, totalUsdMiles: 69811 },
  { mes: 'Abr-26', vinosUsdMiles: 60318, mostosUsdMiles: 13185, totalUsdMiles: 73503 },
  { mes: 'May-26', vinosUsdMiles: 55574, mostosUsdMiles: 12208, totalUsdMiles: 67782 },
  { mes: 'Jun-26', vinosUsdMiles: 61257, mostosUsdMiles: 13533, totalUsdMiles: 74789 },
  { mes: 'Jul-26', vinosUsdMiles: 35907, mostosUsdMiles: 9003,  totalUsdMiles: 44910 },
  { mes: 'Ago-26', vinosUsdMiles: 45619, mostosUsdMiles: 8325,  totalUsdMiles: 53943 },
];

// ─── Volumen mercado externo por mes (hl) ────────────────────
export interface VolumenMes {
  mes: string;
  fraccionadoHl: number;
  granelHl: number;
  totalHl: number;
}

export const volumenExternoMensual: VolumenMes[] = [
  { mes: 'Ene-25', fraccionadoHl: 102402, granelHl: 17811, totalHl: 120214 },
  { mes: 'Feb-25', fraccionadoHl: 121453, granelHl: 21251, totalHl: 142703 },
  { mes: 'Mar-25', fraccionadoHl: 127532, granelHl: 20365, totalHl: 147897 },
  { mes: 'Abr-25', fraccionadoHl: 141043, granelHl: 27030, totalHl: 168073 },
  { mes: 'Ene-26', fraccionadoHl: 99091,  granelHl: 41190, totalHl: 140281 },
  { mes: 'Feb-26', fraccionadoHl: 126686, granelHl: 25798, totalHl: 152483 },
  { mes: 'Mar-26', fraccionadoHl: 142025, granelHl: 37476, totalHl: 179501 },
  { mes: 'Abr-26', fraccionadoHl: 159051, granelHl: 45905, totalHl: 204956 },
  { mes: 'May-26', fraccionadoHl: 123991, granelHl: 55070, totalHl: 179061 },
  { mes: 'Jun-26', fraccionadoHl: 135943, granelHl: 36972, totalHl: 172915 },
  { mes: 'Jul-26', fraccionadoHl: 101047, granelHl: 28599, totalHl: 129646 },
  { mes: 'Ago-26', fraccionadoHl: 110743, granelHl: 11165, totalHl: 121908 },
];

// ─── Composición mercado externo agosto 2026 (hl) ─────────────
export interface CategoriaExport {
  tipo: string;
  hl: number;
  participacion: number; // % sobre total
  varVsAnio: number;     // % vs abril 2025
}

export const composicionExterno: CategoriaExport[] = [
  { tipo: 'Vino varietal — color',       hl: 87907, participacion: 72.1, varVsAnio: -29.7 },
  { tipo: 'Vino varietal — blanco',      hl: 14638, participacion: 12.0, varVsAnio: -24.0 },
  { tipo: 'Vino sin mención — color',    hl: 11375, participacion: 9.3,  varVsAnio: -29.8 },
  { tipo: 'Espumosos',                   hl: 5218,  participacion: 4.3,  varVsAnio: 7.1  },
  { tipo: 'Vino sin mención — blanco',   hl: 2675,  participacion: 2.2,  varVsAnio: 47.5 },
];

// ─── Mercado interno — total país por mes (hl) ───────────────
// Interno: ene-mar del snapshot previo + julio 2026 (INV).
export interface InternoMes {
  mes: string;
  vinoTotalHl: number;
}

export const mercadoInternoMensual: InternoMes[] = [
  { mes: 'Ene-26', vinoTotalHl: 481000 },
  { mes: 'Feb-26', vinoTotalHl: 505750 },
  { mes: 'Mar-26', vinoTotalHl: 603391 },
  { mes: 'Jul-26', vinoTotalHl: 649674 },
];

// ─── Mercado interno — composición por tipo de envase ────────
export interface Envase {
  tipo: string;
  varInteranualPct: number; // julio 26 vs julio 25
}

export const envasesInterno: Envase[] = [
  { tipo: 'Botella',     varInteranualPct: 3.6   },
  { tipo: 'Tetra brik',  varInteranualPct: -9.9  },
  { tipo: 'Lata',        varInteranualPct: 7.4   },
  { tipo: 'Damajuana',   varInteranualPct: -28.7 },
  { tipo: 'Bag in box',  varInteranualPct: 372.7 },
  { tipo: 'Otros',       varInteranualPct: -14.9 },
];

// ─── Acumulado ene-ago 2025 vs 2026 (USD miles FOB) ──────────
export const acumuladoExterno = {
  vinos2025:  434358,
  vinos2026:  400359,
  mostos2025: 83921,
  mostos2026: 90121,
  total2025:  518279,
  total2026:  490481,
  varTotalPct: -5.4,
  varMostosPct: 7.4,
};

// ─── KPIs principales para el hero ────────────────────────────
export const kpisUva = {
  exportAbril: {
    valor: 53943,     // USD miles total (vinos + mostos) agosto
    mes: 'Agosto 2026',
    variacionYoY: -26.2,
  },
  vinoGranel: {
    valor: 11165,
    mes: 'Agosto 2026',
    variacionYoY: -75.1,
    descripcion: 'hectolitros exportados',
  },
  mercadoInterno: {
    valor: 649674,
    mes: 'Julio 2026',
    variacionYoY: -1.4,
    variacionMoM: 5.0,
  },
  mostoConcentrado: {
    valor: 8325,     // USD miles agosto
    mes: 'Agosto 2026',
    variacionYoY: -39.8,
  },
};
