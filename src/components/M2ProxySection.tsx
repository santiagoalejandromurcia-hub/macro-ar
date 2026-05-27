"use client";

import { useState } from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine, Area,
} from "recharts";
import {
  m2HistData, m2Proyecciones, m2ModelStats, m2FeatureImportance, m2Summary,
  type M2DataPoint,
} from "@/data/m2Data";

// ── Colores ──────────────────────────────────────────────────────────────────
const C = {
  real:      "#74ACDF",   // celeste — M2 real
  gb:        "#22C55E",   // verde   — Gradient Boosting
  ols:       "#F97316",   // naranja — OLS Baseline
  proy_base: "#A78BFA",   // violeta
  proy_opt:  "#34D399",   // verde claro
  proy_pes:  "#F87171",   // rojo claro
  brecha:    "#FBBF24",   // amarillo
};

// ── Tooltip personalizado ────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 shadow-xl">
      <p className="font-semibold text-white mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-mono">
            {typeof p.value === "number"
              ? p.name.includes("Desvío") || p.name.includes("Inflación")
                ? `${p.value > 0 ? "+" : ""}${p.value.toFixed(1)}%`
                : `ARS ${p.value.toFixed(1)}T`
              : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Badge de régimen ─────────────────────────────────────────────────────────
function RegimeBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
      {label}
    </span>
  );
}

// ── Tarjeta de modelo ────────────────────────────────────────────────────────
function ModelCard({
  nombre, r2, rmse, desvioActual, descripcion, highlight,
}: {
  nombre: string; r2: number; rmse: number;
  desvioActual: number; descripcion: string; highlight?: boolean;
}) {
  const desvioColor =
    Math.abs(desvioActual) < 5 ? "text-green-400" :
    Math.abs(desvioActual) < 20 ? "text-yellow-400" : "text-red-400";

  return (
    <div className={`rounded-xl p-4 border ${highlight
      ? "border-green-500/40 bg-green-500/5"
      : "border-gray-700/50 bg-gray-800/40"}`}>
      {highlight && (
        <span className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 block">
          ★ Modelo preferido
        </span>
      )}
      <h4 className="font-semibold text-white mb-2">{nombre}</h4>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">R²</p>
          <p className={`font-mono text-sm font-bold ${r2 > 0.9 ? "text-green-400" : r2 > 0.5 ? "text-yellow-400" : "text-red-400"}`}>
            {r2.toFixed(4)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">RMSE</p>
          <p className="font-mono text-sm font-bold text-blue-400">{rmse.toFixed(4)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Desvío actual</p>
          <p className={`font-mono text-sm font-bold ${desvioColor}`}>
            {desvioActual > 0 ? "+" : ""}{desvioActual.toFixed(1)}%
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{descripcion}</p>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export function M2ProxySection() {
  const [activeTab, setActiveTab] = useState<"historico" | "proyeccion" | "modelos" | "drivers">(
    "historico"
  );
  const [showOLS, setShowOLS] = useState(true);
  const [showBrecha, setShowBrecha] = useState(false);

  const tabs = [
    { id: "historico",  label: "Serie histórica" },
    { id: "proyeccion", label: "Proyección 2026" },
    { id: "modelos",    label: "Comparación modelos" },
    { id: "drivers",    label: "Drivers ML" },
  ] as const;

  // Combinar histórico + proyección para el chart de proyección
  const lastHist = m2HistData[m2HistData.length - 1];
  const proyData = [
    { fecha: lastHist.fecha, base: lastHist.m2, optimista: lastHist.m2, pesimista: lastHist.m2 },
    ...m2Proyecciones,
  ];

  return (
    <section className="py-8">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white">
              Demanda de Dinero — M2 Privado Transaccional
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            Billetes + Depósitos CC no remunerados · Sector privado · ARS billones
          </p>
          <div className="flex items-center gap-2 mt-2">
            <RegimeBadge label={m2Summary.regimenActual} />
            <span className="text-xs text-gray-500">Fuente: BCRA · INDEC · ML MacroLibre</span>
          </div>
        </div>

        {/* KPIs rápidos */}
        <div className="flex gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              ARS {m2Summary.valorActual}T
            </p>
            <p className="text-xs text-gray-400">Mar-26</p>
            <p className={`text-sm font-medium ${m2Summary.varMensual > 0 ? "text-green-400" : "text-red-400"}`}>
              {m2Summary.varMensual > 0 ? "+" : ""}{m2Summary.varMensual}% m/m
            </p>
          </div>
          <div className="text-right border-l border-gray-700 pl-4">
            <p className={`text-2xl font-bold ${Math.abs(m2Summary.desvioML) < 5 ? "text-green-400" : "text-yellow-400"}`}>
              {m2Summary.desvioML > 0 ? "+" : ""}{m2Summary.desvioML}%
            </p>
            <p className="text-xs text-gray-400">Desvío ML</p>
            <p className="text-xs text-gray-500">
              OLS: {m2Summary.desvioOLS > 0 ? "+" : ""}{m2Summary.desvioOLS}%
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-gray-800/60 p-1 rounded-lg mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === t.id
                ? "bg-blue-600 text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Serie histórica ── */}
      {activeTab === "historico" && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={showOLS}
                onChange={(e) => setShowOLS(e.target.checked)}
                className="accent-orange-500"
              />
              Mostrar OLS Baseline
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={showBrecha}
                onChange={(e) => setShowBrecha(e.target.checked)}
                className="accent-yellow-500"
              />
              Mostrar brecha cambiaria
            </label>
          </div>

          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={m2HistData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
                <XAxis
                  dataKey="fecha"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  interval={11}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="m2"
                  orientation="left"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  tickFormatter={(v) => `${v}T`}
                  label={{ value: "ARS billones", angle: -90, position: "insideLeft", fill: "#6B7280", fontSize: 11 }}
                />
                {showBrecha && (
                  <YAxis
                    yAxisId="brecha"
                    orientation="right"
                    tick={{ fill: "#FBBF24", fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                )}
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: "#9CA3AF" }}
                />

                {/* Desvío como área sombreada */}
                <Area
                  yAxisId="m2"
                  type="monotone"
                  dataKey="fitted_gb"
                  fill="#22C55E"
                  fillOpacity={0.08}
                  stroke="none"
                  name="Zona fitted GB"
                  legendType="none"
                />

                {/* M2 real */}
                <Line
                  yAxisId="m2"
                  type="monotone"
                  dataKey="m2"
                  stroke={C.real}
                  strokeWidth={2.5}
                  dot={false}
                  name="M2 Real"
                />

                {/* Fitted GB */}
                <Line
                  yAxisId="m2"
                  type="monotone"
                  dataKey="fitted_gb"
                  stroke={C.gb}
                  strokeWidth={2}
                  strokeDasharray="6 2"
                  dot={false}
                  name="Fitted GB"
                />

                {/* Fitted OLS */}
                {showOLS && (
                  <Line
                    yAxisId="m2"
                    type="monotone"
                    dataKey="fitted_ols"
                    stroke={C.ols}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    name="Fitted OLS"
                  />
                )}

                {/* Brecha cambiaria */}
                {showBrecha && (
                  <Bar
                    yAxisId="brecha"
                    dataKey="brecha"
                    fill={C.brecha}
                    opacity={0.4}
                    name="Brecha %"
                  />
                )}

                {/* Hitos */}
                <ReferenceLine
                  x="Dic 23"
                  yAxisId="m2"
                  stroke="#F87171"
                  strokeDasharray="3 3"
                  label={{ value: "Shock Milei", fill: "#F87171", fontSize: 10, position: "top" }}
                />
                <ReferenceLine
                  x="Ene 25"
                  yAxisId="m2"
                  stroke="#A78BFA"
                  strokeDasharray="3 3"
                  label={{ value: "Remonetiz.", fill: "#A78BFA", fontSize: 10, position: "top" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Insight box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-blue-300 mb-2">
                ¿Por qué el OLS dice -48%?
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                El modelo OLS fue calibrado en la era 2010-2022 de alta emisión y
                alta inflación. Proyecta un M2 muy elevado para 2026 porque no
                "sabe" que estamos en un régimen de desinflación con brecha
                cambiaria → 0. El modelo ML sí lo captura: el desvío real es solo{" "}
                <span className="text-green-400 font-semibold">
                  {m2Summary.desvioML}%
                </span>.
              </p>
            </div>
            <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-violet-300 mb-2">
                Régimen actual: Remonetización
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                El modelo de Markov Switching (quantEcon) identifica un nuevo régimen
                desde 2025: mayor elasticidad al TC real (brecha → 0 aumenta demanda
                de pesos) y menor sensibilidad a inflación que en 2020-2023. El M2
                se mueve principalmente por tendencia y confianza cambiaria.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Proyección ── */}
      {activeTab === "proyeccion" && (
        <div className="space-y-4">
          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
            <p className="text-sm text-gray-400 mb-4">
              Proyección M2 nominal (Gradient Boosting · 3 escenarios · Abr–Dic 2026)
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={proyData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
                <XAxis dataKey="fecha" tick={{ fill: "#9CA3AF", fontSize: 11 }} tickLine={false} />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  tickFormatter={(v) => `${v}T`}
                  domain={["auto", "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#9CA3AF" }} />

                <Line type="monotone" dataKey="optimista" stroke={C.proy_opt} strokeWidth={2}
                  strokeDasharray="6 2" dot={false} name="Optimista" />
                <Line type="monotone" dataKey="base" stroke={C.proy_base} strokeWidth={2.5}
                  dot={false} name="Base" />
                <Line type="monotone" dataKey="pesimista" stroke={C.proy_pes} strokeWidth={2}
                  strokeDasharray="4 4" dot={false} name="Pesimista" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla de proyecciones */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-gray-700">
                  <th className="text-left py-2 px-3">Mes</th>
                  <th className="text-right py-2 px-3 text-green-400">Optimista</th>
                  <th className="text-right py-2 px-3 text-violet-400">Base</th>
                  <th className="text-right py-2 px-3 text-red-400">Pesimista</th>
                </tr>
              </thead>
              <tbody>
                {m2Proyecciones.map((p) => (
                  <tr key={p.fecha} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-2 px-3 text-gray-300 font-mono">{p.fecha}</td>
                    <td className="py-2 px-3 text-right text-green-400 font-mono">ARS {p.optimista}T</td>
                    <td className="py-2 px-3 text-right text-violet-400 font-mono font-semibold">ARS {p.base}T</td>
                    <td className="py-2 px-3 text-right text-red-400 font-mono">ARS {p.pesimista}T</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-xs text-gray-500 mt-2">
                  <td colSpan={4} className="pt-3 px-3">
                    Optimista: inflación 1.5%/mes, brecha→0 · Base: 2.5%, brecha estable ·
                    Pesimista: 4.0%, rebrecha
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Comparación modelos ── */}
      {activeTab === "modelos" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {m2ModelStats.map((m) => (
              <ModelCard
                key={m.nombre}
                {...m}
                highlight={m.nombre === m2Summary.modeloPreferido}
              />
            ))}
          </div>

          {/* Tabla comparativa */}
          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-sm font-semibold text-white mb-3">
              Comparación de métricas in-sample (Feb 2010 – Mar 2026)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-gray-700">
                    <th className="text-left py-2">Modelo</th>
                    <th className="text-right py-2">R²</th>
                    <th className="text-right py-2">RMSE</th>
                    <th className="text-right py-2">Desvío Mar-26</th>
                    <th className="text-right py-2">Variables</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-orange-400">OLS Baseline</td>
                    <td className="py-2 text-right text-red-400">0.1793</td>
                    <td className="py-2 text-right text-red-400">0.2797</td>
                    <td className="py-2 text-right text-red-400">-37.6%</td>
                    <td className="py-2 text-right text-gray-400">4</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-gray-300">OLS Completo</td>
                    <td className="py-2 text-right text-yellow-400">0.2414</td>
                    <td className="py-2 text-right text-yellow-400">0.2690</td>
                    <td className="py-2 text-right text-yellow-400">-30.0%</td>
                    <td className="py-2 text-right text-gray-400">8</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-blue-400">Random Forest</td>
                    <td className="py-2 text-right text-green-400">0.9795</td>
                    <td className="py-2 text-right text-green-400">0.0442</td>
                    <td className="py-2 text-right text-yellow-400">-8.1%</td>
                    <td className="py-2 text-right text-gray-400">8</td>
                  </tr>
                  <tr className="border-b border-gray-800 bg-green-500/5">
                    <td className="py-2 text-green-400 font-semibold">Gradient Boosting ★</td>
                    <td className="py-2 text-right text-green-400 font-bold">0.9999</td>
                    <td className="py-2 text-right text-green-400 font-bold">0.0023</td>
                    <td className="py-2 text-right text-green-400 font-bold">-0.4%</td>
                    <td className="py-2 text-right text-gray-400">8</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-violet-400">Markov Switching</td>
                    <td className="py-2 text-right text-green-400">0.9894</td>
                    <td className="py-2 text-right text-green-400">0.0318</td>
                    <td className="py-2 text-right text-green-400">-1.3%</td>
                    <td className="py-2 text-right text-gray-400">8 × 5 reg.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Drivers ML ── */}
      {activeTab === "drivers" && (
        <div className="space-y-4">
          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
            <h4 className="text-sm font-semibold text-white mb-4">
              Importancia de variables — Gradient Boosting (feature importance)
            </h4>
            <div className="space-y-3">
              {m2FeatureImportance.map((f) => (
                <div key={f.variable} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-40 flex-shrink-0">{f.variable}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                      style={{ width: `${(f.importancia * 100).toFixed(1)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-300 w-12 text-right">
                    {(f.importancia * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretación económica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
              <h4 className="text-sm font-semibold text-white mb-3">Interpretación económica</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex gap-2">
                  <span className="text-blue-400 font-semibold w-4">①</span>
                  <span>
                    <span className="text-white">Tendencia temporal</span> — driver principal.
                    Captura la monetización estructural de largo plazo de la economía argentina.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-semibold w-4">②</span>
                  <span>
                    <span className="text-white">Brecha cambiaria</span> — cuando la brecha blue/oficial
                    es alta, los agentes huyen del peso. Cuando converge a 0 (como ahora), el M2 sube.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-semibold w-4">③</span>
                  <span>
                    <span className="text-white">Actividad (EMAE)</span> — elasticidad positiva estándar
                    de demanda de dinero. Más transacciones → más M2.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-semibold w-4">④</span>
                  <span>
                    <span className="text-white">Inflación y tasa real</span> — efecto negativo.
                    Inflación alta → huida del peso. Tasa real positiva → sustitución por depósitos
                    remunerados fuera del M2T.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
              <h4 className="text-sm font-semibold text-white mb-3">Metodología ML</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <p>
                  <span className="text-green-400 font-medium">Gradient Boosting</span> (sklearn):
                  300 estimators · depth 4 · lr 0.05. Entrena sobre log(M2 real) con 8 features.
                  Captura no-linealidades y quiebres estructurales (cepos, devaluaciones).
                </p>
                <p>
                  <span className="text-violet-400 font-medium">Markov Switching</span>: 5 regímenes
                  identificados (2010-17, crisis 2018-19, pandemia 2020-22, shock 2023-24,
                  remonetización 2025+). OLS por régimen, inspirado en
                  <code className="text-gray-300 mx-1">quantecon.MarkovChain</code>.
                </p>
                <p>
                  <span className="text-yellow-400 font-medium">EconML</span>: análisis causal de
                  efectos heterogéneos (brecha como "tratamiento", M2 como outcome). Confirma
                  que el efecto causal de la brecha sobre M2 es negativo y no lineal.
                </p>
                <p className="text-gray-600">
                  Datos: 194 obs. mensuales (Feb 2010 – Mar 2026). Variables: EMAE, IPC,
                  TC oficial/blue, BADLAR, brecha, trend. Fuentes: BCRA · INDEC · Ámbito.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Metodología colapsable ── */}
      <details className="mt-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
        <summary className="px-4 py-3 text-sm text-gray-400 cursor-pointer hover:text-white select-none">
          📐 Metodología ▼
        </summary>
        <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-white">Modelo base:</strong>{" "}
            OLS log-lineal: ln(M2/P) = α + β₁·ln(Y) + β₂·π + β₃·Δe + β₄·t + ε.
            R² = 0.18. Calibrado 2010-2022. Asume relación estable entre variables,
            por eso sobreestima el M2 en el régimen actual.
          </p>
          <p>
            <strong className="text-white">Modelo ML:</strong>{" "}
            Gradient Boosting (scikit-learn) sobre las mismas variables más brecha cambiaria,
            tasa real y aceleración inflacionaria. R² = 0.9999. Aprende los quiebres
            estructurales sin necesidad de modelarlos explícitamente.
          </p>
          <p>
            <strong className="text-white">Markov Switching:</strong>{" "}
            Inspirado en la librería quantEcon de Python (Sargent & Stachurski).
            5 regímenes identificados manualmente según contexto macroeconómico.
            OLS separado por régimen. R² = 0.989.
          </p>
          <p>
            <strong className="text-white">EconML:</strong>{" "}
            Causal Forest DML (Double ML) para estimar el efecto causal heterogéneo
            de la brecha cambiaria sobre la demanda de dinero, controlando por actividad
            e inflación. Confirma que el efecto es no lineal y mayor en el régimen actual.
          </p>
          <p className="text-gray-500">
            Código open-source disponible en ml/m2_ml_model.py · Actualización mensual · Mar-2026
          </p>
        </div>
      </details>
    </section>
  );
}

export default M2ProxySection;
