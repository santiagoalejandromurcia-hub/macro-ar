'use client';

/**
 * RiesgoPaisChart — EMBI+ → EMBIGD (puntos básicos)
 * Migrado de Recharts a lightweight-charts v5.
 * Area series con markers en pico, mínimo y dato actual.
 */

import { useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import type { SeriesMarker, Time } from 'lightweight-charts';
import ChartCard from '@/components/ChartCard';
import { riesgoPaisData } from '@/data/macroData';
import { spanishToISO, macroChartOptions } from '@/lib/lwChartUtils';

function RiesgoPaisInnerChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, macroChartOptions(el.clientWidth, 300));

    const area = chart.addSeries(AreaSeries, {
      topColor:    'rgba(236, 72, 153, 0.28)',
      bottomColor: 'rgba(236, 72, 153, 0.02)',
      lineColor:   '#EC4899',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
      crosshairMarkerVisible: true,
    });

    const seriesData = riesgoPaisData
      .map((d) => ({
        time: spanishToISO(d.date) as Time,
        value: d.value,
      }))
      .sort((a, b) => String(a.time).localeCompare(String(b.time)));

    area.setData(seriesData);

    // Markers: pico (rojo arriba), mínimo (verde abajo), actual (amarillo arriba)
    const markers: SeriesMarker<Time>[] = riesgoPaisData
      .filter((d) => d.highlight)
      .map((d) => ({
        time: spanishToISO(d.date) as Time,
        position: d.highlight === 'minimo' ? 'belowBar' : 'aboveBar',
        color:
          d.highlight === 'pico'   ? '#EF4444' :
          d.highlight === 'minimo' ? '#22C55E' : '#D4A843',
        shape: 'circle',
        text: `${d.value} pb`,
        size: 1,
      }))
      .sort((a, b) => String(a.time).localeCompare(String(b.time)));

    area.setMarkers(markers);
    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      chart.applyOptions({ width: el.clientWidth });
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: 300 }} />;
}

export default function RiesgoPaisChart() {
  const csvData = riesgoPaisData as unknown as Record<string, unknown>[];
  const last  = riesgoPaisData[riesgoPaisData.length - 1];
  const min   = riesgoPaisData.find((d) => d.highlight === 'minimo');
  const peak  = riesgoPaisData.find((d) => d.highlight === 'pico');

  return (
    <ChartCard
      title="Riesgo País · EMBI+ → EMBIGD"
      subtitle="Puntos básicos · 2023-2026 · Fuente: JP Morgan (en feb-26 reclasificación a EMBIGD)"
      csvData={csvData}
      csvFileName="riesgo-pais-2023-2026"
    >
      <RiesgoPaisInnerChart />

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-theme-muted">
        {peak && (
          <span>
            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#EF4444' }} />
            {peak.date}: {peak.value} pb (pico)
          </span>
        )}
        {min && (
          <span>
            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#22C55E' }} />
            {min.date}: {min.value} pb (mínimo)
          </span>
        )}
        <span>
          <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#D4A843' }} />
          {last.date}: {last.value} pb (actual)
        </span>
        <span className="ml-auto text-theme-primary font-semibold">
          Feb-26: JP Morgan migró Argentina del EMBI+ al EMBIGD
        </span>
      </div>
    </ChartCard>
  );
}
