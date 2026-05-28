import { Metadata } from "next";
import { ExpectativasSection } from "@/components/ExpectativasSection";

export const metadata: Metadata = {
  title: "Expectativas de Inflación | MacroLibre",
  description: "Proxy de expectativas de inflación a 3 años usando Nelson-Siegel sobre el REM-BCRA. VAR estructural con Wild Bootstrap para identificar drivers del desanclaje.",
};

export default function ExpectativasPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExpectativasSection />
      </div>
    </main>
  );
}
