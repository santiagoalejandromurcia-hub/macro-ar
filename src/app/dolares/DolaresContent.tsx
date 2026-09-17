'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  ACTUALIZADO_AL,
  RESERVAS_NETAS_METODO,
  CUENTA_CORRIENTE,
  SERVICIOS_Q1,
  ITCRM_MES,
  ITCRM_REFS,
  MULC_MENSUAL_2026,
} from '@/data/dolares';
import { tradeData } from '@/data/macroData';
import StaleBanner from '@/components/StaleBanner';
import SectorChartCard from '@/components/SectorChartCard';
import { SeriesAsOf } from '@/components/SeriesAsOf';
import { downloadCSV } from '@/lib/csvUtils';

type Live = {
  reservas?: { fecha: string; valor: number };
  mulc?: { fecha: string; arsM: number; usdM: number | null };
  mulcHist?: { fecha: string; usdM: number }[];
  itcrm?: { fecha: string; valor: number };
  tc?: { fecha: string; valor: number };
};

export default function DolaresContent() {
  const [live, setLive] = useState<Live>({});
  useEffect(() => {
    fetch('/api/dolares')
      .then((r) => r.json())
      .then((j) => setLive(j))
      .catch(() => {});
  }, []);

  const cc = CUENTA_CORRIENTE;
  const itcrmLast = live.itcrm?.valor ?? ITCRM_REFS.last;
  const vs2017 = ((itcrmLast / ITCRM_REFS.avg2017) - 1) * 100;
  const vs2019 = ((itcrmLast / ITCRM_REFS.avg2019) - 1) * 100;

  const comercialRecent = tradeData.slice(-8);

  return (
    <div className="space-y-8">
      <StaleBanner asOf={ACTUALIZADO_AL} maxDays={45} label="CC y servicios = Q1 INDEC" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Reservas brutas" value={live.reservas ? `${Math.round(live.reservas.valor).toLocaleString('es-AR')}` : '—'} hint={live.reservas ? `USD M · ${live.reservas.fecha}` : 'BCRA var 1'} />
        <Kpi label="MULC (último)" value={live.mulc?.usdM != null ? `${live.mulc.usdM > 0 ? '+' : ''}${live.mulc.usdM}` : '—'} hint={live.mulc ? `${live.mulc.fecha} · var 47 / A3500` : 'flujo'} />
        <Kpi label="ITCRM" value={itcrmLast.toFixed(1)} hint={live.itcrm?.fecha ?? ITCRM_REFS.lastAsOf} />
        <Kpi label="CC Q1-26" value={cc.usdM.toLocaleString('es-AR')} hint="USD M · INDEC" down />
      </div>

      <div className="glass rounded-xl p-4 sm:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-2">{RESERVAS_NETAS_METODO.titulo}</h2>
        <p className="mb-2">{RESERVAS_NETAS_METODO.texto}</p>
        <p className="font-mono text-[12px] text-[var(--fg-2)]">
          Snapshot netas ≈ USD {RESERVAS_NETAS_METODO.snapshotUsdM} M · {RESERVAS_NETAS_METODO.snapshotAsOf} · {RESERVAS_NETAS_METODO.snapshotSource}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectorChartCard title="MULC — compras netas del BCRA" subtitle="Mensual 2026. Diario: efecto monetario var 47 / tipo de cambio mayorista var 5 (USD M)." fuente="BCRA">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={MULC_MENSUAL_2026}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="mes" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="usdM" name="USD M" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectorChartCard>
        <SectorChartCard title="MULC diario (aprox. USD)" subtitle="Últimas ruedas. Positivo = BCRA compró. Cero = no intervino." fuente="BCRA var 47 / var 5">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={(live.mulcHist ?? []).slice().reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="fecha" tick={{ fill: 'var(--fg-3)', fontSize: 9 }} hide />
              <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="usdM" name="USD M" fill="#5DC1E0" />
            </BarChart>
          </ResponsiveContainer>
        </SectorChartCard>
      </div>
      <button type="button" className="text-[11px] font-mono text-[var(--fg-3)] hover:text-[var(--celeste)] cursor-pointer" onClick={() => downloadCSV((live.mulcHist ?? []) as unknown as Record<string, unknown>[], 'mulc-diario')}>CSV ↓ MULC diario</button>

      <SectorChartCard
        title="Tipo de cambio real multilateral (ITCRM)"
        subtitle={`BCRA base 17/12/2015=100. Vs promedio 2017 (${ITCRM_REFS.avg2017}): ${vs2017.toFixed(1)}%. Vs 2019 (${ITCRM_REFS.avg2019}): ${vs2019.toFixed(1)}%. Sube = más competitivo.`}
        fuente={ITCRM_REFS.source}
      >
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={ITCRM_MES}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
            <XAxis dataKey="mes" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
            <YAxis domain={[70, 130]} tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="valor" name="ITCRM" stroke="#D4A843" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </SectorChartCard>
      <SeriesAsOf label="ITCRM" asOf={live.itcrm?.fecha ?? ITCRM_REFS.lastAsOf} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectorChartCard title="Saldo comercial (ICA) vs cuenta corriente" subtitle="El ICA es mensual de bienes. La CC es trimestral e incluye servicios y renta." fuente="INDEC">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={comercialRecent}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="exports" name="X" fill="#22C55E" />
              <Bar dataKey="imports" name="M" fill="#EF4444" />
              <Line type="monotone" dataKey="balance" name="Saldo ICA" stroke="#D4A843" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="text-[12px] text-[var(--fg-2)] mt-3">
            CC {cc.period}: <strong className="text-[var(--down)]">{cc.usdM.toLocaleString('es-AR')} USD M</strong>
            {' '}(pub. {cc.released}). Bienes de la BP +{cc.bienes.toLocaleString('es-AR')} frente a servicios {cc.servicios.toLocaleString('es-AR')}.
          </p>
        </SectorChartCard>

        <SectorChartCard title="El agujero de servicios (Q1 26)" subtitle="Turismo y fletes. Lo que el superávit comercial no muestra." fuente={cc.source}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={SERVICIOS_Q1} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis type="number" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
              <YAxis type="category" dataKey="rubro" width={120} tick={{ fill: 'var(--fg-2)', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="usdM" name="USD M" fill="#A78BFA" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[12px] text-[var(--fg-3)] mt-2">{cc.note}</p>
        </SectorChartCard>
      </div>
    </div>
  );
}

function Kpi({ label, value, hint, down }: { label: string; value: string; hint: string; down?: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--line-1)] bg-[var(--bg-1)] p-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--fg-2)]">{label}</div>
      <div className="tnum text-[20px] mt-1" style={{ color: down ? 'var(--down)' : 'var(--fg-0)' }}>{value}</div>
      <div className="text-[10px] text-[var(--fg-3)] mt-1">{hint}</div>
    </div>
  );
}
