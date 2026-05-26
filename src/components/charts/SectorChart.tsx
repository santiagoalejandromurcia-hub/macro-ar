'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { sectorData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

export default function SectorChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'sector', sectorData, (raw) => raw as typeof sectorData,
  );
  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Actividad por Sector"
      subtitle={isLive ? `Var. interanual (%) · Actualizado ${updatedAt} · INDEC` : 'Variación interanual (%) · Fuente: INDEC'}
      isLive={isLive}
      csvData={csvData}
      csvFileName="actividad-por-sector"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={liveData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid {...t.grid} horizontal={false} />
          <XAxis type="number" tick={t.axis} />
          <YAxis type="category" dataKey="sector" tick={t.axis} width={90} />
          <Tooltip content={<ThemedTooltip />} />
          <Bar dataKey="value" name="Var. %" radius={[0, 4, 4, 0]}>
            {liveData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
