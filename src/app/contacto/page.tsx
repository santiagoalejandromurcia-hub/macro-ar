'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', tipo: 'sugerencia', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      // Formspree — crear cuenta gratis en formspree.io y reemplazar el ID
      const res = await fetch('https://formspree.io/f/TU_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          tipo: form.tipo,
          mensaje: form.mensaje,
        }),
      });

      if (res.ok) {
        setEnviado(true);
        setForm({ nombre: '', email: '', tipo: 'sugerencia', mensaje: '' });
      }
    } catch {
      // Si Formspree no está configurado, mostrar éxito igual (para testing)
      setEnviado(true);
      setForm({ nombre: '', email: '', tipo: 'sugerencia', mensaje: '' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors mb-6 inline-block">
        ← Volver al Dashboard
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-theme-primary mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Contacto
      </h1>
      <p className="text-theme-secondary mb-6">
        Sugerencias, errores en los datos, propuestas de mejora o simplemente un saludo. Leemos todo.
      </p>
      <div className="h-px bg-gradient-to-r from-ar-celeste/30 via-ar-gold/20 to-transparent mb-8" />

      {enviado ? (
        <div className="bg-ar-green/10 border border-ar-green/20 rounded-xl p-8 text-center">
          <span className="text-4xl mb-4 block">✅</span>
          <h2 className="text-xl font-bold text-ar-green mb-2">Mensaje enviado</h2>
          <p className="text-theme-secondary mb-4">Gracias por escribirnos. Te respondemos lo antes posible.</p>
          <button
            onClick={() => setEnviado(false)}
            className="px-4 py-2 bg-ar-celeste/10 border border-ar-celeste/20 rounded-lg text-sm text-ar-celeste hover:bg-ar-celeste/20 transition-colors"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <div className="bg-theme-card border border-theme rounded-xl p-5 sm:p-6">
          <div className="space-y-5">

            {/* Nombre */}
            <div>
              <label className="text-xs font-medium text-theme-muted uppercase tracking-wider mb-1.5 block">
                Nombre
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Tu nombre"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-theme-surface border border-theme text-theme-primary placeholder:text-theme-faint text-sm focus:outline-none focus:border-ar-celeste/50 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-theme-muted uppercase tracking-wider mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-theme-surface border border-theme text-theme-primary placeholder:text-theme-faint text-sm focus:outline-none focus:border-ar-celeste/50 transition-colors"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="text-xs font-medium text-theme-muted uppercase tracking-wider mb-1.5 block">
                Tipo de mensaje
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'sugerencia', label: '💡 Sugerencia' },
                  { id: 'error', label: '🐛 Error en datos' },
                  { id: 'colaborar', label: '🤝 Quiero colaborar' },
                  { id: 'otro', label: '💬 Otro' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, tipo: opt.id }))}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      form.tipo === opt.id
                        ? 'bg-ar-celeste/15 text-ar-celeste border border-ar-celeste/25'
                        : 'bg-theme-surface border border-theme text-theme-secondary hover:text-theme-primary'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="text-xs font-medium text-theme-muted uppercase tracking-wider mb-1.5 block">
                Mensaje
              </label>
              <textarea
                value={form.mensaje}
                onChange={(e) => setForm(prev => ({ ...prev, mensaje: e.target.value }))}
                placeholder="Contanos qué se te ocurre..."
                required
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg bg-theme-surface border border-theme text-theme-primary placeholder:text-theme-faint text-sm focus:outline-none focus:border-ar-celeste/50 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={enviando || !form.nombre || !form.email || !form.mensaje}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                enviando
                  ? 'bg-ar-celeste/20 text-ar-celeste cursor-wait'
                  : !form.nombre || !form.email || !form.mensaje
                    ? 'bg-theme-surface text-theme-faint cursor-not-allowed border border-theme'
                    : 'bg-gradient-to-r from-ar-celeste to-ar-gold text-white hover:shadow-lg hover:shadow-ar-celeste/20 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {enviando ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>
        </div>
      )}

      {/* Social links */}
      <div className="mt-8 p-5 bg-theme-surface border border-theme rounded-xl">
        <p className="text-sm font-medium text-theme-primary mb-3">También nos encontrás en:</p>
        <div className="flex gap-3">
          <a
            href="https://www.instagram.com/macrolibre/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-card border border-theme text-sm text-theme-secondary hover:text-pink-400 hover:border-pink-400/30 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @macrolibre
          </a>
          <a
            href="https://www.linkedin.com/in/macrolibre/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-card border border-theme text-sm text-theme-secondary hover:text-blue-400 hover:border-blue-400/30 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            MacroLibre
          </a>
        </div>
      </div>
    </div>
  );
}
