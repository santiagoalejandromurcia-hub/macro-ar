'use client';

import { useEffect, useState } from 'react';

// ════════════════════════════════════════════════════
// Hero MacroLibre · Pulso en vivo + mapa SVG Argentina
// con data-flow sweeps, ciudades animadas y session panel.
// ════════════════════════════════════════════════════

function useSession() {
  const [state, setState] = useState(() => ({
    date: '—',
    time: '—',
    tickSecs: 0,
  }));

  useEffect(() => {
    const startedAt = Date.now();
    const update = () => {
      const d = new Date();
      setState({
        date: d.toLocaleDateString('es-AR', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'America/Argentina/Buenos_Aires',
        }),
        time: d.toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Argentina/Buenos_Aires',
        }),
        tickSecs: Math.floor((Date.now() - startedAt) / 1000),
      });
    };
    update();
    const int = setInterval(update, 1000);
    return () => clearInterval(int);
  }, []);

  return state;
}

// ════════════════════════════════════════════════════
// HeroMap — SVG estilizado de Argentina con sweeps + ciudades.
// Extraído directo del template (viewBox 400x620).
// ════════════════════════════════════════════════════
function HeroMap() {
  // Ciudades reposicionadas sobre la silueta real de Argentina.
  const cities = [
    { id: 'ba',    cx: 258, cy: 290, r: 3,   label: 'BUENOS AIRES',  coords: '−34.61°S 58.38°W', color: 'oklch(0.78 0.15 230)', delay: '0s',   big: true },
    { id: 'cba',   cx: 215, cy: 220, r: 2.5, label: 'CÓRDOBA',       color: 'oklch(0.82 0.14 85)',  delay: '0.6s', leftLabel: true },
    { id: 'ros',   cx: 235, cy: 245, r: 2.2, label: 'ROSARIO',       color: 'oklch(0.78 0.15 230)', delay: '1.2s' },
    { id: 'mdz',   cx: 168, cy: 245, r: 2.2, label: 'MENDOZA',       color: 'oklch(0.68 0.22 350)', delay: '1.8s', leftLabel: true },
    { id: 'sal',   cx: 195, cy: 95,  r: 2,   label: 'SALTA',         color: 'oklch(0.78 0.15 230)', delay: '2.4s', leftLabel: true },
    { id: 'tuc',   cx: 200, cy: 130, r: 1.8, label: 'TUCUMÁN',       color: 'oklch(0.76 0.16 155)', delay: '0.9s' },
    { id: 'mis',   cx: 285, cy: 130, r: 1.8, label: 'POSADAS',       color: 'oklch(0.82 0.14 85)',  delay: '2.7s' },
    { id: 'neu',   cx: 175, cy: 340, r: 2,   label: 'NEUQUÉN',       color: 'oklch(0.82 0.14 85)',  delay: '0.3s', leftLabel: true },
    { id: 'bar',   cx: 162, cy: 395, r: 1.8, label: 'BARILOCHE',     color: 'oklch(0.78 0.15 230)', delay: '1.5s', leftLabel: true },
    { id: 'cdr',   cx: 215, cy: 470, r: 1.6, label: 'COMODORO',      color: 'oklch(0.76 0.16 155)', delay: '1.0s' },
    { id: 'ush',   cx: 162, cy: 612, r: 1.8, label: 'USHUAIA',       color: 'oklch(0.68 0.22 350)', delay: '2.1s' },
  ];

  // Silueta de Argentina (continente + Tierra del Fuego como subpath).
  // Coordenadas aproximadas en el viewBox 400x620:
  // norte amplio (Jujuy → Misiones), pampa centro, Patagonia que se estrecha,
  // Cordillera al oeste. Es esquemática pero reconocible.
  const countryPath = `
    M 190 22
    L 218 30
    L 245 50
    L 268 70
    L 290 92
    L 302 115
    L 297 145
    L 282 168
    L 268 195
    L 262 225
    L 258 255
    L 262 280
    L 270 305
    L 273 332
    L 268 352
    L 248 365
    L 232 388
    L 222 420
    L 213 458
    L 205 498
    L 195 538
    L 182 565
    L 168 580
    L 152 580
    L 142 562
    L 138 532
    L 134 495
    L 130 455
    L 128 412
    L 128 370
    L 130 328
    L 134 285
    L 138 240
    L 144 195
    L 150 158
    L 158 122
    L 165 88
    L 172 58
    L 180 35
    Z
    M 152 595
    L 138 605
    L 138 622
    L 162 624
    L 182 615
    L 195 600
    L 178 593
    Z
  `;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="hero-map absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[140%] w-auto"
        viewBox="0 0 400 620"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="mapGlow" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%"   stopColor="oklch(0.78 0.15 230 / 0.22)" />
            <stop offset="60%"  stopColor="oklch(0.78 0.15 230 / 0.06)" />
            <stop offset="100%" stopColor="oklch(0.78 0.15 230 / 0)" />
          </radialGradient>
          <linearGradient id="mapStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="oklch(0.78 0.15 230 / 0.55)" />
            <stop offset="55%"  stopColor="oklch(0.82 0.14 85 / 0.35)" />
            <stop offset="100%" stopColor="oklch(0.78 0.15 230 / 0.2)" />
          </linearGradient>
          <pattern id="mapDots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="oklch(0.78 0.15 230 / 0.25)" />
          </pattern>
          <clipPath id="mapClip"><path d={countryPath} /></clipPath>
        </defs>

        <rect x="60" y="0" width="280" height="620" fill="url(#mapGlow)" />

        <g clipPath="url(#mapClip)">
          <rect x="0" y="0" width="400" height="620" fill="oklch(0.18 0.02 250 / 0.35)" />
          <rect x="0" y="0" width="400" height="620" fill="url(#mapDots)" />
          {/* Lat */}
          <g stroke="oklch(0.78 0.15 230 / 0.15)" strokeWidth="0.5">
            {[120, 220, 320, 420, 520].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} />
            ))}
          </g>
          {/* Lon */}
          <g stroke="oklch(0.78 0.15 230 / 0.12)" strokeWidth="0.5">
            {[160, 210, 260].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="620" />
            ))}
          </g>
        </g>

        <path d={countryPath} stroke="url(#mapStroke)" strokeWidth="1.2" fill="none" />

        {/* Data-flow sweeps — siguen la nueva silueta de Argentina */}
        <path
          className="map-sweep"
          d="M 195 25 C 235 80, 265 180, 263 280 C 258 380, 230 460, 195 540 C 175 575, 158 580, 148 575"
          stroke="oklch(0.78 0.15 230 / 0.9)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          style={{ animationDelay: '0s' }}
        />
        <path
          className="map-sweep"
          d="M 195 25 C 235 80, 265 180, 263 280 C 258 380, 230 460, 195 540 C 175 575, 158 580, 148 575"
          stroke="oklch(0.82 0.14 85 / 0.7)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          style={{ animationDelay: '3s' }}
        />

        {/* Ciudades */}
        <g>
          {cities.map((c) => (
            <g key={c.id}>
              {c.big && (
                <>
                  <circle cx={c.cx} cy={c.cy} r={8} fill="oklch(0.78 0.15 230 / 0.15)" />
                  <circle
                    className="map-ring"
                    cx={c.cx}
                    cy={c.cy}
                    r={4}
                    fill="none"
                    stroke="oklch(0.78 0.15 230 / 0.5)"
                    strokeWidth="1"
                    style={{ animationDelay: c.delay }}
                  />
                </>
              )}
              <circle
                className="map-pt"
                cx={c.cx}
                cy={c.cy}
                r={c.r}
                fill={c.color}
                style={{ animationDelay: c.delay }}
              />
              <text
                x={c.leftLabel ? c.cx - 46 : c.cx + 6}
                y={c.cy - 3}
                fontFamily="Geist Mono"
                fontSize="8"
                fill={c.color}
                opacity="0.75"
                letterSpacing="0.5"
              >
                {c.label}
              </text>
              {c.coords && (
                <text
                  x={c.cx + 6}
                  y={c.cy + 7}
                  fontFamily="Geist Mono"
                  fontSize="7"
                  fill="oklch(0.78 0.10 230 / 0.55)"
                  letterSpacing="0.3"
                >
                  {c.coords}
                </text>
              )}
            </g>
          ))}
        </g>

        <g transform="translate(56, 560)" fontFamily="Geist Mono" fontSize="7" fill="oklch(0.60 0.01 250)" letterSpacing="0.8">
          <text y="0">ARGENTINA · AR</text>
          <text y="10">LIVE · 11 NODOS</text>
          <text y="20">SRC: INDEC · BCRA</text>
        </g>
      </svg>

      {/* Vignette que funde el mapa hacia los bordes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 55%, transparent 0%, oklch(0.12 0.018 250 / 0.55) 55%, oklch(0.12 0.018 250 / 0.85) 100%),
            linear-gradient(to bottom, oklch(0.12 0.018 250 / 0.5), transparent 30%, transparent 70%, oklch(0.12 0.018 250 / 0.6))
          `,
        }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════
// Hero principal
// ════════════════════════════════════════════════════
export default function Hero() {
  const session = useSession();

  return (
    <section className="relative overflow-hidden border-b border-[var(--line-1)] -mx-4 sm:-mx-6 lg:-mx-8 mb-12">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.78_0.15_230_/_0.08),_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_oklch(0.82_0.14_85_/_0.05),_transparent_45%)] pointer-events-none" />

      <HeroMap />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
        {/* Eyebrow + headline + session panel */}
        <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--celeste)]">◆ Estación macro</span>
              <span className="h-px w-12 bg-[var(--line-1)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)]">v2026.04</span>
            </div>
            <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[72px] leading-[0.95] tracking-tight text-[var(--fg-0)]">
              El pulso de la economía<br />
              argentina, <span className="italic text-[var(--celeste)]">en vivo</span>.
            </h1>
            <p className="mt-5 text-[14px] sm:text-[15px] text-[var(--fg-1)] max-w-xl leading-relaxed">
              Serie en tiempo real de 340+ indicadores oficiales — INDEC, BCRA, Ministerio de Economía —
              procesados, cruzados y graficados sin fricción.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#dashboard"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-[13px] font-medium bg-[var(--celeste)] text-[var(--bg-0)] hover:bg-[oklch(0.84_0.14_230)] transition"
              >
                Ver dashboard <span aria-hidden>→</span>
              </a>
              <a
                href="#simulador"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-[13px] text-[var(--fg-1)] bg-[var(--bg-1)] border border-[var(--line-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--fg-0)] transition"
              >
                Preguntar a MacroBot
              </a>
            </div>
          </div>

          {/* Session panel */}
          <div className="glass rounded-xl p-4 w-full sm:w-[280px] font-mono text-[11px]">
            <div className="flex items-center justify-between mb-3">
              <span className="uppercase tracking-wider text-[var(--fg-2)]">Sesión local</span>
              <span className="live-dot celeste" aria-hidden />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--fg-2)]">Fecha</span>
                <span className="text-[var(--fg-0)]">{session.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--fg-2)]">Hora Bs. As.</span>
                <span className="text-[var(--fg-0)] tnum">{session.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--fg-2)]">Uptime</span>
                <span className="text-[var(--celeste)] tnum">{session.tickSecs}s</span>
              </div>
              <div className="h-px bg-[var(--line-1)] my-2" />
              <div className="flex justify-between">
                <span className="text-[var(--fg-2)]">Fuentes activas</span>
                <span className="text-[var(--fg-0)] tnum">14 / 14</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--fg-2)]">Latencia</span>
                <span className="text-[var(--up)] tnum">42ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend bajo hero */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-[var(--fg-2)] uppercase tracking-wider">
          <span className="flex items-center gap-2"><span className="live-dot" aria-hidden /> Actualización 60s</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[var(--celeste)]" /> Fuente oficial</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[var(--sol)]" /> Proyección</span>
        </div>
      </div>
    </section>
  );
}
