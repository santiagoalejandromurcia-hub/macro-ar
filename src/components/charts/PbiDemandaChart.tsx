'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { pbiDemandaQ2, pbiQoqData } from '@/data/macroData';

function fmtPct(n: number): string {
  const abs = Math.abs(n).toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  if (n > 0) return `+${abs}`;
  if (n < 0) return `−${abs}`;
  return abs;
}

function Box({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  const n = typeof value === 'number' ? value : null;
  const color = n == null ? 'var(--fg-0)' : n > 0 ? 'var(--up)' : n < 0 ? 'var(--down)' : 'var(--fg-0)';
  const txt = typeof value === 'number' ? fmtPct(value) : value;
  return (
    <div className="rounded-lg border border-[var(--line-1)] bg-[var(--bg-1)] px-3 py-2 text-center min-w-0">
      <div className="text-[10px] font-mono uppercase tracking-[0.06em] text-[var(--fg-2)] leading-tight">{label}</div>
      <div className="tnum text-[20px] sm:text-[22px] font-semibold mt-0.5" style={{ color }}>{txt}</div>
    </div>
  );
}

function MiniBars({
  title,
  dataKey,
  last,
}: {
  title: string;
  dataKey: 'pbi' | 'consumoPriv' | 'fbcf';
  last: number;
}) {
  const t = useChartTheme();
  const color = last >= 0 ? 'var(--up)' : 'var(--down)';
  return (
    <div className="rounded-xl border border-[var(--line-1)] p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-semibold text-[var(--fg-0)]">{title}</span>
        <span className="tnum text-[13px] font-mono" style={{ color }}>
          {fmtPct(last)}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={pbiQoqData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid {...t.grid} />
          <XAxis dataKey="quarter" tick={t.axis} />
          <YAxis tick={t.axis} domain={[-6, 4]} />
          <Tooltip content={<ThemedTooltip />} />
          <ReferenceLine y={0} stroke={t.refLine} />
          <Bar dataKey={dataKey} name="Var. % s.e." radius={[3, 3, 0, 0]}>
            {pbiQoqData.map((d, i) => (
              <Cell key={i} fill={d[dataKey] >= 0 ? '#14B8A6' : '#EF4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function PbiDemandaChart() {
  const d = pbiDemandaQ2;
  const csv: Record<string, unknown>[] = [
    { componente: 'PIB', ia: d.yoy.pbi, desest: d.qoq.pbi },
    { componente: 'Consumo privado', ia: d.yoy.consPriv, desest: d.qoq.consPriv },
    { componente: 'Consumo público', ia: d.yoy.consPub, desest: d.qoq.consPub },
    { componente: 'Inversión FBCF', ia: d.yoy.fbcf, desest: d.qoq.fbcf },
    { componente: 'Existencias', ia: null, desest: null },
    { componente: 'Exportaciones', ia: d.yoy.x, desest: d.qoq.x },
    { componente: 'Importaciones', ia: d.yoy.m, desest: d.qoq.m },
  ];

  return (
    <ChartCard
      title={`PIB ${d.period} — demanda`}
      subtitle={`INDEC ${d.released} · i.a. ${fmtPct(d.yoy.pbi)}% · s.e. ${fmtPct(d.qoq.pbi)}% · semestre ${fmtPct(d.semestre)}% · tendencia-ciclo ${fmtPct(d.tendenciaCiclo)}%`}
      csvData={csv}
      csvFileName="pbi-demanda-q2-26"
      imageFileName="pbi-demanda-q2-26"
    >
      <p className="text-[11px] font-mono uppercase tracking-[0.08em] text-[var(--fg-3)] mb-2">
        Var. % interanual · igual trimestre del año anterior
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-4 items-stretch">
        <Box label="PIB" value={d.yoy.pbi} />
        <Box label="Consumo priv." value={d.yoy.consPriv} />
        <Box label="Consumo púb." value={d.yoy.consPub} />
        <Box label="Inversión FBCF" value={d.yoy.fbcf} />
        <Box label="Existencias" value="—" />
        <Box label="Exportaciones" value={d.yoy.x} />
        <Box label="Importaciones" value={d.yoy.m} />
      </div>

      <p className="text-[11px] font-mono uppercase tracking-[0.08em] text-[var(--fg-3)] mb-2">
        Var. % desestacionalizada · respecto al trimestre anterior
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        <Box label="PIB" value={d.qoq.pbi} />
        <Box label="Consumo priv." value={d.qoq.consPriv} />
        <Box label="Consumo púb." value={d.qoq.consPub} />
        <Box label="Inversión FBCF" value={d.qoq.fbcf} />
        <Box label="Existencias" value="—" />
        <Box label="Exportaciones" value={d.qoq.x} />
        <Box label="Importaciones" value={d.qoq.m} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <MiniBars title="PIB" dataKey="pbi" last={d.qoq.pbi} />
        <MiniBars title="Consumo privado" dataKey="consumoPriv" last={d.qoq.consPriv} />
        <MiniBars title="Inversión (FBCF)" dataKey="fbcf" last={d.qoq.fbcf} />
      </div>
      <p className="text-[11px] text-[var(--fg-3)] mt-3">
        PIB = C + I + X − M. Existencias no publicadas en el avance. Importaciones con signo de variación del volumen (caída de M suma al PIB).
      </p>
    </ChartCard>
  );
}
