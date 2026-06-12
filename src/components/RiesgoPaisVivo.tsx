'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiesgoData {
  valor: number;
  fecha: string;
}

// ══════════════════════════════════════════════════════
// RiesgoPaisVivo — rediseño 2026
// Lenguaje visual unificado con KPICard y DolarBlueVivo.
// ══════════════════════════════════════════════════════

export default function RiesgoPaisVivo() {
  const [data, setData] = useState<RiesgoData | null>(null);
  const [prev, setPrev] = useState<RiesgoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRiesgo() {
      try {
        // Cambiado a /api/embi (cálculo con precios live de GD35 + spread)
        // para mostrar el valor "de mercado" que la gente ve en herramientas como BondTerminal (~433 pb).
        // El feed anterior (ArgentinaDatos) es el índice JP Morgan publicado (con algo de lag).
        const res = await fetch('/api/embi');
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        if (typeof json.embi === 'number') {
          setData({ valor: json.embi, fecha: json.timestamp ? json.timestamp.slice(0, 10) : new Date().toISOString().slice(0, 10) });
        }
        if (typeof json.embiClose === 'number') {
          setPrev({ valor: json.embiClose, fecha: 'cierre' });
        }
      } catch {
        // Silencioso
      } finally {
        setLoading(false);
      }
    }

    fetchRiesgo();
    const interval = setInterval(fetchRiesgo, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="glass rounded-xl p-4 sm:p-5 relative overflow-hidden animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="skeleton h-2.5 w-20 rounded" />
          <div className="skeleton h-2.5 w-10 rounded" />
        </div>
        <div className="skeleton h-2.5 w-24 rounded mb-2" />
        <div className="skeleton h-7 w-28 rounded mb-2" />
        <div className="skeleton h-2.5 w-32 rounded" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--line-1)] opacity-40" />
      </div>
    );
  }

  if (!data) return null;

  const cambio = prev ? data.valor - prev.valor : 0;
  const cambioPct = prev && prev.valor > 0
    ? ((cambio / prev.valor) * 100).toFixed(1)
    : '0';

  // Para riesgo país: baja = positivo (bueno)
  const isBetter = cambio <= 0;
  const deltaColor = isBetter ? 'var(--up)' : 'var(--down)';
  const accentColor = isBetter ? 'var(--up)' : 'var(--down)';

  return (
    <motion.div
      className="glass glass-lift rounded-xl p-4 sm:p-5 relative overflow-hidden"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
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
          OFICIAL · JP MORGAN
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
        RIESGO PAÍS
      </p>

      {/* Value */}
      <AnimatePresence mode="wait">
        <motion.div
          key={data.valor}
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
          {data.valor.toLocaleString('es-AR')} pb
        </motion.div>
      </AnimatePresence>

      {/* Delta badge */}
      {cambio !== 0 && (
        <div className="mt-2 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[10px] tnum"
            style={{
              background: `color-mix(in oklch, ${deltaColor} 15%, transparent)`,
              color: deltaColor,
              border: `1px solid color-mix(in oklch, ${deltaColor} 25%, transparent)`,
            }}
          >
            {isBetter ? '▼' : '▲'} {Math.abs(cambio)} pb ({cambioPct}%)
          </span>
        </div>
      )}

      {/* Timestamp */}
      <p
        className="font-mono text-[9px] mt-2"
        style={{ color: 'var(--fg-3)' }}
      >
        EMBIGD spot (GD35+) · {data.fecha}
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
