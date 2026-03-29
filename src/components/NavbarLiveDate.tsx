'use client';

import { useState, useEffect } from 'react';

/**
 * Muestra la fecha actual en tiempo real.
 * Reemplaza la fecha estática de build-time del Navbar.
 */
export default function NavbarLiveDate() {
  const [label, setLabel] = useState('');

  useEffect(() => {
    function update() {
      setLabel(
        new Date().toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      );
    }
    update();
    const interval = setInterval(update, 60 * 1000); // actualizar cada minuto
    return () => clearInterval(interval);
  }, []);

  if (!label) return null;

  return (
    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ar-green/10 border border-ar-green/20">
      <span className="w-1.5 h-1.5 rounded-full bg-ar-green animate-pulse" />
      <span className="text-xs text-ar-green font-medium">{label}</span>
    </div>
  );
}
