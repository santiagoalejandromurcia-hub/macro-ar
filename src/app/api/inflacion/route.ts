/**
 * API Route — Inflación IPC mensual e interanual
 * Fuente: ArgentinaDatos (https://api.argentinadatos.com)
 *   - /v1/finanzas/indices/inflacion          → IPC mensual
 *   - /v1/finanzas/indices/inflacionInteranual → IPC interanual
 * Caché: 1 día (el INDEC publica el IPC una vez por mes)
 */
import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24 horas

interface ApiItem {
  fecha: string;
  valor: number;
}

function formatDate(fechaStr: string): string {
  const d = new Date(fechaStr);
  const mes = d.toLocaleString('es-AR', { month: 'short' });
  const anio = String(d.getFullYear()).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${anio}`;
}

export async function GET() {
  try {
    const [mensualRes, interanualRes] = await Promise.all([
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacion', {
        next: { revalidate: 86400 },
      }),
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual', {
        next: { revalidate: 86400 },
      }),
    ]);

    if (!mensualRes.ok) throw new Error(`Inflacion mensual error: ${mensualRes.status}`);

    const mensualRaw: ApiItem[] = await mensualRes.json();

    // Construir mapa de interanual por fecha
    const interanualMap: Record<string, number> = {};
    if (interanualRes.ok) {
      const interanualRaw: ApiItem[] = await interanualRes.json();
      for (const item of interanualRaw) {
        interanualMap[item.fecha] = item.valor;
      }
    }

    // Últimos 24 meses formateados
    const recientes = mensualRaw.slice(-24).map((item) => ({
      date: formatDate(item.fecha),
      mensual: item.valor,
      interanual: interanualMap[item.fecha] ?? null,
      nucleo: null, // INDEC no publica núcleo en API pública; se puede agregar manualmente
    }));

    return NextResponse.json(
      { data: recientes, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' } }
    );
  } catch (error) {
    console.error('[API/inflacion]', error);
    return NextResponse.json(
      { error: 'No se pudo obtener datos de inflación' },
      { status: 503 }
    );
  }
}
