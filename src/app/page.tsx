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
    <div className="relative isolate">
      {/* Degradé del hero: solo en la home, se funde con el fondo de la página. */}
      <div aria-hidden className="home-hero-gradient pointer-events-none absolute inset-0 -z-10" />
    <div className="max-w-[880px] mx-auto px-5 sm:px-6 pt-14 sm:pt-24 pb-24 flex flex-col items-center">
      <div className="w-full max-w-[680px] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="font-syne text-[44px] sm:text-[88px] font-bold tracking-tight leading-none text-white home-hero-title">
            Macro Libre: no son solo números
          </h1>
          <p className="mt-3 text-[15px] sm:text-[18px] font-medium text-white/95 home-hero-sub">
            🇦🇷 datos de Argentina oficial 🇦🇷
          </p>
        </div>
        <HomeSearch />
        {chips.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <li key={c.id}>
                <Link
                  href={c.href}
                  className="inline-flex items-center h-8 px-3 rounded-full home-float text-[12px] font-mono text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--fg-0)] transition"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {MINI.map((item) => (
          <HideOnError key={item.id}>
            <div className="relative home-float rounded-xl p-3 transition">
              <span className="block text-[13px] font-semibold text-[var(--fg-0)]" aria-hidden>
                {item.label}
              </span>
              {/* El SVG de Recharts se queda con el click si está dentro del link. La capa cubre la tarjeta entera. */}
              <div className="pointer-events-none [&_*]:!pointer-events-none" aria-hidden>
                {item.chart}
              </div>
              <Link
                href={item.href}
                aria-label={`${item.label}: abrir la serie`}
                className="absolute inset-0 z-20 rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--celeste)]"
              >
                <span className="sr-only">Abrir la serie</span>
              </Link>
            </div>
          </HideOnError>
        ))}
      </div>
    </div>
    </div>
  );
}
