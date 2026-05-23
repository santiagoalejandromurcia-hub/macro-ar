'use client';

import { useRef, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  kpisGranos,
  preciosFOB,
  djveMensual,
  exportTotal,
  destinosPrincipales,
  cosecha2526,
  ACTUALIZADO_AL,
  FUENTE_FOB,
  FUENTE_DJVE,
  FUENTE_EXPORT,
} from '@/data/granos';

// ────────────────────────────────────────────────────────────
// Colores
// ────────────────────────────────────────────────────────────
const COLOR = {
  soja:    '#D4A843',   // sol / gold
  maiz:    '#5DC1E0',   // celeste
  trigo:   '#EC4899',   // magenta
  girasol: '#10B981',   // green
  up:      'var(--up)',
  down:    'var(--down)',
};

const PIE_COLORS = ['#5DC1E0','#D4A843','#EC4899','#10B981','#A78BFA','#F59E0B','#3B82F6','#9CA3AF'];

// ────────────────────────────────────────────────────────────
// Componentes reutilizables
// ────────────────────────────────────────────────────────────
function KpiCard({
  label, valor, unidad, variacion, mes, color,
}: {
  label: string; valor: string | number; unidad: string;
  variacion?: number; mes: string;
  color: 'celeste' | 'sol' | 'magenta' | 'up';
}) {
  const colorMap = {
    celeste: 'var(--celeste)',
    sol:     'var(--sol)',
    magenta: 'var(--magenta)',
    up:      'var(--up)',
  };
  const c = colorMap[color];
  const up   = variacion !== undefined && variacion > 0;
  const down = variacion !== undefined && variacion < 0;

  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-1">
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)]">{label}</div>
      <div className="text-[26px] font-bold tnum leading-none" style={{ color: c, fontFamily: "'Instrument Serif', serif" }}>
        {valor}
      </div>
      <div className="text-[11px] text-[var(--fg-3)] font-mono">{unidad}</div>
      {variacion !== undefined && (
        <div className={`text-[11px] font-mono mt-1 ${up ? 'text-[var(--up)]' : down ? 'text-[var(--down)]' : 'text-[var(--fg-2)]'}`}>
          {up ? '▲' : down ? '▼' : '–'} {Math.abs(variacion).toFixed(1)}% vs mes ant.
        </div>
      )}
      <div className="text-[10px] text-[var(--fg-3)] mt-0.5">{mes}</div>
    </div>
  );
}

// ── Helpers de descarga de imagen ──────────────────────────
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
    ATTRS.forEach((a) => { const v = cs.getPropertyValue(a); if (v && v !== 'none') c.style.setProperty(a, resolveCssVar(v)); });
    ['fill','stroke'].forEach((a) => { const r = (o as SVGElement).getAttribute(a); if (r?.startsWith('var(')) c.setAttribute(a, resolveCssVar(r)); });
  });
}
async function downloadChartImage(
  wrapperEl: HTMLDivElement, title: string, format: 'png' | 'jpg', fileName: string,
) {
  const svg = wrapperEl.querySelector('svg');
  if (!svg) { alert('No se encontró el gráfico.'); return; }
  const { width: W, height: H } = svg.getBoundingClientRect();
  const PAD = 24; const HDR = 52; const FTR = 28;
  const CW = Math.round(W) + PAD * 2; const CH = Math.round(H) + HDR + FTR + PAD;
  const BG = resolveCssVar('var(--bg-1)') || '#1a2035';
  const BG2 = resolveCssVar('var(--bg-2)') || '#1e2640';
  const FG0 = resolveCssVar('var(--fg-0)') || '#f8f9fb';
  const FG2 = resolveCssVar('var(--fg-2)') || '#8b9ab0';
  const CEL = resolveCssVar('var(--celeste)') || '#5DC1E0';
  const clone = svg.cloneNode(true) as SVGElement;
  inlineStyles(clone, svg);
  clone.setAttribute('width', String(Math.round(W)));
  clone.setAttribute('height', String(Math.round(H)));
  const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  const canvas = document.createElement('canvas');
  canvas.width = CW * 2; canvas.height = CH * 2;
  const ctx = canvas.getContext('2d')!; ctx.scale(2, 2);
  ctx.fillStyle = BG; ctx.fillRect(0, 0, CW, CH);
  ctx.fillStyle = CEL; ctx.fillRect(0, 0, CW, 3);
  ctx.fillStyle = BG2; ctx.fillRect(0, 3, CW, HDR);
  ctx.fillStyle = FG0; ctx.font = '600 13px -apple-system,Geist,sans-serif'; ctx.textBaseline = 'middle';
  ctx.fillText(title, PAD, 3 + HDR / 2 - 5);
  ctx.fillStyle = CEL; ctx.font = '400 10px -apple-system,"Geist Mono",monospace';
  ctx.fillText('macrolibre.com', PAD, 3 + HDR / 2 + 10);
  ctx.drawImage(img, PAD, 3 + HDR, Math.round(W), Math.round(H));
  const fy = 3 + HDR + Math.round(H) + 6;
  ctx.fillStyle = FG2; ctx.font = '400 9px -apple-system,"Geist Mono",monospace'; ctx.textBaseline = 'top';
  ctx.fillText('MacroLibre · macrolibre.com · datos: MAGyP / INDEC', PAD, fy);
  const fecha = new Date().toLocaleDateString('es-AR', { year:'numeric', month:'long', day:'numeric' });
  ctx.fillText(fecha, CW - PAD - ctx.measureText(fecha).width, fy);
  URL.revokeObjectURL(url);
  const a = document.createElement('a');
  a.href = canvas.toDataURL(format === 'jpg' ? 'image/jpeg' : 'image/png', format === 'jpg' ? 0.92 : undefined);
  a.download = `${fileName}.${format}`; a.click();
}

function ChartCard({
  title, subtitle, children, fuente,
}: {
  title: string; subtitle?: string; children: React.ReactNode; fuente?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dl, setDl] = useState<'png'|'jpg'|null>(null);
  const slug = title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');

  async function handleDl(fmt: 'png'|'jpg') {
    if (!wrapperRef.current || dl) return;
    setDl(fmt);
    try { await downloadChartImage(wrapperRef.current, title, fmt, `macrolibre-granos-${slug}`); }
    finally { setDl(null); }
  }

  return (
    <div ref={wrapperRef} className="glass rounded-xl p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--fg-0)]">{title}</h2>
          {subtitle && <p className="text-[12px] text-[var(--fg-2)] mt-0.5">{subtitle}</p>}
        </div>
        {/* Botones PNG / JPG */}
        <div className="flex items-center gap-1 shrink-0">
          {(['png','jpg'] as const).map((fmt) => (
            <button
              key={fmt}
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
                ? <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round"/></svg>
                : <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4"/></svg>
              }
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {children}
      {fuente && (
        <p className="text-[10px] font-mono text-[var(--fg-3)] mt-3">Fuente: {fuente}</p>
      )}
    </div>
  );
}

const tooltipStyle = {
  contentStyle: {
    background: 'var(--bg-1)',
    border: '1px solid var(--line-1)',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'var(--fg-0)',
  },
  cursor: { fill: 'var(--line-1)', opacity: 0.3 },
};

// ────────────────────────────────────────────────────────────
// Componente principal
// ────────────────────────────────────────────────────────────
export default function GranosContent() {
  return (
    <div className="space-y-10">

      {/* ─── Fecha actualización ─── */}
      <p className="text-[11px] font-mono text-[var(--fg-3)]">
        Actualizado al: {ACTUALIZADO_AL} · {FUENTE_FOB}
      </p>

      {/* ─── KPIs ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpisGranos.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* ─── Precios FOB históricos ─── */}
      <ChartCard
        title="Precios FOB históricos (USD/tn)"
        subtitle="Soja · Maíz · Trigo · Girasol — ene 2025 a may 2026"
        fuente={FUENTE_FOB}
      >
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={preciosFOB} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fill: 'var(--fg-2)' }} interval={2} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--fg-2)' }} unit="$" />
            <Tooltip {...tooltipStyle} formatter={(v: number, name: string) => [`USD ${v}`, name.charAt(0).toUpperCase() + name.slice(1)]} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="soja"    stroke={COLOR.soja}    strokeWidth={2} dot={false} name="Soja"    />
            <Line type="monotone" dataKey="maiz"    stroke={COLOR.maiz}    strokeWidth={2} dot={false} name="Maíz"    />
            <Line type="monotone" dataKey="trigo"   stroke={COLOR.trigo}   strokeWidth={2} dot={false} name="Trigo"   />
            <Line type="monotone" dataKey="girasol" stroke={COLOR.girasol} strokeWidth={2} dot={false} name="Girasol" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ─── DJVE + Exportaciones ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="DJVE mensuales por grano"
          subtitle="Declaraciones Juradas de Ventas al Exterior — mill. tn"
          fuente={FUENTE_DJVE}
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={djveMensual} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: 'var(--fg-2)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--fg-2)' }} unit="M" />
              <Tooltip {...tooltipStyle} formatter={(v: number, name: string) => [`${v} Mt`, name.charAt(0).toUpperCase() + name.slice(1)]} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="soja"  stackId="a" fill={COLOR.soja}    name="Soja"  radius={[0,0,0,0]} />
              <Bar dataKey="maiz"  stackId="a" fill={COLOR.maiz}    name="Maíz"  />
              <Bar dataKey="trigo" stackId="a" fill={COLOR.trigo}   name="Trigo" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Exportaciones totales de granos"
          subtitle="Volumen (mil tn) y valor (USD M) · 2026"
          fuente={FUENTE_EXPORT}
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={exportTotal} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-1)" />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: 'var(--fg-2)' }} />
              <YAxis yAxisId="vol" tick={{ fontSize: 10, fill: 'var(--fg-2)' }} unit="k" />
              <YAxis yAxisId="val" orientation="right" tick={{ fontSize: 10, fill: 'var(--fg-2)' }} unit="M" />
              <Tooltip {...tooltipStyle} formatter={(v: number, name: string) => [name === 'Volumen' ? `${v} mil tn` : `USD ${v}M`, name]} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="vol" dataKey="volumen" fill={COLOR.maiz}  name="Volumen" radius={[4,4,0,0]} />
              <Bar yAxisId="val" dataKey="valor"   fill={COLOR.soja}  name="USD M"   radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ─── Destinos + Cosecha ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Principales destinos de exportación"
          subtitle="Participación % acumulada ene-abr 2026"
          fuente={FUENTE_EXPORT}
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={destinosPrincipales}
                  dataKey="participacion"
                  nameKey="pais"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {destinosPrincipales.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle.contentStyle}
                  formatter={(v: number) => [`${v}%`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1.5">
              {destinosPrincipales.map((d, i) => (
                <div key={d.pais} className="flex items-center gap-2 text-[12px]">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-[var(--fg-1)] flex-1">{d.pais}</span>
                  <span className="text-[var(--fg-0)] font-mono tnum">{d.participacion}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Cosecha 2025/26 — Dato oficial"
          subtitle="Millones de toneladas · Total récord: 163,2 Mt (+21,25% i.a.) · Fuente: SAGyP"
          fuente="Secretaría de Agricultura, Ganadería y Pesca"
        >
          <div className="space-y-3 mt-2">
            {cosecha2526.map((c) => {
              const maxMt = 75; // maíz es 70 Mt, el máximo
              const barWidth = Math.min((c.estimacion / maxMt) * 100, 100);
              const up = c.variacionYoY >= 0;
              return (
                <div key={c.grano}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-[var(--fg-0)]">{c.grano}</span>
                      {c.esRecord && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[var(--up)]/15 text-[var(--up)] border border-[var(--up)]/30">
                          Récord
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-mono ${up ? 'text-[var(--up)]' : 'text-[var(--down)]'}`}>
                        {up ? '▲' : '▼'} {Math.abs(c.variacionYoY).toFixed(1)}% i.a.
                      </span>
                      <span className="text-[12px] font-mono tnum text-[var(--fg-0)]">
                        {c.estimacion} Mt
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-[var(--bg-2)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${barWidth}%`,
                        background: c.esRecord ? 'var(--up)' : up ? 'var(--celeste)' : 'var(--down)',
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-[var(--fg-3)] mt-0.5">{c.estado}</div>
                    {c.rinde && (
                      <div className="text-[10px] font-mono text-[var(--fg-3)] mt-0.5">{c.rinde}</div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[var(--line-1)] flex justify-between items-center">
              <span className="text-[11px] font-mono text-[var(--fg-2)] uppercase tracking-wider">Total campaña 25/26</span>
              <span className="text-[14px] font-bold text-[var(--up)] font-mono tnum">163,2 Mt ▲ 21,3%</span>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* ─── Tabla de precios actuales ─── */}
      <ChartCard
        title="Precios FOB por grano — snapshot"
        subtitle={`Últimos precios publicados · ${ACTUALIZADO_AL}`}
        fuente={FUENTE_FOB}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[var(--line-1)]">
                <th className="text-left py-2 font-mono text-[10px] text-[var(--fg-2)] uppercase tracking-wider">Grano</th>
                <th className="text-right py-2 font-mono text-[10px] text-[var(--fg-2)] uppercase tracking-wider">FOB (USD/tn)</th>
                <th className="text-right py-2 font-mono text-[10px] text-[var(--fg-2)] uppercase tracking-wider">Vs Ene 26</th>
                <th className="text-right py-2 font-mono text-[10px] text-[var(--fg-2)] uppercase tracking-wider">Vs Ene 25</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grano: 'Soja',     may: 305, ene26: 305, ene25: 341 },
                { grano: 'Maíz',     may: 198, ene26: 199, ene25: 217 },
                { grano: 'Trigo',    may: 238, ene26: 235, ene25: 248 },
                { grano: 'Girasol',  may: 435, ene26: 428, ene25: 454 },
              ].map((row) => {
                const vs26 = ((row.may / row.ene26 - 1) * 100).toFixed(1);
                const vs25 = ((row.may / row.ene25 - 1) * 100).toFixed(1);
                const up26 = parseFloat(vs26) >= 0;
                const up25 = parseFloat(vs25) >= 0;
                return (
                  <tr key={row.grano} className="border-b border-[var(--line-1)] hover:bg-[var(--bg-1)] transition-colors">
                    <td className="py-2.5 font-semibold text-[var(--fg-0)]">{row.grano}</td>
                    <td className="py-2.5 text-right font-mono tnum text-[var(--fg-0)]">USD {row.may}</td>
                    <td className={`py-2.5 text-right font-mono tnum ${up26 ? 'text-[var(--up)]' : 'text-[var(--down)]'}`}>
                      {up26 ? '+' : ''}{vs26}%
                    </td>
                    <td className={`py-2.5 text-right font-mono tnum ${up25 ? 'text-[var(--up)]' : 'text-[var(--down)]'}`}>
                      {up25 ? '+' : ''}{vs25}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>

    </div>
  );
}
