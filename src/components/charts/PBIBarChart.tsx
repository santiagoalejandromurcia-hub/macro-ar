'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { pbiData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

export default function PBIBarChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'pbi', pbiData, (raw) => raw as typeof pbiData,
  );
  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="PBI — Variación Interanual"
      subtitle={isLive ? `Trimestral (%) · Actualizado ${updatedAt} · INDEC` : 'Trimestral (%) · Fuente: INDEC'}
      isLive={isLive}
      csvData={csvData}
      csvFileName="pbi-variacion-interanual"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={liveData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="quarter" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <ReferenceLine y={0} stroke={t.refLine} strokeWidth={1} />
          <Bar dataKey="yoy" name="Var. interanual %" radius={[4, 4, 0, 0]}>
            {liveData.map((entry, i) => (
              <Cell key={i} fill={entry.yoy >= 0 ? '#22C55E' : '#EF4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
