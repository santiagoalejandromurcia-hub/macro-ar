"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import {
  dolarizacionData,
  dolarizacionSummary,
  eventosHistoricos,
} from "@/data/dolarizacionData";

// ─── helpers ─────────────────────────────────────────────────────────────────

function fmt(v: number | null | undefined, dec = 1) {
  if (v == null) return "—";
  return v.toFixed(dec);
}

const TABS = ["Evolución histórica", "Dólares en bancos", "Contexto macro"] as const;
type Tab = (typeof TABS)[number];

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function DolarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm shadow-xl">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{fmt(p.value, 2)}%</span>
        </p>
      ))}
    </div>
  );
}

function DepTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm shadow-xl">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value.toLocaleString("es-AR")} mm USD</span>
        </p>
      ))}
    </div>
  );
}

function MacroTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm shadow-xl">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{fmt(p.value, 1)}{p.name.includes("IPC") ? "%" : "%"}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Sub-tabs ─────────────────────────────────────────────────────────────────

function TabEvolucion() {
  const xTicks = dolarizacionData
    .filter((d) => d.fecha.endsWith("-01") || d.fecha.endsWith("-07"))
    .map((d) => d.fecha);

  const eventos = Object.fromEntries(eventosHistoricos.map((e) => [e.fecha, e]));

  return (
    <div className="space-y-4">
      <p className="text-gray-400 text-sm leading-relaxed">
        Porcentaje del total de depósitos bancarios denominado en dólares, valuado a tipo de cambio oficial y blue.
        Un valor alto refleja desconfianza en el peso; la caída post-2024 indica re-pesos y confianza creciente.
      </p>

      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={dolarizacionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradOf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="fecha"
            ticks={xTicks}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickFormatter={(v) => v.slice(0, 7)}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 45]}
          />
          <Tooltip content={<DolarTooltip />} />
          <Legend
            wrapperStyle={{ color: "#9ca3af", fontSize: 12 }}
          />
          {eventosHistoricos.map((e) => (
            <ReferenceLine
              key={e.fecha}
              x={e.fecha}
              stroke={e.color}
              strokeDasharray="4 3"
              strokeOpacity={0.7}
              label={{ value: e.label, position: "top", fill: e.color, fontSize: 9 }}
            />
          ))}
          <Area
            type="monotone"
            dataKey="dolarOf"
            name="TC Oficial"
            stroke="#3b82f6"
            fill="url(#gradOf)"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="dolarBlue"
            name="TC Blue"
            stroke="#8b5cf6"
            fill="url(#gradBlue)"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
        {[
          { label: "Actual (Feb 2026)", val: `${fmt(dolarizacionSummary.actual)}%`, sub: "TC Oficial", color: "text-blue-400" },
          { label: "Máximo histórico", val: `${fmt(dolarizacionSummary.maximo)}%`, sub: dolarizacionSummary.maximoFecha, color: "text-red-400" },
          { label: "Mínimo histórico", val: `${fmt(dolarizacionSummary.minimo)}%`, sub: dolarizacionSummary.minimoFecha, color: "text-green-400" },
          {
            label: "Variación 12 meses",
            val: `${dolarizacionSummary.variacion12m > 0 ? "+" : ""}${fmt(dolarizacionSummary.variacion12m)} pp`,
            sub: "vs Feb 2025",
            color: dolarizacionSummary.variacion12m < 0 ? "text-green-400" : "text-red-400",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
            <p className="text-gray-500 text-xs mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold ${kpi.color}`}>{kpi.val}</p>
            <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabDepositos() {
  const xTicks = dolarizacionData
    .filter((d) => d.fecha.endsWith("-01") || d.fecha.endsWith("-07"))
    .map((d) => d.fecha);

  // Compute yearly averages for bar chart context
  const yearData = Object.values(
    dolarizacionData.reduce<Record<string, { year: string; sum: number; count: number }>>(
      (acc, d) => {
        const y = d.fecha.slice(0, 4);
        if (!acc[y]) acc[y] = { year: y, sum: 0, count: 0 };
        acc[y].sum += d.depUsd;
        acc[y].count += 1;
        return acc;
      },
      {}
    )
  ).map((d) => ({ year: d.year, depUsd: Math.round(d.sum / d.count) }));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Evolución mensual de los depósitos en dólares en el sistema bancario argentino (en millones de USD).
          La caída post-2019 refleja corrida bancaria; la recuperación post-2023 muestra re-dolarización parcial
          dentro del sistema formal bajo el nuevo gobierno.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={dolarizacionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradDep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="fecha"
              ticks={xTicks}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickFormatter={(v) => v.slice(0, 7)}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<DepTooltip />} />
            {eventosHistoricos.map((e) => (
              <ReferenceLine
                key={e.fecha}
                x={e.fecha}
                stroke={e.color}
                strokeDasharray="4 3"
                strokeOpacity={0.6}
              />
            ))}
            <Area
              type="monotone"
              dataKey="depUsd"
              name="Depósitos USD"
              stroke="#22c55e"
              fill="url(#gradDep)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="text-gray-400 text-xs mb-2">Promedio anual — depósitos en USD (mm USD)</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={yearData} margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="year" tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm">
                    <p className="text-gray-400">{label}</p>
                    <p className="text-green-400 font-bold">
                      {Number(payload[0].value).toLocaleString("es-AR")} mm USD
                    </p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="depUsd" name="Depósitos USD" fill="#22c55e" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TabContexto() {
  const data = dolarizacionData.filter((d) => d.ipc !== null);
  const xTicks = data
    .filter((d) => d.fecha.endsWith("-01") || d.fecha.endsWith("-07"))
    .map((d) => d.fecha);

  return (
    <div className="space-y-4">
      <p className="text-gray-400 text-sm leading-relaxed">
        La dolarización de portafolios tiende a subir cuando la inflación interanual acelera
        (correlación positiva) y a bajar cuando la inflación cede. El desanclaje de
        expectativas retroalimenta la demanda de activos dolarizados.
      </p>

      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="fecha"
            ticks={xTicks}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickFormatter={(v) => v.slice(0, 7)}
          />
          <YAxis
            yAxisId="dol"
            orientation="left"
            tick={{ fill: "#3b82f6", fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 45]}
            label={{ value: "Dolariz. (%)", angle: -90, position: "insideLeft", fill: "#3b82f6", fontSize: 11, dx: -5 }}
          />
          <YAxis
            yAxisId="ipc"
            orientation="right"
            tick={{ fill: "#f97316", fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 320]}
            label={{ value: "IPC i.a. (%)", angle: 90, position: "insideRight", fill: "#f97316", fontSize: 11, dx: 10 }}
          />
          <Tooltip content={<MacroTooltip />} />
          <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
          {eventosHistoricos.map((e) => (
            <ReferenceLine
              key={e.fecha}
              x={e.fecha}
              yAxisId="dol"
              stroke={e.color}
              strokeDasharray="4 3"
              strokeOpacity={0.5}
            />
          ))}
          <Line
            yAxisId="dol"
            type="monotone"
            dataKey="dolarOf"
            name="Dolarización TC Of. (%)"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="ipc"
            type="monotone"
            dataKey="ipc"
            name="IPC interanual (%)"
            stroke="#f97316"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 text-sm">
        <p className="text-gray-300 font-medium mb-2">Lecturas clave</p>
        <ul className="space-y-1.5 text-gray-400 text-xs leading-relaxed">
          <li>• <span className="text-white">Sep 2018:</span> dolarización pico de 36.7% — crisis cambiaria, BCRA sube tasas al 60% TNA.</li>
          <li>• <span className="text-white">2019–2021:</span> dolarización alta y estable pese al cepo. Brecha ensanchada actúa como proxy de desconfianza.</li>
          <li>• <span className="text-white">Nov 2023:</span> mínimo histórico de 7.5% justo antes de la devaluación Milei — el dato de TC oficial subestimaba el verdadero valor.</li>
          <li>• <span className="text-white">Feb 2026:</span> 9.0% — confianza en el peso en máximos desde 2016, IPC i.a. convergiendo a 33%.</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DolarizacionSection() {
  const [tab, setTab] = useState<Tab>("Evolución histórica");

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">💵</span>
          <h1 className="text-2xl font-bold text-white">Dolarización de Portafolios</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Proxy de confianza en el peso · Depósitos en USD como % del total bancario · Argentina 2016–2026
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-4">
          <p className="text-blue-300 text-xs mb-1">Dolarización actual</p>
          <p className="text-3xl font-bold text-blue-400">{fmt(dolarizacionSummary.actual)}%</p>
          <p className="text-gray-500 text-xs mt-1">{dolarizacionSummary.fechaActualizacion} · TC Oficial</p>
        </div>
        <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Máximo histórico</p>
          <p className="text-3xl font-bold text-red-400">{fmt(dolarizacionSummary.maximo)}%</p>
          <p className="text-gray-500 text-xs mt-1">Sep 2018 · Crisis TC</p>
        </div>
        <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Dep. USD en bancos</p>
          <p className="text-3xl font-bold text-green-400">
            USD {(dolarizacionSummary.depUsdActual / 1000).toFixed(1)}bn
          </p>
          <p className="text-gray-500 text-xs mt-1">Sistema bancario formal</p>
        </div>
        <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Variación 12 meses</p>
          <p className={`text-3xl font-bold ${dolarizacionSummary.variacion12m < 0 ? "text-green-400" : "text-red-400"}`}>
            {dolarizacionSummary.variacion12m > 0 ? "+" : ""}{fmt(dolarizacionSummary.variacion12m)} pp
          </p>
          <p className="text-gray-500 text-xs mt-1">vs Feb 2025</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {tab === "Evolución histórica" && <TabEvolucion />}
        {tab === "Dólares en bancos" && <TabDepositos />}
        {tab === "Contexto macro" && <TabContexto />}
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-600 border-t border-gray-800 pt-3">
        Fuentes: BCRA (depósitos bancarios en USD y ARS), INDEC (IPC). Dolarización = (Dep.USD × TC_Oficial) / (Dep.USD × TC_Oficial + Dep.ARS) × 100.
        Datos construidos con series oficiales Oct 2016 – Feb 2026.
      </div>
    </section>
  );
}
