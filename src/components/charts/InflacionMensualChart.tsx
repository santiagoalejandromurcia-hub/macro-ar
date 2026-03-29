'use client';

import { useState, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { inflacionData } from '@/data/macroData';
import { useLiveData } from '@/hooks/useLiveData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';

interface InflacionPoint { date: string; mensual: number; interanual?: number | null; nucleo?: number | null }

function transformInflacion(json: unknown): InflacionPoint[] {
  const j = json as { data?: InflacionPoint[] };
  return j?.data?.length ? j.data : inflacionData;
}

export default function InflacionMensualChart() {
  const t = useChartTheme();
  const [period, setPeriod] = useState(0);

  const { data, isLive, lastUpdate } = useLiveData<InflacionPoint[]>(
    '/api/inflacion', inflacionData, transformInflacion, { refreshInterval: 86400 * 1000 }
  );

  const displayData = useMemo(() => filterByPeriod(data, period), [data, period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="IPC — Inflación Mensual"
      subtitle={isLive ? `Nivel general y núcleo (%) · Actualizado ${lastUpdate} · Fuente: INDEC` : 'Nivel general y núcleo (%)'}
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
