import Link from 'next/link';

export const metadata = {
  title: 'Proxys Macroeconómicos — MacroLibre',
  description: 'Hub de indicadores alternativos: M2, Expectativas de inflación, Dolarización de portafolios.',
};

export default function ProxysPage() {
  const proxys = [
    {
      href: '/proxys/m2',
      emoji: '💰',
      title: 'M2 Privado',
      subtitle: 'Machine Learning Model',
      description: 'Proxy de liquidez y demanda de dinero estimado con Gradient Boosting sobre datos de BCRA. Identifica ciclos de expansión/contracción monetaria.',
      tags: ['ML', 'Liquidez', 'BCRA'],
      borderColor: 'from-cyan-500/40 to-blue-500/20',
    },
    {
      href: '/expectativas',
      emoji: '🎯',
      title: 'Expectativas de Inflación',
      subtitle: 'NSS + VAR(2) Wild Bootstrap',
      description: 'Desancle de expectativas de largo plazo (3 años) mediante Nelson-Siegel + análisis de impulso-respuesta. Fuente: REM-BCRA.',
      tags: ['Expectativas', 'REM-BCRA', 'VAR'],
      borderColor: 'from-amber-500/40 to-orange-500/20',
    },
    {
      href: '/dolarizacion',
      emoji: '💵',
      title: 'Dolarización de Portafolios',
      subtitle: 'Proxy de confianza en el peso',
      description: 'Porcentaje de depósitos en USD en el sistema bancario. Indicador de aversión al riesgo de moneda y expectativas de devaluación.',
      tags: ['Depósitos USD', 'Riesgo', 'TCN'],
      borderColor: 'from-green-500/40 to-emerald-500/20',
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-0)] text-[var(--fg-0)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ─── Header ─── */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-[var(--fg-3)] hover:text-[var(--teal)] transition-colors mb-4 inline-block">
            ← Volver al Dashboard
          </Link>
          <p className="text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-widest mb-3">
            MacroLibre · Herramientas
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-[var(--fg-0)] mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Proxys macroeconómicos
          </h1>
          <p className="text-base text-[var(--fg-1)] leading-relaxed max-w-3xl">
            Hub de indicadores alternativos construidos con metodología abierta: series históricas, modelos de análisis y datos descargables.
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-[var(--teal)]/30 via-[var(--gold)]/20 to-transparent" />
        </div>

        {/* ─── Cards Grid ─── */}
        <div className="grid md:grid-cols-3 gap-6">
          {proxys.map((proxy) => (
            <Link
              key={proxy.href}
              href={proxy.href}
              className="group relative overflow-hidden rounded-lg border border-[var(--line-1)] bg-[var(--bg-1)] hover:bg-[var(--bg-2)] transition-all duration-300"
            >
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${proxy.borderColor}`}
              />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Header */}
                <div className="mb-3">
                  <div className="text-4xl mb-3">{proxy.emoji}</div>
                  <h2 className="text-xl font-bold text-[var(--fg-0)] mb-1">{proxy.title}</h2>
                  <p className="text-xs font-mono text-[var(--fg-3)] uppercase tracking-widest">
                    {proxy.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--fg-2)] mb-5 flex-grow leading-relaxed">
                  {proxy.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--line-1)]">
                  {proxy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded bg-[var(--bg-0)] text-[var(--fg-3)] group-hover:text-[var(--teal)] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 text-[var(--teal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
