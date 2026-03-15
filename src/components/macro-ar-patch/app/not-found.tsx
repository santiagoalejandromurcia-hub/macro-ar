import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-6">🇦🇷</div>
      <h1 className="text-4xl font-bold text-theme-primary mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Página no encontrada
      </h1>
      <p className="text-theme-secondary mb-8 max-w-md">
        La página que buscás no existe o fue movida. Volvé al dashboard para seguir explorando los datos.
      </p>
      <Link href="/" className="px-6 py-3 bg-ar-celeste/10 border border-ar-celeste/20 rounded-lg text-sm text-ar-celeste hover:bg-ar-celeste/20 transition-colors">
        ← Volver al Dashboard
      </Link>
    </div>
  );
}
