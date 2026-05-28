"use client";

import React, { useState } from "react";
import {
  ComposedChart, LineChart, Line, Bar, BarChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Area, AreaChart, ReferenceLine,
  ScatterChart, Scatter, Dot,
} from "recharts";
import {
  expHistData, curvaNSActual, remObservado,
  irfData, fevdData, expSummary,
} from "@/data/expectativasData";

// ── Paleta ──────────────────────────────────────────────────────────────────
const C = {
  pi3y:    "#10b981",
  beta0:   "#3b82f6",
  rem12m:  "#9ca3af",
  rem24m:  "#f59e0b",
  fitted:  "#10b981",
  obs:     "#60a5fa",
  inf:     "#ef4444",
  tasa:    "#3b82f6",
  fiscal:  "#f59e0b",
  embi:    "#8b5cf6",
  tc:      "#f97316",
  propio:  "#6b7280",
  pos:     "#10b981",
  neg:     "#ef4444",
  band:    "#10b981",
};

const TABS = ["Curva actual", "Serie histórica", "Shocks IRF", "Drivers FEVD"] as const;
type Tab = typeof TABS[number];

const EVENTOS: [string, string][] = [
  ["2018-04", "Crisis cambiaria"],
  ["2019-08", "Post-PASO"],
  ["2020-03", "COVID-19"],
  ["2023-12", "Deval. Milei"],
];

// ── helpers ─────────────────────────────────────────────────────────────────
const fmtPct = (v: number) => `${v.toFixed(1)}%`;
const fmtPp  = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)} pp`;

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: color + "22", color }}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: color }} />
      {label}
    </span>
  );
}

// ── CURVA ACTUAL ─────────────────────────────────────────────────────────────
function TabCurvaActual() {
  // Combinar fitted y obs por tau
  const data = curvaNSActual.map((pt) => {
    const obs = remObservado.find((o) => o.tau === pt.tau);
    return { ...pt, obs: obs?.obs ?? null };
  });

  return (
    <div className="space-y-4">
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-sm text-gray-300 mb-1 font-semibold">¿Qué muestra este gráfico?</p>
        <p className="text-sm text-gray-400">
          La <span className="text-emerald-400 font-medium">curva Nelson-Siegel</span> fitea las 5 expectativas del REM-BCRA
          (puntos azules) a distintos horizontes y extrapola hasta 3 años — la zona donde el mercado
          "ancla" sus expectativas de largo plazo. Cuando la curva es decreciente, el mercado espera
          desinflación. En Feb 2026, la curva cae de{" "}
          <span className="text-white font-medium">26.2% a 6m</span> hasta{" "}
          <span className="text-white font-medium">9.2% a 3 años</span>.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="label"
            label={{ value: "Horizonte", position: "insideBottom", offset: -10, fill: "#9ca3af", fontSize: 12 }}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: "#9ca3af", fontSize: 12 }} domain={[0, "auto"]} />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
            labelStyle={{ color: "#f9fafb", fontWeight: 600 }}
            formatter={(v: number, name: string) => [fmtPct(v), name === "fitted" ? "Curva NS" : "REM observado"]}
          />
          <Line dataKey="fitted" stroke={C.fitted} strokeWidth={3} dot={{ r: 4, fill: C.fitted }} name="Curva NS" />
          <Scatter dataKey="obs" fill={C.obs} name="REM observado" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
        {curvaNSActual.map((pt) => (
          <div key={pt.tau} className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-xs text-gray-400">{pt.label}</div>
            <div className="text-lg font-bold text-emerald-400">{pt.fitted?.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SERIE HISTÓRICA ──────────────────────────────────────────────────────────
function TabSerieHistorica() {
  const [mostrarBeta0, setMostrarBeta0] = useState(false);
  const [mostrarREM, setMostrarREM] = useState(true);

  const refLines = EVENTOS.map(([fecha, label]) => ({
    fecha,
    label,
    inData: expHistData.some((d) => d.date >= fecha),
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" checked={mostrarREM} onChange={(e) => setMostrarREM(e.target.checked)} className="accent-yellow-400" />
          Mostrar REM 12m y 24m
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" checked={mostrarBeta0} onChange={(e) => setMostrarBeta0(e.target.checked)} className="accent-blue-400" />
          Mostrar β₀ (nivel asintótico)
        </label>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={expHistData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 11 }} tickCount={8} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
            labelStyle={{ color: "#f9fafb", fontWeight: 600 }}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = { pi3y: "π exp. 3y", beta0: "β₀", rem12m: "REM 12m", rem24m: "REM 24m" };
              return [fmtPct(v), labels[name] ?? name];
            }}
          />
          {refLines.map(({ fecha, label }) => (
            <ReferenceLine key={fecha} x={fecha} stroke="#ef4444" strokeDasharray="4 2" strokeOpacity={0.5}
              label={{ value: label, fill: "#ef4444", fontSize: 9, position: "insideTopLeft" }} />
          ))}
          <Area dataKey="pi3y" stroke={C.pi3y} fill={C.pi3y} fillOpacity={0.15} strokeWidth={3} dot={false} name="pi3y" />
          {mostrarREM && (
            <>
              <Line dataKey="rem12m" stroke={C.rem12m} strokeWidth={1.5} dot={false} strokeDasharray="3 2" name="rem12m" />
              <Line dataKey="rem24m" stroke={C.rem24m} strokeWidth={1.5} dot={false} strokeDasharray="5 3" name="rem24m" />
            </>
          )}
          {mostrarBeta0 && (
            <Line dataKey="beta0" stroke={C.beta0} strokeWidth={1.5} dot={false} strokeDasharray="2 2" name="beta0" />
          )}
          <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-sm font-semibold text-gray-200 mb-1">Lectura clave</p>
        <p className="text-sm text-gray-400">
          El proxy <span className="text-emerald-400 font-medium">π exp. 3y</span> alcanzó su pico de{" "}
          <span className="text-white font-medium">59.9% en Nov 2022</span>, luego colapsó a{" "}
          <span className="text-white font-medium">-35% en Nov 2023</span> (devaluación Milei distorsionó la curva)
          y se reancló en <span className="text-white font-medium">9.2% en Feb 2026</span>: mínimo histórico
          de la serie, consistente con el régimen de desinflación activo.
        </p>
      </div>
    </div>
  );
}

// ── SHOCKS IRF ───────────────────────────────────────────────────────────────
const SHOCK_COLORS: Record<string, string> = {
  inflacion_ipc_ia:    C.inf,
  fiscal_primario_real: C.fiscal,
  tasa_politica_tna:   C.tasa,
  log_embi:            C.embi,
  var_tc_mensual:      C.tc,
};

function TabShocksIRF() {
  const [activeShock, setActiveShock] = useState("inflacion_ipc_ia");
  const serie = irfData.find((s) => s.shock === activeShock)!;
  const col = SHOCK_COLORS[activeShock] ?? C.pi3y;

  const chartData = serie.data.map((pt) => ({
    h: `${pt.h}m`,
    irf: pt.irf,
    lo68: pt.lo68,
    hi68: pt.hi68,
    band: [pt.lo68, pt.hi68] as [number, number],
  }));

  const interpretaciones: Record<string, string> = {
    inflacion_ipc_ia:     "Un shock de +1 DE en inflación IPC eleva las expectativas hasta +4 pp a los 2-3 meses. El efecto se disipa a los 12 meses. Principal mecanismo de desanclaje: inercia inflacionaria.",
    fiscal_primario_real: "Un deterioro fiscal de +1 DE sube las expectativas +2 pp en los primeros 3 meses. El efecto es estadísticamente significativo hasta el mes 4-5 y luego se vuelve incierto.",
    tasa_politica_tna:    "Un shock contractivo de +1 DE en BADLAR baja las expectativas −2.5 pp a los 4-5 meses. Evidencia de transmisión monetaria, aunque con rezago. El efecto revierte pasados los 12 meses.",
    log_embi:             "Un shock de riesgo país de +1 DE eleva las expectativas hasta +1.4 pp de forma persistente. El EMBI captura incertidumbre política y externa que impacta la credibilidad desinflacionaria.",
    var_tc_mensual:       "Un shock cambiario tiene efecto modesto y transitorio: +0.7 pp en el mes siguiente, que revierte en 2-3 meses. El pass-through a expectativas de LP parece bajo en el régimen actual.",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {irfData.map((s) => (
          <button
            key={s.shock}
            onClick={() => setActiveShock(s.shock)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeShock === s.shock ? "text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
            style={activeShock === s.shock ? { background: SHOCK_COLORS[s.shock] } : undefined}
          >
            {s.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="h" tick={{ fill: "#9ca3af", fontSize: 11 }} />
          <YAxis tickFormatter={(v) => fmtPp(v)} tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
            labelStyle={{ color: "#f9fafb" }}
            formatter={(v: number, name: string) => {
              if (name === "irf") return [fmtPp(v), "IRF punto"];
              if (name === "lo68") return [fmtPp(v), "IC 68% inf"];
              if (name === "hi68") return [fmtPp(v), "IC 68% sup"];
              return [v, name];
            }}
          />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 2" />
          <Area dataKey="hi68" stroke="transparent" fill={col} fillOpacity={0.12} />
          <Area dataKey="lo68" stroke="transparent" fill={col} fillOpacity={0.0} />
          <Line dataKey="irf" stroke={col} strokeWidth={3} dot={false} name="irf" />
          <Line dataKey="lo68" stroke={col} strokeWidth={1} dot={false} strokeDasharray="3 2" name="lo68" />
          <Line dataKey="hi68" stroke={col} strokeWidth={1} dot={false} strokeDasharray="3 2" name="hi68" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-sm font-semibold mb-1" style={{ color: col }}>Interpretación — {serie.label}</p>
        <p className="text-sm text-gray-400">{interpretaciones[activeShock]}</p>
        <p className="text-xs text-gray-500 mt-2">VAR(2) · Wild Bootstrap 2000 réplicas · IC 68% · Cholesky ordering · Datos: INDEC/BCRA/MECON/JP Morgan</p>
      </div>
    </div>
  );
}

// ── DRIVERS FEVD ─────────────────────────────────────────────────────────────
function TabDriversFEVD() {
  const colores = { inflacion: C.inf, tasa: C.tasa, fiscal: C.fiscal, embi: C.embi, tc: C.tc, propio: C.propio };
  const labels = { inflacion: "Inflación IPC", tasa: "Tasa BADLAR", fiscal: "Balance fiscal", embi: "Riesgo país", tc: "Tipo de cambio", propio: "Persistencia propia" };
  const keys = Object.keys(colores) as (keyof typeof colores)[];

  const last24 = fevdData.find((d) => d.h === 24)!;

  return (
    <div className="space-y-4">
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-sm font-semibold text-gray-200 mb-1">¿Qué explica el desanclaje?</p>
        <p className="text-sm text-gray-400">
          A 24 meses, la <span className="text-red-400 font-medium">inercia inflacionaria (IPC)</span> explica el{" "}
          {last24.inflacion}% de la varianza de las expectativas de largo plazo. Le siguen la{" "}
          <span className="text-emerald-400 font-medium">persistencia propia</span> ({last24.propio}%) y la{" "}
          <span className="text-blue-400 font-medium">política monetaria</span> ({last24.tasa}%).
          El canal fiscal ({last24.fiscal}%) y el EMBI ({last24.embi}%) tienen rol secundario.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={fevdData.filter((d) => d.h <= 24)} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis dataKey="h" tickFormatter={(v) => `${v}m`} tick={{ fill: "#9ca3af", fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: "#9ca3af", fontSize: 12 }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
            labelFormatter={(v) => `Horizonte: ${v} meses`}
            formatter={(v: number, name: string) => [`${v.toFixed(1)}%`, labels[name as keyof typeof labels] ?? name]}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} formatter={(v) => labels[v as keyof typeof labels] ?? v} />
          {keys.map((k) => (
            <Bar key={k} dataKey={k} stackId="a" fill={colores[k]} />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Tabla resumen h=24 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {keys.map((k) => (
          <div key={k} className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: colores[k] }} />
            <div>
              <div className="text-xs text-gray-400">{labels[k]}</div>
              <div className="text-base font-bold text-white">{last24[k as keyof typeof last24]}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export function ExpectativasSection() {
  const [tab, setTab] = useState<Tab>("Curva actual");

  const piActual = expSummary.pi3y;
  const varBeta0 = expSummary.beta0;
  const anclada = piActual < 15;

  return (
    <section className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Expectativas de Inflación — Proxy Nelson-Siegel
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Curva de expectativas implícita en el REM-BCRA · {expSummary.periodo} ·{" "}
          <span className="text-gray-500">VAR(2) Wild Bootstrap · UNCuyo 2026</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge label={anclada ? "Expectativas ancladas" : "Desanclaje activo"} color={anclada ? "#10b981" : "#ef4444"} />
          <span className="text-xs text-gray-500">Fuente: BCRA · INDEC · Minecon · JP Morgan</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">π exp. 3y</div>
          <div className="text-2xl font-black text-emerald-400">{piActual?.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">{expSummary.fecha}</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">β₀ (nivel LP)</div>
          <div className={`text-2xl font-black ${(varBeta0 ?? 0) < 0 ? "text-yellow-400" : "text-blue-400"}`}>
            {varBeta0?.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">asíntota NS</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Pico histórico</div>
          <div className="text-2xl font-black text-red-400">{expSummary.pi3y_pico}%</div>
          <div className="text-xs text-gray-500">{expSummary.fecha_pico}</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Driver 24m #1</div>
          <div className="text-2xl font-black text-red-400">40.8%</div>
          <div className="text-xs text-gray-500">inercia IPC</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 rounded-xl p-1 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 min-w-max py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
        {tab === "Curva actual"    && <TabCurvaActual />}
        {tab === "Serie histórica" && <TabSerieHistorica />}
        {tab === "Shocks IRF"     && <TabShocksIRF />}
        {tab === "Drivers FEVD"   && <TabDriversFEVD />}
      </div>

      {/* Metodología */}
      <details className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-sm text-gray-400">
        <summary className="cursor-pointer font-medium text-gray-300 select-none">▶ 📐 Metodología</summary>
        <div className="mt-3 space-y-2 leading-relaxed">
          <p><span className="font-semibold text-white">Paso 1 — Nelson-Siegel Diebold-Li:</span> Se fitea el modelo NS con λ=1.0 a las 5 expectativas del REM-BCRA (0.5y, 1y, 1.5y, 2y, 2.5y) por OLS cada mes. Se extrapola la curva a 3 años como proxy de expectativas de largo plazo (pi_exp_3y).</p>
          <p><span className="font-semibold text-white">Paso 2 — VAR(2) estructural:</span> VAR con 6 variables (fiscal, IPC i.a., BADLAR, π_exp_3y, Δtc, log-EMBI), p=2 lags seleccionados por BIC. Identificación por Cholesky (fiscal más exógeno, expectativas más endógenas).</p>
          <p><span className="font-semibold text-white">Paso 3 — Wild Bootstrap:</span> 2000 réplicas Rademacher para inferencia robusta a heterocedasticidad (ARCH-LM confirma efectos ARCH significativos en 4 de 6 variables). IC al 68% y 90%.</p>
          <p className="text-xs text-gray-500">Tesis: "Determinantes del desanclaje de expectativas de inflación en Argentina" · Santiago Murcia · Lic. Economía, UNCuyo 2026 · Datos: BCRA, INDEC, Minecon, JP Morgan vía Ámbito · Oct 2016 – Feb 2026 · 113 obs.</p>
        </div>
      </details>
    </section>
  );
}
