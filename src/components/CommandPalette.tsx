'use client';

/**
 * CommandPalette — búsqueda global ⌘K para MacroLibre.
 * Permite navegar a secciones, indicadores, herramientas y páginas.
 *
 * Analogía: como el menú de búsqueda de Spotlight en Mac —
 * presionás ⌘K y todo el sitio es accesible en segundos.
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';

// ── Ítems del paleta ────────────────────────────────────────
const ITEMS = [
  // Secciones del home
  { group: 'Dashboard', label: 'Dashboard en vivo',       href: '/#dashboard',   icon: '📊' },
  { group: 'Dashboard', label: 'Dólar Blue y tipos de cambio', href: '/#externo', icon: '💵' },
  { group: 'Dashboard', label: 'Riesgo País (EMBI)',      href: '/#externo',     icon: '📉' },

  // Indicadores
  { group: 'Indicadores', label: 'Inflación IPC',         href: '/inflacion',    icon: '🔥' },
  { group: 'Indicadores', label: 'Actividad económica (EMAE)', href: '/#actividad', icon: '📈' },
  { group: 'Indicadores', label: 'Equilibrio fiscal',     href: '/#fiscal',      icon: '⚖️' },
  { group: 'Indicadores', label: 'Sector externo y reservas', href: '/#externo', icon: '🌍' },
  { group: 'Indicadores', label: 'Precios e inflación',   href: '/#precios',     icon: '📊' },
  { group: 'Indicadores', label: 'Salarios y deuda pública', href: '/#salarios-deuda', icon: '💼' },
  { group: 'Indicadores', label: 'Inflación histórica 1990-2026', href: '/#historico', icon: '🕰️' },
  { group: 'Indicadores', label: 'Consumo y pobreza',     href: '/#bienestar',   icon: '🏠' },

  // Mercados
  { group: 'Mercados',  label: 'Carnes y ganadería',      href: '/carnes',       icon: '🥩' },
  { group: 'Mercados',  label: 'Uva y vinos',             href: '/uva',          icon: '🍷' },

  // Herramientas
  { group: 'Herramientas', label: 'Calculadora de instrumentos', href: '/calculadora', icon: '🧮' },
  { group: 'Herramientas', label: 'Break-Even Inflacionario',    href: '/break-even',  icon: '🎯' },
  { group: 'Herramientas', label: 'MacroBot — consultas IA',     href: '/#simulador',  icon: '🤖' },
  { group: 'Herramientas', label: 'Datasets descargables',       href: '/proxys',      icon: '📦' },

  // Contenido
  { group: 'Contenido', label: 'Artículos y análisis',    href: '/articulos',    icon: '📝' },
  { group: 'Contenido', label: 'Glosario económico',      href: '/glosario',     icon: '📖' },
  { group: 'Contenido', label: 'Newsletter',              href: '/#newsletter',  icon: '✉️' },
  { group: 'Contenido', label: 'Informes mensuales',      href: '/informes',     icon: '📋' },

  // Sitio
  { group: 'Sitio',    label: 'Acerca de MacroLibre',    href: '/acerca',       icon: 'ℹ️' },
  { group: 'Sitio',    label: 'Contacto',                href: '/contacto',     icon: '📬' },
  { group: 'Sitio',    label: 'Servicios',               href: '/servicios',    icon: '💎' },
] as const;

const GROUPS = ['Dashboard', 'Indicadores', 'Mercados', 'Herramientas', 'Contenido', 'Sitio'] as const;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // Cerrar con ESC (cmdk lo maneja internamente, pero por si acaso)
  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  const navigate = useCallback((href: string) => {
    onClose();
    // Hash links (misma página) vs rutas distintas
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else router.push(href);
    } else {
      router.push(href);
    }
  }, [onClose, router]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="fixed inset-x-4 top-[12%] z-[61] max-w-[640px] mx-auto">
        <Command
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: 'var(--bg-0)',
            border: '1px solid color-mix(in oklch, var(--gold) 30%, var(--line-1))',
            boxShadow: '0 32px 80px oklch(0 0 0 / 0.6), 0 0 0 1px color-mix(in oklch, var(--gold) 15%, transparent)',
          }}
          shouldFilter={true}
        >
          {/* Input */}
          <div
            className="flex items-center gap-3 px-4 border-b"
            style={{ borderColor: 'var(--line-1)' }}
          >
            <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--fg-2)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Buscá indicadores, secciones, herramientas…"
              className="flex-1 h-12 bg-transparent text-[14px] outline-none placeholder:text-[var(--fg-3)]"
              style={{ color: 'var(--fg-0)', fontFamily: '"Geist", system-ui, sans-serif' }}
              autoFocus
            />
            <kbd
              className="shrink-0 h-6 px-1.5 rounded text-[10px] font-mono flex items-center"
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--line-1)',
                color: 'var(--fg-2)',
              }}
            >
              ESC
            </kbd>
          </div>

          {/* Lista */}
          <Command.List
            className="overflow-y-auto"
            style={{ maxHeight: '420px', padding: '8px' }}
          >
            <Command.Empty
              className="py-10 text-center text-[13px]"
              style={{ color: 'var(--fg-2)', fontFamily: '"Geist Mono", monospace' }}
            >
              Sin resultados para &ldquo;{search}&rdquo;
            </Command.Empty>

            {GROUPS.map((group) => {
              const groupItems = ITEMS.filter((i) => i.group === group);
              return (
                <Command.Group key={group}>
                  <div
                    className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em]"
                    style={{ color: 'var(--fg-3)' }}
                  >
                    {group}
                  </div>
                  {groupItems.map((item) => (
                    <Command.Item
                      key={item.href + item.label}
                      value={item.label}
                      onSelect={() => navigate(item.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] transition-colors"
                      style={{
                        color: 'var(--fg-1)',
                      }}
                      // cmdk agrega aria-selected; usamos CSS para el highlight
                    >
                      <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
                      <span className="flex-1 leading-snug">{item.label}</span>
                      <span
                        className="text-[10px] font-mono shrink-0"
                        style={{ color: 'var(--fg-3)' }}
                      >
                        {item.href.startsWith('/#') ? '↓ sección' : '→ página'}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>

          {/* Footer */}
          <div
            className="px-4 py-2 flex items-center gap-4 text-[10px] font-mono border-t"
            style={{ borderColor: 'var(--line-1)', color: 'var(--fg-3)' }}
          >
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded" style={{ background: 'var(--bg-2)', border: '1px solid var(--line-1)' }}>↑↓</kbd>
              navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded" style={{ background: 'var(--bg-2)', border: '1px solid var(--line-1)' }}>↵</kbd>
              abrir
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded" style={{ background: 'var(--bg-2)', border: '1px solid var(--line-1)' }}>ESC</kbd>
              cerrar
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="live-dot teal" aria-hidden />
              MacroLibre
            </span>
          </div>
        </Command>
      </div>

      {/* Estilos para el highlight del item seleccionado */}
      <style>{`
        [cmdk-item][aria-selected="true"] {
          background: color-mix(in oklch, var(--gold) 10%, var(--bg-1));
          color: var(--fg-0) !important;
        }
        [cmdk-item]:hover {
          background: var(--bg-1);
        }
      `}</style>
    </>
  );
}
