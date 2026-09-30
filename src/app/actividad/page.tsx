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
  title: 'Actividad',
  description: 'EMAE, PBI y salarios. Series de INDEC que ya están en el sitio.',
};

export default function ActividadPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
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
