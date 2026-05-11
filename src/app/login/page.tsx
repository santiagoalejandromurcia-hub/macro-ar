import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description:
    'Iniciá sesión en MacroLibre para descargar datasets, suscribirte a alertas y guardar tus análisis.',
  robots: { index: false, follow: false },
};

export default async function LoginPage(
  { searchParams }: { searchParams: Promise<{ redirect?: string; error?: string }> }
) {
  const params = await searchParams;
  const session = await auth();
  const redirectTo = params.redirect || '/';

  // Si ya está logueado, redirigir
  if (session?.user) redirect(redirectTo);

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Link
        href="/"
        className="text-sm text-[var(--fg-2)] hover:text-[var(--celeste)] transition-colors mb-6 inline-block"
      >
        ← Volver
      </Link>

      <header className="mb-8 text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--celeste)] mb-3">
          ◆ MacroLibre · Acceso
        </p>
        <h1
          className="text-3xl font-bold text-[var(--fg-0)] mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Iniciá sesión
        </h1>
        <p className="text-sm text-[var(--fg-2)] leading-relaxed">
          Para descargar datasets, suscribirte a alertas y guardar tus análisis.
          <br />
          <span className="text-[var(--fg-3)]">Sin spam. Sin reventa de datos.</span>
        </p>
      </header>

      {params.error && (
        <div className="mb-5 p-3 bg-[var(--magenta)]/10 border border-[var(--magenta)]/30 rounded-lg text-[13px] text-[var(--magenta)]">
          Hubo un error iniciando sesión. Intentá de nuevo.
        </div>
      )}

      <div className="glass p-6 space-y-4">
        {/* ─── Google ─── */}
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 h-11 px-4 bg-white text-[#1f1f1f] rounded-md font-medium text-[14px] hover:bg-[#f5f5f5] transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
            Continuar con Google
          </button>
        </form>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--line-1)]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-3)]">
            o por email
          </span>
          <span className="h-px flex-1 bg-[var(--line-1)]" />
        </div>

        {/* ─── Email magic link ─── */}
        <form
          action={async (formData: FormData) => {
            'use server';
            const email = formData.get('email')?.toString();
            if (!email) return;
            await signIn('resend', { email, redirectTo });
          }}
          className="space-y-3"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="tu@email.com"
            className="w-full h-11 px-3 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md text-[14px] text-[var(--fg-0)] placeholder:text-[var(--fg-3)] focus:outline-none focus:border-[var(--celeste)]/50 transition-colors"
          />
          <button
            type="submit"
            className="w-full h-11 px-4 bg-[var(--celeste)] text-[var(--bg-0)] rounded-md font-medium text-[14px] hover:bg-[oklch(0.84_0.14_230)] transition"
          >
            Enviar link de acceso
          </button>
        </form>
      </div>

      <p className="mt-6 text-[11px] text-[var(--fg-3)] text-center leading-relaxed">
        Al continuar aceptás nuestros{' '}
        <Link href="/legal/terminos" className="text-[var(--celeste)] hover:underline">
          términos
        </Link>{' '}
        y{' '}
        <Link href="/legal/privacidad" className="text-[var(--celeste)] hover:underline">
          política de privacidad
        </Link>
        .
      </p>
    </div>
  );
}
