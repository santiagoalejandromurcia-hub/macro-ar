/**
 * Utilidad para exportar datos de gráficos como CSV
 * Se ejecuta solo en el cliente (usa browser APIs)
 */
export function downloadCSV(data: Record<string, unknown>[], filename: string): void {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      // Si tiene comas o saltos de línea, envolver en comillas
      if (typeof val === 'string' && (val.includes(',') || val.includes('\n'))) {
        return `"${val}"`;
      }
      return val ?? '';
    }).join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM para Excel
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_macrolibre.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
