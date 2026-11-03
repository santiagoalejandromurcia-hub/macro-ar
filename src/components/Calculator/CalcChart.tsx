'use client';

/**
 * CalcChart — Chart TradingView-style para la calculadora de instrumentos.
 * Reemplaza el LineChart de Recharts con lightweight-charts v5.
 * Cada instrumento seleccionado aparece como una línea con zoom/pan nativo.
 */

import { useEffect, useRef } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';
import { macroChartOptions } from '@/lib/lwChartUtils';
import type { CalcOutput, InstrumentId } from '@/lib/calc/types';

const COLORS: Record<InstrumentId, string> = {
  plazoFijo: '#0099FF',
  dolarMEP:  '#E73F25',
  dolarBlue: '#22C55E',
  lecap:     '#0070C2',
  al30:      '#B02E19',
  gd30:      '#F28C7A',
};

interface Props {
  output: CalcOutput;
}

export function CalcChart({ output }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, macroChartOptions(el.clientWidth, 320));

    for (const r of output.results) {
      if (!r.available || r.series.length === 0) continue;

      const series = chart.addSeries(LineSeries, {
        color: COLORS[r.id] ?? '#0099FF',
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: true,
        crosshairMarkerVisible: true,
        title: r.label,
      });

      const data = r.series
        .filter((p) => p.value != null && isFinite(p.value))
        .map((p) => ({
          // Las fechas de la API ya vienen como YYYY-MM-DD
          time: p.date as `${number}-${number}-${number}`,
          value: p.value,
        }))
        .sort((a, b) => a.time.localeCompare(b.time));

      series.setData(data);
    }

    chart.timeScale().fitContent();

    // Resize observer para que el chart se adapte al contenedor
    const ro = new ResizeObserver(() => {
      chart.applyOptions({ width: el.clientWidth });
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, [output]);

  return (
    <div className="w-full" style={{ height: 320 }}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
