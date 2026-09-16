export function SeriesAsOf({
  label,
  asOf,
  note,
}: {
  label: string;
  asOf: string;
  note?: string;
}) {
  return (
    <p style={{ fontSize: 12, color: 'var(--fg-2)', margin: '4px 0 12px' }}>
      <strong style={{ color: 'var(--fg-1)' }}>{label}</strong>
      {' · '}
      último corte: <span style={{ fontVariantNumeric: 'tabular-nums' }}>{asOf}</span>
      {note ? ` — ${note}` : ''}
    </p>
  );
}
