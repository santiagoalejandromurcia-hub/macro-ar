/**
 * Utilidades para lightweight-charts en MacroLibre
 * Conversión de fechas en español → ISO y opciones de tema oscuro.
 */

const MESES: Record<string, string> = {
  Ene: '01', Feb: '02', Mar: '03', Abr: '04',
  May: '05', Jun: '06', Jul: '07', Ago: '08',
  Sep: '09', Oct: '10', Nov: '11', Dic: '12',
};

/**
 * Convierte "Dic 23" o "Jun - Estimado 26" → "2023-12-01"
 * Si ya es ISO (YYYY-MM o YYYY-MM-DD) lo normaliza a YYYY-MM-DD.
 */
export function spanishToISO(date: string): string {
  // "Dic 23" / "Jun - Estimado 26"
  const m = date.match(/^(\w{3})\s+.*?(\d{2})\s*$/);
  if (m) {
    const month = MESES[m[1]] ?? '01';
    return `20${m[2]}-${month}-01`;
  }
  // "2023-12" → "2023-12-01"
  if (/^\d{4}-\d{2}$/.test(date)) return `${date}-01`;
  // ya es YYYY-MM-DD
  return date;
}

/**
 * Opciones base para createChart() que respetan el tema oscuro de MacroLibre.
 * Pasar el ancho actual del contenedor como `width`.
 */
export function macroChartOptions(width: number, height = 300) {
  return {
    layout: {
      background: { type: 'solid' as const, color: 'transparent' },
      textColor: 'rgba(180, 195, 215, 0.65)',
      fontSize: 11,
      fontFamily: 'ui-monospace, "Cascadia Code", Menlo, monospace',
    },
    grid: {
      vertLines: { color: 'rgba(255,255,255,0.04)' },
      horzLines: { color: 'rgba(255,255,255,0.04)' },
    },
    crosshair: {
      mode: 1, // CrosshairMode.Normal
    },
    timeScale: {
      borderColor: 'rgba(255,255,255,0.08)',
      fixLeftEdge: true,
      fixRightEdge: true,
      timeVisible: true,
      secondsVisible: false,
    },
    rightPriceScale: {
      borderColor: 'rgba(255,255,255,0.08)',
    },
    width,
    height,
    handleScroll: true,
    handleScale: true,
  } as const;
}
