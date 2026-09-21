'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { upcomingEvents, type CalEventView } from '@/lib/economicCalendar';

export default function CalendarCard() {
  const [rows, setRows] = useState<CalEventView[]>([]);

  useEffect(() => {
    const tick = () => setRows(upcomingEvents({ limit: 5, minImportance: 2 }));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const next = rows[0];

  return (
    <div
      style={{
        borderTop: '1px solid var(--line-1)',
        background: 'var(--bg-1)',
        padding: '12px 14px 10px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-2)', fontFamily: 'monospace' }}>
          CALENDARIO · AR
        </span>
        <Link href="/calendario" style={{ fontSize: 10, color: 'var(--celeste)', letterSpacing: '0.06em' }}>
          VER TODO →
        </Link>
      </div>

      {next && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>PRÓXIMO</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-0)' }}>
            {next.title}
            {next.period ? <span style={{ color: 'var(--fg-2)', fontWeight: 400 }}> · {next.period}</span> : null}
          </div>
          <div style={{ fontSize: 12, color: 'var(--gold)', fontVariantNumeric: 'tabular-nums' }}>
            {next.date} · {next.timeArt} ART · {next.countdownLabel}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: 6 }}>
        {rows.map((e) => (
          <div
            key={e.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr 64px',
              gap: 8,
              fontSize: 11,
              alignItems: 'center',
              opacity: e.status === 'released' ? 0.55 : 1,
            }}
          >
            <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--fg-2)' }}>
              {e.date.slice(5)}
              <br />
              <span style={{ color: e.status === 'today' ? 'var(--up)' : 'var(--fg-3)' }}>{e.timeArt}</span>
            </span>
            <span style={{ color: 'var(--fg-0)' }}>
              {e.href ? <Link href={e.href}>{e.title}</Link> : e.title}
              <span style={{ color: 'var(--fg-3)' }}> · {e.source}</span>
            </span>
            <span style={{ textAlign: 'right', color: e.importance >= 3 ? 'var(--gold)' : 'var(--fg-3)' }}>
              {e.countdownLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
