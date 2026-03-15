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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ar-celeste to-ar-gold flex items-center justify-center font-bold text-xs text-white">M</div>
              <span className="text-base font-bold">
                <span className="text-theme-primary">Macro</span>
                <span className="text-ar-celeste">AR</span>
                <span className="text-ar-gold/60 text-sm">.app</span>
              </span>
            </Link>
            <p className="text-sm text-theme-muted leading-relaxed">
              Plataforma de estadísticas macroeconómicas de Argentina. Datos actualizados, análisis riguroso, código abierto.
            </p>
          </div>
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
          <div>
            <h4 className="text-sm font-semibold text-theme-secondary mb-3 uppercase tracking-wider">Proyecto</h4>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/tu-usuario/macro-ar" target="_blank" rel="noopener noreferrer" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">
                GitHub ↗
              </a>
              <Link href="/articulos" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors">Artículos</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-theme flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-theme-faint">© {new Date().getFullYear()} MacroAR.app — Datos de fuentes oficiales públicas. No constituye asesoramiento financiero.</p>
          <p className="text-xs text-theme-faint">Hecho en 🇦🇷 con Next.js + Recharts</p>
        </div>
      </div>
    </footer>
  );
}
