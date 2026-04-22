import type { Metadata } from 'next';
import Calculator from '@/components/Calculator/Calculator';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: '¿Dólar, Plazo Fijo o Bonos? · MacroLibre',
  description:
    'Simulador histórico ajustado por inflación: compará retornos reales de Plazo Fijo, Dólar MEP/Blue, LECAPs y bonos AL30/GD30 entre dos fechas. Datos en vivo del BCRA, INDEC y ArgentinaDatos.',
};

export default function CalculadoraPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="calculadora"
        title="¿Dólar, plazo fijo o bonos?"
        subtitle="La pregunta que todo argentino se hace — con datos reales, ajustados por inflación, en vivo."
        accent="celeste"
      />

      <Calculator />

      <div className="mt-10 glass p-5 md:p-6 text-[13px] text-[var(--fg-1)] leading-relaxed">
        <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">
          ¿Cómo lo calculamos?
        </h2>
        <p className="mb-2">
          La calculadora toma series históricas en vivo del BCRA (TNA BADLAR), INDEC (IPC) y
          ArgentinaDatos (cotizaciones MEP y blue), y las combina con los cronogramas fijos de
          los bonos y las tasas publicadas de cada emisión de LECAP.
        </p>
        <p className="mb-2">
          Todos los retornos se muestran en dos formatos:{' '}
          <span className="text-[var(--fg-0)] font-semibold">nominal</span> (pesos finales crudos) y
          {' '}<span className="text-[var(--fg-0)] font-semibold">real</span> (pesos ajustados a poder
          adquisitivo de la fecha inicial, deflactados por IPC). El real es el que importa.
        </p>
        <p className="text-[var(--fg-2)] text-[12px]">
          Los resultados son aproximaciones educativas. No constituyen recomendación de inversión.
          Para decisiones concretas, consultá un asesor matriculado.
        </p>
      </div>
    </div>
  );
}
