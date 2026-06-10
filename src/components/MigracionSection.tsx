'use client';

import Image from 'next/image';

export default function MigracionSection() {
  return (
    <div className="space-y-12">
      {/* Intro Card - estilo Proxy */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="text-5xl">🏘️</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[var(--fg-0)]">Migración Interna</h1>
            <p className="text-sm text-[var(--fg-3)] mt-2">VAR(2) + GRAVITY MODEL · IMPULSE RESPONSES · PRONÓSTICOS REGIONALES</p>
            <p className="text-[var(--fg-1)] mt-4 leading-relaxed">
              Modelo econométrico que analiza la <strong>migración interna de Argentina</strong> desde AMBA hacia
              provincias seleccionadas (Neuquén, San Juan, Mendoza, Córdoba). Captura el desplazamiento poblacional
              generado por diferenciales salariales, desempleo regional, costos de vivienda e inversión pública
              provincial, con énfasis en el período 2024-2026 (descentralización + boom minero RIGI).
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 text-xs bg-[var(--bg-1)] text-[var(--fg-2)] rounded-full border border-[var(--line-1)]">
                2010-2026
              </span>
              <span className="px-3 py-1 text-xs bg-[var(--bg-1)] text-[var(--fg-2)] rounded-full border border-[var(--line-1)]">
                VAR(2) + Gravity
              </span>
              <span className="px-3 py-1 text-xs bg-[var(--bg-1)] text-[var(--fg-2)] rounded-full border border-[var(--line-1)]">
                Poisson GLM
              </span>
              <span className="px-3 py-1 text-xs bg-[var(--bg-1)] text-[var(--fg-2)] rounded-full border border-[var(--line-1)]">
                Elasticidades
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="bg-gradient-to-r from-[var(--bg-1)] to-transparent border border-[var(--line-1)] rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-bold text-[var(--fg-3)] uppercase tracking-wide">📊 Hallazgos Clave (2010-2026)</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[var(--fg-3)] mb-1">Elasticidad Salarial</p>
            <p className="text-2xl font-bold text-[var(--up)]">+0.58</p>
            <p className="text-xs text-[var(--fg-2)] mt-1">+10% salarios regionales → +5.8% migración (lag 4-6 trim)</p>
          </div>
          <div>
            <p className="text-[var(--fg-3)] mb-1">Impacto Desempleo</p>
            <p className="text-2xl font-bold text-[var(--down)]">+0.21</p>
            <p className="text-xs text-[var(--fg-2)] mt-1">+1pp desempleo AMBA → +0.21% presión migratoria</p>
          </div>
          <div>
            <p className="text-[var(--fg-3)] mb-1">Período Crítico</p>
            <p className="text-xl font-bold text-[var(--fg-0)]">2024-2026</p>
            <p className="text-xs text-[var(--fg-2)] mt-1">Aceleración post-RIGI + políticas descentralización</p>
          </div>
          <div>
            <p className="text-[var(--fg-3)] mb-1">Proyección Total</p>
            <p className="text-xl font-bold text-[var(--fg-0)]">2.3-2.5M</p>
            <p className="text-xs text-[var(--fg-2)] mt-1">Personas AMBA→Interior estimadas 2024-2029</p>
          </div>
        </div>
      </div>

      {/* Gráficos - Grid estilo Proxys */}
      <div className="space-y-8">
        {/* EDA */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold text-[var(--fg-0)]">1. Análisis Exploratorio (EDA)</h3>
            <span className="text-xs text-[var(--fg-3)]">Series históricas + test ADF</span>
          </div>
          <p className="text-sm text-[var(--fg-2)]">
            Las 5 variables clave del sistema VAR(2): flujos migratorios (2010-2026), diferencial salarial AMBA vs provincias,
            tasa de desempleo regional, índice de costo vivienda, e inversión pública por provincia. Cada serie incluye
            test ADF para confirmar estacionariedad/cointegración. Las líneas de quiebre (~2020 COVID, ~2024 RIGI)
            marcan shocks sistémicos.
          </p>
          <div className="relative w-full border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-3">
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
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold text-[var(--fg-0)]">2. Matriz de Correlaciones</h3>
            <span className="text-xs text-[var(--fg-3)]">Relaciones entre variables</span>
          </div>
          <p className="text-sm text-[var(--fg-2)]">
            Heatmap de correlación (Pearson) entre las 5 variables. Valores clave: <strong>costo_vivienda ↔ migracion (0.59)</strong>
            indica que regiones con mayor costo de vivienda atractivo generan más flujos migratorios;
            <strong>costo_vivienda ↔ inversion_publica (-0.68)</strong> sugiere trade-off de políticas
            (inversión en infraestructura vs presión sobre vivienda). Rojo=positivo, Azul=negativo.
          </p>
          <div className="relative w-full border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-3">
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
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold text-[var(--fg-0)]">3. Impulse Response Functions (IRF)</h3>
            <span className="text-xs text-[var(--fg-3)]">Dinámicas de corto y mediano plazo</span>
          </div>
          <p className="text-sm text-[var(--fg-2)]">
            25 paneles mostrando cómo cada variable responde a un shock de 1 desvío estándar en otras variables,
            en un horizonte de 24 trimestres (6 años). <strong>Lectura clave:</strong> fila 1 (migracion_flujo)
            muestra que shocks salariales tienen impacto inmediato pero persistente (~6-8 trim), mientras que
            shocks de desempleo tienen efecto más rápido (~2-3 trim). Las bandas punteadas son intervalos de confianza 68%.
          </p>
          <div className="relative w-full border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-3">
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
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold text-[var(--fg-0)]">4. Descomposición de Varianza (FEVD)</h3>
            <span className="text-xs text-[var(--fg-3)]">Qué explica qué a largo plazo</span>
          </div>
          <p className="text-sm text-[var(--fg-2)]">
            Para cada variable, muestra el porcentaje de su varianza explicado por shocks propios vs. de otras variables,
            a lo largo del horizonte de pronóstico. <strong>Panel superior (migracion):</strong> la mayoría de volatilidad
            es idiosincrática (negro), pero a 24 meses otras variables explican ~15-20%. <strong>Implicación:</strong>
            políticas de empleo/vivienda tienen efecto de mediano plazo sobre migraciones; shocks de inversión pública
            afectan indirectamente (a través de precios de vivienda).
          </p>
          <div className="relative w-full border border-[var(--line-1)] rounded-lg overflow-hidden bg-[var(--bg-1)] p-3">
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

      {/* Metodología compacta */}
      <div className="bg-[var(--bg-1)] border border-[var(--line-1)] rounded-lg p-6 space-y-3">
        <h3 className="text-sm font-bold text-[var(--fg-3)] uppercase tracking-wide">🔬 Metodología & Datos</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-[var(--fg-3)] font-mono text-xs mb-2">ESPECIFICACIÓN VAR</p>
            <p className="text-[var(--fg-1)]">
              Sistema de 5 ecuaciones con rezagos de 2 trimestres (VAR(2)).
              Identificación Cholesky (orden: Inversión → Vivienda → Salarios → Desempleo → Migración).
              Supuesto: migración es ajuste de stock más lento.
            </p>
          </div>
          <div>
            <p className="text-[var(--fg-3)] font-mono text-xs mb-2">DATOS & PERÍODO</p>
            <p className="text-[var(--fg-1)]">
              65 trimestres Q1 2010 – Q1 2026. Fuentes: INDEC EPH (migraciones), BCRA (salarios provinciales),
              INDEC IPC (vivienda), Min. Economía (inversión). Captura 3 ciclos (2010-2015 estabilidad,
              2016-2023 inestabilidad, 2024-2026 descentralización).
            </p>
          </div>
        </div>
      </div>

      {/* Links a recursos */}
      <div className="grid md:grid-cols-2 gap-4">
        <a
          href="https://github.com/santiagoalejandromurcia-hub/macro-ar/tree/main/proxys/migracion"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--bg-1)] border border-[var(--teal)]/30 rounded-lg p-4 hover:border-[var(--teal)] transition"
        >
          <p className="text-xs text-[var(--fg-3)] mb-1">📄 CÓDIGO & ARTÍCULO</p>
          <p className="text-[var(--fg-0)] font-semibold">NSS-VAR + Gravity Model</p>
          <p className="text-xs text-[var(--fg-2)] mt-2">Especificación completa, 20+ págs, elasticidades</p>
        </a>

        <a
          href="https://github.com/santiagoalejandromurcia-hub/macro-ar/tree/main/data"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--bg-1)] border border-[var(--gold)]/30 rounded-lg p-4 hover:border-[var(--gold)] transition"
        >
          <p className="text-xs text-[var(--fg-3)] mb-1">📊 DATASET & SCRIPTS</p>
          <p className="text-[var(--fg-0)] font-semibold">65 trimestres (2010-2026)</p>
          <p className="text-xs text-[var(--fg-2)] mt-2">CSV + Python notebooks para reproducir</p>
        </a>
      </div>
    </div>
  );
}
