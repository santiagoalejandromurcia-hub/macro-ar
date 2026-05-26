'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { tradeData } from '@/data/macroData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';
import { useIndicatorData } from '@/hooks/useIndicatorData';

export default function TradeChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'trade', tradeData, (raw) => raw as typeof tradeData,
  );
  const [period, setPeriod] = useState(0);

  const displayData = useMemo(() => filterByPeriod(liveData, period), [liveData, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Balanza Comercial"
      subtitle={isLive ? `Exp. vs Imp. (USD M) · Actualizado ${updatedAt} · INDEC` : 'Exportaciones vs Importaciones (USD M) + Saldo · Fuente: INDEC'}
      isLive={isLive}
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="balanza-comercial"
    >
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="month" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Bar dataKey="exports" name="Exportaciones" fill="#22C55E" radius={[4, 4, 0, 0]} opacity={0.8} />
          <Bar dataKey="imports" name="Importaciones" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.8} />
          <Line type="monotone" dataKey="balance" name="Saldo" stroke="#D4A843" strokeWidth={2.5} dot={{ r: 3, fill: '#D4A843' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
