'use client';

import { useRef, useState } from 'react';
import { chartFileSlug, downloadChartImage } from '@/lib/downloadChartImage';

function DownloadIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
    </svg>
  );
}

export default function SectorChartCard({
  title,
  subtitle,
  children,
  fuente,
  filePrefix = 'macrolibre',
  downloadable = true,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  fuente?: string;
  filePrefix?: string;
  downloadable?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dl, setDl] = useState<'png' | 'jpg' | null>(null);
  const slug = chartFileSlug(title);

  async function handleDl(fmt: 'png' | 'jpg') {
    if (!wrapperRef.current || dl) return;
    setDl(fmt);
    try {
      await downloadChartImage(
        wrapperRef.current,
        title,
        fmt,
        `${filePrefix}-${slug}`,
        fuente ? `MacroLibre · macrolibre.com · ${fuente}` : undefined,
      );
    } catch (err) {
      console.error('[SectorChartCard] download', err);
      alert(err instanceof Error ? err.message : 'No se pudo generar la imagen.');
    } finally {
      setDl(null);
    }
  }

  return (
    <div ref={wrapperRef} className="glass rounded-xl p-4 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[15px] sm:text-base font-semibold text-[var(--fg-0)]">{title}</h2>
          {subtitle && <p className="text-[12px] text-[var(--fg-2)] mt-0.5">{subtitle}</p>}
        </div>
        {downloadable && (
          <div className="flex items-center gap-1 shrink-0">
            {(['png', 'jpg'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => handleDl(fmt)}
                disabled={!!dl}
                title={`Descargar como ${fmt.toUpperCase()}`}
                className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono border rounded-lg transition-all
                  ${dl === fmt
                    ? 'text-[var(--celeste)] border-[var(--celeste)]/40 bg-[var(--celeste)]/10 cursor-wait'
                    : 'text-[var(--fg-3)] hover:text-[var(--celeste)] hover:bg-[var(--celeste)]/10 border-[var(--line-1)] hover:border-[var(--celeste)]/30'
                  }`}
              >
                {dl === fmt
                  ? <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" /></svg>
                  : <DownloadIcon />}
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
      {children}
      {fuente && (
        <p className="text-[10px] font-mono text-[var(--fg-3)] mt-3">Fuente: {fuente}</p>
      )}
    </div>
  );
}
