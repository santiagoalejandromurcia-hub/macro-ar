'use client';

import { useState, useEffect, useRef } from 'react';

interface UseLiveDataOptions {
  /** Intervalo de refresco en ms. Por defecto: no refresca automáticamente */
  refreshInterval?: number;
}

interface UseLiveDataResult<T> {
  data: T;
  isLive: boolean;
  isLoading: boolean;
  lastUpdate: string | null;
  error: boolean;
}

/**
 * Hook genérico para obtener datos de un API route propio de Next.js.
 * Arranca inmediatamente con `fallback` (renderizado instantáneo)
 * y reemplaza con datos en vivo si el fetch es exitoso.
 *
 * @param apiUrl   - Ruta relativa del API route, ej: '/api/inflacion'
 * @param fallback - Datos estáticos a mostrar mientras carga o si falla la API
 * @param transform - Función opcional para transformar la respuesta JSON al tipo T
 * @param options  - Opciones como refreshInterval
 */
export function useLiveData<T>(
  apiUrl: string,
  fallback: T,
  transform: (json: unknown) => T,
  options: UseLiveDataOptions = {}
): UseLiveDataResult<T> {
  const [data, setData] = useState<T>(fallback);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`${apiUrl} → ${res.status}`);
        const json = await res.json();
        if (!isMounted.current) return;

        const transformed = transform(json);
        setData(transformed);
        setIsLive(true);
        setError(false);
        setLastUpdate(new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        console.warn(`[useLiveData] Error en ${apiUrl}:`, err);
        if (isMounted.current) setError(true);
      } finally {
        if (isMounted.current) setIsLoading(false);
      }
    }

    fetchData();

    let interval: ReturnType<typeof setInterval> | null = null;
    if (options.refreshInterval) {
      interval = setInterval(fetchData, options.refreshInterval);
    }

    return () => {
      isMounted.current = false;
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  return { data, isLive, isLoading, lastUpdate, error };
}
