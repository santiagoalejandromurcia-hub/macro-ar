'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { fiscalData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

export default function FiscalChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'fiscal',
    fiscalData,
    (raw) => raw as typeof fiscalData,
  );

  const displayData = useMemo(() => filterByPeriod(liveData, period), [liveData, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Resultado Fiscal — Primario y Financiero"
      subtitle={isLive ? `% del PIB · Actualizado ${updatedAt} · Min. Economía` : '% del PIB · Acumulado 12 meses · Fuente: Min. Economía'}
      isLive={isLive}
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="resultado-fiscal"
    >
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={displayData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="period" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
          <ReferenceLine y={0} stroke={t.refLine} strokeDasharray="4 2" />
          <Area type="monotone" dataKey="primario" name="Resultado Primario" stroke="#22C55E" fill="#22C55E" fillOpacity={0.06} strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="financiero" name="Resultado Financiero" stroke="#74ACDF" strokeWidth={2.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
