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
    value: '+4.1%',
    change: 4.1,
    changeLabel: 'var. i.a. (Mar 26)',
    unit: 'Índice 2004=100',
    icon: '📊',
  },
  {
    id: 'pbi',
    title: 'PBI Real',
    value: '2.6',
    change: 2.6,
    changeLabel: 'var. interanual (Q1-26 e.)',
    icon: '📈',
  },
  {
    id: 'inflacion',
    title: 'Inflación Mensual',
    value: '1.9%',
    change: -1.0,
    changeLabel: 'Mar 26 (vs Feb 2.9%)',
    icon: '🏷️',
  },
  {
    id: 'superavit',
    title: 'Superávit Primario',
    value: '0.5%',
    change: -0.9,
    changeLabel: '1T 26 (Ene-Mar) % del PIB',
    unit: '% PIB',
    icon: '✅',
  },
  {
    id: 'reservas',
    title: 'Reservas BCRA',
    value: 'USD 34,560M',
    change: 1.8,
    changeLabel: 'vs. cierre abril',
    icon: '🏦',
  },
  {
    id: 'tamar',
    title: 'TAMAR Diaria',
    value: '17.16% n.a.',
    change: 0,
    changeLabel: 'Tasa activa mercado bancos privados · BCRA',
    unit: '% n.a.',
    icon: '📉',
  },
];

// EMAE — Estimador Mensual de Actividad Económica
export const emaeData = [

  { date: 'Ene 23', value: 143.0, trend: 149.3 },
  { date: 'Mar 23', value: 155.1, trend: 148.6 },
  { date: 'May 23', value: 153.8, trend: 148.0 },
  { date: 'Jul 23', value: 150.2, trend: 147.2 },
  { date: 'Sep 23', value: 148.4, trend: 146.2 },
  { date: 'Nov 23', value: 146.4, trend: 145.2 },
  { date: 'Ene 24', value: 137.5, trend: 144.3 },
  { date: 'Mar 24', value: 142.6, trend: 144.0 },
  { date: 'May 24', value: 156.8, trend: 144.5 },
  { date: 'Jul 24', value: 149.7, trend: 145.7 },
  { date: 'Sep 24', value: 144.8, trend: 147.4 },
  { date: 'Nov 24', value: 148.1, trend: 149.0 },
  { date: 'Ene 25', value: 146.3, trend: 150.4 },
  { date: 'Mar 25', value: 150.4, trend: 151.2 },
  { date: 'May 25', value: 164.9, trend: 151.7 },
  { date: 'Jul 25', value: 153.9, trend: 152.0 },
  { date: 'Sep 25', value: 151.8, trend: 152.4 },
  { date: 'Nov 25', value: 147.7, trend: 153.2 },
  { date: 'Dic 25', value: 153.5, trend: 153.7 },
  { date: 'Ene 26', value: 148.6, trend: 154.3 },
  { date: 'Feb 26', value: 138.3, trend: 154.9 },
  { date: 'Mar 26', value: 158.6, trend: 155.6 },
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
  { quarter: 'Q1 26', yoy: 1.8 },     // Revisada a la baja: EMAE Feb-26 -2.1% i.a.
];

// Actividad por sector - Variación interanual (%) 
// Fuente: INDEC - EMAE Febrero 2026 (último dato publicado)
export const sectorData = [
  { sector: 'Minería', value: 9.9, color: '#F97316' },           // Explotación de minas y canteras
  { sector: 'Agro', value: 8.4, color: '#22C55E' },              // Agricultura, ganadería, caza y silvicultura
  { sector: 'Pesca', value: 14.8, color: '#10B981' },            // (Agregado - fuerte impulsor)
  { sector: 'Construcción', value: 12.7, color: '#D4A843' },     // Marzo 2026 (ISAC)
  { sector: 'Energía', value: -3.5, color: '#EC4899' },          // Electricidad, gas y agua (aprox.)
  { sector: 'Comercio', value: -7.0, color: '#A78BFA' },         // Comercio mayorista y minorista
  { sector: 'Industria', value: -8.7, color: '#74ACDF' },        // Industria manufacturera
  { sector: 'Financiero', value: 6.0, color: '#06B6D4' },        // Intermediación financiera (aprox.)
  { sector: 'Transporte', value: -2.5, color: '#84CC16' },       // Estimado
];
// Resultado Fiscal (% del PIB) - Secretaría de Hacienda / Ministerio de Economía
// Actualizado al 14 de mayo de 2026
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
  { period: 'Ene 26', primario: 3.0, financiero: 1.1 },   // Oficial
  { period: 'Feb 26', primario: 1.4, financiero: 0.1 },   // Oficial
  { period: 'Mar 26', primario: 0.9, financiero: 0.4 },
  { period: 'Abr 26', primario: 0.6, financiero: 0.2 },  // Mensual no publicado (solo acumulado)
  
];

// Recaudación Tributaria Nacional (millones de pesos) - Abril 2026
// Fuente oficial: ARCA (ex AFIP) - Reporte mensual abril 2026
export const taxData = [
  { concepto: 'IVA', monto: '6.049.934', pctPIB: '-', variacion: '+28.3%' },
  { concepto: 'Ganancias', monto: '3.136.961', pctPIB: '-', variacion: '+28.0%' },
  { concepto: 'Der. Exportación', monto: '574.547', pctPIB: '-', variacion: '-13.3%' },
  { concepto: 'Combustibles', monto: '≈680.000', pctPIB: '-', variacion: '+74.1%' },   // Estimado según reportes
  { concepto: 'Bienes Personales', monto: '65.783', pctPIB: '-', variacion: '+12.0%' },
  { concepto: 'Seg. Social', monto: '4.552.873', pctPIB: '-', variacion: '+26.6%' },
  { concepto: 'Otros', monto: '≈2.340.000', pctPIB: '-', variacion: '-' },            // Incluye Créditos/Débitos ~1.426.170 y resto
  { concepto: 'TOTAL', monto: '17.400.833', pctPIB: '-', variacion: '+27.2%' },
];

// Balanza Comercial (USD millones)
// Actualizado al 20-may-2026 · Fuente: INDEC — Intercambio Comercial Argentino
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
  { month: 'Feb 26', exports: 5962, imports: 5174, balance: 788 },
  { month: 'Mar 26', exports: 8645, imports: 6122, balance: 2523 },
  { month: 'Abr 26', exports: 8914, imports: 6203, balance: 2711 }, // ← RÉCORD HISTÓRICO · INDEC 20/05/2026
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
  { date: 'Feb 26', value: 46905 },   // Pico histórico
  { date: 'Mar 26', value: 43808 },
  { date: 'Abr 26', value: 46088 },   // ← ÚLTIMO DATO (28/04/2026) · BCRA compró USD 2.299M en abril
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
  { date: 'Mar 26', oficial: 1420, blue: 1415, mep: 1424 },
  { date: 'Abr 26', oficial: 1445, blue: 1450, mep: 1448 },
  { date: 'May 26', oficial: 1385, blue: 1395, mep: 1424 },
     // ← ÚLTIMO DATO (28/04/2026)
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
  { date: 'Mar 26', mensual: 3.4, interanual: 32.6, nucleo: 3.2 }, 
  { date: 'Abr 26', mensual: 2.6, interanual: 32.4, nucleo: 2.3 },
    // ← ÚLTIMO INDEC (15/04/2026) · Q1-26: 9.4% acum.
];

// REM — Expectativas inflación (BCRA) — Fuente: REM feb-26 e INDEC
export const remData = [
  { period: 'Dic 25', mediana: 2.9, actual: 2.9, r25: 2.6, r75: 3.2, r10: 2.3, r90: 3.5 },
  { period: 'Ene 26', mediana: 2.8, actual: null, r25: 2.4, r75: 3.0, r10: 2.1, r90: 3.3 },
  { period: 'Feb 26', mediana: 2.9, actual: null, r25: 2.2, r75: 2.8, r10: 1.9, r90: 3.1 },
  { period: 'Mar 26', mediana: 3.4, actual: null, r25: 1.9, r75: 2.6, r10: 1.6, r90: 2.9 },
  { period: 'Abr 26', mediana: 2.6, actual: null, r25: 1.6, r75: 2.3, r10: 1.3, r90: 2.7 },
  { period: 'May 26', mediana: 2.3, actual: null, r25: 1.5, r75: 2.2, r10: 1.2, r90: 2.5 },
  { period: 'Jun 26', mediana: 2.1, actual: null, r25: 1.4, r75: 2.1, r10: 1.1, r90: 2.4 },
  { period: 'Jul 26', mediana: 2.0, actual: null, r25: 1.2, r75: 1.9, r10: 1.0, r90: 2.2 },
  { period: 'Ago 26', mediana: 1.8, actual: null, r25: 1.1, r75: 1.8, r10: 0.9, r90: 2.0 },
  { period: 'Sep 26', mediana: 1.9, actual: null, r25: 1.0, r75: 1.7, r10: 0.8, r90: 2.0 },
  { period: 'Oct 26', mediana: 1.8, actual: null, r25: 0.9, r75: 1.6, r10: 0.7, r90: 1.8 },
  
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
  { date: 'Feb 26', mensual: 1.0, interanual: 25.6 }, 
  { date: 'Mar 26', mensual: 3.4, interanual: 27.9 }, 
  { date: 'Abr 26', mensual: 2.4, interanual: 25.6 },     
];
// ============================================================
// Consumo Privado — Serie desestacionalizada (Base I-17 = 100)
// Fuente: Econométrica en base a INDEC
// Etapas: J×C (2017-2019) · Kirchnerismo/Fernández (2019-2023) · Milei (2024-2025)
// Hitos: IV-17 ~100 · IV-19 ~94 · COVID II-20 mín · II-23 recuperación ·
//        II-24 caída · IV-25 nuevo máximo (+14% desde II-24)
// ============================================================
export type EtapaPolitica = 'jxc' | 'fdt' | 'lla';

export const consumoPrivadoData: Array<{
  quarter: string;
  value: number;
  etapa: EtapaPolitica;
}> = [
  { quarter: 'I-17',  value: 100.0, etapa: 'jxc' },
  { quarter: 'II-17', value: 100.4, etapa: 'jxc' },
  { quarter: 'III-17',value: 100.8, etapa: 'jxc' },
  { quarter: 'IV-17', value: 100.2, etapa: 'jxc' },
  { quarter: 'I-18',  value: 100.5, etapa: 'jxc' },
  { quarter: 'II-18', value:  99.6, etapa: 'jxc' },
  { quarter: 'III-18',value:  97.8, etapa: 'jxc' },
  { quarter: 'IV-18', value:  96.4, etapa: 'jxc' },
  { quarter: 'I-19',  value:  95.6, etapa: 'jxc' },
  { quarter: 'II-19', value:  95.0, etapa: 'jxc' },
  { quarter: 'III-19',value:  94.4, etapa: 'jxc' },
  { quarter: 'IV-19', value:  94.0, etapa: 'fdt' },
  { quarter: 'I-20',  value:  90.5, etapa: 'fdt' },
  { quarter: 'II-20', value:  74.8, etapa: 'fdt' },
  { quarter: 'III-20',value:  84.3, etapa: 'fdt' },
  { quarter: 'IV-20', value:  90.1, etapa: 'fdt' },
  { quarter: 'I-21',  value:  92.5, etapa: 'fdt' },
  { quarter: 'II-21', value:  93.8, etapa: 'fdt' },
  { quarter: 'III-21',value:  96.2, etapa: 'fdt' },
  { quarter: 'IV-21', value:  98.4, etapa: 'fdt' },
  { quarter: 'I-22',  value:  99.7, etapa: 'fdt' },
  { quarter: 'II-22', value: 101.2, etapa: 'fdt' },
  { quarter: 'III-22',value: 101.8, etapa: 'fdt' },
  { quarter: 'IV-22', value: 101.5, etapa: 'fdt' },
  { quarter: 'I-23',  value: 101.9, etapa: 'fdt' },
  { quarter: 'II-23', value: 102.6, etapa: 'fdt' },   // Pico kirchnerismo
  { quarter: 'III-23',value: 100.2, etapa: 'fdt' },
  { quarter: 'IV-23', value:  95.8, etapa: 'lla' },
  { quarter: 'I-24',  value:  91.4, etapa: 'lla' },
  { quarter: 'II-24', value:  90.0, etapa: 'lla' },   // Mínimo Milei
  { quarter: 'III-24',value:  92.5, etapa: 'lla' },
  { quarter: 'IV-24', value:  95.6, etapa: 'lla' },
  { quarter: 'I-25',  value:  98.4, etapa: 'lla' },
  { quarter: 'II-25', value: 100.8, etapa: 'lla' },
  { quarter: 'III-25',value: 102.5, etapa: 'lla' },
  { quarter: 'IV-25', value: 102.6, etapa: 'lla' },   // Nuevo máximo (+14% vs II-24)
];

// ============================================================
// PBI — Serie desestacionalizada (Base I-17 = 100)
// Fuente: Econométrica en base a INDEC
// Hitos: IV-17 ~104 · IV-19 ~98 · COVID II-20 mín · II-22 ~104 (pico azul) ·
//        IV-23 · II-24 ~95 (mín Milei) · IV-25 nuevo máximo (+7,8% desde II-24)
// ============================================================
export const pbiDesestacionalizadoData: Array<{
  quarter: string;
  value: number;
  etapa: EtapaPolitica;
}> = [
  { quarter: 'I-17',  value: 100.0, etapa: 'jxc' },
  { quarter: 'II-17', value: 101.2, etapa: 'jxc' },
  { quarter: 'III-17',value: 102.5, etapa: 'jxc' },
  { quarter: 'IV-17', value: 103.8, etapa: 'jxc' },
  { quarter: 'I-18',  value: 104.1, etapa: 'jxc' },
  { quarter: 'II-18', value: 102.0, etapa: 'jxc' },
  { quarter: 'III-18',value: 100.4, etapa: 'jxc' },
  { quarter: 'IV-18', value:  99.0, etapa: 'jxc' },
  { quarter: 'I-19',  value:  99.4, etapa: 'jxc' },
  { quarter: 'II-19', value:  99.0, etapa: 'jxc' },
  { quarter: 'III-19',value:  98.5, etapa: 'jxc' },
  { quarter: 'IV-19', value:  98.0, etapa: 'fdt' },
  { quarter: 'I-20',  value:  93.5, etapa: 'fdt' },
  { quarter: 'II-20', value:  79.8, etapa: 'fdt' },
  { quarter: 'III-20',value:  88.6, etapa: 'fdt' },
  { quarter: 'IV-20', value:  93.2, etapa: 'fdt' },
  { quarter: 'I-21',  value:  95.8, etapa: 'fdt' },
  { quarter: 'II-21', value:  98.5, etapa: 'fdt' },
  { quarter: 'III-21',value: 100.4, etapa: 'fdt' },
  { quarter: 'IV-21', value: 102.1, etapa: 'fdt' },
  { quarter: 'I-22',  value: 103.0, etapa: 'fdt' },
  { quarter: 'II-22', value: 104.0, etapa: 'fdt' },   // Pico azul
  { quarter: 'III-22',value: 103.7, etapa: 'fdt' },
  { quarter: 'IV-22', value: 102.8, etapa: 'fdt' },
  { quarter: 'I-23',  value: 100.2, etapa: 'fdt' },
  { quarter: 'II-23', value: 100.8, etapa: 'fdt' },
  { quarter: 'III-23',value:  99.6, etapa: 'fdt' },
  { quarter: 'IV-23', value:  98.0, etapa: 'lla' },
  { quarter: 'I-24',  value:  96.0, etapa: 'lla' },
  { quarter: 'II-24', value:  95.0, etapa: 'lla' },   // Mínimo Milei
  { quarter: 'III-24',value:  96.4, etapa: 'lla' },
  { quarter: 'IV-24', value:  98.1, etapa: 'lla' },
  { quarter: 'I-25',  value:  99.5, etapa: 'lla' },
  { quarter: 'II-25', value: 100.6, etapa: 'lla' },
  { quarter: 'III-25',value: 101.5, etapa: 'lla' },
  { quarter: 'IV-25', value: 102.4, etapa: 'lla' },   // Nuevo máximo (+7,8% vs II-24)
];

// ============================================================
// Pobreza en Argentina — % de la población (semestral)
// Fuente: Econométrica en base a INDEC (EPH)
// Hitos: 32,2% (II-16) · 25,7% (I-17, mín J×C) · 35,5% (II-19) ·
//        ~41,7% (2021-2023) · 52,9% (II-24, pico) · 28,2% (II-25, mín 7 años)
// ============================================================
export const pobrezaData: Array<{
  period: string;
  value: number;
  etapa: EtapaPolitica;
}> = [
  { period: 'I-16',  value: 30.3, etapa: 'jxc' },
  { period: 'II-16', value: 32.2, etapa: 'jxc' },
  { period: 'I-17',  value: 25.7, etapa: 'jxc' },   // Mínimo J×C
  { period: 'II-17', value: 25.7, etapa: 'jxc' },
  { period: 'I-18',  value: 27.3, etapa: 'jxc' },
  { period: 'II-18', value: 32.0, etapa: 'jxc' },
  { period: 'I-19',  value: 35.4, etapa: 'jxc' },
  { period: 'II-19', value: 35.5, etapa: 'jxc' },
  { period: 'I-20',  value: 40.9, etapa: 'fdt' },
  { period: 'II-20', value: 42.0, etapa: 'fdt' },
  { period: 'I-21',  value: 40.6, etapa: 'fdt' },
  { period: 'II-21', value: 37.3, etapa: 'fdt' },
  { period: 'I-22',  value: 36.5, etapa: 'fdt' },
  { period: 'II-22', value: 39.2, etapa: 'fdt' },
  { period: 'I-23',  value: 40.1, etapa: 'fdt' },
  { period: 'II-23', value: 41.7, etapa: 'fdt' },
  { period: 'I-24',  value: 52.9, etapa: 'lla' },   // Pico
  { period: 'II-24', value: 38.1, etapa: 'lla' },
  { period: 'I-25',  value: 31.6, etapa: 'lla' },
  { period: 'II-25', value: 28.2, etapa: 'lla' },   // Menor registro en 7 años
];

// ============================================================
// Exportaciones de Argentina — USD miles de millones (anual)
// Fuente: Econométrica en base a INDEC
// Hitos: 2019: 65 · 2022: 88 · 2024: 67 · 2025: 87 · 2026e: 100 (+15%)
// 2026: récord histórico, primera vez por encima de USD 100 MM
// ============================================================
export const exportacionesData: Array<{
  year: number;
  value: number;
  isEstimate?: boolean;
}> = [
  { year: 2016, value: 57.7 },
  { year: 2017, value: 58.4 },
  { year: 2018, value: 61.6 },
  { year: 2019, value: 65.1 },
  { year: 2020, value: 54.9 },
  { year: 2021, value: 77.9 },
  { year: 2022, value: 88.4 },
  { year: 2023, value: 66.8 },
  { year: 2024, value: 67.0 },
  { year: 2025, value: 87.0 },
  { year: 2026, value: 100.0, isEstimate: true },   // Proyección Abeceb/INDEC: primer año > USD 100 MM
];

// ============================================================
// Salario Real — Base Nov-23 = 100
// Fuente: INDEC SIPA + EIL · 4 series desde Nov-23 a Feb-26
// ============================================================
export const salarioRealData: Array<{
  date: string;
  privadoNoReg: number;       // Privado no Registrado (EIL)
  privadoRegSipa: number;     // Privado Registrado (SIPA)
  privadoRegEil: number;      // Privado Registrado (EIL)
  publico: number;            // Sector Público (EIL)
}> = [
  { date: 'Nov 23', privadoNoReg: 100.0, privadoRegSipa: 100.0, privadoRegEil: 100.0, publico: 100.0 },
  { date: 'Dic 23', privadoNoReg:  92.5, privadoRegSipa:  93.2, privadoRegEil:  93.5, publico:  91.8 },
  { date: 'Ene 24', privadoNoReg:  88.7, privadoRegSipa:  90.1, privadoRegEil:  90.4, publico:  86.9 },
  { date: 'Feb 24', privadoNoReg:  90.4, privadoRegSipa:  91.6, privadoRegEil:  91.5, publico:  85.4 },
  { date: 'Mar 24', privadoNoReg:  93.1, privadoRegSipa:  93.8, privadoRegEil:  93.4, publico:  84.8 },
  { date: 'Abr 24', privadoNoReg:  96.2, privadoRegSipa:  95.5, privadoRegEil:  95.1, publico:  83.9 },
  { date: 'May 24', privadoNoReg:  98.7, privadoRegSipa:  96.9, privadoRegEil:  96.2, publico:  83.4 },
  { date: 'Jun 24', privadoNoReg: 101.5, privadoRegSipa:  98.0, privadoRegEil:  97.0, publico:  83.1 },
  { date: 'Jul 24', privadoNoReg: 103.8, privadoRegSipa:  98.8, privadoRegEil:  97.6, publico:  82.5 },
  { date: 'Ago 24', privadoNoReg: 106.4, privadoRegSipa:  99.7, privadoRegEil:  98.3, publico:  82.2 },
  { date: 'Sep 24', privadoNoReg: 108.9, privadoRegSipa: 100.5, privadoRegEil:  99.0, publico:  82.0 },
  { date: 'Oct 24', privadoNoReg: 111.2, privadoRegSipa: 101.4, privadoRegEil:  99.8, publico:  81.7 },
  { date: 'Nov 24', privadoNoReg: 113.5, privadoRegSipa: 102.5, privadoRegEil: 100.6, publico:  81.4 },
  { date: 'Dic 24', privadoNoReg: 115.7, privadoRegSipa: 103.6, privadoRegEil: 101.5, publico:  81.0 },
  { date: 'Ene 25', privadoNoReg: 117.3, privadoRegSipa: 104.5, privadoRegEil: 102.4, publico:  80.8 },
  { date: 'Feb 25', privadoNoReg: 118.9, privadoRegSipa: 105.4, privadoRegEil: 103.2, publico:  80.7 },
  { date: 'Mar 25', privadoNoReg: 120.2, privadoRegSipa: 106.2, privadoRegEil: 104.0, publico:  80.6 },
  { date: 'Abr 25', privadoNoReg: 121.4, privadoRegSipa: 106.9, privadoRegEil: 104.7, publico:  80.5 },
  { date: 'May 25', privadoNoReg: 122.3, privadoRegSipa: 107.5, privadoRegEil: 105.3, publico:  80.4 },
  { date: 'Jun 25', privadoNoReg: 123.0, privadoRegSipa: 108.0, privadoRegEil: 105.8, publico:  80.5 },
  { date: 'Jul 25', privadoNoReg: 123.6, privadoRegSipa: 108.4, privadoRegEil: 106.3, publico:  80.6 },
  { date: 'Ago 25', privadoNoReg: 124.0, privadoRegSipa: 108.8, privadoRegEil: 106.7, publico:  80.7 },
  { date: 'Sep 25', privadoNoReg: 124.3, privadoRegSipa: 109.1, privadoRegEil: 107.1, publico:  81.0 },
  { date: 'Oct 25', privadoNoReg: 124.6, privadoRegSipa: 109.4, privadoRegEil: 107.4, publico:  81.4 },
  { date: 'Nov 25', privadoNoReg: 124.8, privadoRegSipa: 109.7, privadoRegEil: 107.7, publico:  82.0 },
  { date: 'Dic 25', privadoNoReg: 124.9, privadoRegSipa: 109.9, privadoRegEil: 107.9, publico:  82.6 },
  { date: 'Ene 26', privadoNoReg: 125.0, privadoRegSipa: 110.0, privadoRegEil: 108.0, publico:  83.4 },
  { date: 'Feb 26', privadoNoReg: 125.0, privadoRegSipa: 110.0, privadoRegEil: 108.0, publico:  84.5 },
];

// ============================================================
// Deuda Pública Total — % del PIB (mensual)
// Notas: media móvil 12m · estimación PIB Sec. Pol. Económica · TC fin de mes
// Fuente: Min. Economía / Sec. de Finanzas
// ============================================================
export const deudaPibData: Array<{
  date: string;
  value: number;
}> = [
  { date: 'Nov 23', value:  88.4 },
  { date: 'Dic 23', value: 156.6 },   // Pico transición / ajuste TC
  { date: 'Ene 24', value: 152.1 },
  { date: 'Feb 24', value: 145.8 },
  { date: 'Mar 24', value: 138.4 },
  { date: 'Abr 24', value: 132.0 },
  { date: 'May 24', value: 126.9 },
  { date: 'Jun 24', value: 122.3 },
  { date: 'Jul 24', value: 117.5 },
  { date: 'Ago 24', value: 113.0 },
  { date: 'Sep 24', value: 108.6 },
  { date: 'Oct 24', value: 104.5 },
  { date: 'Nov 24', value: 100.7 },
  { date: 'Dic 24', value:  97.2 },
  { date: 'Ene 25', value:  94.0 },
  { date: 'Feb 25', value:  91.0 },
  { date: 'Mar 25', value:  88.4 },
  { date: 'Abr 25', value:  86.0 },
  { date: 'May 25', value:  83.8 },
  { date: 'Jun 25', value:  81.9 },
  { date: 'Jul 25', value:  80.2 },
  { date: 'Ago 25', value:  78.7 },
  { date: 'Sep 25', value:  77.4 },
  { date: 'Oct 25', value:  76.3 },
  { date: 'Nov 25', value:  75.4 },
  { date: 'Dic 25', value:  74.6 },
  { date: 'Ene 26', value:  74.0 },
  { date: 'Feb 26', value:  73.5 },
  { date: 'Mar 26', value:  73.1 },
  { date: 'Abr 26', value:  73.8 },   // Sube levemente por TC y emisión LECAP
];

// ============================================================
// Deuda Pública Consolidada — Tesoro + BCRA (USD MM, fin de período)
// Fuente: Min. Economía + BCRA · *incluye deuda no contabilizada
// luego cancelada por Bopreal (15)
// ============================================================
export const deudaConsolidadaData: Array<{
  period: string;
  tesoro: number;
  bcra: number;
  total: number;
  highlight?: 'fdt-end' | 'lla-end';
  note?: string;
}> = [
  { period: 'Nov 19', tesoro: 313, bcra:  35, total: 349 },                          // Inicio Fernández
  { period: 'Dic 20', tesoro: 339, bcra:  47, total: 386 },
  { period: 'Dic 21', tesoro: 367, bcra:  62, total: 429 },
  { period: 'Dic 22', tesoro: 397, bcra:  82, total: 479 },
  { period: 'Nov 23', tesoro: 426, bcra: 100, total: 525, highlight: 'fdt-end',
    note: 'Fin Alberto Fernández · +177 vs Nov-19 (+44/año)' },
  { period: 'Dic 23', tesoro: 460, bcra:  92, total: 552 },
  { period: 'Jun 24', tesoro: 478, bcra:  60, total: 538 },
  { period: 'Dic 24', tesoro: 489, bcra:  41, total: 530 },
  { period: 'Jun 25', tesoro: 488, bcra:  35, total: 523 },
  { period: 'Mar 26', tesoro: 484, bcra:  31, total: 515, highlight: 'lla-end',
    note: 'Milei · -10 vs Nov-23 (Tesoro absorbe Leliqs · apreciación peso)' },
];

// Hito histórico para el cuadro auxiliar del gráfico de deuda consolidada
export const deudaConsolidadaHistoricos = {
  dic2001: 144,    // Default 2001
  nov2023: 525,    // Fin Fernández
  varTotal: 381,   // 525 - 144
};

// ============================================================
// Inflación Argentina 1990-2026 — Var. % interanual (anual)
// Fuente: Econométrica en base a INDEC (salvo 2007-2015 Bevaqua/CABA)
// Hitos: Mar-91 287,3% (hiperinflación menemista) · 33 años después
//        Abr-24 289,4% (pico reciente) · Mar-26 33,1% (descenso)
// ============================================================
export const inflacionLargoPlazoData: Array<{
  year: string;
  value: number;
  highlight?: 'pico-1991' | 'pico-2024' | 'actual';
}> = [
  { year: '1990', value: 1343.9 },
  { year: 'Mar-91', value: 287.3, highlight: 'pico-1991' },
  { year: '1991', value:  84.0 },
  { year: '1992', value:  17.5 },
  { year: '1993', value:  10.6 },
  { year: '1994', value:   4.2 },
  { year: '1995', value:   3.4 },
  { year: '1996', value:   0.2 },
  { year: '1997', value:   0.5 },
  { year: '1998', value:   0.9 },
  { year: '1999', value:  -1.2 },
  { year: '2000', value:  -0.9 },
  { year: '2001', value:  -1.1 },
  { year: '2002', value:  25.9 },
  { year: '2003', value:  13.4 },
  { year: '2004', value:   4.4 },
  { year: '2005', value:   9.6 },
  { year: '2006', value:  10.9 },
  { year: '2007', value:  25.7 },
  { year: '2008', value:  23.0 },
  { year: '2009', value:  14.8 },
  { year: '2010', value:  26.4 },
  { year: '2011', value:  22.8 },
  { year: '2012', value:  25.6 },
  { year: '2013', value:  28.4 },
  { year: '2014', value:  38.5 },
  { year: '2015', value:  26.9 },
  { year: '2016', value:  41.0 },
  { year: '2017', value:  24.8 },
  { year: '2018', value:  47.6 },
  { year: '2019', value:  53.8 },
  { year: '2020', value:  36.1 },
  { year: '2021', value:  50.9 },
  { year: '2022', value:  94.8 },
  { year: '2023', value: 211.4 },
  { year: 'Abr-24', value: 289.4, highlight: 'pico-2024' },
  { year: '2024', value: 117.8 },
  { year: '2025', value:  31.5 },
  { year: 'Abril-26', value:  32.4, highlight: 'actual' },

];

// ============================================================
// EMAE largo plazo — Serie desestacionalizada (puntos clave 2017-2026)
// Fuente: Econométrica en base a INDEC
// Hitos: nov-17 J×C ~152 · COVID 2020 ~137 · jun-22 pico azul ~152 ·
//        dic-23 punto partida Milei · Mar-26* ~158 (nuevo máximo)
// ============================================================
export const emaeLargoPlazoData: Array<{
  date: string;
  value: number;
  etapa: EtapaPolitica;
  isEstimate?: boolean;
}> = [
  { date: 'Ene 17',  value: 145.0, etapa: 'jxc' },
  { date: 'Jul 17',  value: 148.5, etapa: 'jxc' },
  { date: 'Nov 17',  value: 152.0, etapa: 'jxc' },   // Pico J×C
  { date: 'May 18',  value: 150.0, etapa: 'jxc' },
  { date: 'Nov 18',  value: 145.5, etapa: 'jxc' },
  { date: 'May 19',  value: 144.0, etapa: 'jxc' },
  { date: 'Nov 19',  value: 142.6, etapa: 'jxc' },
  { date: 'Mar 20',  value: 138.0, etapa: 'fdt' },
  { date: 'Jun 20',  value: 119.5, etapa: 'fdt' },   // Mínimo COVID
  { date: 'Sep 20',  value: 130.0, etapa: 'fdt' },
  { date: 'Dic 20',  value: 137.0, etapa: 'fdt' },   // Recuperación post-covid
  { date: 'Jun 21',  value: 142.0, etapa: 'fdt' },
  { date: 'Dic 21',  value: 147.5, etapa: 'fdt' },
  { date: 'Jun 22',  value: 152.0, etapa: 'fdt' },   // Pico azul
  { date: 'Dic 22',  value: 151.0, etapa: 'fdt' },
  { date: 'Jun 23',  value: 149.0, etapa: 'fdt' },
  { date: 'Dic 23',  value: 143.6, etapa: 'lla' },   // Punto partida Milei
  { date: 'Jun 24',  value: 138.8, etapa: 'lla' },
  { date: 'Dic 24',  value: 148.0, etapa: 'lla' },
  { date: 'Jun 25',  value: 152.0, etapa: 'lla' },
  { date: 'Dic 25',  value: 155.5, etapa: 'lla' },
  { date: 'Mar 26',  value: 158.6, etapa: 'lla', isEstimate: true },   // Nuevo máximo 
];

// ============================================================
// Riesgo País — EMBI+ Argentina (puntos básicos, mensual)
// Fuente: JP Morgan / Ámbito / Rava
// Hito: en feb-26 JP Morgan retiró a Argentina del EMBI+ (criterios estrictos)
// y la reclasificó en el EMBIGD (Global Diversified, criterios más laxos).
// La serie hasta ene-26 corresponde a EMBI+, y desde feb-26 al EMBIGD.
// ============================================================
export const riesgoPaisData: Array<{
  date: string;
  value: number;
  highlight?: 'pico' | 'minimo' | 'actual';
  note?: string;
}> = [
  { date: 'Dic 23', value: 1907, highlight: 'pico', note: 'Asunción Milei' },
  { date: 'Mar 24', value: 1620 },
  { date: 'Jun 24', value: 1450 },
  { date: 'Sep 24', value: 1240 },
  { date: 'Dic 24', value: 635 },
  { date: 'Mar 25', value: 745 },
  { date: 'Jun 25', value: 690 },
  { date: 'Sep 25', value: 580 },
  { date: 'Dic 25', value: 540, highlight: 'minimo', note: 'Mínimo del ciclo' },
  { date: 'Ene 26', value: 565 },
  { date: 'Feb 26', value: 590, note: 'JP Morgan: EMBI+ → EMBIGD' },
  { date: 'Mar 26', value: 550 },
  { date: 'Abr 26', value: 557 },
  { date: 'May 26', value: 490 },
  { date: 'Jun - Estimado 26', value: 470, highlight: 'actual', note: 'Mínimo histórico en EMBIGD' },
];

// Última actualización
export const lastUpdate = new Date().toLocaleDateString('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
