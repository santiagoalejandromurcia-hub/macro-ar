// ============================================================
// MacroLibre — Calendario de publicaciones INDEC / BCRA / Min. Economía
// Cada indicador tiene su ventana de días en que se publica.
// El cron corre diario pero solo actúa si hoy está en la ventana.
// ============================================================

export type IndicatorId =
  | 'inflacion'
  | 'inflacion-largo-plazo'
  | 'ipim'
  | 'emae'
  | 'emae-largo-plazo'
  | 'fiscal'
  | 'trade'
  | 'exportaciones'
  | 'arca'
  | 'salario'
  | 'rem'
  | 'pbi'
  | 'pbi-desestacionalizado'
  | 'sector'
  | 'pobreza'
  | 'consumo'
  | 'deuda'
  | 'deuda-consolidada'
  | 'gasto-publico'
  | 'tcr'
  | 'riesgo-pais'
  | 'reservas';

export type DataSource = 'argentinadatos' | 'bcra' | 'manual';

export interface PublicationRule {
  id: IndicatorId;
  label: string;
  /** Días del mes en que típicamente se publica */
  days: number[];
  /** null = todos los meses. Array = solo esos meses (1-12) */
  months: number[] | null;
  source: DataSource;
  description: string;
}

export const PUBLICATION_CALENDAR: PublicationRule[] = [
  {
    id: 'inflacion',
    label: 'IPC — Inflación Mensual',
    days: [12, 13, 14, 15, 16],
    months: null,
    source: 'argentinadatos',
    description: 'INDEC publica el IPC entre los días 12-16 de cada mes',
  },
  {
    id: 'ipim',
    label: 'IPIM — Inflación Mayorista',
    days: [12, 13, 14, 15, 16],
    months: null,
    source: 'argentinadatos',
    description: 'INDEC publica el IPIM junto con el IPC',
  },
  {
    id: 'emae',
    label: 'EMAE — Actividad Económica',
    days: [20, 21, 22, 23, 24, 25, 26],
    months: null,
    source: 'argentinadatos',
    description: 'INDEC publica el EMAE mensualmente entre los días 20-26',
  },
  {
    id: 'fiscal',
    label: 'Resultado Fiscal',
    days: [15, 16, 17, 18, 19, 20],
    months: null,
    source: 'manual',
    description: 'Ministerio de Economía — requiere extracción manual de PDF',
  },
  {
    id: 'trade',
    label: 'Comercio Exterior (ICA)',
    days: [20, 21, 22, 23, 24, 25, 26],
    months: null,
    source: 'argentinadatos',
    description: 'INDEC publica el Intercambio Comercial Argentino mensualmente',
  },
  {
    id: 'arca',
    label: 'Recaudación ARCA',
    days: [2, 3, 4, 5, 6, 7],
    months: null,
    source: 'manual',
    description: 'ARCA publica la recaudación del mes anterior los primeros días',
  },
  {
    id: 'salario',
    label: 'Salario Real (SIPA / EIL)',
    days: [25, 26, 27, 28, 29, 30, 31],
    months: null,
    source: 'argentinadatos',
    description: 'INDEC publica índices de salario hacia fin de mes',
  },
  {
    id: 'reservas',
    label: 'Reservas Internacionales BCRA',
    days: [1, 5, 10, 15, 20, 25],
    months: null,
    source: 'bcra',
    description: 'BCRA actualiza reservas diariamente — se toman snapshots quincenales',
  },
  {
    id: 'riesgo-pais',
    label: 'Riesgo País (EMBI+)',
    days: [1, 5, 10, 15, 20, 25],
    months: null,
    source: 'argentinadatos',
    description: 'Se actualiza con datos históricos quincenales para el gráfico',
  },
  {
    id: 'rem',
    label: 'REM — Expectativas de Mercado',
    days: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    months: [1, 4, 7, 10], // trimestral
    source: 'bcra',
    description: 'BCRA publica el REM trimestralmente',
  },
  {
    id: 'pbi',
    label: 'PBI Trimestral',
    days: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    months: [3, 6, 9, 12], // trimestral
    source: 'argentinadatos',
    description: 'INDEC publica el PBI trimestral en marzo, junio, septiembre y diciembre',
  },
  {
    id: 'pobreza',
    label: 'Pobreza e Indigencia (EPH)',
    days: Array.from({ length: 25 }, (_, i) => i + 1),
    months: [4, 10], // semestral
    source: 'argentinadatos',
    description: 'INDEC publica la EPH semestral en abril y octubre',
  },
  {
    id: 'deuda',
    label: 'Deuda Pública',
    days: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    months: [3, 6, 9, 12], // trimestral
    source: 'manual',
    description: 'Ministerio de Economía — requiere extracción manual de PDF',
  },
  {
    id: 'tcr',
    label: 'Tipo de Cambio Real (TCR)',
    days: [15, 16, 17, 18, 19, 20],
    months: null,
    source: 'bcra',
    description: 'BCRA publica el TCR multilateral mensualmente',
  },
  {
    id: 'sector',
    label: 'Actividad por Sector (EMAE desagregado)',
    days: [20, 21, 22, 23, 24, 25, 26],
    months: null,
    source: 'manual',
    description: 'EMAE por sector — requiere actualización manual con datos INDEC',
  },
  {
    id: 'emae-largo-plazo',
    label: 'EMAE Largo Plazo (desestacionalizado)',
    days: [20, 21, 22, 23, 24, 25, 26],
    months: null,
    source: 'manual',
    description: 'Serie de largo plazo procesada manualmente — requiere actualización manual',
  },
  {
    id: 'inflacion-largo-plazo',
    label: 'Inflación Largo Plazo (1990–actualidad)',
    days: [12, 13, 14, 15, 16],
    months: null,
    source: 'manual',
    description: 'Serie histórica procesada manualmente — requiere actualización manual',
  },
  {
    id: 'pbi-desestacionalizado',
    label: 'PBI desestacionalizado (Base I-17=100)',
    days: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    months: [3, 6, 9, 12],
    source: 'manual',
    description: 'Serie procesada por Econométrica — requiere actualización manual',
  },
  {
    id: 'consumo',
    label: 'Consumo Privado desestacionalizado',
    days: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    months: [3, 6, 9, 12],
    source: 'manual',
    description: 'Serie procesada por Econométrica — requiere actualización manual',
  },
  {
    id: 'exportaciones',
    label: 'Exportaciones anuales',
    days: [20, 21, 22, 23, 24, 25, 26],
    months: [1, 2], // INDEC publica anuales en enero/febrero del año siguiente
    source: 'manual',
    description: 'INDEC publica datos anuales de exportaciones — actualización anual',
  },
  {
    id: 'deuda-consolidada',
    label: 'Deuda Pública Consolidada (Tesoro + BCRA)',
    days: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    months: [3, 6, 9, 12],
    source: 'manual',
    description: 'Ministerio de Economía — requiere extracción manual de PDF',
  },
  {
    id: 'gasto-publico',
    label: 'Gasto Primario Nacional (% PIB)',
    days: [15, 16, 17, 18, 19, 20],
    months: null,
    source: 'manual',
    description: 'IARAF / Ministerio de Economía — requiere actualización manual mensual',
  },
];

/** Devuelve los indicadores que deben actualizarse hoy según el calendario. */
export function getIndicatorsDueToday(): PublicationRule[] {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  return PUBLICATION_CALENDAR.filter((rule) => {
    const dayMatch = rule.days.includes(day);
    const monthMatch = rule.months === null || rule.months.includes(month);
    return dayMatch && monthMatch;
  });
}

/** Fuerza un indicador específico, ignorando el calendario. */
export function getRuleById(id: IndicatorId): PublicationRule | undefined {
  return PUBLICATION_CALENDAR.find((r) => r.id === id);
}
