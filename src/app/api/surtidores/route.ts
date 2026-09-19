/**
 * Precios YPF CABA — Surtidores.com.ar
 * Si el scrape falla, devolvemos el último punto estático.
 */
import { NextResponse } from 'next/server';
import { parseSurtidoresHtml } from '@/lib/parseSurtidores';
import { ypfCaba, YPF_CABA_FUENTE, YPF_CABA_URL } from '@/data/combustibles';

export const revalidate = 3600;

export async function GET() {
  const fallback = ypfCaba[ypfCaba.length - 1];
  try {
    const res = await fetch(YPF_CABA_URL, {
      headers: { 'User-Agent': 'MacroLibre/1.0 (+https://macrolibre.com)' },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const html = await res.text();
      const parsed = parseSurtidoresHtml(html);
      if (parsed) {
        return NextResponse.json({
          ...parsed,
          source: YPF_CABA_FUENTE,
          isLive: true,
        });
      }
    }
  } catch { /* fallback */ }

  return NextResponse.json({
    year: 2026,
    mes: fallback.mes,
    super: fallback.super,
    premium: fallback.premium,
    gasoil: fallback.gasoil,
    euro: fallback.euro,
    source: YPF_CABA_FUENTE,
    isLive: false,
  });
}
