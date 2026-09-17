import { NextResponse } from 'next/server';

export const revalidate = 3600;

function lastFredish(det: { fecha: string; valor: number }[]) {
  return det[0] ?? null;
}

export async function GET() {
  const liveOk = { reservas: false, mulc: false, itcrm: false, tc: false };
  let reservas: { fecha: string; valor: number } | null = null;
  let tc: { fecha: string; valor: number } | null = null;
  let mulc: { fecha: string; arsM: number; usdM: number | null } | null = null;
  let itcrm: { fecha: string; valor: number } | null = null;
  const mulcHist: { fecha: string; usdM: number }[] = [];

  try {
    const res = await fetch(
      'https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/1?limit=5',
      { next: { revalidate: 3600 }, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12_000) },
    );
    if (res.ok) {
      const j = await res.json();
      const d = lastFredish(j.results?.[0]?.detalle ?? []);
      if (d) {
        liveOk.reservas = true;
        reservas = d;
      }
    }
  } catch { /* */ }

  try {
    const [tcRes, fxRes] = await Promise.all([
      fetch('https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/5?limit=40', {
        next: { revalidate: 3600 }, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12_000),
      }),
      fetch('https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/47?desde=2026-08-01&limit=40', {
        next: { revalidate: 3600 }, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12_000),
      }),
    ]);
    const tcMap = new Map<string, number>();
    if (tcRes.ok) {
      const j = await tcRes.json();
      const det: { fecha: string; valor: number }[] = j.results?.[0]?.detalle ?? [];
      if (det[0]) {
        liveOk.tc = true;
        tc = det[0];
      }
      for (const x of det) tcMap.set(x.fecha, x.valor);
    }
    if (fxRes.ok) {
      const j = await fxRes.json();
      const det: { fecha: string; valor: number }[] = j.results?.[0]?.detalle ?? [];
      if (det[0]) {
        liveOk.mulc = true;
        const arsM = det[0].valor;
        const px = tcMap.get(det[0].fecha) ?? tc?.valor ?? null;
        mulc = { fecha: det[0].fecha, arsM, usdM: px && px > 0 ? Math.round((arsM / px) * 10) / 10 : null };
      }
      for (const x of det) {
        const px = tcMap.get(x.fecha);
        if (px && px > 0) mulcHist.push({ fecha: x.fecha, usdM: Math.round((x.valor / px) * 10) / 10 });
      }
    }
  } catch { /* */ }

  try {
    const res = await fetch('https://www.bcra.gob.ar/archivos/PublicacionesEstadisticas/itcrm.txt', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) {
      const text = await res.text();
      const re = /Date\.UTC\((\d+),(\d+),(\d+)\),([0-9.]+)/g;
      let m: RegExpExecArray | null;
      let last: { fecha: string; valor: number } | null = null;
      while ((m = re.exec(text))) {
        const y = Number(m[1]);
        const mo = Number(m[2]) + 1;
        const d = Number(m[3]);
        last = {
          fecha: `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
          valor: Number(m[4]),
        };
      }
      if (last) {
        liveOk.itcrm = true;
        itcrm = last;
      }
    }
  } catch { /* */ }

  return NextResponse.json(
    { asOf: new Date().toISOString(), liveOk, reservas, tc, mulc, mulcHist, itcrm },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } },
  );
}
