import type { Metadata } from 'next';
import Link from 'next/link';
import { TCRChart, ReservasChart } from '@/components/Charts';
import DolarBlueVivo from '@/components/DolarBlueVivo';
import RiesgoPaisVivo from '@/components/RiesgoPaisVivo';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Tipo de cambio oficial, dólar blue y tipo de cambio real multilateral en Argentina — datos en tiempo real del BCRA',
  description:
    'Cotización del tipo de cambio oficial (mayorista), dólar blue, dólar MEP y CCL en tiempo real. Tipo de cambio real multilateral (TCRM) y brecha cambiaria. Datos oficiales del BCRA actualizados diariamente.',
  alternates: { canonical: `${SITE_URL}/indicadores/tipo-de-cambio` },
  keywords: [
    'tipo de cambio argentina',
    'tipo de cambio oficial argentina hoy',
    'dólar blue hoy argentina',
    'tipo de cambio real multilateral argentina',
    'TCRM BCRA',
    'brecha cambiaria argentina',
    'dólar MEP hoy',
    'dólar CCL',
    'cotización dólar argentina',
    'tipo de cambio BCRA',
    'dólar oficial argentina',
    'tipo de cambio real argentina 2026',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/indicadores/tipo-de-cambio`,
    title: 'Tipo de cambio oficial, dólar blue y TCRM en Argentina — datos en tiempo real del BCRA',
    description: 'Cotización oficial, blue, MEP, CCL y tipo de cambio real multilateral. Datos BCRA actualizados.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

const FAQ = [
  {
    q: '¿Cuál es el tipo de cambio oficial de Argentina hoy?',
    a: 'El tipo de cambio oficial (mayorista) es la cotización que fija el BCRA mediante su política cambiaria. Podés verlo en tiempo real en el dashboard de MacroLibre, donde se actualiza cada hora con datos de Bluelytics y el BCRA.',
  },
  {
    q: '¿Qué diferencia hay entre el tipo de cambio oficial y el dólar blue?',
    a: 'El oficial es el fijado por el BCRA para transacciones formales. El dólar blue es el precio en el mercado informal. La diferencia entre ambos, expresada en porcentaje, se llama brecha cambiaria. En mayo 2026, con el esquema de bandas cambiarias, la brecha se ubica por debajo del 5%.',
  },
  {
    q: '¿Qué es el tipo de cambio real multilateral (TCRM)?',
    a: 'El TCRM mide el poder de compra del peso argentino frente a una canasta de monedas de los principales socios comerciales del país (Brasil, China, Eurozona, EE.UU., entre otros), ajustado por diferencial de inflación. Es el indicador que usa el BCRA para evaluar la competitividad cambiaria.',
  },
  {
    q: '¿Qué son las bandas cambiarias?',
    a: 'El esquema de bandas cambiarias establece un piso y un techo para el tipo de cambio oficial. Si el mercado empuja la cotización fuera de esas bandas, el BCRA interviene comprando o vendiendo divisas. Es el régimen vigente en Argentina desde 2025.',
  },
  {
    q: '¿Dónde publica el BCRA el tipo de cambio oficial?',
    a: 'El BCRA publica la cotización de referencia diariamente en bcra.gob.ar. MacroLibre la toma automáticamente y la muestra junto con el blue y los tipos de cambio financieros para facilitar la comparación.',
  },
];

export default function TipoDeCambioPage() {
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
    headline: 'Tipo de cambio oficial, dólar blue y tipo de cambio real multilateral en Argentina',
    description: String(metadata.description),
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/indicadores/tipo-de-cambio` },
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
          MacroLibre · Indicadores · Tipo de cambio
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)] mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Tipo de cambio oficial, dólar blue y tipo de cambio real multilateral en Argentina
        </h1>
        <p className="text-[15px] text-[var(--fg-1)] leading-relaxed max-w-3xl">
          El <strong>tipo de cambio oficial</strong> de Argentina (mayorista BCRA), el <strong>dólar blue</strong>,
          el dólar MEP y el CCL actualizados en tiempo real. Incluye el{' '}
          <strong>tipo de cambio real multilateral (TCRM)</strong> del BCRA y la{' '}
          <strong>brecha cambiaria</strong> entre el dólar oficial y los tipos de cambio paralelos.
          Datos oficiales del BCRA e INDEC.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-[var(--celeste)]/30 via-[var(--sol)]/20 to-transparent" />
      </header>

      {/* Live widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <div className="md:col-span-2 lg:col-span-3">
          <DolarBlueVivo />
        </div>
        <RiesgoPaisVivo />
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <TCRChart />
        <ReservasChart />
      </div>

      {/* Explicación */}
      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">Cómo leer el tipo de cambio en Argentina</h2>
        <p className="mb-3">
          Argentina tiene un sistema cambiario complejo con múltiples tipos de cambio que coexisten.
          El <strong className="text-[var(--fg-0)]">tipo de cambio oficial</strong> (mayorista) es el que fija el BCRA
          para transacciones comerciales formales: exportaciones, importaciones y operaciones del sistema financiero.
        </p>
        <p className="mb-3">
          El <strong className="text-[var(--fg-0)]">tipo de cambio real multilateral (TCRM)</strong> ajusta el tipo de cambio
          nominal por la inflación relativa entre Argentina y sus socios comerciales. Cuando el TCRM sube, el peso se deprecia en términos reales
          y las exportaciones argentinas se vuelven más competitivas. Es el indicador que más miran los exportadores y el BCRA.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Fuentes: BCRA (tipo de cambio oficial y TCRM), Bluelytics (dólar blue), ArgentinaDatos (dólar MEP/CCL).
          Actualización: cada hora en días hábiles.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-[var(--fg-0)] mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details key={i} className="group glass p-5 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-[var(--fg-0)]">
                {f.q}
                <span className="text-[var(--celeste)] text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-1)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="mt-10 p-5 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <h3 className="text-base font-semibold text-[var(--fg-0)] mb-3">Indicadores relacionados</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { href: '/indicadores/inflacion-argentina', label: 'Inflación Argentina →' },
            { href: '/indicadores/reservas-bcra', label: 'Reservas BCRA →' },
            { href: '/glosario/dolar-mep-blue-ccl', label: 'Glosario: Dólar MEP, Blue y CCL →' },
            { href: '/glosario/brecha-cambiaria', label: 'Glosario: Brecha Cambiaria →' },
            { href: '/calculadora', label: 'Calculadora histórica →' },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition">
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
