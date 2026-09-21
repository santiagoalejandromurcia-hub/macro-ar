import { ECONOMIC_CALENDAR, type CalEvent } from '@/data/economicCalendar';

const TZ = 'America/Argentina/Buenos_Aires';

export type CalStatus = 'pending' | 'today' | 'released';

export interface CalEventView extends CalEvent {
  status: CalStatus;
  startsAt: Date;
  countdownLabel: string;
}

function artParts(d = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(d).map(p => [p.type, p.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hm: `${parts.hour}:${parts.minute}`,
  };
}

/** Approximate Date for YYYY-MM-DD + HH:mm in ART (UTC-3, sin DST). */
export function eventStartUtc(ev: CalEvent): Date {
  const [y, m, d] = ev.date.split('-').map(Number);
  const [hh, mm] = ev.timeArt.split(':').map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh + 3, mm, 0));
}

export function statusFor(ev: CalEvent, now = new Date()): CalStatus {
  const start = eventStartUtc(ev);
  const { date: today } = artParts(now);
  if (now.getTime() >= start.getTime()) return 'released';
  if (ev.date === today) return 'today';
  return 'pending';
}

export function countdownLabel(ev: CalEvent, now = new Date()): string {
  const start = eventStartUtc(ev);
  const ms = start.getTime() - now.getTime();
  if (ms <= 0) return 'PUBLICADO';
  const min = Math.round(ms / 60000);
  if (min < 60) return `en ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 48) return `en ${h} h`;
  const days = Math.floor(h / 24);
  return `en ${days} d`;
}

export function upcomingEvents(opts?: {
  limit?: number;
  minImportance?: 1 | 2 | 3;
  includeReleasedToday?: boolean;
  now?: Date;
}): CalEventView[] {
  const limit = opts?.limit ?? 8;
  const minImp = opts?.minImportance ?? 2;
  const now = opts?.now ?? new Date();
  const { date: today } = artParts(now);

  return ECONOMIC_CALENDAR
    .filter((e) => e.importance >= minImp)
    .filter((e) => {
      const st = statusFor(e, now);
      if (st === 'released') {
        return !!opts?.includeReleasedToday && e.date === today;
      }
      return e.date >= today;
    })
    .sort((a, b) => eventStartUtc(a).getTime() - eventStartUtc(b).getTime())
    .slice(0, limit)
    .map((e) => ({
      ...e,
      status: statusFor(e, now),
      startsAt: eventStartUtc(e),
      countdownLabel: countdownLabel(e, now),
    }));
}

export function nextHighImpact(now = new Date()): CalEventView | null {
  return upcomingEvents({ limit: 1, minImportance: 3, now })[0] ?? null;
}
