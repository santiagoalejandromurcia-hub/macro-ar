// Fuente: BCRA API oficial — Reservas Internacionales (Variable 1)

interface BCRADetalle { fecha: string; valor: number }

function fmt(fechaStr: string): string {
  const d = new Date(fechaStr);
  const mes = d.toLocaleString('es-AR', { month: 'short' });
  const anio = String(d.getFullYear()).slice(2);
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)} '${anio}`;
}

export async function fetchReservas(): Promise<unknown | null> {
  try {
    const from = new Date();
    from.setFullYear(from.getFullYear() - 3);
    const desde = from.toISOString().split('T')[0];
    const hasta = new Date().toISOString().split('T')[0];

    const res = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/1?desde=${desde}&hasta=${hasta}&limit=100`,
      { cache: 'no-store', headers: { Accept: 'application/json' } },
    );
    if (!res.ok) return null;

    const json = await res.json();
    const items: BCRADetalle[] = json.results?.[0]?.detalle ?? json.results ?? [];

    // Agrupar por mes (tomar el último valor de cada mes)
    const byMonth: Record<string, number> = {};
    for (const item of items) {
      const key = item.fecha.slice(0, 7); // YYYY-MM
      byMonth[key] = item.valor;
    }

    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-36)
      .map(([key, value]) => ({
        date: fmt(`${key}-01`),
        value,
      }));
  } catch { return null; }
}
