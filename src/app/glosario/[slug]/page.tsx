import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { glosario, getGlossaryEntry } from '@/data/glosario';

const SITE_URL = 'https://macrolibre.com';

// ============================================================
// Página individual de un concepto del glosario.
// SEO: cada slug es una landing optimizada para una sola keyword
// long-tail (ej: "qué es el riesgo país").
// ============================================================

export function generateStaticParams() {
  return glosario.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);

  if (!entry) {
    return { title: 'Concepto no encontrado' };
  }

  const url = `${SITE_URL}/glosario/${entry.slug}`;
  return {
    title: `${entry.term} — Definición y ejemplos`,
    description: entry.shortDef.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${entry.term} — Definición clara`,
      description: entry.shortDef.slice(0, 160),
      siteName: 'MacroLibre',
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${entry.term} — MacroLibre`,
      description: entry.shortDef.slice(0, 160),
    },
  };
}

export default async function GlosarioEntryPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();

  const url = `${SITE_URL}/glosario/${entry.slug}`;
  const relatedEntries = entry.related
    .map((s) => getGlossaryEntry(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  // ─── JSON-LD: DefinedTerm + Article + (opcional) FAQPage ───
  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.shortDef,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Glosario macroeconómico de Argentina',
      url: `${SITE_URL}/glosario`,
    },
    url,
    inLanguage: 'es-AR',
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${entry.term} — Definición y ejemplos`,
    description: entry.shortDef,
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: {
      '@type': 'Organization',
      name: 'MacroLibre',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-app-icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: entry.category,
  };

  const faqJsonLd = entry.faq && entry.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: entry.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumbs */}
      <nav className="text-xs text-theme-faint mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-ar-celeste transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/glosario" className="hover:text-ar-celeste transition-colors">
          Glosario
        </Link>
        <span>/</span>
        <span className="text-theme-secondary">{entry.term}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-ar-celeste mb-3">
          {entry.category}
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-theme-primary mb-4 leading-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {entry.term}
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary leading-relaxed mb-5 border-l-2 border-ar-celeste/40 pl-4">
          {entry.shortDef}
        </p>
        <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-theme text-xs">
          <span className="text-theme-muted">
            <span className="text-theme-faint">Fuente:</span> {entry.source}
          </span>
          {entry.relatedRoute && (
            <Link
              href={entry.relatedRoute.href}
              className="ml-auto px-3 py-1.5 bg-ar-celeste/10 border border-ar-celeste/20 rounded-lg text-ar-celeste hover:bg-ar-celeste/20 transition-colors"
            >
              {entry.relatedRoute.label} →
            </Link>
          )}
        </div>
      </header>

      {/* Secciones */}
      <div className="space-y-8">
        {entry.sections.map((s) => (
          <section key={s.heading}>
            <h2
              className="text-xl sm:text-2xl font-bold text-theme-primary mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {s.heading}
            </h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              {s.body.split('\n\n').map((para, i) => (
                <p key={i} className="text-[15px]">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FAQ visible (además del JSON-LD) */}
      {entry.faq && entry.faq.length > 0 && (
        <section className="mt-12 pt-8 border-t border-theme">
          <h2
            className="text-xl sm:text-2xl font-bold text-theme-primary mb-5"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {entry.faq.map((f, i) => (
              <details
                key={i}
                className="group bg-theme-card border border-theme rounded-xl p-5 cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-theme-primary">
                  {f.q}
                  <span className="text-ar-celeste text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-theme-secondary leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Relacionados */}
      {relatedEntries.length > 0 && (
        <section className="mt-12 pt-8 border-t border-theme">
          <h3 className="text-base font-semibold text-theme-primary mb-4">
            Conceptos relacionados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedEntries.map((r) => (
              <Link
                key={r.slug}
                href={`/glosario/${r.slug}`}
                className="group block bg-theme-card border border-theme rounded-xl p-4 card-hover"
              >
                <h4 className="text-sm font-semibold text-theme-primary group-hover:text-ar-celeste transition-colors mb-1">
                  {r.term}
                </h4>
                <p className="text-xs text-theme-muted line-clamp-2">{r.shortDef}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Volver */}
      <div className="mt-10">
        <Link
          href="/glosario"
          className="text-sm text-theme-muted hover:text-ar-celeste transition-colors"
        >
          ← Volver al glosario
        </Link>
      </div>
    </article>
  );
}
