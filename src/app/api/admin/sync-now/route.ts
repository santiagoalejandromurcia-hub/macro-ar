// ============================================================
// MacroLibre — Trigger manual de actualización
// Usalo cuando el INDEC o el Ministerio publican un PDF nuevo
// y querés actualizar un indicador puntual sin esperar el cron.
//
// Uso: GET /api/admin/sync-now?indicator=fiscal&secret=TU_SECRET
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getRuleById, IndicatorId } from '@/lib/publication-calendar';
import { updateDataFile } from '@/lib/github-updater';
import { fetchInflacion } from '@/lib/extractors/inflacion';
import { fetchEmae } from '@/lib/extractors/emae';
import { fetchReservas } from '@/lib/extractors/reservas';
import { fetchRiesgoPais } from '@/lib/extractors/riesgo-pais';
import { fetchTrade } from '@/lib/extractors/trade';
import { fetchSalario } from '@/lib/extractors/salario';
import { fetchPobreza } from '@/lib/extractors/pobreza';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const secret    = req.nextUrl.searchParams.get('secret');
  const indicator = req.nextUrl.searchParams.get('indicator') as IndicatorId | null;

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!indicator) {
    return NextResponse.json({ error: 'Falta el parámetro ?indicator=' }, { status: 400 });
  }

  const rule = getRuleById(indicator);
  if (!rule) {
    return NextResponse.json({ error: `Indicador desconocido: ${indicator}` }, { status: 400 });
  }

  if (rule.source === 'manual') {
    return NextResponse.json({
      message: `${indicator} requiere subida manual de PDF. Usá el endpoint /api/admin/upload-pdf.`,
    }, { status: 422 });
  }

  try {
    let data: unknown = null;

    switch (indicator) {
      case 'inflacion': data = await fetchInflacion(); break;
      case 'emae':      data = await fetchEmae();      break;
      case 'reservas':  data = await fetchReservas();  break;
      case 'riesgo-pais': data = await fetchRiesgoPais(); break;
      case 'trade':     data = await fetchTrade();     break;
      case 'salario':   data = await fetchSalario();   break;
      case 'pobreza':   data = await fetchPobreza();   break;
      default:
        return NextResponse.json({ error: `Sin extractor para ${indicator}` }, { status: 422 });
    }

    if (!data) {
      return NextResponse.json({ error: `La fuente no devolvió datos para ${indicator}` }, { status: 502 });
    }

    const result = await updateDataFile(indicator, {
      updatedAt: new Date().toISOString(),
      source:    rule.label,
      data,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      indicator,
      label:     rule.label,
      updatedAt: new Date().toISOString(),
      sha:       result.sha,
      message:   '✅ Vercel redeploya en ~1 minuto con los datos nuevos.',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
