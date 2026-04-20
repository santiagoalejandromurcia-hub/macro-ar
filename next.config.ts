import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // Fija el workspace root al proyecto — evita que Next.js
  // infiera /Users/santiagomurcia/ como root por un lockfile
  // suelto en el home.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
