'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { sectorData } from '@/data/macroData';

export default function SectorChart() {
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
