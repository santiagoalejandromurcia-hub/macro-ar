'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EmbiResponse, BondResult } from '@/app/api/embi/route';

// ══════════════════════════════════════════════════════════════
// EmbiDashboard — EMBI calculado internamente
// Fuentes: data912 (bonos) + Treasury.gov (Treasuries)
// Metodología: stripped spread ponderado por outstanding
// ══════════════════════════════════════════════════════════════

const REFRESH_MS = 5 * 60 * 1000; // 5 minutos

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton rounded ${className ?? ''}`} />;
}

function SpreadBadge({ spread, size = 'sm' }: { spread: number; size?: 'sm' | 'md' }) {
  const color =
    spread < 400
      ? 'var(--teal)'
      : spread < 700
      ? 'var(--gold)'
      : 'oklch(0.68 0.22 25)';

  return (
    <span
      className={`inline-flex items-center font-mono tnum ${
        size === 'md' ? 'text-[11px] px-2 py-0.5' : 'text-[10px] px-1.5 py-px'
      } rounded`}
      style={{
        color,
        background: `color-mix(in oklch, ${color} 14%, transparent)`,
        border: `1px solid color-mix(in oklch, ${color} 28%, transparent)`,
      }}
    >
      {spread.toLocaleString('es-AR')} pb
    </span>
  );
}

function BondRow({ bond, index }: { bond: BondResult; index: number }) {
  const isUp = bond.priceChange > 0;
  const isDown = bond.priceChange < 0;
  const color = isDown ? 'var(--teal)' : isUp ? 'oklch(0.68 0.22 25)' : 'var(--fg-2)';

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="border-b border-[var(--line-1)] last:border-0 hover:bg-white/[0.02] transition-colors"
    >
      {/* Bono */}
      <td className="py-2.5 pr-3">
        <div className="font-mono text-[12px] text-[var(--fg-0)] font-semibold">{bond.ticker}</div>
        <div className="font-mono text-[9px] text-[var(--fg-3)]">{bond.maturityYear}</div>
      </td>

      {/* Precio USD */}
      <td className="py-2.5 pr-3 text-right">
        <div className="font-mono text-[12px] tnum text-[var(--fg-0)]">
          ${bond.price.toFixed(2)}
        </div>
        <div
          className="font-mono text-[9px] tnum"
          style={{ color }}
        >
          {isDown ? '▼' : isUp ? '▲' : '—'} {Math.abs(bond.priceChange).toFixed(2)}%
        </div>
      </td>

      {/* YTM */}
      <td className="py-2.5 pr-3 text-right">
        <span className="font-mono text-[11px] tnum text-[var(--fg-1)]">
          {bond.ytm !== null ? `${bond.ytm.toFixed(2)}%` : <span className="text-[var(--fg-3)]">—</span>}
        </span>
      </td>

      {/* Duration */}
      <td className="py-2.5 pr-3 text-right hidden sm:table-cell">
        <span className="font-mono text-[11px] tnum text-[var(--fg-2)]">
          {bond.duration !== null ? `${bond.duration.toFixed(1)}a` : <span className="text-[var(--fg-3)]">—</span>}
        </span>
      </td>

      {/* Treasury ref */}
      <td className="py-2.5 pr-3 text-right hidden md:table-cell">
        <span className="font-mono text-[11px] tnum text-[var(--fg-2)]">
          {bond.treasuryRef !== null ? `${bond.treasuryRef.toFixed(2)}%` : <span className="text-[var(--fg-3)]">—</span>}
        </span>
      </td>

      {/* Spread */}
      <td className="py-2.5 text-right">
        {bond.spread !== null
          ? <SpreadBadge spread={bond.spread} />
          : <span className="font-mono text-[9px] text-[var(--fg-3)]">amort.</span>
        }
      </td>
    </motion.tr>
  );
}

export default function EmbiDashboard() {
  const [data, setData]       = useState<EmbiResponse | null>(null);
  const [prev, setPrev]       = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('—');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/embi');
      if (!res.ok) throw new Error('API error');
      const json: EmbiResponse = await res.json();
      setPrev(data?.embi ?? null);
      setData(json);
      setError(false);
      setLastUpdate(
        new Date().toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Argentina/Buenos_Aires',
        }),
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [data?.embi]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, REFRESH_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Skeleton ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="glass rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-end gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass rounded-xl p-5 text-center">
        <p className="font-mono text-[11px] text-[var(--fg-3)]">EMBI no disponible</p>
      </div>
    );
  }

  const delta = prev !== null ? data.embi - prev : 0;
  const isBetter = delta <= 0;
  const accentColor = data.embi < 400
    ? 'var(--teal)'
    : data.embi < 700
    ? 'var(--gold)'
    : 'oklch(0.68 0.22 25)';

  return (
    <motion.div
      className="glass rounded-xl overflow-hidden relative"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
          opacity: 0.8,
        }}
        aria-hidden
      />

      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] mb-0.5">
              DATA912 · TREASURY.GOV
            </div>
            <div className="text-[13px] font-medium text-[var(--fg-1)]">
              EMBI Argentina · Cálculo Propio
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider shrink-0">
            <span className="live-dot teal" aria-hidden />
            <span style={{ color: 'var(--teal)' }}>{lastUpdate}</span>
          </div>
        </div>

        {/* Headline EMBI */}
        <div className="flex items-end gap-3 mb-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={data.embi}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontWeight: 600,
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: 1,
                color: 'var(--fg-0)',
                letterSpacing: '-0.02em',
              }}
              className="tnum"
            >
              {data.embi.toLocaleString('es-AR')}
            </motion.div>
          </AnimatePresence>
          <div className="pb-1 space-y-1">
            <div className="font-mono text-[10px] text-[var(--fg-2)] uppercase">pb · EMBIGD</div>
            {delta !== 0 && (
              <span
                className="inline-flex items-center gap-1 px-1.5 py-px rounded font-mono text-[10px] tnum"
                style={{
                  color: isBetter ? 'var(--teal)' : 'oklch(0.68 0.22 25)',
                  background: `color-mix(in oklch, ${isBetter ? 'var(--teal)' : 'oklch(0.68 0.22 25)'} 14%, transparent)`,
                  border: `1px solid color-mix(in oklch, ${isBetter ? 'var(--teal)' : 'oklch(0.68 0.22 25)'} 28%, transparent)`,
                }}
              >
                {isBetter ? '▼' : '▲'} {Math.abs(delta)} pb
              </span>
            )}
          </div>
        </div>

        {/* Tabla de bonos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--line-1)]">
                {[
                  ['Bono', 'text-left'],
                  ['Precio', 'text-right'],
                  ['YTM', 'text-right'],
                  ['Dur.', 'text-right hidden sm:table-cell'],
                  ['T-ref', 'text-right hidden md:table-cell'],
                  ['Spread', 'text-right'],
                ].map(([label, cls]) => (
                  <th
                    key={label}
                    className={`pb-2 font-mono text-[9px] uppercase tracking-wider text-[var(--fg-3)] ${cls}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.bonds.map((bond, i) => (
                <BondRow key={bond.ticker} bond={bond} index={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Curva Treasuries */}
        <div className="mt-4 pt-3 border-t border-[var(--line-1)]">
          <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--fg-3)] mb-2">
            Curva UST · Treasury.gov
          </div>
          <div className="flex flex-wrap gap-3">
            {['2y', '5y', '7y', '10y', '20y', '30y']
              .filter((k) => data.treasuryCurve[k] !== undefined)
              .map((k) => (
                <div key={k} className="text-center">
                  <div className="font-mono text-[9px] text-[var(--fg-3)] uppercase">{k}</div>
                  <div className="font-mono text-[11px] tnum text-[var(--fg-1)]">
                    {data.treasuryCurve[k].toFixed(2)}%
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Metodología badge */}
        <div className="mt-3 pt-3 border-t border-[var(--line-1)]">
          <p className="font-mono text-[9px] text-[var(--fg-3)] leading-relaxed">
            Stripped spread = YTM_bono − T-Note_equivalente (por duración) · Ponderado por
            outstanding · Bonos ley NY &gt; USD 500M · Método EMBIGD JP Morgan
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: accentColor, opacity: 0.65 }}
        aria-hidden
      />
    </motion.div>
  );
}
