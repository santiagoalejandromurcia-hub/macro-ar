'use client';

import { downloadCSV } from '@/lib/csvUtils';

interface Period {
  label: string;
  months: number;
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  /** Muestra badge EN VIVO cuando los datos son en tiempo real */
  isLive?: boolean;
  /** Opciones de período para filtrar (ej: [{label:'12m', months:12}]) */
  periods?: Period[];
  selectedPeriod?: number;
  onPeriodChange?: (months: number) => void;
  /** Datos para exportar como CSV */
  csvData?: Record<string, unknown>[];
  csvFileName?: string;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  className = '',
  isLive = false,
  periods,
  selectedPeriod,
  onPeriodChange,
  csvData,
  csvFileName,
}: ChartCardProps) {
  const hasPeriods = periods && periods.length > 0 && onPeriodChange;
  const hasCsv = csvData && csvData.length > 0 && csvFileName;

  return (
    <div className={`bg-theme-card border border-theme rounded-xl p-4 sm:p-6 ${className}`}>
      {/* ── Header ── */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-start gap-2">
        {/* Título + subtítulo */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-theme-primary">{title}</h3>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Controles: badge, períodos, CSV */}
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
          {/* Badge EN VIVO */}
          {isLive && (
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-ar-green/10 text-ar-green border border-ar-green/20 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-ar-green animate-pulse" />
              EN VIVO
            </span>
          )}

          {/* Selector de período */}
          {hasPeriods && (
            <div className="flex items-center gap-1 p-0.5 bg-theme-surface border border-theme rounded-lg">
              {periods!.map((p) => (
                <button
                  key={p.months}
                  onClick={() => onPeriodChange!(p.months)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-all ${
                    selectedPeriod === p.months
                      ? 'bg-ar-celeste/20 text-ar-celeste border border-ar-celeste/30'
                      : 'text-theme-muted hover:text-theme-primary hover:bg-theme-hover'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {/* Botón descargar CSV */}
          {hasCsv && (
            <button
              onClick={() => downloadCSV(csvData!, csvFileName!)}
              title="Descargar datos como CSV"
              className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-theme-muted hover:text-ar-celeste hover:bg-ar-celeste/10 border border-theme hover:border-ar-celeste/30 rounded-lg transition-all"
            >
              ↓ CSV
            </button>
          )}
        </div>
      </div>

      {/* ── Contenido (gráfico) ── */}
      <div className="w-full">{children}</div>
    </div>
  );
}
