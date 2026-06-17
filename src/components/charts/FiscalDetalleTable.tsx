'use client';

import ChartCard from '@/components/ChartCard';
import { useChartTheme } from './useChartTheme';
import { fiscalNominalData, fiscalGastoRealData } from '@/data/macroData';

function fmtMillones(n: number): string {
  return n.toLocaleString('es-AR');
}

export default function FiscalDetalleTable() {
  const t = useChartTheme();
  const ultimo = fiscalNominalData[fiscalNominalData.length - 1];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard
        title="Resultado fiscal nominal — SPNF"
        subtitle={`Mayo 2026 · millones de ARS · MECON`}
        csvData={fiscalNominalData.map((r) => ({
          Período: r.period,
          'Superávit primario (M)': r.primario,
          'Superávit financiero (M)': r.financiero,
          'Intereses deuda (M)': r.intereses,
        })) as unknown as Record<string, unknown>[]}
        csvFileName="resultado-fiscal-nominal"
      >
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr className="border-b border-theme">
                <th className="text-left py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Período</th>
                <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Primario</th>
                <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Financiero</th>
                <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Intereses</th>
              </tr>
            </thead>
            <tbody>
              {fiscalNominalData.map((row) => (
                <tr
                  key={row.period}
                  className={`border-b border-theme ${row.period === ultimo.period ? 'font-semibold' : ''}`}
                  style={{ backgroundColor: row.period === ultimo.period ? t.tableBg : undefined }}
                >
                  <td className="py-2.5 px-3" style={{ color: t.tableText }}>{row.period}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-ar-green">${fmtMillones(row.primario)}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-ar-celeste">${fmtMillones(row.financiero)}</td>
                  <td className="py-2.5 px-3 text-right font-mono" style={{ color: t.tableText }}>${fmtMillones(row.intereses)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-theme-muted leading-relaxed">
          Acumulado ene–may 2026: superávit primario 0,7% del PIB · superávit financiero 0,2% del PIB.
          Intereses netos de tenencias intra sector público.
        </p>
      </ChartCard>

      <ChartCard
        title="Gasto primario — variación real i.a."
        subtitle="Mayo 2026 · términos reales · MECON"
        csvData={fiscalGastoRealData.map((r) => ({
          Concepto: r.concepto,
          'Var. real i.a.': r.variacionReal,
        })) as unknown as Record<string, unknown>[]}
        csvFileName="gasto-primario-real-mayo-2026"
      >
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[320px]">
            <thead>
              <tr className="border-b border-theme">
                <th className="text-left py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Concepto</th>
                <th className="text-right py-2.5 px-3 text-xs text-theme-muted font-medium uppercase tracking-wider">Var. real i.a.</th>
              </tr>
            </thead>
            <tbody>
              {fiscalGastoRealData.map((row) => {
                const neg = row.variacionReal.startsWith('-');
                const pos = row.variacionReal.startsWith('+');
                return (
                  <tr
                    key={row.concepto}
                    className={`border-b border-theme ${row.destacado ? 'font-semibold' : ''}`}
                    style={{ backgroundColor: row.destacado ? t.tableBg : undefined }}
                  >
                    <td className="py-2.5 px-3" style={{ color: t.tableText }}>{row.concepto}</td>
                    <td
                      className={`py-2.5 px-3 text-right font-mono ${neg ? 'text-ar-green' : pos ? 'text-ar-magenta' : ''}`}
                    >
                      {row.variacionReal}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}