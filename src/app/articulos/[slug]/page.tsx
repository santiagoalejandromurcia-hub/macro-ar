import { articles } from '@/data/articles';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleContent from './ArticleContent';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'No encontrado — MacroLibre' };
  return { title: `${article.title} — MacroLibre`, description: article.summary };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
