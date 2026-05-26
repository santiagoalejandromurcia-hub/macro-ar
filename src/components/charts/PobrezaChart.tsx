'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { pobrezaData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

const ETAPA_COLORS: Record<string, string> = {
  jxc: '#D4A843',  // amarillo
  fdt: '#74ACDF',  // celeste/azul
  lla: '#A78BFA',  // violeta
};

/**
 * Pobreza en Argentina — Porcentaje de la población (semestral)
 * Fuente: Econométrica en base a INDEC (EPH).
 * Hitos: 25,7% (I-17, mín J×C) · 52,9% (I-24, pico) · 28,2% (II-25, mín 7 años).
 */
export default function PobrezaChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'pobreza', pobrezaData, (raw) => raw as typeof pobrezaData,
  );
  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Pobreza en Argentina"
      subtitle={isLive ? `% de la población · Actualizado ${updatedAt} · INDEC` : '% de la población · Semestral 2016–2025 · Fuente: Econométrica en base a INDEC'}
      isLive={isLive}
      csvData={csvData}
      csvFileName="pobreza"
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={liveData} margin={{ top: 20, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="period" tick={t.axis} interval={1} />
          <YAxis tick={t.axis} domain={[0, 60]} unit="%" />
          <Tooltip content={<ThemedTooltip />} />
          <ReferenceLine y={40} stroke={t.refLine} strokeDasharray="2 4" />

          <Bar dataKey="value" name="Pobreza (%)" radius={[4, 4, 0, 0]}>
            {liveData.map((d, i) => (
              <Cell key={i} fill={ETAPA_COLORS[d.etapa] ?? '#94A3B8'} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fill: t.textSecondary, fontFamily: 'monospace' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: ETAPA_COLORS.jxc }} />J×C</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: ETAPA_COLORS.fdt }} />Fernández</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: ETAPA_COLORS.lla }} />Milei</span>
        <span className="ml-auto text-theme-primary font-semibold">II-25: <span className="text-ar-green">28,2%</span> (menor en 7 años)</span>
      </div>
    </ChartCard>
  );
}
