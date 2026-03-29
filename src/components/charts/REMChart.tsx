'use client';

import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { remData } from '@/data/macroData';

export default function REMChart() {
  const t = useChartTheme();
  return (
    <ChartCard title="Inflación Esperada — REM (BCRA)" subtitle="Expectativas IPC mensual (%) · Fuente: REM feb-26 e INDEC">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={remData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="period" tick={t.axis} />
          <YAxis tick={t.axis} domain={[0.5, 4]} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Area type="monotone" dataKey="r90" name="Rango 90-10" stroke="none" fill="#94A3B8" fillOpacity={t.isDark ? 0.15 : 0.12} />
          <Area type="monotone" dataKey="r10" name="_hide1" stroke="none" fill={t.isDark ? '#0A0E17' : '#F8FAFC'} fillOpacity={1} legendType="none" />
          <Area type="monotone" dataKey="r75" name="Rango 25-75" stroke="none" fill="#3B5998" fillOpacity={t.isDark ? 0.3 : 0.2} />
          <Area type="monotone" dataKey="r25" name="_hide2" stroke="none" fill={t.isDark ? '#0A0E17' : '#F8FAFC'} fillOpacity={1} legendType="none" />
          <Line type="monotone" dataKey="mediana" name="Mediana" stroke="#8B0000" strokeWidth={2.5} dot={{ r: 4, fill: '#8B0000' }} />
          <Line
            type="monotone"
            dataKey="actual"
            name="Dato IPC - INDEC"
            stroke={t.isDark ? '#E2E8F0' : '#1a1a1a'}
            strokeWidth={2.5}
            dot={{ r: 5, fill: t.isDark ? '#E2E8F0' : '#1a1a1a', stroke: t.isDark ? '#0A0E17' : '#fff', strokeWidth: 1 }}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
