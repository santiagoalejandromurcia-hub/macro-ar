'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SERIES_CATALOG } from '@/data/seriesCatalog';

type Item = { label: string; href: string; hint: string; keywords: string };

const SECTIONS: Item[] = [
  { label: 'Actividad', href: '/actividad', hint: 'EMAE, PBI', keywords: 'actividad emae pbi' },
  { label: 'Precios', href: '/precios', hint: 'IPC, IPIM, REM', keywords: 'precios ipc ipim rem inflacion' },
  { label: 'Energía', href: '/energia', hint: 'Balanza CyE', keywords: 'energia cye vaca muerta' },
  { label: 'Sector externo', href: '/externo', hint: 'Comercio, reservas, riesgo', keywords: 'externo ica reservas dolar riesgo' },
  { label: 'Fiscal', href: '/fiscal', hint: 'Resultado y deuda', keywords: 'fiscal mecon deuda' },
  { label: 'Commodities', href: '/commodities', hint: 'FOB y surtidor', keywords: 'commodities soja maiz trigo nafta' },
  { label: 'Crédito', href: '/credito', hint: 'Stock y mora', keywords: 'credito mora' },
  { label: 'Catálogo', href: '/todos', hint: 'Todas las series', keywords: 'todos catalogo series' },
  { label: 'Break-even', href: '/break-even', hint: 'CER vs tasa fija', keywords: 'break even bei' },
  { label: 'Artículos', href: '/articulos', hint: '', keywords: 'articulos' },
  { label: 'Calendario', href: '/calendario', hint: 'INDEC y BCRA', keywords: 'calendario' },
  { label: 'Dólares', href: '/dolares', hint: '', keywords: 'dolares mulc' },
  { label: 'Granos', href: '/granos', hint: '', keywords: 'granos soja' },
  { label: 'Carnes', href: '/carnes', hint: '', keywords: 'carnes' },
  { label: 'Uva y vinos', href: '/uva', hint: '', keywords: 'uva vinos' },
  { label: 'Trabajá con nosotros', href: '/trabaja', hint: '', keywords: 'trabaja empleo contacto' },
  { label: 'Iniciar sesión', href: '/login', hint: 'Google', keywords: 'login ingresar' },
];

const SERIES: Item[] = SERIES_CATALOG.map((s) => ({
  label: s.label,
  href: s.href,
  hint: s.sourceHint,
  keywords: [s.id, s.label, ...s.aliases].join(' '),
}));

const ITEMS = [...SERIES, ...SECTIONS];

function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function HomeSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const n = norm(q.trim());
    if (!n) return ITEMS.slice(0, 8);
    return ITEMS.filter((it) => norm(`${it.label} ${it.keywords} ${it.hint}`).includes(n)).slice(0, 8);
  }, [q]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <div className="relative">
      <label htmlFor="home-search" className="sr-only">Buscar una serie</label>
      <div className="flex items-center gap-3 h-14 px-4 rounded-xl border border-[var(--line-1)] bg-[var(--bg-1)] focus-within:border-[var(--celeste)]/50">
        <svg className="w-4 h-4 shrink-0 text-[var(--fg-2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="home-search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results[0]) {
              e.preventDefault();
              go(results[0].href);
            }
            if (e.key === 'Escape') setOpen(false);
          }}
          placeholder="Buscá tu dato"
          className="flex-1 bg-transparent text-[16px] text-[var(--fg-0)] placeholder:text-[var(--fg-3)] outline-none"
          autoComplete="off"
        />
      </div>

      {open && (
        <ul
          className="absolute z-20 left-0 right-0 mt-2 rounded-xl border border-[var(--line-1)] bg-[var(--bg-0)] shadow-2xl shadow-black/40 overflow-hidden"
          role="listbox"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-[13px] text-[var(--fg-2)]">Nada con ese nombre.</li>
          ) : results.map((it) => (
            <li key={it.href + it.label}>
              <button
                type="button"
                onClick={() => go(it.href)}
                className="w-full text-left px-4 py-2.5 hover:bg-[var(--bg-1)] flex items-baseline justify-between gap-3"
              >
                <span className="text-[14px] text-[var(--fg-0)]">{it.label}</span>
                {it.hint ? (
                  <span className="text-[11px] font-mono text-[var(--fg-3)] shrink-0">{it.hint}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
