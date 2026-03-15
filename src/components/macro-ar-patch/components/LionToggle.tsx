'use client';

import { useTheme } from './ThemeProvider';

export default function LionToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-1.5 rounded-lg border border-theme hover:scale-110 transition-all duration-300"
      style={{ backgroundColor: 'var(--bg-hover)' }}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(212,168,67,0.5)]"
      >
        {/* Mane - flowing back */}
        <path
          d="M25 75 C20 70, 15 60, 16 50 C17 40, 20 32, 25 26
             C28 22, 28 18, 26 14 C30 16, 33 14, 34 10
             C36 14, 40 13, 42 9 C42 14, 46 15, 48 12
             C48 16, 52 18, 55 16 C54 20, 56 22, 58 20
             C57 24, 60 27, 63 28 C60 30, 58 33, 58 36"
          fill={isDark ? '#D4A843' : '#1a1a1a'}
          className="transition-colors duration-300"
        />
        {/* Mane - bottom flow */}
        <path
          d="M25 75 C22 72, 18 68, 16 62 C14 56, 14 50, 16 50
             C15 55, 16 62, 18 66 C20 70, 22 73, 25 75Z"
          fill={isDark ? '#D4A843' : '#1a1a1a'}
          className="transition-colors duration-300"
        />
        {/* Head shape */}
        <path
          d="M58 36 C58 30, 62 26, 68 26 C74 26, 78 30, 80 34
             C82 38, 82 42, 80 46 L78 48
             C80 50, 82 52, 84 52
             C86 52, 88 54, 88 56
             C88 58, 86 60, 84 60
             L80 60
             C82 62, 84 65, 82 68
             C80 70, 76 70, 74 68
             L70 62
             C66 66, 60 68, 54 68
             C46 68, 38 72, 30 76
             C28 77, 26 76, 25 75
             C30 72, 34 68, 40 64
             C44 62, 48 58, 50 52
             C52 46, 54 40, 58 36Z"
          fill={isDark ? '#D4A843' : '#1a1a1a'}
          className="transition-colors duration-300"
        />
        {/* Eye */}
        <path
          d="M68 36 C70 34, 73 34, 74 36 C75 38, 73 40, 71 40 C69 40, 67 38, 68 36Z"
          fill={isDark ? '#0A0E17' : '#F8FAFC'}
          className="transition-colors duration-300"
        />
        {/* Nostril */}
        <circle cx="81" cy="46" r="2"
          fill={isDark ? '#0A0E17' : '#F8FAFC'}
          className="transition-colors duration-300"
        />
        {/* Mouth open - upper jaw */}
        <path
          d="M78 48 C80 50, 84 52, 86 53 C84 54, 80 54, 78 52Z"
          fill={isDark ? '#0A0E17' : '#F8FAFC'}
          className="transition-colors duration-300"
        />
        {/* Mouth open - lower jaw */}
        <path
          d="M74 58 C76 60, 80 62, 82 64 C80 66, 76 66, 74 64
             L70 62 C72 60, 73 59, 74 58Z"
          fill={isDark ? '#0A0E17' : '#F8FAFC'}
          className="transition-colors duration-300"
        />
        {/* Teeth hints */}
        <path
          d="M80 54 L82 56 M78 54 L80 57 M83 55 L84 58"
          stroke={isDark ? '#D4A843' : '#1a1a1a'}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />

        {/* Sun/moon indicator - small, subtle */}
        {isDark ? (
          /* Small sun rays near top-right when dark = "click for light" */
          <g opacity="0.6">
            <circle cx="88" cy="12" r="3" fill="#D4A843" />
            <line x1="88" y1="5" x2="88" y2="8" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="93" y1="7" x2="91" y2="9.5" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="95" y1="12" x2="92" y2="12" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ) : (
          /* Small moon near top-right when light = "click for dark" */
          <path
            d="M90 8 C88 10, 88 14, 90 16 C86 15, 84 11, 86 8 C87 6, 89 6, 90 8Z"
            fill="#1a1a1a"
            opacity="0.5"
          />
        )}
      </svg>
    </button>
  );
}
