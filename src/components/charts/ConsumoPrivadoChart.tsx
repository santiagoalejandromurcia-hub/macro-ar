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
import { consumoPrivadoData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

/**
 * Consumo Privado — Serie desestacionalizada (Base I-17 = 100)
 * Fuente: Econométrica en base a INDEC.
 * Marca tres etapas políticas (J×C / Kirchnerismo-Fernández / Milei) con
 * líneas de referencia en los trimestres clave.
 */
export default function ConsumoPrivadoChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'consumo', consumoPrivadoData, (raw) => raw as typeof consumoPrivadoData,
  );
  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Consumo Privado — Serie desestacionalizada"
      subtitle={isLive ? `Base I-17 = 100 · Actualizado ${updatedAt} · INDEC` : 'Base I-17 = 100 · Trimestral 2017–2026 · Fuente: Econométrica en base a INDEC'}
      isLive={isLive}
      csvData={csvData}
      csvFileName="consumo-privado"
    >
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={liveData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="consumoFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="quarter" tick={t.axis} interval={3} />
          <YAxis tick={t.axis} domain={[70, 110]} />
          <Tooltip content={<ThemedTooltip />} />

          {/* Líneas de referencia que separan etapas políticas */}
          <ReferenceLine x="IV-19" stroke={t.refLine} strokeDasharray="4 3" label={{ value: 'Fernández', position: 'insideTopLeft', fill: t.textSecondary, fontSize: 10 }} />
          <ReferenceLine x="IV-23" stroke={t.refLine} strokeDasharray="4 3" label={{ value: 'Milei', position: 'insideTopRight', fill: t.textSecondary, fontSize: 10 }} />
          <ReferenceLine y={100} stroke={t.refLine} strokeDasharray="2 4" />

          <Area
            type="monotone"
            dataKey="value"
            name="Consumo (I-17=100)"
            stroke="#A78BFA"
            strokeWidth={2.5}
            fill="url(#consumoFill)"
            dot={false}
          />
          <Line type="monotone" dataKey="value" name="Consumo (I-17=100)" stroke="#A78BFA" strokeWidth={0} dot={{ r: 2.5, fill: '#A78BFA', strokeWidth: 0 }} legendType="none" />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Pie de hito */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#D4A843' }} />J×C 2017-2019</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#74ACDF' }} />Fernández 2019-2023</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#A78BFA' }} />Milei 2024-2025</span>
        <span className="ml-auto text-theme-primary font-semibold">IV-25 vs II-24: <span className="text-ar-green">+14%</span></span>
      </div>
    </ChartCard>
  );
}
