import type { Metadata } from 'next';
import Link from 'next/link';
import { glosario, groupGlossaryByCategory } from '@/data/glosario';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Glosario macroeconómico de Argentina',
  description:
    'Definiciones claras y prácticas de los conceptos clave de la economía argentina: riesgo país, IPC, EMAE, dólar MEP, blue, CCL, balanza comercial y más. Sin tecnicismos innecesarios.',
  alternates: { canonical: `${SITE_URL}/glosario` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/glosario`,
    title: 'Glosario macroeconómico de Argentina | MacroLibre',
    description:
      'Definiciones claras de los conceptos clave de la economía argentina: riesgo país, IPC, EMAE, dólar MEP/blue/CCL, balanza comercial.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

export default function GlosarioPage() {
  const grouped = groupGlossaryByCategory();
  const categories = Object.keys(grouped);

  // ─── JSON-LD: CollectionPage con la lista completa ───
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Glosario macroeconómico de Argentina',
    description: metadata.description,
    url: `${SITE_URL}/glosario`,
    inLanguage: 'es-AR',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: glosario.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/glosario/${g.slug}`,
        name: g.term,
      })),
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="text-sm text-theme-muted hover:text-ar-celeste transition-colors mb-6 inline-block"
      >
        ← Volver al Dashboard
      </Link>

      {/* Hero */}
      <header className="mb-10">
        <p className="text-[11px] font-mono text-theme-faint uppercase tracking-widest mb-2">
          MacroLibre · Glosario
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-theme-primary mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Glosario macroeconómico
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary leading-relaxed max-w-3xl">
          Definiciones claras de los conceptos que aparecen en titulares todos
          los días — sin economista al lado para traducir.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-ar-celeste/30 via-ar-gold/20 to-transparent" />
      </header>

      {/* Listado por categoría */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <section key={cat}>
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-theme-faint mb-4">
              {cat}
            </h2>
            <div className="space-y-3">
              {grouped[cat].map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/glosario/${entry.slug}`}
                  className="group block bg-theme-card border border-theme rounded-xl p-5 card-hover"
                >
                  <h3 className="text-lg font-semibold text-theme-primary group-hover:text-ar-celeste transition-colors mb-2">
                    {entry.term}
                  </h3>
                  <p className="text-sm text-theme-secondary leading-relaxed line-clamp-2">
                    {entry.shortDef}
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-theme-faint">
                    Fuente: {entry.source}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <section className="mt-12 p-6 bg-gradient-to-br from-ar-celeste/5 to-ar-gold/5 border border-ar-celeste/20 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-theme-primary mb-2">
          ¿Falta un concepto?
        </h3>
        <p className="text-sm text-theme-secondary mb-4">
          Mandanos un mensaje y lo agregamos.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ar-celeste/10 border border-ar-celeste/30 rounded-lg text-sm font-semibold text-ar-celeste hover:bg-ar-celeste/20 transition-all"
        >
          Sugerir un concepto →
        </Link>
      </section>
    </div>
  );
}
