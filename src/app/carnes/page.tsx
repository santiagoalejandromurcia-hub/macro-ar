import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import CarnesContent from './CarnesContent';

const SITE_URL = 'https://macrolibre.com';

// ============================================================
// /carnes — Mercado de Carnes Argentina
// Keywords objetivo: "faena bovina argentina", "exportaciones carne
// argentina", "IPCVA", "carne argentina China", "mercado carnes 2026"
// ============================================================

export const metadata: Metadata = {
  title: 'Mercado de Carnes Argentina · Faena, exportaciones y precios',
  description:
    'Faena bovina mensual, exportaciones de carne vacuna por destino, precios FOB y top frigoríficos de Argentina. Datos oficiales SAGyP e IPCVA, actualizados a abril 2026.',
  alternates: { canonical: `${SITE_URL}/carnes` },
  keywords: [
    'faena bovina argentina', 'exportaciones carne vacuna argentina',
    'IPCVA', 'IPCVA marzo 2026', 'carne argentina China',
    'frigoríficos argentina', 'precio FOB carne argentina',
    'mercado carnes argentina 2026', 'SAGyP faena',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/carnes`,
    title: 'Mercado de Carnes Argentina — Faena, exportaciones, precios',
    description:
      'Faena bovina mensual, destinos de exportación, precios FOB y top frigoríficos. Datos oficiales SAGyP / IPCVA.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercado de Carnes Argentina · MacroLibre',
    description: 'Faena, exportaciones, destinos y precios FOB. Datos oficiales actualizados.',
  },
};

const FAQ = [
  {
    q: '¿Cuánto se faena por mes en Argentina?',
    a: 'En abril de 2026 se faenaron aproximadamente 960.871 cabezas bovinas, según el último informe de la SAGyP. El promedio mensual del primer cuatrimestre 2026 fue de 983.900 cabezas.',
  },
  {
    q: '¿Cuál es el principal destino de la carne argentina?',
    a: 'China — concentra el 61.6% del volumen exportado en el primer trimestre de 2026 (101.027 toneladas). El segundo destino es Estados Unidos con 12.8% (21.018 toneladas), seguido de Israel con 10.4%.',
  },
  {
    q: '¿Cuánto vale exportar carne argentina?',
    a: 'En marzo de 2026 las exportaciones totalizaron USD 405.7 millones, un 36.3% más que febrero y 106.2% más que marzo 2025. El precio FOB promedio fue de USD 7.923 por tonelada.',
  },
  {
    q: '¿Qué frigoríficos faenan más?',
    a: 'Los cinco frigoríficos más grandes por volumen de faena en 2026 son Rioplatense, Swift, Coto, Arre Beef y Quickfood (Marfrig). Juntos concentran cerca del 13% de la faena nacional.',
  },
  {
    q: '¿Qué provincia faena más?',
    a: 'Buenos Aires concentra el 51.8% de la faena bovina nacional (2.04 millones de cabezas en ene-abr 2026), seguida por Santa Fe (17.9%) y Córdoba (7.7%).',
  },
  {
    q: '¿De dónde salen los datos?',
    a: 'La faena viene de la Secretaría de Agricultura, Ganadería y Pesca (SAGyP) y el IPCVA. Las exportaciones del Instituto de Promoción de la Carne Vacuna Argentina (IPCVA) en base a datos INDEC. Todos los datos son provisorios y sujetos a revisión.',
  },
];

export default function CarnesPage() {
  // ─── JSON-LD ───
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mercado de Carnes Argentina — Faena, exportaciones, precios',
    description: metadata.description,
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: {
      '@type': 'Organization',
      name: 'MacroLibre',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-app-icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/carnes` },
    articleSection: 'Sector agropecuario',
  };

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Mercado de Carnes Argentina — Faena y exportaciones',
    description:
      'Datos mensuales de faena bovina por provincia, frigorífico y categoría, y exportaciones de carne vacuna argentina por destino, volumen, valor y precio FOB.',
    keywords: [
      'Argentina', 'carne vacuna', 'faena bovina', 'IPCVA', 'SAGyP',
      'exportaciones carne', 'precio FOB', 'China', 'frigoríficos',
    ],
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    spatialCoverage: { '@type': 'Country', name: 'Argentina' },
    inLanguage: 'es-AR',
    url: `${SITE_URL}/carnes`,
    citation:
      'MacroLibre (https://macrolibre.com/carnes) basado en datos de SAGyP, IPCVA e INDEC.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SectionHeader
        id="carnes"
        title="Mercado de Carnes Argentina"
        subtitle="Faena bovina, exportaciones, destinos y precios. Datos oficiales SAGyP e IPCVA, actualizados mes a mes."
        accent="celeste"
      />

      <CarnesContent />

      {/* ─── Resumen ejecutivo ─── */}
      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">Lo que tenés que saber</h2>
        <p className="mb-3">
          Marzo 2026 fue un mes <strong className="text-[var(--up)]">histórico para las exportaciones</strong>:
          USD 405.7M, +106% interanual. El precio FOB promedio (USD 7.923/tn) está
          un 42% por encima del año pasado, traccionado por demanda china récord y
          una recuperación fuerte del mercado estadounidense (+107% en volumen).
        </p>
        <p className="mb-3">
          La faena interna en cambio se mantiene en niveles estables: ~960k cabezas/mes,
          con Buenos Aires concentrando más de la mitad de la actividad y los grandes
          frigoríficos (Rioplatense, Swift, Coto) liderando el volumen.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Los datos de exportaciones son provisorios y pueden ser revisados por INDEC.
          La serie incluye carne enfriada, congelada y procesada; no incluye menudencias
          ni huesos resultantes del desposte.
        </p>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mt-10">
        <h2
          className="text-2xl font-bold text-[var(--fg-0)] mb-5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details key={i} className="group glass p-5 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-[var(--fg-0)]">
                {f.q}
                <span className="text-[var(--celeste)] text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-1)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Cross-links ─── */}
      <section className="mt-10 p-5 md:p-6 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <h3 className="text-base font-semibold text-[var(--fg-0)] mb-2">Más sobre la economía argentina</h3>
        <div className="flex flex-wrap gap-2 text-xs mt-4">
          <Link
            href="/glosario/balanza-comercial"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Glosario: Balanza Comercial →
          </Link>
          <Link
            href="/inflacion"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Inflación en vivo →
          </Link>
          <Link
            href="/break-even"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Break-Even Inflacionario →
          </Link>
        </div>
      </section>
    </div>
  );
}
