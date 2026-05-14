'use client';

import { kpiCards } from '@/data/macroData';
import KPICardComponent from './KPICard';

/**
 * Dashboard de KPIs — muestra los datos curados de macroData.ts.
 * Los indicadores en vivo (Dólar, Riesgo País) se muestran
 * en el widget separado debajo de esta grilla.
 */
export default function LiveKPIGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {kpiCards.map((card, i) => (
        <KPICardComponent key={card.id} card={card} index={i} isLive={false} />
      ))}
    </div>
  );
}
