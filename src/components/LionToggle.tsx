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
        src="/marca-white.png"
        alt="Cambiar tema"
        width={28}
        height={28}
        style={{
          transition: 'filter 0.5s ease',
          filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.25))',
        }}
      />
    </button>
  );
}
