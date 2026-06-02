import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicios — Advisory, Auditoría y Dashboards',
  description:
    'Dashboard de facturación para PYMES, auditorías de ads y consultoría macroeconómica C-level. Data macro aplicada a tu negocio.',
};

interface ServicePage {
  id: string;
  nivel: string;
  nivelLabel: string;
  eyebrow: string;
  title: string;
  tagline: string;
  price: string;
  deliverables: string[];
  idealPara: string[];
  proceso: { step: string; label: string }[];
  accent: string;
}

const SERVICES_DETAIL: ServicePage[] = [
  {
    id: 'dashboard-facturacion',
    nivel: 'NIVEL 1',
    nivelLabel: 'Recurrente · Low-ticket',
    eyebrow: 'PYMES · SUSCRIPCIÓN',
    title: 'Dashboard de Facturación',
    tagline:
      'Dashboard de ingresos, egresos y márgenes cruzado con la macro de MacroLibre. Tus números en contexto, sin Excel gigantes ni contador perdido. Ingresos recurrentes para tu negocio con bajo costo de soporte.',
    price: 'ARS 150.000 / mes',
    deliverables: [
      'Dashboard web privado con tus KPIs mensuales',
      'Cruza tus datos internos con indicadores macro reales (IPC, tipo de cambio, EMAE)',
      'Conciliación con tus cuentas bancarias (Mercado Pago, cuenta corriente, billeteras)',
      'Reporte exportable listo para contador',
      'Alertas de márgenes deflactados por IPC real',
      'Soporte por WhatsApp en horario hábil',
    ],
    idealPara: [
      'Emprendedores facturando entre USD 2k y USD 30k / mes',
      'Comercios de barrio que quieren profesionalizar sus números',
      'Monotributistas que necesitan visión macro antes de saltar a RI',
    ],
    proceso: [
      { step: '01', label: 'Llamada de descubrimiento (30 min, gratis)' },
      { step: '02', label: 'Setup + conexión de fuentes (5 días)' },
      { step: '03', label: 'Dashboard en vivo + onboarding (1 hora)' },
      { step: '04', label: 'Revisión mensual + ajustes continuos' },
    ],
    accent: 'var(--celeste)',
  },
  {
    id: 'auditoria-ads',
    nivel: 'NIVEL 2',
    nivelLabel: 'Pago único · Diagnóstico',
    eyebrow: 'MARKETING · PERFORMANCE',
    title: 'Auditoría de Ads',
    tagline:
      'Revisamos tu cuenta de Meta, Google o TikTok Ads y te entregamos un informe accionable con las 10 optimizaciones de mayor impacto. Producto de entrada para demostrar rigor técnico en análisis de datos.',
    price: 'ARS 550.000 · pago único',
    deliverables: [
      'Informe PDF de 40+ páginas (español, 5 días hábiles)',
      'Análisis de CAC, ROAS y LTV reales vs los que reporta la plataforma',
      'Detección de fuga de presupuesto (segmentos que no convierten, creatividades cansadas, bid strategy)',
      'Plan de optimización priorizado por impacto × esfuerzo',
      'Sesión de entrega de 90 minutos con tu equipo',
    ],
    idealPara: [
      'Marcas invirtiendo más de USD 5.000 / mes en paid media',
      'Agencias que quieren validar performance propia con un tercero',
      'E-commerces con caída inexplicada de ventas o ROAS',
    ],
    proceso: [
      { step: '01', label: 'Intro de 15 min + acceso read-only a cuentas' },
      { step: '02', label: 'Análisis (5 días hábiles)' },
      { step: '03', label: 'Entrega del informe + sesión live' },
      { step: '04', label: '30 días de soporte post-entrega' },
    ],
    accent: 'var(--sol)',
  },
  {
    id: 'consultoria-macro',
    nivel: 'NIVEL 3',
    nivelLabel: 'Advisory · C-Level',
    eyebrow: 'C-LEVEL · CONSULTORÍA',
    title: 'Advisory Macroeconómico',
    tagline:
      'Sesiones personalizadas de consultoría para directorios, founders y CFOs. Traduzco lo que pasa en BCRA, Tesoro e INDEC a decisiones concretas para tu negocio.',
    price: 'ARS 250.000 / sesión · paquetes 3/6 meses',
    deliverables: [
      'Memo ejecutivo mensual (10-15 páginas)',
      'Escenarios de inflación, tipo de cambio y expectativas a 90 y 180 días',
      'Análisis de escenarios sobre tu plan financiero',
      'Reunión en vivo de 60 min con preguntas abiertas',
      'Disponibilidad por mail entre sesiones',
    ],
    idealPara: [
      'Founders pre-seed a Serie A armando presupuestos 2026',
      'Directorios que necesitan lectura económica clara y accionable',
      'CFOs que quieren sparring externo para sus proyecciones',
    ],
    proceso: [
      { step: '01', label: 'Onboarding + NDA' },
      { step: '02', label: 'Primera sesión (diagnóstico)' },
      { step: '03', label: 'Sesiones mensuales' },
      { step: '04', label: 'Renovación trimestral opcional' },
    ],
    accent: 'var(--up)',
  },
];

export default function ServiciosPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Hero */}
      <header className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--celeste)]">
            ◆ SERVICIOS B2B
          </span>
          <span className="h-px w-12 bg-[var(--line-1)]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)]">
            #servicios
          </span>
        </div>
        <h1 className="font-display text-[36px] sm:text-[52px] leading-[1.02] tracking-tight text-[var(--fg-0)] max-w-3xl">
          Data macro aplicada a tu negocio.
        </h1>
        <p className="mt-4 text-[15px] text-[var(--fg-1)] max-w-2xl leading-relaxed">
          Tres niveles diseñados como una escalera: empezás con una suscripción mensual de datos,
          subís a un diagnóstico único de ads, y llegás al advisory C-Level. Cada nivel demuestra
          rigor antes de pedirte un compromiso mayor.
        </p>
        <div className="mt-6 flex gap-2">
          <Link
            href="/contacto"
            className="h-10 px-5 inline-flex items-center text-[13px] font-semibold bg-[var(--celeste)] text-[var(--bg-0)] rounded-md hover:bg-[oklch(0.84_0.14_230)] transition"
          >
            Agendar llamada
          </Link>
          <Link
            href="#dashboard-facturacion"
            className="h-10 px-5 inline-flex items-center text-[13px] font-medium border border-[var(--line-1)] text-[var(--fg-1)] rounded-md hover:border-[var(--celeste)]/50 hover:text-[var(--fg-0)] transition"
          >
            Ver servicios ↓
          </Link>
        </div>
      </header>

      {/* Services detail */}
      <div className="flex flex-col gap-12">
        {SERVICES_DETAIL.map((s) => (
          <article key={s.id} id={s.id} className="scroll-mt-20 glass glass-lift p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded"
                    style={{ color: s.accent, background: `color-mix(in oklch, ${s.accent} 12%, transparent)`, border: `1px solid color-mix(in oklch, ${s.accent} 30%, transparent)` }}
                  >
                    {s.nivel}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--fg-3)]">{s.nivelLabel}</span>
                </div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.18em]"
                  style={{ color: s.accent }}
                >
                  {s.eyebrow}
                </span>
                <h2 className="font-display text-[28px] md:text-[34px] leading-tight text-[var(--fg-0)] mt-1">
                  {s.title}
                </h2>
              </div>
              <span className="text-[12px] font-mono px-3 py-1.5 border border-[var(--line-1)] rounded-md text-[var(--fg-1)] whitespace-nowrap">
                {s.price}
              </span>
            </div>
            <p className="text-[15px] text-[var(--fg-1)] leading-relaxed max-w-3xl mb-6">
              {s.tagline}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                  Qué incluye
                </h3>
                <ul className="flex flex-col gap-1.5 text-[13px] text-[var(--fg-1)]">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span style={{ color: s.accent }} className="mt-0.5">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                  Ideal para
                </h3>
                <ul className="flex flex-col gap-1.5 text-[13px] text-[var(--fg-1)] mb-5">
                  {s.idealPara.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--fg-2)] mt-0.5">·</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                  Proceso
                </h3>
                <ol className="flex flex-col gap-1.5 text-[13px] text-[var(--fg-1)]">
                  {s.proceso.map((p) => (
                    <li key={p.step} className="flex items-start gap-3">
                      <span className="text-[10px] font-mono text-[var(--fg-2)] tnum pt-0.5">
                        {p.step}
                      </span>
                      <span>{p.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--line-1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[12px] text-[var(--fg-2)] font-mono">
                ¿Encaja con lo que necesitás?
              </span>
              <Link
                href={`/contacto?servicio=${s.id}`}
                className="h-9 px-4 inline-flex items-center text-[12px] font-semibold rounded-md transition"
                style={{
                  background: s.accent,
                  color: 'var(--bg-0)',
                }}
              >
                Pedir este servicio
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* CTA final */}
      <div className="mt-14 glass p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-1">
            ¿No encontrás lo que necesitás?
          </div>
          <h3 className="font-display text-[22px] text-[var(--fg-0)]">
            Armamos propuestas a medida.
          </h3>
        </div>
        <Link
          href="/contacto"
          className="h-10 px-5 inline-flex items-center text-[13px] font-semibold bg-[var(--celeste)] text-[var(--bg-0)] rounded-md hover:bg-[oklch(0.84_0.14_230)] transition"
        >
          Contactanos
        </Link>
      </div>
    </div>
  );
}
