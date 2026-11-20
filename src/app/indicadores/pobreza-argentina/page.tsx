import type { Metadata } from 'next';
import Link from 'next/link';
import { PobrezaChart, SalarioRealChart } from '@/components/Charts';
import { pobrezaData } from '@/data/macroData';
import { indec, pobrezaUltimo, fuenteIndec, num, periodoLargo } from '@/data/indec';

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
    a: `Según el último dato del INDEC (${periodoLargo(pobrezaUltimo.periodo)}${pobrezaUltimo.observaciones ? `, ${pobrezaUltimo.observaciones.toLowerCase()}` : ''}), la pobreza alcanza al ${num(pobrezaUltimo.personas)}% de las personas y la indigencia al ${num(pobrezaUltimo.indigenciaPersonas)}% (31 aglomerados urbanos, EPH). El pico de la serie fue el primer semestre de 2024 (52,9%). Fuente: ${fuenteIndec(indec.pobreza)}.`,
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
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-5 md:pb-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Link href="/" className="text-sm text-[var(--fg-2)] hover:text-[var(--celeste)] transition mb-3 inline-block">
        ← Volver al Dashboard
      </Link>

      <header className="mb-8">
        <p className="text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-widest mb-2">
          MacroLibre · Indicadores · Pobreza e indigencia
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--fg-0)] mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Tasa de pobreza e indigencia en Argentina
        </h1>
        {(() => {
          const ultimo = pobrezaData[pobrezaData.length - 1];
          const pct = ultimo.value.toFixed(1).replace('.', ',');
          return (
            <div className="mb-5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-3)]">
                Pobreza · {ultimo.period} · % de la población
              </p>
              <p className="text-5xl sm:text-6xl font-semibold text-[var(--fg-0)] font-mono leading-none mt-1">
                {pct}%
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-[12px] font-mono text-[var(--fg-2)]">
                {[
                  ['Hogares', num(pobrezaUltimo.hogares)],
                  ['Indigencia personas', num(pobrezaUltimo.indigenciaPersonas)],
                  ['Indigencia hogares', num(pobrezaUltimo.indigenciaHogares)],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <span key={k}>{k}: <strong className="text-[var(--fg-0)]">{v}%</strong></span>
                ))}
              </div>
              <p className="text-[11px] text-[var(--fg-3)] mt-1">
                {pobrezaUltimo.observaciones ? `${pobrezaUltimo.observaciones} · ` : ''}31 aglomerados urbanos · Fuente: {fuenteIndec(indec.pobreza)}
              </p>
            </div>
          );
        })()}
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
        {/* Canastas CBA/CBT (API del INDEC) — solo celdas con dato */}
        {indec.canastas.regiones.map((r) => (
          <div key={r.region} className="border border-[var(--line-1)] rounded-xl p-5 overflow-x-auto">
            <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">
              Canasta Básica Alimentaria y Total · {r.region} · {periodoLargo(indec.canastas.periodo)}
            </h2>
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="text-[var(--fg-3)] text-xs uppercase">
                  <th className="text-left py-1 pr-4"></th>
                  <th className="text-right py-1 pr-4">Adulto equiv.</th>
                  <th className="text-right py-1 pr-4">Hogar 1</th>
                  <th className="text-right py-1 pr-4">Hogar 2</th>
                  <th className="text-right py-1 pr-4">Hogar 3</th>
                  <th className="text-right py-1 pr-4">Mensual</th>
                  <th className="text-right py-1">Interanual</th>
                </tr>
              </thead>
              <tbody>
                {([['CBA (indigencia)', r.cba], ['CBT (pobreza)', r.cbt]] as const).map(([k, c]) => (
                  <tr key={k} className="border-t border-[var(--line-1)] text-[var(--fg-0)]">
                    <td className="py-1 pr-4 font-sans text-[13px]">{k}</td>
                    <td className="text-right py-1 pr-4">{c.adultoEquivalente != null ? `$${num(c.adultoEquivalente, 0)}` : ''}</td>
                    <td className="text-right py-1 pr-4">{c.hogar1 != null ? `$${num(c.hogar1, 0)}` : ''}</td>
                    <td className="text-right py-1 pr-4">{c.hogar2 != null ? `$${num(c.hogar2, 0)}` : ''}</td>
                    <td className="text-right py-1 pr-4">{c.hogar3 != null ? `$${num(c.hogar3, 0)}` : ''}</td>
                    <td className="text-right py-1 pr-4">{c.mensual != null ? `${num(c.mensual)}%` : ''}</td>
                    <td className="text-right py-1">{c.interanual != null ? `${num(c.interanual)}%` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-[var(--fg-3)] mt-2">
              Hogar 1: 3 integrantes · Hogar 2: 4 integrantes · Hogar 3: 5 integrantes (hogares tipo del INDEC). Fuente: {fuenteIndec(indec.canastas)}.
            </p>
          </div>
        ))}
        <SalarioRealChart />
      </div>

      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">Condiciones de vida de los hogares (1er semestre 2026)</h2>
        <p>
          En el primer semestre de 2026, el 90,9% de los hogares de los 31 aglomerados urbanos tenía acceso a la red de agua corriente, el 64,6% a la red de gas natural y el 73,1% a la red de cloacas, según el INDEC (publicado el 04/11/2026).
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Saneamiento adecuado: 88,4% de los hogares.</li>
          <li>Hacinamiento crítico: 1,8% de los hogares.</li>
          <li>Tenencia: 61,7% propietarios; 20,9% inquilinos.</li>
        </ul>
        <p className="mt-3 text-[12px] text-[var(--fg-2)]">
          Fuente: <a href="https://www.indec.gob.ar/uploads/informesdeprensa/eph_indicadores_hogares_11_269E1CF84248.pdf" className="underline" rel="noopener" target="_blank">INDEC, Indicadores de condiciones de vida de los hogares en 31 aglomerados urbanos. Primer semestre de 2026</a> (EPH, publicado el 04/11/2026).
        </p>
      </section>

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
