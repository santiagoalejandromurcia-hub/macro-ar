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
import { indec, emaeUltimo, fuenteIndec, num } from '@/data/indec';
import { useIndicatorData } from '@/hooks/useIndicatorData';

/**
 * Actividad Económica EMAE — Largo plazo, serie desestacionalizada.
 * Hitos: Nov-17 J×C ~152 · COVID ~137 · Jun-22 pico azul ~152 ·
 * Dic-23 punto partida Milei · Ago-26 desest. 149,9 (INDEC · −1,7% i.a. · +0,1% s.e.).
 * Fuente: API del INDEC (serie desestacionalizada), snapshot en data/indec/.
 */
export default function EmaeLargoPlazoChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'emae-largo-plazo', emaeLargoPlazoData, (raw) => raw as typeof emaeLargoPlazoData,
  );
  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Actividad Económica EMAE"
      subtitle={isLive ? `Serie desestacionalizada · Actualizado ${updatedAt} · INDEC` : `Desest. · ${[
        emaeUltimo.date,
        num(emaeUltimo.desest),
        num(emaeUltimo.ia, 1, true) && `${num(emaeUltimo.ia, 1, true)}% i.a.`,
        num(emaeUltimo.mmDesest, 1, true) && `${num(emaeUltimo.mmDesest, 1, true)}% s.e.`,
      ].filter(Boolean).join(' · ')} · ${fuenteIndec(indec.emae)}`}
      isLive={isLive}
      csvData={csvData}
      csvFileName="emae-largo-plazo"
    >
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={liveData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
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
          <ReferenceDot x="Nov 17" y={152} r={5} fill="#E73F25" stroke="#fff" strokeWidth={2} label={{ value: 'Nov-17', position: 'top', fill: t.textSecondary, fontSize: 9 }} />
          <ReferenceDot x="Jun 20" y={119.5} r={5} fill="#EF4444" stroke="#fff" strokeWidth={2} label={{ value: 'COVID', position: 'bottom', fill: t.textSecondary, fontSize: 9 }} />
          <ReferenceDot x="Jun 22" y={152} r={5} fill="#0099FF" stroke="#fff" strokeWidth={2} label={{ value: 'Pico azul', position: 'top', fill: t.textSecondary, fontSize: 9 }} />
          <ReferenceDot x="Dic 23" y={143.6} r={5} fill="#A78BFA" stroke="#fff" strokeWidth={2} />
          <ReferenceDot x="Mar 26" y={156.7} r={4} fill="#A78BFA" stroke="#fff" strokeWidth={1.5} />
          <ReferenceDot x="Ago 26" y={149.9} r={6} fill="#EF4444" stroke="#fff" strokeWidth={2} label={{ value: 'Ago-26', position: 'top', fill: '#EF4444', fontSize: 10, fontWeight: 600 }} />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#E73F25' }} />J×C (Nov-17 ~152)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#0099FF' }} />Fernández (Jun-22 pico ~152)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#A78BFA' }} />Milei (Dic-23 ~143)</span>
        <span className="ml-auto text-theme-primary font-semibold">Ago-26: <span className="text-ar-red">−1,7% i.a.</span> · +0,1% s.e. · desest. 149,9</span>
      </div>
    </ChartCard>
  );
}
