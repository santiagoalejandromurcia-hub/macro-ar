import type { Metadata } from 'next';
import { EmaeSectoresTabla, MercadoTrabajoTabla } from '@/components/IndecTablas';
import SectionHeader from '@/components/SectionHeader';
import HideOnError from '@/components/HideOnError';
import {
  PBIBarChart,
  SectorChart,
  PBIDesestacionalizadoChart,
  ConsumoPrivadoChart,
  PobrezaChart,
  SalarioRealChart,
  IndiceSalariosChart,
  UciiChart,
  EmaeLargoPlazoChart,
} from '@/components/Charts';

export const metadata: Metadata = {
  alternates: { canonical: 'https://macrolibre.com/actividad' },
  title: { absolute: 'EMAE agosto 2026: −1,7% interanual | MacroLibre' },
  description:
    'EMAE agosto 2026 (INDEC, 21/10): actividad económica −1,7% interanual, +0,1% mensual desestacionalizado, tendencia-ciclo 0,0% y acumulado enero–agosto +1,2%. Julio revisado a −1,5% i.a.',
};

export default function ActividadPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <h1 className="font-display text-[26px] sm:text-[30px] leading-tight tracking-tight text-[var(--fg-0)] mb-2">
        EMAE agosto 2026: actividad económica Argentina (INDEC)
      </h1>
      <p className="text-[14px] text-[var(--fg-1)] mb-8">
        Actividad económica (EMAE) de agosto 2026: −1,7% interanual y +0,1% mensual desestacionalizado (INDEC, publicado el 21/10)
      </p>
      <SectionHeader
        id="actividad"
        title="Actividad"
        subtitle="EMAE, PBI, salarios e industria"
        accent="celeste"
      />
      {/*
        PIB Q2-26 demanda (PbiDemandaChart) no se muestra.
        No hay endpoint en src/app/api: solo un snapshot estático en macroData.
        Vuelve cuando ese endpoint responda. Si falla, tampoco se inventa el número.
      */}
      <div className="space-y-6">
        <div id="emae" className="scroll-mt-24">
          <HideOnError><EmaeLargoPlazoChart /></HideOnError>
        </div>
        <EmaeSectoresTabla />
        <div id="pbi" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HideOnError><PBIBarChart /></HideOnError>
          <HideOnError><SectorChart /></HideOnError>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HideOnError><PBIDesestacionalizadoChart /></HideOnError>
          <HideOnError><ConsumoPrivadoChart /></HideOnError>
        </div>
        <div id="empleo" className="scroll-mt-24">
          <MercadoTrabajoTabla />
        </div>
        <div id="pobreza" className="scroll-mt-24">
          <HideOnError><PobrezaChart /></HideOnError>
        </div>
        <div id="indice-salarios" className="scroll-mt-24">
          <HideOnError><IndiceSalariosChart /></HideOnError>
        </div>
        <div id="salarios" className="scroll-mt-24">
          <p className="mb-3 text-[13px] text-[var(--fg-1)]">
            Salario real (SIPA / EIL), base noviembre 2023 = 100. Es un indicador distinto del índice de salarios del INDEC, arriba.
          </p>
          <HideOnError><SalarioRealChart /></HideOnError>
        </div>
        <div id="ipi" className="scroll-mt-24">
          <p className="mb-3 text-[13px] text-[var(--fg-1)]">
            IPI manufacturero de septiembre 2026: −1,8% interanual y +0,7% mensual desestacionalizado; acumulado enero–septiembre −2,6% (INDEC, publicado el 06/11/2026).
          </p>
          <p className="-mt-2 mb-3 text-[12px] text-[var(--fg-2)]">
            Nivel general (serie original) 122,4. Sin serie gráfica cargada todavía. Fuente:{' '}
            <a href="https://www.indec.gob.ar/uploads/informesdeprensa/ipi_manufacturero_11_2630BE216D2B.pdf" className="underline" rel="noopener" target="_blank">INDEC, Índice de producción industrial manufacturero, septiembre de 2026</a>.
          </p>
        </div>
        <div id="ucii" className="scroll-mt-24">
          <HideOnError><UciiChart /></HideOnError>
        </div>
      </div>
    </div>
  );
}
