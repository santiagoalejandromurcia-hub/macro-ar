import Link from 'next/link';
import M2ProxySection from '@/components/M2ProxySection';
import SectionHeader from '@/components/SectionHeader';
import BreakEvenContent from '@/app/break-even/BreakEvenContent';
import GranosContent from '@/app/granos/GranosContent';

export const metadata = {
  title: 'Proxys Macroeconómicos — MacroLibre',
  description: 'Variables de aproximación construidas con metodología abierta. Serie histórica, modelo de proyección y Excel descargable.',
};

export default function ProxysPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ─── Header ─── */}
      <div className="mb-10">
        <Link href="/" className="text-sm text-[var(--fg-3)] hover:text-[var(--teal)] transition-colors mb-4 inline-block">
          ← Volver al Dashboard
        </Link>
        <p className="text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-widest mb-2">
          MacroLibre · Argentina
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)] mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Proxys macroeconómicos
        </h1>
        <p className="text-sm sm:text-base text-[var(--fg-1)] leading-relaxed max-w-3xl">
          Variables de aproximación construidas con metodología abierta. Cada proxy incluye serie
          histórica, modelo de proyección y el Excel descargable para que puedas mejorarlo.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-[var(--teal)]/30 via-[var(--gold)]/20 to-transparent" />
      </div>

      {/* ─── Índice rápido ─── */}
      <div className="mb-10 flex flex-wrap gap-2">
        {[
          { href: '#m2',         label: 'M2 / Peso'                },
          { href: '#break-even', label: 'Break-Even inflacionario' },
          { href: '#granos',     label: 'Granos & agro'            },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-full border border-[var(--line-1)] text-[var(--fg-2)] hover:border-[var(--teal)]/50 hover:text-[var(--teal)] transition"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="space-y-20">

        {/* ════════ M2 / PESO ════════ */}
        <section id="m2">
          <SectionHeader
            id="m2"
            title="M2 / Peso"
            subtitle="Proxy de liquidez en pesos y su relación con la actividad económica"
            accent="celeste"
          />
          <M2ProxySection />
        </section>

        {/* ════════ BREAK-EVEN INFLACIONARIO ════════ */}
        <section id="break-even">
          <SectionHeader
            id="break-even"
            title="Break-Even Inflacionario"
            subtitle="¿Te conviene CER o tasa fija? La inflación implícita en cada plazo vs el REM del BCRA"
            accent="celeste"
          />

          {/* Banner descarga Excel */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-[var(--bg-1)] border border-[var(--teal)]/30 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="text-[14px] font-semibold text-[var(--fg-0)]">Descargá el Excel con las fórmulas</div>
                <div className="text-[12px] text-[var(--fg-2)]">4 hojas: bonos nominales, bonos CER, REM esperado y resumen BEI con fórmulas editables.</div>
              </div>
            </div>
            <a
              href="/api/download/break-even"
              className="inline-flex items-center gap-2 h-10 px-4 bg-[var(--teal)] text-[var(--bg-0)] rounded-md text-[13px] font-semibold hover:opacity-90 transition shrink-0"
            >
              ⬇ Descargar .xlsx
            </a>
          </div>

          <BreakEvenContent />

          <div className="mt-4 text-right">
            <Link href="/break-even" className="text-[12px] font-mono text-[var(--fg-3)] hover:text-[var(--teal)] transition">
              Ver página completa con FAQ →
            </Link>
          </div>
        </section>

        {/* ════════ GRANOS ════════ */}
        <section id="granos">
          <SectionHeader
            id="granos"
            title="Granos & Agro"
            subtitle="Precios FOB, DJVE, exportaciones y cosecha — Fuente: CIARA, Min. Agricultura"
            accent="sol"
          />
          <GranosContent />
          <div className="mt-4 text-right">
            <Link href="/granos" className="text-[12px] font-mono text-[var(--fg-3)] hover:text-[var(--gold)] transition">
              Ver página completa →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
