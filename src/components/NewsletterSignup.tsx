'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validación cliente
    const emailTrimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setStatus('error');
      setMessage('Ingresá un email válido.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailTrimmed }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || 'No pudimos procesar tu suscripción. Probá de nuevo.');
        return;
      }

      setStatus('success');
      setMessage(data?.message || '¡Listo! Te vas a enterar antes que nadie.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Error de conexión. Probá de nuevo en un momento.');
    }
  }

  return (
    <div className="relative overflow-hidden bg-theme-card border border-theme rounded-2xl p-6 sm:p-10">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-ar-celeste/[0.06] via-transparent to-ar-gold/[0.04] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-ar-celeste/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ar-celeste/10 border border-ar-celeste/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-ar-celeste rounded-full animate-pulse" />
            <span className="text-[11px] text-ar-celeste font-medium uppercase tracking-wide">Newsletter semanal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-theme-primary mb-3 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            El resumen macro que <span className="gradient-text-ar">importa</span>, cada lunes.
          </h2>
          <p className="text-sm sm:text-base text-theme-secondary leading-relaxed mb-1">
            Los indicadores clave de la semana, el dato que nadie cubrió y una lectura corta de lo que viene. Sin spam, sin vender nada raro.
          </p>
          <p className="text-xs text-theme-muted">
            Gratis · Te podés dar de baja cuando quieras.
          </p>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 px-4 py-3 rounded-lg bg-theme-surface border border-theme text-sm text-theme-primary placeholder:text-theme-faint focus:outline-none focus:ring-2 focus:ring-ar-celeste/40 focus:border-ar-celeste/40 transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-5 py-3 rounded-lg bg-ar-celeste text-white text-sm font-semibold hover:bg-ar-celeste/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Enviando…' : status === 'success' ? '✓ Suscripto' : 'Suscribirme'}
            </button>
          </form>

          {/* Mensaje de estado */}
          {status !== 'idle' && message && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 text-xs ${
                status === 'success'
                  ? 'text-ar-green'
                  : status === 'error'
                  ? 'text-red-400'
                  : 'text-theme-muted'
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-3 text-[11px] text-theme-faint">
            Protegemos tu email. Solo lo usamos para mandarte el newsletter.
          </p>
        </div>
      </div>
    </div>
  );
}
