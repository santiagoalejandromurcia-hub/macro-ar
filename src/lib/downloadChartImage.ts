/**
 * Rasteriza un gráfico SVG (Recharts) o canvas (lightweight-charts)
 * a PNG/JPG con branding MacroLibre.
 *
 * Problemas que cubre:
 *  - querySelector('svg') devolvía el ícono 12px del botón, no el chart
 *  - fill/stroke en oklch() (tokens del tema) — Safari/Chrome no rasterizan
 *    ese SVG como Image y la descarga queda en blanco o no dispara
 *  - blob SVG sin xmlns
 *  - <a download> sin estar en el DOM (Firefox)
 */

function resolveCssVar(val: string): string {
  if (!val.includes('var(')) return val;
  return val.replace(/var\(([^)]+)\)/g, (_, name) => {
    const r = getComputedStyle(document.documentElement).getPropertyValue(name.trim()).trim();
    return r || '#888888';
  });
}

/** oklch / color-mix / var() → #rrggbb o rgba() que el parser SVG de <img> entiende. */
function toRgb(val: string): string {
  const resolved = resolveCssVar(val).trim();
  if (!resolved || resolved === 'none' || resolved === 'transparent') return resolved;
  if (/^#|^rgb\(|^rgba\(|^hsl\(/i.test(resolved)) return resolved;
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return resolved;
    ctx.fillStyle = '#000000';
    ctx.fillStyle = resolved;
    return String(ctx.fillStyle);
  } catch {
    return resolved;
  }
}

const COLOR_PROPS = [
  'fill', 'stroke', 'color', 'stop-color', 'flood-color', 'lighting-color',
] as const;
const COPY_PROPS = [
  ...COLOR_PROPS,
  'font-size', 'font-family', 'font-weight', 'opacity',
  'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin',
  'text-anchor', 'dominant-baseline', 'letter-spacing',
] as const;

function inlineStyles(clone: SVGElement, original: SVGElement) {
  const cEls = [clone, ...Array.from(clone.querySelectorAll('*'))] as SVGElement[];
  const oEls = [original, ...Array.from(original.querySelectorAll('*'))] as SVGElement[];
  const n = Math.min(cEls.length, oEls.length);
  for (let i = 0; i < n; i++) {
    const orig = oEls[i];
    const copy = cEls[i];
    const cs = getComputedStyle(orig);
    for (const prop of COPY_PROPS) {
      const raw = cs.getPropertyValue(prop);
      if (!raw || raw === 'none' || raw === '') continue;
      if (raw.startsWith('url(')) {
        copy.style.setProperty(prop, raw);
        continue;
      }
      const isColor = (COLOR_PROPS as readonly string[]).includes(prop);
      copy.style.setProperty(prop, isColor ? toRgb(raw) : raw);
    }
    for (const a of ['fill', 'stroke', 'stop-color'] as const) {
      const attr = orig.getAttribute(a);
      if (attr && (attr.startsWith('var(') || attr.startsWith('oklch') || attr.startsWith('color-mix'))) {
        copy.setAttribute(a, toRgb(attr));
      }
    }
  }
}

function pickChartSvg(root: HTMLElement): SVGSVGElement | null {
  const svgs = Array.from(root.querySelectorAll('svg')) as SVGSVGElement[];
  if (!svgs.length) return null;
  return svgs.reduce((best, cur) => {
    const b = best.getBoundingClientRect();
    const c = cur.getBoundingClientRect();
    return c.width * c.height > b.width * b.height ? cur : best;
  });
}

function loadSvgAsImage(svgText: string): Promise<HTMLImageElement> {
  const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('El navegador no pudo rasterizar el SVG'));
    img.src = dataUrl;
  });
}

function triggerDownload(href: string, filename: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function paintChrome(
  ctx: CanvasRenderingContext2D,
  opts: { w: number; h: number; pad: number; hdr: number; title: string; bg: string; bg2: string; fg0: string; accent: string },
) {
  const { w, h, pad, hdr, title, bg, bg2, fg0, accent } = opts;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, w, 3);
  ctx.fillStyle = bg2;
  ctx.fillRect(0, 3, w, hdr);
  ctx.fillStyle = fg0;
  ctx.font = '600 13px -apple-system, Geist, "Helvetica Neue", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, pad, 3 + hdr / 2 - 5);
  ctx.fillStyle = accent;
  ctx.font = '400 10px ui-monospace, "Geist Mono", monospace';
  ctx.fillText('macrolibre.com', pad, 3 + hdr / 2 + 10);
}

export async function downloadChartImage(
  wrapperEl: HTMLElement,
  title: string,
  format: 'png' | 'jpg',
  fileName: string,
  footer = 'MacroLibre · macrolibre.com · datos: INDEC / BCRA / MAGyP',
): Promise<void> {
  const PAD = 24;
  const HDR = 52;
  const FTR = 28;
  const BG = toRgb('var(--bg-1)') || '#1a2035';
  const BG2 = toRgb('var(--bg-2)') || '#1e2640';
  const FG0 = toRgb('var(--fg-0)') || '#f8f9fb';
  const FG2 = toRgb('var(--fg-2)') || '#8b9ab0';
  const ACCENT = toRgb('var(--gold)') || toRgb('var(--celeste)') || '#F0A500';

  const lwCanvas = wrapperEl.querySelector('canvas');
  if (lwCanvas && lwCanvas.width > 32 && lwCanvas.height > 32) {
    const W = lwCanvas.width || lwCanvas.offsetWidth || 800;
    const H = lwCanvas.height || lwCanvas.offsetHeight || 350;
    const CW = W + PAD * 2;
    const CH = H + HDR + FTR + PAD;
    const out = document.createElement('canvas');
    out.width = CW;
    out.height = CH;
    const ctx = out.getContext('2d');
    if (!ctx) throw new Error('Canvas 2d no disponible');
    paintChrome(ctx, { w: CW, h: CH, pad: PAD, hdr: HDR, title, bg: BG, bg2: BG2, fg0: FG0, accent: ACCENT });
    ctx.drawImage(lwCanvas, PAD, 3 + HDR, W, H);
    ctx.fillStyle = FG2;
    ctx.font = '400 9px ui-monospace, "Geist Mono", monospace';
    ctx.textBaseline = 'top';
    const fy = 3 + HDR + H + 6;
    ctx.fillText(footer, PAD, fy);
    const fecha = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(fecha, CW - PAD - ctx.measureText(fecha).width, fy);
    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    triggerDownload(out.toDataURL(mime, format === 'jpg' ? 0.92 : undefined), `${fileName}.${format}`);
    return;
  }

  const svg = pickChartSvg(wrapperEl);
  if (!svg) throw new Error('No se encontró el gráfico para exportar.');

  const rect = svg.getBoundingClientRect();
  const W = Math.max(1, Math.round(rect.width) || 800);
  const H = Math.max(1, Math.round(rect.height) || 350);
  if (W < 40 || H < 40) throw new Error('El gráfico todavía no terminó de dibujarse. Probá de nuevo.');

  const clone = svg.cloneNode(true) as SVGSVGElement;
  inlineStyles(clone, svg);
  clone.querySelectorAll('.recharts-tooltip-wrapper, .recharts-default-tooltip').forEach((n) => n.remove());
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  clone.setAttribute('width', String(W));
  clone.setAttribute('height', String(H));
  if (!clone.getAttribute('viewBox')) clone.setAttribute('viewBox', `0 0 ${W} ${H}`);
  clone.setAttribute('style', `background:${BG};width:${W}px;height:${H}px`);

  const serialized = new XMLSerializer().serializeToString(clone);
  const img = await loadSvgAsImage(serialized);

  const CW = W + PAD * 2;
  const CH = H + HDR + FTR + PAD;
  const canvas = document.createElement('canvas');
  canvas.width = CW * 2;
  canvas.height = CH * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2d no disponible');
  ctx.scale(2, 2);
  paintChrome(ctx, { w: CW, h: CH, pad: PAD, hdr: HDR, title, bg: BG, bg2: BG2, fg0: FG0, accent: ACCENT });
  ctx.drawImage(img, PAD, 3 + HDR, W, H);
  const fy = 3 + HDR + H + 6;
  ctx.fillStyle = FG2;
  ctx.font = '400 9px ui-monospace, "Geist Mono", monospace';
  ctx.textBaseline = 'top';
  ctx.fillText(footer, PAD, fy);
  const fecha = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.fillText(fecha, CW - PAD - ctx.measureText(fecha).width, fy);

  const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
  triggerDownload(canvas.toDataURL(mime, format === 'jpg' ? 0.92 : undefined), `${fileName}.${format}`);
}

export function chartFileSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'grafico';
}
