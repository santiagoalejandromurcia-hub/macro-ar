import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import MundoContent from './MundoContent';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Mundo / LatAm · Comparables macro (CPI, tasa, FX)',
  description:
    'Riel secundario de MacroLibre: CPI, tasa de política y FX vs USD para Brasil, Chile, Uruguay, México, EE.UU., Eurozona y China. Argentina sigue siendo el foco del terminal.',
  alternates: { canonical: `${SITE_URL}/mundo` },
  keywords: [
    'inflación brasil chile uruguay méxico',
    'tasa de política monetaria latam',
    'tipo de cambio BRL CLP UYU MXN',
    'CPI YoY comparables',
    'MacroLibre mundo',
    'peers macro Argentina',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/mundo`,
    title: 'Mundo / LatAm | MacroLibre',
    description: 'Comparables CPI · tasa · FX. Argentina primero; peers como contexto.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mundo / LatAm · MacroLibre',
    description: 'CPI, tasa de política y FX vs USD. Argentina es el home; acá solo peers.',
  },
};

export default function MundoPage() {
  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Comparables macro Mundo / LatAm — CPI, tasa de política y FX',
    description:
      'Tabla comparable de inflación interanual, tasa de política monetaria y tipo de cambio vs USD para Argentina (contexto), Brasil, Chile, Uruguay, México, Estados Unidos, Eurozona y China.',
    url: `${SITE_URL}/mundo`,
    isAccessibleForFree: true,
    inLanguage: 'es-AR',
    creator: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    keywords: [
      'CPI',
      'inflación',
      'tasa de política',
      'tipo de cambio',
      'LatAm',
      'Brasil',
      'Chile',
      'Uruguay',
      'México',
    ],
    citation:
      'MacroLibre (https://macrolibre.com/mundo) basado en open.er-api, BIS WS_CBPOL, BCB SGS 13522, FRED CPIAUCSL e institutos nacionales.',
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />

      <SectionHeader
        id="mundo"
        title="Mundo / LatAm"
        subtitle="Comparables peers — Argentina es el terminal. Acá solo inflación, tasa y tipo de cambio vs USD."
        accent="celeste"
      />
      <MundoContent />
    </div>
  );
}
