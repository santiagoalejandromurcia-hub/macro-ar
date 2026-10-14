import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://macrolibre.com/contacto' },
  title: 'Contacto',
  description: 'Escribinos a macrolibrearg@gmail.com.',
};

export default function ContactoPage() {
  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-16">
      <Link href="/" className="text-[13px] text-[var(--fg-2)] hover:text-[var(--celeste)]">
        ← Inicio
      </Link>
      <h1 className="mt-6 font-display text-[32px] sm:text-[40px] text-[var(--fg-0)] leading-tight">
        Contacto
      </h1>
      <p className="mt-4 text-[15px] text-[var(--fg-1)] leading-relaxed">
        Datos mal cargados, una serie que falta o una idea. Mandá un mail.
      </p>
      <a
        href="mailto:macrolibrearg@gmail.com"
        className="mt-6 inline-flex items-center h-10 px-4 rounded-md bg-[var(--celeste)] text-[var(--bg-0)] text-[14px] font-semibold"
      >
        macrolibrearg@gmail.com
      </a>
    </div>
  );
}
