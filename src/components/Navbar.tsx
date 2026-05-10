'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LionToggle from './LionToggle';

// ════════════════════════════════════════════════════
// Navbar MacroLibre · compacto, h-14, glassy + wordmark
// con checkmark, search pill con ⌘K, reloj live y CTA.
// ════════════════════════════════════════════════════

const navLinks = [
  { href: '#dashboard',   label: 'Indicadores' },
  { href: '/calculadora', label: 'Calculadora' },
  { href: '/break-even',  label: 'Break-Even' },
  { href: '/inflacion',   label: 'Inflación' },
  { href: '/glosario',    label: 'Glosario' },
  { href: '/articulos',   label: 'Informes' },
  { href: '/servicios',   label: 'Servicios' },
  { href: '/acerca',      label: 'Acerca' },
];

function useClock() {
  const [time, setTime] = useState<string>('—');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Argentina/Buenos_Aires',
        })
      );
    };
    update();
    const int = setInterval(update, 1000);
    return () => clearInterval(int);
  }, []);
  return time;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const clock = useClock();

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--line-1)] bg-[oklch(0.12_0.018_250_/_0.85)] backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-4 lg:gap-8">
        {/* ── Wordmark ─────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/MACRO.png"
            alt="MacroLibre"
            className="w-8 h-8 rounded-lg object-cover ring-1 ring-[var(--line-1)] group-hover:ring-[var(--celeste)]/50 transition"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[14px] font-semibold tracking-tight text-[var(--fg-0)]">MacroLibre</span>
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--fg-2)]">AR · Macro · Real-time</span>
          </div>
        </Link>

        {/* ── Primary nav ──────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-1 text-[13px] text-[var(--fg-1)]">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-md hover:bg-[var(--bg-1)] hover:text-[var(--fg-0)] transition"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ── Right cluster ────────────────────────────── */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <button
            type="button"
            className="hidden md:flex items-center gap-2.5 h-8 px-2.5 text-[12px] text-[var(--fg-2)] bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md hover:border-[var(--celeste)]/40 transition"
            aria-label="Buscar"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="font-mono">Buscar IPC, dólar, reservas…</span>
            <span className="ml-4 font-mono text-[10px] px-1.5 py-0.5 bg-[var(--bg-2)] border border-[var(--line-1)] rounded">⌘K</span>
          </button>

          {/* Status */}
          <div className="hidden md:flex items-center gap-2 h-8 px-3 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md">
            <span className="live-dot" aria-hidden />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-1)]">En vivo</span>
            <span className="text-[11px] font-mono text-[var(--fg-2)] tnum">{clock}</span>
          </div>

          {/* CTA */}
          <Link
            href="/contacto"
            className="hidden sm:inline-flex items-center h-8 px-3.5 text-[12px] font-medium bg-[var(--celeste)] text-[var(--bg-0)] rounded-md hover:bg-[oklch(0.84_0.14_230)] transition"
          >
            Ingresar
          </Link>

          {/* LionToggle (tema claro/oscuro) */}
          <LionToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-1.5 text-[var(--fg-1)] hover:text-[var(--fg-0)] rounded-md hover:bg-[var(--bg-1)]"
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[var(--line-1)] bg-[var(--bg-0)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-[var(--fg-1)] hover:text-[var(--fg-0)] hover:bg-[var(--bg-1)] rounded-md"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center h-9 px-3.5 text-[13px] font-medium bg-[var(--celeste)] text-[var(--bg-0)] rounded-md"
            >
              Ingresar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
