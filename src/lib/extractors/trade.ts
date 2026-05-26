// Fuente: ArgentinaDatos — Intercambio Comercial Argentino (ICA)

interface ApiItem { fecha: string; exportaciones?: number; importaciones?: number; valor?: number }

function fmt(fechaStr: string): string {
  const d = new Date(fechaStr);
  const mes = d.toLocaleString('es-AR', { month: 'short' });
  const anio = String(d.getFullYear()).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} '${anio}`;
}

async function tryFetch(url: string): Promise<ApiItem[] | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data?.data ?? null);
  } catch { return null; }
}

export async function fetchTrade(): Promise<unknown | null> {
  const [exports_, imports_] = await Promise.all([
    tryFetch('https://api.argentinadatos.com/v1/indec/ica/exportaciones'),
    tryFetch('https://api.argentinadatos.com/v1/indec/ica/importaciones'),
  ]);

  if (!exports_ || exports_.length === 0) return null;

  const importMap: Record<string, number> = {};
  (imports_ ?? []).forEach((i) => {
    importMap[i.fecha] = i.valor ?? i.importaciones ?? 0;
  });

  return exports_.slice(-24).map((item) => {
    const exp = item.valor ?? item.exportaciones ?? 0;
    const imp = importMap[item.fecha] ?? 0;
    return {
      month:   fmt(item.fecha),
      exports: exp,
      imports: imp,
      balance: exp - imp,
    };
  });
}
