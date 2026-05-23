'use client';

import { useRef, useState } from 'react';
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
  /** Nombre base del archivo al descargar imagen (sin extensión) */
  imageFileName?: string;
}

// ─────────────────────────────────────────────────────────
// Resuelve CSS custom properties (var(--x)) a sus valores
// reales usando getComputedStyle del :root
// ─────────────────────────────────────────────────────────
function resolveCssVar(val: string): string {
  if (!val.includes('var(')) return val;
  return val.replace(/var\(([^)]+)\)/g, (_, name) => {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(name.trim())
      .trim();
    return resolved || '#888';
  });
}

// ─────────────────────────────────────────────────────────
// Recorre el SVG clonado y aplica inline los estilos
// computados para que la exportación no pierda colores
// ─────────────────────────────────────────────────────────
function inlineStyles(clone: SVGElement, original: SVGElement) {
  const cloneEls  = clone.querySelectorAll('*');
  const origEls   = original.querySelectorAll('*');

  const ATTRS = ['fill', 'stroke', 'color', 'font-size', 'font-family', 'opacity'];

  origEls.forEach((origEl, i) => {
    const cloneEl = cloneEls[i] as SVGElement;
    if (!cloneEl) return;
    const computed = getComputedStyle(origEl);
    ATTRS.forEach((attr) => {
      const val = computed.getPropertyValue(attr);
      if (val && val !== 'none' && val !== '') {
        cloneEl.style.setProperty(attr, resolveCssVar(val));
      }
    });
    // Atributos SVG directos (fill, stroke en el elemento)
    ['fill', 'stroke'].forEach((a) => {
      const raw = (origEl as SVGElement).getAttribute(a);
      if (raw && raw.startsWith('var(')) {
        cloneEl.setAttribute(a, resolveCssVar(raw));
      }
    });
  });
}

// ─────────────────────────────────────────────────────────
// Captura el gráfico y lo descarga como PNG o JPG
// Agrega fondo MacroLibre + watermark en el pie
// ─────────────────────────────────────────────────────────
async function captureChart(
  wrapperEl: HTMLDivElement,
  title: string,
  format: 'png' | 'jpg',
  fileName: string,
) {
  // 1) Buscar el SVG de Recharts dentro del wrapper
  const svg = wrapperEl.querySelector('svg');
  if (!svg) {
    alert('No se encontró el gráfico para exportar.');
    return;
  }

  const svgRect = svg.getBoundingClientRect();
  const W = Math.round(svgRect.width)  || 800;
  const H = Math.round(svgRect.height) || 350;

  const PADDING    = 24;
  const HEADER_H   = 52;   // título + subtítulo arriba
  const FOOTER_H   = 28;   // watermark abajo
  const CANVAS_W   = W + PADDING * 2;
  const CANVAS_H   = H + HEADER_H + FOOTER_H + PADDING;

  // Fondo y colores del tema
  const BG    = resolveCssVar('var(--bg-1)')  || '#1a2035';
  const BG2   = resolveCssVar('var(--bg-2)')  || '#1e2640';
  const FG0   = resolveCssVar('var(--fg-0)')  || '#f8f9fb';
  const FG2   = resolveCssVar('var(--fg-2)')  || '#8b9ab0';
  const CEL   = resolveCssVar('var(--celeste)') || '#5DC1E0';

  // 2) Clonar SVG e inlinear estilos
  const clone = svg.cloneNode(true) as SVGElement;
  inlineStyles(clone, svg);
  clone.setAttribute('width',  String(W));
  clone.setAttribute('height', String(H));

  const serialized = new XMLSerializer().serializeToString(clone);
  const svgBlob    = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl     = URL.createObjectURL(svgBlob);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload  = () => resolve(i);
    i.onerror = reject;
    i.src     = svgUrl;
  });

  // 3) Dibujar en canvas
  const canvas  = document.createElement('canvas');
  canvas.width  = CANVAS_W * 2; // retina
  canvas.height = CANVAS_H * 2;
  canvas.style.width  = `${CANVAS_W}px`;
  canvas.style.height = `${CANVAS_H}px`;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(2, 2);

  // Fondo principal
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Borde superior coloreado
  ctx.fillStyle = CEL;
  ctx.fillRect(0, 0, CANVAS_W, 3);

  // Franja header
  ctx.fillStyle = BG2;
  ctx.fillRect(0, 3, CANVAS_W, HEADER_H);

  // Título
  ctx.fillStyle  = FG0;
  ctx.font       = `600 13px -apple-system, "Geist", "Helvetica Neue", sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.fillText(title, PADDING, 3 + HEADER_H / 2 - 5);

  // Subtítulo (MacroLibre.com)
  ctx.fillStyle  = CEL;
  ctx.font       = `400 10px -apple-system, "Geist Mono", monospace`;
  ctx.fillText('macrolibre.com', PADDING, 3 + HEADER_H / 2 + 10);

  // Gráfico SVG
  ctx.drawImage(img, PADDING, 3 + HEADER_H, W, H);

  // Footer watermark
  const footerY = 3 + HEADER_H + H + 6;
  ctx.fillStyle = FG2;
  ctx.font      = `400 9px -apple-system, "Geist Mono", monospace`;
  ctx.textBaseline = 'top';
  ctx.fillText(
    `MacroLibre · macrolibre.com · datos: INDEC / BCRA / MAGyP`,
    PADDING,
    footerY,
  );
  // Fecha
  const fecha = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  const dateW = ctx.measureText(fecha).width;
  ctx.fillText(fecha, CANVAS_W - PADDING - dateW, footerY);

  URL.revokeObjectURL(svgUrl);

  // 4) Descargar
  const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const quality  = format === 'jpg' ? 0.92 : undefined;
  const dataUrl  = canvas.toDataURL(mimeType, quality);
  const a        = document.createElement('a');
  a.href         = dataUrl;
  a.download     = `${fileName}.${format}`;
  a.click();
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
      await captureChart(wrapperRef.current, title, format, `macrolibre-${baseName}`);
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
