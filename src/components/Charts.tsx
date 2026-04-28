/**
 * Barrel de re-exportación — mantiene compatibilidad con imports existentes.
 * Los gráficos viven en src/components/charts/ (un archivo por componente).
 */
export {
  EmaeChart,
  PBIBarChart,
  SectorChart,
  FiscalChart,
  TaxTable,
  TradeChart,
  ReservasChart,
  TCRChart,
  RiesgoPaisChart,
  InflacionMensualChart,
  InflacionInteranualChart,
  REMChart,
  // Bloque Econométrica — Consumo, Pobreza, Comercio Exterior
  ConsumoPrivadoChart,
  PBIDesestacionalizadoChart,
  PobrezaChart,
  ExportacionesChart,
  // Salarios y Deuda
  SalarioRealChart,
  DeudaPibChart,
  DeudaConsolidadaChart,
  // Histórico largo plazo
  InflacionLargoPlazoChart,
  EmaeLargoPlazoChart,
} from './charts/index';
