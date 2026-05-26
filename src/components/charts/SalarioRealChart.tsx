'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { salarioRealData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

/**
 * Salario Real — Base Nov-23 = 100
 * Cuatro series: Privado no Registrado (EIL) · Privado Registrado (SIPA) ·
 * Privado Registrado (EIL) · Sector Público (EIL).
 * Fuente: INDEC SIPA + EIL.
 */
export default function SalarioRealChart() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'salario', salarioRealData, (raw) => raw as typeof salarioRealData,
  );
  const csvData = liveData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Salario Real"
      subtitle={isLive ? `Base Nov-23 = 100 · Actualizado ${updatedAt} · INDEC` : 'Base Nov-23 = 100 · Mensual · Fuente: INDEC SIPA + EIL'}
      isLive={isLive}
      csvData={csvData}
      csvFileName="salario-real"
    >
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={liveData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="date" tick={t.axis} interval={2} />
          <YAxis tick={t.axis} domain={[75, 130]} />
          <Tooltip content={<ThemedTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: t.textSecondary }} />
          <ReferenceLine y={100} stroke={t.refLine} strokeDasharray="2 4" />

          <Line type="monotone" dataKey="privadoNoReg"   name="Privado no Registrado (EIL)" stroke="#22C55E" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="privadoRegSipa" name="Privado Registrado (SIPA)"   stroke="#74ACDF" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="privadoRegEil"  name="Privado Registrado (EIL)"    stroke="#A78BFA" strokeWidth={2}   dot={false} strokeDasharray="5 3" />
          <Line type="monotone" dataKey="publico"        name="Sector Público (EIL)"        stroke="#EF4444" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-3 text-[11px] font-mono text-theme-muted">
        <span className="text-theme-primary font-semibold">Feb-26: </span>
        Privado no Registrado <span className="text-ar-green">+25%</span> ·
        Privado Registrado SIPA <span className="text-ar-green">+10%</span> ·
        Sector Público <span className="text-[#EF4444]">−15,5%</span>
      </div>
    </ChartCard>
  );
}
