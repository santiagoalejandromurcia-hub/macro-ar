'use client';

import {
  BarChart, Bar, ComposedChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  exportMensual,
  volumenExternoMensual,
  composicionExterno,
  mercadoInternoMensual,
  envasesInterno,
  acumuladoExterno,
  kpisUva,
  ACTUALIZADO_AL,
  FUENTE_INV,
} from '@/data/uva';

const COLORS = {
  celeste: 'var(--celeste)',
  sol:     'var(--sol)',
  magenta: 'var(--magenta)',
  up:      'var(--up)',
  down:    'var(--down)',
  fg2:     'var(--fg-2)',
  line1:   'var(--line-1)',
};

const PIE_COLORS = ['#7C2D5C', '#D4A843', '#5DC1E0', '#A78BFA', '#EC4899'];

export default function UvaContent() {
  return (
    <div className="space-y-10">
      {/* ─── KPIs ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="Export. abril"
          value={`USD ${(kpisUva.exportAbril.valor / 1000).toFixed(1)}M`}
          subtitle={kpisUva.exportAbril.mes}
          changeYoY={kpisUva.exportAbril.variacionYoY}
          color="magenta"
        />
        <KpiCard
          label="Vino granel"
          value={`${(kpisUva.vinoGranel.valor / 1000).toFixed(0)}k hl`}
          subtitle={kpisUva.vinoGranel.mes}
          changeYoY={kpisUva.vinoGranel.variacionYoY}
          color="celeste"
        />
        <KpiCard
          label="Mercado interno"
          value={`${(kpisUva.mercadoInterno.valor / 1000).toFixed(0)}k hl`}
          subtitle={kpisUva.mercadoInterno.mes}
          changeYoY={kpisUva.mercadoInterno.variacionYoY}
          changeMoM={kpisUva.mercadoInterno.variacionMoM}
          color="sol"
        />
        <KpiCard
          label="Mosto concentrado"
          value={`USD ${(kpisUva.mostoConcentrado.valor / 1000).toFixed(1)}M`}
          subtitle={kpisUva.mostoConcentrado.mes}
          changeYoY={kpisUva.mostoConcentrado.variacionYoY}
          color="celeste"
        />
      </div>

      {/* ─── Exportaciones mensuales — vinos + mostos ─── */}
      <ChartCard
        title="Exportaciones de vinos y mostos"
        subtitle="Valor FOB mensual (USD miles) · Ene-25 a Abr-26 · Fuente: INV"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={exportMensual} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid stroke={COLORS.line1} strokeDasharray="2 4" />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fill: COLORS.fg2 }} />
            <YAxis tick={{ fontSize: 11, fill: COLORS.fg2 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}M`} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: unknown): string => typeof v === 'number' ? `USD ${(v / 1000).toFixed(2)}M` : '—'}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="vinosUsdMiles"  stackId="a" name="Vinos"  fill={COLORS.magenta} radius={[0, 0, 0, 0]} />
            <Bar dataKey="mostosUsdMiles" stackId="a" name="Mostos" fill={COLORS.sol}     radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ─── Volumen externo — fraccionado vs granel ─── */}
      <ChartCard
        title="Volumen exportado: fraccionado vs granel"
        subtitle="Hectolitros mensuales — el granel explotó +69.8% YoY"
      >
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={volumenExternoMensual} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid stroke={COLORS.line1} strokeDasharray="2 4" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: COLORS.fg2 }} />
            <YAxis tick={{ fontSize: 11, fill: COLORS.fg2 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: unknown): string => typeof v === 'number' ? `${v.toLocaleString('es-AR')} hl` : '—'}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar  dataKey="fraccionadoHl" name="Fraccionado" fill={COLORS.celeste} radius={[4, 4, 0, 0]} />
            <Bar  dataKey="granelHl"      name="Granel"      fill={COLORS.sol}     radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ─── Composición externo abril 2026 ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Composición de exportaciones"
          subtitle="Abril 2026 · % por tipo de vino"
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={composicionExterno}
                dataKey="participacion"
                nameKey="tipo"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={45}
              >
                {composicionExterno.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
                formatter={(v: unknown): string => typeof v === 'number' ? `${v.toFixed(1)}%` : '—'}
              />
              <Legend wrapperStyle={{ fontSize: 10 }} iconSize={9} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Mercado interno por envase"
          subtitle="Variación interanual marzo 2026 vs 2025"
        >
          <div className="space-y-2 mt-2">
            {envasesInterno.map((e) => {
              const max = 100;
              const widthPct = Math.min(100, Math.abs(e.varInteranualPct) / max * 100);
              const positive = e.varInteranualPct >= 0;
              return (
                <div key={e.tipo} className="flex items-center gap-3 text-[12px]">
                  <div className="w-28 text-[var(--fg-1)] truncate">{e.tipo}</div>
                  <div className="flex-1 h-5 bg-[var(--bg-1)] rounded relative">
                    <div
                      className={`h-full rounded ${positive ? 'bg-[var(--up)]' : 'bg-[var(--down)]'}`}
                      style={{ width: `${widthPct}%`, opacity: 0.8 }}
                    />
                  </div>
                  <div className={`w-16 text-right tnum ${positive ? 'text-[var(--up)]' : 'text-[var(--down)]'}`}>
                    {positive ? '+' : ''}{e.varInteranualPct.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[11px] text-[var(--fg-3)] leading-relaxed">
            La damajuana y el bag in box siguen retrocediendo fuerte. Botella + tetra brik
            crecen, evidenciando una recomposición hacia envases premium e individuales.
          </p>
        </ChartCard>
      </div>

      {/* ─── Mercado interno mensual ─── */}
      <ChartCard
        title="Mercado interno — ventas mensuales"
        subtitle="Hectolitros · 1er trimestre 2026"
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={mercadoInternoMensual} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid stroke={COLORS.line1} strokeDasharray="2 4" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: COLORS.fg2 }} />
            <YAxis tick={{ fontSize: 11, fill: COLORS.fg2 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-1)', border: `1px solid ${COLORS.line1}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: unknown): string => typeof v === 'number' ? `${v.toLocaleString('es-AR')} hl` : '—'}
            />
            <Bar dataKey="vinoTotalHl" name="Vino total" fill={COLORS.magenta} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ─── Acumulado ene-abr ─── */}
      <ChartCard
        title="Acumulado ene-abr 2025 vs 2026"
        subtitle="Valor FOB USD miles · INV / SIM"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          <AcumCard label="Vinos 2025" value={acumuladoExterno.vinos2025} />
          <AcumCard label="Vinos 2026" value={acumuladoExterno.vinos2026} highlight />
          <AcumCard label="Mostos 2025" value={acumuladoExterno.mostos2025} />
          <AcumCard label="Mostos 2026" value={acumuladoExterno.mostos2026} highlight />
          <AcumCard
            label="Total 2025"
            value={acumuladoExterno.total2025}
            sub="USD miles"
          />
          <AcumCard
            label="Total 2026"
            value={acumuladoExterno.total2026}
            sub="USD miles"
            highlight
          />
          <div className="col-span-2 glass p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-1">Variación total</div>
            <div className="text-2xl font-semibold text-[var(--up)] tnum">
              +{acumuladoExterno.varTotalPct.toFixed(1)}%
            </div>
            <div className="text-[11px] text-[var(--fg-3)] mt-1">
              Mostos: <span className="text-[var(--up)]">+{acumuladoExterno.varMostosPct.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* ─── Fuentes ─── */}
      <div className="glass p-4 text-[12px] text-[var(--fg-2)] leading-relaxed">
        <strong className="text-[var(--fg-1)]">Fuente:</strong> {FUENTE_INV}. Snapshot al{' '}
        <strong className="text-[var(--fg-1)]">{ACTUALIZADO_AL}</strong>. Datos provisorios,
        sujetos a revisión por declaraciones juradas y rectificativas.
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────

function KpiCard({
  label, value, subtitle, changeYoY, changeMoM, color,
}: {
  label: string;
  value: string;
  subtitle: string;
  changeYoY?: number;
  changeMoM?: number;
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
      <div className="text-[11px] text-[var(--fg-3)] mt-1">{subtitle}</div>
      {(changeYoY !== undefined || changeMoM !== undefined) && (
        <div className="mt-2 flex items-center gap-2 text-[11px] tnum">
          {changeMoM !== undefined && (
            <span className={changeMoM >= 0 ? 'text-[var(--up)]' : 'text-[var(--down)]'}>
              {changeMoM >= 0 ? '+' : ''}{changeMoM.toFixed(1)}% MoM
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

function AcumCard({
  label, value, sub, highlight,
}: { label: string; value: number; sub?: string; highlight?: boolean }) {
  return (
    <div className={`glass p-3 ${highlight ? 'ring-1 ring-[var(--magenta)]/30' : ''}`}>
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-1">{label}</div>
      <div className={`text-lg font-semibold tnum ${highlight ? 'text-[var(--magenta)]' : 'text-[var(--fg-0)]'}`}>
        {value.toLocaleString('es-AR')}
      </div>
      {sub && <div className="text-[10px] text-[var(--fg-3)]">{sub}</div>}
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
