// ============================================================
// Pobreza e Indigencia — EPH Continua (semestral)
// Fuente: datos.gob.ar — API oficial del gobierno argentino
//
// Series VERIFICADAS (actualizadas a 2025-2026):
//   Pobreza personas TOTAL nacional: 64.2_POBLACION_NUA_0_0_34_74
//   (devuelve valor decimal: 0.282 = 28.2%)
//
// Nota: la EPH es semestral y se publica en abril y octubre.
// Colores por gobierno: jxc (Macri) / fdt (Alberto) / lla (Milei).
// ============================================================

import { fetchDatosGobAr } from '@/lib/datos-gob-ar';

const POBREZA_PERSONAS = '64.2_POBLACION_NUA_0_0_34_74';

function fmtSemestre(fechaStr: string): string {
  const [year, month] = fechaStr.split('-').map(Number);
  // datos.gob.ar usa el primer día del semestre: ene=primer sem, jul=segundo sem
  const sem = month <= 6 ? 'I' : 'II';
  return `${sem}-${year}`;
}

function etapaFor(year: number, month: number): string {
  if (year < 2020 || (year === 2019 && month > 6)) return 'jxc';
  if (year < 2024 || (year === 2023 && month > 6)) return 'fdt';
  return 'lla';
}

export async function fetchPobreza(): Promise<unknown | null> {
  const json = await fetchDatosGobAr(POBREZA_PERSONAS, 40);
  if (!json || json.data.length === 0) return null;

  const rows = [...json.data].reverse();

  return rows
    .filter(([, pob]) => pob !== null)
    .map(([fecha, pobreza]) => {
      const [year, month] = fecha.split('-').map(Number);
      return {
        period:    fmtSemestre(fecha),
        value:     +((pobreza as number) * 100).toFixed(1), // 0.282 → 28.2
        indigencia: null, // Serie específica no disponible en datos.gob.ar
        etapa:     etapaFor(year, month),
      };
    });
}
