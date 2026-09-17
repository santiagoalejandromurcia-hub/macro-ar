import type { Metadata } from 'next';
import { articles } from '@/data/articles';
import MacroTerminal from '@/components/terminal/MacroTerminal';
import SectionHeader from '@/components/SectionHeader';
import {
  PBIBarChart, SectorChart, FiscalChart, FiscalDetalleTable, TaxTable,
  TradeChart, ReservasChart, TCRChart, RiesgoPaisChart,
  InflacionMensualChart, InflacionInteranualChart, REMChart,
  ConsumoPrivadoChart, PBIDesestacionalizadoChart, PobrezaChart, ExportacionesChart,
  SalarioRealChart, DeudaPibChart, DeudaConsolidadaChart,
  InflacionLargoPlazoChart, EmaeLargoPlazoChart, GastoPublicoChart,
} from '@/components/Charts';
import Link from 'next/link';
import SimuladorIA from '@/components/SimuladorIA';
import NewsletterSignup from '@/components/NewsletterSignup';
import ServicesSection from '@/components/Services/ServicesSection';
import FadeSection from '@/components/FadeSection';
import EmbiDashboard from '@/components/EmbiDashboard';
import InflacionMayoristaChart from '@/components/InflacionMayoristaChart';
import PulsoHome from '@/components/pulso/PulsoHome';
import Stamp from '@/components/pulso/Stamp';
import { REGIMEN_STAMPS } from '@/data/pulso';

export const metadata: Metadata = {
  title: 'Pulso',
  description:
    'Mercados y régimen de Argentina. FX, riesgo, tasas y stamps oficiales. Sin ruido. No es asesoramiento financiero.',
};

export default function HomePage() {
  const latestArticles = articles.slice(0, 3);
  const ipc = REGIMEN_STAMPS.ipc;
  const emae = REGIMEN_STAMPS.emae;
  const fiscal = REGIMEN_STAMPS.fiscal;
  const com = REGIMEN_STAMPS.comercial;
  const cc = REGIMEN_STAMPS.cuentaCorriente;
  const pbi = REGIMEN_STAMPS.pbi;

  const mes = (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <Stamp kind="dato" period={ipc.period} asOf={ipc.released} />
        <Stamp kind="dato" period={emae.period} asOf={emae.released} />
        <Stamp kind="dato" period={fiscal.period} asOf={fiscal.released} />
        <Stamp kind="dato" period={com.period} asOf={com.released} />
      </div>
      <FadeSection id="actividad" className="mt-4">
        <SectionHeader
          id="actividad"
          title="Actividad económica"
          subtitle="EMAE y desglose sectorial — dato de mes, no pulso de hoy. Fuente: INDEC"
          accent="celeste"
        />
        <div className="space-y-6">
          <EmaeLargoPlazoChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectorChart />
            <ConsumoPrivadoChart />
          </div>
        </div>
      </FadeSection>
      <FadeSection id="precios" className="mt-20">
        <SectionHeader
          id="precios"
          title="Precios e inflación"
          subtitle={`IPC ${ipc.period} ${ipc.mensual}% m/m · ${ipc.interanual}% i.a. — publicado ${ipc.released}`}
          accent="magenta"
        />
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InflacionMensualChart />
            <InflacionInteranualChart />
          </div>
          <InflacionMayoristaChart />
          <REMChart />
        </div>
      </FadeSection>
      <FadeSection id="fiscal" className="mt-20">
        <SectionHeader
          id="fiscal"
          title="Equilibrio fiscal"
          subtitle={`Primario 12m ${fiscal.primario12m}% PBI · ${fiscal.period} — ${fiscal.source}`}
          accent="sol"
        />
        <div className="space-y-6">
          <FiscalChart />
          <FiscalDetalleTable />
          <GastoPublicoChart />
          <TaxTable />
        </div>
      </FadeSection>
      <FadeSection id="externo" className="mt-20">
        <SectionHeader
          id="externo"
          title="Sector externo mensual"
          subtitle={`ICA ${com.period}: saldo USD ${com.balance.toLocaleString('es-AR')} M — no es cuenta corriente`}
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
    </>
  );

  const trim = (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <Stamp kind="trim" period={pbi.period} asOf={pbi.released} />
        <Stamp kind="trim" period={cc.period} asOf={cc.released} />
      </div>
      <p className="text-[13px] text-[var(--fg-1)] mb-6 max-w-2xl leading-relaxed">
        PBI {pbi.period} {pbi.yoy > 0 ? '+' : ''}{pbi.yoy}% i.a. (INDEC {pbi.released}).
        Cuenta corriente {cc.period}: {cc.usdM.toLocaleString('es-AR')} USD M — el superávit
        comercial de bienes no implica superávit de cuenta corriente.
      </p>
      <FadeSection id="pbi-trim" className="mt-4">
        <SectionHeader
          id="pbi-trim"
          title="PBI trimestral"
          subtitle="Variación interanual y desestacionalizado — Fuente: INDEC"
          accent="celeste"
        />
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PBIBarChart />
            <PBIDesestacionalizadoChart />
          </div>
        </div>
      </FadeSection>
      <FadeSection id="bienestar" className="mt-20">
        <SectionHeader
          id="bienestar"
          title="Consumo y pobreza"
          subtitle="Series de menor frecuencia — no son pulso diario"
          accent="magenta"
        />
        <div className="space-y-6">
          <PobrezaChart />
        </div>
      </FadeSection>
      <FadeSection id="salarios-deuda" className="mt-20">
        <SectionHeader
          id="salarios-deuda"
          title="Salarios y deuda pública"
          subtitle="Salario real, deuda % PIB y consolidada Tesoro+BCRA"
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
    </>
  );

  const series = (
    <FadeSection id="dashboard" className="mt-4">
      <MacroTerminal />
    </FadeSection>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <PulsoHome mes={mes} trim={trim} series={series} />

      <FadeSection id="calculadora-teaser" className="mt-20">
        <div className="glass glass-lift p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 items-center overflow-hidden relative">
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--celeste) 0%, transparent 70%)' }}
          />
          <div className="md:col-span-3 relative">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--celeste)]">
              ◆ HERRAMIENTA
            </span>
            <h2 className="font-display text-[26px] sm:text-[32px] leading-tight text-[var(--fg-0)] mt-2">
              ¿Dólar, plazo fijo o bonos?
            </h2>
            <p className="text-[14px] text-[var(--fg-1)] mt-2 max-w-xl leading-relaxed">
              Simulá cuánto te habría rendido tu plata en cada instrumento desde cualquier fecha.
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
              { k: 'Plazo Fijo', v: 'BADLAR' },
              { k: 'Dólar MEP', v: 'Bolsa' },
              { k: 'Dólar Blue', v: 'Bluelytics' },
              { k: 'LECAP', v: 'Tesoro' },
            ].map((x) => (
              <div key={x.k} className="p-2.5 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md">
                <div className="text-[12px] font-semibold text-[var(--fg-0)]">{x.k}</div>
                <div className="text-[var(--fg-2)]">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      <FadeSection id="simulador" className="mt-20">
        <SimuladorIA />
      </FadeSection>

      <FadeSection className="mt-20">
        <ServicesSection />
      </FadeSection>

      <FadeSection id="newsletter" className="mt-20">
        <NewsletterSignup />
      </FadeSection>

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
  );
}
