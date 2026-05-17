import type { Metadata } from 'next';
import Link from 'next/link';
import { PobrezaChart, SalarioRealChart } from '@/components/Charts';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Tasa de pobreza e indigencia en Argentina — datos INDEC 2026',
  description:
    'Tasa de pobreza Argentina e indigencia actualizadas. Datos INDEC semestral: porcentaje de personas y hogares bajo la línea de pobreza y la línea de indigencia. Serie histórica y evolución 2016-2026.',
  alternates: { canonical: `${SITE_URL}/indicadores/pobreza-argentina` },
  keywords: [
    'tasa de pobreza Argentina',
    'indigencia INDEC',
    'pobreza Argentina 2026',
    'línea de pobreza Argentina',
    'pobreza INDEC',
    'pobreza e indigencia Argentina',
    'EPH encuesta hogares INDEC',
    'pobreza Argentina datos oficiales',
    'cuántos pobres hay en Argentina',
    'pobreza Argentina porcentaje',
    'indigencia Argentina 2026',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/indicadores/pobreza-argentina`,
    title: 'Tasa de pobreza e indigencia en Argentina — datos INDEC 2026',
    description: 'Pobreza e indigencia en Argentina: porcentaje de personas y hogares bajo la línea de pobreza. Datos oficiales INDEC.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

const FAQ = [
  {
    q: '¿Cuál es la tasa de pobreza en Argentina en 2026?',
    a: 'Según los últimos datos del INDEC (segundo semestre 2025), la tasa de pobreza en Argentina se ubica en torno al 36-38% de las personas. Es una mejora respecto al pico del primer semestre 2024, cuando rozó el 53%. Los datos del primer semestre 2026 se publicarán en septiembre 2026.',
  },
  {
    q: '¿Qué es la línea de pobreza?',
    a: 'La línea de pobreza es el ingreso mínimo que necesita un hogar para adquirir una canasta de bienes y servicios básicos (alimentarios y no alimentarios). Si el ingreso del hogar está por debajo de esa línea, se considera pobre. El INDEC actualiza la canasta mensualmente según la variación del IPC.',
  },
  {
    q: '¿Qué diferencia hay entre pobreza e indigencia?',
    a: 'La indigencia (pobreza extrema) se define por la línea de indigencia, que es solo la parte alimentaria de la canasta básica. Un hogar indigente no puede cubrir ni sus necesidades calóricas mínimas. La pobreza cubre eso más el resto (vestimenta, transporte, educación, etc.).',
  },
  {
    q: '¿Con qué frecuencia publica el INDEC los datos de pobreza?',
    a: 'El INDEC publica los datos de pobreza e indigencia semestralmente, basados en la Encuesta Permanente de Hogares (EPH). Los datos del primer semestre de cada año se publican en septiembre; los del segundo semestre, en marzo-abril del año siguiente.',
  },
  {
    q: '¿Por qué subió tanto la pobreza en el primer semestre 2024?',
    a: 'El shock inflacionario de diciembre 2023-enero 2024 (con inflación mensual del 25% y 20%) destruyó el poder adquisitivo de los salarios y las jubilaciones antes de que el programa de estabilización pudiera mostrar resultados. La pobreza tocó el 52.9% en el primer semestre 2024, el nivel más alto desde la crisis de 2001-2002.',
  },
];

export default function PobrezaArgentinaPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Tasa de pobreza e indigencia en Argentina — datos INDEC 2026',
    description: String(metadata.description),
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/indicadores/pobreza-argentina` },
    about: [
      { '@type': 'Thing', name: 'Tasa de pobreza Argentina' },
      { '@type': 'Thing', name: 'Indigencia INDEC' },
    ],
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Link href="/" className="text-sm text-[var(--fg-2)] hover:text-[var(--celeste)] transition mb-6 inline-block">
        ← Volver al Dashboard
      </Link>

      <header className="mb-10">
        <p className="text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-widest mb-2">
          MacroLibre · Indicadores · Pobreza e indigencia
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)] mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Tasa de pobreza e indigencia en Argentina
        </h1>
        <p className="text-[15px] text-[var(--fg-1)] leading-relaxed max-w-3xl">
          Evolución de la <strong>tasa de pobreza en Argentina</strong> y la <strong>indigencia</strong>
          según el INDEC (Encuesta Permanente de Hogares). Porcentaje de personas y hogares bajo la
          línea de pobreza y la línea de indigencia, con serie histórica desde 2016.
          Los datos del <strong>INDEC</strong> se publican semestralmente.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-[var(--magenta)]/30 via-[var(--down)]/10 to-transparent" />
      </header>

      <div className="space-y-6">
        <PobrezaChart />
        <SalarioRealChart />
      </div>

      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">Cómo se mide la pobreza en Argentina</h2>
        <p className="mb-3">
          El INDEC mide la <strong className="text-[var(--fg-0)]">tasa de pobreza en Argentina</strong> a
          través de la Encuesta Permanente de Hogares (EPH), que releva los ingresos de hogares en
          31 aglomerados urbanos. Un hogar es pobre cuando su ingreso total no alcanza para comprar
          la Canasta Básica Total (CBT), que incluye alimentos, vestimenta, educación, salud y transporte.
        </p>
        <p className="mb-3">
          La <strong className="text-[var(--fg-0)]">indigencia</strong> se mide contra la
          Canasta Básica Alimentaria (CBA), que es solo el componente de alimentos. La CBA es
          aproximadamente la mitad del valor de la CBT.
          Ambas canastas se actualizan mensualmente siguiendo la evolución del IPC.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Fuente: INDEC — Encuesta Permanente de Hogares (EPH). Publicación semestral.
          Los datos cubren 31 aglomerados urbanos del país. No incluye población rural.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-[var(--fg-0)] mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details key={i} className="group glass p-5 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-[var(--fg-0)]">
                {f.q}
                <span className="text-[var(--magenta)] text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-1)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 p-5 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <h3 className="text-base font-semibold text-[var(--fg-0)] mb-3">Indicadores relacionados</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { href: '/indicadores/inflacion-argentina', label: 'Inflación Argentina →' },
            { href: '/indicadores/resultado-fiscal', label: 'Resultado fiscal →' },
            { href: '/indicadores/tipo-de-cambio', label: 'Tipo de cambio →' },
            { href: '/glosario/inflacion-ipc', label: 'Glosario: Inflación e IPC →' },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--magenta)]/40 hover:text-[var(--magenta)] transition">
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
