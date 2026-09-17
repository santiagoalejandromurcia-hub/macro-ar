/** Dólares: stock (reservas) y flujo (MULC). ITCRM BCRA. CC INDEC. */

export const ACTUALIZADO_AL = '2026-09-17';

export const RESERVAS_NETAS_METODO = {
  titulo: 'Reservas netas — proxy, no serie oficial diaria',
  texto:
    'El BCRA publica reservas brutas diarias (API var 1). No publica en la API la resta FMI (swaps, DEG, encajes en ME, oro a valor de programa, depósitos de entidades). MacroLibre no inventa esa resta día a día. Última referencia de mercado sobre datos BCRA: reservas netas ~USD 420 M a fin de agosto 2026 (Criteria, gráfico 15 del IMM ago-26). Swap China ~USD 19.000 M renovado en agosto; no se resta acá porque ya está fuera de esa definición neta.',
  snapshotUsdM: 420,
  snapshotAsOf: '2026-08-31',
  snapshotSource: 'Criteria en base a Informe Monetario BCRA ago-26',
};

export const CUENTA_CORRIENTE = {
  period: 'Q1 26',
  released: '2026-06-24',
  usdM: -1651,
  bienes: 6339,
  servicios: -4028,
  ingresoPrimario: -4676,
  ingresoSecundario: 714,
  source: 'INDEC Balanza de pagos Q1 2026',
  note: 'El superávit de bienes no implica superávit de cuenta corriente. El agujero está en servicios (turismo) e ingreso primario (renta).',
};

/** ICA mensual — mismo corte que tradeData. */
export const COMERCIAL_VS_CC = [
  { period: 'Q1 25', comercial: 1060, cc: null as number | null, label: 'Q1 25' },
  { period: 'Q1 26', comercial: 5298, cc: -1651, label: 'Q1 26' },
];

export const SERVICIOS_Q1 = [
  { rubro: 'Bienes (FOB)', usdM: 6339, note: 'X 21.916 − M 15.577' },
  { rubro: 'Servicios', usdM: -4028, note: 'turismo + fletes; el agujero' },
  { rubro: 'Ingreso primario', usdM: -4676, note: 'intereses, utilidades' },
  { rubro: 'Ingreso secundario', usdM: 714, note: 'remesas netas' },
  { rubro: 'Cuenta corriente', usdM: -1651, note: 'suma' },
];

/** ITCRM mes (último obs del mes). Base 17/12/2015=100. BCRA itcrm.txt */
export const ITCRM_MES: { mes: string; valor: number }[] = [
  { mes: 'Dic 24', valor: 79.15 },
  { mes: 'Feb 25', valor: 80.39 },
  { mes: 'Mar 25', valor: 79.63 },
  { mes: 'Abr 25', valor: 85.84 },
  { mes: 'May 25', valor: 86.08 },
  { mes: 'Jun 25', valor: 88.49 },
  { mes: 'Jul 25', valor: 97.74 },
  { mes: 'Ago 25', valor: 95.62 },
  { mes: 'Sep 25', valor: 96.72 },
  { mes: 'Oct 25', valor: 97.99 },
  { mes: 'Nov 25', valor: 96.49 },
  { mes: 'Dic 25', valor: 94.3 },
  { mes: 'Ene 26', valor: 92.99 },
  { mes: 'Feb 26', valor: 89.12 },
  { mes: 'Mar 26', valor: 84.17 },
  { mes: 'Abr 26', valor: 84.74 },
  { mes: 'May 26', valor: 83.98 },
  { mes: 'Jun 26', valor: 85.69 },
  { mes: 'Jul 26', valor: 85.31 },
  { mes: 'Ago 26', valor: 85.87 },
  { mes: 'Sep 26', valor: 85.82 },
];

export const ITCRM_REFS = {
  avg2017: 88.05,
  avg2019: 121.22,
  last: 85.82,
  lastAsOf: '2026-09-16',
  source: 'BCRA ITCRM (base 17/12/2015=100)',
};

export const MULC_MENSUAL_2026: { mes: string; usdM: number; note?: string }[] = [
  { mes: 'Jun 26', usdM: 1418, note: 'Informe Monetario BCRA' },
  { mes: 'Jul 26', usdM: 2162, note: 'prensa en base a MULC' },
  { mes: 'Ago 26', usdM: 768, note: 'BCRA / IMM ~USD 770 M' },
  { mes: 'Sep 26', usdM: 204, note: 'acum. al 16/09 (Ámbito); mes incompleto' },
];
