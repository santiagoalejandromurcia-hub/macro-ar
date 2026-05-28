// Auto-generado desde tesis NSS-VAR — Santiago Murcia (UC 2026)
// Datos: REM-BCRA, INDEC, BCRA, Ministerio de Economía, JP Morgan

export interface ExpHistPoint {
  date: string;
  pi3y: number | null;
  beta0: number | null;
  beta1: number | null;
  rem12m: number | null;
  rem24m: number | null;
}

export interface CurvaPoint {
  tau: number;
  fitted: number | null;
  label: string;
}

export interface ObsPoint {
  tau: number;
  obs: number | null;
  label: string;
}

export interface IRFPoint {
  h: number;
  irf: number;
  lo68: number;
  hi68: number;
}

export interface IRFSerie {
  shock: string;
  label: string;
  data: IRFPoint[];
}

export interface FEVDPoint {
  h: number;
  inflacion: number;
  tasa: number;
  fiscal: number;
  embi: number;
  tc: number;
  propio: number;
}

// ── SERIE HISTÓRICA (Oct 2016 – Feb 2026) ──
export const expHistData: ExpHistPoint[] = [
  { date:"2016-10", pi3y:16.55, beta0:45.12, beta1:17.33, rem12m:19.4, rem24m:14.9 },
  { date:"2017-01", pi3y:7.06, beta0:-17.42, beta1:36.88, rem12m:19.7, rem24m:14.0 },
  { date:"2017-04", pi3y:8.42, beta0:-4.78, beta1:28.53, rem12m:17.5, rem24m:13.0 },
  { date:"2017-07", pi3y:9.13, beta0:-0.73, beta1:27.66, rem12m:17.1, rem24m:12.5 },
  { date:"2017-10", pi3y:9.5, beta0:2.99, beta1:26.98, rem12m:17.3, rem24m:11.4 },
  { date:"2018-01", pi3y:6.95, beta0:-15.1, beta1:34.53, rem12m:18.6, rem24m:13.4 },
  { date:"2018-04", pi3y:9.8, beta0:0.21, beta1:26.67, rem12m:18.2, rem24m:13.5 },
  { date:"2018-07", pi3y:13.98, beta0:10.1, beta1:32.92, rem12m:23.7, rem24m:17.1 },
  { date:"2018-10", pi3y:19.11, beta0:30.12, beta1:42.38, rem12m:30.6, rem24m:20.1 },
  { date:"2019-01", pi3y:11.61, beta0:-14.85, beta1:46.45, rem12m:28.5, rem24m:19.0 },
  { date:"2019-04", pi3y:17.66, beta0:9.73, beta1:43.38, rem12m:31.4, rem24m:23.0 },
  { date:"2019-07", pi3y:18.49, beta0:9.6, beta1:41.82, rem12m:30.2, rem24m:22.7 },
  { date:"2019-10", pi3y:22.03, beta0:-21.75, beta1:83.72, rem12m:48.2, rem24m:30.0 },
  { date:"2020-01", pi3y:22.54, beta0:-6.33, beta1:50.43, rem12m:40.0, rem24m:31.7 },
  { date:"2020-04", pi3y:25.81, beta0:-28.9, beta1:65.01, rem12m:49.0, rem24m:36.4 },
  { date:"2020-07", pi3y:34.47, beta0:21.16, beta1:30.98, rem12m:43.2, rem24m:38.5 },
  { date:"2020-10", pi3y:23.24, beta0:-85.1, beta1:85.13, rem12m:52.1, rem24m:37.6 },
  { date:"2021-01", pi3y:25.56, beta0:-21.65, beta1:70.13, rem12m:49.4, rem24m:38.8 },
  { date:"2021-04", pi3y:29.41, beta0:3.63, beta1:45.55, rem12m:43.3, rem24m:36.8 },
  { date:"2021-07", pi3y:34.47, beta0:21.16, beta1:30.98, rem12m:43.2, rem24m:38.5 },
  { date:"2021-10", pi3y:33.83, beta0:-5.88, beta1:50.92, rem12m:48.6, rem24m:40.1 },
  { date:"2022-01", pi3y:30.42, beta0:-19.55, beta1:71.53, rem12m:53.9, rem24m:44.3 },
  { date:"2022-04", pi3y:43.09, beta0:33.72, beta1:43.15, rem12m:56.1, rem24m:50.0 },
  { date:"2022-07", pi3y:54.8, beta0:-7.75, beta1:96.27, rem12m:83.7, rem24m:72.9 },
  { date:"2022-10", pi3y:55.3, beta0:-61.21, beta1:143.93, rem12m:98.8, rem24m:74.5 },
  { date:"2023-01", pi3y:36.35, beta0:-115.78, beta1:193.48, rem12m:98.5, rem24m:74.3 },
  { date:"2023-04", pi3y:15.1, beta0:-308.88, beta1:384.67, rem12m:146.5, rem24m:73.0 },
  { date:"2023-07", pi3y:5.1, beta0:-322.3, beta1:431.52, rem12m:154.9, rem24m:59.9 },
  { date:"2023-10", pi3y:0.42, beta0:-468.84, beta1:595.69, rem12m:195.6, rem24m:73.0 },
  { date:"2024-01", pi3y:4.56, beta0:-97.82, beta1:462.01, rem12m:183.2, rem24m:58.0 },
  { date:"2024-04", pi3y:28.66, beta0:106.44, beta1:186.44, rem12m:88.0, rem24m:41.2 },
  { date:"2024-07", pi3y:35.45, beta0:168.87, beta1:80.28, rem12m:53.7, rem24m:30.3 },
  { date:"2024-10", pi3y:37.71, beta0:233.74, beta1:25.79, rem12m:35.0, rem24m:22.0 },
  { date:"2025-01", pi3y:6.26, beta0:-21.1, beta1:45.66, rem12m:21.9, rem24m:13.8 },
  { date:"2025-03", pi3y:6.05, beta0:-22.07, beta1:54.13, rem12m:24.5, rem24m:13.3 },
  { date:"2025-04", pi3y:6.3, beta0:-20.47, beta1:60.18, rem12m:26.3, rem24m:14.4 },
  { date:"2025-05", pi3y:8.71, beta0:0.14, beta1:39.36, rem12m:20.9, rem24m:13.6 },
  { date:"2025-06", pi3y:7.91, beta0:-6.42, beta1:41.29, rem12m:20.75, rem24m:13.41 },
  { date:"2025-07", pi3y:7.54, beta0:-6.5, beta1:42.58, rem12m:21.1, rem24m:11.74 },
  { date:"2025-08", pi3y:8.32, beta0:-4.24, beta1:41.67, rem12m:20.94, rem24m:12.1 },
  { date:"2025-09", pi3y:8.45, beta0:-7.34, beta1:45.82, rem12m:21.85, rem24m:12.67 },
  { date:"2025-10", pi3y:8.17, beta0:-3.73, beta1:43.69, rem12m:20.79, rem24m:11.7 },
  { date:"2025-11", pi3y:9.21, beta0:-0.51, beta1:41.92, rem12m:21.04, rem24m:12.0 },
  { date:"2025-12", pi3y:6.84, beta0:-13.93, beta1:35.95, rem12m:20.15, rem24m:12.7 },
  { date:"2026-01", pi3y:7.41, beta0:-16.77, beta1:40.25, rem12m:20.97, rem24m:14.6 },
  { date:"2026-02", pi3y:9.16, beta0:-8.5, beta1:39.7, rem12m:22.3, rem24m:15.4 }
];

// ── CURVA NS ACTUAL (Feb 2026) ──
export const curvaNSActual: CurvaPoint[] = [
  { tau:0.5, fitted:26.18, label:"6m" },
  { tau:1.0, fitted:21.63, label:"12m" },
  { tau:1.5, fitted:17.68, label:"18m" },
  { tau:2.0, fitted:14.32, label:"24m" },
  { tau:2.5, fitted:11.51, label:"30m" },
  { tau:3.0, fitted:9.16, label:"36m" }
];

// ── OBSERVACIONES REM (último mes disponible) ──
export const remObservado: ObsPoint[] = [
  { tau:0.5, obs:26.05, label:"6m" },
  { tau:1.0, obs:22.3, label:"12m" },
  { tau:1.5, obs:16.4, label:"18m" },
  { tau:2.0, obs:15.4, label:"24m" },
  { tau:2.5, obs:11.18, label:"30m" }
];

// ── IRF: Respuesta de expectativas 3y a shocks ──
export const irfData: IRFSerie[] = [
  {
    shock:"inflacion_ipc_ia",
    label:"Inflación IPC i.a.",
    data:[
    { h:0, irf:1.063, lo68:0.74, hi68:1.271 },
    { h:1, irf:3.388, lo68:2.362, hi68:3.618 },
    { h:2, irf:4.061, lo68:2.461, hi68:4.088 },
    { h:3, irf:3.95, lo68:2.008, hi68:4.032 },
    { h:4, irf:3.63, lo68:1.508, hi68:3.69 },
    { h:5, irf:3.455, lo68:1.266, hi68:3.458 },
    { h:6, irf:3.223, lo68:0.971, hi68:3.179 },
    { h:7, irf:2.821, lo68:0.634, hi68:2.716 },
    { h:8, irf:2.343, lo68:0.307, hi68:2.232 },
    { h:9, irf:1.886, lo68:0.053, hi68:1.783 },
    { h:10, irf:1.47, lo68:-0.18, hi68:1.388 },
    { h:11, irf:1.088, lo68:-0.365, hi68:1.037 },
    { h:12, irf:0.75, lo68:-0.492, hi68:0.75 },
    { h:13, irf:0.473, lo68:-0.596, hi68:0.509 },
    { h:14, irf:0.261, lo68:-0.64, hi68:0.373 },
    { h:15, irf:0.109, lo68:-0.649, hi68:0.291 },
    { h:16, irf:0.008, lo68:-0.63, hi68:0.263 },
    { h:17, irf:-0.048, lo68:-0.6, hi68:0.256 },
    { h:18, irf:-0.069, lo68:-0.552, hi68:0.262 },
    { h:19, irf:-0.062, lo68:-0.492, hi68:0.282 },
    { h:20, irf:-0.037, lo68:-0.449, hi68:0.308 },
    { h:21, irf:-0.003, lo68:-0.394, hi68:0.331 },
    { h:22, irf:0.034, lo68:-0.368, hi68:0.354 },
    { h:23, irf:0.069, lo68:-0.34, hi68:0.366 },
    { h:24, irf:0.098, lo68:-0.324, hi68:0.369 }
    ]
  },
  {
    shock:"fiscal_primario_real",
    label:"Balance fiscal",
    data:[
    { h:0, irf:1.956, lo68:1.558, hi68:2.049 },
    { h:1, irf:2.074, lo68:1.165, hi68:2.355 },
    { h:2, irf:2.175, lo68:0.892, hi68:2.52 },
    { h:3, irf:1.575, lo68:0.285, hi68:1.762 },
    { h:4, irf:1.336, lo68:0.005, hi68:1.631 },
    { h:5, irf:0.901, lo68:-0.393, hi68:1.153 },
    { h:6, irf:0.676, lo68:-0.537, hi68:1.011 },
    { h:7, irf:0.429, lo68:-0.747, hi68:0.707 },
    { h:8, irf:0.271, lo68:-0.759, hi68:0.574 },
    { h:9, irf:0.131, lo68:-0.783, hi68:0.402 },
    { h:10, irf:0.049, lo68:-0.745, hi68:0.355 },
    { h:11, irf:0.0, lo68:-0.697, hi68:0.289 },
    { h:12, irf:-0.013, lo68:-0.6, hi68:0.303 },
    { h:13, irf:-0.005, lo68:-0.54, hi68:0.307 },
    { h:14, irf:0.021, lo68:-0.449, hi68:0.357 },
    { h:15, irf:0.058, lo68:-0.385, hi68:0.393 },
    { h:16, irf:0.1, lo68:-0.312, hi68:0.431 },
    { h:17, irf:0.142, lo68:-0.257, hi68:0.463 },
    { h:18, irf:0.181, lo68:-0.205, hi68:0.473 },
    { h:19, irf:0.214, lo68:-0.174, hi68:0.479 },
    { h:20, irf:0.238, lo68:-0.148, hi68:0.475 },
    { h:21, irf:0.254, lo68:-0.141, hi68:0.448 },
    { h:22, irf:0.262, lo68:-0.143, hi68:0.444 },
    { h:23, irf:0.262, lo68:-0.169, hi68:0.421 },
    { h:24, irf:0.255, lo68:-0.177, hi68:0.406 }
    ]
  },
  {
    shock:"tasa_politica_tna",
    label:"Tasa BADLAR",
    data:[
    { h:0, irf:-1.952, lo68:-1.952, hi68:-1.415 },
    { h:1, irf:-1.38, lo68:-1.577, hi68:-0.455 },
    { h:2, irf:-2.252, lo68:-2.59, hi68:-1.087 },
    { h:3, irf:-2.496, lo68:-2.906, hi68:-1.15 },
    { h:4, irf:-2.636, lo68:-3.083, hi68:-1.161 },
    { h:5, irf:-2.384, lo68:-2.8, hi68:-0.733 },
    { h:6, irf:-1.971, lo68:-2.479, hi68:-0.217 },
    { h:7, irf:-1.487, lo68:-2.022, hi68:0.337 },
    { h:8, irf:-1.015, lo68:-1.572, hi68:0.788 },
    { h:9, irf:-0.572, lo68:-1.182, hi68:1.187 },
    { h:10, irf:-0.194, lo68:-0.893, hi68:1.471 },
    { h:11, irf:0.093, lo68:-0.704, hi68:1.637 },
    { h:12, irf:0.276, lo68:-0.612, hi68:1.673 },
    { h:13, irf:0.358, lo68:-0.608, hi68:1.664 },
    { h:14, irf:0.351, lo68:-0.701, hi68:1.594 },
    { h:15, irf:0.266, lo68:-0.816, hi68:1.439 },
    { h:16, irf:0.12, lo68:-0.924, hi68:1.207 },
    { h:17, irf:-0.068, lo68:-1.067, hi68:0.997 },
    { h:18, irf:-0.281, lo68:-1.222, hi68:0.729 },
    { h:19, irf:-0.501, lo68:-1.369, hi68:0.537 },
    { h:20, irf:-0.715, lo68:-1.496, hi68:0.368 },
    { h:21, irf:-0.912, lo68:-1.591, hi68:0.223 },
    { h:22, irf:-1.083, lo68:-1.64, hi68:0.104 },
    { h:23, irf:-1.223, lo68:-1.669, hi68:0.019 },
    { h:24, irf:-1.329, lo68:-1.657, hi68:-0.022 }
    ]
  },
  {
    shock:"log_embi",
    label:"Riesgo país (EMBI)",
    data:[
    { h:0, irf:0.0, lo68:0.0, hi68:0.0 },
    { h:1, irf:1.004, lo68:0.312, hi68:1.505 },
    { h:2, irf:1.318, lo68:0.663, hi68:1.778 },
    { h:3, irf:1.361, lo68:0.598, hi68:1.905 },
    { h:4, irf:1.206, lo68:0.357, hi68:1.739 },
    { h:5, irf:1.09, lo68:0.175, hi68:1.672 },
    { h:6, irf:0.984, lo68:-0.009, hi68:1.522 },
    { h:7, irf:0.904, lo68:-0.077, hi68:1.4 },
    { h:8, irf:0.835, lo68:-0.143, hi68:1.316 },
    { h:9, irf:0.788, lo68:-0.153, hi68:1.246 },
    { h:10, irf:0.758, lo68:-0.164, hi68:1.187 },
    { h:11, irf:0.739, lo68:-0.154, hi68:1.153 },
    { h:12, irf:0.725, lo68:-0.134, hi68:1.113 },
    { h:13, irf:0.714, lo68:-0.119, hi68:1.108 },
    { h:14, irf:0.703, lo68:-0.082, hi68:1.08 },
    { h:15, irf:0.688, lo68:-0.074, hi68:1.052 },
    { h:16, irf:0.669, lo68:-0.054, hi68:1.018 },
    { h:17, irf:0.643, lo68:-0.048, hi68:0.986 },
    { h:18, irf:0.611, lo68:-0.062, hi68:0.95 },
    { h:19, irf:0.572, lo68:-0.084, hi68:0.922 },
    { h:20, irf:0.528, lo68:-0.12, hi68:0.851 },
    { h:21, irf:0.479, lo68:-0.138, hi68:0.794 },
    { h:22, irf:0.426, lo68:-0.157, hi68:0.74 },
    { h:23, irf:0.371, lo68:-0.188, hi68:0.69 },
    { h:24, irf:0.316, lo68:-0.229, hi68:0.632 }
    ]
  },
  {
    shock:"var_tc_mensual",
    label:"Tipo de cambio",
    data:[
    { h:0, irf:0.0, lo68:0.0, hi68:0.0 },
    { h:1, irf:0.703, lo68:0.092, hi68:1.221 },
    { h:2, irf:0.756, lo68:-0.155, hi68:1.449 },
    { h:3, irf:-0.247, lo68:-1.003, hi68:0.372 },
    { h:4, irf:-0.812, lo68:-1.369, hi68:-0.197 },
    { h:5, irf:-0.791, lo68:-1.31, hi68:-0.139 },
    { h:6, irf:-0.665, lo68:-1.137, hi68:-0.021 },
    { h:7, irf:-0.635, lo68:-1.048, hi68:-0.014 },
    { h:8, irf:-0.588, lo68:-0.911, hi68:-0.001 },
    { h:9, irf:-0.45, lo68:-0.749, hi68:0.119 },
    { h:10, irf:-0.277, lo68:-0.546, hi68:0.251 },
    { h:11, irf:-0.127, lo68:-0.378, hi68:0.347 },
    { h:12, irf:-0.009, lo68:-0.251, hi68:0.444 },
    { h:13, irf:0.089, lo68:-0.166, hi68:0.497 },
    { h:14, irf:0.162, lo68:-0.114, hi68:0.534 },
    { h:15, irf:0.205, lo68:-0.104, hi68:0.539 },
    { h:16, irf:0.217, lo68:-0.1, hi68:0.514 },
    { h:17, irf:0.204, lo68:-0.112, hi68:0.463 },
    { h:18, irf:0.171, lo68:-0.142, hi68:0.418 },
    { h:19, irf:0.122, lo68:-0.194, hi68:0.357 },
    { h:20, irf:0.064, lo68:-0.247, hi68:0.291 },
    { h:21, irf:-0.0, lo68:-0.306, hi68:0.237 },
    { h:22, irf:-0.064, lo68:-0.358, hi68:0.188 },
    { h:23, irf:-0.125, lo68:-0.404, hi68:0.146 },
    { h:24, irf:-0.18, lo68:-0.421, hi68:0.1 }
    ]
  }
];

// ── FEVD: Descomposición de varianza de expectativas 3y ──
export const fevdData: FEVDPoint[] = [
  { h:0, inflacion:3.0, tasa:10.2, fiscal:10.2, embi:0.0, tc:0.0, propio:76.5 },
  { h:1, inflacion:19.5, tasa:8.8, fiscal:12.6, embi:1.6, tc:0.8, propio:56.8 },
  { h:2, inflacion:29.1, tasa:10.8, fiscal:12.9, embi:2.8, tc:1.1, propio:43.4 },
  { h:3, inflacion:34.4, tasa:13.1, fiscal:11.8, embi:3.5, tc:0.9, propio:36.2 },
  { h:4, inflacion:36.7, tasa:15.2, fiscal:10.9, embi:3.8, tc:1.1, propio:32.2 },
  { h:5, inflacion:38.6, tasa:16.4, fiscal:9.9, embi:4.0, tc:1.3, propio:29.7 },
  { h:6, inflacion:40.3, tasa:16.9, fiscal:9.2, embi:4.1, tc:1.4, propio:28.0 },
  { h:7, inflacion:41.6, tasa:16.9, fiscal:8.8, embi:4.3, tc:1.5, propio:26.9 },
  { h:8, inflacion:42.5, tasa:16.7, fiscal:8.5, embi:4.4, tc:1.6, propio:26.3 },
  { h:9, inflacion:43.1, tasa:16.4, fiscal:8.3, embi:4.6, tc:1.7, propio:25.9 },
  { h:10, inflacion:43.4, tasa:16.2, fiscal:8.2, embi:4.8, tc:1.7, propio:25.8 },
  { h:11, inflacion:43.5, tasa:16.1, fiscal:8.1, embi:5.0, tc:1.7, propio:25.8 },
  { h:12, inflacion:43.4, tasa:16.0, fiscal:8.0, embi:5.2, tc:1.7, propio:25.8 },
  { h:13, inflacion:43.3, tasa:15.9, fiscal:8.0, embi:5.3, tc:1.7, propio:25.8 },
  { h:14, inflacion:43.1, tasa:15.9, fiscal:7.9, embi:5.5, tc:1.7, propio:25.8 },
  { h:15, inflacion:42.9, tasa:15.9, fiscal:7.9, embi:5.7, tc:1.7, propio:25.9 },
  { h:16, inflacion:42.8, tasa:15.8, fiscal:7.9, embi:5.9, tc:1.7, propio:26.0 },
  { h:17, inflacion:42.6, tasa:15.8, fiscal:7.9, embi:6.0, tc:1.7, propio:26.0 },
  { h:18, inflacion:42.4, tasa:15.8, fiscal:7.8, embi:6.2, tc:1.7, propio:26.1 },
  { h:19, inflacion:42.3, tasa:15.8, fiscal:7.8, embi:6.3, tc:1.7, propio:26.2 },
  { h:20, inflacion:42.0, tasa:15.9, fiscal:7.8, embi:6.3, tc:1.7, propio:26.2 },
  { h:21, inflacion:41.8, tasa:16.2, fiscal:7.8, embi:6.4, tc:1.7, propio:26.2 },
  { h:22, inflacion:41.5, tasa:16.5, fiscal:7.8, embi:6.4, tc:1.7, propio:26.1 },
  { h:23, inflacion:41.2, tasa:17.0, fiscal:7.7, embi:6.4, tc:1.7, propio:26.0 },
  { h:24, inflacion:40.8, tasa:17.6, fiscal:7.7, embi:6.4, tc:1.7, propio:25.9 }
];

// ── RESUMEN ACTUAL ──
export const expSummary = {
  fecha: "Feb 2026",
  pi3y: 9.16,
  beta0: -8.5,
  beta1: 39.7,
  pi3y_pico: 59.9,
  fecha_pico: "Nov 2022",
  pi3y_min: -35.0,
  fecha_min: "Nov 2023",
  metodologia: "Nelson-Siegel Diebold-Li (λ=1.0) + VAR(2) Wild Bootstrap",
  nObs: 113,
  periodo: "2016-10 a 2026-02",
};
