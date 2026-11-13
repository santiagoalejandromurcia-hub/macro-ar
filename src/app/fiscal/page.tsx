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
  alternates: { canonical: 'https://macrolibre.com/fiscal' },
  title: 'Fiscal',
  description: 'Recaudación de octubre 2026: $21.608.201 M, +33,7% i.a. nominal (ARCA, 02/11/2026). Resultado fiscal, gasto y deuda.',
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
        <div id="recaudacion" className="scroll-mt-24">
          <p className="mb-3 text-[13px] text-[var(--fg-1)]">
            En octubre de 2026, la recaudación tributaria nacional fue de $21.608.201 millones, un 33,7% más que un año antes en términos nominales, según ARCA (publicado el 02/11/2026). En ene–oct sumó $196.013.106 millones (+29,8% i.a.).
          </p>
          <p className="-mt-2 mb-3 text-[12px] text-[var(--fg-2)]">
            Derechos de exportación +238,4% i.a. por baja base de comparación de 2025. Fuente:{' '}
            <a href="https://www.afip.gob.ar/institucional/documentos/ARCA-Recaudacion-102026.pdf" className="underline" rel="noopener" target="_blank">ARCA, Recaudación tributaria octubre 2026</a> (publicado el 02/11/2026).
          </p>
          <HideOnError><TaxTable /></HideOnError>
        </div>
        <div id="deuda" className="scroll-mt-24 space-y-6">
          <HideOnError><DeudaPibChart /></HideOnError>
          <HideOnError><DeudaConsolidadaChart /></HideOnError>
        </div>
      </div>
    </div>
  );
}
