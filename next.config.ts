import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Visitas a la URL con el paréntesis de más (markdown sin renderizar).
        // path-to-regexp de Next acepta el ')' literal en source.
        source: '/indicadores/inflacion-argentina)',
        destination: '/indicadores/inflacion-argentina',
        permanent: true,
      },
    ];
  },
  images: { unoptimized: true },
  // Fija el workspace root al proyecto — evita que Next.js
  // infiera /Users/santiagomurcia/ como root por un lockfile
  // suelto en el home.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
