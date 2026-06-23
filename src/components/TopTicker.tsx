'use client';

import { useEffect, useState } from 'react';

// ════════════════════════════════════════════════════
// TopTicker — marquee de indicadores oficiales
// Consume /api/kpis y cae a valores placeholder si falla.
// Se duplica el contenido dos veces para loop infinito
// vía translateX(-50%).
// ════════════════════════════════════════════════════

interface TickerItem {
  label: string;
  value: string;
  delta?: number;
  source?: string;
}

const fallback: TickerItem[] = [
  { label: 'DÓLAR BLUE',      value: '$1.420',    delta: 0.5,  source: 'BLUELYTICS' },
  { label: 'RIESGO PAÍS',     value: '433 pb',    delta: -1.2, source: 'MERCADO (GD35+)' },
  { label: 'INFLACIÓN MENS.', value: '2.1%',      delta: -0.5, source: 'INDEC' },
  { label: 'RESERVAS BCRA',   value: 'USD 38.4K M', delta: 0.3, source: 'BCRA' },
  { label: 'EMAE YoY',        value: '+5.5%',     delta: 0.3,  source: 'INDEC' },
  { label: 'IPC NÚCLEO',      value: '1.9%',      delta: -0.4, source: 'INDEC' },
  { label: 'MERVAL',          value: '2.4M pts',  delta: 1.8,  source: 'BYMA' },
];

function itemsFromKpis(kpis: { id: string; value: string; change: number }[]): TickerItem[] {
  const labelMap: Record<string, { label: string; source: string }> = {
    'dolar-blue':  { label: 'DÓLAR BLUE',      source: 'BLUELYTICS' },
    'riesgo-pais': { label: 'RIESGO PAÍS',     source: 'MERCADO (GD35+)' },
    'inflacion':   { label: 'INFLACIÓN MENS.', source: 'INDEC' },
    'reservas':    { label: 'RESERVAS BCRA',   source: 'BCRA' },
    'emae':        { label: 'EMAE YoY',        source: 'INDEC' },
  };
  return kpis
    .map((k) => {
      const meta = labelMap[k.id];
      if (!meta) return null;
      return {
        label: meta.label,
        value: k.value,
        delta: k.change,
        source: meta.source,
      } as TickerItem;
    })
    .filter((x): x is TickerItem => x !== null);
}

export default function TopTicker() {
  const [items, setItems] = useState<TickerItem[]>(fallback);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/kpis');
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        const live = itemsFromKpis(json.kpis ?? []);
        if (live.length > 0) {
          // Mantenemos los fallback adicionales (MERVAL, IPC Núcleo) para que el loop quede lleno
          const liveIds = new Set(live.map((i) => i.label));
          const extras = fallback.filter((f) => !liveIds.has(f.label));
          setItems([...live, ...extras]);
        }
      } catch {
        /* silent — queda el fallback */
      }
    }
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // Duplicamos para loop continuo
  const loop = [...items, ...items];

  return (
    <div className="relative border-b border-[var(--line-1)] bg-[var(--bg-0)] overflow-hidden h-9">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--bg-0)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--bg-0)] to-transparent z-10 pointer-events-none" />
      <div
        className="ticker-track flex items-center gap-8 h-full whitespace-nowrap text-[11px] font-mono uppercase tracking-wider text-[var(--fg-1)] will-change-transform"
        style={{ width: 'max-content' }}
      >
        {loop.map((it, i) => {
          const up = (it.delta ?? 0) > 0;
          const down = (it.delta ?? 0) < 0;
          const color = up
            ? 'var(--up)'
            : down
            ? 'var(--down)'
            : 'var(--fg-2)';
          return (
            <span key={`${it.label}-${i}`} className="inline-flex items-center gap-2.5">
              <span className="text-[var(--fg-2)]">{it.source}</span>
              <span className="text-[var(--fg-1)]">{it.label}</span>
              <span className="text-[var(--fg-0)] tnum">{it.value}</span>
              {typeof it.delta === 'number' && it.delta !== 0 && (
                <span className="tnum" style={{ color }}>
                  {up ? '▲' : '▼'} {Math.abs(it.delta).toFixed(1)}%
                </span>
              )}
              <span className="text-[var(--fg-3)]">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
