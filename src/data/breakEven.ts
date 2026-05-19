// ============================================================
// MacroLibre — Break-Even Inflacionario (BEI)
// ============================================================
// Curvas CER (real) vs LECAP/BONTE TF (nominal) para calcular
// la inflación implícita por plazo y compararla con el REM.
//
// IMPORTANTE — datos editables manualmente:
// Las TIRs son APROXIMACIONES razonables del mercado al
// 10-may-2026. Para precisión, reemplazá `tirAnualPct` con el
// valor exacto que veas en IAMC/Bolsar/Rava ese día.
//
// El precio se mantiene como referencia (el cálculo no lo usa
// directamente; usa la TIR). Cuando reemplaces TIRs, no hace
// falta tocar precios.
// ============================================================

export type BondType = 'lecap' | 'bonte_tf' | 'lecer' | 'boncer';

export interface Bond {
  ticker: string;
  tipo: BondType;
  vencimiento: string;       // ISO YYYY-MM-DD
  precioArs: number;         // referencia visual (último cierre)
  tirAnualPct: number;       // TEA — nominal para lecap/bonte_tf, REAL para lecer/boncer
  descripcion: string;
}

// ─── Fecha de actualización del snapshot ───
export const ACTUALIZADO_AL = '2026-05-10';
export const FUENTE_BONOS = 'Bolsar / IAMC';

// ─── Curva NOMINAL (LECAP + Bontes TF) ───
// Son tasa fija sin ajuste. La TIR aquí es nominal anual (TEA).
// Aproximación: TEM declinante 1.55%-1.85% según plazo.
export const bonosNominales: Bond[] = [
  { ticker: 'S15Y6', tipo: 'lecap',    vencimiento: '2026-05-15', precioArs: 104.95,  tirAnualPct: 24.0, descripcion: 'LECAP vto 15-may-26' },
  { ticker: 'S29Y6', tipo: 'lecap',    vencimiento: '2026-05-29', precioArs: 130.70,  tirAnualPct: 22.5, descripcion: 'LECAP vto 29-may-26' },
  { ticker: 'S12J6', tipo: 'lecap',    vencimiento: '2026-06-12', precioArs: 100.93,  tirAnualPct: 22.0, descripcion: 'LECAP vto 12-jun-26' },
  { ticker: 'T30J6', tipo: 'bonte_tf', vencimiento: '2026-06-30', precioArs: 140.57,  tirAnualPct: 22.0, descripcion: 'BONTE cap vto 30-jun-26' },
  { ticker: 'S17L6', tipo: 'lecap',    vencimiento: '2026-07-17', precioArs: 103.40,  tirAnualPct: 21.5, descripcion: 'LECAP vto 17-jul-26' },
  { ticker: 'S31L6', tipo: 'lecap',    vencimiento: '2026-07-31', precioArs: 111.81,  tirAnualPct: 21.2, descripcion: 'LECAP vto 31-jul-26' },
  { ticker: 'S14G6', tipo: 'lecap',    vencimiento: '2026-08-14', precioArs: 101.55,  tirAnualPct: 21.0, descripcion: 'LECAP vto 14-ago-26' },
  { ticker: 'S31G6', tipo: 'lecap',    vencimiento: '2026-08-31', precioArs: 118.40,  tirAnualPct: 20.8, descripcion: 'LECAP vto 31-ago-26' },
  { ticker: 'S30S6', tipo: 'lecap',    vencimiento: '2026-09-30', precioArs: 107.15,  tirAnualPct: 20.5, descripcion: 'LECAP vto 30-sep-26' },
  { ticker: 'TO26',  tipo: 'bonte_tf', vencimiento: '2026-10-17', precioArs: 96.99,   tirAnualPct: 20.5, descripcion: 'BONTE 15.5% vto 17-oct-26' },
  { ticker: 'S30O6', tipo: 'lecap',    vencimiento: '2026-10-30', precioArs: 121.00,  tirAnualPct: 20.2, descripcion: 'LECAP vto 30-oct-26' },
  { ticker: 'S30N6', tipo: 'lecap',    vencimiento: '2026-11-30', precioArs: 114.10,  tirAnualPct: 20.0, descripcion: 'LECAP vto 30-nov-26' },
  { ticker: 'T15E7', tipo: 'bonte_tf', vencimiento: '2027-01-15', precioArs: 136.60,  tirAnualPct: 19.8, descripcion: 'BONTE cap vto 15-ene-27' },
  { ticker: 'T30A7', tipo: 'bonte_tf', vencimiento: '2027-04-30', precioArs: 123.84,  tirAnualPct: 19.5, descripcion: 'BONTE cap vto 30-abr-27' },
  { ticker: 'T31Y7', tipo: 'bonte_tf', vencimiento: '2027-05-31', precioArs: 116.90,  tirAnualPct: 19.3, descripcion: 'BONTE cap vto 31-may-27' },
  { ticker: 'T30J7', tipo: 'bonte_tf', vencimiento: '2027-06-30', precioArs: 120.50,  tirAnualPct: 19.2, descripcion: 'BONTE cap vto 30-jun-27' },
  { ticker: 'TY30P', tipo: 'bonte_tf', vencimiento: '2030-05-30', precioArs: 120.10,  tirAnualPct: 18.0, descripcion: 'BONTE TF vto 30-may-30' },
];

// ─── Curva REAL (LECER + BONCER) ───
// Ajustan por CER. La TIR aquí es REAL anual (sobre VN ajustado).
// Aproximación: pendiente positiva 3% → 9% según plazo.
export const bonosReales: Bond[] = [
  { ticker: 'X15Y6',  tipo: 'lecer',   vencimiento: '2026-05-15', precioArs: 107.80,  tirAnualPct: 2.5, descripcion: 'LECER vto 15-may-26' },
  { ticker: 'X29Y6',  tipo: 'lecer',   vencimiento: '2026-05-29', precioArs: 116.85,  tirAnualPct: 3.0, descripcion: 'LECER vto 29-may-26' },
  { ticker: 'TZX26',  tipo: 'boncer',  vencimiento: '2026-06-30', precioArs: 382.55,  tirAnualPct: 3.5, descripcion: 'BONCER cero cupón vto 30-jun-26' },
  { ticker: 'X31L6',  tipo: 'lecer',   vencimiento: '2026-07-31', precioArs: 112.30,  tirAnualPct: 4.5, descripcion: 'LECER vto 31-jul-26' },
  { ticker: 'X30S6',  tipo: 'lecer',   vencimiento: '2026-09-30', precioArs: 107.20,  tirAnualPct: 5.0, descripcion: 'LECER vto 30-sep-26' },
  { ticker: 'TZXO6',  tipo: 'boncer',  vencimiento: '2026-10-30', precioArs: 159.15,  tirAnualPct: 5.5, descripcion: 'BONCER vto 30-oct-26' },
  { ticker: 'TX26',   tipo: 'boncer',  vencimiento: '2026-11-09', precioArs: 682.70,  tirAnualPct: 5.7, descripcion: 'BONTE CER 2% vto 09-nov-26' },
  { ticker: 'X30N6',  tipo: 'lecer',   vencimiento: '2026-11-30', precioArs: 115.40,  tirAnualPct: 5.8, descripcion: 'LECER vto 30-nov-26' },
  { ticker: 'TZXD6',  tipo: 'boncer',  vencimiento: '2026-12-15', precioArs: 280.10,  tirAnualPct: 6.0, descripcion: 'BONCER vto 15-dic-26' },
  { ticker: 'TZXM7',  tipo: 'boncer',  vencimiento: '2027-03-31', precioArs: 209.40,  tirAnualPct: 6.5, descripcion: 'BONCER vto 31-mar-27' },
  { ticker: 'TZXA7',  tipo: 'boncer',  vencimiento: '2027-04-30', precioArs: 115.25,  tirAnualPct: 6.8, descripcion: 'BONCER vto 30-abr-27' },
  { ticker: 'TZXY7',  tipo: 'boncer',  vencimiento: '2027-05-31', precioArs: 112.30,  tirAnualPct: 7.0, descripcion: 'BONCER vto 31-may-27' },
  { ticker: 'TZX27',  tipo: 'boncer',  vencimiento: '2027-06-30', precioArs: 368.50,  tirAnualPct: 7.2, descripcion: 'BONCER vto 30-jun-27' },
  { ticker: 'TZXS7',  tipo: 'boncer',  vencimiento: '2027-09-30', precioArs: 99.20,   tirAnualPct: 7.5, descripcion: 'BONCER vto 30-sep-27' },
  { ticker: 'TZXD7',  tipo: 'boncer',  vencimiento: '2027-12-15', precioArs: 255.40,  tirAnualPct: 7.8, descripcion: 'BONCER vto 15-dic-27' },
  { ticker: 'TZXM8',  tipo: 'boncer',  vencimiento: '2028-03-31', precioArs: 94.00,   tirAnualPct: 8.0, descripcion: 'BONCER vto 31-mar-28' },
  { ticker: 'TZX28',  tipo: 'boncer',  vencimiento: '2028-06-30', precioArs: 319.65,  tirAnualPct: 8.2, descripcion: 'BONCER vto 30-jun-28' },
  { ticker: 'TZXS8',  tipo: 'boncer',  vencimiento: '2028-09-30', precioArs: 85.92,   tirAnualPct: 8.5, descripcion: 'BONCER vto 30-sep-28' },
  { ticker: 'TX28',   tipo: 'boncer',  vencimiento: '2028-11-09', precioArs: 1622.00, tirAnualPct: 8.6, descripcion: 'BONTE CER 2.25% vto 09-nov-28' },
  { ticker: 'TZXM9',  tipo: 'boncer',  vencimiento: '2029-03-31', precioArs: 82.30,   tirAnualPct: 8.8, descripcion: 'BONCER vto 31-mar-29' },
  { ticker: 'TX31',   tipo: 'boncer',  vencimiento: '2031-11-30', precioArs: 1388.00, tirAnualPct: 9.5, descripcion: 'BONTE CER 2.50% vto 30-nov-31' },
];

// ─── Inflación esperada — REM BCRA ───
// Snapshot del último relevamiento. Acumulado interanual hacia adelante.
// (Reemplazá con los valores de la última publicación BCRA cuando salga.)
export interface ExpectativaREM {
  meses: number;            // horizonte en meses desde hoy
  inflacionAcumPct: number; // inflación acumulada hasta ese horizonte
  inflacionTeaPct: number;  // equivalente anualizado
}

export const remEsperado: ExpectativaREM[] = [
  { meses: 1,  inflacionAcumPct: 3.2,  inflacionTeaPct: 45.8 },
  { meses: 3,  inflacionAcumPct: 8.4,  inflacionTeaPct: 38.2 },
  { meses: 6,  inflacionAcumPct: 14.5, inflacionTeaPct: 31.5 },
  { meses: 12, inflacionAcumPct: 23.0, inflacionTeaPct: 23.0 },
  { meses: 18, inflacionAcumPct: 33.5, inflacionTeaPct: 21.6 },
  { meses: 24, inflacionAcumPct: 43.0, inflacionTeaPct: 19.6 },
  { meses: 36, inflacionAcumPct: 60.0, inflacionTeaPct: 17.0 },
];

// ─── Market Inflation Expectations — serie mensual ───
// Fuente: BCRA REM + INDEC IPC + BEI implícita de curva CER vs nominal
// Actualizado al 17-may-2026
export interface InflacionMensual {
  mes: string;           // etiqueta del eje
  headline: number | null;   // IPC mensual real (INDEC)
  rem: number | null;        // Mediana REM BCRA (expectativa mensual)
  bei: number | null;        // Break-even implícito de bonos (proyección)
  esProyeccion?: boolean;    // true = futuro / proyectado
}

export const inflacionMensualSerie: InflacionMensual[] = [
  // ── Datos históricos reales (INDEC) ──
  { mes: 'Ene-25', headline: 2.2, rem: 2.3, bei: null },
  { mes: 'Feb-25', headline: 2.4, rem: 2.3, bei: null },
  { mes: 'Mar-25', headline: 3.7, rem: 2.6, bei: null },
  { mes: 'Abr-25', headline: 2.8, rem: 3.2, bei: null },
  { mes: 'May-25', headline: 1.5, rem: 2.1, bei: null },
  { mes: 'Jun-25', headline: 1.6, rem: 1.8, bei: null },
  { mes: 'Jul-25', headline: 1.9, rem: 1.8, bei: null },
  { mes: 'Ago-25', headline: 1.9, rem: 1.9, bei: null },
  { mes: 'Sep-25', headline: 2.1, rem: 1.9, bei: null },
  { mes: 'Oct-25', headline: 2.2, rem: 2.1, bei: null },
  { mes: 'Nov-25', headline: 2.1, rem: 2.1, bei: null },
  { mes: 'Dic-25', headline: 2.8, rem: 2.1, bei: null },
  { mes: 'Ene-26', headline: 2.9, rem: 2.3, bei: null },
  { mes: 'Feb-26', headline: 2.9, rem: 2.4, bei: null },
  { mes: 'Mar-26', headline: 3.4, rem: 2.7, bei: null },
  // ── Último dato real + inicio proyección ──
  { mes: 'Abr-26', headline: 2.5, rem: 2.5, bei: 2.5 },
  // ── Proyecciones (BEI + REM forward) ──
  { mes: 'May-26', headline: null, rem: 2.2, bei: 2.1, esProyeccion: true },
  { mes: 'Jun-26', headline: null, rem: 1.9, bei: 1.9, esProyeccion: true },
  { mes: 'Jul-26', headline: null, rem: 1.9, bei: 1.8, esProyeccion: true },
  { mes: 'Ago-26', headline: null, rem: 1.8, bei: 1.7, esProyeccion: true },
  { mes: 'Sep-26', headline: null, rem: 1.7, bei: 1.5, esProyeccion: true },
  { mes: 'Oct-26', headline: null, rem: 1.5, bei: 1.6, esProyeccion: true },
  { mes: 'Nov-26', headline: null, rem: null, bei: 1.7, esProyeccion: true },
  { mes: 'Dic-26', headline: null, rem: null, bei: 1.9, esProyeccion: true },
  { mes: 'Ene-27', headline: null, rem: null, bei: 2.0, esProyeccion: true },
];
