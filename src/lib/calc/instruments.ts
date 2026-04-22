// ============================================================
// Lógica financiera de cada instrumento
// ============================================================

import type {
  InstrumentResult,
  RawSeries,
  SeriesPoint,
} from './types';
import { LECAP_ISSUANCES } from './lecap-table';
import { BONO_SCHEDULES, type BondFlow } from './bonos-schedule';

// ---- Helpers -------------------------------------------------
function ymOf(date: string): string {
  return date.slice(0, 7);
}

function monthDiff(fromISO: string, toISO: string): number {
  const [fy, fm] = fromISO.slice(0, 7).split('-').map(Number);
  const [ty, tm] = toISO.slice(0, 7).split('-').map(Number);
  return (ty - fy) * 12 + (tm - fm);
}

function monthsBetween(fromISO: string, toISO: string): string[] {
  const out: string[] = [];
  const [fy, fm] = fromISO.slice(0, 7).split('-').map(Number);
  const n = monthDiff(fromISO, toISO);
  for (let i = 0; i <= n; i++) {
    const total = (fy * 12 + (fm - 1) + i);
    const y = Math.floor(total / 12);
    const m = (total % 12) + 1;
    out.push(`${y}-${String(m).padStart(2, '0')}-01`);
  }
  return out;
}

/** Devuelve el último punto de la serie con fecha ≤ target. */
function atOrBefore(series: SeriesPoint[], targetISO: string): SeriesPoint | null {
  const target = targetISO.slice(0, 10);
  let best: SeriesPoint | null = null;
  for (const p of series) {
    if (p.date <= target) best = p;
    else break;
  }
  return best;
}

/** Devuelve el punto de la serie correspondiente al mes YYYY-MM (o el más cercano anterior). */
function atMonth(series: SeriesPoint[], ym: string): SeriesPoint | null {
  const exact = series.find((p) => ymOf(p.date) === ym);
  if (exact) return exact;
  return atOrBefore(series, `${ym}-28`);
}

/** Inflación acumulada (decimal) entre dos meses YM. 0.32 = +32%. */
function inflacionAcumulada(ipc: SeriesPoint[], fromYM: string, toYM: string): number {
  const relevant = ipc.filter(
    (p) => ymOf(p.date) > fromYM && ymOf(p.date) <= toYM
  );
  let factor = 1;
  for (const p of relevant) factor *= 1 + p.value / 100;
  return factor - 1;
}

/** Anualiza un retorno total real a lo largo de N meses. */
function anualizar(roiReal: number, meses: number): number {
  if (meses <= 0) return 0;
  return Math.pow(1 + roiReal, 12 / meses) - 1;
}

// ---- Plazo Fijo ---------------------------------------------
/**
 * Reinversión mensual a TNA del BCRA (variable 29 = BADLAR bancos privados).
 * Asumimos capitalización mensual: tasa_mes = TNA/12.
 */
export function calcPlazoFijo(
  monto: number,
  fromISO: string,
  toISO: string,
  tnaSeries: SeriesPoint[],
  ipcSeries: SeriesPoint[]
): InstrumentResult {
  const months = monthsBetween(fromISO, toISO);
  const series: SeriesPoint[] = [];
  let cap = monto;
  series.push({ date: months[0], value: cap });

  let missing = 0;
  for (let i = 1; i < months.length; i++) {
    const ym = ymOf(months[i - 1]);
    const tnaPoint = atMonth(tnaSeries, ym);
    if (!tnaPoint) { missing++; continue; }
    const tna = tnaPoint.value / 100;
    const tem = tna / 12;
    cap = cap * (1 + tem);
    series.push({ date: months[i], value: cap });
  }

  const ok = tnaSeries.length > 0 && missing < months.length - 1;
  const nominalFinal = cap;
  const inflTotal = inflacionAcumulada(ipcSeries, ymOf(fromISO), ymOf(toISO));
  const realFinal = nominalFinal / (1 + inflTotal);
  const roiNominal = nominalFinal / monto - 1;
  const roiReal = realFinal / monto - 1;
  const meses = Math.max(1, monthDiff(fromISO, toISO));

  return {
    id: 'plazoFijo',
    label: 'Plazo Fijo (BADLAR)',
    available: ok,
    nominalFinal,
    realFinal,
    roiNominal,
    roiReal,
    roiAnualReal: anualizar(roiReal, meses),
    series,
    note: ok
      ? 'Capitalización mensual a TNA BADLAR bancos privados (BCRA var. 29). Supone reinversión automática sin retenciones.'
      : 'Datos insuficientes de TNA BCRA para el período elegido.',
  };
}

// ---- Dólar (Blue o MEP) -------------------------------------
export function calcDolar(
  monto: number,
  fromISO: string,
  toISO: string,
  tcSeries: SeriesPoint[],
  ipcSeries: SeriesPoint[],
  kind: 'blue' | 'mep'
): InstrumentResult {
  const months = monthsBetween(fromISO, toISO);
  const tcStart = atMonth(tcSeries, ymOf(fromISO));
  const tcEnd = atMonth(tcSeries, ymOf(toISO));
  const ok = !!tcStart && !!tcEnd && tcStart.value > 0;

  let series: SeriesPoint[] = [];
  let nominalFinal = monto;

  if (ok) {
    const usd = monto / tcStart.value;
    nominalFinal = usd * tcEnd.value;
    series = months.map((m) => {
      const tc = atMonth(tcSeries, ymOf(m));
      return { date: m, value: tc ? usd * tc.value : NaN };
    }).filter((p) => !Number.isNaN(p.value));
  } else {
    series = [{ date: months[0], value: monto }];
  }

  const inflTotal = inflacionAcumulada(ipcSeries, ymOf(fromISO), ymOf(toISO));
  const realFinal = nominalFinal / (1 + inflTotal);
  const roiNominal = nominalFinal / monto - 1;
  const roiReal = realFinal / monto - 1;
  const meses = Math.max(1, monthDiff(fromISO, toISO));

  return {
    id: kind === 'blue' ? 'dolarBlue' : 'dolarMEP',
    label: kind === 'blue' ? 'Dólar Blue' : 'Dólar MEP',
    available: ok,
    nominalFinal,
    realFinal,
    roiNominal,
    roiReal,
    roiAnualReal: anualizar(roiReal, meses),
    series,
    note: ok
      ? `Compra de USD al ${kind === 'blue' ? 'blue' : 'MEP'} (fuente ArgentinaDatos) y venta al cierre del período. Sin costos de intermediación.`
      : 'Cotización histórica no disponible para el período.',
  };
}

// ---- LECAP ---------------------------------------------------
/**
 * Modelo simplificado: a la fecha de inicio se compra la LECAP con vencimiento
 * más próximo (mínimo 30 días posterior), se mantiene hasta vencimiento y se
 * reinvierte en la próxima disponible. Tasas fijas al momento de emisión.
 */
export function calcLECAP(
  monto: number,
  fromISO: string,
  toISO: string,
  ipcSeries: SeriesPoint[]
): InstrumentResult {
  const series: SeriesPoint[] = [];
  let cap = monto;
  let cursor = fromISO;
  series.push({ date: cursor, value: cap });

  let usedEmissions = 0;
  while (cursor < toISO) {
    const next = LECAP_ISSUANCES.find(
      (e) => e.fechaEmision <= cursor && e.fechaVencimiento > cursor
    );
    if (!next) break;
    const endOfLecap = next.fechaVencimiento < toISO ? next.fechaVencimiento : toISO;
    const diasTenencia = Math.max(
      1,
      Math.floor((Date.parse(endOfLecap) - Date.parse(cursor)) / 86_400_000)
    );
    // TEM × (meses fraccionales); uso (1+TEM)^(dias/30) para interpolar
    const factor = Math.pow(1 + next.tem / 100, diasTenencia / 30);
    cap = cap * factor;
    series.push({ date: endOfLecap, value: cap });
    cursor = endOfLecap;
    usedEmissions++;
    // Si ya pasó la última emisión y aún queda período, frenamos
    if (cursor >= toISO) break;
  }

  const ok = usedEmissions > 0;
  const inflTotal = inflacionAcumulada(ipcSeries, ymOf(fromISO), ymOf(toISO));
  const nominalFinal = cap;
  const realFinal = nominalFinal / (1 + inflTotal);
  const meses = Math.max(1, monthDiff(fromISO, toISO));

  return {
    id: 'lecap',
    label: 'LECAP (Tesoro)',
    available: ok,
    nominalFinal,
    realFinal,
    roiNominal: nominalFinal / monto - 1,
    roiReal: realFinal / monto - 1,
    roiAnualReal: anualizar(realFinal / monto - 1, meses),
    series,
    note: ok
      ? 'Reinversión automática en la LECAP más próxima al vencimiento. TEM fija al momento de emisión (fuente Tesoro).'
      : 'No hay LECAPs registradas que cubran el período seleccionado.',
  };
}

// ---- Bonos AL30 / GD30 ---------------------------------------
/**
 * Cálculo aproximado: se invierte a la paridad de la fecha inicial (mensual),
 * se reciben cupones + amortizaciones según el cronograma fijo del prospecto,
 * y al final del período se valúa el nominal remanente a la paridad del mes final.
 * Los flujos en USD se convierten a ARS al TC MEP de cada mes.
 * NOTA: aproximación — no refleja precios intradía ni costos.
 */
export function calcBono(
  monto: number,
  fromISO: string,
  toISO: string,
  ticker: 'AL30' | 'GD30',
  tcMEP: SeriesPoint[],
  ipcSeries: SeriesPoint[]
): InstrumentResult {
  const cronograma = BONO_SCHEDULES[ticker] as BondFlow[] | undefined;
  const paridad = BONO_SCHEDULES[`${ticker}_PARITY`] as SeriesPoint[] | undefined;
  const tcStart = atMonth(tcMEP, ymOf(fromISO));
  const parStart = atMonth(paridad ?? [], ymOf(fromISO));
  const parEnd = atMonth(paridad ?? [], ymOf(toISO));
  const tcEnd = atMonth(tcMEP, ymOf(toISO));

  const ok =
    !!cronograma && !!tcStart && !!tcEnd && !!parStart && !!parEnd && tcStart.value > 0;

  const series: SeriesPoint[] = [{ date: fromISO, value: monto }];
  let nominalFinal = monto;

  if (ok) {
    // Nominales comprados (VN en USD por cada 100 paridad)
    const usdInicial = monto / tcStart.value;
    const vn = (usdInicial / parStart.value) * 100; // VN en USD
    let vnRemanente = vn;
    let cashUSD = 0;
    let cashARS = 0;

    for (const flujo of cronograma) {
      if (flujo.fecha <= fromISO || flujo.fecha > toISO) continue;
      const payoutUSD = (flujo.interes + flujo.amortizacion) * (vn / 100);
      cashUSD += payoutUSD;
      const tc = atMonth(tcMEP, ymOf(flujo.fecha));
      if (tc) cashARS += payoutUSD * tc.value;
      vnRemanente *= 1 - flujo.amortizacion / 100;
      series.push({
        date: flujo.fecha,
        value: cashARS + (vnRemanente / 100) * parStart.value * tcStart.value,
      });
    }

    // Valuación final de lo que queda
    const valorFinalUSD = (vnRemanente / 100) * parEnd.value;
    const valorFinalARS = valorFinalUSD * tcEnd.value;
    nominalFinal = cashARS + valorFinalARS;
    series.push({ date: toISO, value: nominalFinal });
  }

  const inflTotal = inflacionAcumulada(ipcSeries, ymOf(fromISO), ymOf(toISO));
  const realFinal = nominalFinal / (1 + inflTotal);
  const meses = Math.max(1, monthDiff(fromISO, toISO));

  return {
    id: ticker === 'AL30' ? 'al30' : 'gd30',
    label: ticker === 'AL30' ? `Bono ${ticker} (ley Arg)` : `Bono ${ticker} (ley NY)`,
    available: ok,
    nominalFinal,
    realFinal,
    roiNominal: nominalFinal / monto - 1,
    roiReal: realFinal / monto - 1,
    roiAnualReal: anualizar(realFinal / monto - 1, meses),
    series,
    note: ok
      ? `Flujos del prospecto ${ticker} + paridad mensual de referencia (fuente: Bolsar). Aproximación — no refleja precios intradía ni costos.`
      : `Precios históricos de ${ticker} no disponibles para el período.`,
  };
}
