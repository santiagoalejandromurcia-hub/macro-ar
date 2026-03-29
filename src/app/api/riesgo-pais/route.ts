/**
 * API Route — Riesgo País (EMBI+)
 * Fuente: ArgentinaDatos (https://api.argentinadatos.com)
 * Caché: 10 minutos en el servidor de Next.js
 */
import { NextResponse } from 'next/server';

export const revalidate = 600; // 10 minutos

export async function GET() {
  try {
    // Obtener el último valor
    const [ultimoRes, histRes] = await Promise.all([
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo', {
        next: { revalidate: 600 },
      }),
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais', {
        next: { revalidate: 600 },
      }),
    ]);

    if (!ultimoRes.ok) throw new Error(`ArgentinaDatos error: ${ultimoRes.status}`);

    const ultimo = await ultimoRes.json();
    let anterior = null;

    if (histRes.ok) {
      const hist = await histRes.json();
      if (Array.isArray(hist) && hist.length >= 2) {
        anterior = hist[hist.length - 2];
      }
    }

    return NextResponse.json(
      { ultimo, anterior },
      { headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=120' } }
    );
  } catch (error) {
    console.error('[API/riesgo-pais]', error);
    return NextResponse.json(
      { error: 'No se pudo obtener el riesgo país' },
      { status: 503 }
    );
  }
}
