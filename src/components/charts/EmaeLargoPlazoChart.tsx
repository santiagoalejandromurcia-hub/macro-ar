'use client';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { emaeLargoPlazoData } from '@/data/macroData';

/**
 * Actividad Económica EMAE — Largo plazo, serie desestacionalizada.
 * "Nuevo máximo." Hitos: Nov-17 J×C ~152 · COVID ~137 · Jun-22 pico azul ~152 ·
 * Dic-23 punto partida Milei · Mar-26* ~155 (nuevo máximo, +7,9% vs Dic-23).
 * Fuente: Econométrica en base a INDEC.
 */
export default function EmaeLargoPlazoChart() {
  const t = useChartTheme();
  const csvData = emaeLargoPlazoData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title='Actividad Económica EMAE · "Nuevo máximo"'
      subtitle="Serie desestacionalizada · Fuente: Econométrica en base a INDEC"
      csvData={csvData}
      csvFileName="emae-largo-plazo"
    >
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={emaeLargoPlazoData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="emaeLPFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.30} />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} interval={1} />
          <YAxis tick={t.axis} domain={[115, 160]} />
          <Tooltip content={<ThemedTooltip />} />

          <ReferenceLine x="Nov 19" stroke={t.refLine} strokeDasharray="4 3" label={{ value: 'Fernández', position: 'insideTopLeft', fill: t.textSecondary, fontSize: 10 }} />
          <ReferenceLine x="Dic 23" stroke={t.refLine} strokeDasharray="4 3" label={{ value: 'Milei', position: 'insideTopRight', fill: t.textSecondary, fontSize: 10 }} />

          <Area
            type="monotone"
            dataKey="value"
            name="EMAE (desestacionalizado)"
            stroke="#A78BFA"
            strokeWidth={2.5}
            fill="url(#emaeLPFill)"
            dot={false}
          />
          <Line type="monotone" dataKey="value" stroke="#A78BFA" strokeWidth={0} dot={{ r: 2.5, fill: '#A78BFA' }} legendType="none" name="EMAE" />

          {/* Hitos */}
          <ReferenceDot x="Nov 17" y={152} r={5} fill="#D4A843" stroke="#fff" strokeWidth={2} label={{ value: 'Nov-17', position: 'top', fill: t.textSecondary, fontSize: 9 }} />
          <ReferenceDot x="Jun 20" y={119.5} r={5} fill="#EF4444" stroke="#fff" strokeWidth={2} label={{ value: 'COVID', position: 'bottom', fill: t.textSecondary, fontSize: 9 }} />
          <ReferenceDot x="Jun 22" y={152} r={5} fill="#74ACDF" stroke="#fff" strokeWidth={2} label={{ value: 'Pico azul', position: 'top', fill: t.textSecondary, fontSize: 9 }} />
          <ReferenceDot x="Dic 23" y={143.6} r={5} fill="#A78BFA" stroke="#fff" strokeWidth={2} />
          <ReferenceDot x="Mar 26" y={155} r={6} fill="#22C55E" stroke="#fff" strokeWidth={2} label={{ value: 'Nuevo máx.', position: 'top', fill: '#22C55E', fontSize: 10, fontWeight: 600 }} />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#D4A843' }} />J×C (Nov-17 ~152)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#74ACDF' }} />Fernández (Jun-22 pico ~152)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#A78BFA' }} />Milei (Dic-23 ~143)</span>
        <span className="ml-auto text-theme-primary font-semibold">Mar-26* vs Dic-23: <span className="text-ar-green">+7,9%</span> (estim. econométrica +2,5% YoY)</span>
      </div>
    </ChartCard>
  );
}
