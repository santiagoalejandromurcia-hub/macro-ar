import { articles } from '@/data/articles';
import LiveKPIGrid from '@/components/LiveKPIGrid';
import SectionHeader from '@/components/SectionHeader';
import DolarBlueVivo from '@/components/DolarBlueVivo';
import RiesgoPaisVivo from '@/components/RiesgoPaisVivo';
import {
  EmaeChart, PBIBarChart, SectorChart, FiscalChart, TaxTable,
  TradeChart, ReservasChart, TCRChart,
  InflacionMensualChart, InflacionInteranualChart, REMChart,
} from '@/components/Charts';
import Link from 'next/link';
import SimuladorIA from '@/components/SimuladorIA';
import NewsletterSignup from '@/components/NewsletterSignup';
import Hero from '@/components/hero/Hero';

export default function HomePage() {
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* ════════ HERO (full-bleed) ════════ */}
      <Hero />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* ════════ DASHBOARD ════════ */}
        <section id="dashboard" className="mt-4">
          <SectionHeader
            id="dashboard"
            title="Dashboard en vivo"
            subtitle="Principales indicadores macroeconómicos · actualización cada 60s"
            accent="celeste"
          />
          <LiveKPIGrid />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="md:col-span-2 lg:col-span-3">
              <DolarBlueVivo />
            </div>
            <RiesgoPaisVivo />
          </div>
        </section>

        {/* ════════ ACTIVIDAD ════════ */}
        <section id="actividad" className="mt-20">
          <SectionHeader
            id="actividad"
            title="Actividad económica"
            subtitle="EMAE, PBI trimestral y desglose sectorial — Fuente: INDEC"
            accent="celeste"
          />
          <div className="space-y-6">
            <EmaeChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PBIBarChart />
              <SectorChart />
            </div>
          </div>
        </section>

        {/* ════════ FISCAL ════════ */}
        <section id="fiscal" className="mt-20">
          <SectionHeader
            id="fiscal"
            title="Equilibrio fiscal"
            subtitle="Resultado primario, financiero y recaudación — Fuente: Min. Economía"
            accent="sol"
          />
          <div className="space-y-6">
            <FiscalChart />
            <TaxTable />
          </div>
        </section>

        {/* ════════ EXTERNO ════════ */}
        <section id="externo" className="mt-20">
          <SectionHeader
            id="externo"
            title="Sector externo"
            subtitle="Balanza comercial, reservas BCRA y tipo de cambio — Fuente: INDEC, BCRA"
            accent="celeste"
          />
          <div className="space-y-6">
            <TradeChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReservasChart />
              <TCRChart />
            </div>
          </div>
        </section>

        {/* ════════ PRECIOS ════════ */}
        <section id="precios" className="mt-20">
          <SectionHeader
            id="precios"
            title="Precios e inflación"
            subtitle="IPC mensual, interanual, núcleo y expectativas REM — Fuente: INDEC, BCRA"
            accent="magenta"
          />
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InflacionMensualChart />
              <InflacionInteranualChart />
            </div>
            <REMChart />
          </div>
        </section>

        {/* ════════ SIMULADOR ════════ */}
        <section id="simulador" className="mt-20">
          <SimuladorIA />
        </section>

        {/* ════════ NEWSLETTER ════════ */}
        <section id="newsletter" className="mt-20">
          <NewsletterSignup />
        </section>

        {/* ════════ ARTÍCULOS ════════ */}
        <section className="mt-20">
          <SectionHeader
            id="articulos-preview"
            title="Artículos destacados"
            subtitle="Análisis y opinión de economistas"
            accent="sol"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/articulos/${a.slug}`}
                className="group glass glass-lift rounded-xl p-5 block"
              >
                <div className="text-3xl mb-3">{a.image}</div>
                <div className="flex gap-2 flex-wrap mb-2">
                  {a.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--celeste)]/10 text-[var(--celeste)] border border-[var(--celeste)]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-[14px] font-semibold text-[var(--fg-0)] group-hover:text-[var(--celeste)] transition-colors mb-1.5 leading-snug">
                  {a.title}
                </h3>
                <p className="text-[12px] text-[var(--fg-2)] line-clamp-2 mb-3 leading-relaxed">
                  {a.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--fg-3)]">
                  <span>{a.author}</span>
                  <span>·</span>
                  <span>{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/articulos"
              className="inline-flex items-center gap-2 h-9 px-4 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md text-[13px] font-mono text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--fg-0)] transition"
            >
              Ver todos los artículos <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
