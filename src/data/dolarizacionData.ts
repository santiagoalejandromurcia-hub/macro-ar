// Dolarización de Portafolios — Argentina 2016-2026
// Fuente: BCRA (depósitos en USD y ARS), INDEC (IPC i.a.)
// Metodología: (Dep.USD × TC_Oficial) / (Dep.USD × TC_Oficial + Dep.ARS) × 100

export interface DolarizacionPoint {
  fecha: string;         // "YYYY-MM"
  dolarOf: number;       // % dolarización a TC oficial
  dolarBlue: number;     // % dolarización a TC blue (con brecha)
  depUsd: number;        // Depósitos en USD (millones de dólares)
  ipc: number | null;    // IPC interanual INDEC (%)
}

export interface DolarizacionSummary {
  actual: number;
  maximo: number;
  maximoFecha: string;
  minimo: number;
  minimoFecha: string;
  hace12meses: number;
  variacion12m: number;
  depUsdActual: number;
  fechaActualizacion: string;
}

export const dolarizacionData: DolarizacionPoint[] = [
  { fecha: "2016-10", dolarOf: 27.92, dolarBlue: 29.5, depUsd: 20500, ipc: 40.3 },
  { fecha: "2016-11", dolarOf: 28.26, dolarBlue: 29.83, depUsd: 20896, ipc: 41 },
  { fecha: "2016-12", dolarOf: 28.94, dolarBlue: 30.45, depUsd: 21604, ipc: 41.2 },
  { fecha: "2017-01", dolarOf: 28.5, dolarBlue: 29.9, depUsd: 22000, ipc: 38.5 },
  { fecha: "2017-02", dolarOf: 27.48, dolarBlue: 28.75, depUsd: 22382, ipc: 37.9 },
  { fecha: "2017-03", dolarOf: 27.26, dolarBlue: 28.43, depUsd: 23185, ipc: 37.5 },
  { fecha: "2017-04", dolarOf: 27.17, dolarBlue: 28.24, depUsd: 24248, ipc: 37 },
  { fecha: "2017-05", dolarOf: 27.79, dolarBlue: 28.8, depUsd: 25118, ipc: 36.5 },
  { fecha: "2017-06", dolarOf: 28.42, dolarBlue: 29.42, depUsd: 25500, ipc: 36 },
  { fecha: "2017-07", dolarOf: 29.46, dolarBlue: 30.46, depUsd: 25608, ipc: 29.5 },
  { fecha: "2017-08", dolarOf: 29.09, dolarBlue: 30.05, depUsd: 25889, ipc: 24.4 },
  { fecha: "2017-09", dolarOf: 28.09, dolarBlue: 28.99, depUsd: 26256, ipc: 24.2 },
  { fecha: "2017-10", dolarOf: 27.61, dolarBlue: 28.46, depUsd: 26611, ipc: 23.9 },
  { fecha: "2017-11", dolarOf: 27.13, dolarBlue: 27.93, depUsd: 26892, ipc: 23.8 },
  { fecha: "2017-12", dolarOf: 27.16, dolarBlue: 27.95, depUsd: 27000, ipc: 24.8 },
  { fecha: "2018-01", dolarOf: 28.47, dolarBlue: 29.37, depUsd: 27359, ipc: 25 },
  { fecha: "2018-02", dolarOf: 28.89, dolarBlue: 30.02, depUsd: 28141, ipc: 25.4 },
  { fecha: "2018-03", dolarOf: 28.68, dolarBlue: 30.09, depUsd: 28841, ipc: 25.3 },
  { fecha: "2018-04", dolarOf: 27.78, dolarBlue: 29.42, depUsd: 29200, ipc: 25.5 },
  { fecha: "2018-05", dolarOf: 30.03, dolarBlue: 31.98, depUsd: 29018, ipc: 26.3 },
  { fecha: "2018-06", dolarOf: 31.81, dolarBlue: 33.92, depUsd: 28600, ipc: 29.5 },
  { fecha: "2018-07", dolarOf: 31.96, dolarBlue: 34.21, depUsd: 28193, ipc: 31.2 },
  { fecha: "2018-08", dolarOf: 32.63, dolarBlue: 35.29, depUsd: 28000, ipc: 34.4 },
  { fecha: "2018-09", dolarOf: 36.67, dolarBlue: 39.97, depUsd: 27759, ipc: 40.5 },
  { fecha: "2018-10", dolarOf: 34.1, dolarBlue: 37.79, depUsd: 27250, ipc: 45.9 },
  { fecha: "2018-11", dolarOf: 32.34, dolarBlue: 36.32, depUsd: 26727, ipc: 48.5 },
  { fecha: "2018-12", dolarOf: 32.66, dolarBlue: 36.79, depUsd: 26500, ipc: 47.6 },
  { fecha: "2019-01", dolarOf: 31.72, dolarBlue: 35.87, depUsd: 26092, ipc: 49.3 },
  { fecha: "2019-02", dolarOf: 30.79, dolarBlue: 35.05, depUsd: 25204, ipc: 51.3 },
  { fecha: "2019-03", dolarOf: 30.84, dolarBlue: 35.33, depUsd: 24408, ipc: 54.7 },
  { fecha: "2019-04", dolarOf: 30.53, dolarBlue: 35.22, depUsd: 24000, ipc: 55.8 },
  { fecha: "2019-05", dolarOf: 30.5, dolarBlue: 35.35, depUsd: 23773, ipc: 57.3 },
  { fecha: "2019-06", dolarOf: 29.23, dolarBlue: 34.05, depUsd: 23250, ipc: 55.8 },
  { fecha: "2019-07", dolarOf: 27.85, dolarBlue: 32.96, depUsd: 22741, ipc: 54.4 },
  { fecha: "2019-08", dolarOf: 31.19, dolarBlue: 37.07, depUsd: 22500, ipc: 54.5 },
  { fecha: "2019-09", dolarOf: 30.05, dolarBlue: 34.44, depUsd: 21000, ipc: 53.5 },
  { fecha: "2019-10", dolarOf: 28.51, dolarBlue: 31.45, depUsd: 19781, ipc: 50.5 },
  { fecha: "2019-11", dolarOf: 26.83, dolarBlue: 31.03, depUsd: 18500, ipc: 52.1 },
  { fecha: "2019-12", dolarOf: 25.86, dolarBlue: 31.2, depUsd: 17800, ipc: 53.8 },
  { fecha: "2020-01", dolarOf: 24.87, dolarBlue: 30.95, depUsd: 17316, ipc: 52.9 },
  { fecha: "2020-02", dolarOf: 23.16, dolarBlue: 30.44, depUsd: 16432, ipc: 40.7 },
  { fecha: "2020-03", dolarOf: 21.94, dolarBlue: 29.65, depUsd: 16000, ipc: 48.4 },
  { fecha: "2020-04", dolarOf: 21.2, dolarBlue: 29.3, depUsd: 15789, ipc: 45.6 },
  { fecha: "2020-05", dolarOf: 20.46, dolarBlue: 29.29, depUsd: 15411, ipc: 43.4 },
  { fecha: "2020-06", dolarOf: 20.34, dolarBlue: 29.64, depUsd: 15200, ipc: 42.8 },
  { fecha: "2020-07", dolarOf: 20.37, dolarBlue: 30.91, depUsd: 15150, ipc: 42.4 },
  { fecha: "2020-08", dolarOf: 19.75, dolarBlue: 32.71, depUsd: 15019, ipc: 40.7 },
  { fecha: "2020-09", dolarOf: 18.91, dolarBlue: 33.92, depUsd: 14847, ipc: 36.6 },
  { fecha: "2020-10", dolarOf: 18.28, dolarBlue: 33.98, depUsd: 14681, ipc: 37.2 },
  { fecha: "2020-11", dolarOf: 17.91, dolarBlue: 31.89, depUsd: 14550, ipc: 35.8 },
  { fecha: "2020-12", dolarOf: 18.1, dolarBlue: 30.65, depUsd: 14500, ipc: 36.1 },
  { fecha: "2021-01", dolarOf: 18.28, dolarBlue: 30.71, depUsd: 14446, ipc: 38.5 },
  { fecha: "2021-02", dolarOf: 17.77, dolarBlue: 29.46, depUsd: 14312, ipc: 40.7 },
  { fecha: "2021-03", dolarOf: 17.11, dolarBlue: 27.92, depUsd: 14156, ipc: 42.6 },
  { fecha: "2021-04", dolarOf: 16.32, dolarBlue: 26.14, depUsd: 13983, ipc: 46.3 },
  { fecha: "2021-05", dolarOf: 15.76, dolarBlue: 24.87, depUsd: 13854, ipc: 48.8 },
  { fecha: "2021-06", dolarOf: 15.63, dolarBlue: 24.48, depUsd: 13800, ipc: 50.2 },
  { fecha: "2021-07", dolarOf: 15.38, dolarBlue: 24.27, depUsd: 13750, ipc: 51.8 },
  { fecha: "2021-08", dolarOf: 14.57, dolarBlue: 23.51, depUsd: 13619, ipc: 51.4 },
  { fecha: "2021-09", dolarOf: 13.61, dolarBlue: 22.58, depUsd: 13447, ipc: 52.5 },
  { fecha: "2021-10", dolarOf: 12.78, dolarBlue: 21.76, depUsd: 13281, ipc: 52.1 },
  { fecha: "2021-11", dolarOf: 12.22, dolarBlue: 21.23, depUsd: 13150, ipc: 51.2 },
  { fecha: "2021-12", dolarOf: 12.14, dolarBlue: 21.22, depUsd: 13100, ipc: 50.9 },
  { fecha: "2022-01", dolarOf: 12.03, dolarBlue: 21.09, depUsd: 13131, ipc: 50.7 },
  { fecha: "2022-02", dolarOf: 11.53, dolarBlue: 20.37, depUsd: 13208, ipc: 52.3 },
  { fecha: "2022-03", dolarOf: 11.07, dolarBlue: 19.73, depUsd: 13297, ipc: 55.1 },
  { fecha: "2022-04", dolarOf: 10.66, dolarBlue: 19.17, depUsd: 13395, ipc: 58 },
  { fecha: "2022-05", dolarOf: 10.53, dolarBlue: 19.02, depUsd: 13469, ipc: 60.7 },
  { fecha: "2022-06", dolarOf: 10.72, dolarBlue: 19.36, depUsd: 13500, ipc: 64 },
  { fecha: "2022-07", dolarOf: 10.73, dolarBlue: 21.25, depUsd: 13450, ipc: 71 },
  { fecha: "2022-08", dolarOf: 10.21, dolarBlue: 22.14, depUsd: 13319, ipc: 78.5 },
  { fecha: "2022-09", dolarOf: 9.6, dolarBlue: 20.4, depUsd: 13147, ipc: 83 },
  { fecha: "2022-10", dolarOf: 9.16, dolarBlue: 18.33, depUsd: 12981, ipc: 88 },
  { fecha: "2022-11", dolarOf: 8.98, dolarBlue: 16.7, depUsd: 12850, ipc: 92.4 },
  { fecha: "2022-12", dolarOf: 9.26, dolarBlue: 16.6, depUsd: 12800, ipc: 94.8 },
  { fecha: "2023-01", dolarOf: 9.36, dolarBlue: 16.77, depUsd: 12854, ipc: 98.8 },
  { fecha: "2023-02", dolarOf: 9.02, dolarBlue: 16.2, depUsd: 12988, ipc: 102.5 },
  { fecha: "2023-03", dolarOf: 8.71, dolarBlue: 15.68, depUsd: 13144, ipc: 104.3 },
  { fecha: "2023-04", dolarOf: 8.47, dolarBlue: 15.29, depUsd: 13317, ipc: 108.8 },
  { fecha: "2023-05", dolarOf: 8.49, dolarBlue: 15.37, depUsd: 13446, ipc: 114.2 },
  { fecha: "2023-06", dolarOf: 8.87, dolarBlue: 16.12, depUsd: 13500, ipc: 115.6 },
  { fecha: "2023-07", dolarOf: 8.99, dolarBlue: 16.43, depUsd: 13570, ipc: 113.4 },
  { fecha: "2023-08", dolarOf: 9.5, dolarBlue: 17.36, depUsd: 13745, ipc: 124.4 },
  { fecha: "2023-09", dolarOf: 9.0, dolarBlue: 18.23, depUsd: 13955, ipc: 138.3 },
  { fecha: "2023-10", dolarOf: 8.06, dolarBlue: 17.97, depUsd: 14125, ipc: 142.7 },
  { fecha: "2023-11", dolarOf: 7.5, dolarBlue: 12.47, depUsd: 14200, ipc: 160.9 },
  { fecha: "2023-12", dolarOf: 12.91, dolarBlue: 13.47, depUsd: 14800, ipc: 211.4 },
  { fecha: "2024-01", dolarOf: 14.77, dolarBlue: 15.3, depUsd: 15257, ipc: 254.2 },
  { fecha: "2024-02", dolarOf: 13.44, dolarBlue: 13.75, depUsd: 16092, ipc: 276.2 },
  { fecha: "2024-03", dolarOf: 13.03, dolarBlue: 13.26, depUsd: 16500, ipc: 287.9 },
  { fecha: "2024-04", dolarOf: 12.33, dolarBlue: 13.61, depUsd: 16843, ipc: 289.4 },
  { fecha: "2024-05", dolarOf: 11.21, dolarBlue: 14.09, depUsd: 17457, ipc: 276 },
  { fecha: "2024-06", dolarOf: 10.78, dolarBlue: 14.47, depUsd: 17800, ipc: 271.5 },
  { fecha: "2024-07", dolarOf: 10.72, dolarBlue: 14.07, depUsd: 17901, ipc: 263.4 },
  { fecha: "2024-08", dolarOf: 10.27, dolarBlue: 12.86, depUsd: 18163, ipc: 236.7 },
  { fecha: "2024-09", dolarOf: 9.72, dolarBlue: 11.86, depUsd: 18506, ipc: 209 },
  { fecha: "2024-10", dolarOf: 9.29, dolarBlue: 10.94, depUsd: 18837, ipc: 193 },
  { fecha: "2024-11", dolarOf: 9.04, dolarBlue: 9.86, depUsd: 19099, ipc: 166 },
  { fecha: "2024-12", dolarOf: 9.04, dolarBlue: 9.45, depUsd: 19200, ipc: 117.8 },
  { fecha: "2025-01", dolarOf: 9.09, dolarBlue: 9.49, depUsd: 19262, ipc: 84.5 },
  { fecha: "2025-02", dolarOf: 8.9, dolarBlue: 9.24, depUsd: 19415, ipc: 66.9 },
  { fecha: "2025-03", dolarOf: 8.64, dolarBlue: 8.92, depUsd: 19593, ipc: 55.9 },
  { fecha: "2025-04", dolarOf: 8.68, dolarBlue: 8.9, depUsd: 19791, ipc: 47.3 },
  { fecha: "2025-05", dolarOf: 8.62, dolarBlue: 8.79, depUsd: 19938, ipc: 43.5 },
  { fecha: "2025-06", dolarOf: 8.75, dolarBlue: 8.91, depUsd: 20000, ipc: 39.4 },
  { fecha: "2025-07", dolarOf: 9.25, dolarBlue: 9.42, depUsd: 20057, ipc: 36.6 },
  { fecha: "2025-08", dolarOf: 9.48, dolarBlue: 9.63, depUsd: 20207, ipc: 33.6 },
  { fecha: "2025-09", dolarOf: 9.69, dolarBlue: 9.83, depUsd: 20403, ipc: 31.8 },
  { fecha: "2025-10", dolarOf: 9.66, dolarBlue: 9.79, depUsd: 20593, ipc: 31.3 },
  { fecha: "2025-11", dolarOf: 9.47, dolarBlue: 9.58, depUsd: 20743, ipc: 31.4 },
  { fecha: "2025-12", dolarOf: 9.53, dolarBlue: 9.63, depUsd: 20800, ipc: 31.5 },
  { fecha: "2026-01", dolarOf: 9.4, dolarBlue: 9.49, depUsd: 21000, ipc: 32.4 },
  { fecha: "2026-02", dolarOf: 9.04, dolarBlue: 9.12, depUsd: 21200, ipc: 33.1 },
  { fecha: "2026-03", dolarOf: 9.1, dolarBlue: 9.18, depUsd: 21350, ipc: 32.6 },
  { fecha: "2026-04", dolarOf: 9.0, dolarBlue: 9.04, depUsd: 21400, ipc: 32.4 },
  { fecha: "2026-05", dolarOf: 8.95, dolarBlue: 9.0, depUsd: 21500, ipc: 33.2 },
];

export const dolarizacionSummary: DolarizacionSummary = {
  actual: 9.04,
  maximo: 36.67,
  maximoFecha: "2018-09",
  minimo: 7.5,
  minimoFecha: "2023-11",
  hace12meses: 8.9,
  variacion12m: 0.14,
  depUsdActual: 21200,
  fechaActualizacion: "Feb 2026",
};

export interface EventoPoint {
  fecha: string;
  label: string;
  color: string;
}

export const eventosHistoricos: EventoPoint[] = [
  { fecha: "2018-09", label: "Crisis TC", color: "#ef4444" },
  { fecha: "2019-08", label: "Post-PASO", color: "#f97316" },
  { fecha: "2019-10", label: "Cepo 2.0", color: "#eab308" },
  { fecha: "2020-03", label: "COVID", color: "#8b5cf6" },
  { fecha: "2023-12", label: "Deval. Milei", color: "#ec4899" },
  { fecha: "2024-03", label: "Normalización", color: "#22c55e" },
];
