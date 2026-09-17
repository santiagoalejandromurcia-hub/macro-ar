import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import CreditoContent from './CreditoContent';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Crédito al privado · stock real, mora y crédito/PBI',
  description:
    'Préstamos al sector privado en términos reales, irregularidad (mora) de familias y empresas, crédito/PBI y composición por línea. Datos BCRA. Fintech/PNFC con fuente CENDEU.',
  alternates: { canonical: `${SITE_URL}/credito` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/credito`,
    title: 'Crédito al privado | MacroLibre',
    description: 'Stock real, mora y crédito/PBI. BCRA + Informe de Bancos.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

export default function CreditoPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="credito"
        title="Crédito al privado"
        subtitle="Stock deflactado, mora y crédito/PBI. Bancos vs fintech con fuentes distintas — no mezclar ratios."
        accent="sol"
      />
      <CreditoContent />
    </div>
  );
}
