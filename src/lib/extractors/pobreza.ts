// Fuente: ArgentinaDatos — Pobreza e Indigencia (EPH semestral)

interface ApiItem { fecha: string; valor: number; tipo?: string }

function fmt(fechaStr: string): string {
  const d = new Date(fechaStr);
  const semestre = d.getMonth() < 6 ? '1S' : '2S';
  return `${semestre} ${d.getFullYear()}`;
}

async function tryFetch(url: string): Promise<ApiItem[] | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data?.data ?? null);
  } catch { return null; }
}

export async function fetchPobreza(): Promise<unknown | null> {
  const [pobreza, indigencia] = await Promise.all([
    tryFetch('https://api.argentinadatos.com/v1/indec/pobreza'),
    tryFetch('https://api.argentinadatos.com/v1/indec/indigencia'),
  ]);

  if (!pobreza || pobreza.length === 0) return null;

  const indigMap: Record<string, number> = {};
  (indigencia ?? []).forEach((i) => { indigMap[i.fecha] = i.valor; });

  return pobreza.map((item) => ({
    period:     fmt(item.fecha),
    pobreza:    item.valor,
    indigencia: indigMap[item.fecha] ?? null,
  }));
}
