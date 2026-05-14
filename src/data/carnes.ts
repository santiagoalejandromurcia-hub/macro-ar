// ============================================================
// MacroLibre — Mercado de Carnes Argentina
// ============================================================
// Datos oficiales SAGyP (faena bovina) e IPCVA / INDEC (exportaciones).
// Snapshot: abril 2026 (faena) · marzo 2026 (exportaciones).
//
// Para actualizar: bajar el último informe SAGyP/IPCVA y reemplazar
// los arrays. Mantener el formato (orden ascendente por fecha).
// ============================================================

export const ACTUALIZADO_AL = '2026-05-12';
export const FAENA_FUENTE = 'SAGyP · Dirección Nacional de Control Comercial Agropecuario';
export const EXPORT_FUENTE = 'IPCVA · INDEC (datos provisorios)';

// ─── Faena bovina mensual 2026 (cabezas) ─────────────────────
export interface FaenaMes {
  mes: string;
  cabezas: number;
}

export const faenaMensual2026: FaenaMes[] = [
  { mes: 'Ene-26', cabezas: 1019737 },
  { mes: 'Feb-26', cabezas: 925235 },
  { mes: 'Mar-26', cabezas: 1029755 },
  { mes: 'Abr-26', cabezas: 960871 },
];

// ─── Faena por provincia (acumulado ene-abr 2026) ────────────
export interface FaenaProvincia {
  provincia: string;
  cabezas: number;
  participacion: number; // % sobre total
}

export const faenaPorProvincia: FaenaProvincia[] = [
  { provincia: 'Buenos Aires',        cabezas: 2039491, participacion: 51.8 },
  { provincia: 'Santa Fe',            cabezas: 706491,  participacion: 17.9 },
  { provincia: 'Córdoba',             cabezas: 302919,  participacion: 7.7  },
  { provincia: 'Entre Ríos',          cabezas: 140213,  participacion: 3.6  },
  { provincia: 'Tucumán',             cabezas: 98820,   participacion: 2.5  },
  { provincia: 'La Pampa',            cabezas: 94021,   participacion: 2.4  },
  { provincia: 'Salta',               cabezas: 60000,   participacion: 1.5  },
  { provincia: 'Mendoza',             cabezas: 55000,   participacion: 1.4  },
  { provincia: 'Otras',               cabezas: 438644,  participacion: 11.2 },
];

// ─── Top 10 frigoríficos (acumulado ene-abr 2026) ────────────
export interface Frigorifico {
  razonSocial: string;
  provincia: string;
  cabezas: number;
}

export const topFrigorificos: Frigorifico[] = [
  { razonSocial: 'Frigorífico Rioplatense',       provincia: 'Buenos Aires', cabezas: 134126 },
  { razonSocial: 'Swift Argentina',               provincia: 'Santa Fe',     cabezas: 123706 },
  { razonSocial: 'Coto CICSA',                    provincia: 'Buenos Aires', cabezas: 101926 },
  { razonSocial: 'Arre Beef',                     provincia: 'Buenos Aires', cabezas: 94208  },
  { razonSocial: 'Quickfood (Marfrig)',           provincia: 'Santa Fe',     cabezas: 69788  },
  { razonSocial: 'Compañía Bernal',               provincia: 'Buenos Aires', cabezas: 69079  },
  { razonSocial: 'Frigorífico Gorina',            provincia: 'Buenos Aires', cabezas: 65000  },
  { razonSocial: 'Patagonia (Importadora SA)',    provincia: 'Buenos Aires', cabezas: 60000  },
  { razonSocial: 'Mattievich',                    provincia: 'Santa Fe',     cabezas: 52000  },
  { razonSocial: 'Black Bamboo',                  provincia: 'Buenos Aires', cabezas: 48000  },
];

// ─── Faena por categoría animal (acumulado ene-abr 2026) ─────
export interface FaenaCategoria {
  categoria: string;
  cabezas: number;
  participacion: number;
}

export const faenaPorCategoria: FaenaCategoria[] = [
  { categoria: 'Novillito',  cabezas: 1299139, participacion: 33.0 },
  { categoria: 'Vaquillona', cabezas: 992404,  participacion: 25.2 },
  { categoria: 'Vaca',       cabezas: 879850,  participacion: 22.4 },
  { categoria: 'Novillo',    cabezas: 638310,  participacion: 16.2 },
  { categoria: 'Toro',       cabezas: 59709,   participacion: 1.5  },
  { categoria: 'MEJ (Macho Entero Joven)',        cabezas: 66186,   participacion: 1.7  },
];

// ─── Exportaciones mensuales (ene-25 a mar-26) ───────────────
export interface ExportMes {
  mes: string;
  toneladas: number;
  valorUsdMiles: number;
  precioPromedio: number; // USD/tn
}

export const exportacionesMensuales: ExportMes[] = [
  { mes: 'Ene-25', toneladas: 38421, valorUsdMiles: 217495, precioPromedio: 5661 },
  { mes: 'Feb-25', toneladas: 40637, valorUsdMiles: 232481, precioPromedio: 5721 },
  { mes: 'Mar-25', toneladas: 35248, valorUsdMiles: 196785, precioPromedio: 5583 },
  { mes: 'Abr-25', toneladas: 42718, valorUsdMiles: 252431, precioPromedio: 5909 },
  { mes: 'May-25', toneladas: 44965, valorUsdMiles: 281378, precioPromedio: 6258 },
  { mes: 'Jun-25', toneladas: 50210, valorUsdMiles: 304712, precioPromedio: 6069 },
  { mes: 'Jul-25', toneladas: 52433, valorUsdMiles: 333146, precioPromedio: 6354 },
  { mes: 'Ago-25', toneladas: 58320, valorUsdMiles: 375715, precioPromedio: 6442 },
  { mes: 'Sep-25', toneladas: 59788, valorUsdMiles: 394672, precioPromedio: 6601 },
  { mes: 'Oct-25', toneladas: 54748, valorUsdMiles: 369545, precioPromedio: 6750 },
  { mes: 'Nov-25', toneladas: 52388, valorUsdMiles: 348858, precioPromedio: 6648 },
  { mes: 'Dic-25', toneladas: 45985, valorUsdMiles: 322239, precioPromedio: 7007 },
  { mes: 'Ene-26', toneladas: 43602, valorUsdMiles: 320973, precioPromedio: 7362 },
  { mes: 'Feb-26', toneladas: 39952, valorUsdMiles: 297693, precioPromedio: 7451 },
  { mes: 'Mar-26', toneladas: 51203, valorUsdMiles: 405690, precioPromedio: 7923 },
];

// ─── Destinos de exportación (acumulado 3M-2026) ─────────────
export interface DestinoExport {
  pais: string;
  toneladas: number;
  valorUsd: number;
  precioFob: number;          // USD/tn
  participacionVolumen: number; // %
  varVsAnioAnterior: number;  // % volumen 26 vs 25
}

export const destinosExport: DestinoExport[] = [
  { pais: 'China',         toneladas: 101027, valorUsd: 434961357, precioFob: 4305,  participacionVolumen: 61.6, varVsAnioAnterior: 9.9   },
  { pais: 'Estados Unidos', toneladas: 21018,  valorUsd: 172632297, precioFob: 8214,  participacionVolumen: 12.8, varVsAnioAnterior: 107.0 },
  { pais: 'Israel',        toneladas: 17033,  valorUsd: 175585495, precioFob: 10309, participacionVolumen: 10.4, varVsAnioAnterior: 26.5  },
  { pais: 'Alemania',      toneladas: 6022,   valorUsd: 88326695,  precioFob: 14668, participacionVolumen: 3.7,  varVsAnioAnterior: 19.4  },
  { pais: 'Países Bajos',  toneladas: 4853,   valorUsd: 65783470,  precioFob: 13556, participacionVolumen: 3.0,  varVsAnioAnterior: 32.3  },
  { pais: 'Chile',         toneladas: 3706,   valorUsd: 34964331,  precioFob: 9435,  participacionVolumen: 2.3,  varVsAnioAnterior: -22.1 },
  { pais: 'Brasil',        toneladas: 1263,   valorUsd: 15093140,  precioFob: 11954, participacionVolumen: 0.8,  varVsAnioAnterior: -1.5  },
  { pais: 'Italia',        toneladas: 996,    valorUsd: 14156401,  precioFob: 14217, participacionVolumen: 0.6,  varVsAnioAnterior: -36.5 },
  { pais: 'Canadá',        toneladas: 755,    valorUsd: 3789224,   precioFob: 5022,  participacionVolumen: 0.5,  varVsAnioAnterior: -47.4 },
  { pais: 'España',        toneladas: 310,    valorUsd: 5381766,   precioFob: 17336, participacionVolumen: 0.2,  varVsAnioAnterior: -27.3 },
  { pais: 'Otros',         toneladas: 7076,   valorUsd: 55195909,  precioFob: 7800,  participacionVolumen: 4.3,  varVsAnioAnterior: 34.1  },
];

// ─── KPIs principales para el hero ────────────────────────────
export const kpisCarnes = {
  faenaUltimoMes: {
    valor: 960871,
    mes: 'Abril 2026',
    variacionMoM: -6.7, // vs marzo
    variacionYoY: null as number | null, // sin dato comparable
  },
  exportValorUltimoMes: {
    valor: 405690, // USD miles
    mes: 'Marzo 2026',
    variacionMoM: 36.3,
    variacionYoY: 106.2,
  },
  precioFobPromedio: {
    valor: 7923, // USD/tn
    mes: 'Marzo 2026',
    variacionMoM: 6.3,
    variacionYoY: 41.9,
  },
  topDestino: {
    pais: 'China',
    participacion: 61.6,
    valor: 4305, // USD/tn precio FOB
  },
};
