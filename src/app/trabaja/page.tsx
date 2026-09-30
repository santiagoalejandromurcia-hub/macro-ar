import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trabajá con nosotros',
  description: 'Escribinos a macrolibrearg@gmail.com.',
};

export default function TrabajaPage() {
  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-[32px] sm:text-[40px] text-[var(--fg-0)] leading-tight">
        Trabajá con nosotros
      </h1>
      <p className="mt-4 text-[15px] text-[var(--fg-1)] leading-relaxed">
        Si querés sumarte, escribí. Contá en qué andás y qué te interesa del proyecto.
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
