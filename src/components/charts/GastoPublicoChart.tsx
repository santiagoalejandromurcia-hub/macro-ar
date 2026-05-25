'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme } from './useChartTheme';

/**
 * Gasto Primario Nacional — % del PIB (mensual, acumulado 12m)
 * Fuente: IARAF en base a Ministerio de Economía e INDEC
 * Hitos: CFK final → Macri → Alberto (pandemia) → Milei ajuste
 */

const data = [
  // ── CFK final ──────────────────────────────
  { date: 'Ene 15', value: 27.5 }, { date: 'Abr 15', value: 26.8 },
  { date: 'Jul 15', value: 27.4 }, { date: 'Oct 15', value: 28.2 },
  // ── Macri ──────────────────────────────────
  { date: 'Ene 16', value: 25.5 }, { date: 'Abr 16', value: 24.8 },
  { date: 'Jul 16', value: 24.3 }, { date: 'Oct 16', value: 24.1 },
  { date: 'Ene 17', value: 24.0 }, { date: 'Abr 17', value: 23.6 },
  { date: 'Jul 17', value: 23.0 }, { date: 'Oct 17', value: 22.5 },
  { date: 'Ene 18', value: 22.0 }, { date: 'Abr 18', value: 21.2 },
  { date: 'Jul 18', value: 20.5 }, { date: 'Oct 18', value: 20.0 },
  { date: 'Ene 19', value: 19.7 }, { date: 'Abr 19', value: 19.3 },
  { date: 'Jul 19', value: 19.0 }, { date: 'Oct 19', value: 18.8 },
  // ── Alberto / pandemia ─────────────────────
  { date: 'Ene 20', value: 18.7 }, { date: 'Abr 20', value: 20.2 },
  { date: 'Jul 20', value: 22.1 }, { date: 'Oct 20', value: 22.8 },
  { date: 'Ene 21', value: 23.1 }, { date: 'Abr 21', value: 23.5 },
  { date: 'Jul 21', value: 23.6 }, { date: 'Oct 21', value: 22.2 },
  { date: 'Ene 22', value: 21.6 }, { date: 'Abr 22', value: 21.3 },
  { date: 'Jul 22', value: 21.1 }, { date: 'Oct 22', value: 21.2 },
  { date: 'Ene 23', value: 20.9 }, { date: 'Abr 23', value: 20.5 },
  { date: 'Jul 23', value: 20.1 }, { date: 'Oct 23', value: 19.2 },
  // ── Milei ajuste ───────────────────────────
  { date: 'Ene 24', value: 17.8 }, { date: 'Abr 24', value: 16.3 },
  { date: 'Jul 24', value: 15.6 }, { date: 'Oct 24', value: 15.2 },
  { date: 'Ene 25', value: 15.0 }, { date: 'Abr 25', value: 14.8 },
  { date: 'Jul 25', value: 14.6 }, { date: 'Oct 25', value: 14.4 },
  { date: 'Ene 26', value: 14.2 }, { date: 'Abr 26', value: 14.1 },
];

// Rangos de cada presidente (para fondo semitransparente)
const ERAS = [
  { x1: 'Ene 15', x2: 'Oct 15', fill: '#f97316', label: 'CFK' },
  { x1: 'Ene 16', x2: 'Oct 19', fill: '#3B82F6', label: 'Macri' },
  { x1: 'Ene 20', x2: 'Oct 23', fill: '#EF4444', label: 'Alberto' },
  { x1: 'Ene 24', x2: 'Abr 26', fill: '#10B981', label: 'Milei' },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  const t = useChartTheme();
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (
    <div
      style={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}` }}
      className="rounded-lg p-3 shadow-xl text-xs min-w-[140px]"
    >
      <p style={{ color: t.tooltipLabel }} className="mb-1 font-medium">{label}</p>
      <p style={{ color: t.tooltipValue }} className="font-mono text-sm font-bold">
        {v.toFixed(1)}% del PIB
      </p>
    </div>
  );
}

export default function GastoPublicoChart() {
  const t = useChartTheme();
  const csvData = data.map((d) => ({
    Período: d.date,
    'Gasto Primario % PIB': d.value,
  })) as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Gasto Primario Nacional — % del PIB"
      subtitle="Mensual · 2015–2026 · Acumulado 12 meses · Fuente: IARAF / Min. Economía / INDEC"
      csvData={csvData}
      csvFileName="gasto-primario-pbi"
      imageFileName="gasto-primario-pbi"
    >
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={data} margin={{ top: 10, right: 16, left: -4, bottom: 5 }}>
          <defs>
            <linearGradient id="gastoFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#74ACDF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#74ACDF" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <CartesianGrid {...t.grid} />

          {/* Sombras presidenciales */}
          {ERAS.map((e) => (
            <ReferenceArea
              key={e.label}
              x1={e.x1}
              x2={e.x2}
              fill={e.fill}
              fillOpacity={0.06}
              stroke="none"
            />
          ))}

          <XAxis
            dataKey="date"
            tick={t.axis}
            interval={3}
            angle={-35}
            textAnchor="end"
            height={48}
          />
          <YAxis
            tick={t.axis}
            domain={[12, 30]}
            tickFormatter={(v) => `${v}%`}
            width={38}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Líneas de transición presidencial */}
          <ReferenceLine x="Ene 16" stroke={t.refLine} strokeDasharray="3 3" />
          <ReferenceLine x="Ene 20" stroke={t.refLine} strokeDasharray="3 3" />
          <ReferenceLine x="Ene 24" stroke={t.refLine} strokeDasharray="3 3" />

          <Area
            type="monotone"
            dataKey="value"
            name="Gasto primario % PIB"
            stroke="#74ACDF"
            strokeWidth={2.5}
            fill="url(#gastoFill)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />

          {/* Hitos clave */}
          <ReferenceDot x="Ene 17" y={24.0} r={5} fill="#3B82F6"  stroke="#fff" strokeWidth={2} label={{ value: '24,0%', position: 'top',    fontSize: 10, fill: t.textSecondary }} />
          <ReferenceDot x="Ene 20" y={18.7} r={5} fill="#6B7280"  stroke="#fff" strokeWidth={2} label={{ value: '18,7%', position: 'bottom', fontSize: 10, fill: t.textSecondary }} />
          <ReferenceDot x="Jul 21" y={23.6} r={5} fill="#EF4444"  stroke="#fff" strokeWidth={2} label={{ value: '23,6%', position: 'top',    fontSize: 10, fill: t.textSecondary }} />
          <ReferenceDot x="Oct 23" y={19.2} r={5} fill="#8B5CF6"  stroke="#fff" strokeWidth={2} label={{ value: '19,2%', position: 'top',    fontSize: 10, fill: t.textSecondary }} />
          <ReferenceDot x="Abr 26" y={14.1} r={5} fill="#10B981"  stroke="#fff" strokeWidth={2} label={{ value: '14,1%', position: 'bottom', fontSize: 10, fill: t.textSecondary }} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Leyenda presidencial */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-mono text-theme-muted">
        {[
          { color: '#f97316', label: 'CFK (2015)' },
          { color: '#3B82F6', label: 'Macri (2016–2019)' },
          { color: '#EF4444', label: 'Alberto (2020–2023)' },
          { color: '#10B981', label: 'Milei (2024–2026)' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: color, opacity: 0.7 }} />
            {label}
          </span>
        ))}
        <span className="ml-auto font-semibold text-theme-primary">
          Ajuste Milei: <span className="text-ar-green">−5,1 p.p.</span> (Oct 23 → Abr 26)
        </span>
      </div>
    </ChartCard>
  );
}
