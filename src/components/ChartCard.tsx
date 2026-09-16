'use client';

import { useRef, useState } from 'react';
import { downloadCSV } from '@/lib/csvUtils';
import { downloadChartImage } from '@/lib/downloadChartImage';

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
  /** Nombre base del archivo al descargar imagen (sin extensión) */
  imageFileName?: string;
}



// ─────────────────────────────────────────────────────────
// Ícono de descarga
// ─────────────────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────
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
  imageFileName,
}: ChartCardProps) {
  const hasPeriods  = periods && periods.length > 0 && onPeriodChange;
  const hasCsv      = csvData && csvData.length > 0 && csvFileName;
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<'png' | 'jpg' | null>(null);

  const baseName = imageFileName ?? title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  async function handleDownload(format: 'png' | 'jpg') {
    if (!wrapperRef.current || downloading) return;
    setDownloading(format);
    try {
      await downloadChartImage(wrapperRef.current, title, format, `macrolibre-${baseName}`);
    } catch (err) {
      console.error('[ChartCard] download', err);
      alert(err instanceof Error ? err.message : 'No se pudo generar la imagen.');
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div ref={wrapperRef} className={`bg-theme-card border border-theme rounded-xl p-4 sm:p-6 ${className}`}>
      {/* ── Header ── */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-start gap-2">
        {/* Título + subtítulo */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-theme-primary">{title}</h3>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Controles: badge, períodos, CSV, imagen */}
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

          {/* Botones de descarga de imagen: PNG / JPG */}
          <div className="flex items-center gap-1">
            {(['png', 'jpg'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleDownload(fmt)}
                disabled={!!downloading}
                title={`Descargar gráfico como ${fmt.toUpperCase()}`}
                className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono border rounded-lg transition-all
                  ${downloading === fmt
                    ? 'text-ar-celeste border-ar-celeste/40 bg-ar-celeste/10 cursor-wait'
                    : 'text-theme-muted hover:text-ar-celeste hover:bg-ar-celeste/10 border-theme hover:border-ar-celeste/30'
                  }`}
              >
                {downloading === fmt ? (
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <DownloadIcon />
                )}
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Botón descargar CSV */}
          {hasCsv && (
            <button
              onClick={() => downloadCSV(csvData!, csvFileName!)}
              title="Descargar datos como CSV"
              className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-theme-muted hover:text-ar-celeste hover:bg-ar-celeste/10 border border-theme hover:border-ar-celeste/30 rounded-lg transition-all"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6M4 20h16a1 1 0 001-1V7l-5-5H4a1 1 0 00-1 1v16a1 1 0 001 1z" />
              </svg>
              CSV
            </button>
          )}
        </div>
      </div>

      {/* ── Contenido (gráfico) ── */}
      <div className="w-full">{children}</div>
    </div>
  );
}
