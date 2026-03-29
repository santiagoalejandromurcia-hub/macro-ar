'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { emaeData } from '@/data/macroData';
import { useLiveData } from '@/hooks/useLiveData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

interface EmaePoint { date: string; value: number; trend?: number }

function transformEmae(json: unknown): EmaePoint[] {
  const j = json as { data?: EmaePoint[] };
  return j?.data?.length ? j.data : emaeData;
}

export default function EmaeChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data, isLive, lastUpdate } = useLiveData<EmaePoint[]>(
    '/api/emae', emaeData, transformEmae, { refreshInterval: 86400 * 1000 }
  );

  const displayData = useMemo(() => filterByPeriod(data, period), [data, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="EMAE — Estimador Mensual de Actividad Económica"
      subtitle={isLive ? `Índice base 2004=100 · Actualizado ${lastUpdate} · Fuente: INDEC` : 'Índice base 2004=100 · Serie desestacionalizada y tendencia'}
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
