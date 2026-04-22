// ============================================================
// MacroLibre — Datos Macroeconómicos de Argentina
// ============================================================
// Estos datos son MOCK estáticos para la primera versión.
// Más adelante se pueden reemplazar por fetch a APIs reales:
//   - https://apis.datos.gob.ar
//   - https://api.bcra.gob.ar
//   - https://api.bluelytics.com.ar/v2/latest
// ============================================================

export interface KPICard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  unit?: string;
  icon: string;
}

export const kpiCards: KPICard[] = [
  {
    id: 'emae',
    title: 'EMAE',
    value: '3.5%',
    change: 1.8,
    changeLabel: 'vs. mismo mes año ant.',
    unit: 'Índice 2004=100',
    icon: '📊',
  },
  {
    id: 'pbi',
    title: 'PBI Real',
    value: '4.4',
    change: 0.6,
    changeLabel: 'var. interanual',
    icon: '📈',
  },
  {
    id: 'inflacion',
    title: 'Inflación Mensual',
    value: '2.9%',
    change: 0,
    changeLabel: 'vs. mes anterior',
    icon: '🏷️',
  },
  {
    id: 'superavit',
    title: 'Superávit Primario',
    value: '1.8%',
    change: 2.1,
    changeLabel: '% del PIB acumulado',
    unit: '% PIB',
    icon: '✅',
  },
  {
    id: 'reservas',
    title: 'Reservas BCRA',
    value: 'USD 43.808M',
    change: 0.01,
    changeLabel: 'respecto a mes anterior',
    icon: '🏦',
  },
];

// EMAE — Estimador Mensual de Actividad Económica
export const emaeData = [
  { date: 'Ene 23', value: 143.0, trend: 144.0 },
  { date: 'Mar 23', value: 155.0, trend: 143.8 },
  { date: 'May 23', value: 153.8, trend: 143.0 },
  { date: 'Jul 23', value: 150.2, trend: 142.0 },
  { date: 'Sep 23', value: 148.4, trend: 140.2 },
  { date: 'Nov 23', value: 146.4, trend: 138.0 },
  { date: 'Ene 24', value: 137.5, trend: 132.0 },
  { date: 'Mar 24', value: 142.6, trend: 129.5 },
  { date: 'May 24', value: 156.8, trend: 133.5 },
  { date: 'Jul 24', value: 145.7, trend: 138.8 },
  { date: 'Sep 24', value: 148.1, trend: 144.0 },
  { date: 'Nov 24', value: 148.1, trend: 150.2 },
  { date: 'Ene 25', value: 146.3, trend: 155.5 },
  { date: 'Mar 25', value: 150.4, trend: 158.8 },
  { date: 'May 25', value: 164.9, trend: 161.2 },
  { date: 'Jul 25', value: 153.9, trend: 161.5},
  { date: 'Sep 25', value: 151.8, trend: 161.9 },
  { date: 'Nov 25', value: 147.7, trend: 162.2 },
  { date: 'Dic 25', value: 153.5, trend: 162.6 },
  { date: 'Ene 26', value: 149.0, trend: 163.0 },
];

// PBI Trimestral (variación interanual % YoY) - Actualizado 16/03/2026
export const pbiData = [
  { quarter: 'Q1 23', yoy: 1.3 },
  { quarter: 'Q2 23', yoy: -0.5 },
  { quarter: 'Q3 23', yoy: -2.1 },
  { quarter: 'Q4 23', yoy: -5.8 },
  { quarter: 'Q1 24', yoy: -10.0 },
  { quarter: 'Q2 24', yoy: -6.0 },
  { quarter: 'Q3 24', yoy: 0.4 },
  { quarter: 'Q4 24', yoy: 9.4 },
  { quarter: 'Q1 25', yoy: 5.8 },     // Oficial INDEC
  { quarter: 'Q2 25', yoy: 6.4 },     // Oficial INDEC (corregido)
  { quarter: 'Q3 25', yoy: 3.3 },     // Oficial INDEC (último publicado)
  { quarter: 'Q4 25', yoy: 3.8 },     // Preliminar (cierra el año en +4,4% anual)
  { quarter: 'Q1 26', yoy: 3.5 },     // Estimación preliminar basada en EMAE y REM
];

// Actividad por sector
export const sectorData = [
  { sector: 'Construcción', value: 12.1, color: '#D4A843' },
  { sector: 'Minería', value: 9.5, color: '#F97316' },
  { sector: 'Agro', value: 8.2, color: '#22C55E' },
  { sector: 'Energía', value: 7.3, color: '#EC4899' },
  { sector: 'Comercio', value: 6.8, color: '#A78BFA' },
  { sector: 'Industria', value: 5.4, color: '#74ACDF' },
  { sector: 'Financiero', value: 4.2, color: '#06B6D4' },
  { sector: 'Transporte', value: 3.8, color: '#84CC16' },
];

// Resultado Fiscal (% del PIB) SECRETARIA DE HACIENDA - Actualizado 16/03/2026
export const fiscalData = [
  { period: 'Ene 24', primario: 2.0, financiero: 0.5 },
  { period: 'Mar 24', primario: 0.6, financiero: 0.2 },
  { period: 'May 24', primario: 2.3, financiero: 1.1 },
  { period: 'Jul 24', primario: 0.9, financiero: -0.1 },
  { period: 'Sep 24', primario: 0.8, financiero: 0.4 },
  { period: 'Nov 24', primario: 1.3, financiero: 0.3 },
  { period: 'Dic 24', primario: -1.3, financiero: -1.5 },
  { period: 'Ene 25', primario: 2.4, financiero: 0.6 },
  { period: 'Mar 25', primario: 0.7, financiero: 0.4 },
  { period: 'May 25', primario: 1.6, financiero: 0.6 },
  { period: 'Jul 25', primario: 1.7, financiero: -0.1 },
  { period: 'Sep 25', primario: 0.6, financiero: 0.3 },
  { period: 'Nov 25', primario: 2.1, financiero: 0.5 },
  { period: 'Dic 25', primario: 2.0, financiero: 1.1 },
  { period: 'Ene 26', primario: 3.0, financiero: 1.1 },
  { period: 'Feb 26', primario: 1.4, financiero: 0.1 },

];

// Recaudación Tributaria Nacional (millones de pesos) - Febrero 2026
// Fuente oficial: ARCA (ex AFIP) - Reporte mensual febrero 2026
export const taxData = [
  { concepto: 'IVA', monto: '5.405.500', pctPIB: '7.1%', variacion: '+13.7%' },
  { concepto: 'Ganancias', monto: '3.432.200', pctPIB: '4.5%', variacion: '+31.2%' },
  { concepto: 'Der. Exportación', monto: '680.000', pctPIB: '0.9%', variacion: '-38%' },
  { concepto: 'Combustibles', monto: '1.450.000', pctPIB: '1.9%', variacion: '+55%' },
  { concepto: 'Bienes Personales', monto: '520.000', pctPIB: '0.7%', variacion: '-15%' },
  { concepto: 'Seg. Social', monto: '4.284.500', pctPIB: '5.6%', variacion: '+26.2%' },
  { concepto: 'Otros', monto: '2.459.630', pctPIB: '3.2%', variacion: '+22%' },
  { concepto: 'TOTAL', monto: '16.231.830', pctPIB: '21.9%', variacion: '+20.1%' },
];

// Balanza Comercial (USD millones)
export const tradeData = [
  { month: 'Ene 25', exports: 5915, imports: 5753, balance: 162 },
  { month: 'Feb 25', exports: 6140, imports: 5864, balance: 275 },
  { month: 'Mar 25', exports: 6642, imports: 6019, balance: 623 },
  { month: 'Abr 25', exports: 6674, imports: 6460, balance: 214 },
  { month: 'May 25', exports: 7095, imports: 6488, balance: 607 },
  { month: 'Jun 25', exports: 7275, imports: 6396, balance: 879 },
  { month: 'Jul 25', exports: 7761, imports: 6854, balance: 907 },
  { month: 'Ago 25', exports: 7903, imports: 6463, balance: 1440 },
  { month: 'Sep 25', exports: 8128, imports: 7191, balance: 937 },
  { month: 'Oct 25', exports: 7963, imports: 7150, balance: 813 },
  { month: 'Nov 25', exports: 8133, imports: 5598, balance: 2535 },
  { month: 'Dic 25', exports: 7482, imports: 5556, balance: 1927 },
  { month: 'Ene 26', exports: 7057, imports: 5070, balance: 1987 },
  { month: 'Est-Feb 26', exports: 7110, imports: 5120, balance: 1990 },
];

// Reservas Internacionales BCRA (USD millones) - Actualizado 16/03/2026
export const reservasData = [
  { date: 'Dic 23', value: 23068 },
  { date: 'Feb 24', value: 26400 },
  { date: 'Abr 24', value: 28700 },
  { date: 'Jun 24', value: 29600 },
  { date: 'Ago 24', value: 26900 },
  { date: 'Oct 24', value: 28100 },
  { date: 'Dic 24', value: 30500 },
  { date: 'Feb 25', value: 28800 },
  { date: 'Abr 25', value: 31200 },
  { date: 'May 25', value: 32450 },
  { date: 'Jul 25', value: 34800 },
  { date: 'Sep 25', value: 37200 },
  { date: 'Nov 25', value: 40100 },
  { date: 'Dic 25', value: 42800 },
  { date: 'Feb 26', value: 46200 },
  { date: 'Mar 26', value: 43808 },   // ← ÚLTIMO DATO OFICIAL (11/03/2026)
];

// Tipo de cambio (ARS/USD) - Actualizado 16/03/2026
// Fuente: Banco Nación + Ámbito + Cronista + Rava Bursátil
export const tcrData = [
  { date: 'Dic 23', oficial: 808, blue: 1050, mep: 985 },
  { date: 'Feb 24', oficial: 852, blue: 1175, mep: 1120 },
  { date: 'Abr 24', oficial: 895, blue: 1080, mep: 1050 },
  { date: 'Jun 24', oficial: 939, blue: 1350, mep: 1290 },
  { date: 'Ago 24', oficial: 983, blue: 1350, mep: 1300 },
  { date: 'Oct 24', oficial: 1027, blue: 1220, mep: 1180 },
  { date: 'Dic 24', oficial: 1071, blue: 1150, mep: 1120 },
  { date: 'Feb 25', oficial: 1088, blue: 1190, mep: 1150 },
  { date: 'Abr 25', oficial: 1100, blue: 1188, mep: 1148 },
  { date: 'May 25', oficial: 1105, blue: 1185, mep: 1142 },
  { date: 'Jul 25', oficial: 1180, blue: 1220, mep: 1195 },
  { date: 'Sep 25', oficial: 1250, blue: 1280, mep: 1260 },
  { date: 'Nov 25', oficial: 1320, blue: 1345, mep: 1330 },
  { date: 'Dic 25', oficial: 1365, blue: 1380, mep: 1370 },
  { date: 'Feb 26', oficial: 1410, blue: 1425, mep: 1418 },
  { date: 'Mar 26', oficial: 1420, blue: 1415, mep: 1424 },   // ← ÚLTIMO DATO REAL (16/03/2026)
];

// Inflación IPC
export const inflacionData = [
  { date: 'Dic 23', mensual: 25.5, interanual: 211.4, nucleo: 28.3 },
  { date: 'Feb 24', mensual: 13.2, interanual: 276.2, nucleo: 15.1 },
  { date: 'Abr 24', mensual: 8.8, interanual: 289.4, nucleo: 9.4 },
  { date: 'Jun 24', mensual: 4.6, interanual: 271.5, nucleo: 4.8 },
  { date: 'Ago 24', mensual: 4.2, interanual: 236.7, nucleo: 4.3 },
  { date: 'Oct 24', mensual: 2.7, interanual: 193.0, nucleo: 2.9 },
  { date: 'Dic 24', mensual: 2.7, interanual: 117.8, nucleo: 2.8 },
  { date: 'Feb 25', mensual: 2.4, interanual: 66.9, nucleo: 2.5 },
  { date: 'Abr 25', mensual: 2.8, interanual: 47.3, nucleo: 2.6 },
  { date: 'May 25', mensual: 2.2, interanual: 40.1, nucleo: 2.3 },
  { date: 'Jun 25', mensual: 1.6, interanual: 39.4, nucleo: 2.0 },
  { date: 'Jul 25', mensual: 1.9, interanual: 36.6, nucleo: 2.0 },
  { date: 'Ago 25', mensual: 1.9, interanual: 33.6, nucleo: 2.0 },
  { date: 'Sep 25', mensual: 2.1, interanual: 31.8, nucleo: 2.2 },
  { date: 'Oct 25', mensual: 2.3, interanual: 31.3, nucleo: 2.6 },
  { date: 'Nov 25', mensual: 2.5, interanual: 31.4, nucleo: 2.7 },
  { date: 'Dic 25', mensual: 2.8, interanual: 31.5, nucleo: 3.0 },
  { date: 'Ene 26', mensual: 2.9, interanual: 32.4, nucleo: 3.1 },
  { date: 'Feb 26', mensual: 2.9, interanual: 33.1, nucleo: 3.2 },
];

// REM — Expectativas inflación (BCRA) — Fuente: REM feb-26 e INDEC
export const remData = [
  { period: 'Dic 25', mediana: 2.9, actual: 2.9, r25: 2.6, r75: 3.2, r10: 2.3, r90: 3.5 },
  { period: 'Ene 26', mediana: 2.7, actual: null, r25: 2.4, r75: 3.0, r10: 2.1, r90: 3.3 },
  { period: 'Feb 26', mediana: 2.5, actual: null, r25: 2.2, r75: 2.8, r10: 1.9, r90: 3.1 },
  { period: 'Mar 26', mediana: 2.2, actual: null, r25: 1.9, r75: 2.6, r10: 1.6, r90: 2.9 },
  { period: 'Abr 26', mediana: 1.9, actual: null, r25: 1.6, r75: 2.3, r10: 1.3, r90: 2.7 },
  { period: 'May 26', mediana: 1.8, actual: null, r25: 1.5, r75: 2.2, r10: 1.2, r90: 2.5 },
  { period: 'Jun 26', mediana: 1.7, actual: null, r25: 1.4, r75: 2.1, r10: 1.1, r90: 2.4 },
  { period: 'Jul 26', mediana: 1.5, actual: null, r25: 1.2, r75: 1.9, r10: 1.0, r90: 2.2 },
];
// Inflación Mayorista — IPIM (INDEC) - Interanuales corregidos con datos oficiales INDEC
export const inflacionMayoristaData = [
  { date: 'Dic 23', mensual: 54.0, interanual: 276.4 },     // Pico post-devaluación
  { date: 'Feb 24', mensual: 10.2, interanual: 310.5 },     // Máximo histórico reciente
  { date: 'Abr 24', mensual: 5.4, interanual: 289.4 },
  { date: 'Jun 24', mensual: 2.8, interanual: 245.1 },
  { date: 'Ago 24', mensual: 2.1, interanual: 197.8 },
  { date: 'Oct 24', mensual: 1.5, interanual: 148.2 },
  { date: 'Dic 24', mensual: 1.4, interanual: 67.3 },
  { date: 'Ene 25', mensual: 1.6, interanual: 67.3 },       // Transición
  { date: 'Feb 25', mensual: 1.6, interanual: 42.1 },       // Baja fuerte
  { date: 'Mar 25', mensual: 1.5, interanual: 55.9 },       // Corregido (no 67.3 repetido)
  { date: 'Abr 25', mensual: 2.7, interanual: 30.8 },
  { date: 'May 25', mensual: -0.3, interanual: 26.4 },
  { date: 'Jun 25', mensual: 1.6, interanual: 25.7 },
  { date: 'Jul 25', mensual: 2.8, interanual: 24.3 },
  { date: 'Ago 25', mensual: 3.0, interanual: 22.8 },
  { date: 'Sep 25', mensual: 3.7, interanual: 21.5 },
  { date: 'Oct 25', mensual: 1.1, interanual: 21.0 },
  { date: 'Nov 25', mensual: 1.7, interanual: 20.8 },
  { date: 'Dic 25', mensual: 2.5, interanual: 26.2 },       // Cierre 2025 oficial ~26.2%
  { date: 'Ene 26', mensual: 1.7, interanual: 26.4 },       // Enero 2026 oficial
  { date: 'Feb 26', mensual: 1.0, interanual: 25.6 },       // Febrero 2026 oficial (INDEC 17/03/2026)
];
// Última actualización
export const lastUpdate = new Date().toLocaleDateString('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
