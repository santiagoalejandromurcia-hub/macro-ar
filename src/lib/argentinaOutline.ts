// ============================================================
// Argentina — outline simplificado + ciudades clave
// ============================================================
// Coordenadas en [longitud, latitud] (lng, lat).
// Es un contorno estilizado de ~40 puntos, recorrido horario
// desde el extremo noroeste. Suficiente para un hero 3D.
// Si algún día querés un mapa geográficamente exacto,
// reemplazá esto por un GeoJSON oficial (IGN / Natural Earth).
// ============================================================

export type LngLat = readonly [number, number];

export const ARGENTINA_OUTLINE: LngLat[] = [
  // Norte — frontera con Bolivia (de NW a NE)
  [-66.5, -22.0],
  [-64.5, -22.0],
  [-62.5, -22.0],
  [-60.0, -24.0],
  // Chaco / Formosa
  [-58.2, -24.5],
  [-57.6, -25.4],
  // Misiones — "el dedito"
  [-55.2, -25.5],
  [-53.7, -26.3],
  [-53.6, -27.1],
  [-54.2, -27.5],
  // Corrientes — frontera con Brasil/Uruguay vía ríos
  [-55.6, -30.2],
  [-57.2, -31.0],
  [-58.0, -32.5],
  // Río de la Plata
  [-58.3, -34.4],
  [-57.0, -35.0],
  // Costa atlántica — BA, Mar del Plata, BsAs Sur
  [-57.5, -37.2],
  [-57.0, -38.8],
  [-62.4, -40.1],
  // Patagonia este
  [-63.8, -41.8],
  [-65.1, -42.7],
  [-65.4, -44.9],
  [-66.0, -45.9],
  [-67.6, -46.0],
  [-68.2, -47.9],
  [-68.0, -49.4],
  [-68.5, -50.9],
  [-69.0, -52.0],
  // Tierra del Fuego
  [-68.5, -53.1],
  [-67.7, -54.1],
  [-67.3, -54.8],
  [-68.6, -54.9],
  [-70.0, -54.5],
  [-71.0, -53.8],
  // Vuelta hacia el norte por los Andes (oeste)
  [-72.3, -52.0],
  [-72.6, -49.8],
  [-72.2, -47.5],
  [-71.9, -45.0],
  [-71.4, -42.3],
  [-71.0, -39.5],
  [-70.8, -37.0],
  [-70.2, -34.5],
  [-69.9, -32.0],
  [-68.6, -29.5],
  [-68.2, -27.0],
  [-67.3, -24.8],
  // Cierre
  [-66.5, -22.0],
];

// ============================================================
// Ciudades económicas clave — se renderizan como puntos glowing
// con el valor del indicador asociado.
// ============================================================

export type City = {
  id: string;
  name: string;
  coord: LngLat;
  indicator: 'dolar' | 'inflacion' | 'reservas' | 'riesgo';
};

export const KEY_CITIES: City[] = [
  { id: 'caba',    name: 'Buenos Aires', coord: [-58.38, -34.61], indicator: 'dolar' },
  { id: 'rosario', name: 'Rosario',      coord: [-60.64, -32.95], indicator: 'inflacion' },
  { id: 'cordoba', name: 'Córdoba',      coord: [-64.18, -31.42], indicator: 'reservas' },
  { id: 'mendoza', name: 'Mendoza',      coord: [-68.85, -32.89], indicator: 'riesgo' },
];

// ============================================================
// Bounds — precalculados para centrar/escalar rápido
// ============================================================
export const ARG_BOUNDS = {
  lngMin: -72.6,
  lngMax: -53.6,
  latMin: -54.9,
  latMax: -22.0,
  lngMid: (-72.6 + -53.6) / 2,   // -63.1
  latMid: (-54.9 + -22.0) / 2,   // -38.45
  lngSpan: -53.6 - -72.6,        // 19.0
  latSpan: -22.0 - -54.9,        // 32.9
};
