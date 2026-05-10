// ============================================================
// MacroLibre — Cálculo Break-Even Inflacionario
// ============================================================
// BEI = (1 + TIR_nominal)^t / (1 + TIR_real)^t - 1
// Para cada plazo, comparamos la BEI implícita con la inflación
// esperada del REM. Si BEI > REM → mercado "más pesimista" que
// los economistas y conviene CER. Si BEI < REM → conviene tasa fija.
// ============================================================

import type { Bond, ExpectativaREM } from '@/data/breakEven';

// ─── Días hasta vencimiento ───
export function diasHastaVto(vencimientoIso: string, hoy: Date = new Date()): number {
  const vto = new Date(vencimientoIso + 'T00:00:00-03:00');
  const ms = vto.getTime() - hoy.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

// ─── Años hasta vencimiento (decimal) ───
export function aniosHastaVto(vencimientoIso: string, hoy: Date = new Date()): number {
  return diasHastaVto(vencimientoIso, hoy) / 365;
}

// ─── BEI puntual: ───
// (1 + tirNominal)^t / (1 + tirReal)^t - 1, expresada en TEA (%)
export function beiAnual(
  tirNominalPct: number,
  tirRealPct: number,
): number {
  const nominal = 1 + tirNominalPct / 100;
  const real = 1 + tirRealPct / 100;
  return (nominal / real - 1) * 100;
}

// ─── Buckets de plazo ───
// Agrupamos los bonos por horizonte para tener UNA curva ordenada.
export interface Bucket {
  id: string;
  label: string;
  meses: number;       // centro del bucket en meses
  desdeMeses: number;
  hastaMeses: number;
}

export const BUCKETS: Bucket[] = [
  { id: '0-3',   label: '0-3 meses',   meses: 1.5,  desdeMeses: 0,  hastaMeses: 3  },
  { id: '3-6',   label: '3-6 meses',   meses: 4.5,  desdeMeses: 3,  hastaMeses: 6  },
  { id: '6-9',   label: '6-9 meses',   meses: 7.5,  desdeMeses: 6,  hastaMeses: 9  },
  { id: '9-12',  label: '9-12 meses',  meses: 10.5, desdeMeses: 9,  hastaMeses: 12 },
  { id: '12-18', label: '12-18 meses', meses: 15,   desdeMeses: 12, hastaMeses: 18 },
  { id: '18-24', label: '18-24 meses', meses: 21,   desdeMeses: 18, hastaMeses: 24 },
  { id: '24-36', label: '24-36 meses', meses: 30,   desdeMeses: 24, hastaMeses: 36 },
  { id: '36+',   label: '+36 meses',   meses: 48,   desdeMeses: 36, hastaMeses: 999 },
];

export function bucketOf(meses: number): Bucket | null {
  return BUCKETS.find((b) => meses >= b.desdeMeses && meses < b.hastaMeses) ?? null;
}

// ─── Promedio de TIRs en cada bucket ───
// Para cada bucket, agarramos los bonos cuyo plazo cae dentro y promediamos su TIR.
export interface BucketYield {
  bucket: Bucket;
  bonos: Bond[];
  tirPromedio: number | null; // null si no hay bonos en ese bucket
}

export function calcularYieldsPorBucket(bonos: Bond[], hoy: Date = new Date()): BucketYield[] {
  return BUCKETS.map((bucket) => {
    const bonosBucket = bonos.filter((b) => {
      const meses = (diasHastaVto(b.vencimiento, hoy) / 365) * 12;
      return meses >= bucket.desdeMeses && meses < bucket.hastaMeses;
    });
    const tirPromedio =
      bonosBucket.length > 0
        ? bonosBucket.reduce((acc, b) => acc + b.tirAnualPct, 0) / bonosBucket.length
        : null;
    return { bucket, bonos: bonosBucket, tirPromedio };
  });
}

// ─── Curva BEI por bucket (resultado principal) ───
export interface BeiPunto {
  bucket: Bucket;
  tirNominal: number | null;     // % TEA
  tirReal: number | null;        // % TEA real
  beiPct: number | null;         // % TEA inflación implícita por mercado
  remPct: number | null;         // % TEA inflación esperada REM al horizonte
  diferenciaPct: number | null;  // bei - rem (positivo: mercado más pesimista)
  veredicto: 'cer' | 'fija' | 'neutral' | null;
  bonosNominales: Bond[];
  bonosReales: Bond[];
}

// Interpolación lineal de inflación esperada por horizonte en meses.
function interpolarREM(meses: number, rem: ExpectativaREM[]): number | null {
  if (rem.length === 0) return null;
  const sorted = [...rem].sort((a, b) => a.meses - b.meses);
  if (meses <= sorted[0].meses) return sorted[0].inflacionTeaPct;
  if (meses >= sorted[sorted.length - 1].meses) return sorted[sorted.length - 1].inflacionTeaPct;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (meses >= sorted[i].meses && meses <= sorted[i + 1].meses) {
      const t = (meses - sorted[i].meses) / (sorted[i + 1].meses - sorted[i].meses);
      return sorted[i].inflacionTeaPct + t * (sorted[i + 1].inflacionTeaPct - sorted[i].inflacionTeaPct);
    }
  }
  return null;
}

export function construirCurvaBEI(
  bonosNominales: Bond[],
  bonosReales: Bond[],
  rem: ExpectativaREM[],
  hoy: Date = new Date(),
): BeiPunto[] {
  const yieldNominales = calcularYieldsPorBucket(bonosNominales, hoy);
  const yieldReales = calcularYieldsPorBucket(bonosReales, hoy);

  return BUCKETS.map((bucket, i) => {
    const tirNominal = yieldNominales[i].tirPromedio;
    const tirReal = yieldReales[i].tirPromedio;
    const remPct = interpolarREM(bucket.meses, rem);

    let beiPct: number | null = null;
    let diferenciaPct: number | null = null;
    let veredicto: BeiPunto['veredicto'] = null;

    if (tirNominal !== null && tirReal !== null) {
      beiPct = beiAnual(tirNominal, tirReal);
      if (remPct !== null) {
        diferenciaPct = beiPct - remPct;
        if (diferenciaPct > 1.5) veredicto = 'cer';        // mercado descuenta más infl que REM → CER
        else if (diferenciaPct < -1.5) veredicto = 'fija'; // mercado descuenta menos infl que REM → tasa fija
        else veredicto = 'neutral';
      }
    }

    return {
      bucket,
      tirNominal,
      tirReal,
      beiPct,
      remPct,
      diferenciaPct,
      veredicto,
      bonosNominales: yieldNominales[i].bonos,
      bonosReales: yieldReales[i].bonos,
    };
  });
}
