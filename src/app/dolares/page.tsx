import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import DolaresContent from './DolaresContent';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Dólares · reservas, MULC, ITCRM y cuenta corriente',
  description:
    'Reservas brutas BCRA, proxy de netas con nota metodológica, resultado MULC, tipo de cambio real multilateral, cuenta corriente vs saldo comercial y el agujero de servicios.',
  alternates: { canonical: `${SITE_URL}/dolares` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/dolares`,
    title: 'Dólares stock y flujo | MacroLibre',
    description: 'MULC, reservas, ITCRM y cuenta corriente vs ICA.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

export default function DolaresPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="dolares"
        title="Dólares — stock y flujo"
        subtitle="Reservas, MULC, ITCRM y la cuenta corriente al lado del comercial. Sin inventar netas diarias."
        accent="celeste"
      />
      <DolaresContent />
    </div>
  );
}
