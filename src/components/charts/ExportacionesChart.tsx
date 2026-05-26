'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { exportacionesData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

/**
 * Exportaciones de Argentina — USD miles de millones (anual).
 * Fuente: Econométrica en base a INDEC. 2026 = estimación: récord histórico
 * primer año por encima de USD 100 MM (+15% vs 2025).
 */
export default function ExportacionesChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'exportaciones', exportacionesData, (raw) => raw as typeof exportacionesData,
  );
  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Exportaciones de Argentina"
      subtitle={isLive ? `USD miles de millones · Actualizado ${updatedAt} · INDEC` : 'USD miles de millones · Anual 2016–2026e · Fuente: Econométrica en base a INDEC'}
      isLive={isLive}
      csvData={csvData}
      csvFileName="exportaciones"
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={liveData} margin={{ top: 25, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="year" tick={t.axis} />
          <YAxis tick={t.axis} domain={[0, 110]} unit=" MM" />
          <Tooltip content={<ThemedTooltip />} />
          <ReferenceLine y={100} stroke="#22C55E" strokeDasharray="3 3" label={{ value: 'USD 100 MM', position: 'insideTopRight', fill: '#22C55E', fontSize: 10 }} />

          <Bar dataKey="value" name="Exportaciones (USD MM)" radius={[6, 6, 0, 0]}>
            {liveData.map((d, i) => (
              <Cell
                key={i}
                fill={d.isEstimate ? '#22C55E' : '#74ACDF'}
                fillOpacity={d.isEstimate ? 0.85 : 1}
                stroke={d.isEstimate ? '#22C55E' : 'transparent'}
                strokeDasharray={d.isEstimate ? '4 2' : undefined}
                strokeWidth={d.isEstimate ? 1.5 : 0}
              />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v: number) => v.toFixed(0)}
              style={{ fontSize: 11, fill: t.textPrimary, fontFamily: 'monospace', fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#74ACDF' }} />Dato oficial</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#22C55E' }} />Estimación 2026</span>
        <span className="ml-auto text-theme-primary font-semibold">2026e: <span className="text-ar-green">USD 100 MM</span> (récord histórico, +15%)</span>
      </div>
    </ChartCard>
  );
}
