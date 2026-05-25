'use client';

import { useState } from 'react';
import type { CalcOutput, InstrumentId, InstrumentResult } from '@/lib/calc/types';
import { CalcChart } from './CalcChart';

// ════════════════════════════════════════════════════
// Calculator · ¿Dólar, Plazo Fijo o Bonos?
// Compara retornos históricos con ajuste por inflación.
// ════════════════════════════════════════════════════

interface InstrumentOption {
  id: InstrumentId;
  label: string;
  hint: string;
  color: string;
}

const INSTRUMENTS: InstrumentOption[] = [
  { id: 'plazoFijo', label: 'Plazo Fijo',    hint: 'TNA BADLAR BCRA',        color: '#74ACDF' },
  { id: 'dolarMEP',  label: 'Dólar MEP',     hint: 'Bolsa',                    color: '#D4A843' },
  { id: 'dolarBlue', label: 'Dólar Blue',    hint: 'Bluelytics',               color: '#22C55E' },
  { id: 'lecap',     label: 'LECAP',         hint: 'Letras del Tesoro',        color: '#A78BFA' },
  { id: 'al30',      label: 'AL30',          hint: 'Bonar 2030 (ley Arg)',     color: '#F97316' },
  { id: 'gd30',      label: 'GD30',          hint: 'Global 2030 (ley NY)',     color: '#EC4899' },
];

const DEFAULT_FROM = '2023-12-01';

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatARS(n: number): string {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('es-AR', { maximumFractionDigits: 0 });
}

function formatPct(n: number): string {
  if (!isFinite(n)) return '—';
  const sign = n > 0 ? '+' : '';
  return `${sign}${(n * 100).toFixed(1)}%`;
}

function colorFor(id: InstrumentId): string {
  return INSTRUMENTS.find((i) => i.id === id)?.color ?? '#74ACDF';
}

// useMemo aún usado por ResultRow vía colorFor
export default function Calculator() {
  const [monto, setMonto] = useState<number>(1_000_000);
  const [from, setFrom] = useState<string>(DEFAULT_FROM);
  const [to, setTo] = useState<string>(todayISO());
  const [selected, setSelected] = useState<InstrumentId[]>([
    'plazoFijo', 'dolarMEP', 'lecap', 'al30',
  ]);
  const [output, setOutput] = useState<CalcOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canRun = monto > 0 && from < to && selected.length > 0;

  async function run() {
    if (!canRun) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/calc/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monto, from, to, instruments: selected }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? 'Error desconocido');
      setOutput(json);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function toggle(id: InstrumentId) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const winner = output?.results.find((r) => r.available);

  return (
    <div className="flex flex-col gap-6">
      {/* ── Form ─────────────────────────────────────────── */}
      <div className="glass p-5 md:p-6 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
              Monto inicial (ARS)
            </span>
            <input
              type="number"
              min={1000}
              step={1000}
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              className="bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md px-3 py-2 text-[15px] text-[var(--fg-0)] font-semibold tnum focus:outline-none focus:border-[var(--celeste)]/50"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
              Fecha de inicio
            </span>
            <input
              type="date"
              value={from}
              min="2020-01-01"
              max={to}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md px-3 py-2 text-[14px] text-[var(--fg-0)] font-mono focus:outline-none focus:border-[var(--celeste)]/50"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
              Fecha final
            </span>
            <input
              type="date"
              value={to}
              min={from}
              max={todayISO()}
              onChange={(e) => setTo(e.target.value)}
              className="bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md px-3 py-2 text-[14px] text-[var(--fg-0)] font-mono focus:outline-none focus:border-[var(--celeste)]/50"
            />
          </label>
        </div>

        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
            Instrumentos a comparar
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {INSTRUMENTS.map((opt) => {
              const on = selected.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggle(opt.id)}
                  className="flex flex-col gap-0.5 items-start p-2.5 rounded-md border transition text-left"
                  style={{
                    borderColor: on ? opt.color : 'var(--line-1)',
                    background: on ? `${opt.color}1a` : 'var(--bg-1)',
                  }}
                >
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: on ? opt.color : 'var(--fg-0)' }}
                  >
                    {opt.label}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                    {opt.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-[var(--fg-2)]">
            {selected.length === 0 ? 'Elegí al menos uno' : `${selected.length} instrumento${selected.length > 1 ? 's' : ''} · ${from} → ${to}`}
          </div>
          <button
            onClick={run}
            disabled={!canRun || loading}
            className="h-10 px-5 text-[13px] font-semibold bg-[var(--celeste)] text-[var(--bg-0)] rounded-md hover:bg-[oklch(0.84_0.14_230)] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Calculando…' : 'Comparar'}
          </button>
        </div>

        {error && (
          <div className="text-[12px] text-[var(--down)] border border-[var(--down)]/40 rounded-md px-3 py-2">
            Error: {error}
          </div>
        )}
      </div>

      {/* ── Results ────────────────────────────────────── */}
      {output && (
        <div className="flex flex-col gap-6">
          {/* Banner narrativa */}
          {winner && (
            <div className="glass glass-lift p-5 md:p-6">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                Si hubieras invertido ${formatARS(output.input.monto)} el {output.input.from}…
              </div>
              <div className="text-[20px] md:text-[28px] font-display leading-tight text-[var(--fg-0)]">
                La mejor opción fue{' '}
                <span style={{ color: colorFor(winner.id) }} className="font-semibold">
                  {winner.label}
                </span>
                {' '}con <span className="tnum">{formatPct(winner.roiReal)}</span> real
                ({formatPct(winner.roiNominal)} nominal).
              </div>
              <div className="text-[13px] text-[var(--fg-2)] mt-2">
                Inflación acumulada del período:{' '}
                <span className="tnum text-[var(--fg-1)]">
                  {formatPct(output.inflacionAcumulada)}
                </span>
              </div>
            </div>
          )}

          {/* Chart — TradingView style con zoom/pan */}
          <div className="glass p-4 md:p-5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-3">
              Evolución del capital (nominal, ARS) · Scroll para zoom · Arrastrá para mover
            </div>
            <CalcChart output={output} />
          </div>

          {/* Tabla comparativa */}
          <div className="glass overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--line-1)] text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                  <th className="text-left px-4 py-3">Instrumento</th>
                  <th className="text-right px-4 py-3">Final nominal</th>
                  <th className="text-right px-4 py-3">Final real</th>
                  <th className="text-right px-4 py-3">ROI nominal</th>
                  <th className="text-right px-4 py-3">ROI real</th>
                  <th className="text-right px-4 py-3">Anualizado</th>
                </tr>
              </thead>
              <tbody>
                {output.results.map((r) => <ResultRow key={r.id} r={r} />)}
              </tbody>
            </table>
          </div>

          {/* Notas */}
          <div className="flex flex-col gap-2 text-[11px] text-[var(--fg-2)] font-mono leading-relaxed">
            {output.results.map((r) => (
              <div key={r.id}>
                <span style={{ color: colorFor(r.id) }}>◆</span>{' '}
                <span className="text-[var(--fg-1)]">{r.label}:</span>{' '}
                {r.note}
              </div>
            ))}
            {output.warnings.length > 0 && (
              <div className="mt-2 text-[var(--down)]">
                Advertencias de fetch: {output.warnings.join(' · ')}
              </div>
            )}
            <div className="mt-2 text-[var(--fg-3)]">
              Actualizado: {new Date(output.updatedAt).toLocaleString('es-AR')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultRow({ r }: { r: InstrumentResult }) {
  const pos = r.roiReal >= 0;
  return (
    <tr className="border-b border-[var(--line-1)] last:border-0 hover:bg-[var(--bg-1)]">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: colorFor(r.id) }}
          />
          <span className="font-semibold text-[var(--fg-0)]">{r.label}</span>
          {!r.available && (
            <span className="text-[10px] px-1.5 py-0.5 bg-[var(--bg-2)] border border-[var(--line-1)] rounded text-[var(--fg-2)]">
              s/datos
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-right tnum text-[var(--fg-0)]">
        ${formatARS(r.nominalFinal)}
      </td>
      <td className="px-4 py-3 text-right tnum text-[var(--fg-1)]">
        ${formatARS(r.realFinal)}
      </td>
      <td className="px-4 py-3 text-right tnum" style={{ color: r.roiNominal >= 0 ? 'var(--up)' : 'var(--down)' }}>
        {formatPct(r.roiNominal)}
      </td>
      <td className="px-4 py-3 text-right tnum font-semibold" style={{ color: pos ? 'var(--up)' : 'var(--down)' }}>
        {formatPct(r.roiReal)}
      </td>
      <td className="px-4 py-3 text-right tnum text-[var(--fg-1)]">
        {formatPct(r.roiAnualReal)}
      </td>
    </tr>
  );
}
