/** Días entre asOf (YYYY-MM-DD) y ahora (cliente o server). */
export function daysSince(asOfIso: string, now = new Date()): number {
  const asOf = new Date(asOfIso + 'T12:00:00');
  if (Number.isNaN(asOf.getTime())) return Number.POSITIVE_INFINITY;
  return Math.floor((now.getTime() - asOf.getTime()) / 86_400_000);
}

export function isStale(asOfIso: string, maxDays = 30, now = new Date()): boolean {
  return daysSince(asOfIso, now) > maxDays;
}

export function freshnessLabel(asOfIso: string, maxDays = 30, now = new Date()): {
  kind: 'fresh' | 'stale';
  days: number;
  text: string;
} {
  const days = daysSince(asOfIso, now);
  if (days > maxDays) {
    return {
      kind: 'stale',
      days,
      text: `SNAPSHOT · ${asOfIso} · hace ${days} días — no es dato en vivo`,
    };
  }
  return {
    kind: 'fresh',
    days,
    text: `Actualizado al ${asOfIso}`,
  };
}
