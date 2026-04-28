'use client';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { riesgoPaisData } from '@/data/macroData';

/**
 * Riesgo País Argentina · EMBI+ → EMBIGD (puntos básicos)
 * Hitos: Dic-23 (1.907 pb, asunción Milei) · Dic-25 (540 pb, mínimo del ciclo) ·
 * Feb-26 (JP Morgan reclasifica de EMBI+ a EMBIGD) · Abr-26 (557 pb).
 * Fuente: JP Morgan / Ámbito / Rava.
 */
export default function RiesgoPaisChart() {
  const t = useChartTheme();
  const csvData = riesgoPaisData as unknown as Record<string, unknown>[];

  const last = riesgoPaisData[riesgoPaisData.length - 1];
  const min = riesgoPaisData.find((d) => d.highlight === 'minimo');
  const peak = riesgoPaisData.find((d) => d.highlight === 'pico');

  return (
    <ChartCard
      title="Riesgo País · EMBI+ → EMBIGD"
      subtitle="Puntos básicos · 2023-2026 · Fuente: JP Morgan (en feb-26 reclasificación a EMBIGD)"
      csvData={csvData}
      csvFileName="riesgo-pais-2023-2026"
    >
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={riesgoPaisData} margin={{ top: 20, right: 10, left: -5, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={{ ...t.axis, fontSize: 10 }} />
          <YAxis tick={t.axis} domain={[0, 'auto']} unit=" pb" />
          <Tooltip content={<ThemedTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            name="Riesgo país (pb)"
            stroke="#EC4899"
            fill="#EC4899"
            fillOpacity={0.12}
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="value"
            name="Tendencia"
            stroke="#EC4899"
            strokeWidth={0}
            dot={{ r: 3, fill: '#EC4899' }}
            legendType="none"
          />

          {peak && (
            <ReferenceDot
              x={peak.date}
              y={peak.value}
              r={6}
              fill="#EF4444"
              stroke="#fff"
              strokeWidth={2}
              label={{
                value: `${peak.value} pb`,
                position: 'top',
                fill: t.textPrimary,
                fontSize: 10,
                fontWeight: 600,
              }}
            />
          )}
          {min && (
            <ReferenceDot
              x={min.date}
              y={min.value}
              r={6}
              fill="#22C55E"
              stroke="#fff"
              strokeWidth={2}
              label={{
                value: `${min.value} pb`,
                position: 'top',
                fill: t.textPrimary,
                fontSize: 10,
                fontWeight: 600,
              }}
            />
          )}
          <ReferenceDot
            x={last.date}
            y={last.value}
            r={6}
            fill="#D4A843"
            stroke="#fff"
            strokeWidth={2}
            label={{
              value: `${last.value} pb`,
              position: 'top',
              fill: t.textPrimary,
              fontSize: 10,
              fontWeight: 600,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        {peak && (
          <span>
            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#EF4444' }} />
            {peak.date}: {peak.value} pb (pico)
          </span>
        )}
        {min && (
          <span>
            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#22C55E' }} />
            {min.date}: {min.value} pb (mínimo)
          </span>
        )}
        <span>
          <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#D4A843' }} />
          {last.date}: {last.value} pb (actual)
        </span>
        <span className="ml-auto text-theme-primary font-semibold">
          Feb-26: JP Morgan migró Argentina del EMBI+ al EMBIGD
        </span>
      </div>
    </ChartCard>
  );
}
