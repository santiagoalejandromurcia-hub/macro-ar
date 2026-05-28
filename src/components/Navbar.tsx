'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LionToggle from './LionToggle';
import UserMenu from './UserMenu';
import CommandPalette from './CommandPalette';

// ════════════════════════════════════════════════════
// Navbar MacroLibre · estilo BCRA con dropdown "Secciones"
// ════════════════════════════════════════════════════

interface SectionLink {
  href: string;
  label: string;
  desc?: string;
}

interface SectionGroup {
  title: string;
  links: SectionLink[];
}

// Links del menú Mercados (dropdown separado)
const MERCADOS_LINKS: SectionLink[] = [
  { href: '/carnes', label: 'Carnes',      desc: 'Faena bovina, exportaciones, precios FOB · SAGyP/IPCVA' },
  { href: '/granos', label: 'Granos',      desc: 'Precios FOB soja, maíz, trigo, DJVE · MAGyP' },
  { href: '/uva',    label: 'Uva y vinos', desc: 'Producción, exportaciones, variedades · INV' },
];

// Estructura del mega-menú (4 columnas en desktop)
const SECTION_GROUPS: SectionGroup[] = [
  {
    title: 'Datos en vivo',
    links: [
      { href: '/#dashboard',  label: 'Dashboard',       desc: 'Todos los indicadores en vivo' },
      { href: '/inflacion',   label: 'Inflación',       desc: 'IPC, núcleo, mayorista, REM' },
      { href: '/#externo',    label: 'Dólar y reservas', desc: 'Blue, MEP, BCRA' },
      { href: '/#actividad',  label: 'Actividad',       desc: 'EMAE, PBI, sectorial' },
      { href: '/#fiscal',     label: 'Fiscal',          desc: 'Resultado primario y financiero' },
    ],
  },
  {
    title: 'Herramientas',
    links: [
      { href: '/calculadora',  label: 'Calculadora histórica',    desc: '¿Dólar, plazo fijo o bonos?' },
      { href: '/break-even',   label: 'Break-Even Inflacionario', desc: 'CER vs tasa fija por plazo' },
      { href: '/proxys',         label: 'Proxys macro',              desc: 'Hub de indicadores alternativos' },
      { href: '/proxys/m2',      label: '↳ M2 Privado (ML)',         desc: 'Gradient Boosting · demanda de dinero' },
      { href: '/expectativas',   label: '↳ Expectativas inflación',   desc: 'NSS + VAR(2) sobre el REM-BCRA' },
      { href: '/dolarizacion',   label: '↳ Dolarización de portafolios', desc: '% depósitos USD · confianza en el peso' },
    ],
  },
  {
    title: 'Contenido',
    links: [
      { href: '/informes',  label: 'Informes',  desc: 'Análisis mensual de coyuntura macro · Edición N°1' },
      { href: '/articulos', label: 'Artículos', desc: 'Análisis y opinión' },
      { href: '/glosario',  label: 'Glosario',  desc: 'Conceptos económicos explicados' },
    ],
  },
  {
    title: 'Sobre nosotros',
    links: [
      { href: '/acerca',    label: 'Acerca de MacroLibre', desc: 'Misión, fuentes, metodología' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/contacto',  label: 'Contacto' },
    ],
  },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [mercadosOpen, setMercadosOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const mercadosRef = useRef<HTMLDivElement>(null);
  const clock = useClock();
  const { data: session, status } = useSession();

  // Click afuera → cerrar dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sectionsRef.current && !sectionsRef.current.contains(e.target as Node)) {
        setSectionsOpen(false);
      }
      if (mercadosRef.current && !mercadosRef.current.contains(e.target as Node)) {
        setMercadosOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ESC → cerrar dropdowns y palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSectionsOpen(false);
        setMercadosOpen(false);
        setCmdOpen(false);
      }
      // ⌘K (Mac) o Ctrl+K (Windows/Linux) → abrir command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="sticky top-0 z-40">
    {/* ⌘K Command Palette */}
    <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

    <nav className="border-b border-[var(--line-1)] bg-[oklch(0.12_0.018_250_/_0.85)] backdrop-blur-xl">
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

        {/* ── Primary nav (desktop) ─────────────────────── */}
        <div className="hidden lg:flex items-center gap-1 text-[13px] text-[var(--fg-1)]">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-md hover:bg-[var(--bg-1)] hover:text-[var(--fg-0)] transition"
          >
            Inicio
          </Link>

          {/* ── Dropdown MERCADOS ───────────────────────── */}
          <div ref={mercadosRef} className="relative">
            <button
              type="button"
              onClick={() => { setMercadosOpen((v) => !v); setSectionsOpen(false); }}
              aria-expanded={mercadosOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                mercadosOpen
                  ? 'bg-[var(--bg-1)] text-[var(--fg-0)]'
                  : 'hover:bg-[var(--bg-1)] hover:text-[var(--fg-0)]'
              }`}
            >
              Mercados
              <svg
                className={`w-3 h-3 transition-transform ${mercadosOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}
              >
                <path d="M3 4.5 L6 7.5 L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mercadosOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-72 p-4 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-xl shadow-2xl shadow-black/40"
                role="menu"
              >
                <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-2)] mb-3 pb-2 border-b border-[var(--line-1)]">
                  Mercados sectoriales
                </h3>
                <ul className="space-y-3">
                  {MERCADOS_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMercadosOpen(false)}
                        className="group block text-[13px] text-[var(--fg-1)] hover:text-[var(--sol)] transition"
                      >
                        <div className="font-medium leading-tight">
                          {link.label}
                          <span
                            aria-hidden
                            className="ml-1 text-[var(--fg-3)] group-hover:text-[var(--sol)] opacity-0 group-hover:opacity-100 transition"
                          >
                            →
                          </span>
                        </div>
                        {link.desc && (
                          <div className="text-[11px] text-[var(--fg-3)] mt-0.5 leading-tight">{link.desc}</div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-[var(--line-1)] text-[10px] font-mono text-[var(--fg-3)]">
                  Próximamente: Bonos · Energía · Petróleo
                </div>
              </div>
            )}
          </div>

          {/* ── Dropdown SECCIONES ──────────────────────── */}
          <div ref={sectionsRef} className="relative">
            <button
              type="button"
              onClick={() => { setSectionsOpen((v) => !v); setMercadosOpen(false); }}
              aria-expanded={sectionsOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                sectionsOpen
                  ? 'bg-[var(--bg-1)] text-[var(--fg-0)]'
                  : 'hover:bg-[var(--bg-1)] hover:text-[var(--fg-0)]'
              }`}
            >
              Secciones
              <svg
                className={`w-3 h-3 transition-transform ${sectionsOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M3 4.5 L6 7.5 L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Panel del mega-menú */}
            {sectionsOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-[640px] xl:w-[760px] p-6 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-xl shadow-2xl shadow-black/40"
                role="menu"
              >
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6">
                  {SECTION_GROUPS.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-2)] mb-3 pb-2 border-b border-[var(--line-1)]">
                        {group.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setSectionsOpen(false)}
                              className="group block text-[13px] text-[var(--fg-1)] hover:text-[var(--celeste)] transition"
                            >
                              <div className="font-medium leading-tight">
                                {link.label}
                                <span
                                  aria-hidden
                                  className="ml-1 text-[var(--fg-3)] group-hover:text-[var(--celeste)] opacity-0 group-hover:opacity-100 transition"
                                >
                                  →
                                </span>
                              </div>
                              {link.desc && (
                                <div className="text-[11px] text-[var(--fg-3)] mt-0.5 leading-tight">
                                  {link.desc}
                                </div>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer del mega-menú */}
                <div className="mt-6 pt-4 border-t border-[var(--line-1)] flex items-center justify-between text-[11px] font-mono text-[var(--fg-3)]">
                  <span className="uppercase tracking-wider">MacroLibre · Argentina</span>
                  <Link
                    href="/api/v1/snapshot"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSectionsOpen(false)}
                    className="text-[var(--celeste)] hover:underline"
                  >
                    API pública /api/v1/snapshot ↗
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right cluster ────────────────────────────── */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Search — abre CommandPalette */}
          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            className="hidden md:flex items-center gap-2.5 h-8 px-2.5 text-[12px] text-[var(--fg-2)] bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md hover:border-[var(--gold)]/40 hover:text-[var(--fg-1)] transition"
            aria-label="Buscar (⌘K)"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="font-mono">Buscar IPC, dólar, reservas…</span>
            <span className="ml-4 font-mono text-[10px] px-1.5 py-0.5 bg-[var(--bg-2)] border border-[var(--line-1)] rounded" style={{ color: 'var(--gold)' }}>⌘K</span>
          </button>

          {/* Status */}
          <div className="hidden md:flex items-center gap-2 h-8 px-3 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md">
            <span className="live-dot" aria-hidden />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-1)]">En vivo</span>
            <span className="text-[11px] font-mono text-[var(--fg-2)] tnum">{clock}</span>
          </div>

          {/* Auth state — UserMenu si logueado, botón Login gold outline si no */}
          {status === 'authenticated' && session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center h-8 px-3.5 text-[12px] font-semibold rounded-md transition-all duration-200"
              style={{
                color: 'var(--gold)',
                border: '1px solid color-mix(in oklch, var(--gold) 45%, transparent)',
                background: 'color-mix(in oklch, var(--gold) 8%, transparent)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'color-mix(in oklch, var(--gold) 18%, transparent)';
                (e.currentTarget as HTMLElement).style.borderColor = 'color-mix(in oklch, var(--gold) 65%, transparent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'color-mix(in oklch, var(--gold) 8%, transparent)';
                (e.currentTarget as HTMLElement).style.borderColor = 'color-mix(in oklch, var(--gold) 45%, transparent)';
              }}
            >
              Iniciar sesión
            </Link>
          )}

          {/* LionToggle */}
          <LionToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-1.5 text-[var(--fg-1)] hover:text-[var(--fg-0)] rounded-md hover:bg-[var(--bg-1)]"
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu (acordeón por sección) ────────────── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--line-1)] bg-[var(--bg-0)] max-h-[80vh] overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 mb-2 text-sm font-medium text-[var(--fg-0)] bg-[var(--bg-1)] rounded-md"
            >
              Inicio
            </Link>

            {/* Mercados mobile */}
            <div className="mb-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--sol)] mb-2 px-3">
                Mercados
              </div>
              <ul className="space-y-0.5">
                {MERCADOS_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-[13px] text-[var(--fg-1)] hover:text-[var(--fg-0)] hover:bg-[var(--bg-1)] rounded-md"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {SECTION_GROUPS.map((group) => (
              <div key={group.title} className="mb-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--fg-2)] mb-2 px-3">
                  {group.title}
                </div>
                <ul className="space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-[13px] text-[var(--fg-1)] hover:text-[var(--fg-0)] hover:bg-[var(--bg-1)] rounded-md"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center w-full h-9 px-3.5 text-[13px] font-semibold rounded-md"
              style={{
                color: 'var(--gold)',
                border: '1px solid color-mix(in oklch, var(--gold) 45%, transparent)',
                background: 'color-mix(in oklch, var(--gold) 8%, transparent)',
              }}
            >
              Ingresar
            </Link>
          </div>
        </div>
      )}
    </nav>

    </div>
  );
}
