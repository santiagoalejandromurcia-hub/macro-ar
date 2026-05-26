'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { emaeData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

export default function EmaeChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data, isLive, updatedAt } = useIndicatorData(
    'emae', emaeData, (raw) => raw as typeof emaeData,
  );

  const displayData = useMemo(() => filterByPeriod(data, period), [data, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="EMAE — Estimador Mensual de Actividad Económica"
      subtitle={isLive ? `Índice base 2004=100 · Actualizado ${updatedAt} · INDEC` : 'Índice base 2004=100 · Serie desestacionalizada y tendencia'}
      isLive={isLive}
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="emae"
    >
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} interval={2} />
          <YAxis tick={t.axis} domain={['auto', 'auto']} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Area type="monotone" dataKey="value" name="EMAE" stroke="#74ACDF" fill="#74ACDF" fillOpacity={0.08} strokeWidth={2} dot={false} />
          {displayData.some((d) => d.trend !== undefined) && (
            <Line type="monotone" dataKey="trend" name="Tendencia" stroke="#D4A843" strokeWidth={2} strokeDasharray="6 3" dot={false} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
