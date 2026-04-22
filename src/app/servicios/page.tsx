import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicios · MacroLibre',
  description:
    'Dashboard de facturación para PYMES, auditorías de ads, programa de marketing macro-driven y consultoría C-level. Data macro aplicada a tu negocio.',
};

interface ServicePage {
  id: string;
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
    eyebrow: 'PYMES · FINANZAS',
    title: 'Dashboard de Facturación',
    tagline:
      'Un panel claro de ingresos, egresos y márgenes para emprendedores y comercios en etapa de formalización — sin Excel gigantes ni contador perdido.',
    price: 'Desde USD 149 / mes',
    deliverables: [
      'Dashboard web privado con tus KPIs mensuales',
      'Conciliación con tus cuentas bancarias (Mercado Pago, cuenta corriente, billeteras)',
      'Reporte exportable listo para contador cuando decidas formalizar',
      'Alertas de márgenes deflactados por IPC real',
      'Soporte por WhatsApp en horario hábil',
    ],
    idealPara: [
      'Emprendedores facturando entre USD 2k y USD 30k / mes',
      'Comercios de barrio que quieren profesionalizar números',
      'Monotributistas que necesitan visión clara antes de saltar a RI',
    ],
    proceso: [
      { step: '01', label: 'Llamada de descubrimiento (30 min, gratis)' },
      { step: '02', label: 'Setup + conexión de fuentes (5 días)' },
      { step: '03', label: 'Dashboard en vivo + onboarding (1 hora)' },
      { step: '04', label: 'Revisión mensual + ajustes' },
    ],
    accent: 'var(--celeste)',
  },
  {
    id: 'auditoria-ads',
    eyebrow: 'MARKETING · PERFORMANCE',
    title: 'Auditoría de Ads',
    tagline:
      'Revisamos tu cuenta de Meta, Google o TikTok Ads y te entregamos un informe accionable con las 10 optimizaciones de mayor impacto.',
    price: 'USD 890 · pago único',
    deliverables: [
      'Informe PDF de 40+ páginas (español, 5 días hábiles)',
      'Análisis de CAC, ROAS y LTV reales vs los que reporta la plataforma',
      'Detección de fuga de presupuesto (segmentos que no convierten, creatividades cansadas, bid strategy)',
      'Plan de optimización priorizado por impacto × esfuerzo',
      'Sesión de entrega de 90 minutos con tu equipo',
    ],
    idealPara: [
      'Marcas invirtiendo más de USD 5.000 / mes en paid media',
      'Agencias que quieren validar performance propia',
      'E-commerces con caída inexplicada de ventas',
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
    id: 'marketing-macro',
    eyebrow: 'ESTRATEGIA · DATA-DRIVEN',
    title: 'Programa de Marketing Macro-Driven',
    tagline:
      'Estrategia trimestral que sincroniza precios, promos y mensajes al ciclo económico argentino. Tu plan de marketing deja de ser independiente de la macro.',
    price: 'Desde USD 480 / mes',
    deliverables: [
      'Análisis de elasticidad precio específico a tu categoría',
      'Calendario editorial sincronizado con IPC, ingresos reales y consumo masivo',
      'Scripts de mensajes por escenario (alta inflación, desaceleración, recuperación)',
      'Revisión mensual 1:1 con nuestro equipo + ajustes tácticos',
      'Acceso a nuestro data-room macro privado',
    ],
    idealPara: [
      'Brands con presupuesto marketing > USD 10k / mes',
      'Retail, consumo masivo, turismo doméstico',
      'Startups que necesitan market fit con la realidad de bolsillo argentino',
    ],
    proceso: [
      { step: '01', label: 'Diagnóstico inicial (2 semanas)' },
      { step: '02', label: 'Diseño del plan trimestral' },
      { step: '03', label: 'Implementación asistida' },
      { step: '04', label: 'Review mensual + pivot táctico' },
    ],
    accent: 'var(--magenta)',
  },
  {
    id: 'consultoria-macro',
    eyebrow: 'C-LEVEL · ADVISORY',
    title: 'Consultoría Macro',
    tagline:
      'Sesiones mensuales con analistas para directorios y founders. Traducimos lo que pasa en BCRA, Tesoro e INDEC a decisiones concretas para tu negocio.',
    price: 'USD 350 / sesión · paquetes 3/6 meses',
    deliverables: [
      'Memo ejecutivo mensual (10-15 páginas)',
      'Escenarios de inflación, tipo de cambio y tasas a 90 y 180 días',
      'Stress test sobre tu plan financiero',
      'Reunión en vivo de 60 min con preguntas abiertas',
      'Disponibilidad por mail entre sesiones',
    ],
    idealPara: [
      'Founders pre-seed a Serie A armando presupuestos 2026',
      'Directorios que necesitan lectura económica simple',
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
          Desde un dashboard simple de facturación para emprendedores, hasta advisory mensual
          para founders. Cuatro servicios, un mismo principio: tus decisiones de negocio
          pisando la realidad macro argentina.
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
