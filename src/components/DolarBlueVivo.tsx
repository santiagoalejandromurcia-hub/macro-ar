'use client';

import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';

interface DolarData {
  blue: { value_buy: number; value_sell: number };
  oficial: { value_buy: number; value_sell: number };
  last_update: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// ══════════════════════════════════════════════════════
// DolarBlueVivo — rediseño 2026
// Lenguaje visual unificado con KPICard:
//   glass + glass-lift, barra inferior de acento,
//   live-dot teal, monospace numbers, sin emojis grandes.
// ══════════════════════════════════════════════════════

function LiveCard({
  source,
  title,
  value,
  sub,
  accentColor,
  index = 0,
}: {
  source: string;
  title: string;
  value: string;
  sub: string;
  accentColor: string;
  index?: number;
}) {
  return (
    <motion.div
      className="glass glass-lift rounded-xl p-4 sm:p-5 relative overflow-hidden"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {/* Glow top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
          opacity: 0.75,
        }}
        aria-hidden
      />

      {/* Header: fuente + EN VIVO */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-[10px] uppercase tracking-wider"
          style={{ color: 'var(--fg-3)' }}
        >
          {source}
        </span>
        <span
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider"
          style={{ color: 'var(--up)' }}
        >
          <span className="live-dot" aria-hidden />
          EN VIVO
        </span>
      </div>

      {/* Title */}
      <p
        className="font-mono text-[10px] uppercase tracking-wider mb-1.5"
        style={{ color: 'var(--fg-2)' }}
      >
        {title}
      </p>

      {/* Value */}
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="tnum"
          style={{
            fontFamily: '"JetBrains Mono", "Geist Mono", ui-monospace, monospace',
            fontWeight: 500,
            fontSize: 'clamp(20px, 3vw, 26px)',
            lineHeight: 1,
            color: 'var(--fg-0)',
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </motion.div>
      </AnimatePresence>

      {/* Sub-info */}
      <p
        className="font-mono text-[10px] mt-2"
        style={{ color: 'var(--fg-3)' }}
      >
        {sub}
      </p>

      {/* Accent bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: accentColor, opacity: 0.65 }}
        aria-hidden
      />
    </motion.div>
  );
}

export default function DolarBlueVivo() {
  const { data, error, isLoading } = useSWR<DolarData>('/api/dolar', fetcher, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: true,
    dedupingInterval: 30_000,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass rounded-xl p-4 sm:p-5 animate-pulse relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="skeleton h-2.5 w-14 rounded" />
              <div className="skeleton h-2.5 w-10 rounded" />
            </div>
            <div className="skeleton h-2.5 w-20 rounded mb-2" />
            <div className="skeleton h-7 w-28 rounded mb-2" />
            <div className="skeleton h-2.5 w-16 rounded" />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--line-1)] opacity-40" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) return null;

  const brecha =
    data.blue.value_sell > 0 && data.oficial.value_sell > 0
      ? ((data.blue.value_sell / data.oficial.value_sell - 1) * 100).toFixed(1)
      : null;

  const brechaNum = brecha ? parseFloat(brecha) : 0;
  const brechaColor =
    brechaNum > 5
      ? 'var(--down)'
      : brechaNum < 0
      ? 'var(--up)'
      : 'var(--flat)';

  const cards = [
    {
      source: 'BLUELYTICS',
      title: 'DÓLAR BLUE',
      value: `$${data.blue.value_sell.toLocaleString('es-AR')}`,
      sub: `Compra: $${data.blue.value_buy.toLocaleString('es-AR')}`,
      accentColor: 'var(--up)',
    },
    {
      source: 'OFICIAL · BNA',
      title: 'DÓLAR OFICIAL',
      value: `$${data.oficial.value_sell.toLocaleString('es-AR')}`,
      sub: `Compra: $${data.oficial.value_buy.toLocaleString('es-AR')}`,
      accentColor: 'var(--celeste)',
    },
    {
      source: 'CALCULADO',
      title: 'BRECHA',
      value: brecha ? `${brechaNum > 0 ? '+' : ''}${brecha}%` : '—',
      sub: 'Blue vs Oficial',
      accentColor: brechaColor,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {cards.map((card, i) => (
        <LiveCard key={card.title} {...card} index={i} />
      ))}
    </div>
  );
}
