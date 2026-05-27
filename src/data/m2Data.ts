// ============================================================
// MacroLibre — M2 Proxy: datos generados por modelo ML
// Modelos: OLS Baseline · Gradient Boosting · Markov Switching
// Última actualización: Mar 2026
// Script: ml/m2_ml_model.py
// ============================================================

export interface M2DataPoint {
  fecha: string;
  m2: number;        // M2 nominal real (ARS billones)
  fitted_gb: number; // Gradient Boosting fitted
  fitted_ols: number;// OLS Baseline fitted
  desvio_gb: number; // Desvío vs GB (%)
  desvio_ols: number;// Desvío vs OLS (%)
  brecha: number;    // Brecha cambiaria (%)
  inflacion: number; // Inflación mensual (%)
}

export interface M2Projection {
  fecha: string;
  optimista: number;
  base: number;
  pesimista: number;
}

export interface M2ModelStats {
  nombre: string;
  r2: number;
  rmse: number;
  desvioActual: number;
  descripcion: string;
}

// ── Serie histórica (Ene-2015 → Mar-2026) ────────────────────────────────────
export const m2HistData: M2DataPoint[] = [
  { fecha: "Jan 17", m2: 1.52, fitted_gb: 1.52, fitted_ols: 1.1, desvio_gb: 0.0, desvio_ols: 37.9, brecha: 0.6, inflacion: 1.3 },
  { fecha: "Mar 17", m2: 1.64, fitted_gb: 1.64, fitted_ols: 1.11, desvio_gb: 0.4, desvio_ols: 48.3, brecha: 0.6, inflacion: 2.4 },
  { fecha: "May 17", m2: 1.77, fitted_gb: 1.78, fitted_ols: 1.2, desvio_gb: -0.2, desvio_ols: 47.9, brecha: 0.6, inflacion: 1.3 },
  { fecha: "Jul 17", m2: 1.92, fitted_gb: 1.92, fitted_ols: 1.22, desvio_gb: -0.0, desvio_ols: 57.3, brecha: 0.6, inflacion: 1.7 },
  { fecha: "Sep 17", m2: 2.07, fitted_gb: 2.07, fitted_ols: 1.22, desvio_gb: 0.2, desvio_ols: 69.5, brecha: 0.6, inflacion: 1.9 },
  { fecha: "Nov 17", m2: 2.23, fitted_gb: 2.23, fitted_ols: 1.26, desvio_gb: 0.2, desvio_ols: 76.6, brecha: 0.6, inflacion: 1.4 },
  { fecha: "Jan 18", m2: 2.38, fitted_gb: 2.38, fitted_ols: 1.34, desvio_gb: -0.0, desvio_ols: 77.7, brecha: 1.5, inflacion: 1.8 },
  { fecha: "Mar 18", m2: 2.46, fitted_gb: 2.46, fitted_ols: 1.36, desvio_gb: 0.1, desvio_ols: 80.5, brecha: 1.5, inflacion: 2.3 },
  { fecha: "May 18", m2: 2.5, fitted_gb: 2.48, fitted_ols: 1.5, desvio_gb: 0.6, desvio_ols: 66.3, brecha: 4.3, inflacion: 2.1 },
  { fecha: "Jul 18", m2: 2.43, fitted_gb: 2.42, fitted_ols: 1.53, desvio_gb: 0.5, desvio_ols: 59.2, brecha: 5.4, inflacion: 3.1 },
  { fecha: "Sep 18", m2: 2.32, fitted_gb: 2.32, fitted_ols: 1.72, desvio_gb: 0.1, desvio_ols: 34.8, brecha: 2.4, inflacion: 6.5 },
  { fecha: "Nov 18", m2: 2.25, fitted_gb: 2.25, fitted_ols: 1.84, desvio_gb: 0.1, desvio_ols: 22.6, brecha: 2.7, inflacion: 3.2 },
  { fecha: "Jan 19", m2: 2.26, fitted_gb: 2.26, fitted_ols: 1.94, desvio_gb: -0.0, desvio_ols: 16.8, brecha: 5.3, inflacion: 2.9 },
  { fecha: "Mar 19", m2: 2.36, fitted_gb: 2.36, fitted_ols: 2.08, desvio_gb: 0.1, desvio_ols: 13.5, brecha: 3.7, inflacion: 4.7 },
  { fecha: "May 19", m2: 2.51, fitted_gb: 2.51, fitted_ols: 2.23, desvio_gb: 0.1, desvio_ols: 12.6, brecha: 4.9, inflacion: 3.1 },
  { fecha: "Jul 19", m2: 2.67, fitted_gb: 2.67, fitted_ols: 2.39, desvio_gb: -0.0, desvio_ols: 11.5, brecha: 5.3, inflacion: 2.2 },
  { fecha: "Sep 19", m2: 2.54, fitted_gb: 2.55, fitted_ols: 2.42, desvio_gb: -0.4, desvio_ols: 4.9, brecha: 16.1, inflacion: 5.9 },
  { fecha: "Nov 19", m2: 2.76, fitted_gb: 2.76, fitted_ols: 2.7, desvio_gb: 0.1, desvio_ols: 2.3, brecha: 27.7, inflacion: 4.3 },
  { fecha: "Jan 20", m2: 2.94, fitted_gb: 2.95, fitted_ols: 2.97, desvio_gb: -0.2, desvio_ols: -1.0, brecha: 30.2, inflacion: 2.3 },
  { fecha: "Mar 20", m2: 3.12, fitted_gb: 3.13, fitted_ols: 3.08, desvio_gb: -0.2, desvio_ols: 1.3, brecha: 30.1, inflacion: 3.3 },
  { fecha: "May 20", m2: 3.28, fitted_gb: 3.28, fitted_ols: 3.59, desvio_gb: 0.0, desvio_ols: -8.6, brecha: 31.2, inflacion: 1.5 },
  { fecha: "Jul 20", m2: 3.58, fitted_gb: 3.58, fitted_ols: 3.66, desvio_gb: 0.1, desvio_ols: -2.3, brecha: 62.4, inflacion: 1.9 },
  { fecha: "Sep 20", m2: 3.89, fitted_gb: 3.9, fitted_ols: 3.64, desvio_gb: -0.1, desvio_ols: 6.9, brecha: 95.5, inflacion: 2.8 },
  { fecha: "Nov 20", m2: 4.2, fitted_gb: 4.21, fitted_ols: 3.76, desvio_gb: -0.2, desvio_ols: 11.7, brecha: 95.1, inflacion: 3.2 },
  { fecha: "Jan 21", m2: 4.65, fitted_gb: 4.63, fitted_ols: 3.93, desvio_gb: 0.4, desvio_ols: 18.3, brecha: 89.7, inflacion: 4.0 },
  { fecha: "Mar 21", m2: 4.99, fitted_gb: 4.99, fitted_ols: 4.1, desvio_gb: 0.1, desvio_ols: 21.7, brecha: 59.8, inflacion: 4.8 },
  { fecha: "May 21", m2: 5.37, fitted_gb: 5.36, fitted_ols: 4.55, desvio_gb: 0.2, desvio_ols: 18.1, brecha: 70.1, inflacion: 3.3 },
  { fecha: "Jul 21", m2: 5.76, fitted_gb: 5.79, fitted_ols: 4.79, desvio_gb: -0.5, desvio_ols: 20.2, brecha: 71.6, inflacion: 3.0 },
  { fecha: "Sep 21", m2: 6.18, fitted_gb: 6.18, fitted_ols: 5.02, desvio_gb: -0.0, desvio_ols: 23.2, brecha: 71.0, inflacion: 3.5 },
  { fecha: "Nov 21", m2: 6.65, fitted_gb: 6.65, fitted_ols: 5.39, desvio_gb: -0.0, desvio_ols: 23.3, brecha: 81.8, inflacion: 2.5 },
  { fecha: "Jan 22", m2: 7.38, fitted_gb: 7.33, fitted_ols: 5.6, desvio_gb: 0.6, desvio_ols: 31.9, brecha: 104.8, inflacion: 3.9 },
  { fecha: "Mar 22", m2: 7.85, fitted_gb: 7.84, fitted_ols: 5.78, desvio_gb: 0.1, desvio_ols: 35.8, brecha: 102.7, inflacion: 6.7 },
  { fecha: "May 22", m2: 8.37, fitted_gb: 8.38, fitted_ols: 6.69, desvio_gb: -0.1, desvio_ols: 25.1, brecha: 96.7, inflacion: 5.1 },
  { fecha: "Jul 22", m2: 8.94, fitted_gb: 8.94, fitted_ols: 7.08, desvio_gb: -0.0, desvio_ols: 26.2, brecha: 122.7, inflacion: 7.4 },
  { fecha: "Sep 22", m2: 9.58, fitted_gb: 9.57, fitted_ols: 8.45, desvio_gb: 0.1, desvio_ols: 13.4, brecha: 96.7, inflacion: 6.2 },
  { fecha: "Nov 22", m2: 10.3, fitted_gb: 10.32, fitted_ols: 9.64, desvio_gb: -0.2, desvio_ols: 6.8, brecha: 87.9, inflacion: 4.9 },
  { fecha: "Jan 23", m2: 11.4, fitted_gb: 11.42, fitted_ols: 10.48, desvio_gb: -0.1, desvio_ols: 8.8, brecha: 102.1, inflacion: 6.0 },
  { fecha: "Mar 23", m2: 12.4, fitted_gb: 12.4, fitted_ols: 11.39, desvio_gb: 0.0, desvio_ols: 8.9, brecha: 85.7, inflacion: 7.7 },
  { fecha: "May 23", m2: 13.5, fitted_gb: 13.5, fitted_ols: 13.23, desvio_gb: -0.0, desvio_ols: 2.1, brecha: 106.8, inflacion: 8.4 },
  { fecha: "Jul 23", m2: 15.0, fitted_gb: 15.01, fitted_ols: 15.56, desvio_gb: -0.0, desvio_ols: -3.6, brecha: 96.3, inflacion: 6.3 },
  { fecha: "Sep 23", m2: 16.8, fitted_gb: 16.77, fitted_ols: 17.94, desvio_gb: 0.2, desvio_ols: -6.4, brecha: 111.4, inflacion: 12.7 },
  { fecha: "Nov 23", m2: 19.0, fitted_gb: 19.05, fitted_ols: 20.02, desvio_gb: -0.2, desvio_ols: -5.1, brecha: 176.1, inflacion: 12.8 },
  { fecha: "Jan 24", m2: 25.5, fitted_gb: 25.53, fitted_ols: 25.48, desvio_gb: -0.1, desvio_ols: 0.1, brecha: 45.5, inflacion: 20.6 },
  { fecha: "Mar 24", m2: 28.4, fitted_gb: 28.37, fitted_ols: 41.23, desvio_gb: 0.1, desvio_ols: -31.1, brecha: 20.7, inflacion: 11.0 },
  { fecha: "May 24", m2: 31.2, fitted_gb: 31.15, fitted_ols: 54.7, desvio_gb: 0.2, desvio_ols: -43.0, brecha: 13.8, inflacion: 4.2 },
  { fecha: "Jul 24", m2: 34.3, fitted_gb: 34.38, fitted_ols: 59.2, desvio_gb: -0.2, desvio_ols: -42.1, brecha: 39.6, inflacion: 4.0 },
  { fecha: "Sep 24", m2: 37.9, fitted_gb: 37.72, fitted_ols: 64.18, desvio_gb: 0.5, desvio_ols: -40.9, brecha: 24.0, inflacion: 3.5 },
  { fecha: "Nov 24", m2: 46.5, fitted_gb: 46.65, fitted_ols: 68.99, desvio_gb: -0.3, desvio_ols: -32.6, brecha: 10.0, inflacion: 2.4 },
  { fecha: "Jan 25", m2: 52.0, fitted_gb: 52.02, fitted_ols: 71.18, desvio_gb: -0.0, desvio_ols: -27.0, brecha: 8.3, inflacion: 2.9 },
  { fecha: "Mar 25", m2: 54.8, fitted_gb: 54.64, fitted_ols: 73.24, desvio_gb: 0.3, desvio_ols: -25.2, brecha: 7.8, inflacion: 3.7 },
  { fecha: "May 25", m2: 56.5, fitted_gb: 56.58, fitted_ols: 79.2, desvio_gb: -0.1, desvio_ols: -28.7, brecha: 7.2, inflacion: 2.2 },
  { fecha: "Jul 25", m2: 57.0, fitted_gb: 57.06, fitted_ols: 83.73, desvio_gb: -0.1, desvio_ols: -31.9, brecha: 3.4, inflacion: 1.9 },
  { fecha: "Sep 25", m2: 57.5, fitted_gb: 57.52, fitted_ols: 85.95, desvio_gb: -0.0, desvio_ols: -33.1, brecha: 2.4, inflacion: 2.1 },
  { fecha: "Nov 25", m2: 58.2, fitted_gb: 58.19, fitted_ols: 88.54, desvio_gb: 0.0, desvio_ols: -34.3, brecha: 0.7, inflacion: 2.5 },
  { fecha: "Jan 26", m2: 58.7, fitted_gb: 58.96, fitted_ols: 93.51, desvio_gb: -0.4, desvio_ols: -37.2, brecha: 1.1, inflacion: 2.9 },
  { fecha: "Mar 26", m2: 59.1, fitted_gb: 59.34, fitted_ols: 94.73, desvio_gb: -0.4, desvio_ols: -37.6, brecha: -0.4, inflacion: 3.4 },
  // Últimos 12 meses (datos mensuales completos)
  { fecha: "Apr 25", m2: 55.8, fitted_gb: 55.83, fitted_ols: 76.95, desvio_gb: -0.1, desvio_ols: -27.5, brecha: 8.0, inflacion: 2.8 },
  { fecha: "May 25", m2: 56.5, fitted_gb: 56.58, fitted_ols: 79.2, desvio_gb: -0.1, desvio_ols: -28.7, brecha: 7.2, inflacion: 2.2 },
  { fecha: "Jun 25", m2: 56.8, fitted_gb: 56.87, fitted_ols: 81.39, desvio_gb: -0.1, desvio_ols: -30.2, brecha: 6.5, inflacion: 1.6 },
  { fecha: "Jul 25", m2: 57.0, fitted_gb: 57.06, fitted_ols: 83.73, desvio_gb: -0.1, desvio_ols: -31.9, brecha: 3.4, inflacion: 1.9 },
  { fecha: "Aug 25", m2: 57.3, fitted_gb: 57.27, fitted_ols: 83.76, desvio_gb: 0.0, desvio_ols: -31.6, brecha: 2.5, inflacion: 1.9 },
  { fecha: "Sep 25", m2: 57.5, fitted_gb: 57.52, fitted_ols: 85.95, desvio_gb: -0.0, desvio_ols: -33.1, brecha: 2.4, inflacion: 2.1 },
  { fecha: "Oct 25", m2: 57.8, fitted_gb: 57.88, fitted_ols: 87.8, desvio_gb: -0.1, desvio_ols: -34.2, brecha: 1.9, inflacion: 2.3 },
  { fecha: "Nov 25", m2: 58.2, fitted_gb: 58.19, fitted_ols: 88.54, desvio_gb: 0.0, desvio_ols: -34.3, brecha: 0.7, inflacion: 2.5 },
  { fecha: "Dec 25", m2: 58.5, fitted_gb: 58.25, fitted_ols: 89.56, desvio_gb: 0.4, desvio_ols: -34.7, brecha: 1.1, inflacion: 2.8 },
  { fecha: "Jan 26", m2: 58.7, fitted_gb: 58.96, fitted_ols: 93.51, desvio_gb: -0.4, desvio_ols: -37.2, brecha: 1.1, inflacion: 2.9 },
  { fecha: "Feb 26", m2: 58.9, fitted_gb: 58.62, fitted_ols: 98.44, desvio_gb: 0.5, desvio_ols: -40.2, brecha: 1.1, inflacion: 2.9 },
  { fecha: "Mar 26", m2: 59.1, fitted_gb: 59.34, fitted_ols: 94.73, desvio_gb: -0.4, desvio_ols: -37.6, brecha: -0.4, inflacion: 3.4 },
];

// ── Proyecciones Abr-Dic 2026 ────────────────────────────────────────────────
export const m2Proyecciones: M2Projection[] = [
  { fecha: "Abr 26", optimista: 64.9, base: 68.6, pesimista: 67.1 },
  { fecha: "May 26", optimista: 65.9, base: 70.3, pesimista: 69.8 },
  { fecha: "Jun 26", optimista: 66.9, base: 72.1, pesimista: 72.6 },
  { fecha: "Jul 26", optimista: 67.9, base: 73.9, pesimista: 75.5 },
  { fecha: "Ago 26", optimista: 68.9, base: 75.7, pesimista: 78.5 },
  { fecha: "Sep 26", optimista: 69.9, base: 77.6, pesimista: 81.6 },
  { fecha: "Oct 26", optimista: 71.0, base: 79.6, pesimista: 84.9 },
  { fecha: "Nov 26", optimista: 72.0, base: 81.5, pesimista: 88.3 },
  { fecha: "Dic 26", optimista: 73.1, base: 83.6, pesimista: 91.8 },
];

// ── Estadísticas de modelos ──────────────────────────────────────────────────
export const m2ModelStats: M2ModelStats[] = [
  {
    nombre: "OLS Baseline",
    r2: 0.1793,
    rmse: 0.2797,
    desvioActual: -37.6,
    descripcion: "Regresión log-lineal clásica (4 variables). Asume relación estable entre M2, actividad, inflación y TC. Calibrada en período 2010-2022.",
  },
  {
    nombre: "Gradient Boosting ML",
    r2: 0.9999,
    rmse: 0.0023,
    desvioActual: -0.4,
    descripcion: "300 árboles con profundidad 4. Captura no-linealidades y quiebres estructurales (cepos, devaluaciones, desinflación). 8 variables explicativas.",
  },
  {
    nombre: "Markov Switching",
    r2: 0.9894,
    rmse: 0.0318,
    desvioActual: -1.3,
    descripcion: "OLS por régimen monetario (5 regímenes: 2010-17, crisis 2018-19, pandemia 2020-22, shock 2023-24, remonetización 2025+). Inspirado en quantEcon.",
  },
];

// ── Importancia de variables (Gradient Boosting) ─────────────────────────────
export const m2FeatureImportance = [
  { variable: "Tendencia monetaria", importancia: 0.8056 },
  { variable: "Brecha cambiaria", importancia: 0.1544 },
  { variable: "Actividad (EMAE)", importancia: 0.0313 },
  { variable: "Depreciación TC", importancia: 0.005 },
  { variable: "Inflación mensual", importancia: 0.0015 },
  { variable: "Tasa real", importancia: 0.0011 },
  { variable: "Inflación rezagada", importancia: 0.0008 },
  { variable: "Aceleración inflac.", importancia: 0.0005 },
];

// ── KPIs resumen del modelo ──────────────────────────────────────────────────
export const m2Summary = {
  valorActual: 59.1,           // ARS billones (Mar-26)
  varMensual: 3.9,             // %
  varInteranual: 29.3,         // %
  desvioOLS: -37.6,          // % vs OLS Baseline
  desvioML: -0.4,            // % vs Gradient Boosting
  regimenActual: "Remonetización (2025+)",
  proyBase2026: 83.6,        // ARS billones Dic-26
  proyOptimista2026: 73.1,
  proyPesimista2026: 91.8,
  modeloPreferido: "Gradient Boosting",
  fuentesDatos: ["BCRA", "INDEC", "Ámbito", "MacroLibre ML"],
};
