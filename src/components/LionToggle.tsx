'use client';

import { useTheme } from './ThemeProvider';

export default function LionToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-1 rounded-lg border border-theme transition-all duration-300 hover:scale-110"
      style={{ backgroundColor: 'var(--bg-hover)' }}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lion.png"
        alt="Cambiar tema"
        width={28}
        height={28}
        style={{
          transition: 'filter 0.5s ease',
          filter: isDark
            ? 'drop-shadow(0 0 4px rgba(212,168,67,0.3))'
            : 'hue-rotate(180deg) saturate(2) brightness(0.7) drop-shadow(0 0 4px rgba(116,172,223,0.3))',
        }}
      />
    </button>
  );
}
