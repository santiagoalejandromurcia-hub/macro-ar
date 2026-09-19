'use client';

import {
  ComposedChart, BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { useChartTheme, ThemedTooltip } from '@/components/charts/useChartTheme';
import {
  ACTUALIZADO_AL,
  ENERGIA_FUENTE,
  ENERGIA_KPI,
  ENERGIA_MENSUAL,
  ENERGIA_ANUAL,
  CRUDO_FOB,
  PETROLEO_SNAP,
  DESTINOS_YTD,
  DESTINOS_FUENTE,
} from '@/data/energia';
import StaleBanner from '@/components/StaleBanner';
import SectorChartCard from '@/components/SectorChartCard';
import { SeriesAsOf } from '@/components/SeriesAsOf';
import { downloadCSV } from '@/lib/csvUtils';

const rolling12 = ENERGIA_MENSUAL.map((r, i, arr) => {
  if (i < 11) return null;
  const w = arr.slice(i - 11, i + 1);
  const x12 = w.reduce((s, p) => s + p.x, 0);
  const m12 = w.reduce((s, p) => s + p.m, 0);
  return { mes: r.mes, iso: r.iso, x12, m12, ttm: x12 - m12 };
}).filter((r): r is NonNullable<typeof r> => r != null);

const mensualReciente = ENERGIA_MENSUAL.filter((r) => r.iso >= '2025-01');

function tickYear(mes: string) {
  return mes.startsWith('Ene') ? mes.slice(4) : '';
}

export default function EnergiaContent() {
  const t = useChartTheme();
  const k = ENERGIA_KPI;

  return (
    <div className="space-y-8">
      <StaleBanner asOf={ACTUALIZADO_AL} maxDays={45} label="ICA CyE · 12m derivado de series oficiales" />
      <p className="text-[11px] font-mono text-[var(--fg-3)]">{ENERGIA_FUENTE}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Saldo 12m" value={`+${k.ttmUsdM.toLocaleString('es-AR')}`} hint={`USD M · ${k.ttmAsOf}`} />
        <Kpi label="Saldo ene–ago" value={`+${k.ytdUsdM.toLocaleString('es-AR')}`} hint={`X ${k.ytdX.toLocaleString('es-AR')} − M ${k.ytdM.toLocaleString('es-AR')}`} />
        <Kpi label="CyE agosto" value={k.agoX.toLocaleString('es-AR')} hint={`X USD M · M ${k.agoM} · saldo +${k.agoSaldo}`} />
        <Kpi label="Petróleo" value={`${PETROLEO_SNAP.kbd}`} hint={`${PETROLEO_SNAP.kbd} kb/d · ${PETROLEO_SNAP.asOf} · +${PETROLEO_SNAP.yoy}% i.a.`} />
      </div>

      <div className="glass rounded-xl p-4 sm:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-2">De déficit energético a superávit récord</h2>
        <p className="mb-2">
          El saldo 12 meses de combustibles y energía cruzó a rojo en 2011, tocó piso cerca de USD −7.400 M en 2014
          y volvió a verde de forma sostenida desde 2024. En ago-26 el acumulado 12 meses es
          {' '}<span className="font-mono text-[var(--up)]">+USD {k.ttmUsdM.toLocaleString('es-AR')} M</span>.
          Ene–ago 2026 ya suma +USD {k.ytdUsdM.toLocaleString('es-AR')} M — del orden del {k.ytdShareComercial}% del superávit comercial total del ICA.
        </p>
        <p className="text-[12px] text-[var(--fg-3)]">
          No es una serie diaria de Vaca Muerta. Es el rubro CyE del ICA menos combustibles y lubricantes.
          GNL, pozos y USD 12.000 M de cierre de año son proyecciones: no las cargamos como dato.
        </p>
      </div>

      <SectorChartCard
        title="CyE vs combustibles — suma 12 meses"
        subtitle="Tres series: exportaciones CyE, importaciones de combustibles y el saldo. No es un área neto. INDEC ICA."
        fuente={ENERGIA_FUENTE}
        filePrefix="macrolibre-energia"
      >
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={rolling12} margin={{ top: 8, right: 8, left: -6, bottom: 0 }}>
            <CartesianGrid {...t.grid} />
            <XAxis dataKey="mes" tick={t.axis} interval={23} tickFormatter={tickYear} />
            <YAxis tick={t.axis} />
            <Tooltip content={<ThemedTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: t.textSecondary }} />
            <ReferenceLine y={0} stroke={t.refLine} />
            <Line type="monotone" dataKey="x12" name="X CyE 12m" stroke="#74ACDF" strokeWidth={2.2} dot={false} />
            <Line type="monotone" dataKey="m12" name="M comb. 12m" stroke="#EC4899" strokeWidth={2.2} dot={false} />
            <Line type="monotone" dataKey="ttm" name="Saldo 12m" stroke="#D4A843" strokeWidth={2.6} strokeDasharray="6 3" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#74ACDF' }} />X 12m</span>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#EC4899' }} />M 12m</span>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#D4A843' }} />Saldo (X−M)</span>
          <span className="ml-auto">Ago-26 saldo <span className="text-ar-green font-semibold">+USD {k.ttmUsdM.toLocaleString('es-AR')} M</span></span>
        </div>
      </SectorChartCard>
      <button
        type="button"
        className="text-[11px] font-mono text-[var(--fg-3)] hover:text-[var(--celeste)] cursor-pointer"
        onClick={() => downloadCSV(rolling12 as unknown as Record<string, unknown>[], 'energia-x-m-saldo-12m')}
      >
        CSV ↓ X / M / saldo 12m
      </button>
      <SeriesAsOf label="ICA CyE" asOf="2026-08" note="Jul = datos.gob.ar · Ago = ICA 18/09" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectorChartCard
          title="CyE mensual 2025–26"
          subtitle="Exportaciones FOB vs importaciones de combustibles y lubricantes."
          fuente={ENERGIA_FUENTE}
          filePrefix="macrolibre-energia"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mensualReciente}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="mes" tick={{ fill: 'var(--fg-3)', fontSize: 10 }} interval={2} />
              <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)' }} />
              <Legend />
              <Bar dataKey="x" name="X CyE" fill="#74ACDF" />
              <Bar dataKey="m" name="M comb." fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </SectorChartCard>

        <SectorChartCard
          title="Saldo anual"
          subtitle="Suma calendario. 2026 = ene–ago (incompleto)."
          fuente={ENERGIA_FUENTE}
          filePrefix="macrolibre-energia"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ENERGIA_ANUAL}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="anio" tick={{ fill: 'var(--fg-3)', fontSize: 10 }} interval={2} />
              <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)' }} />
              <ReferenceLine y={0} stroke="var(--line-1)" />
              <Bar dataKey="saldo" name="Saldo USD M" radius={[3, 3, 0, 0]}>
                {ENERGIA_ANUAL.map((r) => (
                  <Cell key={r.anio} fill={r.saldo >= 0 ? '#74ACDF' : '#EC4899'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectorChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectorChartCard
          title="Petróleo crudo exportado"
          subtitle="USD M FOB · serie 75.3_IPC. Último jul-26 (datos.gob.ar)."
          fuente="INDEC ICA · petróleo crudo FOB"
          filePrefix="macrolibre-energia"
        >
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={CRUDO_FOB}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="mes" tick={{ fill: 'var(--fg-3)', fontSize: 10 }} interval={2} />
              <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)' }} />
              <Line type="monotone" dataKey="usdM" name="Crudo USD M" stroke="#F97316" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectorChartCard>

        <SectorChartCard
          title="Destinos CyE ene–ago 2026"
          subtitle="USD M. Snapshot de prensa ICA; no es ranking diario."
          fuente={DESTINOS_FUENTE}
          filePrefix="macrolibre-energia"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DESTINOS_YTD} layout="vertical" margin={{ left: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis type="number" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <YAxis type="category" dataKey="pais" width={110} tick={{ fill: 'var(--fg-2)', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="usdM" name="USD M" fill="#F97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[12px] text-[var(--fg-3)] mt-2">
            Producción: {PETROLEO_SNAP.kbd} kb/d en {PETROLEO_SNAP.asOf} (+{PETROLEO_SNAP.yoy}% i.a.). {PETROLEO_SNAP.source}.
          </p>
        </SectorChartCard>
      </div>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-[var(--line-1)] bg-[var(--bg-1)] p-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--fg-2)]">{label}</div>
      <div className="tnum text-[20px] mt-1 text-[var(--up)]">{value}</div>
      <div className="text-[10px] text-[var(--fg-3)] mt-1">{hint}</div>
    </div>
  );
}
