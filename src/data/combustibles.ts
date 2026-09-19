/** Precios de surtidor YPF CABA (ARS/litro). Fuente: Surtidores.com.ar. */

export const YPF_CABA_FUENTE = 'Surtidores.com.ar · YPF CABA';
export const YPF_CABA_URL = 'https://surtidores.com.ar/precios/';

export type YpfMes = {
  mes: string;
  super: number;
  premium: number;
  gasoil: number;
  euro: number;
};

/** Mensual. 2026-09 = último cuadro publicado en la tabla. */
export const ypfCaba: YpfMes[] = [
  { mes: 'Ene 24', super: 699, premium: 862, gasoil: 736, euro: 938 },
  { mes: 'Feb 24', super: 744, premium: 918, gasoil: 784, euro: 998 },
  { mes: 'Mar 24', super: 800, premium: 987, gasoil: 843, euro: 1073 },
  { mes: 'Abr 24', super: 837, premium: 1033, gasoil: 883, euro: 1123 },
  { mes: 'May 24', super: 870, premium: 1074, gasoil: 918, euro: 1167 },
  { mes: 'Jun 24', super: 905, premium: 1117, gasoil: 941, euro: 1196 },
  { mes: 'Jul 24', super: 941, premium: 1162, gasoil: 979, euro: 1244 },
  { mes: 'Ago 24', super: 992, premium: 1226, gasoil: 1032, euro: 1312 },
  { mes: 'Sep 24', super: 1059, premium: 1309, gasoil: 1084, euro: 1334 },
  { mes: 'Oct 24', super: 1048, premium: 1296, gasoil: 1062, euro: 1307 },
  { mes: 'Nov 24', super: 1077, premium: 1332, gasoil: 1092, euro: 1343 },
  { mes: 'Dic 24', super: 1108, premium: 1370, gasoil: 1123, euro: 1368 },
  { mes: 'Ene 25', super: 1128, premium: 1394, gasoil: 1143, euro: 1392 },
  { mes: 'Feb 25', super: 1151, premium: 1422, gasoil: 1170, euro: 1420 },
  { mes: 'Mar 25', super: 1173, premium: 1449, gasoil: 1188, euro: 1448 },
  { mes: 'Abr 25', super: 1194, premium: 1474, gasoil: 1209, euro: 1472 },
  { mes: 'May 25', super: 1173, premium: 1389, gasoil: 1178, euro: 1360 },
  { mes: 'Jun 25', super: 1186, premium: 1405, gasoil: 1191, euro: 1375 },
  { mes: 'Jul 25', super: 1246, premium: 1476, gasoil: 1251, euro: 1444 },
  { mes: 'Ago 25', super: 1269, premium: 1489, gasoil: 1274, euro: 1461 },
  { mes: 'Sep 25', super: 1349, premium: 1618, gasoil: 1377, euro: 1584 },
  { mes: 'Oct 25', super: 1391, premium: 1651, gasoil: 1408, euro: 1618 },
  { mes: 'Nov 25', super: 1497, premium: 1738, gasoil: 1509, euro: 1698 },
  { mes: 'Dic 25', super: 1611, premium: 1835, gasoil: 1603, euro: 1802 },
  { mes: 'Ene 26', super: 1566, premium: 1780, gasoil: 1601, euro: 1809 },
  { mes: 'Feb 26', super: 1609, premium: 1845, gasoil: 1658, euro: 1861 },
  { mes: 'Mar 26', super: 1999, premium: 2207, gasoil: 2065, euro: 2271 },
  { mes: 'Abr 26', super: 1999, premium: 2211, gasoil: 2060, euro: 2266 },
  { mes: 'May 26', super: 2037, premium: 2242, gasoil: 2106, euro: 2316 },
  { mes: 'Jun 26', super: 2030, premium: 2246, gasoil: 2115, euro: 2323 },
  { mes: 'Jul 26', super: 2047, premium: 2244, gasoil: 2106, euro: 2318 },
  { mes: 'Ago 26', super: 2045, premium: 2258, gasoil: 2116, euro: 2342 },
  { mes: 'Sep 26', super: 2059, premium: 2259, gasoil: 2125, euro: 2345 },
];
