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
  alternates: { canonical: 'https://macrolibre.com/externo' },
  title: { absolute: 'Sector externo Argentina: ICA ene–sep 2026 saldo USD 21.198 M | MacroLibre' },
  description: 'ICA ene–sep 2026: expo USD 77.267 M (+21,6%), impo USD 56.069 M (−2,5%), saldo USD 21.198 M (INDEC, 05/11). 3T precios/cantidades + términos +4,2% (03/11). Balanza sep USD 2.976 M. Reservas y riesgo país.',
};

export default function ExternoPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <h1 className="mb-6 font-display text-[26px] sm:text-[30px] leading-tight text-[var(--fg-0)]">
        ICA ene–sep 2026: saldo comercial USD 21.198 M (INDEC)
      </h1>
      <SectionHeader
        id="externo"
        title="Sector externo"
        subtitle="Comercio, reservas y riesgo país"
        accent="celeste"
      />
      <div className="space-y-6">
        <div id="ica" className="scroll-mt-24">
          <p className="mb-3 text-[13px] text-[var(--fg-1)]">
            Balanza comercial de septiembre 2026: superávit de USD 2.976 M (INDEC, publicado el 19/10)
          </p>
          <p className="-mt-2 mb-3 text-[12px] text-[var(--fg-2)]">
            Exportaciones USD 10.036 M (+23,5% i.a.), importaciones USD 7.060 M (−1,8% i.a.), intercambio USD 17.095 M (+11,6% i.a.). (INDEC 19/10)
          </p>
          <p className="mb-3 text-[13px] text-[var(--fg-1)]">
            En los nueve meses de 2026, las exportaciones alcanzaron USD 77.267 M (+21,6% i.a.), las importaciones USD 56.069 M (−2,5% i.a.) y el saldo comercial USD 21.198 M, según el Intercambio comercial argentino del INDEC (publicado el 05/11/2026).
          </p>
          <p className="-mt-2 mb-3 text-[12px] text-[var(--fg-2)]">
            El intercambio comercial (expo + impo) sumó USD 133.336 M (+10,2% i.a.). El informe cubre el acumulado enero–septiembre; no publica el dato mensual de octubre 2026. Fuente:{' '}
            <a href="https://www.indec.gob.ar/uploads/informesdeprensa/i_argent_11_2661774B50A1.pdf" className="underline" rel="noopener" target="_blank">INDEC, Intercambio comercial argentino (bienes), nueve meses de 2026</a> (publicado el 05/11/2026).
          </p>
          <p className="mb-3 text-[13px] text-[var(--fg-1)]">
            En el tercer trimestre de 2026, los precios de exportación subieron 15,2% interanual y los de importación 10,5%, por lo que los términos del intercambio mejoraron 4,2%, según el INDEC (publicado el 03/11/2026).
          </p>
          <p className="-mt-2 mb-3 text-[12px] text-[var(--fg-2)]">
            En el 3T 2026 las cantidades exportadas crecieron 1,3% i.a. y las importadas cayeron 9,5%; en valor, las exportaciones subieron 16,7% y las importaciones 0,1%. El saldo del trimestre fue de USD 7.234 M y la ganancia por términos del intercambio, USD 1.016 M. Fuente:{' '}
            <a href="https://www.indec.gob.ar/uploads/informesdeprensa/ipcext_11_260C47AFE7FE.pdf" className="underline" rel="noopener" target="_blank">INDEC, Índices de precios y cantidades del comercio exterior, 3T 2026</a> (publicado el 03/11/2026).
          </p>
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
