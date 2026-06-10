'use client';

import Image from 'next/image';

export default function MigracionSection() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[var(--fg-0)]">Migración Interna</h1>
        <p className="text-xl text-[var(--fg-2)]">Modelo VAR + Gravity: desplazamiento AMBA→Interior 2024-2029</p>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="bg-[var(--bg-1)] border border-[var(--line-1)] rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-[var(--fg-0)]">Resumen Ejecutivo</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-[var(--fg-3)] mb-1">Período de datos</p>
            <p className="text-[var(--fg-0)] font-semibold">2010 Q1 — 2026 Q1</p>
            <p className="text-[var(--fg-2)] text-xs mt-1">65 trimestres</p>
          </div>
          <div>
            <p className="text-[var(--fg-3)] mb-1">Metodología</p>
            <p className="text-[var(--fg-0)] font-semibold">VAR(2) + Gravity</p>
            <p className="text-[var(--fg-2)] text-xs mt-1">Poisson GLM</p>
          </div>
          <div>
            <p className="text-[var(--fg-3)] mb-1">Destinos clave</p>
            <p className="text-[var(--fg-0)] font-semibold">Neuquén, SJ, Mendoza</p>
            <p className="text-[var(--fg-2)] text-xs mt-1">Proyección 2024-2029</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="space-y-8">
        {/* EDA */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--fg-0)]">Análisis Exploratorio (EDA)</h3>
          <div className="relative w-full h-auto border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-4">
            <Image
              src="/images/migracion/eda.png"
              alt="EDA - Series históricas"
              width={1400}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Correlaciones */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--fg-0)]">Matriz de Correlaciones</h3>
          <div className="relative w-full h-auto border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-4">
            <Image
              src="/images/migracion/correlacion.png"
              alt="Matriz de correlaciones"
              width={1000}
              height={900}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* IRF */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--fg-0)]">Impulse Response Functions (IRF)</h3>
          <div className="relative w-full h-auto border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-4">
            <Image
              src="/images/migracion/irf.png"
              alt="Impulse Response Functions"
              width={1400}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* FEVD */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--fg-0)]">Descomposición de Varianza (FEVD)</h3>
          <div className="relative w-full h-auto border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-4">
            <Image
              src="/images/migracion/fevd.png"
              alt="FEVD - Descomposición de varianza"
              width={1400}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
