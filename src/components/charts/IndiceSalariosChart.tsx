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
import { indec, num, periodoLargo, fechaCorta } from '@/data/indec';

/**
 * Índice de salarios (INDEC) — variación mensual por sector.
 * Serie del snapshot data/indec/indice-salarios.json (API del INDEC).
 * Distinto del gráfico de salario real SIPA / EIL.
 */
export default function IndiceSalariosChart() {
  const t = useChartTheme();
  const meta = indec.salarios;
  const serie = (meta.serie ?? []).filter((d) =>
    d.general != null || d.privadoReg != null || d.publico != null || d.noReg != null,
  );
  if (!serie.length) return null;

  const last = serie[serie.length - 1];
  const publicado = fechaCorta(meta.fechaPublicacion);
  const fuente = publicado
    ? `INDEC, publicado el ${publicado}`
    : `INDEC, dato hasta ${periodoLargo(meta.ultimoPeriodo)}`;

  const kpis = [
    ['Mensual', last.mensual],
    ['Interanual', last.interanual],
    ['Acumulado', last.acumulada],
  ].filter(([, v]) => v != null) as Array<[string, number]>;

  const sectores = [
    ['Privado registrado', last.privadoReg],
    ['Público', last.publico],
    ['No registrado', last.noReg],
  ].filter(([, v]) => v != null) as Array<[string, number]>;

  const csvData = serie as unknown as Record<string, unknown>[];
  const sub = [
    periodoLargo(last.periodo),
    ...kpis.map(([k, v]) => `${k.toLowerCase()} ${num(v, 1, true)}%`),
    fuente,
  ].filter(Boolean).join(' · ');

  return (
    <div className="home-float rounded-xl overflow-hidden">
      <ChartCard
        className="!bg-transparent !border-0"
        title="Índice de salarios (INDEC)"
        subtitle={sub}
        csvData={csvData}
        csvFileName="indice-salarios"
      >
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={serie} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid {...t.grid} />
            <XAxis dataKey="date" tick={t.axis} interval={2} />
            <YAxis tick={t.axis} unit="%" />
            <Tooltip content={<ThemedTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: t.textSecondary }} />
            <ReferenceLine y={0} stroke={t.refLine} strokeDasharray="2 4" />
            {serie.some((d) => d.general != null) && (
              <Line type="monotone" dataKey="general" name="Nivel general" stroke="#0099FF" strokeWidth={2.5} dot={false} />
            )}
            {serie.some((d) => d.privadoReg != null) && (
              <Line type="monotone" dataKey="privadoReg" name="Privado registrado" stroke="#0070C2" strokeWidth={2} dot={false} />
            )}
            {serie.some((d) => d.publico != null) && (
              <Line type="monotone" dataKey="publico" name="Público" stroke="#EF4444" strokeWidth={2} dot={false} />
            )}
            {serie.some((d) => d.noReg != null) && (
              <Line type="monotone" dataKey="noReg" name="Privado no registrado" stroke="#22C55E" strokeWidth={2} dot={false} />
            )}
          </LineChart>
        </ResponsiveContainer>

        {kpis.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {kpis.map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] font-mono uppercase tracking-wider text-theme-muted">{k}</p>
                <p className={`text-xl font-semibold font-mono ${v < 0 ? 'text-[var(--down)]' : 'text-[var(--fg-0)]'}`}>
                  {num(v, 1, true)}%
                </p>
              </div>
            ))}
          </div>
        )}

        {sectores.length > 0 && (
          <div className="mt-3 text-[11px] font-mono text-theme-muted">
            Variación mensual {last.date}:{' '}
            {sectores.map(([k, v], i) => (
              <span key={k}>
                {i > 0 ? ' · ' : ''}
                {k}{' '}
                <span className={v < 0 ? 'text-[var(--down)]' : 'text-theme-primary font-semibold'}>
                  {num(v, 1, true)}%
                </span>
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 text-[11px] text-theme-muted">
          Variación de las remuneraciones según el índice de salarios del INDEC (no es salario real).
          El gráfico de salario real (SIPA / EIL, base nov-23 = 100) está más abajo.
          Fuente:{' '}
          <a
            href="https://www.indec.gob.ar/uploads/informesdeprensa/salarios_11_2682D43EDD23.pdf"
            className="underline"
            rel="noopener"
            target="_blank"
          >
            {fuente}
          </a>.
        </p>
      </ChartCard>
    </div>
  );
}
