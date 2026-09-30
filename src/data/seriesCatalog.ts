export type TerminalTab = 'TODOS' | 'ACTIVIDAD' | 'PRECIOS' | 'EXTERNO' | 'FISCAL' | 'ENERGIA' | 'COMMODITIES' | 'CREDITO';

export interface SeriesCatalogEntry {
  id: string;
  label: string;
  aliases: string[];
  href: string;
  tabs: TerminalTab[];
  hasCsv: boolean;
  sourceHint: string;
  icon: string;
}

export const SERIES_CATALOG: SeriesCatalogEntry[] = [
  { id: 'inflacion', label: 'Inflación IPC', aliases: ['ipc', 'inflacion', 'cpi', 'precios'], href: '/precios#ipc', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '🔥' },
  { id: 'ipc-interanual', label: 'IPC Interanual', aliases: ['ipc ia', 'interanual'], href: '/precios#ipc', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '🔥' },
  { id: 'ipc-nucleo', label: 'IPC Núcleo', aliases: ['nucleo', 'core'], href: '/precios#ipc', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '🔥' },
  { id: 'ipim', label: 'IPIM Mayorista', aliases: ['ipim', 'mayorista'], href: '/precios#ipim', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '📦' },
  { id: 'tamar', label: 'TAMAR', aliases: ['tamar', 'tasa activa'], href: '/precios#tamar', tabs: ['PRECIOS'], hasCsv: false, sourceHint: 'BCRA KPI (sin serie hist. aún)', icon: '💹' },
  { id: 'rem-prox', label: 'REM próximo mes', aliases: ['rem', 'expectativas'], href: '/precios#rem', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'BCRA REM', icon: '🔮' },
  { id: 'emae', label: 'EMAE', aliases: ['emae', 'actividad'], href: '/actividad#emae', tabs: ['ACTIVIDAD'], hasCsv: true, sourceHint: 'INDEC', icon: '📈' },
  { id: 'pbi', label: 'PBI Real', aliases: ['pbi', 'gdp', 'pib'], href: '/actividad#pbi', tabs: ['ACTIVIDAD'], hasCsv: true, sourceHint: 'INDEC', icon: '📈' },
  { id: 'superavit', label: 'Superávit primario', aliases: ['fiscal', 'superavit', 'mecon'], href: '/fiscal#primario', tabs: ['FISCAL'], hasCsv: true, sourceHint: 'MECON', icon: '⚖️' },
  { id: 'reservas', label: 'Reservas BCRA', aliases: ['reservas', 'bcra'], href: '/externo#reservas', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'BCRA', icon: '🏦' },
  { id: 'dolar-blue', label: 'Dólar Blue', aliases: ['blue', 'dolar', 'dólar'], href: '/externo#fx', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'hist.', icon: '💵' },
  { id: 'dolar-oficial', label: 'Dólar Oficial', aliases: ['oficial', 'a3500'], href: '/externo#fx', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'hist.', icon: '💵' },
  { id: 'brecha', label: 'Brecha cambiaria', aliases: ['brecha', 'gap'], href: '/externo#fx', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'derivada', icon: '📊' },
  { id: 'riesgo', label: 'Riesgo País', aliases: ['riesgo', 'embi', 'embigd'], href: '/externo#riesgo', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'JP Morgan', icon: '📉' },
  { id: 'fob-soja', label: 'Soja FOB', aliases: ['soja', 'granos', 'fob', 'commodities'], href: '/commodities#fob-soja', tabs: ['COMMODITIES'], hasCsv: true, sourceHint: 'FOB', icon: '🌾' },
  { id: 'fob-maiz', label: 'Maíz FOB', aliases: ['maiz', 'maíz'], href: '/commodities#fob-maiz', tabs: ['COMMODITIES'], hasCsv: true, sourceHint: 'FOB', icon: '🌽' },
  { id: 'fob-trigo', label: 'Trigo FOB', aliases: ['trigo'], href: '/commodities#fob-trigo', tabs: ['COMMODITIES'], hasCsv: true, sourceHint: 'FOB', icon: '🌾' },
  { id: 'cye-12m', label: 'Saldo CyE 12m', aliases: ['energia', 'cye', 'vaca muerta', 'balanza energetica'], href: '/energia', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'INDEC ICA', icon: '⚡' },
  { id: 'ypf-super', label: 'Nafta Super', aliases: ['nafta', 'surtidor', 'ypf', 'super', 'combustible'], href: '/commodities#ypf', tabs: ['COMMODITIES'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'ypf-premium', label: 'Nafta Premium', aliases: ['infinia', 'premium'], href: '/commodities#ypf', tabs: ['COMMODITIES'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'ypf-gasoil', label: 'Gasoil', aliases: ['gasoil', 'diesel'], href: '/commodities#ypf', tabs: ['COMMODITIES'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'ypf-euro', label: 'Diesel Euro', aliases: ['euro', 'diesel premium'], href: '/commodities#ypf', tabs: ['COMMODITIES'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'crudo-fob', label: 'Crudo exportado', aliases: ['crudo', 'petroleo'], href: '/energia', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'INDEC ICA', icon: '🛢️' },
  { id: 'ica-saldo', label: 'Saldo comercial', aliases: ['ica', 'balanza comercial'], href: '/externo#ica', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'INDEC ICA', icon: '🌍' },
  { id: 'credito-real', label: 'Crédito real', aliases: ['credito', 'prestamos'], href: '/credito', tabs: ['CREDITO'], hasCsv: true, sourceHint: 'BCRA', icon: '💳' },
  { id: 'mora', label: 'Mora sistema', aliases: ['mora', 'irregularidad'], href: '/credito', tabs: ['CREDITO'], hasCsv: true, sourceHint: 'BCRA Bancos', icon: '📉' },
];

export const SERIES_CONTEXT_LINKS = [
  { group: 'Contexto' as const, label: 'Mundo / LatAm', aliases: ['mundo', 'latam', 'peers'], href: '/mundo', icon: '🌎' },
  { group: 'Herramientas' as const, label: 'Break-Even Inflacionario', aliases: ['bei', 'be i', 'breakeven', 'break-even', 'lecap'], href: '/break-even', icon: '🎯' },
  { group: 'Contexto' as const, label: 'Energía / Vaca Muerta', aliases: ['energia', 'vaca muerta', 'crudo', 'cye', 'petroleo'], href: '/energia', icon: '⚡' },
];
