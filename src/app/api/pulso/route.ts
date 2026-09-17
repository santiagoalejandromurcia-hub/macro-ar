import { NextResponse } from 'next/server';

export const revalidate = 60;

export type PulsoKind = 'live' | 'cierre' | 'dato' | 'trim';

export type PulsoField = {
  id: string;
  label: string;
  value: number | null;
  display: string;
  asOf: string | null;
  kind: PulsoKind;
  source: string;
  delta?: number | null;
  href?: string;
  note?: string;
};

function lastFred(csv: string): { date: string; val: number } | null {
  const pts = csv
    .trim()
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const [date, val] = line.split(',');
      return { date, val: Number(val) };
    })
    .filter((p) => p.date && Number.isFinite(p.val));
  return pts.at(-1) ?? null;
}

function field(
  partial: Omit<PulsoField, 'display'> & { display?: string; digits?: number },
): PulsoField {
  const digits = partial.digits ?? 2;
  const display =
    partial.display ??
    (partial.value == null
      ? '—'
      : partial.value.toLocaleString('es-AR', { maximumFractionDigits: digits }));
  const { digits: _d, ...rest } = partial;
  void _d;
  return { ...rest, display };
}

export async function GET() {
  const liveOk = {
    fx: false,
    embi: false,
    al30: false,
    tamar: false,
    reservas: false,
    fred: false,
  };
  const fields: PulsoField[] = [];

  const fx = await fetch('https://dolarapi.com/v1/dolares', {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(10_000),
  })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);

  type Casa = { casa?: string; venta?: number; fechaActualizacion?: string };
  const byCasa: Record<string, Casa> = {};
  if (Array.isArray(fx)) {
    liveOk.fx = true;
    for (const c of fx as Casa[]) {
      if (c.casa) byCasa[c.casa] = c;
    }
  }
  const pick = (casa: string) => byCasa[casa];
  const oficial = pick('oficial')?.venta ?? null;
  const blue = pick('blue')?.venta ?? null;
  const mep = pick('bolsa')?.venta ?? null;
  const ccl = pick('contadoconliqui')?.venta ?? null;
  const fxAsOf = pick('blue')?.fechaActualizacion?.slice(0, 19) ?? pick('oficial')?.fechaActualizacion?.slice(0, 10) ?? null;

  const ars = (n: number | null) =>
    n == null ? '—' : `$ ${Math.round(n).toLocaleString('es-AR')}`;
  fields.push(
    field({ id: 'oficial', label: 'Oficial', value: oficial, display: ars(oficial), asOf: fxAsOf, kind: 'live', source: 'dolarapi', href: '/?kpi=dolar-oficial#dashboard' }),
    field({ id: 'mep', label: 'MEP', value: mep, display: ars(mep), asOf: fxAsOf, kind: 'live', source: 'dolarapi' }),
    field({ id: 'ccl', label: 'CCL', value: ccl, display: ars(ccl), asOf: fxAsOf, kind: 'live', source: 'dolarapi' }),
    field({ id: 'blue', label: 'Blue', value: blue, display: ars(blue), asOf: fxAsOf, kind: 'live', source: 'dolarapi', href: '/?kpi=dolar-blue#dashboard' }),
  );
  const brecha =
    blue && oficial && oficial > 0 ? Math.round((blue / oficial - 1) * 1000) / 10 : null;
  fields.push(
    field({
      id: 'brecha',
      label: 'Brecha',
      value: brecha,
      asOf: fxAsOf,
      kind: 'live',
      source: 'derivada',
      href: '/?kpi=brecha#dashboard',
      display: brecha == null ? '—' : `${brecha.toLocaleString('es-AR', { maximumFractionDigits: 1 })}%`,
    }),
  );

  try {
    const [uRes, hRes] = await Promise.all([
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo', {
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(10_000),
      }),
      fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais', {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(12_000),
      }),
    ]);
    let embi: { valor?: number; fecha?: string } | null = uRes.ok ? await uRes.json() : null;
    if (hRes.ok) {
      const hist = (await hRes.json()) as { valor?: number; fecha?: string }[];
      const last = Array.isArray(hist) ? hist.at(-1) : null;
      const uAge = embi?.fecha ? (Date.now() - Date.parse(embi.fecha)) / 86_400_000 : 999;
      const lAge = last?.fecha ? (Date.now() - Date.parse(last.fecha)) / 86_400_000 : 999;
      if (!embi || uAge > lAge) embi = last ?? embi;
    }
    if (embi?.valor != null) {
      liveOk.embi = true;
      fields.push(
        field({
          id: 'embi',
          label: 'EMBIGD',
          value: embi.valor,
          display: `${embi.valor} pb`,
          asOf: embi.fecha ?? null,
          kind: 'cierre',
          source: 'JP Morgan / ArgentinaDatos',
          href: '/?kpi=riesgo#dashboard',
          digits: 0,
        }),
      );
    }
  } catch {
    /* */
  }

  try {
    const res = await fetch('https://data912.com/live/arg_bonds', {
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) {
      const arr = (await res.json()) as { symbol: string; c: number; pct_change: number }[];
      const al = arr.find((x) => x.symbol === 'AL30D');
      if (al && al.c > 0) {
        liveOk.al30 = true;
        fields.push(
          field({
            id: 'al30',
            label: 'AL30D',
            value: al.c,
            asOf: new Date().toISOString().slice(0, 16),
            kind: 'live',
            source: 'data912',
            delta: al.pct_change,
            digits: 2,
          }),
        );
      }
    }
  } catch {
    /* */
  }

  try {
    const hasta = new Date().toISOString().slice(0, 10);
    const desde = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10);
    const res = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/44?desde=${desde}&hasta=${hasta}&limit=5`,
      { next: { revalidate: 3600 }, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12_000) },
    );
    if (res.ok) {
      const json = await res.json();
      const detalle = json.results?.[0]?.detalle ?? [];
      const items: { fecha: string; valor: number }[] = [...detalle].sort((a, b) =>
        String(a.fecha).localeCompare(String(b.fecha)),
      );
      const last = items.at(-1);
      if (last) {
        liveOk.tamar = true;
        fields.push(
          field({
            id: 'tamar',
            label: 'TAMAR',
            value: last.valor,
            display: `${last.valor.toFixed(2)}% n.a.`,
            asOf: last.fecha,
            kind: 'cierre',
            source: 'BCRA var 44',
            href: '/?kpi=tamar#dashboard',
          }),
        );
      }
    }
  } catch {
    /* */
  }

  try {
    const hasta = new Date().toISOString().slice(0, 10);
    const desde = new Date(Date.now() - 10 * 86400000).toISOString().slice(0, 10);
    const res = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/1?desde=${desde}&hasta=${hasta}&limit=5`,
      { next: { revalidate: 3600 }, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12_000) },
    );
    if (res.ok) {
      const json = await res.json();
      const detalle = json.results?.[0]?.detalle ?? [];
      const items: { fecha: string; valor: number }[] = [...detalle].sort((a, b) =>
        String(a.fecha).localeCompare(String(b.fecha)),
      );
      const last = items.at(-1);
      const prev = items.at(-2);
      if (last) {
        liveOk.reservas = true;
        const delta =
          prev && prev.valor ? ((last.valor / prev.valor - 1) * 100) : null;
        fields.push(
          field({
            id: 'reservas',
            label: 'Reservas brutas',
            value: last.valor,
            display: `USD ${Math.round(last.valor).toLocaleString('es-AR')} M`,
            asOf: last.fecha,
            kind: 'cierre',
            source: 'BCRA',
            href: '/?kpi=reservas#dashboard',
            delta,
            digits: 0,
          }),
        );
      }
    }
  } catch {
    /* */
  }

  try {
    const [dgs10, dgs2, wti, usdTw] = await Promise.all([
      fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10', { next: { revalidate: 3600 }, signal: AbortSignal.timeout(12_000) }),
      fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS2', { next: { revalidate: 3600 }, signal: AbortSignal.timeout(12_000) }),
      fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=DCOILWTICO', { next: { revalidate: 3600 }, signal: AbortSignal.timeout(12_000) }),
      fetch('https://fred.stlouisfed.org/graph/fredgraph.csv?id=DTWEXBGS', { next: { revalidate: 3600 }, signal: AbortSignal.timeout(12_000) }),
    ]);
    const p10 = dgs10.ok ? lastFred(await dgs10.text()) : null;
    const p2 = dgs2.ok ? lastFred(await dgs2.text()) : null;
    const pw = wti.ok ? lastFred(await wti.text()) : null;
    const pdx = usdTw.ok ? lastFred(await usdTw.text()) : null;
    liveOk.fred = Boolean(p10 || pw);
    if (p10) {
      fields.push(field({ id: 'us10y', label: 'US10Y', value: p10.val, display: `${p10.val.toFixed(2)}%`, asOf: p10.date, kind: 'cierre', source: 'FRED DGS10' }));
    }
    if (p2) {
      fields.push(field({ id: 'us02y', label: 'US02Y', value: p2.val, display: `${p2.val.toFixed(2)}%`, asOf: p2.date, kind: 'cierre', source: 'FRED DGS2' }));
    }
    if (p10 && p2) {
      const slope = Math.round((p10.val - p2.val) * 100) / 100;
      fields.push(field({ id: '10s2s', label: '10s2s', value: slope, display: `${slope.toFixed(2)} pp`, asOf: p10.date, kind: 'cierre', source: 'derivada FRED' }));
    }
    if (pw) {
      fields.push(field({ id: 'wti', label: 'WTI', value: pw.val, display: `USD ${pw.val.toFixed(1)}`, asOf: pw.date, kind: 'cierre', source: 'FRED DCOILWTICO' }));
    }
    if (pdx) {
      fields.push(field({
        id: 'usd-tw',
        label: 'USD ponderado',
        value: pdx.val,
        asOf: pdx.date,
        kind: 'cierre',
        source: 'FRED DTWEXBGS',
        note: 'Índice broad de la Fed — no es el DXY de ICE',
        digits: 1,
      }));
    }
  } catch {
    /* */
  }

  fields.push(
    field({
      id: 'lecap',
      label: 'LECAP 30d',
      value: null,
      display: 'pendiente',
      asOf: null,
      kind: 'dato',
      source: 'TEM verificada',
      note: 'Sin YTM live hasta cargar TEM+fechas en LECAP_VERIFIED',
    }),
  );

  return NextResponse.json(
    { asOf: new Date().toISOString(), liveOk, fields },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' } },
  );
}
