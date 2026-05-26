// Fuente: ArgentinaDatos — IPC mensual e interanual
// Se publica entre los días 12-16 de cada mes

interface ApiItem { fecha: string; valor: number }

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

export async function fetchInflacion(): Promise<unknown | null> {
  const [mensual, interanual] = await Promise.all([
    tryFetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacion'),
    tryFetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual'),
  ]);

  if (!mensual || mensual.length === 0) return null;

  const interanualMap: Record<string, number> = {};
  (interanual ?? []).forEach((i) => { interanualMap[i.fecha] = i.valor; });

  return mensual.slice(-36).map((item) => ({
    date:       fmt(item.fecha),
    mensual:    item.valor,
    interanual: interanualMap[item.fecha] ?? null,
  }));
}

export async function fetchInflacionLargoPlazo(): Promise<unknown | null> {
  const raw = await tryFetch('https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual');
  if (!raw || raw.length === 0) return null;
  return raw.map((item) => ({ date: fmt(item.fecha), value: item.valor }));
}
