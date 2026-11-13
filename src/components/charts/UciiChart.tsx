'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { useChartTheme, ThemedTooltip } from './useChartTheme';
import { indec, num, periodoLargo, fechaCorta } from '@/data/indec';

/**
 * UCII — solo los puntos verificados en el informe técnico de septiembre 2026.
 * La API del INDEC no publica esta serie; no se inventa historia.
 */
const BAR_COLORS = ['#0070C2', '#5CBDFF', '#0099FF'];

export default function UciiChart() {
  const t = useChartTheme();
  const meta = indec.ucii;
  const puntos = (meta?.puntos ?? []).filter((d) => d.valor != null);
  if (!puntos.length) return null;

  const last = puntos[puntos.length - 1];
  const ago = puntos.find((d) => d.periodo === '202608');
  const sep25 = puntos.find((d) => d.periodo === '202509');
  const publicado = fechaCorta(meta.fechaPublicacion);
  const fuente = publicado
    ? `INDEC, publicado el ${publicado}`
    : `INDEC, dato hasta ${periodoLargo(meta.ultimoPeriodo)}`;

  const kpis = [
    ['Septiembre 2026', last?.periodo === '202609' ? last.valor : null, last?.periodo === '202609' ? last.observaciones : null],
    ['Agosto 2026', ago?.valor ?? null, ago?.observaciones ?? null],
    ['Septiembre 2025', sep25?.valor ?? null, sep25?.observaciones ?? null],
  ].filter(([, v]) => v != null) as Array<[string, number, string | null]>;

  const csvData = puntos as unknown as Record<string, unknown>[];
  const sub = [
    last?.periodo ? periodoLargo(last.periodo) : null,
    last?.valor != null ? `${num(last.valor)}%` : null,
    ago?.valor != null ? `agosto ${num(ago.valor)}%${ago.observaciones ? ' (revisado)' : ''}` : null,
    sep25?.valor != null ? `sep-25 ${num(sep25.valor)}%` : null,
    fuente,
  ].filter(Boolean).join(' · ');

  return (
    <div className="home-float rounded-xl overflow-hidden">
      <ChartCard
        className="!bg-transparent !border-0"
        title="Utilización de la capacidad instalada (UCII)"
        subtitle={sub}
        csvData={csvData}
        csvFileName="ucii"
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={puntos} margin={{ top: 24, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="uciiBarFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0099FF" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#0070C2" stopOpacity={0.85} />
              </linearGradient>
            </defs>
            <CartesianGrid {...t.grid} />
            <XAxis dataKey="date" tick={t.axis} />
            <YAxis tick={t.axis} unit="%" domain={[50, 70]} />
            <Tooltip content={<ThemedTooltip />} />
            <Bar dataKey="valor" name="UCII (%)" radius={[4, 4, 0, 0]} fill="url(#uciiBarFill)">
              {puntos.map((d, i) => (
                <Cell key={d.periodo} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
              <LabelList
                dataKey="valor"
                position="top"
                formatter={(v: number) => `${Number(v).toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`}
                style={{ fontSize: 11, fill: t.textSecondary, fontFamily: 'monospace' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {kpis.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {kpis.map(([k, v, obs]) => (
              <div key={k}>
                <p className="text-[10px] font-mono uppercase tracking-wider text-theme-muted">{k}</p>
                <p className="text-xl font-semibold font-mono text-[var(--fg-0)]">{num(v)}%</p>
                {obs && <p className="text-[11px] text-theme-muted mt-0.5">{obs}</p>}
              </div>
            ))}
          </div>
        )}

        <p className="mt-3 text-[11px] text-theme-muted">
          Nivel general de la industria, en porcentaje de la capacidad instalada. Solo se muestran los valores
          verificados en el informe técnico (la API del INDEC no publica esta serie). Fuente:{' '}
          <a href={meta.url} className="underline" rel="noopener" target="_blank">
            {fuente}
          </a>.
        </p>
      </ChartCard>
    </div>
  );
}
