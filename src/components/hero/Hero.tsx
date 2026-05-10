'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// ════════════════════════════════════════════════════
// Hero MacroLibre · BG mapa antiguo + globo terráqueo 3D
// que rota, sobre el contenido habitual del hero.
// ════════════════════════════════════════════════════

// Globe es client-only (usa WebGL), evitamos SSR.
const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => null,
});

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

export default function Hero() {
  const session = useSession();

  return (
    <section className="relative overflow-hidden border-b border-[var(--line-1)] -mx-4 sm:-mx-6 lg:-mx-8 mb-12 min-h-[560px]">
      {/* ════════ BACKGROUND ════════ */}
      {/* 1. Imagen del mapa antiguo (subila como /public/img/hero-world-map.jpg) */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('/img/hero-world-map.jpg')`,
          opacity: 0.55,
          // Sin filter — dejamos los tonos originales del mapa para que se vea bien
        }}
        aria-hidden
      />

      {/* 2. Vignette + degradé suave para legibilidad del texto, pero sin matar el mapa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, oklch(0.10 0.02 250 / 0.85) 0%, oklch(0.10 0.02 250 / 0.45) 35%, transparent 60%),
            linear-gradient(to bottom, oklch(0.10 0.02 250 / 0.55) 0%, transparent 20%, transparent 80%, oklch(0.08 0.02 250 / 0.7) 100%)
          `,
        }}
        aria-hidden
      />

      {/* 3. Grid sutil de puntos */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* 4. Glow celeste arriba-derecha */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 78% 25%, oklch(0.78 0.15 230 / 0.10), transparent 65%)',
        }}
        aria-hidden
      />

      {/* ════════ GLOBO 3D ════════ */}
      {/* Posicionado a la derecha, ocupa parte del ancho del hero */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] xl:w-[50%] pointer-events-none">
        <div className="relative w-full h-full opacity-70 lg:opacity-90">
          <Globe />
        </div>
      </div>

      {/* ════════ CONTENIDO ════════ */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10 z-10">
        <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
          {/* Bloque izquierdo: eyebrow + headline + sub + CTAs */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--celeste)]">
                ◆ Estación macro
              </span>
              <span className="h-px w-12 bg-[var(--line-1)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)]">
                v2026.04
              </span>
            </div>

            <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[72px] leading-[0.95] tracking-tight text-[var(--fg-0)]">
              El pulso de la economía
              <br />
              argentina, <span className="italic text-[var(--celeste)]">en vivo</span>.
            </h1>

            <p className="mt-5 text-[14px] sm:text-[15px] text-[var(--fg-1)] max-w-xl leading-relaxed">
              Serie en tiempo real de 340+ indicadores oficiales — INDEC, BCRA, Ministerio de
              Economía — procesados, cruzados y graficados sin fricción.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#dashboard"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-[13px] font-medium bg-[var(--celeste)] text-[var(--bg-0)] hover:bg-[oklch(0.84_0.14_230)] transition"
              >
                Ver dashboard <span aria-hidden>→</span>
              </a>
              <a
                href="#simulador"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-[13px] text-[var(--fg-1)] bg-[var(--bg-1)]/80 backdrop-blur border border-[var(--line-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--fg-0)] transition"
              >
                Preguntar a MacroBot
              </a>
            </div>
          </div>

          {/* Panel sesión */}
          <div className="glass rounded-xl p-4 w-full sm:w-[280px] font-mono text-[11px] backdrop-blur-md">
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

        {/* Leyenda inferior */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-[var(--fg-2)] uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="live-dot" aria-hidden /> Actualización 60s
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-[var(--celeste)]" /> Fuente oficial
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-[var(--sol)]" /> Proyección
          </span>
        </div>
      </div>
    </section>
  );
}
