'use client';

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts';
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

const ttm = ENERGIA_MENSUAL.filter((r) => r.ttm != null).map((r) => ({
  ...r,
  pos: (r.ttm ?? 0) > 0 ? r.ttm : 0,
  neg: (r.ttm ?? 0) < 0 ? r.ttm : 0,
}));

const mensualReciente = ENERGIA_MENSUAL.filter((r) => r.iso >= '2025-01');

function tickYear(mes: string) {
  return mes.startsWith('Ene') ? mes.slice(4) : '';
}

export default function EnergiaContent() {
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
        title="Balanza comercial energética — 12 meses"
        subtitle="USD millones · suma móvil 12 meses de (X CyE − M combustibles y lubricantes). INDEC."
        fuente={ENERGIA_FUENTE}
        filePrefix="macrolibre-energia"
      >
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={ttm} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
            <XAxis dataKey="mes" tick={{ fill: 'var(--fg-3)', fontSize: 10 }} interval={11} tickFormatter={tickYear} />
            <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)' }}
              formatter={(_v, _n, item) => {
                const ttmVal = (item?.payload as { ttm?: number } | undefined)?.ttm;
                return [`USD ${(ttmVal ?? 0).toLocaleString('es-AR')} M`, '12m'];
              }}
            />
            <ReferenceLine y={0} stroke="var(--line-1)" />
            <Area type="monotone" dataKey="pos" name="Superávit 12m" stroke="#15803d" fill="#15803d" fillOpacity={0.85} strokeWidth={0} />
            <Area type="monotone" dataKey="neg" name="Déficit 12m" stroke="#b91c1c" fill="#b91c1c" fillOpacity={0.85} strokeWidth={0} />
          </AreaChart>
        </ResponsiveContainer>
      </SectorChartCard>
      <button
        type="button"
        className="text-[11px] font-mono text-[var(--fg-3)] hover:text-[var(--celeste)] cursor-pointer"
        onClick={() => downloadCSV(ttm as unknown as Record<string, unknown>[], 'balanza-energetica-12m')}
      >
        CSV ↓ 12 meses
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
              <Bar dataKey="x" name="X CyE" fill="#15803d" />
              <Bar dataKey="m" name="M comb." fill="#b91c1c" />
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
                  <Cell key={r.anio} fill={r.saldo >= 0 ? '#15803d' : '#b91c1c'} />
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
