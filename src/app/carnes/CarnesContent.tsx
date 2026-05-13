'use client';

import {
  BarChart, Bar, LineChart, Line, ComposedChart, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  faenaMensual2026,
  faenaPorProvincia,
  faenaPorCategoria,
  exportacionesMensuales,
  destinosExport,
  topFrigorificos,
  kpisCarnes,
  ACTUALIZADO_AL,
  FAENA_FUENTE,
  EXPORT_FUENTE,
} from '@/data/carnes';

// ============================================================
// Charts del mercado de carnes
// ============================================================

const COLORS = {
  celeste: 'var(--celeste)',
  sol:     'var(--sol)',
  magenta: 'var(--magenta)',
  up:      'var(--up)',
  down:    'var(--down)',
  fg2:     'var(--fg-2)',
  line1:   'var(--line-1)',
};

const PIE_COLORS = ['#5DC1E0', '#D4A843', '#EC4899', '#10B981', '#A78BFA', '#F59E0B', '#3B82F6', '#EF4444'];

export default function CarnesContent() {
  return (
    <div className="space-y-10">
      {/* ─── KPIs ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="Faena bovina"
          value={`${(kpisCarnes.faenaUltimoMes.valor / 1000).toFixed(0)}k`}
          unit="cabezas"
          subtitle={kpisCarnes.faenaUltimoMes.mes}
          change={kpisCarnes.faenaUltimoMes.variacionMoM}
          color="celeste"
        />
        <KpiCard
          label="Exportaciones"
          value={`USD ${(kpisCarnes.exportValorUltimoMes.valor / 1000).toFixed(0)}M`}
          unit=""
          subtitle={kpisCarnes.exportValorUltimoMes.mes}
          change={kpisCarnes.exportValorUltimoMes.variacionMoM}
          changeYoY={kpisCarnes.exportValorUltimoMes.variacionYoY ?? undefined}
          color="sol"
        />
        <KpiCard
          label="Precio FOB"
          value={`USD ${kpisCarnes.precioFobPromedio.valor.toLocaleString('es-AR')}`}
          unit="por tn"
          subtitle={kpisCarnes.precioFobPromedio.mes}
          change={kpisCarnes.precioFobPromedio.variacionMoM}
          changeYoY={kpisCarnes.precioFobPromedio.variacionYoY ?? undefined}
          color="magenta"
        />
        <KpiCard
          label="Top destino"
          value={kpisCarnes.topDestino.pais}
          unit=""
          subtitle={`${kpisCarnes.topDestino.participacion}% del volumen`}
          color="celeste"
        />
      </div>

      {/* ─── Faena mensual 2026 ─── */}
      <ChartCard
        title="Faena bovina mensual 2026"
        subtitle="Cabezas faenadas por mes · Fuente: SAGyP"
      >
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={faenaMensual2026} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid stroke={COLORS.line1} strokeDasharray="2 4" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: COLORS.fg2 }} />
            <YAxis tick={{ fontSize: 11, fill: COLORS.fg2 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: unknown): string => typeof v === 'number' ? `${v.toLocaleString('es-AR')} cabezas` : '—'}
            />
            <Bar dataKey="cabezas" name="Cabezas faenadas" fill={COLORS.celeste} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ─── Faena por provincia ─── */}
      <ChartCard
        title="Faena por provincia"
        subtitle="Acumulado enero-abril 2026 · % sobre total nacional"
      >
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={faenaPorProvincia}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 90, bottom: 5 }}
          >
            <CartesianGrid stroke={COLORS.line1} strokeDasharray="2 4" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: COLORS.fg2 }} tickFormatter={(v) => `${v}%`} />
            <YAxis
              type="category"
              dataKey="provincia"
              tick={{ fontSize: 11, fill: COLORS.fg2 }}
              width={90}
            />
            <Tooltip
              contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: unknown, _name: unknown, item: unknown): string => {
                if (typeof v !== 'number') return '—';
                const cabezas = (item as { payload?: { cabezas?: number } })?.payload?.cabezas;
                return `${v.toFixed(1)}% · ${cabezas ? cabezas.toLocaleString('es-AR') : ''} cabezas`;
              }}
            />
            <Bar dataKey="participacion" fill={COLORS.sol} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ─── Exportaciones — dual axis ─── */}
      <ChartCard
        title="Exportaciones de carne vacuna"
        subtitle="Volumen y valor mensual · Ene-25 a Mar-26 · Fuente: IPCVA / INDEC"
      >
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={exportacionesMensuales} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid stroke={COLORS.line1} strokeDasharray="2 4" />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fill: COLORS.fg2 }} interval={1} />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: COLORS.fg2 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              label={{ value: 'Toneladas', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: COLORS.fg2 } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: COLORS.fg2 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}M`}
              label={{ value: 'USD', angle: 90, position: 'insideRight', style: { fontSize: 11, fill: COLORS.fg2 } }}
            />
            <Tooltip
              contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: unknown, name: unknown): string => {
                if (typeof v !== 'number') return '—';
                if (name === 'Toneladas') return `${v.toLocaleString('es-AR')} tn`;
                if (name === 'Valor USD') return `USD ${(v / 1000).toFixed(1)}M`;
                return String(v);
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="toneladas" name="Toneladas" fill={COLORS.celeste} opacity={0.7} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="valorUsdMiles" name="Valor USD" stroke={COLORS.sol} strokeWidth={2.5} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ─── Destinos exportación (pie) + Precios FOB (lista) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Destinos de exportación"
          subtitle="Participación por volumen · 3M-2026"
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={destinosExport.filter((d) => d.participacionVolumen >= 0.5)}
                dataKey="participacionVolumen"
                nameKey="pais"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                paddingAngle={1}
              >
                {destinosExport.filter((d) => d.participacionVolumen >= 0.5).map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
                formatter={(v: unknown): string => typeof v === 'number' ? `${v.toFixed(1)}%` : '—'}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Precio FOB por destino"
          subtitle="USD por tonelada · 3M-2026"
        >
          <div className="space-y-1.5 mt-2">
            {[...destinosExport]
              .filter((d) => d.precioFob > 0 && d.pais !== 'Otros')
              .sort((a, b) => b.precioFob - a.precioFob)
              .slice(0, 10)
              .map((d) => {
                const maxFob = 18000;
                const widthPct = Math.min(100, (d.precioFob / maxFob) * 100);
                return (
                  <div key={d.pais} className="flex items-center gap-3 text-[12px]">
                    <div className="w-24 text-[var(--fg-1)] truncate">{d.pais}</div>
                    <div className="flex-1 h-5 bg-[var(--bg-1)] rounded relative">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--celeste)] to-[var(--sol)] rounded"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <div className="w-20 text-right tnum text-[var(--fg-0)]">
                      ${d.precioFob.toLocaleString('es-AR')}
                    </div>
                  </div>
                );
              })}
          </div>
        </ChartCard>
      </div>

      {/* ─── Faena por categoría ─── */}
      <ChartCard
        title="Faena por categoría animal"
        subtitle="Acumulado ene-abr 2026 · Composición del rodeo faenado"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={faenaPorCategoria}
                dataKey="participacion"
                nameKey="categoria"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
              >
                {faenaPorCategoria.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
                formatter={(v: unknown): string => typeof v === 'number' ? `${v.toFixed(1)}%` : '—'}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {faenaPorCategoria.map((c, i) => (
              <div key={c.categoria} className="flex items-center gap-3 text-[13px]">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span className="flex-1 text-[var(--fg-1)]">{c.categoria}</span>
                <span className="tnum text-[var(--fg-0)]">{c.participacion.toFixed(1)}%</span>
                <span className="tnum text-[var(--fg-3)] text-[11px] w-20 text-right">
                  {(c.cabezas / 1000).toFixed(0)}k cab.
                </span>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>

      {/* ─── Top frigoríficos ─── */}
      <ChartCard
        title="Top 10 frigoríficos"
        subtitle="Por cabezas faenadas · Acumulado ene-abr 2026"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="border-b border-[var(--line-1)]">
              <tr className="text-left text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Razón social</th>
                <th className="py-2 pr-3">Provincia</th>
                <th className="py-2 text-right">Cabezas</th>
              </tr>
            </thead>
            <tbody>
              {topFrigorificos.map((f, i) => (
                <tr key={f.razonSocial} className="border-b border-[var(--line-1)] hover:bg-[var(--bg-1)] transition-colors">
                  <td className="py-2.5 pr-3 text-[var(--fg-3)] tnum">{i + 1}</td>
                  <td className="py-2.5 pr-3 text-[var(--fg-0)] font-medium">{f.razonSocial}</td>
                  <td className="py-2.5 pr-3 text-[var(--fg-2)]">{f.provincia}</td>
                  <td className="py-2.5 text-right tnum text-[var(--fg-0)]">{f.cabezas.toLocaleString('es-AR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* ─── Fuentes ─── */}
      <div className="glass p-4 text-[12px] text-[var(--fg-2)] leading-relaxed">
        <strong className="text-[var(--fg-1)]">Fuentes:</strong> Faena bovina —{' '}
        {FAENA_FUENTE}. Exportaciones — {EXPORT_FUENTE}. Snapshot al{' '}
        <strong className="text-[var(--fg-1)]">{ACTUALIZADO_AL}</strong>.
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────

function KpiCard({
  label, value, unit, subtitle, change, changeYoY, color,
}: {
  label: string;
  value: string;
  unit: string;
  subtitle: string;
  change?: number;
  changeYoY?: number;
  color: 'celeste' | 'sol' | 'magenta';
}) {
  const colorClass =
    color === 'celeste' ? 'text-[var(--celeste)]' :
    color === 'sol' ? 'text-[var(--sol)]' :
    'text-[var(--magenta)]';
  return (
    <div className="glass p-4">
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-1">{label}</div>
      <div className={`text-xl sm:text-2xl font-semibold ${colorClass} tnum leading-tight`}>{value}</div>
      {unit && <div className="text-[11px] text-[var(--fg-3)]">{unit}</div>}
      <div className="text-[11px] text-[var(--fg-3)] mt-1">{subtitle}</div>
      {(change !== undefined || changeYoY !== undefined) && (
        <div className="mt-2 flex items-center gap-2 text-[11px] tnum">
          {change !== undefined && (
            <span className={change >= 0 ? 'text-[var(--up)]' : 'text-[var(--down)]'}>
              {change >= 0 ? '+' : ''}{change.toFixed(1)}% MoM
            </span>
          )}
          {changeYoY !== undefined && (
            <span className={changeYoY >= 0 ? 'text-[var(--up)]' : 'text-[var(--down)]'}>
              {changeYoY >= 0 ? '+' : ''}{changeYoY.toFixed(1)}% YoY
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="glass p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-[var(--fg-0)]">{title}</h2>
        <p className="text-[12px] text-[var(--fg-2)]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
