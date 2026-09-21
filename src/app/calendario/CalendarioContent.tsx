'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StaleBanner from '@/components/StaleBanner';
import { CALENDAR_SEED_ASOF } from '@/data/economicCalendar';
import { upcomingEvents, type CalEventView } from '@/lib/economicCalendar';

export default function CalendarioContent() {
  const [rows, setRows] = useState<CalEventView[]>([]);
  useEffect(() => {
    const tick = () => setRows(upcomingEvents({ limit: 40, minImportance: 1, includeReleasedToday: true }));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <StaleBanner asOf={CALENDAR_SEED_ASOF} maxDays={45} label="Seed del calendario (PDF INDEC / BCRA)" />
      <p className="text-[13px] text-[var(--fg-2)]">
        INDEC: 16:00 ART. REM BCRA: 18:00 ART (default). No hay API free del calendario; datos curados desde PDFs oficiales.
      </p>
      <div style={{ overflowX: 'auto', border: '1px solid var(--line-1)', borderRadius: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
          <thead>
            <tr style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.08em', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>FECHA</th>
              <th style={{ padding: 12 }}>HORA</th>
              <th style={{ padding: 12 }}>EVENTO</th>
              <th style={{ padding: 12 }}>FUENTE</th>
              <th style={{ padding: 12 }}>COUNTDOWN</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} style={{ borderTop: '1px solid var(--line-1)' }}>
                <td style={{ padding: 12 }}>{e.date}</td>
                <td style={{ padding: 12 }}>{e.timeArt}</td>
                <td style={{ padding: 12 }}>
                  {e.href ? <Link href={e.href} className="hover:text-[var(--celeste)]">{e.title}</Link> : e.title}
                  {e.period ? <span style={{ color: 'var(--fg-3)' }}> · {e.period}</span> : null}
                </td>
                <td style={{ padding: 12 }}>{e.source}</td>
                <td style={{ padding: 12, color: e.importance >= 3 ? 'var(--gold)' : 'var(--fg-2)' }}>
                  {e.countdownLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
