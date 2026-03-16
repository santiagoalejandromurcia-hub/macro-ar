import { kpiCards } from '@/data/macroData';
import { articles } from '@/data/articles';
import KPICardComponent from '@/components/KPICard';
import SectionHeader from '@/components/SectionHeader';
import DolarBlueVivo from '@/components/DolarBlueVivo';
import {
  EmaeChart, PBIBarChart, SectorChart, FiscalChart, TaxTable,
  TradeChart, ReservasChart, TCRChart,
  InflacionMensualChart, InflacionInteranualChart, REMChart,
} from '@/components/Charts';
import Link from 'next/link';
import SimuladorIA from '@/components/SimuladorIA';

export default function HomePage() {
  const latestArticles = articles.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      {/* ════════ HERO ════════ */}
      <section className="py-10 sm:py-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-ar-celeste/[0.03] via-transparent to-transparent rounded-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-ar-celeste/10 border border-ar-celeste/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-ar-celeste rounded-full animate-pulse" />
            <span className="text-xs text-ar-celeste font-medium">Datos actualizados en tiempo real</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-theme-primary mb-4 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Estadísticas Macro<br />
            <span className="gradient-text-ar">de Argentina</span>
          </h1>
          <p className="text-base sm:text-lg text-theme-secondary max-w-2xl mx-auto leading-relaxed">
            EMAE, PBI, inflación, resultado fiscal, reservas, tipo de cambio y más.<br className="hidden sm:block" />
            Datos de fuentes oficiales, visualizados con claridad.
          </p>
        </div>
      </section>
{/* ════════ DASHBOARD ════════ */}
      <section id="dashboard">
        <SectionHeader id="dashboard-h" title="Dashboard en Vivo" subtitle="Principales indicadores macroeconómicos" icon="⚡" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {kpiCards.map((card, i) => (
            <KPICardComponent key={card.id} card={card} index={i} />
          ))}
        </div>
        {/* Dólar en vivo */}
        <div className="mt-4">
          <DolarBlueVivo />
        </div>
      </section>
      
      {/* ════════ ACTIVIDAD ════════ */}
      <section id="actividad" className="mt-16">
        <SectionHeader id="actividad-h" title="Actividad Económica" subtitle="EMAE, PBI trimestral y desglose sectorial — Fuente: INDEC" icon="📈" />
        <div className="space-y-6">
          <EmaeChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PBIBarChart />
            <SectorChart />
          </div>
        </div>
      </section>

      {/* ════════ FISCAL ════════ */}
      <section id="fiscal" className="mt-16">
        <SectionHeader id="fiscal-h" title="Equilibrio Fiscal" subtitle="Resultado primario, financiero y recaudación — Fuente: Min. Economía" icon="🏛️" />
        <div className="space-y-6">
          <FiscalChart />
          <TaxTable />
        </div>
      </section>

      {/* ════════ EXTERNO ════════ */}
      <section id="externo" className="mt-16">
        <SectionHeader id="externo-h" title="Sector Externo" subtitle="Balanza comercial, reservas BCRA y tipo de cambio — Fuente: INDEC, BCRA" icon="🌎" />
        <div className="space-y-6">
          <TradeChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReservasChart />
            <TCRChart />
          </div>
        </div>
      </section>

      {/* ════════ PRECIOS ════════ */}
      <section id="precios" className="mt-16">
        <SectionHeader id="precios-h" title="Precios e Inflación" subtitle="IPC mensual, interanual, núcleo y expectativas REM — Fuente: INDEC, BCRA" icon="🏷️" />
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InflacionMensualChart />
            <InflacionInteranualChart />
          </div>
          <REMChart />
        </div>
      </section>
      {/* ════════ SIMULADOR ════════ */}
      <section id="simulador" className="mt-16">
        <SimuladorIA />
      </section>
      {/* ════════ ARTÍCULOS ════════ */}
      <section className="mt-16">
        <SectionHeader id="articulos-preview" title="Artículos Destacados" subtitle="Análisis y opinión de economistas" icon="📝" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestArticles.map((a) => (
            <Link key={a.slug} href={`/articulos/${a.slug}`} className="group bg-theme-card border border-theme rounded-xl p-5 card-hover block">
              <div className="text-4xl mb-3">{a.image}</div>
              <div className="flex gap-2 flex-wrap mb-2">
                {a.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-ar-celeste/10 text-ar-celeste border border-ar-celeste/20">{t}</span>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-theme-primary group-hover:text-ar-celeste transition-colors mb-1.5 leading-snug">{a.title}</h3>
              <p className="text-xs text-theme-muted line-clamp-2 mb-3">{a.summary}</p>
              <div className="flex items-center gap-2 text-[11px] text-theme-faint">
                <span>{a.author}</span><span>·</span><span>{a.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/articulos" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ar-celeste/10 border border-ar-celeste/20 rounded-lg text-sm text-ar-celeste hover:bg-ar-celeste/20 transition-colors">
            Ver todos los artículos →
          </Link>
        </div>
      </section>
    </div>
  );
}
