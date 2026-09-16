import { NextResponse } from 'next/server';
import {
  ACTUALIZADO_AL,
  BIS_POLICY_IDS,
  MANUAL_CPI,
  MANUAL_POLICY,
  MUNDO_META,
  type MundoCountryId,
  type MundoMetric,
  type MundoMetricKey,
} from '@/data/mundo';

export const revalidate = 3600;

type Row = {
  id: MundoCountryId;
  name: string;
  currency: string;
  isHome?: boolean;
  metrics: Partial<Record<MundoMetricKey, MundoMetric>>;
};

function metric(
  key: MundoMetricKey,
  value: number | null,
  asOf: string,
  source: MundoMetric['source'],
  sourceLabel: string,
  note?: string,
): MundoMetric {
  return { key, value, asOf, source, sourceLabel, note };
}

function isoDate(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function shiftYear(isoDateStr: string, delta: number): string {
  const [y, m, d] = isoDateStr.split('-').map(Number);
  return `${y + delta}-${String(m).padStart(2, '0')}-${String(d ?? 1).padStart(2, '0')}`;
}

function lastFredPoints(csv: string): { date: string; val: number }[] {
  return csv
    .trim()
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const [date, val] = line.split(',');
      return { date, val: Number(val) };
    })
    .filter((p) => p.date && Number.isFinite(p.val));
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

type DimValue = { id?: string; name?: string };
type Dim = { id?: string; values?: DimValue[] };

function dimList(raw: unknown): Dim[] {
  return Array.isArray(raw) ? (raw as Dim[]) : [];
}

/**
 * BIS SDMX-JSON 1.0: series keys are "freqIdx:areaIdx" (e.g. "0:3").
 * REF_AREA is the 2nd series dimension, not the first (FREQ). Parse by dim id.
 */
function parseBisPolicy(payload: unknown): { id: MundoCountryId; value: number; asOf: string }[] {
  const root = asRecord(payload);
  const data = asRecord(root?.data) ?? root;
  if (!data) return [];

  const datasets = Array.isArray(data.dataSets) ? data.dataSets : [];
  const ds0 = asRecord(datasets[0]);
  const series = asRecord(ds0?.series) ?? {};

  const structure = asRecord(data.structure) ?? asRecord(root?.structure);
  const dims = asRecord(structure?.dimensions);
  const seriesDims = dimList(dims?.series);
  const obsDims = dimList(dims?.observation);

  const refAreaIdx = seriesDims.findIndex((d) => d.id === 'REF_AREA');
  const areas = (seriesDims[refAreaIdx >= 0 ? refAreaIdx : 1]?.values ?? [])
    .map((v) => v.id)
    .filter((id): id is string => Boolean(id));

  const timeDim = obsDims.find((d) => d.id === 'TIME_PERIOD');
  const reportingBegin = typeof ds0?.reportingBegin === 'string' ? ds0.reportingBegin : '';
  const asOf =
    timeDim?.values?.[0]?.id ??
    (reportingBegin.length >= 7 ? reportingBegin.slice(0, 7) : isoDate().slice(0, 7));

  const out: { id: MundoCountryId; value: number; asOf: string }[] = [];
  for (const [sKey, sVal] of Object.entries(series)) {
    const rec = asRecord(sVal);
    const parts = String(sKey).split(':').map(Number);
    const areaIdx = refAreaIdx >= 0 ? parts[refAreaIdx] : parts[1] ?? parts[0];
    const area = areas[areaIdx];
    const observations = asRecord(rec?.observations) ?? {};
    const firstObs = Object.values(observations)[0];
    const raw = Array.isArray(firstObs) ? firstObs[0] : firstObs;
    const value = Number(raw);
    if (!area || !Number.isFinite(value)) continue;
    out.push({ id: area as MundoCountryId, value, asOf });
  }
  return out;
}

export async function GET() {
  const liveOk = { fx: false, bis: false, bcb: false, fred: false };
  const rows: Row[] = MUNDO_META.map((m) => ({
    id: m.id,
    name: m.name,
    currency: m.currency,
    isHome: m.isHome,
    metrics: {},
  }));
  const byId = Object.fromEntries(rows.map((r) => [r.id, r])) as Record<MundoCountryId, Row>;

  for (const [id, cpi] of Object.entries(MANUAL_CPI) as [
    MundoCountryId,
    { value: number | null; asOf: string; note: string },
  ][]) {
    byId[id].metrics.cpiYoy = metric('cpiYoy', cpi.value, cpi.asOf, 'manual', 'MANUAL', cpi.note);
  }
  for (const [id, pol] of Object.entries(MANUAL_POLICY) as [
    MundoCountryId,
    { value: number | null; asOf: string; note?: string; sourceLabel?: string },
  ][]) {
    byId[id].metrics.policyRate = metric(
      'policyRate',
      pol.value,
      pol.asOf,
      'manual',
      pol.sourceLabel ?? 'MANUAL',
      pol.note,
    );
  }
  byId.US.metrics.fxUsd = metric('fxUsd', 1, isoDate(), 'derived', 'USD');

  // ── FX (open.er-api) ─────────────────────────────────────────
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(12_000),
    });
    if (res.ok) {
      const j = (await res.json()) as {
        rates?: Record<string, number>;
        time_last_update_utc?: string;
      };
      const rates = j.rates ?? {};
      const parsed = j.time_last_update_utc ? new Date(j.time_last_update_utc) : null;
      const asOf =
        parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : isoDate();
      liveOk.fx = true;
      byId.US.metrics.fxUsd = metric('fxUsd', 1, asOf, 'derived', 'USD');
      for (const m of MUNDO_META) {
        if (m.id === 'US') continue;
        const v = rates[m.fxCode];
        if (typeof v === 'number' && Number.isFinite(v)) {
          byId[m.id].metrics.fxUsd = metric('fxUsd', v, asOf, 'live', 'open.er-api');
        }
      }
    }
  } catch {
    /* keep derived USD / empty */
  }

  // ── Policy BIS WS_CBPOL ──────────────────────────────────────
  try {
    const res = await fetch(
      'https://stats.bis.org/api/v1/data/WS_CBPOL/M.BR+CL+MX?lastNObservations=1',
      {
        headers: { Accept: 'application/vnd.sdmx.data+json;version=1.0.0' },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(15_000),
      },
    );
    if (res.ok) {
      const j: unknown = await res.json();
      const parsed = parseBisPolicy(j);
      liveOk.bis = parsed.length > 0;
      if (!liveOk.bis) {
        console.error('[mundo] BIS parse empty', JSON.stringify(j).slice(0, 500));
      }
      const allow = new Set<MundoCountryId>(BIS_POLICY_IDS);
      for (const p of parsed) {
        if (!byId[p.id] || !allow.has(p.id)) continue;
        byId[p.id].metrics.policyRate = metric(
          'policyRate',
          p.value,
          p.asOf,
          'live',
          'BIS WS_CBPOL',
        );
      }
    }
  } catch {
    /* leave manuals */
  }

  // ── BR CPI BCB 13522 ─────────────────────────────────────────
  try {
    const res = await fetch(
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/3?formato=json',
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(12_000) },
    );
    if (res.ok) {
      const arr: { data: string; valor: string }[] = await res.json();
      const last = arr[arr.length - 1];
      if (last) {
        liveOk.bcb = true;
        const parts = last.data.split('/');
        const mm = parts[1];
        const yyyy = parts[2];
        byId.BR.metrics.cpiYoy = metric(
          'cpiYoy',
          Number(last.valor),
          yyyy && mm ? `${yyyy}-${mm}` : last.data,
          'live',
          'BCB SGS 13522 (IPCA 12m)',
        );
      }
    }
  } catch {
    /* */
  }

  // ── US CPI YoY via FRED CSV (no API key) ─────────────────────
  try {
    const res = await fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=CPIAUCSL', {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) {
      const pts = lastFredPoints(await res.text());
      const last = pts[pts.length - 1];
      if (last) {
        const target = shiftYear(last.date, -1);
        const yearAgo =
          pts.find((p) => p.date === target) ??
          [...pts].reverse().find((p) => p.date <= target);
        if (yearAgo && yearAgo.val > 0) {
          liveOk.fred = true;
          const yoy = (last.val / yearAgo.val - 1) * 100;
          byId.US.metrics.cpiYoy = metric(
            'cpiYoy',
            Math.round(yoy * 100) / 100,
            last.date.slice(0, 7),
            'derived',
            'FRED CPIAUCSL CSV',
          );
        }
      }
    }
  } catch {
    /* */
  }

  // ── BCE deposit facility (FRED, sin key) — más fresco que BIS ─
  try {
    const res = await fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=ECBDFR', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(12_000),
    });
    if (res.ok) {
      const last = lastFredPoints(await res.text()).at(-1);
      if (last) {
        byId.XM.metrics.policyRate = metric(
          'policyRate',
          last.val,
          last.date,
          'live',
          'FRED ECBDFR · BCE depósito',
          'Deposit facility rate (steering rate del BCE)',
        );
      }
    }
  } catch {
    /* keep MANUAL BCE */
  }

  // ── Fed funds target range (FRED) — solo si ya incorporó el FOMC ─
  try {
    const [upperRes, lowerRes] = await Promise.all([
      fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=DFEDTARU', {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(12_000),
      }),
      fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=DFEDTARL', {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(12_000),
      }),
    ]);
    if (upperRes.ok && lowerRes.ok) {
      const upper = lastFredPoints(await upperRes.text()).at(-1);
      const lower = lastFredPoints(await lowerRes.text()).at(-1);
      // El FOMC del 16/09 subió el techo a 4,00. Si FRED sigue en 3,75, no pises el MANUAL.
      if (upper && lower && upper.val >= 4) {
        const mid = Math.round(((upper.val + lower.val) / 2) * 1000) / 1000;
        byId.US.metrics.policyRate = metric(
          'policyRate',
          mid,
          upper.date,
          'derived',
          'FRED DFEDTAR · FOMC',
          `Punto medio del rango ${lower.val.toFixed(2)}–${upper.val.toFixed(2)}%`,
        );
      }
    }
  } catch {
    /* keep MANUAL FOMC */
  }

  return NextResponse.json(
    {
      asOf: new Date().toISOString(),
      seedAsOf: ACTUALIZADO_AL,
      liveOk,
      rows,
      sources: [
        'https://open.er-api.com',
        'https://stats.bis.org',
        'https://api.bcb.gov.br',
        'https://fred.stlouisfed.org',
      ],
    },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' } },
  );
}
