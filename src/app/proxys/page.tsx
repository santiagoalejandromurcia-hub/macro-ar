import Link from 'next/link';
import M2ProxySection from '@/components/M2ProxySection';

export const metadata = {
  title: 'Proxys Macroeconómicos — MacroLibre',
  description: 'Variables de aproximación construidas con metodología abierta. Serie histórica, modelo de proyección y Excel descargable.',
};

export default function ProxysPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ─── Header ─── */}
      <div className="mb-10">
        <Link href="/" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors mb-4 inline-block">
          ← Volver al Dashboard
        </Link>
        <p className="text-[11px] font-mono text-theme-faint uppercase tracking-widest mb-2">
          MacroLibre · Argentina
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-theme-primary mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Proxys macroeconómicos
        </h1>
        <p className="text-sm sm:text-base text-theme-secondary leading-relaxed max-w-3xl">
          Variables de aproximación construidas con metodología abierta. Cada proxy incluye serie histórica, modelo de proyección y el Excel descargable para que puedas mejorarlo.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-ar-celeste/30 via-ar-gold/20 to-transparent" />
      </div>

      {/* ─── M2 Proxy ─── */}
      <div className="space-y-6">
        <M2ProxySection />

        {/* ─── Próximamente ─── */}
        <div className="border-2 border-dashed border-theme rounded-xl p-8 bg-theme-surface text-center">
          <p className="text-lg font-semibold text-theme-secondary mb-2">Próximamente: más proxys</p>
          <p className="text-sm text-theme-muted mb-4">Estamos trabajando en nuevos indicadores con metodología abierta</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Tipo de cambio real de equilibrio',
              'Brecha de producto (output gap)',
              'Presión tributaria efectiva',
              'Índice de libertad económica',
              'Riesgo soberano implícito',
            ].map((item) => (
              <span key={item} className="px-3 py-1 text-xs font-mono text-theme-faint bg-theme-card border border-theme rounded-full">
                {item}
              </span>
            ))}
          </div>
          <span className="inline-block mt-4 px-3 py-1 text-[10px] font-mono font-medium text-ar-gold bg-ar-gold/10 border border-ar-gold/20 rounded-full">
            en construcción
          </span>
        </div>
      </div>
    </div>
  );
}
