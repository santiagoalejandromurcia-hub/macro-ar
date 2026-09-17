'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  ACTUALIZADO_AL,
  CREDITO_FUENTE,
  creditoStockMensual,
  MORA_OFICIAL,
  MORA_FINTECH,
  MORA_SERIE,
  LINEAS_PRESTAMO,
} from '@/data/credito';
import StaleBanner from '@/components/StaleBanner';
import SectorChartCard from '@/components/SectorChartCard';
import { SeriesAsOf } from '@/components/SeriesAsOf';
import { downloadCSV } from '@/lib/csvUtils';

type Live = {
  stock?: { fecha: string; valor: number };
  usd?: { fecha: string; valor: number };
  lineas?: { id: number; label: string; valor: number; fecha: string }[];
};

export default function CreditoContent() {
  const [live, setLive] = useState<Live>({});
  useEffect(() => {
    fetch('/api/credito')
      .then((r) => r.json())
      .then((j) => setLive(j))
      .catch(() => {});
  }, []);

  const pie = (live.lineas ?? []).map((l) => ({
    name: l.label,
    value: Math.round(l.valor / 1e6 * 10) / 10,
    color: LINEAS_PRESTAMO.find((x) => x.id === l.id)?.color ?? '#9CA3AF',
  }));
  const pieTotal = pie.reduce((s, p) => s + p.value, 0);

  return (
    <div className="space-y-8">
      <StaleBanner asOf={ACTUALIZADO_AL} maxDays={45} label="Mora = snapshot Informe de Bancos" />
      <p className="text-[11px] font-mono text-[var(--fg-3)]">{CREDITO_FUENTE}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Stock (último)" value={live.stock ? `${(live.stock.valor / 1e6).toFixed(1)} Bn` : '—'} hint={live.stock ? `ARS · ${live.stock.fecha}` : 'BCRA var 26'} />
        <Kpi label="Crédito USD" value={live.usd ? `USD ${(live.usd.valor / 1000).toFixed(1)} mil M` : '—'} hint={live.usd?.fecha ?? 'var 125'} />
        <Kpi label="Mora sistema" value={`${MORA_OFICIAL.total}%`} hint={`Familias ${MORA_OFICIAL.familias}% · jun-26`} />
        <Kpi label="Crédito / PBI" value={`${MORA_OFICIAL.creditoPibTotal}%`} hint={`Pesos ${MORA_OFICIAL.creditoPibPesos}% · jun-26`} />
      </div>

      <SectorChartCard title="Préstamos al privado en términos reales" subtitle="Stock fin de mes deflactado por IPC (pesos de ago-26). Fuente: BCRA var 26 + INDEC IPC." fuente={CREDITO_FUENTE}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={creditoStockMensual}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
            <XAxis dataKey="mes" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)' }} />
            <Legend />
            <Line type="monotone" dataKey="realAgo26Bn" name="Stock real (Bn $ ago-26)" stroke="#5DC1E0" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </SectorChartCard>
      <button type="button" className="text-[11px] font-mono text-[var(--fg-3)] hover:text-[var(--celeste)] cursor-pointer" onClick={() => downloadCSV(creditoStockMensual as unknown as Record<string, unknown>[], 'credito-real')}>CSV ↓ crédito real</button>
      <SeriesAsOf label="IPC deflactor" asOf="2026-08" note="Sep usa IPC ago hasta que salga el dato" />

      <SectorChartCard title="Irregularidad / mora" subtitle="Oficial BCRA jun-26. Puntos intermedios de prensa/CENDEU marcados como no-oficiales." fuente={MORA_OFICIAL.source}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={MORA_SERIE}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
            <XAxis dataKey="mes" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
            <YAxis unit="%" tick={{ fill: 'var(--fg-3)', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)' }} />
            <Legend />
            <Line type="monotone" dataKey="total" name="Total" stroke="#f85149" strokeWidth={2.5} />
            <Line type="monotone" dataKey="familias" name="Familias" stroke="#EC4899" strokeWidth={2} />
            <Line type="monotone" dataKey="empresas" name="Empresas" stroke="#D4A843" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </SectorChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectorChartCard title="Composición por línea (pesos)" subtitle="Saldos BCRA. No es ranking de bancos: el BCRA no publica stock por entidad en esta API." fuente="BCRA var 110-116">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {pie.map((p) => <Cell key={p.name} fill={p.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v.toFixed(1)} Bn`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          {pieTotal > 0 && <p className="text-[11px] text-[var(--fg-3)] mt-2">Total líneas {pieTotal.toFixed(1)} Bn ARS</p>}
        </SectorChartCard>

        <div className="glass rounded-xl p-4 sm:p-6">
          <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-2">Bancos y fintech</h2>
          <p className="text-[13px] text-[var(--fg-1)] leading-relaxed mb-3">
            Entidades relevantes del stock: Nación, Provincia, Galicia, Santander, BBVA, Macro, ICBC.
            Fintech / PNFC: Mercado Pago, Ualá, Brubank. El Informe de Bancos agrupa por tipo de entidad, no publicamos un ranking inventado.
          </p>
          <table className="w-full text-[13px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <thead>
              <tr className="text-[10px] font-mono uppercase text-[var(--fg-3)]">
                <th className="text-left py-2">Segmento</th>
                <th className="text-right">Mora</th>
                <th className="text-right">Corte</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line-1)]"><td className="py-2">Sistema financiero</td><td className="text-right">{MORA_OFICIAL.total}%</td><td className="text-right text-[var(--fg-3)]">jun-26 oficial</td></tr>
              <tr className="border-t border-[var(--line-1)]"><td className="py-2">Familias</td><td className="text-right">{MORA_OFICIAL.familias}%</td><td className="text-right text-[var(--fg-3)]">jun-26 oficial</td></tr>
              <tr className="border-t border-[var(--line-1)]"><td className="py-2">Empresas</td><td className="text-right">{MORA_OFICIAL.empresas}%</td><td className="text-right text-[var(--fg-3)]">jun-26 oficial</td></tr>
              <tr className="border-t border-[var(--line-1)]"><td className="py-2">PNFC / fintech</td><td className="text-right">{MORA_FINTECH.irregularPnfc}%</td><td className="text-right text-[var(--fg-3)]">may-26 CENDEU</td></tr>
            </tbody>
          </table>
          <p className="text-[11px] text-[var(--fg-3)] mt-3">{MORA_FINTECH.note}</p>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-[var(--line-1)] bg-[var(--bg-1)] p-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--fg-2)]">{label}</div>
      <div className="tnum text-[20px] text-[var(--fg-0)] mt-1">{value}</div>
      <div className="text-[10px] text-[var(--fg-3)] mt-1">{hint}</div>
    </div>
  );
}
