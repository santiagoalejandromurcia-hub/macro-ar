import { articles } from '@/data/articles';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

const SITE_URL = 'https://macrolibre.com';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

// ============================================================
// generateMetadata — esto es lo que ve Google y lo que aparece
// cuando alguien comparte el link en WhatsApp/Twitter/LinkedIn.
// ============================================================
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado',
      description: 'Esta página no existe en MacroLibre.',
    };
  }

  const url = `${SITE_URL}/articulos/${article.slug}`;
  // Nota: NO seteamos `images` acá. Next 15 inyecta automáticamente la
  // OG generada por opengraph-image.tsx que está en la misma carpeta.
  // Eso nos da una imagen con el título del artículo en lugar de la OG global.

  return {
    title: article.title,
    description: article.summary,
    authors: [{ name: article.author }],
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.summary,
      siteName: 'MacroLibre',
      locale: 'es_AR',
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
    },
  };
}

// ─── Helper: convierte "8 de marzo de 2026" → ISO 2026-03-08 ───
// Google premia tener `datePublished` en formato ISO en el JSON-LD.
function parseSpanishDate(dateStr: string): string {
  const meses: Record<string, string> = {
    enero: '01', febrero: '02', marzo: '03', abril: '04',
    mayo: '05', junio: '06', julio: '07', agosto: '08',
    septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
  };
  const m = dateStr.toLowerCase().match(/(\d+)\s+de\s+(\w+)\s+de\s+(\d{4})/);
  if (!m) return new Date().toISOString();
  const [, day, monthName, year] = m;
  const month = meses[monthName] ?? '01';
  return `${year}-${month}-${day.padStart(2, '0')}T00:00:00-03:00`;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const url = `${SITE_URL}/articulos/${article.slug}`;
  const datePublished = parseSpanishDate(article.date);

  // ─── JSON-LD Article schema ───
  // Esto es lo que activa los "rich results" en Google: foto del autor,
  // fecha, título destacado en la SERP. Crítico para CTR.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MacroLibre',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-app-icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: `${SITE_URL}/articulos/${article.slug}/opengraph-image`,
    keywords: article.tags.join(', '),
    inLanguage: 'es-AR',
    articleSection: article.tags[0] ?? 'Economía',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/articulos" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors mb-6 inline-block">
        ← Todos los artículos
      </Link>

      <header className="mb-8">
        <div className="flex gap-2 flex-wrap mb-3">
          {article.tags.map((t) => (
            <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-ar-celeste/10 text-ar-celeste border border-ar-celeste/20">{t}</span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-theme-primary mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {article.title}
        </h1>
        <p className="text-base text-theme-secondary mb-5 leading-relaxed">{article.summary}</p>
        <div className="flex items-center gap-4 pb-6 border-b border-theme">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ar-celeste to-ar-gold flex items-center justify-center text-white font-bold text-sm">
            {article.author[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-theme-primary">{article.author}</p>
            <p className="text-xs text-theme-muted">{article.authorRole}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-theme-muted">{article.date}</p>
            <p className="text-xs text-theme-faint">{article.readTime} de lectura</p>
          </div>
        </div>
      </header>

      <ArticleContent content={article.content} />

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-theme">
          <h3 className="text-lg font-semibold text-theme-primary mb-4">Artículos relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((a) => (
              <Link key={a.slug} href={`/articulos/${a.slug}`} className="group bg-theme-card border border-theme rounded-xl p-4 card-hover block">
                <span className="text-2xl mb-2 block">{a.image}</span>
                <h4 className="text-sm font-semibold text-theme-primary group-hover:text-ar-celeste transition-colors mb-1">{a.title}</h4>
                <p className="text-xs text-theme-muted">{a.author} · {a.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
