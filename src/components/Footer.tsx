import Link from 'next/link';

// ════════════════════════════════════════════════════
// Footer MacroLibre · grilla compacta, mono micro-text,
// status row con live dot + latency + versión.
// ════════════════════════════════════════════════════

const sources = [
  { name: 'INDEC',          url: 'https://www.indec.gob.ar' },
  { name: 'BCRA',           url: 'https://www.bcra.gob.ar' },
  { name: 'Min. Economía',  url: 'https://www.argentina.gob.ar/economia' },
  { name: 'datos.gob.ar',   url: 'https://datos.gob.ar' },
  { name: 'Bluelytics',     url: 'https://bluelytics.com.ar' },
  { name: 'ArgentinaDatos', url: 'https://argentinadatos.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line-1)] mt-24 bg-[var(--bg-0)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-14">

        {/* Grid principal · 5 columnas en desktop */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">

          {/* ── Brand (col-span-2) ───────────────────────── */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-7 h-7 rounded-[7px] bg-gradient-to-br from-[var(--celeste)] to-[var(--celeste-dim)] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="relative w-4 h-4 text-[var(--bg-0)]" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M3 20L8 10L13 16L21 4" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight text-[var(--fg-0)]">MacroLibre</span>
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--fg-2)]">AR · Macro · Real-time</span>
              </div>
            </Link>

            <p className="mt-4 text-[13px] text-[var(--fg-1)] max-w-sm leading-relaxed">
              340+ indicadores oficiales de la macro argentina — procesados, cruzados y graficados sin fricción.
              Fuentes públicas, código abierto, cero ruido.
            </p>

            {/* Social */}
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://www.instagram.com/macrolibre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-[var(--bg-1)] border border-[var(--line-1)] flex items-center justify-center text-[var(--fg-2)] hover:text-[var(--celeste)] hover:border-[var(--celeste)]/40 transition"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/macrolibre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-[var(--bg-1)] border border-[var(--line-1)] flex items-center justify-center text-[var(--fg-2)] hover:text-[var(--celeste)] hover:border-[var(--celeste)]/40 transition"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Indicadores ──────────────────────────────── */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)] mb-4">Indicadores</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="#dashboard"  className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Dashboard</a></li>
              <li><a href="#actividad"  className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Actividad</a></li>
              <li><a href="#fiscal"     className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Fiscal</a></li>
              <li><a href="#externo"    className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Sector externo</a></li>
              <li><a href="#precios"    className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Precios</a></li>
            </ul>
          </div>

          {/* ── Plataforma ───────────────────────────────── */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)] mb-4">Plataforma</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><Link href="/inflacion"  className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Inflación</Link></li>
              <li><Link href="/break-even" className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Break-Even</Link></li>
              <li><Link href="/proxys"     className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Datasets</Link></li>
              <li><Link href="/articulos"  className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Informes</Link></li>
              <li><Link href="/glosario"   className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Glosario</Link></li>
              <li><a href="#simulador"    className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">MacroBot</a></li>
              <li><a href="#newsletter"   className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Newsletter</a></li>
            </ul>
          </div>

          {/* ── Equipo ───────────────────────────────────── */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)] mb-4">Equipo</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><Link href="/acerca"   className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Acerca de</Link></li>
              <li><Link href="/contacto" className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition">Contacto</Link></li>
              <li>
                <a
                  href="https://www.instagram.com/macrolibre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition"
                >
                  Instagram <span aria-hidden>↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/macrolibre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--fg-1)] hover:text-[var(--celeste)] transition"
                >
                  LinkedIn <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Fuentes oficiales row ────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-[var(--line-1)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)]">Fuentes oficiales</span>
            <span className="h-px flex-1 bg-[var(--line-1)]" />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {sources.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-mono text-[var(--fg-2)] hover:text-[var(--celeste)] transition"
              >
                {s.name} <span aria-hidden className="text-[var(--fg-3)]">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Status + copyright ───────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-[var(--line-1)] flex flex-col lg:flex-row justify-between gap-4 text-[11px] font-mono text-[var(--fg-2)] uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-2"><span className="live-dot" aria-hidden /> Sistema operativo</span>
            <span className="text-[var(--fg-3)]">·</span>
            <span>Latencia <span className="text-[var(--up)] tnum">42ms</span></span>
            <span className="text-[var(--fg-3)]">·</span>
            <span>Build v2026.04</span>
          </div>
          <p className="normal-case tracking-normal text-[var(--fg-3)]">
            © {year} MacroLibre — Fuentes oficiales. No constituye asesoramiento financiero.
          </p>
        </div>
      </div>
    </footer>
  );
}
