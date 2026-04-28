'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { deudaConsolidadaData, deudaConsolidadaHistoricos } from '@/data/macroData';

/**
 * Deuda Pública Consolidada — Tesoro + BCRA · USD MM.
 * Notas del gráfico:
 *  · Tesoro absorbe la deuda del BCRA (Leliqs) → apreciación del peso.
 *  · *Incluye deudas no contabilizadas, canceladas luego por Bopreal (15).
 * Fuente: Min. Economía + BCRA.
 */
export default function DeudaConsolidadaChart() {
  const t = useChartTheme();
  const csvData = deudaConsolidadaData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Deuda Pública Consolidada (Tesoro + BCRA)"
      subtitle="USD miles de millones · Fuente: Min. Economía + BCRA"
      csvData={csvData}
      csvFileName="deuda-consolidada"
    >
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={deudaConsolidadaData} margin={{ top: 25, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="period" tick={t.axis} />
          <YAxis tick={t.axis} domain={[0, 600]} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: t.textSecondary }} />

          <Bar dataKey="tesoro" name="Tesoro" stackId="a" fill="#74ACDF" radius={[0, 0, 0, 0]} />
          <Bar dataKey="bcra"   name="BCRA"   stackId="a" fill="#A78BFA" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: number) => v.toString()}
              style={{ fontSize: 11, fill: t.textPrimary, fontFamily: 'monospace', fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Cuadro de hitos clave */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
        <div className="p-2.5 bg-theme-surface border border-theme rounded-md">
          <div className="text-theme-muted">Nov-19 → Nov-23</div>
          <div className="text-[#EF4444] font-semibold mt-0.5">Alberto Fernández: +177</div>
          <div className="text-theme-muted text-[10px]">+44 / año</div>
        </div>
        <div className="p-2.5 bg-theme-surface border border-theme rounded-md">
          <div className="text-theme-muted">Nov-23 → Mar-26</div>
          <div className="text-ar-green font-semibold mt-0.5">Javier Milei: −10</div>
          <div className="text-theme-muted text-[10px]">Tesoro absorbe Leliqs · apreciación peso</div>
        </div>
        <div className="p-2.5 bg-theme-surface border border-theme rounded-md">
          <div className="text-theme-muted">Recuadro histórico</div>
          <div className="text-theme-primary font-semibold mt-0.5">
            Dic-01: {deudaConsolidadaHistoricos.dic2001} · Nov-23: {deudaConsolidadaHistoricos.nov2023}
          </div>
          <div className="text-theme-muted text-[10px]">Var: +{deudaConsolidadaHistoricos.varTotal}</div>
        </div>
      </div>

      <div className="mt-2 text-[10px] font-mono text-theme-muted leading-relaxed">
        Nota: Tesoro absorbe la deuda del BCRA (Leliqs) → apreciación del peso. *Incluye deudas no
        contabilizadas, canceladas luego por Bopreal (15).
      </div>
    </ChartCard>
  );
}
