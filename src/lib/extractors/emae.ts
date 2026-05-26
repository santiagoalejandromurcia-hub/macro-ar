// Fuente: ArgentinaDatos — EMAE mensual
// Se publica entre los días 20-26 de cada mes

interface ApiItem { fecha: string; valor: number; variacionInteranual?: number }

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

export async function fetchEmae(): Promise<unknown | null> {
  const endpoints = [
    'https://api.argentinadatos.com/v2/indec/emae',
    'https://api.argentinadatos.com/v1/indec/emae',
  ];

  let raw: ApiItem[] | null = null;
  for (const url of endpoints) {
    raw = await tryFetch(url);
    if (raw && raw.length > 0) break;
  }
  if (!raw || raw.length === 0) return null;

  return raw.slice(-36).map((item) => ({
    date:                fmt(item.fecha),
    value:               item.valor,
    variacionInteranual: item.variacionInteranual ?? null,
  }));
}

export async function fetchEmaeLargoPlazo(): Promise<unknown | null> {
  const endpoints = [
    'https://api.argentinadatos.com/v2/indec/emae',
    'https://api.argentinadatos.com/v1/indec/emae',
  ];

  let raw: ApiItem[] | null = null;
  for (const url of endpoints) {
    raw = await tryFetch(url);
    if (raw && raw.length > 0) break;
  }
  if (!raw || raw.length === 0) return null;

  return raw.map((item) => ({
    date:  fmt(item.fecha),
    value: item.valor,
    trend: item.valor, // la API no siempre incluye tendencia
  }));
}
