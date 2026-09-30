'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ChartCard from '@/components/ChartCard';
import HideOnError from '@/components/HideOnError';
import { preciosFOB } from '@/data/granos';
import { ypfCaba } from '@/data/combustibles';

function SeriesChart({
  id,
  title,
  data,
  color,
  file,
}: {
  id: string;
  title: string;
  data: { date: string; value: number }[];
  color: string;
  file: string;
}) {
  if (data.length < 2) return null;
  return (
    <div id={id} className="scroll-mt-24">
      <HideOnError>
        <ChartCard
          title={title}
          csvData={data.map((d) => ({ fecha: d.date, valor: d.value }))}
          csvFileName={file}
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--fg-3)' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10, fill: 'var(--fg-3)' }} tickLine={false} axisLine={false} width={48} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-0)', border: '1px solid var(--line-1)', fontSize: 12 }}
                labelStyle={{ color: 'var(--fg-2)' }}
              />
              <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.15} strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </HideOnError>
    </div>
  );
}

export default function CommoditiesCharts() {
  const soja = preciosFOB.map((d) => ({ date: d.mes, value: d.soja }));
  const maiz = preciosFOB.map((d) => ({ date: d.mes, value: d.maiz }));
  const trigo = preciosFOB.map((d) => ({ date: d.mes, value: d.trigo }));
  const superN = ypfCaba.map((d) => ({ date: d.mes, value: d.super }));
  const premium = ypfCaba.map((d) => ({ date: d.mes, value: d.premium }));
  const gasoil = ypfCaba.map((d) => ({ date: d.mes, value: d.gasoil }));
  const euro = ypfCaba.map((d) => ({ date: d.mes, value: d.euro }));

  return (
    <div className="space-y-6">
      <SeriesChart id="fob-soja" title="Soja FOB" data={soja} color="#22C55E" file="fob-soja" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SeriesChart id="fob-maiz" title="Maíz FOB" data={maiz} color="#F0A500" file="fob-maiz" />
        <SeriesChart id="fob-trigo" title="Trigo FOB" data={trigo} color="#D4A843" file="fob-trigo" />
      </div>
      <div id="ypf" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SeriesChart id="ypf-super" title="YPF Super CABA" data={superN} color="#F97316" file="ypf-super" />
        <SeriesChart id="ypf-premium" title="YPF Premium CABA" data={premium} color="#F0A500" file="ypf-premium" />
        <SeriesChart id="ypf-gasoil" title="YPF Gasoil CABA" data={gasoil} color="#64748B" file="ypf-gasoil" />
        <SeriesChart id="ypf-euro" title="YPF Euro CABA" data={euro} color="#94A3B8" file="ypf-euro" />
      </div>
    </div>
  );
}
