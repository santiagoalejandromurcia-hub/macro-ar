'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import ChartCard from './ChartCard';
import { useTheme } from './ThemeProvider';
import { inflacionMayoristaData } from '@/data/macroData';

export default function InflacionMayoristaChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const ax = { fontSize: 11, fill: isDark ? '#64748B' : '#94A3B8' };
  const gr = { strokeDasharray: '3 3' as const, stroke: isDark ? '#1E293B' : '#E2E8F0' };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    return (
      <div style={{ background: isDark ? '#111827' : '#FFF', border: `1px solid ${isDark ? '#1E293B' : '#E2E8F0'}` }} className="rounded-lg p-3 shadow-xl text-xs">
        <p style={{ color: isDark ? '#94A3B8' : '#64748B' }} className="mb-1.5 font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span style={{ color: isDark ? '#94A3B8' : '#64748B' }}>{p.name}:</span>
            <span style={{ color: isDark ? '#F1F5F9' : '#0F172A' }} className="font-mono font-semibold">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ChartCard title="IPIM — Inflación Mayorista" subtitle="Índice de Precios Internos al por Mayor · Barras = mensual (eje izq.) · Línea = interanual (eje der.)">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={inflacionMayoristaData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid {...gr} />
          <XAxis dataKey="date" tick={ax} />
          <YAxis yAxisId="left" tick={ax} />
          <YAxis yAxisId="right" orientation="right" tick={ax} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: isDark ? '#94A3B8' : '#64748B' }} />
          <Bar yAxisId="left" dataKey="mensual" name="IPIM Mensual %" fill="#F97316" radius={[3, 3, 0, 0]} opacity={0.7} />
          <Line yAxisId="right" type="monotone" dataKey="interanual" name="Interanual %" stroke="#D4A843" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}