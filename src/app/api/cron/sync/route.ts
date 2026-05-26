// ============================================================
// MacroLibre — Cron de actualización automática
// Vercel llama a esta ruta según el schedule de vercel.json
// Chequea el calendario y actualiza solo los indicadores del día
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getIndicatorsDueToday, IndicatorId } from '@/lib/publication-calendar';
import { updateDataFile } from '@/lib/github-updater';
import { fetchInflacion, fetchInflacionLargoPlazo } from '@/lib/extractors/inflacion';
import { fetchEmae, fetchEmaeLargoPlazo } from '@/lib/extractors/emae';
import { fetchReservas } from '@/lib/extractors/reservas';
import { fetchRiesgoPais } from '@/lib/extractors/riesgo-pais';
import { fetchTrade } from '@/lib/extractors/trade';
import { fetchSalario } from '@/lib/extractors/salario';
import { fetchPobreza } from '@/lib/extractors/pobreza';

export const dynamic  = 'force-dynamic';
export const maxDuration = 30; // segundos — máximo Hobby plan

// ── Dispatcher: mapea ID → función extractora ──────────────

async function runExtractor(id: IndicatorId): Promise<{ data: unknown; files: string[] } | null> {
  switch (id) {
    case 'inflacion': {
      const [mensual, largoPlazo] = await Promise.all([
        fetchInflacion(),
        fetchInflacionLargoPlazo(),
      ]);
      if (!mensual) return null;
      return {
        data: mensual,
        files: ['inflacion', largoPlazo ? 'inflacion-largo-plazo' : ''].filter(Boolean),
      };
    }

    case 'ipim': {
      // IPIM sale junto al IPC pero de endpoint diferente
      try {
        const res = await fetch(
          'https://api.argentinadatos.com/v1/finanzas/indices/inflacionMayorista',
          { cache: 'no-store' },
        );
        if (!res.ok) return null;
        const raw = await res.json() as { fecha: string; valor: number }[];
        const data = raw.slice(-36).map((i) => ({
          date:    fmtDate(i.fecha),
          mensual: i.valor,
        }));
        return { data, files: ['ipim'] };
      } catch { return null; }
    }

    case 'emae': {
      const [emae, largo] = await Promise.all([fetchEmae(), fetchEmaeLargoPlazo()]);
      if (!emae) return null;
      return {
        data: emae,
        files: ['emae', largo ? 'emae-largo-plazo' : ''].filter(Boolean),
      };
    }

    case 'reservas': {
      const data = await fetchReservas();
      if (!data) return null;
      return { data, files: ['reservas'] };
    }

    case 'riesgo-pais': {
      const data = await fetchRiesgoPais();
      if (!data) return null;
      return { data, files: ['riesgo-pais'] };
    }

    case 'trade': {
      const data = await fetchTrade();
      if (!data) return null;
      return { data, files: ['trade'] };
    }

    case 'salario': {
      const data = await fetchSalario();
      if (!data) return null;
      return { data, files: ['salario'] };
    }

    case 'pobreza': {
      const data = await fetchPobreza();
      if (!data) return null;
      return { data, files: ['pobreza'] };
    }

    // PBI, fiscal, arca, deuda, tcr → requieren PDF manual
    default:
      return null;
  }
}

function fmtDate(fechaStr: string): string {
  const d = new Date(fechaStr);
  const mes = d.toLocaleString('es-AR', { month: 'short' });
  const anio = String(d.getFullYear()).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} '${anio}`;
}

// ── Handler principal ──────────────────────────────────────

export async function GET(req: NextRequest) {
  // Vercel Cron envía el header `authorization: Bearer CRON_SECRET`
  // También aceptamos ?secret= para tests manuales
  const authHeader = req.headers.get('authorization');
  const secret     = req.nextUrl.searchParams.get('secret');
  const isVercel   = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isManual   = secret === process.env.CRON_SECRET;

  if (!isVercel && !isManual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date();
  const dueToday = getIndicatorsDueToday();

  if (dueToday.length === 0) {
    return NextResponse.json({
      message: 'Sin publicaciones programadas para hoy',
      date: today.toLocaleDateString('es-AR'),
    });
  }

  const results: Record<string, string> = {};

  for (const rule of dueToday) {
    if (rule.source === 'manual') {
      results[rule.id] = '⏭ manual — requiere PDF';
      continue;
    }

    try {
      const extracted = await runExtractor(rule.id);
      if (!extracted) {
        results[rule.id] = '❌ sin datos (API no responde)';
        continue;
      }

      // Guardar cada archivo que devuelva el extractor
      const filesToWrite = extracted.files.length > 0 ? extracted.files : [rule.id];
      for (const file of filesToWrite) {
        await updateDataFile(file, {
          updatedAt: today.toISOString(),
          source:    rule.label,
          data:      file === rule.id ? extracted.data : extracted.data,
        });
      }
      results[rule.id] = `✅ actualizado (${filesToWrite.join(', ')})`;
    } catch (err) {
      results[rule.id] = `❌ error: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  return NextResponse.json({
    date:    today.toISOString(),
    updated: Object.values(results).filter((v) => v.startsWith('✅')).length,
    results,
  });
}
