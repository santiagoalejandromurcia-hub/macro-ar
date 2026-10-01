import { emaeData, inflacionData, kpiCards } from '@/data/macroData';

export type Tono = 'up' | 'down' | null;

export interface CeldaArchivo {
  id: string;
  label: string;
  value: string;
  period: string;
  source: string;
  /** Signo del último cambio de la propia serie. null si no hay punto anterior. */
  tono: Tono;
}

export function tonoDe(delta: number | null | undefined): Tono {
  if (delta == null || !Number.isFinite(delta) || delta === 0) return null;
  return delta > 0 ? 'up' : 'down';
}

function last<T>(rows: readonly T[]): T | undefined {
  return rows.length > 0 ? rows[rows.length - 1] : undefined;
}

function coma(n: number, digits = 1): string {
  return n.toLocaleString('es-AR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** Series que el repo solo tiene en archivo. El período es el del último punto, nunca “hoy”. */
export function celdasArchivo(): CeldaArchivo[] {
  const out: CeldaArchivo[] = [];

  const fiscal = kpiCards.find((k) => k.id === 'superavit');
  if (fiscal?.value && fiscal.updatedAt) {
    out.push({
      id: 'fiscal',
      label: 'Resultado fiscal',
      value: `${fiscal.value.replace('.', ',')} PIB`,
      period: `acum. ${fiscal.updatedAt} · ${fiscal.changeLabel}`,
      source: fiscal.source ?? 'MECON',
      tono: null,
    });
  }

  const ipc = last(inflacionData);
  const ipcPrev = inflacionData.length >= 2 ? inflacionData[inflacionData.length - 2] : undefined;
  if (ipc && ipc.mensual != null && ipc.interanual != null) {
    out.push({
      id: 'ipc',
      label: 'IPC',
      value: `${coma(ipc.mensual)}% m/m · ${coma(ipc.interanual)}% i.a.`,
      period: ipc.date,
      source: 'INDEC · inflacionData',
      tono: ipcPrev && ipcPrev.mensual != null ? tonoDe(ipc.mensual - ipcPrev.mensual) : null,
    });
  }
  if (ipc && ipc.nucleo != null) {
    out.push({
      id: 'ipc-nucleo',
      label: 'IPC núcleo',
      value: `${coma(ipc.nucleo)}% m/m`,
      period: ipc.date,
      source: 'INDEC · inflacionData.nucleo',
      tono: ipcPrev && ipcPrev.nucleo != null ? tonoDe(ipc.nucleo - ipcPrev.nucleo) : null,
    });
  }

  const emaeKpi = kpiCards.find((k) => k.id === 'emae');
  const emae = last(emaeData);
  if (emaeKpi?.value && emae?.date && emaeKpi.updatedAt === emae.date) {
    const mm = coma(emaeKpi.change);
    out.push({
      id: 'emae',
      label: 'EMAE',
      value: `${mm}% m/m s.e. · ${emaeKpi.value.replace('.', ',')} i.a.`,
      period: emae.date,
      source: emaeKpi.source ?? 'INDEC',
      tono: tonoDe(emaeKpi.change),
    });
  }

  return out;
}
