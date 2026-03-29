'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { tcrData } from '@/data/macroData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

export default function TCRChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const displayData = useMemo(() => filterByPeriod(tcrData, period), [period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Tipo de Cambio"
      subtitle="Oficial, Blue y MEP (ARS/USD) · Fuente: BCRA · Bluelytics"
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="tipo-de-cambio"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <Line type="monotone" dataKey="oficial" name="Oficial" stroke="#74ACDF" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="blue" name="Blue" stroke="#22C55E" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="mep" name="MEP" stroke="#D4A843" strokeWidth={2} dot={false} strokeDasharray="5 3" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
