/**
 * API Route — Reservas Internacionales BCRA
 * Fuente: BCRA API oficial (https://api.bcra.gob.ar)
 * Variable 1 = Reservas Internacionales del BCRA (en USD millones)
 * Caché: 1 hora
 */
import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1 hora

interface BCRAItem {
  idVariable: number;
  fecha: string;
  valor: number;
}

export async function GET() {
  try {
    // La API del BCRA requiere especificar el ID de la variable y el rango de fechas
    // Variable 1 = Reservas Internacionales
    const fechaDesde = new Date();
    fechaDesde.setFullYear(fechaDesde.getFullYear() - 2);
    const desde = fechaDesde.toISOString().split('T')[0];
    const hasta = new Date().toISOString().split('T')[0];

    const url = `https://api.bcra.gob.ar/estadisticas/v3.0/monetarias/1?desde=${desde}&hasta=${hasta}&limit=50`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) throw new Error(`BCRA API error: ${res.status}`);

    const json = await res.json();
    const items: BCRAItem[] = json.results ?? json.data ?? [];

    // Tomar los últimos 24 registros y formatear
    const recientes = items.slice(-24).map((item) => {
      const d = new Date(item.fecha);
      const mes = d.toLocaleString('es-AR', { month: 'short' });
      const anio = String(d.getFullYear()).slice(2);
      return {
        date: `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${anio}`,
        value: item.valor,
      };
    });

    return NextResponse.json(
      { data: recientes, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' } }
    );
  } catch (error) {
    console.error('[API/reservas]', error);
    return NextResponse.json(
      { error: 'No se pudo obtener datos de reservas del BCRA' },
      { status: 503 }
    );
  }
}
