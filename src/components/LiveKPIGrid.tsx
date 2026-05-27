'''use client''';

// ════════════════════════════════════════════════════
// LiveKPIGrid — Grid principal de KPIs del dashboard
// Usa los datos de macroData.ts ingresados manualmente.
// Los valores "EN VIVO" (dólar, riesgo país) están en
// DolarBlueVivo y RiesgoPaisVivo, componentes separados.
// ════════════════════════════════════════════════════

import KPICardComponent from '''./KPICard''';
import { kpiCards } from '''@/data/macroData''';

export default function LiveKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {kpiCards.map((card, i) => (
        <KPICardComponent
          key={card.id}
          card={card}
          index={i}
          isLive={false}
          isLoading={false}
        />
      ))}
    </div>
  );
}
