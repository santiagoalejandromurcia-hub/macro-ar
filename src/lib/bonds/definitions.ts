// ============================================================
// Definiciones de Bonos Soberanos Argentinos elegibles para EMBI
// Fuente: Prospectos oficiales SEC / ley NY (Exchange Offer 2020)
//
// EMBI Global Diversified (EMBIGD) — criterios JP Morgan:
//   • Ley extranjera (NY / UK)
//   • Monto outstanding ≥ USD 500 M
//   • Plazo residual ≥ 2.5 años (< 6 meses → sale)
//
// Nota: Argentina está en EMBIGD desde oct 2025 (salió del EMBI+
// porque los bonos de la reestructuración 2020 superaron 5 años).
// ============================================================

export interface CashFlow {
  date: Date;       // Fecha de pago
  coupon: number;   // Cupón en USD por cada 100 de VN original
  principal: number; // Amortización en USD por cada 100 de VN original
}

export interface BondDef {
  ticker: string;      // Ticker data912 sufijo D (precio en USD)
  tickerARS: string;   // Ticker en ARS
  isin: string;
  maturity: Date;
  outstandingM: number; // Monto outstanding aprox. en USD millones (para ponderar)
  law: 'NY' | 'AR';
  cashFlows: CashFlow[]; // Flujos de caja futuros por 100 VN original
}

// ── Helpers para generar flujos de caja semianuales ──────────────────────────
function semiDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day));
}

// ── GD29 — Argentina 2029 (ISIN: US040114HS26) ───────────────────────────────
// Vencimiento: 9 Jul 2029 | Cupón actual: 3.875% p.a. | Amort: 2024-2029
// Pagos: 9 Ene y 9 Jul de cada año
const GD29_FLOWS: CashFlow[] = [
  // --- Cupones restantes al 01/Jun/2026 (1.9375 por semestre = 3.875%/2)
  // Amortización: 8 cuotas de 12.5 cada una (2024 → 2029), ya amortizó 3 cuotas
  // Outstanding restante al inicio 2026: ~62.5% del VN original
  { date: semiDate(2026, 7, 9),  coupon: 1.2109, principal: 0 },
  { date: semiDate(2027, 1, 9),  coupon: 1.2109, principal: 12.5 },
  { date: semiDate(2027, 7, 9),  coupon: 0.9668, principal: 0 },
  { date: semiDate(2028, 1, 9),  coupon: 0.9668, principal: 12.5 },
  { date: semiDate(2028, 7, 9),  coupon: 0.7227, principal: 0 },
  { date: semiDate(2029, 1, 9),  coupon: 0.7227, principal: 12.5 },
  { date: semiDate(2029, 7, 9),  coupon: 0.4785, principal: 12.5 }, // último
];

// ── GD30 — Argentina 2030 (ISIN: US040114HT09) ───────────────────────────────
// Vencimiento: 9 Jul 2030 | Cupón actual: 3.875% p.a. | Amort: 2025-2030
const GD30_FLOWS: CashFlow[] = [
  { date: semiDate(2026, 7, 9),  coupon: 1.3281, principal: 0 },
  { date: semiDate(2027, 1, 9),  coupon: 1.3281, principal: 13.333 },
  { date: semiDate(2027, 7, 9),  coupon: 1.0703, principal: 0 },
  { date: semiDate(2028, 1, 9),  coupon: 1.0703, principal: 13.333 },
  { date: semiDate(2028, 7, 9),  coupon: 0.8125, principal: 0 },
  { date: semiDate(2029, 1, 9),  coupon: 0.8125, principal: 13.333 },
  { date: semiDate(2029, 7, 9),  coupon: 0.5547, principal: 0 },
  { date: semiDate(2030, 1, 9),  coupon: 0.5547, principal: 13.333 },
  { date: semiDate(2030, 7, 9),  coupon: 0.2969, principal: 13.335 }, // último
];

// ── GD35 — Argentina 2035 (ISIN: US040114HU71) ───────────────────────────────
// Vencimiento: 9 Jul 2035 | Cupón: 3.625% p.a. | Bullet (sin amort anticipada)
const GD35_FLOWS: CashFlow[] = [
  { date: semiDate(2026, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2027, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2027, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2028, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2028, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2029, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2029, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2030, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2030, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2031, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2031, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2032, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2032, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2033, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2033, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2034, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2034, 7, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2035, 1, 9),  coupon: 1.8125, principal: 0 },
  { date: semiDate(2035, 7, 9),  coupon: 1.8125, principal: 100 }, // bullet
];

// ── GD38 — Argentina 2038 (ISIN: US040114HV54) ───────────────────────────────
// Vencimiento: 9 Ene 2038 | Cupón: 3.875% p.a. | Amort: 2031-2038
const GD38_FLOWS: CashFlow[] = [
  { date: semiDate(2026, 7, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2027, 1, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2027, 7, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2028, 1, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2028, 7, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2029, 1, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2029, 7, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2030, 1, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2030, 7, 9),  coupon: 1.9375, principal: 0 },
  { date: semiDate(2031, 1, 9),  coupon: 1.9375, principal: 12.5 },
  { date: semiDate(2031, 7, 9),  coupon: 1.6953, principal: 0 },
  { date: semiDate(2032, 1, 9),  coupon: 1.6953, principal: 12.5 },
  { date: semiDate(2032, 7, 9),  coupon: 1.4531, principal: 0 },
  { date: semiDate(2033, 1, 9),  coupon: 1.4531, principal: 12.5 },
  { date: semiDate(2033, 7, 9),  coupon: 1.2109, principal: 0 },
  { date: semiDate(2034, 1, 9),  coupon: 1.2109, principal: 12.5 },
  { date: semiDate(2034, 7, 9),  coupon: 0.9688, principal: 0 },
  { date: semiDate(2035, 1, 9),  coupon: 0.9688, principal: 12.5 },
  { date: semiDate(2035, 7, 9),  coupon: 0.7266, principal: 0 },
  { date: semiDate(2036, 1, 9),  coupon: 0.7266, principal: 12.5 },
  { date: semiDate(2036, 7, 9),  coupon: 0.4844, principal: 0 },
  { date: semiDate(2037, 1, 9),  coupon: 0.4844, principal: 12.5 },
  { date: semiDate(2037, 7, 9),  coupon: 0.2422, principal: 0 },
  { date: semiDate(2038, 1, 9),  coupon: 0.2422, principal: 12.5 }, // último
];

// ── GD41 — Argentina 2041 (ISIN: US040114HW38) ───────────────────────────────
// Vencimiento: 9 Jul 2041 | Cupón: 4.125% p.a. | Amort: 2034-2041
const GD41_FLOWS: CashFlow[] = [
  { date: semiDate(2026, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2027, 1, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2027, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2028, 1, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2028, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2029, 1, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2029, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2030, 1, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2030, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2031, 1, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2031, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2032, 1, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2032, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2033, 1, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2033, 7, 9),  coupon: 2.0625, principal: 0 },
  { date: semiDate(2034, 1, 9),  coupon: 2.0625, principal: 12.5 },
  { date: semiDate(2034, 7, 9),  coupon: 1.8047, principal: 0 },
  { date: semiDate(2035, 1, 9),  coupon: 1.8047, principal: 12.5 },
  { date: semiDate(2035, 7, 9),  coupon: 1.5469, principal: 0 },
  { date: semiDate(2036, 1, 9),  coupon: 1.5469, principal: 12.5 },
  { date: semiDate(2036, 7, 9),  coupon: 1.2891, principal: 0 },
  { date: semiDate(2037, 1, 9),  coupon: 1.2891, principal: 12.5 },
  { date: semiDate(2037, 7, 9),  coupon: 1.0313, principal: 0 },
  { date: semiDate(2038, 1, 9),  coupon: 1.0313, principal: 12.5 },
  { date: semiDate(2038, 7, 9),  coupon: 0.7734, principal: 0 },
  { date: semiDate(2039, 1, 9),  coupon: 0.7734, principal: 12.5 },
  { date: semiDate(2039, 7, 9),  coupon: 0.5156, principal: 0 },
  { date: semiDate(2040, 1, 9),  coupon: 0.5156, principal: 12.5 },
  { date: semiDate(2040, 7, 9),  coupon: 0.2578, principal: 0 },
  { date: semiDate(2041, 1, 9),  coupon: 0.2578, principal: 12.5 },
  { date: semiDate(2041, 7, 9),  coupon: 0,       principal: 12.5 }, // último
];

// ── GD46 — Argentina 2046 (ISIN: US040114HX11) ───────────────────────────────
// Vencimiento: 9 Jul 2046 | Cupón: 4.875% p.a. | Amort: 2039-2046
const GD46_FLOWS: CashFlow[] = [
  { date: semiDate(2026, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2027, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2027, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2028, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2028, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2029, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2029, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2030, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2030, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2031, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2031, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2032, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2032, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2033, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2033, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2034, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2034, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2035, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2035, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2036, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2036, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2037, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2037, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2038, 1, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2038, 7, 9),  coupon: 2.4375, principal: 0 },
  { date: semiDate(2039, 1, 9),  coupon: 2.4375, principal: 12.5 },
  { date: semiDate(2039, 7, 9),  coupon: 2.1328, principal: 0 },
  { date: semiDate(2040, 1, 9),  coupon: 2.1328, principal: 12.5 },
  { date: semiDate(2040, 7, 9),  coupon: 1.8281, principal: 0 },
  { date: semiDate(2041, 1, 9),  coupon: 1.8281, principal: 12.5 },
  { date: semiDate(2041, 7, 9),  coupon: 1.5234, principal: 0 },
  { date: semiDate(2042, 1, 9),  coupon: 1.5234, principal: 12.5 },
  { date: semiDate(2042, 7, 9),  coupon: 1.2188, principal: 0 },
  { date: semiDate(2043, 1, 9),  coupon: 1.2188, principal: 12.5 },
  { date: semiDate(2043, 7, 9),  coupon: 0.9141, principal: 0 },
  { date: semiDate(2044, 1, 9),  coupon: 0.9141, principal: 12.5 },
  { date: semiDate(2044, 7, 9),  coupon: 0.6094, principal: 0 },
  { date: semiDate(2045, 1, 9),  coupon: 0.6094, principal: 12.5 },
  { date: semiDate(2045, 7, 9),  coupon: 0.3047, principal: 0 },
  { date: semiDate(2046, 1, 9),  coupon: 0.3047, principal: 12.5 },
  { date: semiDate(2046, 7, 9),  coupon: 0,       principal: 0 },
];

// ── Registro de bonos EMBI-elegibles ─────────────────────────────────────────
export const EMBI_BONDS: BondDef[] = [
  {
    ticker: 'GD29D',
    tickerARS: 'GD29',
    isin: 'US040114HS26',
    maturity: semiDate(2029, 7, 9),
    outstandingM: 2100, // actualizado según datos mercado ~2.1B
    law: 'NY',
    cashFlows: GD29_FLOWS,
  },
  {
    ticker: 'GD30D',
    tickerARS: 'GD30',
    isin: 'US040114HT09',
    maturity: semiDate(2030, 7, 9),
    outstandingM: 12900, // ~12.9B
    law: 'NY',
    cashFlows: GD30_FLOWS,
  },
  {
    ticker: 'GD35D',
    tickerARS: 'GD35',
    isin: 'US040114HU71',
    maturity: semiDate(2035, 7, 9),
    outstandingM: 20500, // ~20.5B
    law: 'NY',
    cashFlows: GD35_FLOWS,
  },
  {
    ticker: 'GD38D',
    tickerARS: 'GD38',
    isin: 'US040114HV54',
    maturity: semiDate(2038, 1, 9),
    outstandingM: 11400, // ~11.4B
    law: 'NY',
    cashFlows: GD38_FLOWS,
  },
  {
    ticker: 'GD41D',
    tickerARS: 'GD41',
    isin: 'US040114HW38',
    maturity: semiDate(2041, 7, 9),
    outstandingM: 10500, // ~10.5B
    law: 'NY',
    cashFlows: GD41_FLOWS,
  },
  {
    ticker: 'GD46D',
    tickerARS: 'GD46',
    isin: 'US040114HX11',
    maturity: semiDate(2046, 7, 9),
    outstandingM: 2000, // ~2.0B
    law: 'NY',
    cashFlows: GD46_FLOWS,
  },
];
