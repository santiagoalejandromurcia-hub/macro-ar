'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import PulsoHoy from './PulsoHoy';

export type Capa = 'hoy' | 'mes' | 'trim' | 'series';

const CAPAS: { id: Capa; label: string; hint: string }[] = [
  { id: 'hoy', label: 'Hoy', hint: 'Mercados · lectura' },
  { id: 'mes', label: 'Mes', hint: 'IPC · fiscal · EMAE' },
  { id: 'trim', label: 'Trim', hint: 'PBI · CC · deuda' },
  { id: 'series', label: 'Series', hint: 'Charts · CSV' },
];

export default function PulsoHome({
  mes,
  trim,
  series,
}: {
  mes: ReactNode;
  trim: ReactNode;
  series: ReactNode;
}) {
  const [capa, setCapa] = useState<Capa>('hoy');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const apply = () => {
      const q = new URLSearchParams(window.location.search);
      if (q.get('kpi')) {
        setCapa('series');
        return;
      }
      const c = q.get('capa');
      if (c === 'hoy' || c === 'mes' || c === 'trim' || c === 'series') {
        setCapa(c);
        return;
      }
      const hash = window.location.hash.replace('#', '');
      if (hash === 'dashboard' || hash === 'simulador') setCapa('series');
      else if (['actividad', 'precios', 'fiscal', 'externo'].includes(hash)) setCapa('mes');
      else if (['bienestar', 'salarios-deuda', 'historico', 'pbi-trim'].includes(hash)) setCapa('trim');
    };
    apply();
    window.addEventListener('hashchange', apply);
    window.addEventListener('popstate', apply);
    return () => {
      window.removeEventListener('hashchange', apply);
      window.removeEventListener('popstate', apply);
    };
  }, []);

  const select = useCallback((id: Capa) => {
    setCapa(id);
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (id === 'hoy') url.searchParams.delete('capa');
    else url.searchParams.set('capa', id);
    window.history.replaceState(null, '', url);
  }, []);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Capa temporal"
        className="sticky top-14 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2 mb-4 border-b border-[var(--line-1)] bg-[var(--bg-0)]/90 backdrop-blur"
      >
        <div className="flex gap-1 overflow-x-auto">
          {CAPAS.map((c) => {
            const on = capa === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => select(c.id)}
                className="cursor-pointer shrink-0 px-3 py-2 rounded-md text-left transition-colors"
                style={{
                  background: on ? 'var(--bg-1)' : 'transparent',
                  border: `1px solid ${on ? 'var(--celeste)' : 'transparent'}`,
                  minHeight: 44,
                }}
              >
                <div
                  className="text-[12px] font-mono uppercase tracking-[0.12em]"
                  style={{ color: on ? 'var(--fg-0)' : 'var(--fg-2)' }}
                >
                  {c.label}
                </div>
                <div className="text-[10px] text-[var(--fg-3)] hidden sm:block">{c.hint}</div>
              </button>
            );
          })}
        </div>
      </div>

      {capa === 'hoy' && <PulsoHoy />}
      {capa === 'mes' && mes}
      {capa === 'trim' && trim}
      {capa === 'series' && series}
    </div>
  );
}
