import { articles } from '@/data/articles';
import LiveKPIGrid from '@/components/LiveKPIGrid';
import SectionHeader from '@/components/SectionHeader';
import DolarBlueVivo from '@/components/DolarBlueVivo';
import RiesgoPaisVivo from '@/components/RiesgoPaisVivo';
import {
  PBIBarChart, SectorChart, FiscalChart, TaxTable,
  TradeChart, ReservasChart, TCRChart, RiesgoPaisChart,
  InflacionMensualChart, InflacionInteranualChart, REMChart,
  ConsumoPrivadoChart, PBIDesestacionalizadoChart, PobrezaChart, ExportacionesChart,
  SalarioRealChart, DeudaPibChart, DeudaConsolidadaChart,
  InflacionLargoPlazoChart, EmaeLargoPlazoChart, GastoPublicoChart,
} from '@/components/Charts';
import Link from 'next/link';
import SimuladorIA from '@/components/SimuladorIA';
import NewsletterSignup from '@/components/NewsletterSignup';
import Hero from '@/components/hero/Hero';
import ServicesSection from '@/components/Services/ServicesSection';
import FadeSection from '@/components/FadeSection';
import dynamic from 'next/dynamic';
const EmbiDashboard = dynamic(() => import('@/components/EmbiDashboard'), { ssr: false });

export default function HomePage() {
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* ════════ HERO (full-bleed) ════════ */}
      <Hero />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* ════════ DASHBOARD ════════ */}
        <FadeSection id="dashboard" className="mt-4">
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
        </FadeSection>

        {/* ════════ ACTIVIDAD ════════ */}
        <FadeSection id="actividad" className="mt-20">
          <SectionHeader
            id="actividad"
            title="Actividad económica"
            subtitle="EMAE, PBI trimestral y desglose sectorial — Fuente: INDEC"
            accent="celeste"
          />
          <div className="space-y-6">
            <EmaeLargoPlazoChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PBIBarChart />
              <SectorChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PBIDesestacionalizadoChart />
              <ConsumoPrivadoChart />
            </div>
          </div>
        </FadeSection>

        {/* ════════ CONSUMO Y POBREZA ════════ */}
        <FadeSection id="bienestar" className="mt-20">
          <SectionHeader
            id="bienestar"
            title="Consumo y pobreza"
            subtitle="Consumo privado desestacionalizado y pobreza — Fuente: Econométrica en base a INDEC"
            accent="magenta"
          />
          <div className="space-y-6">
            <PobrezaChart />
          </div>
        </FadeSection>

        {/* ════════ SALARIO Y DEUDA ════════ */}
        <FadeSection id="salarios-deuda" className="mt-20">
          <SectionHeader
            id="salarios-deuda"
            title="Salarios y deuda pública"
            subtitle="Salario real por sector, deuda como % del PIB y deuda consolidada Tesoro+BCRA"
            accent="sol"
          />
          <div className="space-y-6">
            <SalarioRealChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeudaPibChart />
              <ExportacionesChart />
            </div>
            <DeudaConsolidadaChart />
          </div>
        </FadeSection>

        {/* ════════ HISTÓRICO LARGO PLAZO ════════ */}
        <FadeSection id="historico" className="mt-20">
          <SectionHeader
            id="historico"
            title="Mirada histórica"
            subtitle="Inflación 1990-2026 — Fuente: Econométrica en base a INDEC"
            accent="celeste"
          />
          <div className="space-y-6">
            <InflacionLargoPlazoChart />
          </div>
        </FadeSection>

        {/* ════════ FISCAL ════════ */}
        <FadeSection id="fiscal" className="mt-20">
          <SectionHeader
            id="fiscal"
            title="Equilibrio fiscal"
            subtitle="Resultado primario, financiero, recaudación y gasto público — Fuente: Min. Economía"
            accent="sol"
          />
          <div className="space-y-6">
            <FiscalChart />
            <GastoPublicoChart />
            <TaxTable />
          </div>
        </FadeSection>

        {/* ════════ EXTERNO ════════ */}
        <FadeSection id="externo" className="mt-20">
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
            <RiesgoPaisChart />
            <EmbiDashboard />
          </div>
        </FadeSection>

        {/* ════════ PRECIOS ════════ */}
        <FadeSection id="precios" className="mt-20">
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
        </FadeSection>

        {/* ════════ CALCULADORA ════════ */}
        <FadeSection id="calculadora-teaser" className="mt-20">
          <div className="glass glass-lift p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 items-center overflow-hidden relative">
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--celeste) 0%, transparent 70%)' }}
            />
            <div className="md:col-span-3 relative">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--celeste)]">
                ◆ NUEVA HERRAMIENTA
              </span>
              <h2 className="font-display text-[26px] sm:text-[32px] leading-tight text-[var(--fg-0)] mt-2">
                ¿Dólar, plazo fijo o bonos?
              </h2>
              <p className="text-[14px] text-[var(--fg-1)] mt-2 max-w-xl leading-relaxed">
                Simulá cuánto te habría rendido tu plata en cada instrumento desde cualquier fecha.
                Todo ajustado por inflación, con datos en vivo del BCRA, INDEC y ArgentinaDatos.
              </p>
              <Link
                href="/calculadora"
                className="mt-4 h-10 px-5 inline-flex items-center text-[13px] font-semibold bg-[var(--celeste)] text-[var(--bg-0)] rounded-md hover:bg-[oklch(0.84_0.14_230)] transition"
              >
                Abrir calculadora →
              </Link>
            </div>
            <div className="md:col-span-2 relative grid grid-cols-2 gap-2 text-[11px] font-mono">
              {[
                { k: 'Plazo Fijo',  v: 'BADLAR'   },
                { k: 'Dólar MEP',   v: 'Bolsa'    },
                { k: 'Dólar Blue',  v: 'Bluelytics' },
                { k: 'LECAP',       v: 'Tesoro'   },
                { k: 'AL30',        v: 'Ley Arg'  },
                { k: 'GD30',        v: 'Ley NY'   },
              ].map((x) => (
                <div key={x.k} className="p-2.5 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md">
                  <div className="text-[12px] font-semibold text-[var(--fg-0)]">{x.k}</div>
                  <div className="text-[var(--fg-2)]">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ════════ SIMULADOR IA ════════ */}
        <FadeSection id="simulador" className="mt-20">
          <SimuladorIA />
        </FadeSection>

        {/* ════════ SERVICIOS ════════ */}
        <FadeSection className="mt-20">
          <ServicesSection />
        </FadeSection>

        {/* ════════ NEWSLETTER ════════ */}
        <FadeSection id="newsletter" className="mt-20">
          <NewsletterSignup />
        </FadeSection>

        {/* ════════ ARTÍCULOS ════════ */}
        <FadeSection className="mt-20">
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
        </FadeSection>
      </div>
    </>
  );
}
