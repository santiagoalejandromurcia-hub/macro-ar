/** Capa B/C del pulso: stamps oficiales + lectura. No mezclar con LIVE. */

export const DISCLAIMER_PULSO =
  'MacroLibre no es asesoramiento financiero ni recomendación de compra/venta. Datos de mercado con rezago de fuente; oficiales con fecha de publicación.';

export const LECTURA_DEL_DIA = {
  asOf: '2026-09-17',
  hora: '21:00 ART',
  driver: 'FX / global' as const,
  semaforo: 'frente' as const, // DXY ponderado + WTI altos, 10Y en 5%
  lineas: [
    'Ciclo: EMAE tendencia-ciclo en mayo (dato atrasado). No hay pulso de actividad de esta semana.',
    'Precios: IPC ago 1,7% m/m · 33,5% i.a. (pub. 10/09). REM próx. mes 1,9%. Interanual alta.',
    'Real pesos: TAMAR 23,63% n.a. vs REM 12m snapshot 23% → real chata / leve +.',
    'Dólares: superávit de bienes jul +USD 2.115 M; cuenta corriente Q1 −USD 1.651 M (no son lo mismo).',
    'Global: mirar US10Y (5,01 cierre 16/09) y WTI antes que el blue.',
  ],
};

export const REGIMEN_STAMPS = {
  ipc: {
    period: 'Ago 26',
    released: '2026-09-10',
    mensual: 1.7,
    interanual: 33.5,
    nucleo: 1.8,
    acum: 21.3,
    source: 'INDEC IPC',
  },
  remProx: {
    period: 'Sep 26',
    mediana: 1.9,
    source: 'BCRA REM',
    asOf: '2026-08',
    note: 'Mediana del próximo mes en el último REM cargado',
  },
  rem12m: {
    teaPct: 23.0,
    asOf: '2026-05-17',
    source: 'BCRA REM (snapshot BEI)',
    note: 'Acumulado 12m del snapshot; no es un feed diario',
  },
  emae: {
    period: 'May 26',
    released: '2026-07-22',
    yoy: 0.2,
    trend: 156.0,
    source: 'INDEC EMAE',
  },
  fiscal: {
    period: 'Jul 26',
    released: '2026-08-18',
    primario12m: 1.2,
    financiero12m: -0.1,
    primarioAcum: 0.9,
    financieroAcum: 0.1,
    source: 'MECON / UBA IIEP',
  },
  comercial: {
    period: 'Jul 26',
    released: '2026-08-20',
    exports: 8854,
    imports: 6739,
    balance: 2115,
    acum: 16080,
    source: 'INDEC ICA',
  },
  cuentaCorriente: {
    period: 'Q1 26',
    released: '2026-06-24',
    usdM: -1651,
    bienes: 6339,
    servicios: -4028,
    ingresoPrimario: -4676,
    source: 'INDEC Balanza de pagos',
    note: 'El superávit comercial de bienes no implica superávit de cuenta corriente.',
  },
  pbi: {
    period: 'Q1 26',
    released: '2026-06-23',
    yoy: 2.3,
    source: 'INDEC',
  },
};

export const CALENDARIO_7D: { date: string; label: string; kind: 'indec' | 'bcra' | 'mecon' | 'fed' }[] = [
  { date: '2026-09-20', label: 'Ventana EMAE (INDEC, ~20-26)', kind: 'indec' },
  { date: '2026-09-20', label: 'Ventana ICA comercial (INDEC, ~20-26)', kind: 'indec' },
  { date: '2026-09-29', label: 'Cuenta corriente Q2 26 (INDEC, calendario)', kind: 'indec' },
];

export const RESERVAS_NETAS_NOTE =
  'Reservas netas: no hay número en el home hasta publicar la metodología (pasivos BCRA, DEG, encajes, oro). Hoy solo reservas brutas BCRA, con asOf de cierre.';
