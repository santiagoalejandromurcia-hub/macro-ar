'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { emaeData } from '@/data/macroData';
import { indec, emaeUltimo, fuenteIndec, num } from '@/data/indec';
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
      subtitle={isLive ? `Índice base 2004=100 · Actualizado ${updatedAt} · INDEC` : `Índice 2004=100 · ${[
        emaeUltimo.date,
        num(emaeUltimo.original) && `orig. ${num(emaeUltimo.original)}`,
        num(emaeUltimo.desest) && `desest. ${num(emaeUltimo.desest)}`,
        num(emaeUltimo.ia, 1, true) && `${num(emaeUltimo.ia, 1, true)}% i.a.`,
        num(emaeUltimo.mmDesest, 1, true) && `${num(emaeUltimo.mmDesest, 1, true)}% s.e.`,
      ].filter(Boolean).join(' · ')} · ${fuenteIndec(indec.emae)}`}
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
          <Area type="monotone" dataKey="value" name="EMAE" stroke="#0099FF" fill="#0099FF" fillOpacity={0.08} strokeWidth={2} dot={false} />
          {displayData.some((d) => d.desest !== undefined) && (
            <Line type="monotone" dataKey="desest" name="Desestacionalizada" stroke="#00C9A7" strokeWidth={1.5} dot={false} />
          )}
          {displayData.some((d) => d.trend !== undefined) && (
            <Line type="monotone" dataKey="trend" name="Tendencia-ciclo" stroke="#E73F25" strokeWidth={2} strokeDasharray="6 3" dot={false} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
