import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import HideOnError from '@/components/HideOnError';
import {
  FiscalChart,
  FiscalDetalleTable,
  GastoPublicoChart,
  TaxTable,
  DeudaPibChart,
  DeudaConsolidadaChart,
} from '@/components/Charts';

export const metadata: Metadata = {
  title: 'Fiscal',
  description: 'Resultado fiscal, gasto y deuda. Series que ya estaban en la home.',
};

export default function FiscalPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="fiscal"
        title="Fiscal"
        subtitle="Resultado, gasto y deuda"
        accent="sol"
      />
      <div className="space-y-6">
        <div id="primario" className="scroll-mt-24">
          <HideOnError><FiscalChart /></HideOnError>
        </div>
        <HideOnError><FiscalDetalleTable /></HideOnError>
        <HideOnError><GastoPublicoChart /></HideOnError>
        <HideOnError><TaxTable /></HideOnError>
        <div id="deuda" className="scroll-mt-24 space-y-6">
          <HideOnError><DeudaPibChart /></HideOnError>
          <HideOnError><DeudaConsolidadaChart /></HideOnError>
        </div>
      </div>
    </div>
  );
}
