import type { Metadata } from 'next';
import TerminalScreen from '@/components/terminal/TerminalScreen';

export const metadata: Metadata = {
  title: 'Terminal',
  description:
    'Pantalla de mercado. Commodities y acciones por TradingView. Series macro con la fecha que devolvió la fuente.',
  alternates: { canonical: '/terminal' },
};

export default function TerminalPage() {
  return <TerminalScreen />;
}
