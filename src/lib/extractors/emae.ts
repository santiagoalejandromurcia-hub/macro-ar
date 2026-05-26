// ============================================================
// EMAE — Estimador Mensual de Actividad Económica
// Fuente: datos.gob.ar — API oficial del gobierno argentino
//
// Series VERIFICADAS (actualizadas a 2026):
//   EMAE original     (base 2004): 143.3_NO_PR_2004_A_21
//   EMAE desest.      (base 2004): 143.3_NO_PR_2004_A_31
//   EMAE tendencia    (base 2004): 143.3_ICE_SER_VM_2004_A_31
// ============================================================

import { fetchDatosGobAr, fmtMes } from '@/lib/datos-gob-ar';

const EMAE_ORIGINAL  = '143.3_NO_PR_2004_A_21';
const EMAE_DESEST    = '143.3_NO_PR_2004_A_31';

export async function fetchEmae(): Promise<unknown | null> {
  const json = await fetchDatosGobAr(`${EMAE_ORIGINAL},${EMAE_DESEST}`, 48);
  if (!json || json.data.length === 0) return null;

  // datos.gob.ar devuelve sort=desc → invertimos para orden cronológico
  const rows = [...json.data].reverse();

  return rows
    .filter(([, original]) => original !== null)
    .map(([fecha, original, desest]) => ({
      date:  fmtMes(fecha),
      value: +(original as number).toFixed(2),
      trend: desest !== null ? +(desest as number).toFixed(2) : null,
    }));
}

export async function fetchEmaeLargoPlazo(): Promise<unknown | null> {
  // Serie más larga: últimos 120 meses (~10 años)
  const json = await fetchDatosGobAr(`${EMAE_ORIGINAL},${EMAE_DESEST}`, 120);
  if (!json || json.data.length === 0) return null;

  const rows = [...json.data].reverse();

  return rows
    .filter(([, v]) => v !== null)
    .map(([fecha, original]) => ({
      date:  fmtMes(fecha),
      value: +(original as number).toFixed(2),
    }));
}
