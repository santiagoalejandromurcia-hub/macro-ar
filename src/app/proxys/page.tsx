import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proxys Macro | MacroLibre",
  description:
    "Indicadores alternativos y proxys macroeconómicos para Argentina: M2 Privado (ML), Expectativas de Inflación (NSS+VAR) y Dolarización de Portafolios.",
};

const PROXYS = [
  {
    href: "/proxys/m2",
    emoji: "🧠",
    titulo: "M2 Privado Transaccional",
    subtitulo: "Modelo de Machine Learning",
    desc: "Estimación de la demanda de dinero con Gradient Boosting, Markov Switching y Double ML. Proyecciones 2026. Desvío real: −0.4% vs −48% del OLS lineal.",
    tags: ["Gradient Boosting", "Markov Switching", "Double ML"],
    color: "from-violet-950/60 to-gray-900",
    border: "border-violet-800/40",
    tagColor: "bg-violet-900/50 text-violet-300",
  },
  {
    href: "/expectativas",
    emoji: "📐",
    titulo: "Expectativas de Inflación",
    subtitulo: "Nelson-Siegel + VAR estructural",
    desc: "Proxy de expectativas a 3 años usando la curva Nelson-Siegel-Svensson sobre el REM-BCRA. VAR(2) con Wild Bootstrap para identificar los drivers del desanclaje.",
    tags: ["Nelson-Siegel", "VAR(2)", "Wild Bootstrap", "REM-BCRA"],
    color: "from-emerald-950/60 to-gray-900",
    border: "border-emerald-800/40",
    tagColor: "bg-emerald-900/50 text-emerald-300",
  },
  {
    href: "/dolarizacion",
    emoji: "💵",
    titulo: "Dolarización de Portafolios",
    subtitulo: "Proxy de confianza en el peso",
    desc: "Depósitos en USD como % del total bancario argentino (2016–2026). TC oficial y blue. Mide la confianza en el peso en cada régimen cambiario.",
    tags: ["Depósitos bancarios", "TC Oficial", "TC Blue", "BCRA"],
    color: "from-blue-950/60 to-gray-900",
    border: "border-blue-800/40",
    tagColor: "bg-blue-900/50 text-blue-300",
  },
];

export default function ProxysPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Proxys Macro</h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Indicadores alternativos construidos con metodología econométrica y modelos de Machine Learning
            para medir fenómenos que no tienen una serie oficial directa.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {PROXYS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border bg-gradient-to-br ${p.color} ${p.border} hover:border-opacity-80 transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="shrink-0 w-14 h-14 flex items-center justify-center text-3xl bg-gray-800/60 rounded-xl border border-gray-700/50">
                {p.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {p.titulo}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium">{p.subtitulo}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.tagColor}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 self-center text-gray-600 group-hover:text-gray-300 transition-colors text-xl">
                →
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-gray-600">
          Fuentes: BCRA, INDEC, Ministerio de Economía, JP Morgan (EMBI). Datos oficiales Argentina 2016–2026.
          Metodología disponible en cada sección.
        </div>
      </div>
    </main>
  );
}
