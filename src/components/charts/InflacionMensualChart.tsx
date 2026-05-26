'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { inflacionData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

export default function InflacionMensualChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data, isLive, updatedAt } = useIndicatorData(
    'inflacion', inflacionData, (raw) => raw as typeof inflacionData,
  );

  const displayData = useMemo(() => filterByPeriod(data, period), [data, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="IPC — Inflación Mensual"
      subtitle={isLive ? `Nivel general y núcleo (%) · Actualizado ${updatedAt} · INDEC` : 'Nivel general y núcleo (%)'}
      isLive={isLive}
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="ipc-mensual"
    >
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Bar dataKey="mensual" name="IPC Mensual %" fill="#EF4444" radius={[3, 3, 0, 0]} opacity={0.7} />
          {displayData.some((d) => d.nucleo != null) && (
            <Line type="monotone" dataKey="nucleo" name="Núcleo %" stroke="#D4A843" strokeWidth={2} dot={false} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
