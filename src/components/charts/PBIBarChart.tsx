'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { pbiData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

export default function PBIBarChart({ compact = false }: { compact?: boolean }) {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'pbi', pbiData, (raw) => raw as typeof pbiData,
  );
  if (compact) {
    return (
      <div className="h-[128px]" aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={liveData} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
            <CartesianGrid {...t.grid} />
            <XAxis dataKey="quarter" tick={{ ...t.axis, fontSize: 9 }} interval="preserveStartEnd" />
            <YAxis tick={{ ...t.axis, fontSize: 9 }} width={28} />
            <Tooltip content={<ThemedTooltip />} />
            <ReferenceLine y={0} stroke={t.refLine} strokeWidth={1} />
            <Bar dataKey="yoy" name="Var. interanual %" radius={[3, 3, 0, 0]} isAnimationActive={false}>
              {liveData.map((entry, i) => (
                <Cell key={i} fill={entry.yoy >= 0 ? '#22C55E' : '#EF4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="PBI — Variación Interanual"
      subtitle={isLive ? `Trimestral (%) · Actualizado ${updatedAt} · INDEC` : 'Trimestral (%) · Q2-26 +2,0% i.a. · Fuente: INDEC 17/09/2026'}
      isLive={isLive}
      csvData={csvData}
      csvFileName="pbi-variacion-interanual"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={liveData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="quarter" tick={t.axis} />
          <YAxis tick={t.axis} />
          <Tooltip content={<ThemedTooltip />} />
          <ReferenceLine y={0} stroke={t.refLine} strokeWidth={1} />
          <Bar dataKey="yoy" name="Var. interanual %" radius={[4, 4, 0, 0]}>
            {liveData.map((entry, i) => (
              <Cell key={i} fill={entry.yoy >= 0 ? '#22C55E' : '#EF4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
