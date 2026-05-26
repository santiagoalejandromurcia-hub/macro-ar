// Fuente: ArgentinaDatos — Riesgo País EMBI+

interface ApiItem { fecha: string; valor: number }

function fmt(fechaStr: string): string {
  const d = new Date(fechaStr);
  const mes = d.toLocaleString('es-AR', { month: 'short' });
  const anio = String(d.getFullYear()).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} '${anio}`;
}

export async function fetchRiesgoPais(): Promise<unknown | null> {
  try {
    const res = await fetch(
      'https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais',
      { cache: 'no-store' },
    );
    if (!res.ok) return null;
    const raw: ApiItem[] = await res.json();
    if (!raw || raw.length === 0) return null;

    // Tomar un punto por mes (último del mes)
    const byMonth: Record<string, number> = {};
    for (const item of raw) {
      const key = item.fecha.slice(0, 7);
      byMonth[key] = item.valor;
    }

    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-48)
      .map(([key, value]) => ({
        date: fmt(`${key}-01`),
        value,
      }));
  } catch { return null; }
}
