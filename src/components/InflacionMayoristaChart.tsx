'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { useChartTheme, ThemedTooltip } from './charts/useChartTheme';
import { inflacionMayoristaData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

export default function InflacionMayoristaChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data, isLive, updatedAt } = useIndicatorData(
    'ipim',
    inflacionMayoristaData,
    (raw) => raw as typeof inflacionMayoristaData,
  );

  const displayData = useMemo(() => filterByPeriod(data, period), [data, period]);
  const csvData = displayData.map((d) => ({ ...d })) as Record<string, unknown>[];
  const last = displayData[displayData.length - 1];

  return (
    <ChartCard
      title="IPIM — Inflación Mayorista"
      subtitle={
        isLive
          ? `INDEC SIPM · Actualizado ${updatedAt}`
          : `INDEC SIPM · último ${last?.date ?? 'Ago 26'}: ${last?.mensual.toFixed(1)}% mens. / ${last?.interanual?.toFixed(1) ?? '—'}% i.a.`
      }
      isLive={isLive}
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="ipim-mayorista"
    >
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis yAxisId="left" tick={t.axis} domain={['auto', 'auto']} />
          <YAxis yAxisId="right" orientation="right" tick={t.axis} domain={['auto', 'auto']} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Bar yAxisId="left" dataKey="mensual" name="IPIM Mensual %" fill="#F97316" radius={[3, 3, 0, 0]} opacity={0.7} />
          <Line yAxisId="right" type="monotone" dataKey="interanual" name="Interanual %" stroke="#D4A843" strokeWidth={2} dot={false} connectNulls={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
