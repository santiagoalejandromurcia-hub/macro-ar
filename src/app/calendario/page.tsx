import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import CalendarioContent from './CalendarioContent';

const SITE_URL = 'https://macrolibre.com';

export const metadata: Metadata = {
  title: 'Calendario económico Argentina · INDEC / BCRA',
  description:
    'Próximas publicaciones de IPC, EMAE, ICA, REM y más. Horarios en ART. Seed oficial INDEC + BCRA.',
  alternates: { canonical: `${SITE_URL}/calendario` },
};

export default function CalendarioPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <SectionHeader
        id="calendario"
        title="Calendario económico"
        subtitle="INDEC · BCRA — releases con horario ART"
        icon="📅"
      />
      <CalendarioContent />
    </div>
  );
}
