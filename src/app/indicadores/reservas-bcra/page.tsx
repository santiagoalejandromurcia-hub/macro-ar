import type { Metadata } from 'next';
import Link from 'next/link';
import { ReservasChart } from '@/components/Charts';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Reservas internacionales y reservas netas del BCRA — datos en tiempo real · Argentina 2026',
  description:
    'Reservas internacionales brutas y reservas netas del BCRA actualizadas diariamente. Evolución histórica, composición y comparación regional. Datos oficiales del Banco Central de la República Argentina.',
  alternates: { canonical: `${SITE_URL}/indicadores/reservas-bcra` },
  keywords: [
    'reservas internacionales Argentina',
    'reservas netas BCRA',
    'reservas BCRA hoy',
    'reservas brutas BCRA',
    'reservas banco central argentina',
    'acumulación reservas BCRA 2026',
    'reservas internacionales brutas',
    'nivel reservas argentina',
    'BCRA reservas 2026',
    'dólares BCRA',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/indicadores/reservas-bcra`,
    title: 'Reservas internacionales y reservas netas BCRA — Argentina 2026',
    description: 'Reservas internacionales brutas y netas del BCRA actualizadas diariamente. Datos oficiales del Banco Central.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

const FAQ = [
  {
    q: '¿Cuántas reservas internacionales tiene el BCRA hoy?',
    a: 'Las reservas internacionales brutas del BCRA se ubican en torno a los USD 46.000 millones en mayo de 2026, según los últimos datos publicados por el BCRA. Podés ver el dato actualizado diariamente en el dashboard de MacroLibre.',
  },
  {
    q: '¿Qué diferencia hay entre reservas brutas y reservas netas?',
    a: 'Las reservas brutas son el total de activos externos del BCRA (oro, divisas, DEGs, etc.). Las reservas netas descuentan los pasivos de corto plazo: encajes de depósitos en dólares de bancos privados, swaps de monedas (principalmente con China) y otras obligaciones. Las netas son el dato más relevante para evaluar la capacidad real de intervención del BCRA.',
  },
  {
    q: '¿Por qué son importantes las reservas para Argentina?',
    a: 'Las reservas son el "colchón" que tiene el BCRA para sostener el tipo de cambio, hacer frente a vencimientos de deuda en moneda extranjera y dar señales de estabilidad al mercado. Argentina históricamente ha tenido problemas de escasez de reservas que terminaron en crisis cambiarias. La acumulación de reservas es una condición para la normalización del mercado de cambios.',
  },
  {
    q: '¿Cómo acumula reservas el BCRA?',
    a: 'El BCRA acumula reservas principalmente comprando divisas en el mercado cambiario cuando los exportadores liquidan sus dólares. También recibe desembolsos del FMI y otros organismos internacionales. En el primer cuatrimestre de 2026, el BCRA acumuló más de USD 3.000 millones gracias a la liquidación de la cosecha gruesa.',
  },
  {
    q: '¿Qué son los DEGs?',
    a: 'Los Derechos Especiales de Giro (DEGs) son el activo de reserva internacional que emite el FMI. Argentina recibió DEGs en la asignación especial de 2021. Forman parte de las reservas brutas del BCRA.',
  },
];

export default function ReservasBCRAPage() {
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
    headline: 'Reservas internacionales y reservas netas del BCRA en Argentina 2026',
    description: String(metadata.description),
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/indicadores/reservas-bcra` },
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
          MacroLibre · Indicadores · Reservas BCRA
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)] mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Reservas internacionales y reservas netas del BCRA
        </h1>
        <p className="text-[15px] text-[var(--fg-1)] leading-relaxed max-w-3xl">
          Evolución de las <strong>reservas internacionales</strong> brutas y{' '}
          <strong>reservas netas del BCRA</strong> actualizadas diariamente.
          Las reservas son el indicador más seguido del mercado para evaluar la solidez
          del programa económico y la capacidad de intervención cambiaria del Banco Central.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-[var(--celeste)]/30 via-[var(--up)]/20 to-transparent" />
      </header>

      <div className="space-y-6">
        <ReservasChart />
      </div>

      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">¿Por qué mirar las reservas netas y no solo las brutas?</h2>
        <p className="mb-3">
          Las <strong className="text-[var(--fg-0)]">reservas internacionales brutas</strong> incluyen
          activos que en la práctica el BCRA no puede usar libremente: los encajes de depósitos
          en dólares de los bancos privados (que pertenecen a los ahorristas, no al Estado),
          los swaps de monedas con China (que hay que devolver), y otros pasivos.
        </p>
        <p className="mb-3">
          Las <strong className="text-[var(--fg-0)]">reservas netas</strong> — que descuentan esos compromisos —
          son el dato que mira el FMI y los analistas para evaluar la posición externa real.
          En los peores momentos de 2023, las reservas netas fueron <em>negativas</em> en más de
          USD 10.000 millones, lo que generaba una situación de alta fragilidad cambiaria.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Fuente: BCRA — Subgerencia General de Estadísticas y Censos. Publicación diaria en bcra.gob.ar.
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
                <span className="text-[var(--celeste)] text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
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
            { href: '/indicadores/tipo-de-cambio', label: 'Tipo de cambio →' },
            { href: '/indicadores/resultado-fiscal', label: 'Resultado fiscal →' },
            { href: '/granos', label: 'Mercado de Granos (divisas del agro) →' },
            { href: '/glosario/balanza-comercial', label: 'Glosario: Balanza Comercial →' },
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
