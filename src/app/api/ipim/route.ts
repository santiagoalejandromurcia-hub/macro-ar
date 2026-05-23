/**
 * API Route — Inflación Mayorista (IPIM)
 * Fuente primaria:  ArgentinaDatos v2
 * Fuente fallback:  ArgentinaDatos v1 (múltiples rutas probadas)
 * Fallback final:   datos estáticos de macroData.ts
 * Caché: 1 día
 */
import { NextResponse } from 'next/server';
import { inflacionData } from '@/data/macroData';

export const revalidate = 86400;

interface ApiItem {
  fecha: string;
  valor: number;
}

function formatDate(fechaStr: string): string {
  const d = new Date(fechaStr);
  const mes = d.toLocaleString('es-AR', { month: 'short' });
  const anio = String(d.getFullYear()).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} '${anio}`;
}

async function tryFetch(url: string): Promise<ApiItem[] | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data?.data ?? null);
  } catch {
    return null;
  }
}

export async function GET() {
  // Endpoints mensual en orden de preferencia
  const MENSUAL_ENDPOINTS = [
    'https://api.argentinadatos.com/v2/finanzas/indices/inflacionMayorista',
    'https://api.argentinadatos.com/v1/finanzas/indices/inflacionMayorista',
    'https://api.argentinadatos.com/v2/indec/ipim',
    'https://api.argentinadatos.com/v1/indec/ipim',
  ];

  const INTERANUAL_ENDPOINTS = [
    'https://api.argentinadatos.com/v2/finanzas/indices/inflacionMayoristaInteranual',
    'https://api.argentinadatos.com/v1/finanzas/indices/inflacionMayoristaInteranual',
  ];

  // Intentar obtener datos mensuales
  let mensualRaw: ApiItem[] | null = null;
  for (const url of MENSUAL_ENDPOINTS) {
    mensualRaw = await tryFetch(url);
    if (mensualRaw && mensualRaw.length > 0) break;
  }

  // Fallback a datos estáticos si todos los endpoints fallan
  if (!mensualRaw || mensualRaw.length === 0) {
    console.warn('[API/ipim] Todos los endpoints externos fallaron, usando datos estáticos');
    // Derivar IPIM desde datos de inflación general como proxy
    const fallback = inflacionData.slice(-24).map((d) => ({
      date: d.date,
      mensual: d.mensual ?? 0,
      interanual: d.interanual ?? null,
    }));
    return NextResponse.json(
      { data: fallback, isStatic: true, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } }
    );
  }

  // Intentar datos interanuales (opcional, no bloquea)
  let interanualMap: Record<string, number> = {};
  for (const url of INTERANUAL_ENDPOINTS) {
    const data = await tryFetch(url);
    if (data && data.length > 0) {
      for (const item of data) interanualMap[item.fecha] = item.valor;
      break;
    }
  }

  const recientes = mensualRaw.slice(-24).map((item) => ({
    date:       formatDate(item.fecha),
    mensual:    item.valor,
    interanual: interanualMap[item.fecha] ?? null,
  }));

  return NextResponse.json(
    { data: recientes, isStatic: false, updatedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' } }
  );
}
