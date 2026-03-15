import Link from 'next/link';
import { articles } from '@/data/articles';

export const metadata = {
  title: 'Artículos — MacroLibre',
  description: 'Análisis y opinión sobre la economía argentina.',
};

export default function ArticulosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <Link href="/" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors mb-4 inline-block">
          ← Volver al Dashboard
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-theme-primary mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Artículos
        </h1>
        <p className="text-theme-secondary">Análisis y opinión sobre la macroeconomía argentina.</p>
        <div className="mt-4 h-px bg-gradient-to-r from-ar-celeste/30 via-ar-gold/20 to-transparent" />
      </div>

      <div className="space-y-5">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articulos/${a.slug}`} className="group flex flex-col sm:flex-row gap-5 bg-theme-card border border-theme rounded-xl p-5 sm:p-6 card-hover">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-theme-surface border border-theme flex items-center justify-center text-3xl">
              {a.image}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 flex-wrap mb-2">
                {a.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-ar-celeste/10 text-ar-celeste border border-ar-celeste/20">{t}</span>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-theme-primary group-hover:text-ar-celeste transition-colors mb-1.5 leading-snug">{a.title}</h2>
              <p className="text-sm text-theme-secondary line-clamp-2 mb-3">{a.summary}</p>
              <div className="flex items-center gap-3 text-xs text-theme-muted flex-wrap">
                <span className="font-medium text-theme-secondary">{a.author}</span>
                <span>·</span>
                <span>{a.authorRole}</span>
                <span>·</span>
                <span>{a.date}</span>
                <span>·</span>
                <span>{a.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
