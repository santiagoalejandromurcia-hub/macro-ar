'use client';

import { useMemo } from 'react';
import { KPICard } from '@/data/macroData';
import Sparkline from './Sparkline';
import { useCountUp } from '@/hooks/useCountUp';

// ════════════════════════════════════════════════════
// KPICard · patrón "live-card" del rediseño 2026
// ────────────────────────────────────────────────────
// Fuente + etiqueta pequeña arriba, valor grande en
// Fraunces display, delta badge con color-mix(oklch)
// y sparkline al costado. Glass + glass-lift hover.
// ════════════════════════════════════════════════════

function splitValue(raw: string): {
  prefix: string;
  number: number | null;
  suffix: string;
  decimals: number;
} {
  if (!raw) return { prefix: '', number: null, suffix: '', decimals: 0 };
  const match = raw.match(/^([^\d\-]*?)(-?[\d\.,]+)(.*)$/);
  if (!match) return { prefix: raw, number: null, suffix: '', decimals: 0 };

  const [, prefix, rawNum, suffix] = match;
  let clean = rawNum;
  const hasComma = clean.includes(',');
  const dots = (clean.match(/\./g) || []).length;
  if (hasComma) clean = clean.replace(/\./g, '').replace(',', '.');
  else if (dots > 1) clean = clean.replace(/\./g, '');

  const num = parseFloat(clean);
  if (Number.isNaN(num)) return { prefix: prefix ?? '', number: null, suffix: suffix ?? '', decimals: 0 };

  const decMatch = rawNum.match(/[.,](\d+)$/);
  const decimals = decMatch ? Math.min(decMatch[1].length, 2) : 0;
  return { prefix: prefix ?? '', number: num, suffix: suffix ?? '', decimals };
}

function formatAr(n: number, decimals: number): string {
  return n.toLocaleString('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function syntheticSeries(seed: string, change: number, points = 14): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rnd = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return (h & 0xffff) / 0xffff;
  };
  const trend = change / Math.max(points - 1, 1);
  const values: number[] = [];
  let v = 50;
  for (let i = 0; i < points; i++) {
    v += trend + (rnd() - 0.5) * 3;
    values.push(v);
  }
  return values;
}

const SOURCE_MAP: Record<string, string> = {
  'emae':        'INDEC',
  'pbi':         'INDEC',
  'inflacion':   'INDEC',
  'superavit':   'MECON',
  'reservas':    'BCRA',
  'dolar-blue':  'BLUELYTICS',
  'riesgo-pais': 'JP MORGAN',
  'ipim':        'INDEC',
};

export default function KPICardComponent({
  card,
  index,
  isLive = false,
  history,
}: {
  card: KPICard;
  index: number;
  isLive?: boolean;
  history?: number[];
}) {
  const { prefix, number, suffix, decimals } = useMemo(() => splitValue(card.value), [card.value]);

  const animated = useCountUp({
    to: number ?? 0,
    duration: 1400,
    decimals,
    delay: index * 60,
  });

  const displayValue =
    number === null
      ? card.value
      : `${prefix}${formatAr(animated, decimals)}${suffix}`;

  const positive = card.change > 0;
  const negative = card.change < 0;
  const flat = card.change === 0;

  const source = SOURCE_MAP[card.id] ?? 'OFICIAL';

  const sparkData = useMemo(
    () => (history && history.length >= 2 ? history : syntheticSeries(card.id, card.change)),
    [history, card.id, card.change]
  );

  // Nuevo: colores trend usando tokens MEGA redesign
  const deltaColor = positive
    ? 'var(--teal)'
    : negative
    ? 'oklch(0.68 0.22 25)'
    : 'var(--fg-2)';

  const accentBorderColor = positive
    ? 'var(--teal)'
    : negative
    ? 'oklch(0.68 0.22 25)'
    : 'var(--gold)';

  return (
    <div
      className="glass glass-lift rounded-xl p-4 sm:p-5 relative overflow-hidden animate-fade-in"
      style={{
        animationDelay: `${index * 60}ms`,
        borderLeft: `3px solid ${accentBorderColor}`,
      }}
    >
      {/* Glow top bar — hereda el color del acento */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${accentBorderColor}, transparent)`,
          opacity: 0.6,
        }}
        aria-hidden
      />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-2 gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-2)] mb-0.5 truncate">
            {source} <span className="text-[var(--fg-3)]">·</span> {card.changeLabel}
          </div>
          <div className="text-[13px] font-medium text-[var(--fg-1)] leading-snug">{card.title}</div>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--fg-2)]">
          {isLive && <span className="live-dot" aria-hidden />}
          <span>{isLive ? 'Live' : 'Static'}</span>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex items-end justify-between gap-3 mt-3">
        <div className="min-w-0">
          <div
            className="text-[28px] sm:text-[34px] leading-none tnum text-[var(--fg-0)]"
            style={{ fontFamily: '"JetBrains Mono", "Geist Mono", ui-monospace, monospace', fontWeight: 500 }}
          >
            {displayValue}
          </div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {!flat && (
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[10px] tnum"
                style={{
                  background: `color-mix(in oklch, ${deltaColor} 15%, transparent)`,
                  color: deltaColor,
                  border: `1px solid color-mix(in oklch, ${deltaColor} 25%, transparent)`,
                }}
              >
                {positive ? '▲' : '▼'} {Math.abs(card.change).toFixed(2)}%
              </span>
            )}
            {flat && (
              <span className="font-mono text-[10px] text-[var(--fg-2)] tnum">— sin cambio</span>
            )}
            {card.unit && (
              <span className="font-mono text-[10px] text-[var(--fg-3)]">{card.unit}</span>
            )}
          </div>
        </div>

        <div className="shrink-0 w-[45%] max-w-[160px]">
          <Sparkline
            data={sparkData}
            width={160}
            height={48}
            sign={flat ? 'neutral' : positive ? 'positive' : 'negative'}
            className="w-full h-12"
          />
        </div>
      </div>
    </div>
  );
}
