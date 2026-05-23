/**
 * API Route — EMAE (Estimador Mensual de Actividad Económica)
 * Fuente primaria:  ArgentinaDatos v2 (https://api.argentinadatos.com/v2/indec/emae)
 * Fuente fallback:  ArgentinaDatos v1 (URL anterior)
 * Fallback final:   datos estáticos de macroData.ts
 * Caché: 1 día (INDEC publica el EMAE una vez por mes)
 */
import { NextResponse } from 'next/server';
import { emaeData } from '@/data/macroData';

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
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} '${anio}`;
}

async function tryFetch(url: string): Promise<EmaeItem[] | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    // La API puede devolver array directamente o { data: [...] }
    return Array.isArray(data) ? data : (data?.data ?? null);
  } catch {
    return null;
  }
}

export async function GET() {
  // Intentar endpoints en orden (v2 → v1 → fallback estático)
  const ENDPOINTS = [
    'https://api.argentinadatos.com/v2/indec/emae',
    'https://api.argentinadatos.com/v1/indec/emae',
    'https://api.argentinadatos.com/v1/indec/emae/variacion',
  ];

  let raw: EmaeItem[] | null = null;
  for (const url of ENDPOINTS) {
    raw = await tryFetch(url);
    if (raw && raw.length > 0) break;
  }

  // Si ningún endpoint externo funciona, usar datos estáticos
  if (!raw || raw.length === 0) {
    console.warn('[API/emae] Todos los endpoints externos fallaron, usando datos estáticos');
    return NextResponse.json(
      { data: emaeData, ultimo: emaeData[emaeData.length - 1] ?? null, isStatic: true, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } }
    );
  }

  const recientes = raw.slice(-24).map((item) => ({
    date:                formatDate(item.fecha),
    value:               item.valor,
    variacionInteranual: item.variacionInteranual ?? null,
  }));

  const ultimo = recientes[recientes.length - 1] ?? null;

  return NextResponse.json(
    { data: recientes, ultimo, isStatic: false, updatedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' } }
  );
}
