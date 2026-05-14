// ============================================================
// MacroLibre — Mercado de Uva / Vinos y Mostos Argentina
// ============================================================
// Datos oficiales del INV (Instituto Nacional de Vitivinicultura).
// Snapshot: abril 2026 (mercado externo) · marzo 2026 (interno).
// ============================================================

export const ACTUALIZADO_AL = '2026-05-12';
export const FUENTE_INV = 'INV — Instituto Nacional de Vitivinicultura · Sistema SIM';

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
  { mes: 'Mar-26', vinosUsdMiles: 56480, mostosUsdMiles: 13389, totalUsdMiles: 69869 },
  { mes: 'Abr-26', vinosUsdMiles: 61146, mostosUsdMiles: 13327, totalUsdMiles: 74472 },
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
];

// ─── Composición mercado externo abril 2026 (hl) ─────────────
export interface CategoriaExport {
  tipo: string;
  hl: number;
  participacion: number; // % sobre total
  varVsAnio: number;     // % vs abril 2025
}

export const composicionExterno: CategoriaExport[] = [
  { tipo: 'Vino varietal — color',       hl: 142082, participacion: 69.3, varVsAnio: 11.2 },
  { tipo: 'Vino sin mención — color',    hl: 15428,  participacion: 7.5,  varVsAnio: 23.2 },
  { tipo: 'Vino varietal — blanco',      hl: 20384,  participacion: 9.9,  varVsAnio: 5.5  },
  { tipo: 'Vino sin mención — blanco',   hl: 23798,  participacion: 11.6, varVsAnio: 361.0 },
  { tipo: 'Espumosos',                   hl: 3252,   participacion: 1.6,  varVsAnio: -0.7 },
];

// ─── Mercado interno — total país por mes (hl) ───────────────
// Snapshot reciente: marzo 2026 = 603.391 hl (+8.4% YoY)
export interface InternoMes {
  mes: string;
  vinoTotalHl: number;
}

export const mercadoInternoMensual: InternoMes[] = [
  { mes: 'Ene-26', vinoTotalHl: 481000 },
  { mes: 'Feb-26', vinoTotalHl: 505750 },
  { mes: 'Mar-26', vinoTotalHl: 603391 },
];

// ─── Mercado interno — composición por tipo de envase ────────
export interface Envase {
  tipo: string;
  varInteranualPct: number; // marzo 26 vs marzo 25
}

export const envasesInterno: Envase[] = [
  { tipo: 'Botella',     varInteranualPct: 8.1  },
  { tipo: 'Tetra brik',  varInteranualPct: 13.7 },
  { tipo: 'Lata',        varInteranualPct: 0.3  },
  { tipo: 'Damajuana',   varInteranualPct: -45.3 },
  { tipo: 'Bag in box',  varInteranualPct: -81.4 },
  { tipo: 'Otros',       varInteranualPct: -35.5 },
];

// ─── Acumulado ene-abr 2025 vs 2026 (USD miles FOB) ──────────
export const acumuladoExterno = {
  vinos2025:  199417,
  vinos2026:  202889,
  mostos2025: 36969,
  mostos2026: 47194,
  total2025:  236386,
  total2026:  250082,
  varTotalPct: 5.8,
  varMostosPct: 27.7,
};

// ─── KPIs principales para el hero ────────────────────────────
export const kpisUva = {
  exportAbril: {
    valor: 74472,     // USD miles total (vinos + mostos)
    mes: 'Abril 2026',
    variacionYoY: 21.9, // vino total
  },
  vinoGranel: {
    valor: 45905,
    mes: 'Abril 2026',
    variacionYoY: 69.8,
    descripcion: 'hectolitros exportados',
  },
  mercadoInterno: {
    valor: 603391,    // hl marzo
    mes: 'Marzo 2026',
    variacionYoY: 8.4,
    variacionMoM: 19.3,
  },
  mostoConcentrado: {
    valor: 13327,     // USD miles abril
    mes: 'Abril 2026',
    variacionYoY: 33.9,
  },
};
