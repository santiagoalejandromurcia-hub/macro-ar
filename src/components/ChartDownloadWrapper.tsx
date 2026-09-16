'use client';

/**
 * ChartDownloadWrapper
 * ─────────────────────
 * Envuelve cualquier div que contenga un gráfico SVG de Recharts
 * y agrega botones PNG / JPG sin necesidad de librerías externas.
 *
 * Uso:
 *   <ChartDownloadWrapper title="Curvas BEI" fileName="bei-curvas">
 *     <div className="glass p-5"> ... <ResponsiveContainer> ... </div>
 *   </ChartDownloadWrapper>
 */

import { useRef, useState } from 'react';
import { downloadChartImage } from '@/lib/downloadChartImage';

// ─── Componente ─────────────────────────────────────────────
interface Props {
  /** Título que aparece en la imagen exportada */
  title: string;
  /** Nombre base del archivo (sin extensión ni "macrolibre-") */
  fileName: string;
  children: React.ReactNode;
  className?: string;
}

export default function ChartDownloadWrapper({ title, fileName, children, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dl, setDl] = useState<'png' | 'jpg' | null>(null);

  async function handleDl(fmt: 'png' | 'jpg') {
    if (!wrapperRef.current || dl) return;
    setDl(fmt);
    try {
      await downloadChartImage(wrapperRef.current, title, fmt, `macrolibre-${fileName}`);
    } catch (err) {
      console.error('[ChartDownloadWrapper] download', err);
      alert(err instanceof Error ? err.message : 'No se pudo generar la imagen.');
    } finally {
      setDl(null);
    }
  }

  return (
    <div ref={wrapperRef} className={`relative group ${className ?? ''}`}>
      {/* Botones de descarga — aparecen top-right dentro del card */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {(['png', 'jpg'] as const).map((fmt) => (
          <button
            key={fmt}
            onClick={() => handleDl(fmt)}
            disabled={!!dl}
            title={`Descargar como ${fmt.toUpperCase()}`}
            className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono border rounded-lg backdrop-blur-sm transition-all
              ${dl === fmt
                ? 'text-[var(--celeste)] border-[var(--celeste)]/40 bg-[var(--bg-0)]/80 cursor-wait'
                : 'text-[var(--fg-2)] hover:text-[var(--celeste)] bg-[var(--bg-0)]/80 border-[var(--line-1)] hover:border-[var(--celeste)]/40'
              }`}
          >
            {dl === fmt ? (
              <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>

      {children}
    </div>
  );
}
