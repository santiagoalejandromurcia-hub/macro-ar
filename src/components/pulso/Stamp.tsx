export type StampKind = 'live' | 'cierre' | 'dato' | 'trim';

export default function Stamp({
  kind,
  period,
  asOf,
}: {
  kind: StampKind;
  period?: string;
  asOf?: string | null;
}) {
  const label =
    kind === 'live'
      ? 'LIVE'
      : kind === 'cierre'
        ? 'CIERRE'
        : kind === 'trim'
          ? period
            ? `TRIM ${period}`
            : 'TRIM'
          : period
            ? `DATO DE ${period}`
            : 'DATO';
  const color =
    kind === 'live'
      ? 'var(--up)'
      : kind === 'cierre'
        ? 'var(--celeste)'
        : 'var(--fg-3)';
  return (
    <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.06em]" style={{ fontSize: 9, color }}>
      {label}
      {asOf && kind !== 'dato' && kind !== 'trim' && (
        <span style={{ color: 'var(--fg-3)' }}>{asOf.slice(0, 10)}</span>
      )}
      {asOf && (kind === 'dato' || kind === 'trim') && (
        <span style={{ color: 'var(--fg-3)' }}>pub. {asOf.slice(0, 10)}</span>
      )}
    </span>
  );
}
