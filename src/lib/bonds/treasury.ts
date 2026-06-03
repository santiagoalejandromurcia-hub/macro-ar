// ============================================================
// Fetcher de curva de Treasuries — Treasury.gov XML API
// Endpoint: Daily Treasury Par Yield Curve Rates
// Docs: https://home.treasury.gov/interest-rates-data-csv-archive
// ============================================================

const TSY_BASE =
  'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml';

/** Mapa plazo (años) → yield anual (decimal). Ej: { 1: 0.051, 2: 0.049, 5: 0.044 } */
export type TreasuryCurve = Record<number, number>;

/** Plazo (años) → tag XML */
const TAGS: Record<number, string> = {
  0.25: 'BC_3MONTH',
  0.5:  'BC_6MONTH',
  1:    'BC_1YEAR',
  2:    'BC_2YEAR',
  3:    'BC_3YEAR',
  5:    'BC_5YEAR',
  7:    'BC_7YEAR',
  10:   'BC_10YEAR',
  20:   'BC_20YEAR',
  30:   'BC_30YEAR',
};

/**
 * Descarga la curva de Treasuries del día actual (o del último día hábil).
 * Hace fallback al mes anterior si el XML de hoy está vacío.
 */
export async function fetchTreasuryCurve(): Promise<TreasuryCurve | null> {
  const now = new Date();
  const months = [
    formatMonth(now),
    formatMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1)),
  ];

  for (const ym of months) {
    try {
      const url = `${TSY_BASE}?data=daily_treasury_yield_curve&field_tdr_date_value=${ym}`;
      const res = await fetch(url, {
        cache: 'no-store',
        headers: { Accept: 'application/xml, text/xml, */*' },
        next: { revalidate: 3600 },
      });
      if (!res.ok) continue;

      const xml = await res.text();
      const curve = parseLastEntry(xml);
      if (curve && Object.keys(curve).length >= 4) return curve;
    } catch {
      continue;
    }
  }

  return null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatMonth(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}${m}`;
}

/**
 * Parsea el XML de Treasury.gov y devuelve la última entrada (día más reciente).
 * El XML tiene la forma:
 *   <entry><content><m:properties><d:BC_2YEAR>4.25</d:BC_2YEAR>...</m:properties></content></entry>
 */
function parseLastEntry(xml: string): TreasuryCurve | null {
  // Extraer todos los bloques <entry>
  const entries = [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)];
  if (entries.length === 0) return null;

  // Tomar la última (más reciente)
  const last = entries[entries.length - 1][0];

  const curve: TreasuryCurve = {};
  for (const [tenorYrs, tag] of Object.entries(TAGS)) {
    const re = new RegExp(`<d:${tag}[^>]*>([\\d.]+)<\\/d:${tag}>`);
    const m = last.match(re);
    if (m) {
      const pct = parseFloat(m[1]);
      if (!isNaN(pct)) {
        curve[Number(tenorYrs)] = pct / 100; // convertir % → decimal
      }
    }
  }

  return Object.keys(curve).length > 0 ? curve : null;
}
