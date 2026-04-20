'use client';

import { useEffect, useRef, useState } from 'react';

// ============================================================
// useCountUp — anima un número desde 0 (o from) hasta `to`
// ------------------------------------------------------------
// - Soporta decimales (prop `decimals`)
// - Easing: out-cubic por defecto, suave y "Apple-ish"
// - Respeta reduced-motion: si el usuario lo pidió, salta al
//   valor final sin animar.
// - Reinicia al cambiar `to`.
// ============================================================

type UseCountUpOptions = {
  /** Valor objetivo */
  to: number;
  /** Valor inicial (default: 0) */
  from?: number;
  /** Duración en ms (default: 1200) */
  duration?: number;
  /** Decimales a mostrar (default: 0) */
  decimals?: number;
  /** Retraso antes de empezar, en ms (default: 0) */
  delay?: number;
};

export function useCountUp({
  to,
  from = 0,
  duration = 1200,
  decimals = 0,
  delay = 0,
}: UseCountUpOptions): number {
  const [value, setValue] = useState<number>(from);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respetar preferencia del sistema
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(to);
      return;
    }

    // Cancelar animaciones previas
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    startRef.current = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = from + (to - from) * eased;
      // Redondeamos al decimal pedido para no re-renderizar exceso
      const factor = Math.pow(10, decimals);
      setValue(Math.round(current * factor) / factor);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    timeoutRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [to, from, duration, decimals, delay]);

  return value;
}
