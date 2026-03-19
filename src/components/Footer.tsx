import Link from 'next/link';

const sources = [
  { name: 'INDEC', url: 'https://www.indec.gob.ar' },
  { name: 'BCRA', url: 'https://www.bcra.gob.ar' },
  { name: 'Min. Economía', url: 'https://www.argentina.gob.ar/economia' },
  { name: 'datos.gob.ar', url: 'https://datos.gob.ar' },
];

export default function Footer() {
  return (
    <footer className="border-t border-theme mt-24" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="MacroLibre" className="w-7 h-7 rounded-lg object-cover" />
              <span className="text-base font-bold">
                <span className="text-theme-primary">Macro</span>
                <span className="text-ar-celeste">Libre</span>
              </span>
            </Link>
            <p className="text-sm text-theme-muted leading-relaxed mb-4">
              Plataforma de estadísticas macroeconómicas de Argentina. Datos actualizados, análisis riguroso, código abierto.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/macrolibre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-theme-card border border-theme flex items-center justify-center text-theme-muted hover:text-pink-400 hover:border-pink-400/30 transition-all hover:scale-105"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/macrolibre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-theme-card border border-theme flex items-center justify-center text-theme-muted hover:text-blue-400 hover:border-blue-400/30 transition-all hover:scale-105"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Sources */}
          <div>
            <h4 className="text-sm font-semibold text-theme-secondary mb-3 uppercase tracking-wider">Fuentes Oficiales</h4>
            <div className="flex flex-col gap-2">
              {sources.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-theme-secondary mb-3 uppercase tracking-wider">Secciones</h4>
            <div className="flex flex-col gap-2">
              <a href="#dashboard" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">Dashboard</a>
              <a href="#actividad" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">Actividad Económica</a>
              <a href="#fiscal" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">Equilibrio Fiscal</a>
              <a href="#precios" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">Precios e Inflación</a>
              <Link href="/proxys" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">Proxys</Link>
              <Link href="/articulos" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">Artículos</Link>
            </div>
          </div>

          {/* Contact + Project */}
          <div>
            <h4 className="text-sm font-semibold text-theme-secondary mb-3 uppercase tracking-wider">Proyecto</h4>
            <div className="flex flex-col gap-2">
              <Link href="/contacto" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">
                Contacto / Sugerencias
              </Link>
              <a href="https://www.instagram.com/macrolibre/" target="_blank" rel="noopener noreferrer" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">
                Instagram ↗
              </a>
              <a href="https://www.linkedin.com/in/macrolibre/" target="_blank" rel="noopener noreferrer" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-theme flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-theme-faint">© {new Date().getFullYear()} MacroLibre — Datos de fuentes oficiales públicas. No constituye asesoramiento financiero.</p>
          <p className="text-xs text-theme-faint">Hecho en 🇦🇷 con Next.js + Recharts</p>
        </div>
      </div>
    </footer>
  );
}
