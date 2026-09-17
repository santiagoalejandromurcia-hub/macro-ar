export interface LecapSchedule {
  ticker: string;
  fechaEmision: string; // YYYY-MM-DD
  fechaVencimiento: string;
  temPct: number; // TEM de emisión
  dayCountDivisor?: number; // default 30
  source: string;
  verified: true;
}

export function daysBetween(aISO: string, bISO: string): number {
  const a = Date.parse(aISO.slice(0, 10));
  const b = Date.parse(bISO.slice(0, 10));
  return Math.floor((b - a) / 86_400_000);
}

/** VT por 100 VN a la fecha asOf */
export function valorTecnico(schedule: LecapSchedule, asOfISO: string): number {
  const div = schedule.dayCountDivisor ?? 30;
  const d = Math.max(0, daysBetween(schedule.fechaEmision, asOfISO));
  return 100 * Math.pow(1 + schedule.temPct / 100, d / div);
}

export function maturityPayout(schedule: LecapSchedule): number {
  return valorTecnico(schedule, schedule.fechaVencimiento);
}

/**
 * TEA % desde precio dirty/clean de mercado (mismo convention ACT/30 del repo).
 * null si datos incompletos o inválidos.
 */
export function lecapTeaFromPrice(
  schedule: LecapSchedule,
  price: number,
  settleISO: string,
): number | null {
  if (!(price > 0) || !schedule.verified) return null;
  const d = daysBetween(settleISO, schedule.fechaVencimiento);
  if (d <= 0) return null;
  const vtT = maturityPayout(schedule);
  if (!(vtT > 0)) return null;
  const temMkt = Math.pow(vtT / price, 30 / d) - 1;
  const tea = (Math.pow(1 + temMkt, 12) - 1) * 100;
  if (!Number.isFinite(tea)) return null;
  return Math.round(tea * 100) / 100;
}

export function lecapTemFromPrice(
  schedule: LecapSchedule,
  price: number,
  settleISO: string,
): number | null {
  if (!(price > 0) || !schedule.verified) return null;
  const d = daysBetween(settleISO, schedule.fechaVencimiento);
  if (d <= 0) return null;
  const vtT = maturityPayout(schedule);
  const temMkt = (Math.pow(vtT / price, 30 / d) - 1) * 100;
  if (!Number.isFinite(temMkt)) return null;
  return Math.round(temMkt * 10000) / 10000;
}
