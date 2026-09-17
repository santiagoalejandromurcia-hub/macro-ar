'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Stamp, { type StampKind } from './Stamp';
import {
  CALENDARIO_7D,
  DISCLAIMER_PULSO,
  LECTURA_DEL_DIA,
  REGIMEN_STAMPS,
  RESERVAS_NETAS_NOTE,
} from '@/data/pulso';

type Field = {
  id: string;
  label: string;
  value: number | null;
  display: string;
  asOf: string | null;
  kind: StampKind;
  source: string;
  delta?: number | null;
  href?: string;
  note?: string;
};

const TAPE_IDS = ['oficial', 'mep', 'ccl', 'blue', 'embi', 'al30', 'us10y', 'wti', 'tamar', 'reservas'];
const MONITOR_IDS = ['ccl', 'brecha', 'embi', 'al30', 'us10y', 'usd-tw', 'wti', 'tamar'];

function byId(fields: Field[], id: string) {
  return fields.find((f) => f.id === id);
}

function Delta({ n }: { n?: number | null }) {
  if (n == null || n === 0) return null;
  const up = n > 0;
  return (
    <span className="tnum" style={{ color: up ? 'var(--up)' : 'var(--down)', fontSize: 11 }}>
      {up ? '▲' : '▼'} {Math.abs(n).toFixed(1)}
    </span>
  );
}

export default function PulsoHoy() {
  const [fields, setFields] = useState<Field[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch('/api/pulso')
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.json();
        })
        .then((j) => {
          if (!cancelled) setFields(j.fields ?? []);
        })
        .catch(() => {
          if (!cancelled) setErr('Pulso live no disponible');
        });
    };
    load();
    const t = setInterval(load, 90_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  const tamar = byId(fields, 'tamar');
  const rem12 = REGIMEN_STAMPS.rem12m.teaPct;
  const real =
    tamar?.value != null ? Math.round((tamar.value - rem12) * 100) / 100 : null;
  const ipc = REGIMEN_STAMPS.ipc;
  const remProx = REGIMEN_STAMPS.remProx;
  const emae = REGIMEN_STAMPS.emae;
  const fiscal = REGIMEN_STAMPS.fiscal;
  const com = REGIMEN_STAMPS.comercial;
  const cc = REGIMEN_STAMPS.cuentaCorriente;

  const tape = TAPE_IDS.map((id) => byId(fields, id)).filter(Boolean) as Field[];
  const monitor = MONITOR_IDS.map((id) => byId(fields, id));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-[28px] sm:text-[34px] leading-tight text-[var(--fg-0)]">
            Pulso
          </h1>
          <p className="text-[13px] text-[var(--fg-1)] mt-1 max-w-xl">
            Mercados y régimen de Argentina. Fuentes oficiales. Sin ruido.
          </p>
        </div>
        <p className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--fg-3)]">
          {LECTURA_DEL_DIA.asOf} · {LECTURA_DEL_DIA.hora}
        </p>
      </div>

      {/* FILA 1 — tape */}
      <div
        className="overflow-x-auto rounded-md border border-[var(--line-1)] bg-[var(--bg-0)]"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="flex min-w-max items-center gap-6 px-3 h-9 font-mono text-[11px] uppercase tracking-wider">
          {tape.length === 0 &&
            Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-3 w-24 rounded" style={{ background: 'var(--bg-2)' }} />
            ))}
          {tape.map((f) => (
            <span key={f.id} className="inline-flex items-center gap-2">
              <Stamp kind={f.kind} asOf={f.asOf} />
              <span className="text-[var(--fg-2)]">{f.label}</span>
              <span className="tnum text-[var(--fg-0)]">{f.display}</span>
              <Delta n={f.delta} />
            </span>
          ))}
        </div>
      </div>
      {err && (
        <p role="alert" className="text-[12px]" style={{ color: 'var(--down)' }}>
          {err}
        </p>
      )}

      {/* FILA 2 — monitor 2x4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {MONITOR_IDS.map((id, i) => {
          const f = monitor[i];
          const inner = (
            <div className="rounded-md border border-[var(--line-1)] bg-[var(--bg-1)] p-3 h-full hover:border-[var(--celeste)]/40 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--fg-2)]">
                  {f?.label ?? id}
                </span>
                <Stamp kind={f?.kind ?? 'cierre'} asOf={f?.asOf} />
              </div>
              <div className="mt-1.5 tnum text-[20px] sm:text-[22px] text-[var(--fg-0)] leading-none">
                {f?.display ?? '—'}
              </div>
              <div className="mt-1.5 text-[10px] font-mono text-[var(--fg-3)]">
                {f?.source ?? '…'}
                {f?.note ? ` · ${f.note}` : ''}
              </div>
            </div>
          );
          return f?.href ? (
            <Link key={id} href={f.href} className="cursor-pointer block">
              {inner}
            </Link>
          ) : (
            <div key={id}>{inner}</div>
          );
        })}
      </div>

      {/* FILA 3 — gauges régimen */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        <Gauge
          label="Tasa real pesos"
          value={real == null ? '—' : `${real > 0 ? '+' : ''}${real.toFixed(2)} pp`}
          hint={`TAMAR − REM 12m (${rem12}%)`}
          stamp={<Stamp kind="cierre" asOf={tamar?.asOf} />}
          sign={real == null ? 0 : real}
        />
        <Gauge
          label="IPC vs REM"
          value={`${ipc.mensual.toFixed(1)} vs ${remProx.mediana.toFixed(1)}`}
          hint={`IPC ${ipc.period} m/m · REM ${remProx.period}`}
          stamp={<Stamp kind="dato" period={ipc.period} asOf={ipc.released} />}
        />
        <Gauge
          label="EMAE tendencia"
          value={emae.trend.toFixed(1)}
          hint={`i.a. ${emae.yoy > 0 ? '+' : ''}${emae.yoy}% · ${emae.period}`}
          stamp={<Stamp kind="dato" period={emae.period} asOf={emae.released} />}
        />
        <Gauge
          label="Primario 12m"
          value={`${fiscal.primario12m.toFixed(1)}% PBI`}
          hint={`Financiero ${fiscal.financiero12m}% · ${fiscal.period}`}
          stamp={<Stamp kind="dato" period={fiscal.period} asOf={fiscal.released} />}
          sign={fiscal.primario12m}
        />
        <Gauge
          label="Comercial"
          value={`+${com.balance.toLocaleString('es-AR')}`}
          hint={`USD M · ${com.period}`}
          stamp={<Stamp kind="dato" period={com.period} asOf={com.released} />}
          sign={1}
        />
      </div>

      {/* FILA 4 — lectura + comercial vs CC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <section className="rounded-md border border-[var(--line-1)] p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--celeste)]">
              Lectura del día
            </h2>
            <span className="text-[10px] font-mono text-[var(--fg-3)]">
              driver {LECTURA_DEL_DIA.driver} · viento de {LECTURA_DEL_DIA.semaforo}
            </span>
          </div>
          <ul className="space-y-1.5 text-[13px] text-[var(--fg-1)] leading-relaxed">
            {LECTURA_DEL_DIA.lineas.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-md border border-[var(--line-1)] p-4">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--celeste)] mb-2">
            Comercial vs cuenta corriente
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Stamp kind="dato" period={com.period} asOf={com.released} />
              <div className="tnum text-[22px] text-[var(--up)] mt-1">
                +{com.balance.toLocaleString('es-AR')}
              </div>
              <div className="text-[11px] text-[var(--fg-2)]">ICA bienes · USD M</div>
              <div className="text-[10px] font-mono text-[var(--fg-3)] mt-1">
                X {com.exports.toLocaleString('es-AR')} · M {com.imports.toLocaleString('es-AR')}
              </div>
            </div>
            <div>
              <Stamp kind="trim" period={cc.period} asOf={cc.released} />
              <div className="tnum text-[22px] text-[var(--down)] mt-1">
                {cc.usdM.toLocaleString('es-AR')}
              </div>
              <div className="text-[11px] text-[var(--fg-2)]">Cuenta corriente · USD M</div>
              <div className="text-[10px] font-mono text-[var(--fg-3)] mt-1">
                Bienes +{cc.bienes.toLocaleString('es-AR')} · serv. {cc.servicios.toLocaleString('es-AR')}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[12px] text-[var(--fg-2)] leading-relaxed">{cc.note}</p>
        </section>
      </div>

      {/* FILA 5 — calendario + netas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <section className="rounded-md border border-[var(--line-1)] p-4">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--fg-2)] mb-2">
            Próximos releases
          </h2>
          <ul className="space-y-1.5 text-[13px]">
            {CALENDARIO_7D.map((c) => (
              <li key={c.date + c.label} className="flex gap-3 font-mono text-[12px]">
                <span className="text-[var(--fg-3)] w-24 shrink-0">{c.date}</span>
                <span className="text-[var(--fg-1)]">{c.label}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-md border border-[var(--line-1)] p-4">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--fg-2)] mb-2">
            Reservas netas
          </h2>
          <p className="text-[13px] text-[var(--fg-1)] leading-relaxed">{RESERVAS_NETAS_NOTE}</p>
        </section>
      </div>

      <p className="text-[11px] text-[var(--fg-3)] leading-relaxed">{DISCLAIMER_PULSO}</p>
    </div>
  );
}

function Gauge({
  label,
  value,
  hint,
  stamp,
  sign,
}: {
  label: string;
  value: string;
  hint: string;
  stamp: ReactNode;
  sign?: number;
}) {
  const color =
    sign == null || sign === 0 ? 'var(--fg-0)' : sign > 0 ? 'var(--up)' : 'var(--down)';
  return (
    <div className="rounded-md border border-[var(--line-1)] bg-[var(--bg-1)] p-3">
      <div className="flex items-center justify-between gap-1 mb-1">{stamp}</div>
      <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--fg-2)]">{label}</div>
      <div className="tnum text-[18px] leading-tight mt-0.5" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] text-[var(--fg-3)] mt-1">{hint}</div>
    </div>
  );
}
