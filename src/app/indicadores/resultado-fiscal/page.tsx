import type { Metadata } from 'next';
import Link from 'next/link';
import { FiscalChart, FiscalDetalleTable, TaxTable } from '@/components/Charts';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Resultado fiscal Argentina — déficit fiscal, superávit fiscal y resultado primario 2026',
  description:
    'Resultado primario y financiero del Sector Público Nacional. Déficit fiscal, superávit fiscal y equilibrio presupuestario de Argentina. Recaudación tributaria ARCA. Datos oficiales Ministerio de Economía, actualizados mensualmente.',
  alternates: { canonical: `${SITE_URL}/indicadores/resultado-fiscal` },
  keywords: [
    'resultado fiscal argentina',
    'déficit fiscal argentina',
    'superávit fiscal argentina',
    'resultado primario argentina',
    'equilibrio presupuestario argentina',
    'superávit primario 2026',
    'ajuste fiscal argentina',
    'resultado financiero Argentina',
    'recaudación ARCA AFIP 2026',
    'cuentas públicas argentina',
    'presupuesto nacional argentina',
    'gasto público argentina',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/indicadores/resultado-fiscal`,
    title: 'Resultado fiscal Argentina — déficit, superávit primario y equilibrio presupuestario 2026',
    description: 'Resultado primario y financiero del Sector Público Nacional. Datos oficiales Ministerio de Economía.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

const FAQ = [
  {
    q: '¿Argentina tiene superávit o déficit fiscal en 2026?',
    a: 'Argentina registra superávit fiscal primario desde 2024. En mayo 2026 el SPNF acumuló un superávit primario de 0,7% del PIB y un superávit financiero de 0,2% del PIB en los primeros cinco meses del año, según el Ministerio de Economía. En mayo el superávit primario mensual fue de $1.924.367 millones.',
  },
  {
    q: '¿Cuál es la diferencia entre resultado primario y resultado financiero?',
    a: 'El resultado primario es la diferencia entre ingresos y gastos antes del pago de intereses de la deuda. El resultado financiero incluye además los pagos de intereses. Argentina puede tener superávit primario y aun así tener déficit financiero si los intereses de la deuda son elevados.',
  },
  {
    q: '¿Qué es el equilibrio presupuestario?',
    a: 'El equilibrio presupuestario (o "déficit cero") es cuando los ingresos del Estado igualan exactamente a sus gastos, sin necesidad de endeudarse ni emitir para financiarse. Fue el objetivo central del programa económico que arrancó en diciembre 2023.',
  },
  {
    q: '¿Cómo se financia el déficit fiscal en Argentina?',
    a: 'Históricamente, Argentina financió su déficit de tres formas: emisión monetaria del BCRA (que genera inflación), endeudamiento en mercados internacionales (que sube el riesgo país) y endeudamiento en pesos con el mercado local. El programa 2024-2026 apunta a eliminar las dos primeras fuentes.',
  },
  {
    q: '¿Qué es la recaudación ARCA?',
    a: 'ARCA (ex AFIP) es la Agencia de Recaudación y Control Aduanero. Publica mensualmente los datos de recaudación tributaria: IVA, Ganancias, Derechos de Exportación (retenciones), Bienes Personales, entre otros. Es la principal fuente de ingresos del Sector Público Nacional.',
  },
];

export default function ResultadoFiscalPage() {
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
    headline: 'Resultado fiscal Argentina — déficit, superávit primario y equilibrio presupuestario 2026',
    description: String(metadata.description),
    inLanguage: 'es-AR',
    author: { '@type': 'Organization', name: 'MacroLibre' },
    publisher: { '@type': 'Organization', name: 'MacroLibre', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/indicadores/resultado-fiscal` },
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
          MacroLibre · Indicadores · Fiscal
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)] mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Resultado fiscal de Argentina — déficit, superávit y resultado primario
        </h1>
        <p className="text-[15px] text-[var(--fg-1)] leading-relaxed max-w-3xl">
          Evolución del <strong>resultado primario</strong> y financiero del Sector Público Nacional.
          Argentina logró en 2024 su primer <strong>superávit fiscal</strong> sostenido en más de una
          década, eliminando el <strong>déficit fiscal</strong> estructural que había sido fuente de
          inflación y crisis. Datos oficiales del Ministerio de Economía y recaudación ARCA (ex AFIP).
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-[var(--sol)]/30 via-[var(--up)]/20 to-transparent" />
      </header>

      <div className="space-y-6">
        <FiscalChart />
        <FiscalDetalleTable />
        <TaxTable />
      </div>

      <section className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">Del déficit al equilibrio presupuestario: qué pasó</h2>
        <p className="mb-3">
          Argentina cerró 2023 con un <strong className="text-[var(--down)]">déficit fiscal primario</strong> del
          2.7% del PIB. En 2024, mediante un ajuste de gasto sin precedentes en la historia reciente,
          revirtió ese resultado a un <strong className="text-[var(--up)]">superávit primario</strong> del 1.8% del PIB —
          una corrección de más de 4 puntos porcentuales en un solo año.
        </p>
        <p className="mb-3">
          Las principales medidas fueron: reducción de subsidios energéticos y de transporte (~1.5% del PIB),
          licuación de gasto en jubilaciones y salarios públicos por la inflación del primer semestre,
          suspensión de obra pública y reducción de transferencias a provincias.
          El <strong>equilibrio presupuestario</strong> fue el ancla nominal del programa de estabilización.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Fuente: Ministerio de Economía — Secretaría de Hacienda. Publicación mensual de resultados fiscales.
          Recaudación: ARCA (ex AFIP). Datos son provisorios hasta que se publique el cierre anual.
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
                <span className="text-[var(--sol)] text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
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
            { href: '/indicadores/reservas-bcra', label: 'Reservas BCRA →' },
            { href: '/indicadores/tipo-de-cambio', label: 'Tipo de cambio →' },
            { href: '/articulos/superavit-fiscal-historico-2025', label: 'Artículo: Por qué el superávit es histórico →' },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="px-3 py-1.5 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-lg text-[var(--fg-1)] hover:border-[var(--sol)]/40 hover:text-[var(--sol)] transition">
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
