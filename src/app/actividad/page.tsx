import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import HideOnError from '@/components/HideOnError';
import {
  PBIBarChart,
  SectorChart,
  PBIDesestacionalizadoChart,
  ConsumoPrivadoChart,
  PobrezaChart,
  SalarioRealChart,
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
        subtitle="EMAE, PBI y salarios"
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
        <div id="pbi" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HideOnError><PBIBarChart /></HideOnError>
          <HideOnError><SectorChart /></HideOnError>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HideOnError><PBIDesestacionalizadoChart /></HideOnError>
          <HideOnError><ConsumoPrivadoChart /></HideOnError>
        </div>
        <div id="pobreza" className="scroll-mt-24">
          <HideOnError><PobrezaChart /></HideOnError>
        </div>
        <div id="salarios" className="scroll-mt-24">
          <HideOnError><SalarioRealChart /></HideOnError>
        </div>
        <p id="ipi" className="scroll-mt-24 text-[13px] text-[var(--fg-2)]">
          IPI manufacturero: no hay serie cargada.
        </p>
      </div>
    </div>
  );
}
