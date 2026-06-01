// ============================================================
// Comercio Exterior — Exportaciones e Importaciones
// Fuente: datos.gob.ar — API oficial del gobierno argentino
//
// Series VERIFICADAS (actualizadas a feb-2026):
//   Exportaciones total FOB (mensual, USD M): 75.3_IETG_0_M_31
//   Importaciones total CIF (mensual, USD M): 76.3_ITG_0_M_17
// ============================================================

import { fetchDatosGobAr, fmtMes } from '@/lib/datos-gob-ar';

const EXPORTS_ID = '75.3_IETG_0_M_31';
const IMPORTS_ID = '76.3_ITG_0_M_17';

export async function fetchTrade(): Promise<unknown | null> {
  const json = await fetchDatosGobAr(`${EXPORTS_ID},${IMPORTS_ID}`, 36);
  if (!json || json.data.length === 0) return null;

  const rows = [...json.data].reverse();

  return rows
    .filter(([, exp]) => exp !== null)
    .map(([fecha, exp, imp]) => {
      const exports_ = Math.round(exp as number);
      const imports_ = imp !== null ? Math.round(imp as number) : 0;
      return {
        month:   fmtMes(fecha),
        exports: exports_,
        imports: imports_,
        balance: exports_ - imports_,
      };
    });
}
