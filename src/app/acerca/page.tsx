import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://macrolibre.com';

// ============================================================
// Página "Acerca de" — pieza clave de E-E-A-T (Experience,
// Expertise, Authoritativeness, Trust). Google premia tener
// una identidad visible detrás del contenido.
//
// IMPORTANTE: rellená los TODOs con tus datos reales antes
// de deployar. Sin esto, la página le habla a Google de un
// fantasma.
// ============================================================

export const metadata: Metadata = {
  title: 'Acerca de MacroLibre',
  description:
    'Quién está detrás de MacroLibre. Misión, fuentes de datos y metodología de la plataforma de estadísticas macroeconómicas de Argentina.',
  alternates: { canonical: `${SITE_URL}/acerca` },
  openGraph: {
    type: 'profile',
    url: `${SITE_URL}/acerca`,
    title: 'Acerca de MacroLibre',
    description: 'Quién está detrás de MacroLibre y por qué existe esta plataforma.',
    siteName: 'MacroLibre',
    locale: 'es_AR',
  },
};

export default function AcercaPage() {
  // ─── JSON-LD Person + Organization founder ───
  // Esto le dice a Google quién es el autor humano detrás de la marca.
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Santiago Murcia', // TODO: confirmá tu nombre completo
    jobTitle: 'Estudiante de Economía · Fundador de MacroLibre',
    description:
      'Estudiante de economía en Argentina. Construye MacroLibre para hacer la información macroeconómica del país más accesible y transparente.',
    url: `${SITE_URL}/acerca`,
    email: 'santiagoalejandromurcia@gmail.com', // TODO: confirmá si querés exponer este email
    sameAs: [
      'https://www.instagram.com/macrolibre/',
      'https://www.linkedin.com/in/macrolibre/',
      // TODO: agregá tu Twitter/X y LinkedIn personal
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'MacroLibre',
      url: SITE_URL,
    },
    // TODO: si tenés universidad, descomentá y completá:
    // alumniOf: { '@type': 'EducationalOrganization', name: 'UBA / UCA / UCEMA / etc.' },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Link
        href="/"
        className="text-sm text-theme-muted hover:text-ar-celeste transition-colors mb-6 inline-block"
      >
        ← Volver al Dashboard
      </Link>

      {/* ─── Hero ─── */}
      <header className="mb-10">
        <p className="text-[11px] font-mono text-theme-faint uppercase tracking-widest mb-2">
          MacroLibre · Acerca
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-theme-primary mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Quién está detrás de MacroLibre
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary leading-relaxed">
          Una plataforma para entender la economía argentina con datos abiertos,
          en tiempo real y sin filtros. Hecha por una persona que estudia, mira
          gráficos y se cansó de tener que abrir cinco pestañas para encontrar
          un solo número.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-ar-celeste/30 via-ar-gold/20 to-transparent" />
      </header>

      {/* ─── Bio del autor ─── */}
      <section className="mb-10">
        <div className="bg-theme-card border border-theme rounded-xl p-6 flex flex-col sm:flex-row gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-ar-celeste to-ar-gold flex items-center justify-center text-white font-bold text-3xl">
            S
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-theme-primary mb-1">
              Santiago Murcia
              {/* TODO: confirmá tu nombre completo */}
            </h2>
            <p className="text-sm text-theme-muted mb-3">
              Estudiante de Economía · Fundador de MacroLibre
              {/* TODO: ajustá a tu universidad y año si querés exponerlo */}
            </p>
            <p className="text-sm text-theme-secondary leading-relaxed mb-4">
              Estudio economía en Argentina. Hace tiempo que junto datos del
              BCRA, INDEC y ArgentinaDatos para mis trabajos y nunca encontré
              un solo lugar donde tener todo en vivo, ordenado y consultable.
              MacroLibre es ese lugar — público, gratis y open data.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <a
                href="https://www.linkedin.com/in/macrolibre/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-theme-surface border border-theme rounded-lg text-theme-secondary hover:text-blue-400 hover:border-blue-400/30 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/macrolibre/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-theme-surface border border-theme rounded-lg text-theme-secondary hover:text-pink-400 hover:border-pink-400/30 transition-all"
              >
                Instagram
              </a>
              <Link
                href="/contacto"
                className="px-3 py-1.5 bg-theme-surface border border-theme rounded-lg text-theme-secondary hover:text-ar-celeste hover:border-ar-celeste/30 transition-all"
              >
                Escribir
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Misión ─── */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold text-theme-primary mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          La misión
        </h2>
        <p className="text-theme-secondary leading-relaxed mb-3">
          La información macroeconómica argentina existe — pero está dispersa,
          en formatos viejos, con APIs que se caen y series históricas que
          terminan en 2019. La idea de MacroLibre es simple: tomar los datos
          públicos, traerlos en vivo, ponerlos lindos y dejar que cualquiera
          los use sin pagar nada.
        </p>
        <p className="text-theme-secondary leading-relaxed">
          No vendemos data. No tenemos paywall. No te pedimos email para ver
          un gráfico. Si te resulta útil y querés colaborar, hay un{' '}
          <Link href="/contacto" className="text-ar-celeste hover:underline">
            formulario de contacto
          </Link>
          .
        </p>
      </section>

      {/* ─── Fuentes ─── */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold text-theme-primary mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Fuentes de datos
        </h2>
        <p className="text-theme-secondary leading-relaxed mb-4">
          Todos los datos son oficiales y están publicados por organismos
          reconocidos. No publicamos estimaciones propias sin etiquetarlas
          como tales.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3 p-3 bg-theme-surface border border-theme rounded-lg">
            <span className="text-ar-celeste font-mono text-xs mt-0.5">●</span>
            <div>
              <strong className="text-theme-primary">INDEC</strong>{' '}
              <span className="text-theme-secondary">
                — IPC, EMAE, PBI, pobreza, balanza comercial, salarios.
              </span>{' '}
              <a
                href="https://www.indec.gob.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ar-celeste text-xs hover:underline"
              >
                indec.gob.ar
              </a>
            </div>
          </li>
          <li className="flex gap-3 p-3 bg-theme-surface border border-theme rounded-lg">
            <span className="text-ar-celeste font-mono text-xs mt-0.5">●</span>
            <div>
              <strong className="text-theme-primary">BCRA</strong>{' '}
              <span className="text-theme-secondary">
                — Reservas internacionales, tipo de cambio, BADLAR, REM, base monetaria.
              </span>{' '}
              <a
                href="https://www.bcra.gob.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ar-celeste text-xs hover:underline"
              >
                bcra.gob.ar
              </a>
            </div>
          </li>
          <li className="flex gap-3 p-3 bg-theme-surface border border-theme rounded-lg">
            <span className="text-ar-celeste font-mono text-xs mt-0.5">●</span>
            <div>
              <strong className="text-theme-primary">ArgentinaDatos API</strong>{' '}
              <span className="text-theme-secondary">
                — Cotizaciones MEP, blue, oficial; índice de riesgo país.
              </span>{' '}
              <a
                href="https://argentinadatos.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ar-celeste text-xs hover:underline"
              >
                argentinadatos.com
              </a>
            </div>
          </li>
          <li className="flex gap-3 p-3 bg-theme-surface border border-theme rounded-lg">
            <span className="text-ar-celeste font-mono text-xs mt-0.5">●</span>
            <div>
              <strong className="text-theme-primary">Ministerio de Economía</strong>{' '}
              <span className="text-theme-secondary">
                — Resultado fiscal primario y financiero, recaudación tributaria.
              </span>{' '}
              <a
                href="https://www.argentina.gob.ar/economia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ar-celeste text-xs hover:underline"
              >
                argentina.gob.ar/economia
              </a>
            </div>
          </li>
        </ul>
      </section>

      {/* ─── Metodología ─── */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold text-theme-primary mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Metodología
        </h2>
        <p className="text-theme-secondary leading-relaxed mb-3">
          Los datos en vivo (dólar blue, riesgo país, reservas) se cachean
          60 segundos. Las series históricas se actualizan cuando el organismo
          publica el dato nuevo. Cuando un dato es estimación nuestra (poco
          frecuente) está etiquetado como tal.
        </p>
        <p className="text-theme-secondary leading-relaxed mb-3">
          La calculadora simula retornos de instrumentos financieros con
          series históricas reales y los ajusta por inflación. Es educativa —
          no es recomendación de inversión.
        </p>
        <p className="text-theme-secondary leading-relaxed text-sm">
          Si encontrás un error en algún dato,{' '}
          <Link href="/contacto" className="text-ar-celeste hover:underline">
            avisanos
          </Link>{' '}
          y lo corregimos.
        </p>
      </section>

      {/* ─── Stack ─── */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold text-theme-primary mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Cómo está construido
        </h2>
        <p className="text-theme-secondary leading-relaxed mb-4">
          Open source en filosofía: stack moderno, hospedado en Vercel,
          accesible y rápido. Todo el código corre en el cliente cuando puede
          y se cachea agresivamente cuando no.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'Recharts', 'Vercel', 'BCRA API', 'INDEC API'].map((s) => (
            <div
              key={s}
              className="px-3 py-2 bg-theme-surface border border-theme rounded-lg text-center text-theme-secondary"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer CTA ─── */}
      <section className="mt-12 p-6 bg-gradient-to-br from-ar-celeste/5 to-ar-gold/5 border border-ar-celeste/20 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-theme-primary mb-2">
          ¿Querés colaborar o reportar algo?
        </h3>
        <p className="text-sm text-theme-secondary mb-4">
          Sugerencias, errores en los datos, propuestas — leemos todo.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ar-celeste/10 border border-ar-celeste/30 rounded-lg text-sm font-semibold text-ar-celeste hover:bg-ar-celeste/20 transition-all"
        >
          Escribirnos →
        </Link>
      </section>
    </div>
  );
}
