import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import GranosContent from './GranosContent';

const SITE_URL = 'https://macrolibre.com';

// ============================================================
// /granos — Mercado de Granos Argentina
// Keywords objetivo: "mercado de granos argentina", "precio FOB
// soja hoy", "precio FOB maíz argentina", "DJVE granos",
// "exportaciones granos argentina 2026", "precio trigo FOB"
// ============================================================

export const metadata: Metadata = {
  title: 'Mercado de Granos Argentina · Precios FOB, DJVE y exportaciones',
  description:
    'Precios FOB en tiempo real de soja, maíz, trigo y girasol. DJVE semanal y acumulado, exportaciones por grano y destino, estimación de cosecha 2025/26. Datos oficiales MAGyP e INDEC, actualizados diariamente.',
  alternates: { canonical: `${SITE_URL}/granos` },
  keywords: [
    'mercado de granos argentina',
    'precio FOB soja argentina',
    'precio FOB maíz argentina',
    'precio FOB trigo hoy',
    'DJVE granos argentina',
    'exportaciones granos argentina 2026',
    'precio girasol FOB',
    'cosecha soja 2025 2026',
    'MAGyP precios FOB',
    'liquidación divisas agro',
    'bolsa cereales rosario',
    'granos argentina INDEC',
    'mercado agropecuario argentina',
    'precio soja hoy argentina',
    'exportaciones cereales oleaginosos',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/granos`,
    title: 'Mercado de Granos Argentina — Precios FOB, DJVE y exportaciones',
    description:
      'Precios FOB de soja, maíz, trigo y girasol. DJVE, exportaciones por destino y estimación de cosecha 2025/26. Datos MAGyP e INDEC.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercado de Granos Argentina · MacroLibre',
    description: 'Precios FOB en tiempo real, DJVE, exportaciones y cosecha. Datos oficiales MAGyP e INDEC.',
  },
};

const FAQ = [
  {
    q: '¿Cuál es el precio FOB de la soja hoy en Argentina?',
    a: 'El precio FOB de la soja (posición Rosario Up-River) al 12 de mayo de 2026 es de USD 305 por tonelada, según los últimos datos publicados por la Subsecretaría de Mercados Agropecuarios del MAGyP. Podés ver la evolución mensual en el gráfico histórico de MacroLibre.',
  },
  {
    q: '¿Qué es el FOB en el mercado de granos?',
    a: 'FOB (Free on Board) es el precio al que se venden los granos puesto a bordo del barco en el puerto de embarque (generalmente Rosario o Buenos Aires). No incluye el flete marítimo ni el seguro internacional. Es el precio de referencia oficial que publica el MAGyP y sobre el que se calculan las retenciones.',
  },
  {
    q: '¿Qué son las DJVE?',
    a: 'Las Declaraciones Juradas de Ventas al Exterior (DJVE) son el instrumento que usan los exportadores para registrar sus contratos de venta de granos al exterior ante el MAGyP. Anticipan cuánto volumen se va a exportar en los próximos meses y son el principal indicador de la demanda futura de divisas del sector.',
  },
  {
    q: '¿Cuánto exporta Argentina en granos?',
    a: 'En abril de 2026 Argentina exportó aproximadamente 4,4 millones de toneladas de granos por un valor de USD 1.150 millones, según datos del INDEC. En el acumulado enero-mayo 2026 el total de DJVE declaradas supera los 41 millones de toneladas.',
  },
  {
    q: '¿Cuál es la cosecha de soja 2025/26?',
    a: 'La estimación oficial del MAGyP para la campaña de soja 2025/26 es de 49,5 millones de toneladas, un 8,2% por encima de la campaña anterior. La cosecha gruesa está en curso durante abril y mayo de 2026.',
  },
  {
    q: '¿A qué países Argentina exporta más granos?',
    a: 'China es el principal destino con el 38,4% del volumen exportado (principalmente soja). Le siguen Indonesia (9,2%), Países Bajos (7,8%), Egipto (6,4% con trigo) y Brasil (5,9% con maíz).',
  },
  {
    q: '¿De dónde salen los datos?',
    a: 'Los precios FOB provienen de la API pública de la Subsecretaría de Mercados Agropecuarios del MAGyP. Las DJVE del sistema de registro de ventas externas del MAGyP. Las exportaciones efectivas del Intercambio Comercial Argentino (ICA) del INDEC. Todos los datos son provisorios y sujetos a revisión.',
  },
];

export default function GranosPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mercado de Granos Argentina — Precios FOB, DJVE y exportaciones',
    description: String(metadata.description),
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: {
      '@type': 'Organization',
      name: 'MacroLibre',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/granos` },
    articleSection: 'Sector agropecuario',
    about: [
      { '@type': 'Thing', name: 'Precio FOB soja Argentina' },
      { '@type': 'Thing', name: 'Mercado de granos Argentina' },
      { '@type': 'Thing', name: 'DJVE exportaciones granos' },
      { '@type': 'Thing', name: 'Cosecha soja maíz trigo' },
    ],
  };

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Mercado de Granos Argentina — Precios FOB, DJVE y exportaciones',
    description:
      'Precios FOB históricos de soja, maíz, trigo y girasol. DJVE mensual por grano. Exportaciones por volumen y valor. Estimación de cosecha 2025/26.',
    keywords: [
      'Argentina', 'granos', 'soja', 'maíz', 'trigo', 'girasol',
      'precio FOB', 'DJVE', 'MAGyP', 'INDEC', 'exportaciones', 'cosecha',
    ],
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    spatialCoverage: { '@type': 'Country', name: 'Argentina' },
    inLanguage: 'es-AR',
    url: `${SITE_URL}/granos`,
    citation: 'MacroLibre (https://macrolibre.com/granos) basado en datos de MAGyP e INDEC.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SectionHeader
        id="granos"
        title="Mercado de Granos Argentina"
        subtitle="Precios FOB en tiempo real de los principales granos, cotizaciones oficiales, embarques y exportaciones del sector. Datos actualizados diariamente desde fuentes oficiales del MAGyP e INDEC."
        accent="sol"
      />

      <GranosContent />

      {/* ─── Resumen ejecutivo ─── */}
      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">Lo que tenés que saber</h2>
        <p className="mb-3">
          La campaña 2025/26 se presenta como <strong className="text-[var(--up)]">una de las mejores de la última década</strong>:
          soja estimada en 49,5 Mt (+8,2% i.a.) y maíz en 50 Mt (+4,6%). Con precios FOB
          de soja en torno a USD 305/tn, el ingreso de divisas del agro proyectado para 2026
          supera los USD 30.000 millones anuales.
        </p>
        <p className="mb-3">
          Las DJVE acumuladas en lo que va del año superan las 41 millones de toneladas, con China
          concentrando el 38% de los destinos. El pico de liquidación ocurre entre marzo y junio,
          coincidiendo con la cosecha gruesa de soja y maíz.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Los precios FOB corresponden a la posición Rosario Up-River (puerto de referencia).
          Las exportaciones son provisorias según INDEC y sujetas a revisión.
          Fuentes: MAGyP, INDEC, ArgentinaDatos.
        </p>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mt-10">
        <h2
          className="text-2xl font-bold text-[var(--fg-0)] mb-5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details key={i} className="group glass p-5 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-[var(--fg-0)]">
                {f.q}
                <span className="text-[var(--sol)] text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-1)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Cross-links ─── */}
      <section className="mt-10 p-5 md:p-6 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <h3 className="text-base font-semibold text-[var(--fg-0)] mb-2">Más sobre la economía argentina</h3>
        <div className="flex flex-wrap gap-2 text-xs mt-4">
          <Link
            href="/glosario/fob"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--sol)]/40 hover:text-[var(--sol)] transition"
          >
            Glosario: ¿Qué es FOB? →
          </Link>
          <Link
            href="/glosario/djve"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--sol)]/40 hover:text-[var(--sol)] transition"
          >
            Glosario: ¿Qué es una DJVE? →
          </Link>
          <Link
            href="/glosario/balanza-comercial"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--sol)]/40 hover:text-[var(--sol)] transition"
          >
            Glosario: Balanza Comercial →
          </Link>
          <Link
            href="/carnes"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--sol)]/40 hover:text-[var(--sol)] transition"
          >
            Mercado de Carnes →
          </Link>
          <Link
            href="/#externo"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--sol)]/40 hover:text-[var(--sol)] transition"
          >
            Balanza comercial en vivo →
          </Link>
        </div>
      </section>
    </div>
  );
}
