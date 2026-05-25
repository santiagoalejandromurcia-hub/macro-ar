'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme } from './useChartTheme';

const gastoData = [
  { year: '2016', value: 41.5, presidente: 'Macri',              tipo: 'macri' },
  { year: '2017', value: 41.1, presidente: 'Macri',              tipo: 'macri' },
  { year: '2018', value: 38.9, presidente: 'Macri',              tipo: 'macri' },
  { year: '2019', value: 38.1, presidente: 'Macri / Alberto',    tipo: 'transicion' },
  { year: '2020', value: 47.4, presidente: 'Alberto Fernández',  tipo: 'alberto' },
  { year: '2021', value: 37.9, presidente: 'Alberto Fernández',  tipo: 'alberto' },
  { year: '2022', value: 37.6, presidente: 'Alberto Fernández',  tipo: 'alberto' },
  { year: '2023', value: 41.6, presidente: 'Alberto / Milei',    tipo: 'transicion' },
  { year: '2024', value: 35.6, presidente: 'Milei',              tipo: 'milei' },
  { year: '2025', value: 33.0, presidente: 'Milei',              tipo: 'milei-est' },
  { year: '2026', value: 32.0, presidente: 'Milei',              tipo: 'milei-est' },
];

const COLORS: Record<string, string> = {
  macri:       '#3B82F6',
  transicion:  '#8B5CF6',
  alberto:     '#EF4444',
  milei:       '#10B981',
  'milei-est': '#10B981',
};

const OPACITY: Record<string, number> = {
  macri: 1, transicion: 1, alberto: 1, milei: 1, 'milei-est': 0.45,
};

const NOTAS: Record<string, string> = {
  '2016': 'Inicio reducción',
  '2018': 'Ajuste fuerte',
  '2020': 'Pico pandemia (IFE / subsidios)',
  '2023': 'Aumento por emisión e inflación',
  '2024': 'Ajuste histórico (−6 p.p.)',
  '2025': 'Estimado',
  '2026': 'Proyección',
};

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; payload: (typeof gastoData)[number] }>;
  label?: string;
}) {
  const t = useChartTheme();
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const nota = NOTAS[label ?? ''];
  return (
    <div
      style={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}` }}
      className="rounded-lg p-3 shadow-xl text-xs min-w-[160px]"
    >
      <p style={{ color: t.tooltipLabel }} className="mb-1 font-semibold">{label} · {d.presidente}</p>
      <p style={{ color: t.tooltipValue }} className="font-mono text-sm font-bold">
        {d.value.toFixed(1)}% del PIB
      </p>
      {nota && <p style={{ color: t.tooltipLabel }} className="mt-1 leading-tight">{nota}</p>}
    </div>
  );
}

export default function GastoPublicoChart() {
  const t = useChartTheme();
  const csvData = gastoData.map((d) => ({
    Año: d.year,
    Presidente: d.presidente,
    'Gasto Público % PIB': d.value,
    Nota: NOTAS[d.year] ?? '',
  })) as unknown as Record<string, unknown>[];

  const avg = +(gastoData.reduce((s, d) => s + d.value, 0) / gastoData.length).toFixed(1);

  return (
    <ChartCard
      title="Gasto Público — % del PIB"
      subtitle="2016–2026 · Macri → Alberto → Milei · 2025-26: estimado/proyectado · Fuente: Min. Economía"
      csvData={csvData}
      csvFileName="gasto-publico-pbi"
      imageFileName="gasto-publico-pbi"
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={gastoData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }} barCategoryGap="30%">
          <CartesianGrid {...t.grid} vertical={false} />
          <XAxis dataKey="year" tick={t.axis} />
          <YAxis
            tick={t.axis}
            domain={[28, 50]}
            tickFormatter={(v) => `${v}%`}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: t.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }} />
          <ReferenceLine
            y={avg}
            stroke={t.refLine}
            strokeDasharray="4 3"
            label={{ value: `Prom. ${avg}%`, position: 'right', fontSize: 10, fill: t.textSecondary }}
          />
          <Bar dataKey="value" name="Gasto % PIB" radius={[4, 4, 0, 0]}>
            {gastoData.map((d) => (
              <Cell
                key={d.year}
                fill={COLORS[d.tipo]}
                fillOpacity={OPACITY[d.tipo]}
                stroke={['milei-est'].includes(d.tipo) ? COLORS[d.tipo] : 'none'}
                strokeWidth={['milei-est'].includes(d.tipo) ? 1.5 : 0}
                strokeDasharray={['milei-est'].includes(d.tipo) ? '4 3' : '0'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Leyenda manual */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-mono text-theme-muted">
        {[
          { tipo: 'macri',     label: 'Macri (2016–2018)' },
          { tipo: 'transicion', label: 'Transición' },
          { tipo: 'alberto',   label: 'Alberto (2020–2022)' },
          { tipo: 'milei',     label: 'Milei (confirmado)' },
          { tipo: 'milei-est', label: 'Milei (est./proy.)' },
        ].map(({ tipo, label }) => (
          <span key={tipo} className="flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{
                background: COLORS[tipo],
                opacity: OPACITY[tipo],
                outline: tipo === 'milei-est' ? `1px dashed ${COLORS[tipo]}` : 'none',
              }}
            />
            {label}
          </span>
        ))}
        <span className="ml-auto text-theme-primary font-semibold">
          Ajuste 2023→2024: <span className="text-ar-green">−6,0 p.p.</span>
        </span>
      </div>
    </ChartCard>
  );
}
