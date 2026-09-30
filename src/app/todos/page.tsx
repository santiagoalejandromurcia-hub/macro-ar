import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { SERIES_CATALOG, type TerminalTab } from '@/data/seriesCatalog';

export const metadata: Metadata = {
  title: 'Catálogo de series',
  description: 'Listado de series. Sin gráficos.',
};

const ORDER: { tab: TerminalTab; title: string }[] = [
  { tab: 'ACTIVIDAD', title: 'Actividad' },
  { tab: 'PRECIOS', title: 'Precios' },
  { tab: 'ENERGIA', title: 'Energía' },
  { tab: 'EXTERNO', title: 'Externo' },
  { tab: 'FISCAL', title: 'Fiscal' },
  { tab: 'COMMODITIES', title: 'Commodities' },
  { tab: 'CREDITO', title: 'Crédito' },
];

export default function TodosPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="todos"
        title="Catálogo"
        subtitle="Series, sin la pared de gráficos"
        accent="celeste"
      />
      <div className="space-y-8">
        {ORDER.map((g) => {
          const rows = SERIES_CATALOG.filter((s) => s.tabs.includes(g.tab));
          if (rows.length === 0) return null;
          return (
            <section key={g.tab}>
              <h2 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--fg-2)] mb-3">{g.title}</h2>
              <ul className="divide-y divide-[var(--line-1)] border-y border-[var(--line-1)]">
                {rows.map((s) => (
                  <li key={s.id}>
                    <Link href={s.href} className="flex items-baseline justify-between gap-4 py-3 hover:text-[var(--celeste)]">
                      <span className="text-[14px] text-[var(--fg-0)]">{s.label}</span>
                      <span className="text-[11px] font-mono text-[var(--fg-3)] shrink-0">
                        {s.sourceHint}{s.hasCsv ? '' : ' · sin serie'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
