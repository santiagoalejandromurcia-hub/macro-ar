/**
 * API Route — EMAE (Estimador Mensual de Actividad Económica)
 * Fuente: ArgentinaDatos (https://api.argentinadatos.com/v1/indec/emae)
 * Caché: 1 día (el INDEC publica el EMAE una vez por mes)
 */
import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24 horas

interface EmaeItem {
  fecha: string;
  valor: number;
  variacionInteranual?: number;
}

function formatDate(fechaStr: string): string {
  const d = new Date(fechaStr);
  const mes = d.toLocaleString('es-AR', { month: 'short' });
  const anio = String(d.getFullYear()).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${anio}`;
}

export async function GET() {
  try {
    const res = await fetch('https://api.argentinadatos.com/v1/indec/emae', {
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`ArgentinaDatos EMAE error: ${res.status}`);

    const raw: EmaeItem[] = await res.json();

    // Últimos 24 meses formateados
    const recientes = raw.slice(-24).map((item) => ({
      date: formatDate(item.fecha),
      value: item.valor,
      variacionInteranual: item.variacionInteranual ?? null,
    }));

    // El último valor disponible para el KPI
    const ultimo = recientes[recientes.length - 1] ?? null;

    return NextResponse.json(
      { data: recientes, ultimo, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' } }
    );
  } catch (error) {
    console.error('[API/emae]', error);
    return NextResponse.json(
      { error: 'No se pudo obtener datos del EMAE' },
      { status: 503 }
    );
  }
}
