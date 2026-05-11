import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { db } from '@/db';
import { downloads } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Mi cuenta',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function CuentaPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login?redirect=/cuenta');

  // Últimas descargas del usuario
  const recentDownloads = await db
    .select()
    .from(downloads)
    .where(eq(downloads.userId, session.user.id))
    .orderBy(desc(downloads.downloadedAt))
    .limit(10);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="text-sm text-[var(--fg-2)] hover:text-[var(--celeste)] transition-colors mb-6 inline-block"
      >
        ← Volver al Dashboard
      </Link>

      <header className="mb-10">
        <p className="text-[11px] font-mono text-[var(--fg-3)] uppercase tracking-widest mb-2">
          MacroLibre · Mi cuenta
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-[var(--fg-0)]"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Hola, {session.user.name?.split(' ')[0] || 'amigo'}
        </h1>
        <div className="mt-5 h-px bg-gradient-to-r from-[var(--celeste)]/30 via-[var(--sol)]/20 to-transparent" />
      </header>

      {/* ─── Info de perfil ─── */}
      <section className="mb-10">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)] mb-3">
          Perfil
        </h2>
        <div className="glass p-5 flex items-center gap-4">
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name || ''}
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--celeste)] to-[var(--sol)] flex items-center justify-center text-white font-bold text-xl">
              {(session.user.name || session.user.email || '?')[0].toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-[var(--fg-0)]">
              {session.user.name || 'Usuario'}
            </div>
            <div className="text-[13px] text-[var(--fg-2)] truncate">{session.user.email}</div>
          </div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button
              type="submit"
              className="px-3 py-1.5 text-[12px] font-medium bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md text-[var(--fg-1)] hover:border-[var(--magenta)]/40 hover:text-[var(--magenta)] transition"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </section>

      {/* ─── Descargas ─── */}
      <section className="mb-10">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)] mb-3">
          Mis descargas
        </h2>
        {recentDownloads.length === 0 ? (
          <div className="glass p-6 text-center">
            <p className="text-sm text-[var(--fg-2)] mb-3">Todavía no descargaste ningún dataset.</p>
            <Link
              href="/break-even"
              className="inline-flex items-center gap-2 h-9 px-4 bg-[var(--celeste)] text-[var(--bg-0)] rounded-md text-[13px] font-medium hover:bg-[oklch(0.84_0.14_230)] transition"
            >
              Ver datasets disponibles →
            </Link>
          </div>
        ) : (
          <div className="glass divide-y divide-[var(--line-1)]">
            {recentDownloads.map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-3 p-4 text-[13px]">
                <div className="min-w-0">
                  <div className="font-medium text-[var(--fg-0)]">{d.filename}</div>
                  <div className="text-[11px] text-[var(--fg-3)] font-mono">{d.resourceSlug}</div>
                </div>
                <div className="text-[11px] text-[var(--fg-2)] tnum">
                  {d.downloadedAt.toLocaleString('es-AR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── Próximamente ─── */}
      <section className="p-5 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-xl">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--sol)] mb-2">
          ◆ PRÓXIMAMENTE
        </div>
        <p className="text-sm text-[var(--fg-1)] leading-relaxed">
          Alertas por email cuando el dólar supere un umbral, cuando salga un dato nuevo de inflación,
          y favoritos de gráficos. Estamos trabajándolo.
        </p>
      </section>
    </div>
  );
}
