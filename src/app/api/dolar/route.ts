/**
 * API Route — Cotización del Dólar
 * Fuente: Bluelytics (https://api.bluelytics.com.ar/v2/latest)
 * Caché: 5 minutos en el servidor de Next.js
 */
import { NextResponse } from 'next/server';

export const revalidate = 300; // 5 minutos

export async function GET() {
  try {
    const res = await fetch('https://api.bluelytics.com.ar/v2/latest', {
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`Bluelytics error: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
    });
  } catch (error) {
    console.error('[API/dolar]', error);
    return NextResponse.json(
      { error: 'No se pudo obtener la cotización del dólar' },
      { status: 503 }
    );
  }
}
