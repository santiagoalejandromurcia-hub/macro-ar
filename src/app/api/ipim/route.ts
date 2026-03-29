/**
 * API Route — Inflación Mayorista (IPIM)
 * Fuente: ArgentinaDatos (https://api.argentinadatos.com)
 * Caché: 1 día
 */
import { NextResponse } from 'next/server';

export const revalidate = 86400;

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
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacionMayorista', {
        next: { revalidate: 86400 },
      }),
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacionMayoristaInteranual', {
        next: { revalidate: 86400 },
      }),
    ]);

    if (!mensualRes.ok) throw new Error(`IPIM mensual error: ${mensualRes.status}`);

    const mensualRaw: ApiItem[] = await mensualRes.json();

    const interanualMap: Record<string, number> = {};
    if (interanualRes.ok) {
      const interanualRaw: ApiItem[] = await interanualRes.json();
      for (const item of interanualRaw) {
        interanualMap[item.fecha] = item.valor;
      }
    }

    const recientes = mensualRaw.slice(-24).map((item) => ({
      date: formatDate(item.fecha),
      mensual: item.valor,
      interanual: interanualMap[item.fecha] ?? null,
    }));

    return NextResponse.json(
      { data: recientes, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' } }
    );
  } catch (error) {
    console.error('[API/ipim]', error);
    return NextResponse.json(
      { error: 'No se pudo obtener datos IPIM' },
      { status: 503 }
    );
  }
}
