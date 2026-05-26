'use client';

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { reservasData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

export default function ReservasChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data, isLive, updatedAt } = useIndicatorData(
    'reservas', reservasData, (raw) => raw as typeof reservasData,
  );

  const displayData = useMemo(() => filterByPeriod(data, period), [data, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Reservas Internacionales BCRA"
      subtitle={isLive ? `USD millones · Brutas · Actualizado ${updatedAt} · BCRA` : 'USD millones · Brutas'}
      isLive={isLive}
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="reservas-bcra"
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} domain={['auto', 'auto']} />
          <Tooltip content={<ThemedTooltip />} />
          <Area type="monotone" dataKey="value" name="Reservas (USD M)" stroke="#D4A843" fill="#D4A843" fillOpacity={0.1} strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
