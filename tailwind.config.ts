import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ════════════════════════════════════════════════════
      // PALETA MACROLIBRE — sistema OKLCH (deep navy + electric blue + sol)
      // Tokens expuestos como clases para que Tailwind los tipee, pero
      // la fuente de verdad vive en globals.css :root.
      // ════════════════════════════════════════════════════
      colors: {
        bg: {
          0: 'oklch(0.12 0.018 250)',
          1: 'oklch(0.16 0.020 250)',
          2: 'oklch(0.20 0.022 248)',
          elev: 'oklch(0.24 0.024 248)',
        },
        fg: {
          0: 'oklch(0.98 0.005 250)',
          1: 'oklch(0.78 0.010 250)',
          2: 'oklch(0.58 0.014 250)',
          3: 'oklch(0.42 0.016 250)',
        },
        line: {
          1: 'oklch(0.28 0.018 250 / 0.8)',
          2: 'oklch(0.32 0.020 248 / 0.5)',
        },
        accent: {
          celeste: 'oklch(0.78 0.15 230)',
          'celeste-dim': 'oklch(0.55 0.12 230)',
          sol: 'oklch(0.82 0.14 85)',
          'sol-dim': 'oklch(0.62 0.12 85)',
          magenta: 'oklch(0.68 0.22 350)',
          'magenta-dim': 'oklch(0.50 0.18 350)',
          // MEGA redesign
          gold: 'oklch(0.76 0.18 78)',
          'gold-dim': 'oklch(0.60 0.15 78)',
          teal: 'oklch(0.74 0.14 172)',
          'teal-dim': 'oklch(0.55 0.11 172)',
          sky: 'oklch(0.76 0.12 217)',
          'sky-dim': 'oklch(0.58 0.10 217)',
        },
        signal: {
          up:   'oklch(0.74 0.14 172)', /* teal */
          down: 'oklch(0.68 0.22 25)',
          flat: 'oklch(0.62 0.014 250)',
        },
        // ── Aliases legados para que no se rompan componentes aún no migrados ──
        ar: {
          celeste: 'oklch(0.78 0.15 230)',
          gold:    'oklch(0.82 0.14 85)',
          dark:    'oklch(0.12 0.018 250)',
          card:    'oklch(0.16 0.020 250)',
          border:  'oklch(0.28 0.018 250 / 0.8)',
          surface: 'oklch(0.20 0.022 248)',
          green:   'oklch(0.76 0.16 155)',
          red:     'oklch(0.68 0.22 25)',
        },
        data: {
          positive: 'oklch(0.76 0.16 155)',
          negative: 'oklch(0.68 0.22 25)',
          neutral:  'oklch(0.62 0.014 250)',
          glow:     'oklch(0.78 0.15 230)',
        },
      },
      fontFamily: {
        // Fraunces para display editorial (Fortune / Bloomberg-like headlines)
        display:   ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        // Syne para headlines MEGA redesign — impacto visual máximo
        syne:      ['"Syne"', 'system-ui', 'sans-serif'],
        // Geist como sans del producto
        sans:      ['"Geist"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        // Inter como body alternativo — legibilidad superior en texto largo
        inter:     ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        // Geist Mono para etiquetas, timestamps, tickers
        mono:      ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        // JetBrains Mono para valores numéricos clave (KPI cards, precios)
        jetbrains: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        // Backcompat
        serif:     ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-celeste':  '0 0 24px -4px oklch(0.78 0.15 230 / 0.45), 0 0 48px -8px oklch(0.78 0.15 230 / 0.25)',
        'glow-sol':      '0 0 24px -4px oklch(0.82 0.14 85 / 0.45), 0 0 48px -8px oklch(0.82 0.14 85 / 0.25)',
        'glow-up':       '0 0 20px -4px oklch(0.76 0.16 155 / 0.45)',
        'glow-down':     '0 0 20px -4px oklch(0.68 0.22 25 / 0.45)',
        'inner-border':  'inset 0 1px 0 oklch(0.98 0.005 250 / 0.04), 0 1px 0 oklch(0 0 0 / 0.4)',
        'card-lift':     '0 12px 40px -12px oklch(0.78 0.15 230 / 0.18), 0 0 0 1px oklch(0.78 0.15 230 / 0.08)',
      },
      backgroundImage: {
        'gradient-ar':
          'linear-gradient(135deg, oklch(0.78 0.15 230 / 0.35), oklch(0.82 0.14 85 / 0.12) 60%, transparent)',
        'data-grid':
          'linear-gradient(to right, oklch(0.28 0.018 250 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.28 0.018 250 / 0.18) 1px, transparent 1px)',
        'data-grid-fine':
          'linear-gradient(to right, oklch(0.28 0.018 250 / 0.10) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.28 0.018 250 / 0.10) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm':   '24px 24px',
        'grid-md':   '48px 48px',
        'grid-lg':   '64px 64px',
      },
      animation: {
        'pulse-dot':      'pulseDot 1.8s ease-out infinite',
        'pulse-celeste':  'pulseCeleste 1.8s ease-out infinite',
        'flicker-up':     'flickerUp 900ms ease-out',
        'flicker-down':   'flickerDown 900ms ease-out',
        'marquee':        'marquee 80s linear infinite',
        'orb-breathe':    'orbBreathe 3.6s ease-in-out infinite',
        'map-pulse':      'mapPulse 2.8s ease-in-out infinite',
        'map-drift':      'mapDrift 22s ease-in-out infinite',
        'map-sweep':      'mapSweep 6s linear infinite',
        'scan-ring':      'scanRing 3s ease-out infinite',
        'fade-in-up':     'fadeInUp 700ms cubic-bezier(.2,.7,.2,1) both',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 oklch(0.76 0.16 155 / 0.7)' },
          '50%':      { boxShadow: '0 0 0 6px oklch(0.76 0.16 155 / 0)' },
        },
        pulseCeleste: {
          '0%, 100%': { boxShadow: '0 0 0 0 oklch(0.78 0.15 230 / 0.7)' },
          '50%':      { boxShadow: '0 0 0 6px oklch(0.78 0.15 230 / 0)' },
        },
        flickerUp: {
          '0%':   { color: 'oklch(0.76 0.16 155)', textShadow: '0 0 12px oklch(0.76 0.16 155 / 0.6)' },
          '100%': { color: 'oklch(0.98 0.005 250)', textShadow: 'none' },
        },
        flickerDown: {
          '0%':   { color: 'oklch(0.68 0.22 25)', textShadow: '0 0 12px oklch(0.68 0.22 25 / 0.6)' },
          '100%': { color: 'oklch(0.98 0.005 250)', textShadow: 'none' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbBreathe: {
          '0%, 100%': { boxShadow: '0 0 0 0 oklch(0.78 0.15 230 / 0.25), 0 8px 32px -4px oklch(0.78 0.15 230 / 0.35)' },
          '50%':      { boxShadow: '0 0 0 12px oklch(0.78 0.15 230 / 0), 0 8px 40px -4px oklch(0.78 0.15 230 / 0.55)' },
        },
        mapPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%':      { opacity: '1',    transform: 'scale(1.6)' },
        },
        mapDrift: {
          '0%':   { transform: 'translate(-2%, -1%) scale(1.02)' },
          '50%':  { transform: 'translate(2%, 1%) scale(1.05)' },
          '100%': { transform: 'translate(-2%, -1%) scale(1.02)' },
        },
        mapSweep: {
          '0%':   { strokeDashoffset: '400', opacity: '0' },
          '20%':  { opacity: '1' },
          '80%':  { opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '0' },
        },
        scanRing: {
          '0%':   { r: '4',  opacity: '0.8' },
          '100%': { r: '40', opacity: '0' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
