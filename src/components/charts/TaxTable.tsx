'use client';

import ChartCard from '@/components/ChartCard';
import { useChartTheme } from './useChartTheme';
import { taxData } from '@/data/macroData';
import { useIndicatorData } from '@/hooks/useIndicatorData';

export default function TaxTable() {
  const t = useChartTheme();
  const { data: liveData, isLive, updatedAt } = useIndicatorData(
    'arca', taxData, (raw) => raw as typeof taxData,
  );

  return (
    <ChartCard
      title="Recaudación Tributaria Nacional"
      subtitle={isLive ? `Acumulado · Actualizado ${updatedAt} · ARCA` : 'Acumulado 2025 · En millones de ARS'}
      isLive={isLive}
    >
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-theme">
              <th className="text-left py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Concepto</th>
              <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Monto (M)</th>
              <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">% PIB</th>
              <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Var. real</th>
            </tr>
          </thead>
          <tbody>
            {liveData.map((row) => (
              <tr
                key={row.concepto}
                className={`border-b border-theme ${row.concepto === 'TOTAL' ? 'font-semibold' : ''}`}
                style={{ backgroundColor: row.concepto === 'TOTAL' ? t.tableBg : undefined }}
                onMouseEnter={(e) => { if (row.concepto !== 'TOTAL') e.currentTarget.style.backgroundColor = t.tableHover; }}
                onMouseLeave={(e) => { if (row.concepto !== 'TOTAL') e.currentTarget.style.backgroundColor = ''; }}
              >
                <td className="py-2.5 px-3" style={{ color: t.tableText }}>{row.concepto}</td>
                <td className="py-2.5 px-3 text-right font-mono" style={{ color: t.tableText }}>{row.monto}</td>
                <td className="py-2.5 px-3 text-right font-mono text-ar-celeste">{row.pctPIB}</td>
                <td className="py-2.5 px-3 text-right font-mono text-ar-green">{row.variacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
