export type TerminalTab = 'TODOS' | 'ACTIVIDAD' | 'PRECIOS' | 'EXTERNO' | 'FISCAL' | 'ENERGIA' | 'AGRO' | 'CREDITO';

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
  { id: 'inflacion', label: 'Inflación IPC', aliases: ['ipc', 'inflacion', 'cpi', 'precios'], href: '/?kpi=inflacion#dashboard', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '🔥' },
  { id: 'ipc-interanual', label: 'IPC Interanual', aliases: ['ipc ia', 'interanual'], href: '/?kpi=ipc-interanual#dashboard', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '🔥' },
  { id: 'ipc-nucleo', label: 'IPC Núcleo', aliases: ['nucleo', 'core'], href: '/?kpi=ipc-nucleo#dashboard', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '🔥' },
  { id: 'ipim', label: 'IPIM Mayorista', aliases: ['ipim', 'mayorista'], href: '/?kpi=ipim#dashboard', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'INDEC', icon: '📦' },
  { id: 'tamar', label: 'TAMAR', aliases: ['tamar', 'tasa activa'], href: '/?kpi=tamar#dashboard', tabs: ['PRECIOS'], hasCsv: false, sourceHint: 'BCRA KPI (sin serie hist. aún)', icon: '💹' },
  { id: 'rem-prox', label: 'REM próximo mes', aliases: ['rem', 'expectativas'], href: '/?kpi=rem-prox#dashboard', tabs: ['PRECIOS'], hasCsv: true, sourceHint: 'BCRA REM', icon: '🔮' },
  { id: 'emae', label: 'EMAE', aliases: ['emae', 'actividad'], href: '/?kpi=emae#dashboard', tabs: ['ACTIVIDAD'], hasCsv: true, sourceHint: 'INDEC', icon: '📈' },
  { id: 'pbi', label: 'PBI Real', aliases: ['pbi', 'gdp', 'pib'], href: '/?kpi=pbi#dashboard', tabs: ['ACTIVIDAD'], hasCsv: true, sourceHint: 'INDEC', icon: '📈' },
  { id: 'superavit', label: 'Superávit primario', aliases: ['fiscal', 'superavit', 'mecon'], href: '/?kpi=superavit#dashboard', tabs: ['FISCAL'], hasCsv: true, sourceHint: 'MECON', icon: '⚖️' },
  { id: 'reservas', label: 'Reservas BCRA', aliases: ['reservas', 'bcra'], href: '/?kpi=reservas#dashboard', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'BCRA', icon: '🏦' },
  { id: 'dolar-blue', label: 'Dólar Blue', aliases: ['blue', 'dolar', 'dólar'], href: '/?kpi=dolar-blue#dashboard', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'hist.', icon: '💵' },
  { id: 'dolar-oficial', label: 'Dólar Oficial', aliases: ['oficial', 'a3500'], href: '/?kpi=dolar-oficial#dashboard', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'hist.', icon: '💵' },
  { id: 'brecha', label: 'Brecha cambiaria', aliases: ['brecha', 'gap'], href: '/?kpi=brecha#dashboard', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'derivada', icon: '📊' },
  { id: 'riesgo', label: 'Riesgo País', aliases: ['riesgo', 'embi', 'embigd'], href: '/?kpi=riesgo#dashboard', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'JP Morgan', icon: '📉' },
  { id: 'fob-soja', label: 'Soja FOB', aliases: ['soja', 'granos', 'fob'], href: '/?kpi=fob-soja#dashboard', tabs: ['AGRO'], hasCsv: true, sourceHint: 'FOB', icon: '🌾' },
  { id: 'fob-maiz', label: 'Maíz FOB', aliases: ['maiz', 'maíz'], href: '/?kpi=fob-maiz#dashboard', tabs: ['AGRO'], hasCsv: true, sourceHint: 'FOB', icon: '🌽' },
  { id: 'fob-trigo', label: 'Trigo FOB', aliases: ['trigo'], href: '/?kpi=fob-trigo#dashboard', tabs: ['AGRO'], hasCsv: true, sourceHint: 'FOB', icon: '🌾' },
  { id: 'cye-12m', label: 'Saldo CyE 12m', aliases: ['energia', 'cye', 'vaca muerta', 'balanza energetica'], href: '/?kpi=cye-12m#dashboard', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'INDEC ICA', icon: '⚡' },
  { id: 'ypf-super', label: 'YPF Super CABA', aliases: ['nafta', 'surtidor', 'ypf', 'super', 'combustible'], href: '/?kpi=ypf-super#dashboard', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'ypf-premium', label: 'YPF Premium CABA', aliases: ['infinia', 'premium'], href: '/?kpi=ypf-premium#dashboard', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'ypf-gasoil', label: 'YPF Gasoil CABA', aliases: ['gasoil', 'diesel'], href: '/?kpi=ypf-gasoil#dashboard', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'ypf-euro', label: 'YPF Euro CABA', aliases: ['euro', 'diesel premium'], href: '/?kpi=ypf-euro#dashboard', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'Surtidores YPF CABA', icon: '⛽' },
  { id: 'crudo-fob', label: 'Crudo exportado', aliases: ['crudo', 'petroleo'], href: '/?kpi=crudo-fob#dashboard', tabs: ['ENERGIA'], hasCsv: true, sourceHint: 'INDEC ICA', icon: '🛢️' },
  { id: 'ica-saldo', label: 'Saldo comercial', aliases: ['ica', 'balanza comercial'], href: '/?kpi=ica-saldo#dashboard', tabs: ['EXTERNO'], hasCsv: true, sourceHint: 'INDEC ICA', icon: '🌍' },
  { id: 'credito-real', label: 'Crédito real', aliases: ['credito', 'prestamos'], href: '/?kpi=credito-real#dashboard', tabs: ['CREDITO'], hasCsv: true, sourceHint: 'BCRA', icon: '💳' },
  { id: 'mora', label: 'Mora sistema', aliases: ['mora', 'irregularidad'], href: '/?kpi=mora#dashboard', tabs: ['CREDITO'], hasCsv: true, sourceHint: 'BCRA Bancos', icon: '📉' },
];

export const SERIES_CONTEXT_LINKS = [
  { group: 'Contexto' as const, label: 'Mundo / LatAm', aliases: ['mundo', 'latam', 'peers'], href: '/mundo', icon: '🌎' },
  { group: 'Herramientas' as const, label: 'Break-Even Inflacionario', aliases: ['bei', 'be i', 'breakeven', 'break-even', 'lecap'], href: '/break-even', icon: '🎯' },
  { group: 'Contexto' as const, label: 'Energía / Vaca Muerta', aliases: ['energia', 'vaca muerta', 'crudo', 'cye', 'petroleo'], href: '/energia', icon: '⚡' },
];
