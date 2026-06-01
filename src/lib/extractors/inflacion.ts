// ============================================================
// IPC — Inflación mensual e interanual
//
// Fuente 1: ArgentinaDatos /v1/finanzas/indices/ (funciona ✅)
// Fuente 2 (fallback): datos.gob.ar
//
// Series datos.gob.ar VERIFICADAS (actualizadas a 2026):
//   IPC var. mensual Nacional (base dic 2016): 145.3_INGNACUAL_DICI_M_38
//   IPC índice nivel Nacional (base dic 2016): 148.3_INIVELNAL_DICI_M_26
// ============================================================

import { fetchDatosGobAr, fmtMes } from '@/lib/datos-gob-ar';

interface ApiItem { fecha: string; valor: number }

async function tryArgentinaDatos(url: string): Promise<ApiItem[] | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch { return null; }
}

// Series IDs verificados en datos.gob.ar
const IPC_VAR_MENSUAL = '145.3_INGNACUAL_DICI_M_38';  // Variación % mensual directa
const IPC_NIVEL       = '148.3_INIVELNAL_DICI_M_26';  // Nivel índice (para interanual)

export async function fetchInflacion(): Promise<unknown | null> {
  // Intentar ArgentinaDatos primero (finanzas/ endpoints siguen activos)
  const [rawMensual, rawInteranual] = await Promise.all([
    tryArgentinaDatos('https://api.argentinadatos.com/v1/finanzas/indices/inflacion'),
    tryArgentinaDatos('https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual'),
  ]);

  if (rawMensual && rawMensual.length > 0) {
    const interanualMap: Record<string, number> = {};
    (rawInteranual ?? []).forEach((i) => { interanualMap[i.fecha] = i.valor; });

    return rawMensual.slice(-36).map((item) => ({
      date:       fmtMes(item.fecha),
      mensual:    +item.valor.toFixed(2),
      interanual: interanualMap[item.fecha] != null
        ? +interanualMap[item.fecha].toFixed(1)
        : null,
    }));
  }

  // Fallback: datos.gob.ar — variación mensual + índice nivel (para interanual)
  const json = await fetchDatosGobAr(`${IPC_VAR_MENSUAL},${IPC_NIVEL}`, 60);
  if (!json || json.data.length === 0) return null;

  const rows = [...json.data].reverse();

  // Calcular interanual: (nivel_actual / nivel_12_meses_atras) - 1
  return rows
    .filter(([, varM]) => varM !== null)
    .slice(-36)
    .map(([fecha, varMensual], i, arr) => {
      const nivelActual  = arr[i][2] as number | null;
      const nivel12Atras = i >= 12 ? (arr[i - 12][2] as number | null) : null;
      const interanual   = nivelActual && nivel12Atras
        ? +((nivelActual / nivel12Atras - 1) * 100).toFixed(1)
        : null;
      return {
        date:       fmtMes(fecha),
        mensual:    +((varMensual as number) * 100).toFixed(2),
        interanual,
      };
    });
}

export async function fetchInflacionLargoPlazo(): Promise<unknown | null> {
  // Intentar ArgentinaDatos
  const raw = await tryArgentinaDatos(
    'https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual',
  );

  if (raw && raw.length > 0) {
    return raw.map((item) => ({
      year:  item.fecha.slice(0, 7),
      value: +item.valor.toFixed(1),
    }));
  }

  // Fallback: calcular interanual desde el índice nivel de datos.gob.ar
  const json = await fetchDatosGobAr(IPC_NIVEL, 500);
  if (!json || json.data.length === 0) return null;

  const rows = [...json.data].reverse();

  return rows
    .filter(([, v]) => v !== null)
    .map(([fecha, nivel], i, arr) => {
      const nivel12 = i >= 12 ? (arr[i - 12][1] as number | null) : null;
      const interanual = nivel && nivel12
        ? +((nivel as number / nivel12 - 1) * 100).toFixed(1)
        : null;
      return { year: fecha.slice(0, 7), value: interanual };
    })
    .filter((d) => d.value !== null)
    .slice(12); // primeros 12 no tienen interanual
}
