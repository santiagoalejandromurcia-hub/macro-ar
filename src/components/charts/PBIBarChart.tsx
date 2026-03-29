'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { pbiData } from '@/data/macroData';

export default function PBIBarChart() {
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
