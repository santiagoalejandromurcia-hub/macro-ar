import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import UvaContent from './UvaContent';

const SITE_URL = 'https://macrolibre.com';

// ============================================================
// /uva — Mercado de Uva, Vinos y Mostos Argentina
// Keywords objetivo: "mercado de uva argentina", "exportación
// vino argentina", "INV vinos", "vino granel argentina",
// "mosto concentrado argentina", "mercado interno vino".
// ============================================================

export const metadata: Metadata = {
  title: 'Mercado de Uva, Vinos y Mostos Argentina · Exportaciones e interno',
  description:
    'Exportaciones de vinos y mostos, mercado interno por envase y composición del comercio externo de vinos argentinos. Datos oficiales del INV — Instituto Nacional de Vitivinicultura, actualizados agosto 2026.',
  alternates: { canonical: `${SITE_URL}/uva` },
  keywords: [
    'mercado de uva argentina', 'mercado de uva', 'exportación de vino argentina',
    'vino argentino exportaciones', 'INV vinos', 'vino granel argentina',
    'mosto concentrado argentina', 'mercado interno vinos',
    'mendoza vino exportación', 'malbec exportación',
    'comercialización vinos argentina 2026',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/uva`,
    title: 'Mercado de Uva — Vinos y Mostos Argentina | MacroLibre',
    description:
      'Exportaciones de vinos y mostos, mercado interno y composición del comercio externo. Datos oficiales del INV actualizados.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercado de Uva Argentina · MacroLibre',
    description: 'Vinos, mostos, exportaciones y mercado interno. Datos oficiales INV.',
  },
};

const FAQ = [
  {
    q: '¿Cuánto exporta Argentina en vinos y mostos?',
    a: 'En agosto de 2026, las exportaciones totales (vinos + mostos) alcanzaron USD 53,9 millones FOB (−26,2% i.a.). El acumulado enero-agosto fue de USD 490,5 millones, un 5,4% menos que el mismo período de 2025.',
  },
  {
    q: '¿Cuál es la diferencia entre vino fraccionado y vino granel?',
    a: 'El vino fraccionado se exporta en envases listos para el consumidor (botella, tetra brik, lata). El vino granel se exporta en cisternas o tanques y se fracciona en destino. En agosto 2026 el granel se derrumbó 75,1% interanual (11.165 hl).',
  },
  {
    q: '¿Qué es el mosto concentrado?',
    a: 'Es jugo de uva concentrado por evaporación, usado por la industria alimenticia (jugos, dulces, panificados) como edulcorante natural. Argentina es uno de los principales exportadores mundiales. En agosto 2026 facturó USD 8,3M, −39,8% YoY; el acumulado ene-ago sigue +7,4%.',
  },
  {
    q: '¿Cómo está el consumo interno de vino?',
    a: 'En julio de 2026 se comercializaron 649.674 hectolitros en el mercado interno, un 1,4% menos que julio 2025 (+5,0% vs junio). La botella creció +3,6% y la lata +7,4%; el tetra brik cayó 9,9% y la damajuana 28,7%.',
  },
  {
    q: '¿Qué tipo de vino se exporta más?',
    a: 'En agosto 2026 los vinos varietales tintos concentran el 72% del volumen exportado. El único segmento en alza fue el espumoso (+7,1% YoY); el granel se contrajo 75%.',
  },
  {
    q: '¿De dónde salen los datos?',
    a: 'Del INV (Instituto Nacional de Vitivinicultura), Sistema SIM. Mercado externo agosto 2026 e interno julio 2026. Datos provisorios sujetos a revisión por declaraciones juradas y rectificativas.',
  },
];

export default function UvaPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mercado de Uva, Vinos y Mostos Argentina',
    description: metadata.description,
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: {
      '@type': 'Organization',
      name: 'MacroLibre',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-app-icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/uva` },
    articleSection: 'Sector agropecuario',
  };

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Mercado de Uva Argentina — Vinos y Mostos',
    description:
      'Datos mensuales de exportaciones de vinos y mostos, mercado interno por tipo de envase y composición del comercio externo argentino.',
    keywords: [
      'Argentina', 'vino', 'uva', 'mosto', 'INV', 'exportación vino',
      'mercado interno vinos', 'malbec', 'granel', 'fraccionado',
    ],
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    spatialCoverage: { '@type': 'Country', name: 'Argentina' },
    inLanguage: 'es-AR',
    url: `${SITE_URL}/uva`,
    citation:
      'MacroLibre (https://macrolibre.com/uva) basado en datos del INV — Instituto Nacional de Vitivinicultura.',
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
        id="uva"
        title="Mercado de Uva, Vinos y Mostos"
        subtitle="Exportaciones, mercado interno y comercio externo de vinos y mostos argentinos. Fuente: INV — Instituto Nacional de Vitivinicultura."
        accent="magenta"
      />

      <UvaContent />

      {/* ─── Resumen ejecutivo ─── */}
      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">Lo que tenés que saber</h2>
        <p className="mb-3">
          Agosto 2026 fue un mes <strong className="text-[var(--down)]">flojo en el externo</strong>:
          las exportaciones de vinos y mostos cayeron 26,2% interanual (USD 53,9 M).
          El <strong>vino granel</strong> se derrumbó 75,1%. El acumulado ene-ago todavía
          factura USD 490,5 M (−5,4% i.a.), con mostos +7,4%.
        </p>
        <p className="mb-3">
          En el mercado interno, julio 2026 marcó 649.674 hectolitros
          (−1,4% YoY, +5,0% MoM). La <strong>botella</strong> sigue ganando share; el tetra brik
          retrocedió 9,9% interanual.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Los datos son provisorios — sujetos a rectificación por declaraciones juradas
          presentadas fuera de término. Los definitivos se publican en el anuario anual del INV.
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
                <span className="text-[var(--magenta)] text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-1)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Cross-links ─── */}
      <section className="mt-10 p-5 md:p-6 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <h3 className="text-base font-semibold text-[var(--fg-0)] mb-2">Otros sectores</h3>
        <div className="flex flex-wrap gap-2 text-xs mt-4">
          <Link
            href="/carnes"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Mercado de Carnes →
          </Link>
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
            Inflación →
          </Link>
        </div>
      </section>
    </div>
  );
}
