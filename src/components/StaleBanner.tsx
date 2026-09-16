'use client';

import { freshnessLabel } from '@/lib/freshness';

export default function StaleBanner({
  asOf,
  maxDays = 30,
  hint,
  label,
}: {
  asOf: string;
  maxDays?: number;
  hint?: string;
  label?: string;
}) {
  const f = freshnessLabel(asOf, maxDays);
  if (f.kind !== 'stale') return null;
  const extra = label || hint;
  return (
    <div
      role="status"
      className="rounded-lg px-4 py-3 text-[12px] font-mono"
      style={{
        background: 'color-mix(in oklch, var(--gold) 12%, transparent)',
        border: '1px solid color-mix(in oklch, var(--gold) 35%, var(--line-1))',
        color: 'var(--fg-1)',
      }}
    >
      <strong style={{ color: 'var(--gold)' }}>DATOS ESTÁTICOS</strong>
      {' · '}
      {f.text}
      {extra ? ` · ${extra}` : ''}
    </div>
  );
}
