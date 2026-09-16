'use client';

import { useEffect, useState } from 'react';
import StaleBanner from '@/components/StaleBanner';
import { ACTUALIZADO_AL } from '@/data/mundo';

type Metric = {
  value: number | null;
  asOf: string;
  source: 'live' | 'manual' | 'derived';
  sourceLabel: string;
  note?: string;
};
type Row = {
  id: string;
  name: string;
  currency: string;
  isHome?: boolean;
  metrics: { cpiYoy?: Metric; policyRate?: Metric; fxUsd?: Metric };
};

function Badge({ source }: { source?: string }) {
  if (!source) return null;
  const label = source === 'live' ? 'LIVE' : source === 'derived' ? 'DERIVED' : 'MANUAL';
  const color =
    source === 'live' ? 'var(--up)' : source === 'derived' ? 'var(--celeste)' : 'var(--fg-3)';
  return (
    <span
      className="ml-1.5 font-mono uppercase tracking-[0.06em]"
      style={{ fontSize: 9, color }}
    >
      {label}
    </span>
  );
}

function fmt(n: number | null | undefined, digits = 2) {
  if (n == null || Number.isNaN(n)) return '—';
  return n.toLocaleString('es-AR', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

function StatusChip({ ok, label }: { ok?: boolean; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono uppercase tracking-[0.06em]"
      style={{
        fontSize: 10,
        color: ok ? 'var(--up)' : 'var(--fg-3)',
        background: ok
          ? 'color-mix(in oklch, var(--up) 10%, transparent)'
          : 'var(--bg-1)',
        border: `1px solid ${ok ? 'color-mix(in oklch, var(--up) 30%, var(--line-1))' : 'var(--line-1)'}`,
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: ok ? 'var(--up)' : 'var(--fg-3)' }}
        aria-hidden
      />
      {label} {ok ? 'OK' : 'off'}
    </span>
  );
}

function MetricCell({
  m,
  digits = 2,
}: {
  m?: Metric;
  digits?: number;
}) {
  if (!m) {
    return (
      <td className="px-3 py-3 sm:px-4">
        <span className="text-[var(--fg-3)]">—</span>
      </td>
    );
  }
  const pending = m.value == null;
  return (
    <td className="px-3 py-3 sm:px-4" title={m.note ?? m.sourceLabel}>
      <div className="flex items-baseline flex-wrap">
        <span className="tnum text-[15px] text-[var(--fg-0)]">
          {pending ? 'pendiente' : fmt(m.value, digits)}
        </span>
        <Badge source={m.source} />
      </div>
      {m.asOf && (
        <div className="mt-0.5 font-mono text-[10px] text-[var(--fg-3)]">{m.asOf}</div>
      )}
    </td>
  );
}

export default function MundoContent() {
  const [rows, setRows] = useState<Row[]>([]);
  const [liveOk, setLiveOk] = useState<Record<string, boolean>>({});
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mundo')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((j) => {
        setRows(j.rows ?? []);
        setLiveOk(j.liveOk ?? {});
      })
      .catch(() => setErr('No se pudo cargar /api/mundo'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <StaleBanner asOf={ACTUALIZADO_AL} maxDays={45} label="Seeds manuales CPI / TPM UY" />

      <div className="flex flex-wrap gap-2" aria-live="polite">
        <StatusChip ok={liveOk.fx} label="FX" />
        <StatusChip ok={liveOk.bis} label="BIS tasas" />
        <StatusChip ok={liveOk.bcb} label="BCB CPI" />
        <StatusChip ok={liveOk.fred} label="FRED CPI" />
      </div>
      {err && (
        <p role="alert" className="text-[13px]" style={{ color: 'var(--down)' }}>
          {err}
        </p>
      )}

      <div
        className="overflow-x-auto rounded-xl"
        style={{ border: '1px solid var(--line-1)' }}
      >
        <table className="w-full border-collapse" style={{ fontVariantNumeric: 'tabular-nums' }}>
          <caption className="sr-only">
            Comparables de CPI interanual, tasa de política y tipo de cambio versus dólar para
            Argentina y peers
          </caption>
          <thead>
            <tr
              className="text-left font-mono uppercase tracking-[0.06em] text-[var(--fg-3)]"
              style={{ fontSize: 11 }}
            >
              <th scope="col" className="px-3 py-3 sm:px-4">
                País
              </th>
              <th scope="col" className="px-3 py-3 sm:px-4">
                CPI YoY %
              </th>
              <th scope="col" className="px-3 py-3 sm:px-4">
                Tasa política %
              </th>
              <th scope="col" className="px-3 py-3 sm:px-4">
                FX vs USD
              </th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={`sk-${i}`} style={{ borderTop: '1px solid var(--line-1)' }}>
                  {Array.from({ length: 4 }).map((__, j) => (
                    <td key={j} className="px-3 py-3 sm:px-4">
                      <div
                        className="h-4 w-24 rounded"
                        style={{ background: 'var(--bg-2)' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            {!loading &&
              rows.map((r) => (
                <tr
                  key={r.id}
                  id={r.id}
                  className="scroll-mt-20"
                  style={{
                    borderTop: '1px solid var(--line-1)',
                    background: r.isHome
                      ? 'color-mix(in oklch, var(--celeste) 8%, transparent)'
                      : undefined,
                  }}
                >
                  <th scope="row" className="px-3 py-3 sm:px-4 text-left font-normal">
                    <div className="flex items-baseline gap-2">
                      <strong className="text-[var(--fg-0)]">{r.name}</strong>
                      {r.isHome && (
                        <span
                          className="font-mono uppercase tracking-[0.08em]"
                          style={{ fontSize: 10, color: 'var(--celeste)' }}
                        >
                          HOME
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-[var(--fg-3)]">{r.currency}</div>
                  </th>
                  <MetricCell m={r.metrics.cpiYoy} />
                  <MetricCell m={r.metrics.policyRate} />
                  <MetricCell m={r.metrics.fxUsd} digits={4} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] leading-relaxed text-[var(--fg-3)]">
        Fuentes: open.er-api (FX) · BIS WS_CBPOL (tasas BR CL MX US XM CN) · BCB SGS 13522
        (IPCA 12m) · FRED CPIAUCSL (CPI EE.UU., YoY derivado, sin API key) · INDEC / INE Chile /
        INE Uruguay / INEGI / NBS / Eurostat (CPI MANUAL). TPM Uruguay: BCU COPOM. Sin EMBI/CDS
        multi-país en v1. Eurozona = XM (no usar DE). Argentina es contexto HOME, no el riel
        principal.
      </p>
    </div>
  );
}
