'use client';

import { KPICard } from '@/data/macroData';

export default function KPICardComponent({ card, index }: { card: KPICard; index: number }) {
  return (
    <div
      className="card-hover bg-theme-card border border-theme rounded-xl p-4 sm:p-5 relative overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${
        card.change >= 0
          ? 'bg-gradient-to-r from-ar-green/80 to-ar-green/0'
          : 'bg-gradient-to-r from-ar-red/80 to-ar-red/0'
      }`} />

      <div className="flex items-start justify-between mb-3">
        <span className="text-xl sm:text-2xl">{card.icon}</span>
        <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${
          card.change >= 0 ? 'bg-ar-green/10 text-ar-green' : 'bg-ar-red/10 text-ar-red'
        }`}>
          {card.change >= 0 ? '▲' : '▼'} {Math.abs(card.change)}%
        </span>
      </div>

      <p className="text-[10px] sm:text-xs text-theme-muted uppercase tracking-wider font-medium mb-1">{card.title}</p>
      <p className="text-lg sm:text-2xl font-bold text-theme-primary tracking-tight mb-1 font-mono">{card.value}</p>
      <p className="text-[10px] sm:text-[11px] text-theme-muted">{card.changeLabel}</p>
      {card.unit && <p className="text-[9px] sm:text-[10px] text-theme-faint mt-1">{card.unit}</p>}
    </div>
  );
}
