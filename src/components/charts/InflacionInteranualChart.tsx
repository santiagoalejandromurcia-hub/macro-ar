'use client';

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { inflacionData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

export default function InflacionInteranualChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data, isLive, updatedAt } = useIndicatorData(
    'inflacion', inflacionData, (raw) => raw as typeof inflacionData,
  );

  const displayData = useMemo(() => filterByPeriod(data, period), [data, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="IPC — Inflación Interanual"
      subtitle={isLive ? `Var. % vs mismo mes del año anterior · Actualizado ${updatedAt}` : 'Var. % respecto al mismo mes del año anterior'}
      isLive={isLive}
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="ipc-interanual"
    >
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Area type="monotone" dataKey="interanual" name="Interanual %" stroke="#EF4444" fill="#EF4444" fillOpacity={0.08} strokeWidth={2} dot={false} connectNulls={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
