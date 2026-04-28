'use client';

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { pbiDesestacionalizadoData } from '@/data/macroData';

/**
 * PBI — Serie desestacionalizada (Base I-17 = 100)
 * Fuente: Econométrica en base a INDEC.
 * IV-25 marca un nuevo máximo histórico, +7,8% vs el mínimo de II-24.
 */
export default function PBIDesestacionalizadoChart() {
  const t = useChartTheme();
  const csvData = pbiDesestacionalizadoData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="PBI — Serie desestacionalizada"
      subtitle="Base I-17 = 100 · Trimestral 2017–2025 · Fuente: Econométrica en base a INDEC"
      csvData={csvData}
      csvFileName="pbi-desestacionalizado"
    >
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={pbiDesestacionalizadoData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="pbiFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#74ACDF" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#74ACDF" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="quarter" tick={t.axis} interval={3} />
          <YAxis tick={t.axis} domain={[75, 110]} />
          <Tooltip content={<ThemedTooltip />} />

          <ReferenceLine x="IV-19" stroke={t.refLine} strokeDasharray="4 3" label={{ value: 'Fernández', position: 'insideTopLeft', fill: t.textSecondary, fontSize: 10 }} />
          <ReferenceLine x="IV-23" stroke={t.refLine} strokeDasharray="4 3" label={{ value: 'Milei', position: 'insideTopRight', fill: t.textSecondary, fontSize: 10 }} />
          <ReferenceLine y={100} stroke={t.refLine} strokeDasharray="2 4" />

          <Area
            type="monotone"
            dataKey="value"
            name="PBI (I-17=100)"
            stroke="#74ACDF"
            strokeWidth={2.5}
            fill="url(#pbiFill)"
            dot={false}
          />
          <Line type="monotone" dataKey="value" name="PBI (I-17=100)" stroke="#74ACDF" strokeWidth={0} dot={{ r: 2.5, fill: '#74ACDF', strokeWidth: 0 }} legendType="none" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#D4A843' }} />J×C</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#74ACDF' }} />Fernández (pico II-22 ~104)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#A78BFA' }} />Milei (mín II-24 ~95)</span>
        <span className="ml-auto text-theme-primary font-semibold">IV-25 vs II-24: <span className="text-ar-green">+7,8%</span></span>
      </div>
    </ChartCard>
  );
}
