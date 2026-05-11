import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Revisá tu email',
  robots: { index: false, follow: false },
};

export default function CheckEmailPage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="text-5xl mb-5">📬</div>
      <h1
        className="text-2xl font-bold text-[var(--fg-0)] mb-3"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Revisá tu email
      </h1>
      <p className="text-sm text-[var(--fg-2)] leading-relaxed mb-6">
        Te enviamos un link de acceso. Hacé click en el botón del email para entrar.
        El link expira en 24 horas.
      </p>
      <p className="text-[11px] text-[var(--fg-3)]">
        ¿No te llegó? Mirá la carpeta de spam o{' '}
        <Link href="/login" className="text-[var(--celeste)] hover:underline">
          probá de nuevo
        </Link>
        .
      </p>
    </div>
  );
}
