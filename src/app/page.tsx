import HomeSearch from '@/components/home/HomeSearch';
import HideOnError from '@/components/HideOnError';
import PBIBarChart from '@/components/charts/PBIBarChart';
import ReservasChart from '@/components/charts/ReservasChart';
import InflacionMensualChart from '@/components/charts/InflacionMensualChart';
import { homeChips } from '@/lib/homeChips';
import Link from 'next/link';

const MINI = [
  {
    id: 'pbi',
    label: 'PBI',
    href: '/actividad#pbi',
    chart: <PBIBarChart compact />,
  },
  {
    id: 'reservas',
    label: 'Reservas',
    href: '/externo#reservas',
    chart: <ReservasChart compact />,
  },
  {
    id: 'ipc',
    label: 'IPC',
    href: '/precios#ipc',
    chart: <InflacionMensualChart compact />,
  },
];

export default function HomePage() {
  const chips = homeChips();

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 pt-16 sm:pt-28 pb-24">
      <div className="max-w-[720px] mx-auto">
        <HomeSearch />
        {chips.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <li key={c.id}>
                <Link
                  href={c.href}
                  className="inline-flex items-center h-8 px-3 rounded-full border border-[var(--line-1)] bg-[var(--bg-1)] text-[12px] font-mono text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--fg-0)] transition"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        {MINI.map((item) => (
          <HideOnError key={item.id}>
            <Link
              href={item.href}
              className="block rounded-xl border border-[var(--line-1)] bg-[var(--bg-1)] p-3 hover:border-[var(--celeste)]/40 transition"
            >
              <span className="block text-[13px] font-semibold text-[var(--fg-0)]">{item.label}</span>
              <span className="sr-only">Abrir la serie</span>
              {item.chart}
            </Link>
          </HideOnError>
        ))}
      </div>
    </div>
  );
}
