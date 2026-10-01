import { emaeData, inflacionData, kpiCards } from '@/data/macroData';

export interface CeldaArchivo {
  id: string;
  label: string;
  value: string;
  period: string;
  source: string;
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
    });
  }

  const ipc = last(inflacionData);
  if (ipc && ipc.mensual != null && ipc.interanual != null) {
    out.push({
      id: 'ipc',
      label: 'IPC',
      value: `${coma(ipc.mensual)}% m/m · ${coma(ipc.interanual)}% i.a.`,
      period: ipc.date,
      source: 'INDEC · inflacionData',
    });
  }
  if (ipc && ipc.nucleo != null) {
    out.push({
      id: 'ipc-nucleo',
      label: 'IPC núcleo',
      value: `${coma(ipc.nucleo)}% m/m`,
      period: ipc.date,
      source: 'INDEC · inflacionData.nucleo',
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
    });
  }

  return out;
}
