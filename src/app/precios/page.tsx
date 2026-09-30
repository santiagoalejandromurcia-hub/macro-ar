import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import HideOnError from '@/components/HideOnError';
import InflacionMayoristaChart from '@/components/InflacionMayoristaChart';
import {
  InflacionMensualChart,
  InflacionInteranualChart,
  InflacionLargoPlazoChart,
  REMChart,
} from '@/components/Charts';

export const metadata: Metadata = {
  title: 'Precios',
  description: 'IPC, IPIM y REM. Sin proyección en el título.',
};

export default function PreciosPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="precios"
        title="Precios"
        subtitle="IPC, mayorista y REM"
        accent="magenta"
      />
      <div className="space-y-6">
        <div id="ipc" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HideOnError><InflacionMensualChart /></HideOnError>
          <HideOnError><InflacionInteranualChart /></HideOnError>
        </div>
        <div id="ipim" className="scroll-mt-24">
          <HideOnError><InflacionMayoristaChart /></HideOnError>
        </div>
        <div id="rem" className="scroll-mt-24">
          <HideOnError><REMChart /></HideOnError>
        </div>
        <HideOnError><InflacionLargoPlazoChart /></HideOnError>
        {/* TAMAR: el catálogo la marca sin serie histórica. No se dibuja. */}
        <p id="tamar" className="scroll-mt-24 text-[13px] text-[var(--fg-2)]">
          TAMAR: sin serie histórica cargada.
        </p>
      </div>
    </div>
  );
}
