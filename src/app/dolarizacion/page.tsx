import { Metadata } from "next";
import { DolarizacionSection } from "@/components/DolarizacionSection";

export const metadata: Metadata = {
  title: "Dolarización de Portafolios | MacroLibre",
  description: "Proxy de confianza en el peso: depósitos en dólares como porcentaje del total bancario argentino. Evolución 2016–2026, análisis por regímenes cambiarios.",
};

export default function DolarizacionPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DolarizacionSection />
      </div>
    </main>
  );
}
