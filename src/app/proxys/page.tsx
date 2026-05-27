import { Metadata } from "next";
import { M2ProxySection } from "@/components/M2ProxySection";

export const metadata: Metadata = {
  title: "Proxys Macro | MacroLibre",
  description:
    "Estimador de M2 Privado Transaccional con modelos de Machine Learning (Gradient Boosting, Markov Switching, Double ML). Proyecciones 2026.",
  openGraph: {
    title: "M2 Proxy ML | MacroLibre",
    description:
      "Demanda de dinero argentina con Gradient Boosting y Markov Switching. Desvío real: -0.4% (vs -48% del OLS). Proyección Dic-26: ARS 83T.",
  },
};

export default function ProxysPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <M2ProxySection />
      </div>
    </main>
  );
}
