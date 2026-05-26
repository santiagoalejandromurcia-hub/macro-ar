// ============================================================
// MacroLibre — Hook genérico para consumir /public/data/*.json
// Los gráficos usan esto en vez de importar macroData.ts directo.
// Mientras no hay JSON actualizado → muestra el fallback estático.
// Cuando el cron actualiza → Vercel redeploya → datos frescos.
// ============================================================

'use client';

import { useState, useEffect, useRef } from 'react';

interface UseIndicatorDataResult<T> {
  data: T;
  isLive: boolean;
  updatedAt: string | null;
  source: string | null;
}

/**
 * Consume /data/{indicator}.json desde /public/data/.
 * Si el archivo no existe o falla → usa el fallback estático.
 *
 * @param indicator  - Nombre del archivo sin extensión (ej: 'fiscal', 'emae')
 * @param fallback   - Datos estáticos de macroData.ts (se muestran mientras carga)
 * @param transform  - Extrae el array de datos del JSON { data: [...] }
 */
export function useIndicatorData<T>(
  indicator: string,
  fallback: T,
  transform: (raw: unknown) => T,
): UseIndicatorDataResult<T> {
  const [data, setData]         = useState<T>(fallback);
  const [isLive, setIsLive]     = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [source, setSource]     = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function load() {
      try {
        const res = await fetch(`/data/${indicator}.json`);
        if (!res.ok) return; // archivo no existe aún → usar fallback

        const json = await res.json() as {
          data: unknown;
          updatedAt?: string;
          source?: string;
        };

        if (!json?.data || !mounted.current) return;

        const transformed = transform(json.data);
        setData(transformed);
        setIsLive(true);
        setUpdatedAt(json.updatedAt
          ? new Date(json.updatedAt).toLocaleDateString('es-AR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
            })
          : null,
        );
        setSource(json.source ?? null);
      } catch {
        // Sin datos remotos → seguir con fallback
      }
    }

    load();
    return () => { mounted.current = false; };
  }, [indicator]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLive, updatedAt, source };
}
