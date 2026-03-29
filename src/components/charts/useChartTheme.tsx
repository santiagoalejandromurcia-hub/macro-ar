'use client';

import { useTheme } from '@/components/ThemeProvider';

/** Hook centralizado con colores adaptativos para todos los gráficos */
export function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return {
    isDark,
    axis: { fontSize: 11, fill: isDark ? '#64748B' : '#94A3B8' },
    grid: { strokeDasharray: '3 3' as const, stroke: isDark ? '#1E293B' : '#E2E8F0' },
    tooltipBg: isDark ? '#111827' : '#FFFFFF',
    tooltipBorder: isDark ? '#1E293B' : '#E2E8F0',
    tooltipLabel: isDark ? '#94A3B8' : '#64748B',
    tooltipValue: isDark ? '#F1F5F9' : '#0F172A',
    refLine: isDark ? '#475569' : '#CBD5E1',
    textPrimary: isDark ? '#F1F5F9' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    tableBg: isDark ? 'rgba(116,172,223,0.05)' : 'rgba(116,172,223,0.08)',
    tableHover: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    tableText: isDark ? '#CBD5E1' : '#334155',
  };
}

/** Tooltip temático reutilizable en todos los gráficos */
export function ThemedTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number | string }>;
  label?: string;
}) {
  const t = useChartTheme();
  if (!active || !payload) return null;
  return (
    <div
      style={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}` }}
      className="rounded-lg p-3 shadow-xl text-xs"
    >
      <p style={{ color: t.tooltipLabel }} className="mb-1.5 font-medium">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: t.tooltipLabel }}>{p.name}:</span>
          <span style={{ color: t.tooltipValue }} className="font-mono font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
