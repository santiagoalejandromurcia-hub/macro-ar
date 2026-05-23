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

// ─── Helpers ────────────────────────────────────────────────
function resolveCssVar(val: string): string {
  if (!val.includes('var(')) return val;
  return val.replace(/var\(([^)]+)\)/g, (_, name) => {
    const r = getComputedStyle(document.documentElement).getPropertyValue(name.trim()).trim();
    return r || '#888';
  });
}

function inlineStyles(clone: SVGElement, original: SVGElement) {
  const cEls = clone.querySelectorAll('*');
  const oEls = original.querySelectorAll('*');
  const ATTRS = ['fill', 'stroke', 'color', 'font-size', 'font-family', 'opacity'];
  oEls.forEach((o, i) => {
    const c = cEls[i] as SVGElement;
    if (!c) return;
    const cs = getComputedStyle(o);
    ATTRS.forEach((a) => {
      const v = cs.getPropertyValue(a);
      if (v && v !== 'none' && v !== '') c.style.setProperty(a, resolveCssVar(v));
    });
    ['fill', 'stroke'].forEach((a) => {
      const raw = (o as SVGElement).getAttribute(a);
      if (raw?.startsWith('var(')) c.setAttribute(a, resolveCssVar(raw));
    });
  });
}

async function captureAndDownload(
  wrapperEl: HTMLDivElement,
  title: string,
  format: 'png' | 'jpg',
  fileName: string,
) {
  const svg = wrapperEl.querySelector('svg');
  if (!svg) { alert('No se encontró el gráfico para exportar.'); return; }

  const { width: W, height: H } = svg.getBoundingClientRect();
  const PAD = 24; const HDR = 52; const FTR = 28;
  const CW = Math.round(W) + PAD * 2;
  const CH = Math.round(H) + HDR + FTR + PAD;

  const BG  = resolveCssVar('var(--bg-1)')     || '#1a2035';
  const BG2 = resolveCssVar('var(--bg-2)')     || '#1e2640';
  const FG0 = resolveCssVar('var(--fg-0)')     || '#f8f9fb';
  const FG2 = resolveCssVar('var(--fg-2)')     || '#8b9ab0';
  const CEL = resolveCssVar('var(--celeste)')  || '#5DC1E0';

  // Clonar SVG e inlinear estilos computados
  const clone = svg.cloneNode(true) as SVGElement;
  inlineStyles(clone, svg);
  clone.setAttribute('width',  String(Math.round(W)));
  clone.setAttribute('height', String(Math.round(H)));

  const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' });
  const url  = URL.createObjectURL(blob);

  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });

  // Canvas con branding MacroLibre
  const canvas    = document.createElement('canvas');
  canvas.width    = CW * 2;  // retina
  canvas.height   = CH * 2;
  const ctx       = canvas.getContext('2d')!;
  ctx.scale(2, 2);

  // Fondo
  ctx.fillStyle = BG; ctx.fillRect(0, 0, CW, CH);
  // Borde top color
  ctx.fillStyle = CEL; ctx.fillRect(0, 0, CW, 3);
  // Header
  ctx.fillStyle = BG2; ctx.fillRect(0, 3, CW, HDR);
  // Título
  ctx.fillStyle    = FG0;
  ctx.font         = '600 13px -apple-system,"Geist","Helvetica Neue",sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, PAD, 3 + HDR / 2 - 5);
  // Subtítulo con URL
  ctx.fillStyle = CEL;
  ctx.font      = '400 10px -apple-system,"Geist Mono",monospace';
  ctx.fillText('macrolibre.com', PAD, 3 + HDR / 2 + 10);
  // Gráfico
  ctx.drawImage(img, PAD, 3 + HDR, Math.round(W), Math.round(H));
  // Footer
  const fy = 3 + HDR + Math.round(H) + 6;
  ctx.fillStyle    = FG2;
  ctx.font         = '400 9px -apple-system,"Geist Mono",monospace';
  ctx.textBaseline = 'top';
  ctx.fillText('MacroLibre · macrolibre.com · datos: INDEC / BCRA', PAD, fy);
  const fecha = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.fillText(fecha, CW - PAD - ctx.measureText(fecha).width, fy);

  URL.revokeObjectURL(url);

  // Descargar
  const a    = document.createElement('a');
  a.href     = canvas.toDataURL(format === 'jpg' ? 'image/jpeg' : 'image/png', format === 'jpg' ? 0.92 : undefined);
  a.download = `${fileName}.${format}`;
  a.click();
}

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
      await captureAndDownload(wrapperRef.current, title, fmt, `macrolibre-${fileName}`);
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
