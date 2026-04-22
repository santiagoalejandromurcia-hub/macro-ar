// ============================================================
// Orquestador: toma inputs + series y corre todos los instrumentos
// ============================================================

import { fetchAllSeries } from './fetchers';
import {
  calcPlazoFijo,
  calcDolar,
  calcLECAP,
  calcBono,
} from './instruments';
import type { CalcInput, CalcOutput, InstrumentResult } from './types';

function inflacionAcumuladaPct(
  ipc: { date: string; value: number }[],
  fromYM: string,
  toYM: string
): number {
  const relevant = ipc.filter(
    (p) => p.date.slice(0, 7) > fromYM && p.date.slice(0, 7) <= toYM
  );
  let factor = 1;
  for (const p of relevant) factor *= 1 + p.value / 100;
  return factor - 1;
}

export async function runCalc(input: CalcInput): Promise<CalcOutput> {
  const raw = await fetchAllSeries();
  const { ipcMensual, tcBlue, tcMEP, tnaPF, warnings } = raw;

  const results: InstrumentResult[] = [];

  for (const id of input.instruments) {
    switch (id) {
      case 'plazoFijo':
        results.push(calcPlazoFijo(input.monto, input.from, input.to, tnaPF, ipcMensual));
        break;
      case 'dolarBlue':
        results.push(calcDolar(input.monto, input.from, input.to, tcBlue, ipcMensual, 'blue'));
        break;
      case 'dolarMEP':
        results.push(calcDolar(input.monto, input.from, input.to, tcMEP, ipcMensual, 'mep'));
        break;
      case 'lecap':
        results.push(calcLECAP(input.monto, input.from, input.to, ipcMensual));
        break;
      case 'al30':
        results.push(calcBono(input.monto, input.from, input.to, 'AL30', tcMEP, ipcMensual));
        break;
      case 'gd30':
        results.push(calcBono(input.monto, input.from, input.to, 'GD30', tcMEP, ipcMensual));
        break;
    }
  }

  // Ordenar por ROI real desc (mejor arriba)
  results.sort((a, b) => b.roiReal - a.roiReal);

  return {
    input,
    results,
    inflacionAcumulada: inflacionAcumuladaPct(
      ipcMensual,
      input.from.slice(0, 7),
      input.to.slice(0, 7)
    ),
    updatedAt: new Date().toISOString(),
    warnings,
  };
}
