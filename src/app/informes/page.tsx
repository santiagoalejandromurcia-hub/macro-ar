import Link from 'next/link';
import { informes } from '@/data/informes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informes Macroeconómicos — MacroLibre',
  description:
    'Informes mensuales de análisis y coyuntura macroeconómica argentina. Proyecciones de inflación, tipo de cambio, actividad, sector externo y fiscal. Datos oficiales de INDEC, BCRA y Ministerio de Economía.',
  keywords: [
    'informe macroeconómico argentina',
    'análisis económico argentina 2026',
    'proyecciones inflación argentina',
    'coyuntura económica argentina',
    'INDEC BCRA análisis',
    'macroeconomía argentina informe mensual',
  ],
  openGraph: {
    title: 'Informes Macroeconómicos — MacroLibre',
    description: 'Análisis mensual de coyuntura: inflación, actividad, sector externo y fiscal.',
    url: 'https://macrolibre.com/informes',
    type: 'website',
  },
  alternates: { canonical: 'https://macrolibre.com/informes' },
};

export default function InformesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="text-sm text-[var(--fg-3)] hover:text-[var(--celeste)] transition-colors mb-4 inline-block">
          ← Volver al Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[var(--celeste)]/30 text-[var(--celeste)] bg-[var(--celeste)]/8">
            Nuevo · Edición mensual
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)] mb-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Informes Macroeconómicos
        </h1>
        <p className="text-[var(--fg-2)] max-w-2xl">
          Análisis mensual de coyuntura argentina con proyecciones de inflación, tipo de cambio,
          actividad económica, sector externo y resultado fiscal. Datos de INDEC, BCRA y Economía.
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-[var(--celeste)]/30 via-[var(--sol)]/20 to-transparent" />
      </div>

      {/* Lista de informes */}
      <div className="space-y-5">
        {informes.map((inf) => (
          <Link
            key={inf.slug}
            href={`/informes/${inf.slug}`}
            className="group flex flex-col sm:flex-row gap-5 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl p-5 sm:p-6 hover:border-[var(--celeste)]/40 hover:bg-[var(--bg-2)] transition-all"
          >
            {/* Ícono / mes */}
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-[var(--bg-2)] border border-[var(--line-1)] flex flex-col items-center justify-center gap-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-3)]">Inf.</span>
              <span className="text-[13px] font-bold text-[var(--celeste)] leading-tight">
                {inf.mes.split(' ')[0].substring(0, 3)}
              </span>
              <span className="text-[11px] font-mono text-[var(--fg-2)]">
                {inf.mes.split(' ')[1]}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--celeste)]/10 text-[var(--celeste)] border border-[var(--celeste)]/20">
                  {inf.edicion}
                </span>
                {inf.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-2)] text-[var(--fg-2)] border border-[var(--line-1)]">
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-[var(--fg-0)] group-hover:text-[var(--celeste)] transition-colors mb-1.5 leading-snug">
                {inf.titulo}
              </h2>
              <p className="text-sm text-[var(--fg-2)] line-clamp-2 mb-3">{inf.descripcion}</p>

              {/* KPIs mini */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--fg-3)]">
                {inf.kpis.slice(0, 3).map((k) => (
                  <span key={k.etiqueta}>
                    <span className="font-mono font-semibold text-[var(--fg-1)]">{k.valor}</span>
                    {' '}· {k.etiqueta}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-[var(--fg-3)]">
                <span>{new Date(inf.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>·</span>
                <span>Equipo MacroLibre</span>
                <span className="ml-auto text-[var(--celeste)] group-hover:underline font-medium text-[11px]">
                  Leer informe →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Próximas ediciones */}
      <div className="mt-10 p-5 rounded-xl border border-dashed border-[var(--line-1)] bg-[var(--bg-1)]">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--fg-3)] mb-1">Próxima edición</p>
        <p className="text-sm text-[var(--fg-2)]">
          El <strong className="text-[var(--fg-1)]">Informe Macroeconómico N°2 · Junio 2026</strong> se publicará entre el 15 y 20 de junio de 2026, incorporando los datos de actividad de abril y el IPC de mayo.
        </p>
      </div>
    </div>
  );
}
