import { Metadata } from "next";
import { M2ProxySection } from "@/components/M2ProxySection";

export const metadata: Metadata = {
  title: "M2 Proxy ML | MacroLibre",
  description:
    "Estimador de M2 Privado Transaccional con modelos de Machine Learning (Gradient Boosting, Markov Switching, Double ML). Proyecciones 2026.",
};

export default function M2ProxyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <M2ProxySection />
      </div>
    </main>
  );
}
