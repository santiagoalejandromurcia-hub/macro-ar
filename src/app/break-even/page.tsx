import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import BreakEvenContent from './BreakEvenContent';

const SITE_URL = 'https://macrolibre.com';

// ============================================================
// Página /break-even — landing SEO + tool de Break-Even Inflacionario
// Keywords objetivo: "break even inflacionario argentina",
// "CER vs LECAP", "qué conviene CER o tasa fija".
// ============================================================

export const metadata: Metadata = {
  title: 'Break-Even Inflacionario: ¿conviene CER o tasa fija?',
  description:
    'Calculadora de break-even inflacionario (BEI) para bonos argentinos. Compará la inflación implícita en LECAP vs BONCER/LECER por plazo y decidí si te conviene CER o tasa fija.',
  alternates: { canonical: `${SITE_URL}/break-even` },
  keywords: [
    'break even inflacionario', 'BEI Argentina', 'CER vs LECAP', 'BONCER vs LECAP',
    'inflación implícita', 'curva CER', 'curva LECAP', 'tasa fija vs CER',
    'rendimiento bonos CER', 'TIR LECAP', 'qué conviene CER o tasa fija',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/break-even`,
    title: 'Break-Even Inflacionario: ¿CER o tasa fija?',
    description:
      'Inflación implícita por plazo en bonos argentinos. Compará LECAP vs BONCER/LECER y el REM del BCRA.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Break-Even Inflacionario — MacroLibre',
    description: 'Calculá la inflación implícita por plazo y decidí si conviene CER o tasa fija.',
  },
};

const FAQ = [
  {
    q: '¿Qué es el break-even inflacionario (BEI)?',
    a: 'El BEI es la inflación implícita que descuenta el mercado en cada plazo. Se calcula como la diferencia anualizada entre la TIR de un bono nominal (LECAP) y un bono ajustado por CER del mismo plazo. Si la inflación real termina por encima del BEI, conviene CER. Si termina por debajo, conviene tasa fija.',
  },
  {
    q: '¿Cómo se calcula exactamente?',
    a: 'BEI = (1 + TIR_nominal) / (1 + TIR_real) − 1. Por ejemplo, si la LECAP a 12 meses rinde 22% nominal y el BONCER a 12 meses rinde 6% real, el BEI implícito es ≈15.1%.',
  },
  {
    q: '¿Por qué comparar BEI con el REM?',
    a: 'El REM (Relevamiento de Expectativas de Mercado del BCRA) muestra qué inflación esperan los economistas. Si el BEI está por arriba del REM, el mercado está más pesimista que los economistas — vale la pena chequear si tu visión coincide. Si está por debajo, ocurre lo contrario.',
  },
  {
    q: '¿Qué significa "veredicto CER" o "veredicto tasa fija"?',
    a: 'Es una guía rápida: si la diferencia BEI−REM supera 1.5 puntos, marcamos CER; si es menor a −1.5, marcamos tasa fija; si está entre esos valores, marcamos neutral. NO es recomendación de inversión.',
  },
  {
    q: '¿De dónde salen los datos de los bonos?',
    a: 'Precios y vencimientos son de Bolsar / IAMC. Las TIRs son aproximaciones del mercado al snapshot indicado. Para decisiones reales, validá los valores con tu broker o IAMC ese día.',
  },
  {
    q: '¿Por qué esta calculadora no usa la API de un broker?',
    a: 'En Argentina no existe API pública gratuita y confiable de la curva CER + LECAP en tiempo real (Bloomberg, Refinitiv cobran USD 2.000+/mes). Por ahora actualizamos manualmente con datos de Bolsar / IAMC.',
  },
];

export default function BreakEvenPage() {
  // ─── JSON-LD: SoftwareApplication + FAQPage + Dataset ───
  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculadora Break-Even Inflacionario',
    description:
      'Calculadora de inflación implícita en bonos argentinos. Compara TIRs de LECAP y BONCER/LECER por plazo.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/break-even`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'ARS' },
    inLanguage: 'es-AR',
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
  // Dataset descargable — Google Dataset Search e IAs lo descubren.
  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Curvas LECAP y CER + REM para cálculo de Break-Even Inflacionario',
    description:
      'Dataset con TIRs, precios y vencimientos de bonos argentinos: 17 bonos nominales (LECAP + BONTE TF) y 21 bonos CER (LECER + BONCER), más expectativas de inflación del REM BCRA. Incluye fórmulas para calcular BEI implícita por plazo.',
    keywords: [
      'Argentina', 'bonos', 'LECAP', 'BONCER', 'LECER', 'CER',
      'break-even inflacionario', 'BEI', 'REM', 'inflación implícita',
      'tasa fija', 'curva CER',
    ],
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: 'MacroLibre',
      url: SITE_URL,
    },
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        contentUrl: `${SITE_URL}/data/break-even/break-even.xlsx`,
        name: 'break-even.xlsx — 4 hojas con fórmulas editables',
      },
    ],
    spatialCoverage: { '@type': 'Country', name: 'Argentina' },
    inLanguage: 'es-AR',
    url: `${SITE_URL}/break-even`,
    citation:
      'MacroLibre (https://macrolibre.com/break-even) basado en datos de Bolsar / IAMC / BCRA.',
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />

      <SectionHeader
        id="break-even"
        title="Break-Even Inflacionario"
        subtitle="¿Te conviene CER o tasa fija? La inflación implícita en cada plazo, comparada con el REM del BCRA."
        accent="celeste"
      />

      {/* ─── Banner de descarga del Excel ─── */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-[var(--bg-1)] border border-[var(--celeste)]/30 rounded-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <div className="text-[14px] font-semibold text-[var(--fg-0)]">
              Descargá el Excel con las fórmulas
            </div>
            <div className="text-[12px] text-[var(--fg-2)]">
              4 hojas: bonos nominales, bonos CER, REM esperado y resumen BEI con fórmulas editables.
            </div>
          </div>
        </div>
        <a
          href="/data/break-even/break-even.xlsx"
          download="break-even-macrolibre.xlsx"
          className="inline-flex items-center gap-2 h-10 px-4 bg-[var(--celeste)] text-[var(--bg-0)] rounded-md text-[13px] font-semibold hover:bg-[oklch(0.84_0.14_230)] transition shrink-0"
        >
          ⬇ Descargar .xlsx
        </a>
      </div>

      <BreakEvenContent />

      {/* ─── ¿Qué es esto? ─── */}
      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">¿Qué es el break-even inflacionario?</h2>
        <p className="mb-3">
          El BEI es la <strong className="text-[var(--fg-0)]">inflación implícita</strong> que el mercado descuenta en cada plazo.
          Se calcula como la diferencia anualizada entre la TIR de un bono <strong>nominal</strong> (LECAP, BONTE TF) y la TIR
          de un bono <strong>ajustado por CER</strong> (LECER, BONCER) del mismo plazo.
        </p>
        <p className="mb-3">
          Si pensás que la inflación va a estar por <strong className="text-[var(--magenta)]">arriba</strong> del BEI,
          conviene posicionarse en <strong className="text-[var(--magenta)]">CER</strong>. Si pensás que va a estar por{' '}
          <strong className="text-[var(--sol)]">abajo</strong>, conviene <strong className="text-[var(--sol)]">tasa fija</strong>.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          La columna "REM" muestra la inflación esperada por los economistas según el último Relevamiento de Expectativas
          del BCRA. La columna Δ es la diferencia BEI−REM: cuando es positiva, el mercado descuenta MÁS inflación que los
          economistas.
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
                <span className="text-[var(--celeste)] text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-1)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Cross-link ─── */}
      <section className="mt-10 p-5 md:p-6 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <h3 className="text-base font-semibold text-[var(--fg-0)] mb-2">¿Te falta contexto?</h3>
        <p className="text-sm text-[var(--fg-1)] mb-4">Conceptos relacionados en el glosario:</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/glosario/inflacion-ipc"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Inflación e IPC →
          </Link>
          <Link
            href="/calculadora"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Calculadora ¿Dólar, plazo fijo o bonos? →
          </Link>
          <Link
            href="/inflacion"
            className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--celeste)] transition"
          >
            Inflación en vivo →
          </Link>
        </div>
      </section>
    </div>
  );
}
