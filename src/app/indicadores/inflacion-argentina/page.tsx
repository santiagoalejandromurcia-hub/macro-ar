import type { Metadata } from 'next';
import Link from 'next/link';
import { InflacionMensualChart, InflacionInteranualChart, REMChart, InflacionLargoPlazoChart } from '@/components/Charts';
import InflacionMayoristaChart from '@/components/InflacionMayoristaChart';
import { inflacionData, inflacionMayoristaData } from '@/data/macroData';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Inflación Argentina — IPC mensual, inflación interanual y expectativas 2026 · INDEC',
  description:
    'IPC octubre 2026: 2,2% mensual, 33,1% interanual, 26,3% acumulado, núcleo 1,5%. IPIM septiembre 3,2% (29,2% i.a.). Expectativas REM del BCRA. Datos oficiales INDEC.',
  alternates: { canonical: `${SITE_URL}/indicadores/inflacion-argentina` },
  keywords: [
    'inflación Argentina',
    'IPC Argentina',
    'inflación mensual Argentina',
    'inflación interanual Argentina',
    'inflación núcleo Argentina',
    'inflación INDEC',
    'IPC INDEC',
    'inflación argentina 2026',
    'inflación marzo 2026',
    'inflación abril 2026',
    'inflación mayo 2026',
    'inflación junio 2026',
    'inflación julio 2026',
    'inflación septiembre 2026',
    'inflación octubre 2026',
    'IPIM argentina',
    'inflación mayorista argentina',
    'REM BCRA expectativas inflación',
    'tasa de inflación argentina hoy',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/indicadores/inflacion-argentina`,
    title: 'Inflación Argentina — IPC mensual e interanual 2026 · INDEC',
    description: 'IPC Argentina, inflación mensual, interanual, núcleo, mayorista y expectativas REM. Datos INDEC actualizados.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

const FAQ = [
  {
    q: '¿Cuál fue la inflación mensual en Argentina en octubre 2026?',
    a: 'La inflación mensual de octubre 2026 fue del 2,2% según el IPC del INDEC (publicado 12/11/2026), frente al 1,9% de septiembre. La variación interanual fue 33,1% y el acumulado enero–octubre 26,3%. El IPC núcleo fue 1,5% (30,7% interanual). Los estacionales subieron 5,5%, los regulados 2,9%, los bienes 1,9% y los servicios 2,7%. La división de mayor aumento fue Vivienda, agua, electricidad, gas y otros combustibles (4,2%); le siguió Recreación y cultura (3,3%). Alimentos y bebidas no alcohólicas subió 2,0%. Las de menor aumento fueron Bebidas alcohólicas y tabaco (0,8%) y Educación (1,3%). El IPIM mayorista de septiembre fue 3,2% mensual y 29,2% interanual (INDEC 16/10/2026).',
  },
  {
    q: '¿Qué es el IPC Argentina?',
    a: 'El IPC (Índice de Precios al Consumidor) de Argentina mide la variación mensual de los precios de una canasta representativa de bienes y servicios que consume un hogar urbano promedio. Lo publica el INDEC entre los días 11 y 14 de cada mes, con un rezago de aproximadamente 45 días.',
  },
  {
    q: '¿Cuál es la diferencia entre inflación mensual e inflación interanual?',
    a: 'La inflación mensual compara el nivel de precios del mes contra el mes anterior. La inflación interanual compara contra el mismo mes del año pasado. La interanual es mejor para evaluar tendencias de mediano plazo; la mensual muestra el momentum actual. Para ver si la inflación está acelerando o frenando, lo más útil es comparar los últimos tres meses consecutivos.',
  },
  {
    q: '¿Qué es la inflación núcleo?',
    a: 'La inflación núcleo (o "core") excluye los precios estacionales (frutas y verduras) y los precios regulados por el Estado (tarifas de luz, gas, transporte). Refleja mejor la presión inflacionaria estructural que puede combatir el BCRA con política monetaria.',
  },
  {
    q: '¿Qué es el REM del BCRA?',
    a: 'El Relevamiento de Expectativas de Mercado (REM) es una encuesta mensual del BCRA a más de 40 consultoras y bancos sobre sus proyecciones de inflación, PBI y tipo de cambio. Cuando el dato real del INDEC sale por debajo del REM, el mercado lo toma positivamente.',
  },
  {
    q: '¿Cuándo baja la inflación a un dígito en Argentina?',
    a: 'El programa económico vigente proyecta inflación mensual en torno al 2-3% durante 2026. La inflación en un dígito mensual consistente sería una señal fuerte de estabilización. Las expectativas del REM ubican la inflación anual 2026 entre 25% y 35%.',
  },
];

export default function InflacionArgentinaPage() {
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
    headline: 'Inflación Argentina — IPC mensual, inflación interanual y expectativas 2026',
    description: String(metadata.description),
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/indicadores/inflacion-argentina` },
    about: [
      { '@type': 'Thing', name: 'IPC Argentina' },
      { '@type': 'Thing', name: 'Inflación mensual Argentina' },
      { '@type': 'Thing', name: 'Inflación interanual Argentina' },
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
          MacroLibre · Indicadores · Inflación
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--fg-0)] mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Inflación Argentina — IPC mensual e interanual 2026
        </h1>

        {(() => {
          const ipc = inflacionData[inflacionData.length - 1];
          const ipim = inflacionMayoristaData[inflacionMayoristaData.length - 1];
          return (
            <div className="mb-5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-3)]">
                IPC general · {ipc.date} · mensual
              </p>
              <p className="text-5xl sm:text-6xl font-semibold text-[var(--fg-0)] font-mono leading-none mt-1">
                {ipc.mensual.toFixed(1)}%
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { k: 'IPC núcleo', v: `${ipc.nucleo.toFixed(1)}%`, s: 'frente a 1,7% en septiembre' },
                  { k: 'IPC interanual', v: `${ipc.interanual.toFixed(1)}%`, s: 'acum. 2026: 26,3%' },
                  { k: 'IPIM mayorista', v: `${ipim.mensual.toFixed(1)}%`, s: `${ipim.date} · ${ipim.interanual.toFixed(1).replace('.', ',')}% i.a.` },
                ].map((x) => (
                  <div key={x.k} className="bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl p-3">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-3)]">{x.k}</p>
                    <p className="text-xl font-semibold text-[var(--fg-0)] font-mono mt-0.5">{x.v}</p>
                    <p className="text-[11px] text-[var(--fg-3)] mt-0.5">{x.s}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <p className="text-[15px] text-[var(--fg-1)] leading-relaxed max-w-3xl">
          El <strong>IPC Argentina</strong> actualizado mes a mes: <strong>inflación mensual</strong>,{' '}
          <strong>inflación interanual</strong>, inflación núcleo e inflación mayorista (IPIM).
          Incluye las expectativas del Relevamiento de Expectativas de Mercado (REM) del BCRA.
          Todos los datos son oficiales del <strong>INDEC</strong>.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-[var(--magenta)]/30 via-[var(--celeste)]/20 to-transparent" />
      </header>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InflacionMensualChart />
          <InflacionInteranualChart />
        </div>
        <InflacionMayoristaChart />
        <REMChart />
        <InflacionLargoPlazoChart />
      </div>

      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">El camino de la inflación en Argentina 2024-2026</h2>
        <p className="mb-3">
          Argentina experimentó en diciembre de 2023 una aceleración inflacionaria extrema, con una{' '}
          <strong className="text-[var(--fg-0)]">inflación mensual que tocó el 25.5%</strong> tras la devaluación
          del peso. Desde ese pico, el <strong>IPC Argentina</strong> mostró una desaceleración sostenida:
          10.6% en febrero 2024, 8.8% en marzo, hasta el 1,7% de agosto de 2026 (mínimo del nivel general en el año). En octubre de 2026 el nivel general fue 2,2% (núcleo 1,5%), por encima del 1,9% de septiembre.
        </p>
        <p className="mb-3">
          La <strong className="text-[var(--fg-0)]">inflación interanual</strong> cerró 2024 en 117.8%
          y se proyecta en torno al 25-35% para el cierre de 2026, según el REM del BCRA.
          El principal ancla del proceso desinflacionario fue la política fiscal (superávit primario) y
          la estabilización del tipo de cambio dentro del esquema de bandas cambiarias.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Fuente: INDEC — Dirección de Índices de Precios de Consumo. Publicación mensual entre los días 11 y 14.
          Los datos son definitivos y no sujetos a revisión posterior.
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
            { href: '/indicadores/tipo-de-cambio', label: 'Tipo de cambio →' },
            { href: '/indicadores/resultado-fiscal', label: 'Resultado fiscal →' },
            { href: '/indicadores/pobreza-argentina', label: 'Pobreza e indigencia →' },
            { href: '/glosario/inflacion-ipc', label: 'Glosario: Inflación e IPC →' },
            { href: '/calculadora', label: 'Calculadora inflacionaria →' },
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
