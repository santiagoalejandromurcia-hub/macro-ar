import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import EnergiaContent from './EnergiaContent';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Energía · balanza comercial energética y Vaca Muerta',
  description:
    'Superávit energético de Argentina en 12 meses (INDEC ICA): combustibles y energía FOB menos combustibles y lubricantes. Crudo, destinos y producción.',
  alternates: { canonical: `${SITE_URL}/energia` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/energia`,
    title: 'Balanza comercial energética | MacroLibre',
    description: '12 meses acumulados, CyE vs importaciones de combustibles. INDEC ICA.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

export default function EnergiaPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="energia"
        title="Energía — Vaca Muerta y el superávit"
        subtitle="Balanza comercial energética 12 meses (INDEC ICA). Sin inventar GNL ni pozos."
        accent="sol"
      />
      <EnergiaContent />
    </div>
  );
}
