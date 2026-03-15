'use client';

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, ComposedChart, Cell,
} from 'recharts';
import ChartCard from './ChartCard';
import { useTheme } from './ThemeProvider';
import {
  emaeData, pbiData, sectorData, fiscalData, taxData,
  tradeData, reservasData, tcrData, inflacionData, remData,
} from '@/data/macroData';

/* ─── Theme-aware chart config ─── */
function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return {
    axis: { fontSize: 11, fill: isDark ? '#64748B' : '#94A3B8' },
    grid: { strokeDasharray: '3 3' as const, stroke: isDark ? '#1E293B' : '#E2E8F0' },
    tooltipBg: isDark ? '#111827' : '#FFFFFF',
    tooltipBorder: isDark ? '#1E293B' : '#E2E8F0',
    tooltipLabel: isDark ? '#94A3B8' : '#64748B',
    tooltipValue: isDark ? '#F1F5F9' : '#0F172A',
    refLine: isDark ? '#475569' : '#CBD5E1',
    textPrimary: isDark ? '#F1F5F9' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    tableBg: isDark ? 'rgba(116,172,223,0.05)' : 'rgba(116,172,223,0.08)',
    tableHover: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    tableText: isDark ? '#CBD5E1' : '#334155',
  };
}

/* ─── Custom Tooltip ─── */
function ThemedTooltip({ active, payload, label }: any) {
  const t = useChartTheme();
  if (!active || !payload) return null;
  return (
    <div style={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}` }} className="rounded-lg p-3 shadow-xl text-xs">
      <p style={{ color: t.tooltipLabel }} className="mb-1.5 font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: t.tooltipLabel }}>{p.name}:</span>
          <span style={{ color: t.tooltipValue }} className="font-mono font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ EMAE ═══════════ */
export function EmaeChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="EMAE — Estimador Mensual de Actividad Económica" subtitle="Índice base 2004=100 · Serie desestacionalizada y tendencia">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={emaeData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} interval={2} />
          <YAxis tick={t.axis} domain={['auto', 'auto']} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Area type="monotone" dataKey="value" name="EMAE" stroke="#74ACDF" fill="#74ACDF" fillOpacity={0.08} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="trend" name="Tendencia" stroke="#D4A843" strokeWidth={2} strokeDasharray="6 3" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ PBI ═══════════ */
export function PBIBarChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="PBI — Variación Interanual" subtitle="Trimestral (%)">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={pbiData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="quarter" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <ReferenceLine y={0} stroke={t.refLine} strokeWidth={1} />
          <Bar dataKey="yoy" name="Var. interanual %" radius={[4, 4, 0, 0]}>
            {pbiData.map((entry, i) => (
              <Cell key={i} fill={entry.yoy >= 0 ? '#22C55E' : '#EF4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ SECTORES ═══════════ */
export function SectorChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="Actividad por Sector" subtitle="Variación interanual (%)">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid {...t.grid} horizontal={false} />
          <XAxis type="number" tick={t.axis} />
          <YAxis type="category" dataKey="sector" tick={t.axis} width={90} />
          <Tooltip content={<ThemedTooltip />} />
          <Bar dataKey="value" name="Var. %" radius={[0, 4, 4, 0]}>
            {sectorData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ FISCAL ═══════════ */
export function FiscalChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="Resultado Fiscal — Primario y Financiero" subtitle="% del PIB · Acumulado 12 meses">
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={fiscalData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="period" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <ReferenceLine y={0} stroke={t.refLine} strokeDasharray="4 2" />
          <Area type="monotone" dataKey="primario" name="Resultado Primario" stroke="#22C55E" fill="#22C55E" fillOpacity={0.06} strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="financiero" name="Resultado Financiero" stroke="#74ACDF" strokeWidth={2.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ TABLA TRIBUTARIA ═══════════ */
export function TaxTable() {
  const t = useChartTheme();
  return (
    <ChartCard title="Recaudación Tributaria Nacional" subtitle="Acumulado 2025 · En millones de ARS">
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-theme">
              <th className="text-left py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Concepto</th>
              <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Monto (M)</th>
              <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">% PIB</th>
              <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Var. real</th>
            </tr>
          </thead>
          <tbody>
            {taxData.map((row) => (
              <tr key={row.concepto} className={`border-b border-theme ${row.concepto === 'TOTAL' ? 'font-semibold' : ''}`}
                style={{ backgroundColor: row.concepto === 'TOTAL' ? t.tableBg : undefined }}
                onMouseEnter={(e) => { if (row.concepto !== 'TOTAL') e.currentTarget.style.backgroundColor = t.tableHover; }}
                onMouseLeave={(e) => { if (row.concepto !== 'TOTAL') e.currentTarget.style.backgroundColor = ''; }}
              >
                <td className="py-2.5 px-3" style={{ color: t.tableText }}>{row.concepto}</td>
                <td className="py-2.5 px-3 text-right font-mono" style={{ color: t.tableText }}>{row.monto}</td>
                <td className="py-2.5 px-3 text-right font-mono text-ar-celeste">{row.pctPIB}</td>
                <td className="py-2.5 px-3 text-right font-mono text-ar-green">{row.variacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}

/* ═══════════ BALANZA COMERCIAL ═══════════ */
export function TradeChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="Balanza Comercial" subtitle="Exportaciones vs Importaciones (USD M) + Saldo">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={tradeData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="month" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Bar dataKey="exports" name="Exportaciones" fill="#22C55E" radius={[4, 4, 0, 0]} opacity={0.8} />
          <Bar dataKey="imports" name="Importaciones" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.8} />
          <Line type="monotone" dataKey="balance" name="Saldo" stroke="#D4A843" strokeWidth={2.5} dot={{ r: 3, fill: '#D4A843' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ RESERVAS BCRA ═══════════ */
export function ReservasChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="Reservas Internacionales BCRA" subtitle="USD millones · Brutas">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={reservasData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} domain={['auto', 'auto']} />
          <Tooltip content={<ThemedTooltip />} />
          <Area type="monotone" dataKey="value" name="Reservas (USD M)" stroke="#D4A843" fill="#D4A843" fillOpacity={0.1} strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ TIPO DE CAMBIO ═══════════ */
export function TCRChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="Tipo de Cambio" subtitle="Oficial, Blue y MEP (ARS/USD)">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={tcrData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Line type="monotone" dataKey="oficial" name="Oficial" stroke="#74ACDF" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="blue" name="Blue" stroke="#22C55E" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="mep" name="MEP" stroke="#D4A843" strokeWidth={2} dot={false} strokeDasharray="5 3" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ INFLACIÓN MENSUAL ═══════════ */
export function InflacionMensualChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="IPC — Inflación Mensual" subtitle="Nivel general y núcleo (%)">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={inflacionData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Bar dataKey="mensual" name="IPC Mensual %" fill="#EF4444" radius={[3, 3, 0, 0]} opacity={0.7} />
          <Line type="monotone" dataKey="nucleo" name="Núcleo %" stroke="#D4A843" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ INFLACIÓN INTERANUAL ═══════════ */
export function InflacionInteranualChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="IPC — Inflación Interanual" subtitle="Var. % respecto al mismo mes del año anterior">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={inflacionData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Area type="monotone" dataKey="interanual" name="Interanual %" stroke="#EF4444" fill="#EF4444" fillOpacity={0.08} strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* ═══════════ REM ═══════════ */
export function REMChart() {
  const t = useChartTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <ChartCard title="Inflación Esperada — REM (BCRA)" subtitle="Expectativas IPC mensual (%) · Fuente: REM feb-26 e INDEC">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={remData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="period" tick={t.axis} />
          <YAxis tick={t.axis} domain={[0.5, 4]} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Area type="monotone" dataKey="r90" name="Rango 90-10" stroke="none" fill="#94A3B8" fillOpacity={isDark ? 0.15 : 0.12} />
          <Area type="monotone" dataKey="r10" name="_hide1" stroke="none" fill={isDark ? '#0A0E17' : '#F8FAFC'} fillOpacity={1} legendType="none" />
          <Area type="monotone" dataKey="r75" name="Rango 25-75" stroke="none" fill="#3B5998" fillOpacity={isDark ? 0.3 : 0.2} />
          <Area type="monotone" dataKey="r25" name="_hide2" stroke="none" fill={isDark ? '#0A0E17' : '#F8FAFC'} fillOpacity={1} legendType="none" />
          <Line type="monotone" dataKey="mediana" name="Mediana" stroke="#8B0000" strokeWidth={2.5} dot={{ r: 4, fill: '#8B0000' }} />
          <Line type="monotone" dataKey="actual" name="Dato IPC - INDEC" stroke={isDark ? '#E2E8F0' : '#1a1a1a'} strokeWidth={2.5} dot={{ r: 5, fill: isDark ? '#E2E8F0' : '#1a1a1a', stroke: isDark ? '#0A0E17' : '#fff', strokeWidth: 1 }} connectNulls={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
