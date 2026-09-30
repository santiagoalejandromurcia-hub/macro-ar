import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import HideOnError from '@/components/HideOnError';
import RiesgoPaisVivo from '@/components/RiesgoPaisVivo';
import {
  TradeChart,
  ReservasChart,
  TCRChart,
  RiesgoPaisChart,
  ExportacionesChart,
} from '@/components/Charts';

export const metadata: Metadata = {
  title: 'Sector externo',
  description: 'Intercambio comercial, reservas, tipo de cambio y una serie de riesgo país.',
};

export default function ExternoPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="externo"
        title="Sector externo"
        subtitle="Comercio, reservas y riesgo país"
        accent="celeste"
      />
      <div className="space-y-6">
        <div id="ica" className="scroll-mt-24">
          <HideOnError><TradeChart /></HideOnError>
        </div>
        <div id="reservas" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HideOnError><ReservasChart /></HideOnError>
          <div id="fx" className="scroll-mt-24">
            <HideOnError><TCRChart /></HideOnError>
          </div>
        </div>
        <HideOnError><ExportacionesChart /></HideOnError>
        {/*
          Una sola serie viva de riesgo país: EMBIGD (RiesgoPaisVivo + historia).
          EmbiDashboard calcula otro spread y no entra.
          Si el fetch falla, RiesgoPaisVivo devuelve null.
        */}
        <div id="riesgo" className="scroll-mt-24 space-y-6">
          <HideOnError><RiesgoPaisVivo /></HideOnError>
          <HideOnError><RiesgoPaisChart /></HideOnError>
        </div>
        <Link
          href="/dolares"
          className="inline-flex items-center h-10 px-4 rounded-md border border-[var(--line-1)] text-[13px] font-mono text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--fg-0)] transition"
        >
          Dólares: MULC, ITCRM, cuenta corriente →
        </Link>

        {/*
          #fed: el repo no tiene embed de TradingView (solo un comentario de estilo
          en la calculadora). No se inventa el widget ni la tasa.
        */}
        <section id="fed" className="scroll-mt-24 pt-4">
          <h2 className="font-display text-[22px] text-[var(--fg-0)]">Tasas de EE.UU.</h2>
          <p className="mt-2 text-[13px] text-[var(--fg-2)]">Sin serie cargada.</p>
        </section>
      </div>
    </div>
  );
}
