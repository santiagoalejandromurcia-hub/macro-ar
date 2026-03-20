import Link from 'next/link';
import {
  InflacionMensualChart, InflacionInteranualChart, REMChart,
} from '@/components/Charts';
import InflacionMayoristaChart from '@/components/InflacionMayoristaChart';

export const metadata = {
  title: 'Precios e Inflación — MacroLibre',
  description: 'IPC mensual, interanual, núcleo, inflación mayorista (IPIM) y expectativas REM del BCRA. Datos actualizados de Argentina.',
};

export default function PreciosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="text-sm text-theme-muted hover:text-ar-celeste transition-colors mb-4 inline-block">
          ← Volver al Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🏷️</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-theme-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Precios e Inflación
          </h1>
        </div>
        <p className="text-theme-secondary ml-11">
          IPC mensual, interanual, núcleo, inflación mayorista (IPIM) y expectativas REM del BCRA. Fuente: INDEC, BCRA.
        </p>
        <div className="mt-5 h-px bg-gradient-to-r from-ar-celeste/30 via-ar-gold/20 to-transparent" />
      </div>

      {/* All charts */}
      <div className="space-y-6">

        {/* IPC Mensual + Interanual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InflacionMensualChart />
          <InflacionInteranualChart />
        </div>

        {/* Mayorista */}
        <InflacionMayoristaChart />

        {/* REM */}
        <REMChart />

        {/* Nota metodológica */}
        <div className="bg-theme-surface border border-theme rounded-xl p-5">
          <h3 className="text-sm font-semibold text-theme-primary mb-3">📐 Sobre los indicadores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-ar-celeste mb-1">IPC — Nivel General</p>
              <p className="text-[11px] text-theme-muted leading-relaxed">Índice de Precios al Consumidor. Mide la variación de precios de una canasta representativa de bienes y servicios. Fuente: INDEC.</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ar-celeste mb-1">IPC Núcleo</p>
              <p className="text-[11px] text-theme-muted leading-relaxed">Excluye precios regulados y estacionales. Refleja la tendencia subyacente de la inflación. Fuente: INDEC.</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ar-gold mb-1">IPIM — Mayorista</p>
              <p className="text-[11px] text-theme-muted leading-relaxed">Índice de Precios Internos al por Mayor. Mide la evolución de precios de productos nacionales e importados a nivel mayorista. Fuente: INDEC.</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ar-green mb-1">REM — Expectativas</p>
              <p className="text-[11px] text-theme-muted leading-relaxed">Relevamiento de Expectativas de Mercado. Encuesta mensual del BCRA a analistas y consultoras sobre inflación esperada.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
