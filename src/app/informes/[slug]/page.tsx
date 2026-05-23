import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { informes } from '@/data/informes';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return informes.map((inf) => ({ slug: inf.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const inf = informes.find((i) => i.slug === slug);
  if (!inf) return { title: 'Informe no encontrado — MacroLibre' };

  const url = `https://macrolibre.com/informes/${inf.slug}`;

  return {
    title: `${inf.titulo} — MacroLibre`,
    description: inf.descripcion,
    keywords: [
      `informe macroeconómico argentina ${inf.mes.toLowerCase()}`,
      'análisis económico argentina',
      'proyecciones inflación tipo de cambio',
      'coyuntura económica argentina 2026',
      'INDEC BCRA ministerio economía',
      ...inf.tags.map((t) => t.toLowerCase()),
    ],
    authors: [{ name: 'Equipo MacroLibre', url: 'https://macrolibre.com' }],
    openGraph: {
      title: `${inf.titulo} — MacroLibre`,
      description: inf.descripcion,
      url,
      type: 'article',
      publishedTime: inf.fecha,
      authors: ['https://macrolibre.com'],
      tags: inf.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${inf.titulo} — MacroLibre`,
      description: inf.descripcion,
    },
    alternates: { canonical: url },
  };
}

export default async function InformePage({ params }: Props) {
  const { slug } = await params;
  const inf = informes.find((i) => i.slug === slug);
  if (!inf) notFound();

  // Structured data JSON-LD para Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: inf.titulo,
    description: inf.descripcion,
    datePublished: inf.fecha,
    author: {
      '@type': 'Organization',
      name: 'MacroLibre',
      url: 'https://macrolibre.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MacroLibre',
      url: 'https://macrolibre.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://macrolibre.com/MACRO.png',
      },
    },
    inLanguage: 'es-AR',
    url: `https://macrolibre.com/informes/${inf.slug}`,
    about: {
      '@type': 'Thing',
      name: 'Macroeconomía Argentina',
    },
    keywords: inf.tags.join(', '),
  };

  return (
    <>
      {/* JSON-LD para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-[var(--fg-3)] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--celeste)] transition-colors">Inicio</Link>
          <span>›</span>
          <Link href="/informes" className="hover:text-[var(--celeste)] transition-colors">Informes</Link>
          <span>›</span>
          <span className="text-[var(--fg-2)]">{inf.mes}</span>
        </nav>

        {/* Cover */}
        <header className="mb-10 pb-8 border-b border-[var(--line-1)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[var(--celeste)]/30 text-[var(--celeste)] bg-[var(--celeste)]/8">
              {inf.edicion}
            </span>
            <span className="text-[10px] font-mono text-[var(--fg-3)]">
              {new Date(inf.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)] mb-4 leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {inf.titulo}
          </h1>
          <p className="text-[var(--fg-2)] text-base leading-relaxed max-w-2xl mb-6">{inf.descripcion}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {inf.tags.map((t) => (
              <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--bg-2)] text-[var(--fg-2)] border border-[var(--line-1)]">
                {t}
              </span>
            ))}
          </div>

          {/* KPIs del resumen */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {inf.kpis.map((k) => (
              <div key={k.etiqueta} className="p-3 rounded-lg bg-[var(--bg-1)] border border-[var(--line-1)]">
                <div className="text-[18px] font-bold font-mono text-[var(--celeste)] leading-none mb-1">{k.valor}</div>
                <div className="text-[11px] font-semibold text-[var(--fg-1)] leading-tight">{k.etiqueta}</div>
                <div className="text-[10px] text-[var(--fg-3)] leading-tight mt-0.5">{k.sublabel}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Disclaimer */}
        <div className="mb-8 p-3 rounded-lg bg-[var(--sol)]/8 border border-[var(--sol)]/20 text-[11px] text-[var(--fg-2)] font-mono">
          ⚠️ Este informe es elaborado con fines de análisis y divulgación. No constituye asesoramiento de inversión.
        </div>

        {/* Índice */}
        <nav className="mb-10 p-5 rounded-xl bg-[var(--bg-1)] border border-[var(--line-1)]" aria-label="Índice del informe">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-3)] mb-3">Contenido</p>
          <ol className="space-y-1.5">
            {inf.secciones.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="text-[13px] text-[var(--fg-2)] hover:text-[var(--celeste)] transition-colors"
                >
                  {sec.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Secciones */}
        <div className="space-y-14">
          {inf.secciones.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-20">
              <h2
                className="text-xl sm:text-2xl font-bold text-[var(--fg-0)] mb-5 pb-3 border-b border-[var(--line-1)]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {sec.titulo}
              </h2>

              {/* Imagen si hay */}
              {sec.imagen && (
                <div className="mb-6 rounded-xl overflow-hidden border border-[var(--line-1)] bg-[var(--bg-1)]">
                  <Image
                    src={sec.imagen}
                    alt={sec.imagenAlt ?? sec.titulo}
                    width={900}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority={sec.id === 'actividad'}
                  />
                </div>
              )}

              {/* Contenido HTML */}
              <div
                className="informe-content prose-informe text-[var(--fg-1)] text-[14px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sec.contenido }}
              />
            </section>
          ))}
        </div>

        {/* Footer del informe */}
        <footer className="mt-14 pt-8 border-t border-[var(--line-1)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--fg-3)] mb-1">Equipo de Análisis</p>
              <p className="text-sm font-semibold text-[var(--fg-1)]">MacroLibre.com</p>
              <p className="text-[11px] text-[var(--fg-3)]">Publicado el {new Date(inf.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Descargar DOCX */}
            <a
              href={inf.docxPath}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--celeste)] text-[var(--bg-0)] text-[13px] font-semibold hover:opacity-90 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar informe (.docx)
            </a>
          </div>
        </nav>

        {/* Volver */}
        <div className="mt-8 pt-6 border-t border-[var(--line-1)]">
          <Link href="/informes" className="text-sm text-[var(--fg-3)] hover:text-[var(--celeste)] transition-colors">
            ← Ver todos los informes
          </Link>
        </div>
      </article>
    </>
  );
}
