'use client';

import { useState, useEffect } from 'react';
import { kpiCards, KPICard } from '@/data/macroData';
import KPICardComponent from './KPICard';

interface KPILive {
  id: string;
  value: string;
  change: number;
  changeLabel: string;
}

/**
 * Dashboard de KPIs que arranca con datos estáticos y los reemplaza
 * con datos en vivo desde /api/kpis sin ningún flash o skeleton.
 */
export default function LiveKPIGrid() {
  const [liveMap, setLiveMap] = useState<Record<string, KPILive>>({});
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchKPIs() {
      try {
        const res = await fetch('/api/kpis');
        if (!res.ok) return;
        const json = await res.json();
        const map: Record<string, KPILive> = {};
        for (const kpi of json.kpis ?? []) {
          map[kpi.id] = kpi;
        }
        setLiveMap(map);
        setIsLive(Object.keys(map).length > 0);
      } catch {
        // silent — se quedan los datos estáticos
      }
    }

    fetchKPIs();
    const interval = setInterval(fetchKPIs, 5 * 60 * 1000); // refrescar cada 5 min
    return () => clearInterval(interval);
  }, []);

  // Merge: datos estáticos + actualizaciones en vivo
  const mergedCards: KPICard[] = kpiCards.map((card) => {
    const live = liveMap[card.id];
    if (!live) return card;
    return { ...card, value: live.value, change: live.change, changeLabel: live.changeLabel };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {mergedCards.map((card, i) => (
        <KPICardComponent key={card.id} card={card} index={i} isLive={isLive && !!liveMap[card.id]} />
      ))}
    </div>
  );
}
