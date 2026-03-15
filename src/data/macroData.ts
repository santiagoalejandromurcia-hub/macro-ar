// ============================================================
// MacroAR.app — Datos Macroeconómicos de Argentina
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
    value: '3.3%',
    change: 0.3,
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
    value: 'USD 45.659M',
    change: 0.01,
    changeLabel: 'respecto a mes anterior',
    icon: '🏦',
},
  {
    id: 'dolar-blue',
    title: 'Dólar Blue',
    value: '$1415',
    change: 0,
    changeLabel: 'vs. semana anterior',
    icon: '💵',
  },
  {
    id: 'riesgo-pais',
    title: 'Riesgo País',
    value: '687',
    change: -15.2,
    changeLabel: 'puntos básicos',
    unit: 'pb',
    icon: '🌍',
  },
];

// EMAE — Estimador Mensual de Actividad Económica
export const emaeData = [
  { date: 'Ene 23', value: 149.4, trend: 144.0 },
  { date: 'Mar 23', value: 148.7, trend: 143.8 },
  { date: 'May 23', value: 148.0, trend: 143.0 },
  { date: 'Jul 23', value: 147.2, trend: 142.0 },
  { date: 'Sep 23', value: 146.2, trend: 140.2 },
  { date: 'Nov 23', value: 145.1, trend: 138.0 },
  { date: 'Ene 24', value: 144.2, trend: 132.0 },
  { date: 'Mar 24', value: 143.9, trend: 129.5 },
  { date: 'May 24', value: 144.4, trend: 133.5 },
  { date: 'Jul 24', value: 145.7, trend: 138.8 },
  { date: 'Sep 24', value: 147.4, trend: 144.0 },
  { date: 'Nov 24', value: 149.0, trend: 150.2 },
  { date: 'Ene 25', value: 150.3, trend: 155.5 },
  { date: 'Mar 25', value: 151.2, trend: 158.8 },
  { date: 'May 25', value: 151.7, trend: 161.2 },
  { date: 'Jul 25', value: 152.2, trend: 161.5},
  { date: 'Sep 25', value: 152.8, trend: 161.9 },
  { date: 'Nov 25', value: 153.6, trend: 162.2 },
  { date: 'Dic 25', value: 154.0, trend: 162.6 },
];

// PBI Trimestral
export const pbiData = [
  { quarter: 'Q1 23', yoy: 1.3 },
  { quarter: 'Q2 23', yoy: -0.5 },
  { quarter: 'Q3 23', yoy: -2.1 },
  { quarter: 'Q4 23', yoy: -5.8 },
  { quarter: 'Q1 24', yoy: -10.0 },
  { quarter: 'Q2 24', yoy: -6.0 },
  { quarter: 'Q3 24', yoy: 0.4 },
  { quarter: 'Q4 24', yoy: 9.4 },
  { quarter: 'Q1 25', yoy: 16.2 },
  { quarter: 'Q2 25', yoy: 13.1 },
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

// Resultado Fiscal (% del PIB)
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
];

// Recaudación tributaria
export const taxData = [
  { concepto: 'IVA', monto: '4.120.500', pctPIB: '7.2%', variacion: '+185%' },
  { concepto: 'Ganancias', monto: '3.890.200', pctPIB: '6.8%', variacion: '+210%' },
  { concepto: 'Der. Exportación', monto: '1.245.800', pctPIB: '2.2%', variacion: '+95%' },
  { concepto: 'Combustibles', monto: '890.300', pctPIB: '1.6%', variacion: '+175%' },
  { concepto: 'Bienes Personales', monto: '456.100', pctPIB: '0.8%', variacion: '+320%' },
  { concepto: 'Seg. Social', monto: '3.210.400', pctPIB: '5.6%', variacion: '+165%' },
  { concepto: 'Otros', monto: '1.890.700', pctPIB: '3.3%', variacion: '+140%' },
  { concepto: 'TOTAL', monto: '15.704.000', pctPIB: '27.5%', variacion: '+188%' },
];

// Balanza Comercial (USD millones)
export const tradeData = [
{ month: 'Ene 25', exports: 5.915, imports: 5.753, balance: 162 },
  { month: 'Feb 25', exports: 6.140, imports: 5.864, balance: 275 },
  { month: 'Mar 25', exports: 6.642, imports: 6.019, balance: 623 },
  { month: 'Abr 25', exports: 6.674, imports: 6.460, balance: 214 },
  { month: 'May 25', exports: 7.095, imports: 6.488, balance: 607 },
  { month: 'Jun 25', exports: 7.275, imports: 6.396, balance: 879 },
  { month: 'Jul 25', exports: 7.761, imports: 6.854, balance: 907 },
  { month: 'Ago 25', exports: 7.903, imports: 6.463, balance: 1440 },
  { month: 'Sep 25', exports: 8.128, imports: 7.191, balance: 937 },
  { month: 'Oct 25', exports: 7.963, imports: 7.150, balance: 813 },
  { month: 'Nov 25', exports: 8.133, imports: 5.598, balance: 2535 },
  { month: 'Dic 25', exports: 7.482, imports: 5.556, balance: 1927 },
  { month: 'Ene 26', exports: 7.057, imports: 5.070, balance: 1987 },
  { month: 'Est-Feb 26', exports: 7.110, imports: 5.120, balance: 1990 },
];

// Reservas BCRA (USD millones)
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
];

// Tipo de cambio (ARS/USD)
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

// Última actualización
export const lastUpdate = '15 de marzo de 2026';
