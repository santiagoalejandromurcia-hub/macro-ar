// ============================================================
// Salario — Índice de Salarios (INDEC)
// Fuente: datos.gob.ar — API oficial del gobierno argentino
//
// Series VERIFICADAS (actualizadas a ene-2026):
//   Privado registrado:      149.1_SOR_PRIADO_OCTU_0_25
//   Público registrado:      149.1_SOR_PUBICO_OCTU_0_14
//   Privado no registrado:   149.1_SOR_PRIADO_OCTU_0_28
//
// El gráfico usa base Nov-23 = 100.
// Rebaseamos el índice nominal de cada serie contra su valor en Nov-2023.
// ============================================================

import { fetchDatosGobAr, fmtMes } from '@/lib/datos-gob-ar';

const SAL_PRIV_REG   = '149.1_SOR_PRIADO_OCTU_0_25';
const SAL_PUB        = '149.1_SOR_PUBICO_OCTU_0_14';
const SAL_PRIV_NOREG = '149.1_SOR_PRIADO_OCTU_0_28';

export async function fetchSalario(): Promise<unknown | null> {
  const json = await fetchDatosGobAr(
    `${SAL_PRIV_REG},${SAL_PUB},${SAL_PRIV_NOREG}`,
    48,
  );
  if (!json || json.data.length === 0) return null;

  // datos.gob.ar devuelve sort=desc → invertimos para orden cronológico
  const rows = [...json.data].reverse() as unknown as [string, number | null, number | null, number | null][];

  // Encontrar la base Nov-23 (2023-11-01)
  const novIdx = rows.findIndex(([fecha]) => fecha.startsWith('2023-11'));
  if (novIdx < 0) {
    // Si no hay Nov-23 en la serie, usar el primer dato disponible como base
    const basePrivReg  = (rows[0][1]  as number) || 1;
    const basePub      = (rows[0][2]  as number) || 1;
    const basePrivNReg = (rows[0][3]  as number) || 1;

    return rows.map(([fecha, privReg, pub, privNReg]) => ({
      date:           fmtMes(fecha),
      privadoRegSipa: privReg   ? +((privReg   as number / basePrivReg)  * 100).toFixed(1) : null,
      publico:        pub       ? +((pub       as number / basePub)       * 100).toFixed(1) : null,
      privadoNoReg:   privNReg  ? +((privNReg  as number / basePrivNReg)  * 100).toFixed(1) : null,
    }));
  }

  const basePrivReg  = (rows[novIdx][1]  as number) || 1;
  const basePub      = (rows[novIdx][2]  as number) || 1;
  const basePrivNReg = (rows[novIdx][3]  as number) || 1;

  return rows.slice(-36).map(([fecha, privReg, pub, privNReg]) => ({
    date:           fmtMes(fecha),
    privadoRegSipa: privReg   ? +((privReg   as number / basePrivReg)  * 100).toFixed(1) : null,
    publico:        pub       ? +((pub       as number / basePub)       * 100).toFixed(1) : null,
    privadoNoReg:   privNReg  ? +((privNReg  as number / basePrivNReg)  * 100).toFixed(1) : null,
  }));
}
