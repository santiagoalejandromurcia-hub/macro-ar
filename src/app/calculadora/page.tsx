import type { Metadata } from 'next';
import Link from 'next/link';
import Calculator from '@/components/Calculator/Calculator';
import SectionHeader from '@/components/SectionHeader';

const SITE_URL = 'https://macrolibre.com';

// ============================================================
// Calculadora — landing optimizada para SEO long-tail.
// Apunta a queries del tipo "calculadora dólar vs plazo fijo
// ajustado por inflación", "cuánto rinde el plazo fijo".
// ============================================================

export const metadata: Metadata = {
  title: '¿Dólar, Plazo Fijo o Bonos? Calculadora ajustada por inflación',
  description:
    'Calculadora histórica que compara retornos reales de Plazo Fijo, Dólar MEP, Dólar Blue, LECAPs y bonos AL30/GD30 entre dos fechas. Todo ajustado por inflación INDEC y con datos en vivo del BCRA.',
  alternates: { canonical: `${SITE_URL}/calculadora` },
  keywords: [
    'calculadora dólar', 'calculadora plazo fijo', 'rendimiento bonos AL30',
    'rendimiento bonos GD30', 'LECAP rendimiento', 'inflación ajuste',
    'dólar MEP histórico', 'dólar blue histórico', 'simulador inversiones Argentina',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/calculadora`,
    title: '¿Dólar, Plazo Fijo o Bonos? — Calculadora histórica',
    description:
      'Compará retornos reales (ajustados por inflación) de Plazo Fijo, Dólar MEP/Blue, LECAPs y bonos AL30/GD30 desde cualquier fecha.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Dólar, Plazo Fijo o Bonos? — Calculadora histórica',
    description:
      'Compará retornos reales de los principales instrumentos argentinos. Datos en vivo del BCRA, INDEC y ArgentinaDatos.',
  },
};

// ─── FAQ schema (FAQPage) — activa "preguntas frecuentes" en la SERP ───
const FAQ = [
  {
    q: '¿Qué instrumentos compara la calculadora?',
    a: 'Plazo fijo (TNA BADLAR), Dólar MEP, Dólar Blue, Dólar Oficial, LECAPs vigentes y bonos soberanos AL30 (ley argentina) y GD30 (ley NY).',
  },
  {
    q: '¿De dónde salen los datos?',
    a: 'BCRA para TNA BADLAR e inflación expectativas (REM); INDEC para IPC; ArgentinaDatos y Bluelytics para las cotizaciones MEP y blue. Los cronogramas de bonos y tasas de LECAP son los publicados por el Tesoro.',
  },
  {
    q: '¿Qué significa "retorno real"?',
    a: 'Es el retorno nominal descontado por la inflación del período, expresado en pesos de poder adquisitivo de la fecha inicial. Es la única medida que te dice si realmente ganaste o perdiste plata.',
  },
  {
    q: '¿La calculadora sirve como recomendación de inversión?',
    a: 'No. Es una herramienta educativa que muestra qué habría pasado en el pasado. Los rendimientos pasados no garantizan retornos futuros. Para decisiones concretas, consultá un asesor matriculado.',
  },
  {
    q: '¿Hasta qué fecha llegan los datos históricos?',
    a: 'La calculadora se actualiza en tiempo real con la última cotización disponible. Las series históricas más largas arrancan en 2018 (LECAPs y bonos) o antes (dólar y plazo fijo).',
  },
];

export default function CalculadoraPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // SoftwareApplication schema — Google a veces le da rich results
  // del tipo "Free / Online" a calculadoras y tools.
  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculadora ¿Dólar, Plazo Fijo o Bonos?',
    description:
      'Calculadora histórica ajustada por inflación de retornos de Plazo Fijo, Dólar MEP/Blue, LECAPs y bonos argentinos.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/calculadora`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'ARS' },
    inLanguage: 'es-AR',
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      <SectionHeader
        id="calculadora"
        title="¿Dólar, plazo fijo o bonos?"
        subtitle="La pregunta que todo argentino se hace — con datos reales, ajustados por inflación, en vivo."
        accent="celeste"
      />

      <Calculator />

      <div className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">
          ¿Cómo lo calculamos?
        </h2>
        <p className="mb-2">
          La calculadora toma series históricas en vivo del BCRA (TNA BADLAR), INDEC (IPC) y
          ArgentinaDatos (cotizaciones MEP y blue), y las combina con los cronogramas fijos de
          los bonos y las tasas publicadas de cada emisión de LECAP.
        </p>
        <p className="mb-2">
          Todos los retornos se muestran en dos formatos:{' '}
          <span className="text-[var(--fg-0)] font-semibold">nominal</span> (pesos finales crudos) y
          {' '}<span className="text-[var(--fg-0)] font-semibold">real</span> (pesos ajustados a poder
          adquisitivo de la fecha inicial, deflactados por IPC). El real es el que importa.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Los resultados son aproximaciones educativas. No constituyen recomendación de inversión.
          Para decisiones concretas, consultá un asesor matriculado.
        </p>
      </div>

      {/* ─── FAQ visible (acompaña al schema JSON-LD) ─── */}
      <section className="mt-10">
        <h2
          className="text-2xl font-bold text-[var(--fg-0)] mb-5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details
              key={i}
              className="group glass p-5 cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-[var(--fg-0)]">
                {f.q}
                <span className="text-[var(--celeste)] text-lg group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-1)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Cross-link al glosario (SEO interno) ─── */}
      <section className="mt-10 p-5 md:p-6 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <h3 className="text-base font-semibold text-[var(--fg-0)] mb-2">
          ¿Te falta contexto sobre los instrumentos?
        </h3>
        <p className="text-sm text-[var(--fg-1)] mb-4">
          En el glosario explicamos cada uno con ejemplos:
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/glosario/dolar-mep-blue-ccl"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Dólar MEP, Blue y CCL →
          </Link>
          <Link
            href="/glosario/inflacion-ipc"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Inflación e IPC →
          </Link>
          <Link
            href="/glosario/riesgo-pais"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Riesgo País →
          </Link>
        </div>
      </section>
    </div>
  );
}
