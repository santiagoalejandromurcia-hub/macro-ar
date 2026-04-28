'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { inflacionLargoPlazoData } from '@/data/macroData';

/**
 * Inflación Argentina 1990-2026 — Var. % interanual.
 * "Frenar una hiper, respetando contratos."
 * Hitos: Mar-91 (287,3%, hiperinflación menemista) · Abr-24 (289,4%, pico
 * reciente) · Mar-26 (32,6%, descenso post-pico).
 * Fuente: Econométrica en base a INDEC (salvo 2007-2015 Bevaqua/CABA).
 */
export default function InflacionLargoPlazoChart() {
  const t = useChartTheme();
  const csvData = inflacionLargoPlazoData as unknown as Record<string, unknown>[];

  const colorFor = (h?: string) => {
    if (h === 'pico-1991') return '#D4A843';
    if (h === 'pico-2024') return '#EF4444';
    if (h === 'actual')    return '#22C55E';
    return '#74ACDF';
  };

  return (
    <ChartCard
      title='Inflación Argentina · "Frenar una hiper, respetando contratos"'
      subtitle="Var. % interanual · 1990–2026 · Fuente: Econométrica en base a INDEC (Bevaqua/CABA 2007-2015)"
      csvData={csvData}
      csvFileName="inflacion-1990-2026"
    >
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={inflacionLargoPlazoData} margin={{ top: 20, right: 10, left: -5, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="year" tick={{ ...t.axis, fontSize: 9 }} interval={1} />
          <YAxis tick={t.axis} domain={[0, 350]} unit="%" />
          <Tooltip content={<ThemedTooltip />} />

          <Bar dataKey="value" name="Inflación interanual %" radius={[3, 3, 0, 0]}>
            {inflacionLargoPlazoData.map((d, i) => (
              <Cell key={i} fill={colorFor(d.highlight)} />
            ))}
          </Bar>
          <Line type="monotone" dataKey="value" name="Tendencia" stroke="#74ACDF" strokeWidth={1} dot={false} legendType="none" />

          <ReferenceDot x="Mar-91" y={287.3} r={6} fill="#D4A843" stroke="#fff" strokeWidth={2} label={{ value: '287,3%', position: 'top', fill: t.textPrimary, fontSize: 10, fontWeight: 600 }} />
          <ReferenceDot x="Abr-24" y={289.4} r={6} fill="#EF4444" stroke="#fff" strokeWidth={2} label={{ value: '289,4%', position: 'top', fill: t.textPrimary, fontSize: 10, fontWeight: 600 }} />
          <ReferenceDot x="Mar-26" y={32.6}  r={6} fill="#22C55E" stroke="#fff" strokeWidth={2} label={{ value: '32,6%', position: 'top', fill: t.textPrimary, fontSize: 10, fontWeight: 600 }} />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#D4A843' }} />Mar-91: 287,3% (hiperinflación menemista)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#EF4444' }} />Abr-24: 289,4% (pico reciente)</span>
        <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#22C55E' }} />Mar-26: 32,6% (actual)</span>
        <span className="ml-auto text-theme-primary font-semibold">33 años entre picos</span>
      </div>
    </ChartCard>
  );
}
