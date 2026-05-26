// Fuente: ArgentinaDatos — Índices de salario (INDEC SIPA / EIL)

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

export async function fetchSalario(): Promise<unknown | null> {
  // Intentar múltiples endpoints de salario
  const endpoints = [
    'https://api.argentinadatos.com/v1/indec/salarios',
    'https://api.argentinadatos.com/v2/indec/salarios',
  ];

  let raw: ApiItem[] | null = null;
  for (const url of endpoints) {
    raw = await tryFetch(url);
    if (raw && raw.length > 0) break;
  }
  if (!raw || raw.length === 0) return null;

  // Calcular variación real (nominal - inflación ~ proxy)
  return raw.slice(-36).map((item, i, arr) => {
    const prev = arr[i - 1];
    const varNominal = prev ? ((item.valor / prev.valor - 1) * 100) : 0;
    return {
      date:       fmt(item.fecha),
      nominal:    item.valor,
      varNominal: parseFloat(varNominal.toFixed(2)),
    };
  });
}
