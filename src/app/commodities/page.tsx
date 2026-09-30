import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import CommoditiesCharts from './CommoditiesCharts';

export const metadata: Metadata = {
  title: 'Commodities',
  description: 'FOB de granos y precios de surtidor YPF CABA. Las fichas de granos, carnes y uva siguen en su ruta.',
};

export default function CommoditiesPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="commodities"
        title="Commodities"
        subtitle="FOB y surtidor"
        accent="sol"
      />
      <CommoditiesCharts />
      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/granos" className="inline-flex items-center h-9 px-3 rounded-md border border-[var(--line-1)] text-[13px] font-mono text-[var(--fg-1)] hover:text-[var(--fg-0)]">Granos</Link>
        <Link href="/carnes" className="inline-flex items-center h-9 px-3 rounded-md border border-[var(--line-1)] text-[13px] font-mono text-[var(--fg-1)] hover:text-[var(--fg-0)]">Carnes</Link>
        <Link href="/uva" className="inline-flex items-center h-9 px-3 rounded-md border border-[var(--line-1)] text-[13px] font-mono text-[var(--fg-1)] hover:text-[var(--fg-0)]">Uva y vinos</Link>
      </div>
    </div>
  );
}
