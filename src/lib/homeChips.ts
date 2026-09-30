import { ECONOMIC_CALENDAR, type CalEvent } from '@/data/economicCalendar';
import { emaeData, inflacionData, inflacionMayoristaData, remData } from '@/data/macroData';

/**
 * Chips de la home.
 *
 * Universo: calendario INDEC del seed + REM BCRA (ECONOMIC_CALENDAR)
 * y, solo si el seed no los trae, Informe Monetario Mensual, IPI y
 * Boletín Estadístico.
 *
 * Esas tres fechas salen del brief de home v0 (30 sep 2026). No pisan
 * IPC / IPIM / EMAE / REM, que sí están en el seed
 * (calendario INDEC 2º sem 2026, actualizado al 9/9/2026, y calendario
 * de informes del BCRA). El seed pone el IPC de sep-26 el 13/10, no el 12/10.
 */

const TZ = 'America/Argentina/Buenos_Aires';

const WEEKDAY: Record<string, string> = {
  Sun: 'dom', Mon: 'lun', Tue: 'mar', Wed: 'mié', Thu: 'jue', Fri: 'vie', Sat: 'sáb',
};

const MONTH = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const MONTH_WORD: Record<string, string> = {
  Ene: 'ene', Feb: 'feb', Mar: 'mar', Abr: 'abr', May: 'may', Jun: 'jun',
  Jul: 'jul', Ago: 'ago', Sep: 'sep', Oct: 'oct', Nov: 'nov', Dic: 'dic',
};

export interface HomeChip {
  id: string;
  label: string;
  href: string;
  date: string;
}

interface ChipEvent {
  id: string;
  date: string;
  title: string;
  href: string;
}

/**
 * Ausentes en ECONOMIC_CALENDAR. Fuente: brief home v0, 30 sep 2026.
 * No son proyección: son la fecha de publicación.
 */
const BRIEF_ONLY: ChipEvent[] = [
  {
    id: 'bcra-imm-2026-10-07',
    date: '2026-10-07',
    title: 'Informe Monetario Mensual',
    href: '/calendario',
  },
  {
    id: 'indec-ipi-2026-10-09',
    date: '2026-10-09',
    title: 'IPI',
    href: '/actividad#ipi',
  },
  {
    id: 'bcra-boletin-2026-10-14',
    date: '2026-10-14',
    title: 'Boletín Estadístico',
    href: '/calendario',
  },
];

function artDate(now: Date): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function weekdayArt(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 15, 0, 0));
  const w = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
  }).format(dt);
  return WEEKDAY[w] ?? w.toLowerCase();
}

function dayMonth(iso: string): { day: number; mon: string } {
  const [, m, d] = iso.split('-').map(Number);
  return { day: d, mon: MONTH[m - 1] };
}

/** IPC > REM > EMAE > Informe Monetario > Boletín > resto de INDEC. */
function rank(title: string): number {
  const t = title.toLowerCase();
  if (t.includes('ipc')) return 0;
  if (t.includes('rem')) return 1;
  if (t.includes('emae')) return 2;
  if (t.includes('informe monetario')) return 3;
  if (t.includes('boletín') || t.includes('boletin')) return 4;
  return 5;
}

function kindOf(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('informe monetario')) return 'imm';
  if (t.includes('boletín') || t.includes('boletin')) return 'boletin';
  if (t.includes('rem')) return 'rem';
  if (t.includes('ipim')) return 'ipim';
  if (t.includes('ipc')) return 'ipc';
  if (t.includes('emae')) return 'emae';
  if (t === 'ipi' || /\bipi\b/.test(t)) return 'ipi';
  return t;
}

function inUniverse(ev: CalEvent): boolean {
  if (ev.source === 'INDEC') return true;
  return ev.title.toLowerCase().includes('rem');
}

function shortName(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('informe monetario')) return 'Informe Monetario';
  if (t.includes('boletín') || t.includes('boletin')) return 'Boletín';
  if (t.includes('rem')) return 'REM';
  if (t.includes('ipc')) return 'IPC';
  if (t.includes('emae')) return 'EMAE';
  if (t.includes('ipim')) return 'IPIM';
  if (/\bipi\b/.test(t)) return 'IPI';
  if (t.includes('ica')) return 'ICA';
  if (t.includes('cba')) return 'CBA';
  if (t.includes('pbi') || t.includes('pib')) return 'PBI';
  if (t.includes('pobreza')) return 'Pobreza';
  if (t.includes('balanza de pagos')) return 'BOP';
  return title;
}

function hrefFor(ev: CalEvent): string {
  const t = ev.title.toLowerCase();
  if (t.includes('rem')) return '/precios#rem';
  if (t.includes('ipc')) return '/precios#ipc';
  if (t.includes('ipim')) return '/precios#ipim';
  if (t.includes('emae')) return '/actividad#emae';
  if (t.includes('pbi') || t.includes('pib')) return '/actividad#pbi';
  if (t.includes('ica')) return '/externo#ica';
  if (t.includes('pobreza')) return '/actividad#pobreza';
  if (t.includes('balanza de pagos')) return '/externo';
  if (ev.href && !ev.href.includes('#dashboard') && !ev.href.startsWith('/#')) return ev.href;
  return '/calendario';
}

function vigenteToken(label: string | undefined): string | null {
  if (!label) return null;
  const [mon, yy] = label.trim().split(/\s+/);
  const m = MONTH_WORD[mon];
  if (!m || !yy) return null;
  return `${m}-${yy}`;
}

function vigenteFor(title: string): string | null {
  const t = title.toLowerCase();
  if (t.includes('rem')) {
    const last = [...remData].reverse().find((r) => r.actual != null);
    return vigenteToken(last?.period);
  }
  if (t.includes('ipc')) return vigenteToken(inflacionData[inflacionData.length - 1]?.date);
  if (t.includes('ipim')) return vigenteToken(inflacionMayoristaData[inflacionMayoristaData.length - 1]?.date);
  if (t.includes('emae')) return vigenteToken(emaeData[emaeData.length - 1]?.date);
  return null;
}

function toChip(ev: ChipEvent): HomeChip {
  const { day, mon } = dayMonth(ev.date);
  const wd = weekdayArt(ev.date);
  const name = shortName(ev.title);
  const vig = vigenteFor(ev.title);
  const label = vig
    ? `${name} · ${wd} ${day} ${mon} · vigente ${vig}`
    : `${name} · ${wd} ${day} ${mon}`;
  return { id: ev.id, label, href: ev.href, date: ev.date };
}

export function homeChips(now = new Date(), limit = 5): HomeChip[] {
  const today = artDate(now);
  const fromSeed: ChipEvent[] = ECONOMIC_CALENDAR
    .filter(inUniverse)
    .filter((ev) => ev.date >= today)
    .map((ev) => ({
      id: ev.id,
      date: ev.date,
      title: ev.title,
      href: hrefFor(ev),
    }));

  const seedKinds = new Set(fromSeed.map((e) => kindOf(e.title)));
  const extra = BRIEF_ONLY.filter((ev) => ev.date >= today && !seedKinds.has(kindOf(ev.title)));

  const pool = [...fromSeed, ...extra];
  const byDay = new Map<string, ChipEvent>();
  for (const ev of pool) {
    const prev = byDay.get(ev.date);
    if (!prev || rank(ev.title) < rank(prev.title)) byDay.set(ev.date, ev);
  }

  return [...byDay.values()]
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : rank(a.title) - rank(b.title)))
    .slice(0, limit)
    .map(toChip);
}
