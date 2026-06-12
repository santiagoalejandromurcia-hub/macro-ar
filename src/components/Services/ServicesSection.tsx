'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// ════════════════════════════════════════════════════
// ServicesSection · 4 cards de servicios B2B
// Versión "teaser" para home. Detalle completo en /servicios.
// ════════════════════════════════════════════════════

interface ServiceItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  accent: 'celeste' | 'sol' | 'magenta' | 'verde';
  price: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'dashboard-facturacion',
    eyebrow: 'PYMES · FINANZAS',
    title: 'Dashboard de Facturación',
    description:
      'Panel mensual con ingresos, egresos y proyecciones para emprendedores y comercios en etapa de formalización. Consolidamos tus datos y los cruzamos con la macro.',
    bullets: [
      'Conciliación bancaria automática',
      'Alertas de márgenes vs inflación real',
    ],
    accent: 'celeste',
    price: 'Desde ARS 150.000 / mes',
  },
  {
    id: 'auditoria-ads',
    eyebrow: 'MARKETING · PERFORMANCE',
    title: 'Auditoría de Ads',
    description:
      'Revisión profunda de cuentas Meta, Google y TikTok Ads. Identificamos fuga de presupuesto, CAC real y oportunidades de escala.',
    bullets: [
      'Informe de 40+ páginas en 5 días hábiles',
      'ROAS real vs reportado por la plataforma',
      'Plan de optimización priorizado',
    ],
    accent: 'sol',
    price: 'ARS 550.000 · único',
  },
  {
    id: 'consultoria-macro',
    eyebrow: 'C-LEVEL · ADVISORY',
    title: 'Consultoría MacroEconomica',
    description:
      'Traduzco lo que pasa en BCRA, Tesoro e INDEC a decisiones concretas de tu negocio.',
    bullets: [
      'Escenarios de inflación, tipo de cambio y Expectativas',
      'Analisis de escenarios de tu plan financiero',
      'Informe ejecutivo mensual · 1 reunión en vivo',
    ],
    accent: 'verde',
    price: 'ARS 250.000 / sesión',
  },
];

function accentStyle(accent: ServiceItem['accent']) {
  switch (accent) {
    case 'sol':     return { color: 'var(--sol)',     bg: 'oklch(0.78 0.15 85 / 0.1)' };
    case 'magenta': return { color: 'var(--magenta)', bg: 'oklch(0.68 0.22 340 / 0.1)' };
    case 'verde':   return { color: 'var(--up)',      bg: 'oklch(0.75 0.18 145 / 0.1)' };
    default:        return { color: 'var(--celeste)', bg: 'oklch(0.78 0.14 230 / 0.1)' };
  }
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--celeste)]">
          ◆ SERVICIOS
        </span>
        <span className="h-px w-12 bg-[var(--line-1)]" />
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)]">
          #b2b
        </span>
      </div>
      <h2 className="font-display text-[32px] sm:text-[38px] leading-[1.05] tracking-tight text-[var(--fg-0)]">
        Data macro aplicada a tu negocio.
      </h2>
      <p className="text-[14px] text-[var(--fg-1)] max-w-2xl -mt-3 leading-relaxed">
        Llevamos el rigor de MacroLibre a PYMES, agencias y directorios: desde un dashboard
        de facturación con lectura macro, hasta auditorías de ads y advisory C-level.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {SERVICES.map((s, i) => {
          const { color, bg } = accentStyle(s.accent);
          return (
            <motion.article
              key={s.id}
              className="glass glass-lift p-5 md:p-6 flex flex-col gap-3 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
              <div className="flex items-start justify-between gap-3">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded"
                  style={{ color, background: bg }}
                >
                  {s.eyebrow}
                </span>
                <span className="text-[10px] font-mono text-[var(--fg-2)] uppercase tracking-wider tnum">
                  {s.price}
                </span>
              </div>
              <h3 className="font-display text-[22px] leading-tight text-[var(--fg-0)]">
                {s.title}
              </h3>
              <p className="text-[13px] text-[var(--fg-1)] leading-relaxed">
                {s.description}
              </p>
              <ul className="flex flex-col gap-1.5 text-[12px] text-[var(--fg-1)]">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span style={{ color }} className="mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/servicios#${s.id}`}
                className="mt-auto text-[12px] font-mono uppercase tracking-wider inline-flex items-center gap-1.5 pt-2"
                style={{ color }}
              >
                Ver detalle <span aria-hidden>→</span>
              </Link>
            </motion.article>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-2 pt-5 border-t border-[var(--line-1)]">
        <div className="text-[12px] text-[var(--fg-2)] font-mono">
          ¿Tenés una necesidad distinta? Armamos propuestas a medida.
        </div>
        <div className="flex gap-2">
          <Link
            href="/servicios"
            className="h-9 px-4 inline-flex items-center text-[12px] font-medium border border-[var(--line-1)] text-[var(--fg-1)] rounded-md hover:border-[var(--celeste)]/50 hover:text-[var(--fg-0)] transition"
          >
            Ver todos los servicios
          </Link>
          <Link
            href="/contacto"
            className="h-9 px-4 inline-flex items-center text-[12px] font-medium bg-[var(--celeste)] text-[var(--bg-0)] rounded-md hover:bg-[oklch(0.84_0.14_230)] transition"
          >
            Agendar llamada
          </Link>
        </div>
      </div>
    </section>
  );
}
