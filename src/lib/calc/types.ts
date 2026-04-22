// ============================================================
// Tipos compartidos de la calculadora
// ============================================================

export type InstrumentId =
  | 'plazoFijo'
  | 'dolarMEP'
  | 'dolarBlue'
  | 'lecap'
  | 'al30'
  | 'gd30';

export interface SeriesPoint {
  /** Fecha ISO YYYY-MM-DD */
  date: string;
  /** Valor numérico (significado depende de la serie) */
  value: number;
}

export interface RawSeries {
  ipcMensual: SeriesPoint[];        // % mensual (ej. 2.9)
  tcBlue:     SeriesPoint[];        // ARS por USD (venta)
  tcMEP:      SeriesPoint[];        // ARS por USD
  tnaPF:      SeriesPoint[];        // TNA plazo fijo BCRA (%)
  updatedAt:  string;
  warnings:   string[];             // errores parciales que no tumbaron la respuesta
}

export interface InstrumentResult {
  id: InstrumentId;
  label: string;
  available: boolean;
  /** Monto final nominal en pesos */
  nominalFinal: number;
  /** Monto final ajustado a pesos de la fecha inicial (poder adquisitivo real) */
  realFinal: number;
  /** Rendimiento total nominal, decimal (0.35 = 35%) */
  roiNominal: number;
  /** Rendimiento total real, decimal */
  roiReal: number;
  /** TIR anualizada real, decimal */
  roiAnualReal: number;
  /** Serie mensual del capital nominal (para graficar) */
  series: SeriesPoint[];
  /** Nota al pie (fuente, supuestos, limitaciones) */
  note: string;
}

export interface CalcInput {
  monto: number;
  /** Fecha ISO de inicio YYYY-MM-DD */
  from: string;
  /** Fecha ISO de fin YYYY-MM-DD */
  to: string;
  instruments: InstrumentId[];
}

export interface CalcOutput {
  input: CalcInput;
  results: InstrumentResult[];
  /** IPC acumulado entre from y to, decimal */
  inflacionAcumulada: number;
  updatedAt: string;
  warnings: string[];
}
