import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ar: {
          celeste: '#74ACDF',
          gold: '#D4A843',
          dark: '#0A0E17',
          card: '#111827',
          border: '#1E293B',
          surface: '#0F172A',
          green: '#22C55E',
          red: '#EF4444',
        },
      },
    },
  },
  plugins: [],
};
export default config;
