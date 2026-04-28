'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { deudaPibData } from '@/data/macroData';

/**
 * Deuda Pública Total — % del PIB (mensual).
 * Pico Dic-23 (156,6%) por efecto transición. Tendencia decreciente sostenida
 * hasta Mar-26 (73,1%).
 * Fuente: Min. Economía / Sec. de Finanzas.
 */
export default function DeudaPibChart() {
  const t = useChartTheme();
  const csvData = deudaPibData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Deuda Pública Total"
      subtitle="% del PIB · Mensual · MM 12m · Fuente: Min. Economía"
      csvData={csvData}
      csvFileName="deuda-pib"
    >
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={deudaPibData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="deudaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} interval={2} />
          <YAxis tick={t.axis} domain={[60, 170]} unit="%" />
          <Tooltip content={<ThemedTooltip />} />
          <ReferenceLine y={100} stroke={t.refLine} strokeDasharray="2 4" />

          <Area
            type="monotone"
            dataKey="value"
            name="Deuda / PIB"
            stroke="#EF4444"
            strokeWidth={2.5}
            fill="url(#deudaFill)"
            dot={false}
          />

          {/* Hito Dic-23: pico transición */}
          <ReferenceDot x="Dic 23" y={156.6} r={5} fill="#EF4444" stroke="#fff" strokeWidth={2} />
          {/* Hito Mar-26: actual */}
          <ReferenceDot x="Mar 26" y={73.1} r={5} fill="#22C55E" stroke="#fff" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#EF4444' }} />Dic-23: <span className="text-theme-primary font-semibold">156,6%</span> (pico ajuste TC)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#22C55E' }} />Mar-26: <span className="text-theme-primary font-semibold">73,1%</span></span>
        <span className="ml-auto text-theme-primary font-semibold">Reducción: <span className="text-ar-green">−83,5 p.p.</span></span>
      </div>
    </ChartCard>
  );
}
