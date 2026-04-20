'use client';

import { useState, useEffect } from 'react';
import {
  InflacionMensualChart, InflacionInteranualChart, REMChart,
} from './Charts';
import Link from 'next/link';

// Wrapper for mayorista chart (imported separately to avoid circular deps)
import InflacionMayoristaChart from './InflacionMayoristaChart';

const ALL_CHARTS = [
  { id: 'mensual', component: InflacionMensualChart, label: 'IPC Mensual' },
  { id: 'interanual', component: InflacionInteranualChart, label: 'IPC Interanual' },
  { id: 'rem', component: REMChart, label: 'REM (BCRA)' },
  { id: 'mayorista', component: InflacionMayoristaChart, label: 'Mayorista (IPIM)' },
];

export default function PreciosRotativo() {
  const [charts, setCharts] = useState<typeof ALL_CHARTS>([]);

  useEffect(() => {
    // Shuffle and pick 2
    const shuffled = [...ALL_CHARTS].sort(() => Math.random() - 0.5);
    setCharts(shuffled.slice(0, 2));
  }, []);

  // SSR: show first 2 as default
  const display = charts.length > 0 ? charts : ALL_CHARTS.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {display.map((chart) => {
          const Chart = chart.component;
          return <Chart key={chart.id} />;
        })}
      </div>

      {/* Link a ver todos */}
      <div className="text-center">
        <Link
          href="/inflacion"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ar-celeste/10 border border-ar-celeste/20 rounded-lg text-sm text-ar-celeste hover:bg-ar-celeste/20 transition-colors"
        >
          Ver todos los indicadores de precios →
        </Link>
      </div>
    </div>
  );
}
