'use client';

import { useState, useMemo } from 'react';
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, ReferenceArea,
} from 'recharts';
import { useTheme } from './ThemeProvider';

// ═══════════ DATA — 60 períodos ene-22 a dic-26 ═══════════
const ALL_DATA = [
  { p: 'ene-22', bcra: 5.8, base: 5.8, opt: 5.8, pes: 5.8, dev: 0 },
  { p: 'feb-22', bcra: 5.8, base: 6.1, opt: 6.1, pes: 5.9, dev: 4.9 },
  { p: 'mar-22', bcra: 5.7, base: 6.3, opt: 6.4, pes: 6.0, dev: 9.7 },
  { p: 'abr-22', bcra: 5.9, base: 6.6, opt: 6.8, pes: 6.2, dev: 12.6 },
  { p: 'may-22', bcra: 6.0, base: 6.8, opt: 7.1, pes: 6.2, dev: 12.3 },
  { p: 'jun-22', bcra: 6.5, base: 7.1, opt: 7.5, pes: 6.4, dev: 9.2 },
  { p: 'jul-22', bcra: 7.1, base: 7.5, opt: 8.0, pes: 6.6, dev: 4.8 },
  { p: 'ago-22', bcra: 7.0, base: 7.9, opt: 8.5, pes: 6.8, dev: 12.5 },
  { p: 'sep-22', bcra: 7.1, base: 8.2, opt: 8.9, pes: 6.9, dev: 15.6 },
  { p: 'oct-22', bcra: 7.3, base: 8.4, opt: 9.3, pes: 7.0, dev: 15.4 },
  { p: 'nov-22', bcra: 7.6, base: 8.6, opt: 9.5, pes: 7.0, dev: 13.4 },
  { p: 'dic-22', bcra: 8.7, base: 8.8, opt: 9.8, pes: 7.0, dev: 0.4 },
  { p: 'ene-23', bcra: 9.2, base: 9.4, opt: 10.6, pes: 7.3, dev: 2.1 },
  { p: 'feb-23', bcra: 9.2, base: 9.7, opt: 11.1, pes: 7.4, dev: 5.9 },
  { p: 'mar-23', bcra: 9.3, base: 10.3, opt: 12.0, pes: 7.7, dev: 11.7 },
  { p: 'abr-23', bcra: 9.9, base: 10.4, opt: 12.1, pes: 7.7, dev: 5.3 },
  { p: 'may-23', bcra: 10.4, base: 10.2, opt: 11.9, pes: 7.5, dev: -2.3 },
  { p: 'jun-23', bcra: 11.2, base: 9.9, opt: 11.6, pes: 7.2, dev: -11.1 },
  { p: 'jul-23', bcra: 12.0, base: 10.2, opt: 12.0, pes: 7.3, dev: -15.1 },
  { p: 'ago-23', bcra: 12.6, base: 11.3, opt: 13.4, pes: 7.9, dev: -10.8 },
  { p: 'sep-23', bcra: 13.3, base: 12.4, opt: 14.9, pes: 8.5, dev: -7.1 },
  { p: 'oct-23', bcra: 15.0, base: 13.2, opt: 16.1, pes: 8.9, dev: -11.7 },
  { p: 'nov-23', bcra: 15.6, base: 14.5, opt: 17.8, pes: 9.5, dev: -7.3 },
  { p: 'dic-23', bcra: 18.7, base: 16.9, opt: 20.8, pes: 11.0, dev: -10.0 },
  { p: 'ene-24', bcra: 19.4, base: 20.1, opt: 25.1, pes: 12.8, dev: 3.7 },
  { p: 'feb-24', bcra: 20.0, base: 20.5, opt: 25.9, pes: 12.8, dev: 2.8 },
  { p: 'mar-24', bcra: 21.4, base: 22.0, opt: 28.0, pes: 13.5, dev: 2.8 },
  { p: 'abr-24', bcra: 22.3, base: 23.1, opt: 29.6, pes: 13.9, dev: 3.6 },
  { p: 'may-24', bcra: 25.3, base: 23.8, opt: 30.9, pes: 14.0, dev: -6.1 },
  { p: 'jun-24', bcra: 30.1, base: 24.4, opt: 32.0, pes: 14.1, dev: -18.8 },
  { p: 'jul-24', bcra: 33.6, base: 25.7, opt: 34.2, pes: 14.4, dev: -23.4 },
  { p: 'ago-24', bcra: 33.8, base: 26.6, opt: 35.7, pes: 14.6, dev: -21.5 },
  { p: 'sep-24', bcra: 34.6, base: 26.9, opt: 36.5, pes: 14.5, dev: -22.1 },
  { p: 'oct-24', bcra: 35.8, base: 27.2, opt: 37.3, pes: 14.3, dev: -24.0 },
  { p: 'nov-24', bcra: 37.9, base: 27.5, opt: 38.1, pes: 14.1, dev: -27.4 },
  { p: 'dic-24', bcra: 43.5, base: 27.8, opt: 39.0, pes: 14.0, dev: -36.0 },
  { p: 'ene-25', bcra: 45.7, base: 28.0, opt: 39.7, pes: 13.8, dev: -38.7 },
  { p: 'feb-25', bcra: 45.3, base: 28.4, opt: 40.6, pes: 13.7, dev: -37.4 },
  { p: 'mar-25', bcra: 47.1, base: 28.2, opt: 40.8, pes: 13.4, dev: -40.0 },
  { p: 'abr-25', bcra: 47.9, base: 28.8, opt: 42.0, pes: 13.3, dev: -39.8 },
  { p: 'may-25', bcra: 48.2, base: 28.6, opt: 42.1, pes: 13.0, dev: -40.7 },
  { p: 'jun-25', bcra: 50.5, base: 28.4, opt: 42.2, pes: 12.6, dev: -43.8 },
  { p: 'jul-25', bcra: 54.1, base: 28.4, opt: 42.7, pes: 12.4, dev: -47.5 },
  { p: 'ago-25', bcra: 52.8, base: 28.6, opt: 43.5, pes: 12.2, dev: -45.9 },
  { p: 'sep-25', bcra: 51.8, base: 28.8, opt: 44.3, pes: 12.0, dev: -44.4 },
  { p: 'oct-25', bcra: 52.6, base: 28.7, opt: 44.6, pes: 11.7, dev: -45.4 },
  { p: 'nov-25', bcra: 52.2, base: 28.8, opt: 45.2, pes: 11.5, dev: -44.8 },
  { p: 'dic-25', bcra: 58.1, base: 29.6, opt: 47.0, pes: 11.6, dev: -49.0 },
  { p: 'ene-26', bcra: 58.4, base: 30.0, opt: 48.2, pes: 11.5, dev: -48.6 },
  { p: 'feb-26', bcra: 56.9, base: 30.4, opt: 49.4, pes: 11.4, dev: -46.5 },
  { p: 'mar-26', bcra: 59.1, base: 30.6, opt: 50.2, pes: 11.2, dev: -48.2 },
  { p: 'abr-26', bcra: null, base: 30.9, opt: 51.1, pes: 11.1, dev: null },
  { p: 'may-26', bcra: null, base: 31.0, opt: 51.9, pes: 10.9, dev: null },
  { p: 'jun-26', bcra: null, base: 31.1, opt: 52.5, pes: 10.7, dev: null },
  { p: 'jul-26', bcra: null, base: 31.1, opt: 53.1, pes: 10.5, dev: null },
  { p: 'ago-26', bcra: null, base: 31.1, opt: 53.7, pes: 10.3, dev: null },
  { p: 'sep-26', bcra: null, base: 31.0, opt: 54.1, pes: 10.0, dev: null },
  { p: 'oct-26', bcra: null, base: 31.3, opt: 55.1, pes: 9.9, dev: null },
  { p: 'nov-26', bcra: null, base: 31.5, opt: 56.1, pes: 9.8, dev: null },
  { p: 'dic-26', bcra: null, base: 31.8, opt: 57.1, pes: 9.6, dev: null },
];

type Vista = 'historico' | 'escenarios';
type Rango = '2a' | '3a' | 'todo';

export default function M2ProxySection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [vista, setVista] = useState<Vista>('historico');
  const [rango, setRango] = useState<Rango>('3a');
  const [metodoOpen, setMetodoOpen] = useState(false);

  // Filter data by range
  const data = useMemo(() => {
    if (rango === 'todo') return ALL_DATA;
    if (rango === '2a') return ALL_DATA.slice(ALL_DATA.length - 24);
    return ALL_DATA.slice(ALL_DATA.length - 36); // 3a
  }, [rango]);

  // Projection start index
  const projStartIdx = data.findIndex(d => d.bcra === null);
  const projStartLabel = projStartIdx >= 0 ? data[projStartIdx].p : null;

  // Chart theme
  const ax = { fontSize: 10, fill: isDark ? '#64748B' : '#94A3B8', fontFamily: 'JetBrains Mono, monospace' };
  const gr = { strokeDasharray: '3 3' as const, stroke: isDark ? '#1E293B' : '#E2E8F0' };

  const ChartTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    const point = ALL_DATA.find(d => d.p === label);
    return (
      <div style={{ background: isDark ? '#111827' : '#FFF', border: `1px solid ${isDark ? '#1E293B' : '#E2E8F0'}` }} className="rounded-lg p-3 shadow-xl text-xs font-mono">
        <p style={{ color: isDark ? '#94A3B8' : '#64748B' }} className="mb-2 font-semibold">{label}</p>
        {payload.map((p: any, i: number) => (
          p.value != null && <div key={i} className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span style={{ color: isDark ? '#94A3B8' : '#64748B' }}>{p.name}:</span>
            <span style={{ color: isDark ? '#F1F5F9' : '#0F172A' }} className="font-semibold">${p.value}T</span>
          </div>
        ))}
        {point?.dev != null && (
          <div className="mt-1.5 pt-1.5 border-t" style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}>
            <span style={{ color: point.dev < 0 ? '#EF4444' : '#22C55E' }}>Desvío: {point.dev > 0 ? '+' : ''}{point.dev}%</span>
          </div>
        )}
      </div>
    );
  };

  // Last real data point
  const lastReal = ALL_DATA.filter(d => d.bcra !== null).pop()!;
  const prevReal = ALL_DATA.filter(d => d.bcra !== null).slice(-2)[0];
  const varMM = prevReal ? ((lastReal.bcra! - prevReal.bcra!) / prevReal.bcra! * 100).toFixed(1) : '—';
  const ene25 = ALL_DATA.find(d => d.p === 'ene-25');
  const varIA = ene25?.bcra ? ((lastReal.bcra! - ene25.bcra) / ene25.bcra * 100).toFixed(1) : '—';

  return (
    <div className="bg-theme-card border border-theme rounded-xl overflow-hidden">

      {/* ─── Header ─── */}
      <div className="p-5 sm:p-6 border-b border-theme">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg bg-ar-celeste/10 border border-ar-celeste/20 flex items-center justify-center text-ar-celeste font-mono font-bold text-sm flex-shrink-0">
              M2
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-theme-primary">Demanda de dinero — M2 Privado Transaccional</h3>
              <p className="text-xs text-theme-muted font-mono mt-0.5">ARS billones · Billetes + Dep.CC no remunerados (sector privado)</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-ar-green/10 text-ar-green border border-ar-green/20">
              actualizado
            </span>
            <a
              href="/data/MacroLibre_M2_Proxy_v2.xlsx"
              download
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-theme-surface border border-theme text-theme-secondary hover:text-theme-primary transition-colors"
            >
              ⬇ Excel
            </a>
          </div>
        </div>
      </div>

      {/* ─── KPIs ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-theme">
        {[
          { label: `${lastReal.p} real`, value: `$${lastReal.bcra}T`, color: undefined },
          { label: 'var. m/m', value: `+${varMM}%`, color: '#22C55E' },
          { label: 'var. i.a.', value: `+${varIA}%`, color: '#22C55E' },
          { label: 'desvío modelo', value: `${lastReal.dev}%`, color: '#EF4444' },
          { label: 'proyección dic-26', value: '$32–57T', color: undefined },
        ].map((kpi, i) => (
          <div key={i} className={`p-3 sm:p-4 text-center ${i < 4 ? 'border-r border-theme' : ''} ${i >= 2 && i < 4 ? 'hidden sm:block' : ''}`}>
            <p className="text-[10px] text-theme-muted font-mono uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className="text-sm sm:text-base font-bold font-mono" style={{ color: kpi.color || (isDark ? '#F1F5F9' : '#0F172A') }}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Controls ─── */}
      <div className="p-3 sm:p-4 border-b border-theme bg-theme-surface flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex gap-1.5">
          {(['historico', 'escenarios'] as Vista[]).map((v) => (
            <button
              key={v}
              onClick={() => setVista(v)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                vista === v
                  ? 'bg-ar-celeste/15 text-ar-celeste border border-ar-celeste/25'
                  : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {v === 'historico' ? 'Histórico vs modelo' : '3 escenarios 2026'}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {(['2a', '3a', 'todo'] as Rango[]).map((r) => (
            <button
              key={r}
              onClick={() => setRango(r)}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                rango === r
                  ? 'bg-ar-gold/15 text-ar-gold border border-ar-gold/25'
                  : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Chart ─── */}
      <div className="p-4 sm:p-5">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid {...gr} />
            <XAxis dataKey="p" tick={ax} interval={Math.max(0, Math.floor(data.length / 8) - 1)} />
            <YAxis tick={ax} domain={['auto', 'auto']} tickFormatter={(v) => `$${v}T`} />
            <Tooltip content={<ChartTooltip />} />

            {/* Zona proyectada */}
            {projStartLabel && (
              <ReferenceArea
                x1={projStartLabel}
                x2={data[data.length - 1].p}
                fill={isDark ? '#D4A843' : '#D4A843'}
                fillOpacity={isDark ? 0.04 : 0.06}
              />
            )}

            {/* BCRA real — siempre visible */}
            <Area
              type="monotone" dataKey="bcra" name="BCRA oficial"
              stroke="#74ACDF" fill="#74ACDF" fillOpacity={0.08}
              strokeWidth={2.5} dot={false} connectNulls={false}
            />

            {/* Modelo BASE — siempre visible */}
            <Line
              type="monotone" dataKey="base" name="Modelo BASE"
              stroke="#22C55E" strokeWidth={2} dot={false}
              strokeDasharray="6 3"
            />

            {/* Pesimista — siempre visible */}
            <Line
              type="monotone" dataKey="pes" name="Pesimista"
              stroke="#F97316" strokeWidth={1.5} dot={false}
              strokeDasharray="4 4"
            />

            {/* Optimista — solo en vista escenarios */}
            {vista === 'escenarios' && (
              <Line
                type="monotone" dataKey="opt" name="Optimista"
                stroke="#166534" strokeWidth={2} dot={false}
                strokeDasharray="6 3"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>

        {/* Leyenda custom */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 px-1">
          <div className="flex items-center gap-1.5">
            <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="#74ACDF" strokeWidth="2.5" /></svg>
            <span className="text-[10px] text-theme-muted">BCRA oficial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 2" /></svg>
            <span className="text-[10px] text-theme-muted">Modelo BASE</span>
          </div>
          {vista === 'escenarios' && (
            <div className="flex items-center gap-1.5">
              <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" /></svg>
              <span className="text-[10px] text-theme-muted">Optimista</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 2" /></svg>
            <span className="text-[10px] text-theme-muted">Pesimista</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: isDark ? 'rgba(212,168,67,0.15)' : 'rgba(212,168,67,0.2)' }} />
            <span className="text-[10px] text-theme-muted">Zona proyectada</span>
          </div>
          <span className="text-[10px] text-theme-faint ml-auto">BCRA · IMM mensual · MacroLibre</span>
        </div>
      </div>

      {/* ─── Metodología ─── */}
      <div className="border-t border-theme">
        <button
          onClick={() => setMetodoOpen(!metodoOpen)}
          className="w-full p-4 flex items-center justify-between text-sm font-medium text-theme-secondary hover:text-theme-primary transition-colors"
        >
          <span>📐 Metodología</span>
          <span className="text-theme-faint">{metodoOpen ? '▲' : '▼'}</span>
        </button>
        {metodoOpen && (
          <div className="px-4 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                title: 'Fórmula',
                content: 'M2(t) = M2(t-1) × (1+π) × (1 + ε_PBI × g) × (1 − carry)',
              },
              {
                title: 'Elasticidades',
                content: 'ε_PBI: 1.1 (base) · ε_π: −0.45 · Carry: −0.02',
              },
              {
                title: 'Fuente datos',
                content: 'BCRA — Informe Monetario Mensual · M2 Priv. Transaccional · IPC INDEC',
              },
              {
                title: 'Nota desvío',
                content: 'El modelo subestima M2 real (desvío −48%). La remonetización post-cepo supera las elasticidades históricas.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-theme-surface border border-theme rounded-lg p-3">
                <p className="text-xs font-semibold text-theme-primary mb-1.5">{card.title}</p>
                <p className="text-[11px] text-theme-muted leading-relaxed font-mono">{card.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
