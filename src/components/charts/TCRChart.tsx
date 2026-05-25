'use client';

/**
 * TCRChart — Tipo de Cambio (Oficial, Blue, MEP)
 * Migrado de Recharts a lightweight-charts v5.
 * Soporta zoom/pan nativo y selector de período existente.
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';
import ChartCard from '@/components/ChartCard';
import { tcrData } from '@/data/macroData';
import { MONTHLY_PERIODS, filterByPeriod } from '@/lib/dataUtils';
import { spanishToISO, macroChartOptions } from '@/lib/lwChartUtils';

const SERIES_CONFIG = [
  { key: 'oficial' as const, color: '#74ACDF', title: 'Oficial' },
  { key: 'blue'    as const, color: '#22C55E', title: 'Blue'    },
  { key: 'mep'     as const, color: '#D4A843', title: 'MEP'     },
] as const;

type TcrRow = (typeof tcrData)[number];

function TCRInnerChart({ data }: { data: TcrRow[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, macroChartOptions(el.clientWidth, 300));

    for (const s of SERIES_CONFIG) {
      const series = chart.addSeries(LineSeries, {
        color: s.color,
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: true,
        title: s.title,
      });

      series.setData(
        data
          .map((d) => ({ time: spanishToISO(d.date) as `${number}-${number}-${number}`, value: d[s.key] }))
          .sort((a, b) => a.time.localeCompare(b.time)),
      );
    }

    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      chart.applyOptions({ width: el.clientWidth });
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: 300 }} />;
}

export default function TCRChart() {
  const [period, setPeriod] = useState(0);
  const displayData = useMemo(() => filterByPeriod(tcrData, period), [period]);
  const csvData = displayData as unknown as Record<string, unknown>[];

  return (
    <ChartCard
      title="Tipo de Cambio"
      subtitle="Oficial, Blue y MEP (ARS/USD) · Fuente: BCRA · Bluelytics"
      periods={[...MONTHLY_PERIODS]}
      selectedPeriod={period}
      onPeriodChange={setPeriod}
      csvData={csvData}
      csvFileName="tipo-de-cambio"
    >
      <TCRInnerChart data={displayData} />
    </ChartCard>
  );
}
