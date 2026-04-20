// ════════════════════════════════════════════════════
// SectionHeader · eyebrow mono + Fraunces display
// Firma compatible con la anterior (id, title, subtitle, icon).
// `icon` queda por retro-compat pero ahora se renderiza como
// chip mono en el eyebrow, para mantener la estética bloomberg.
// ════════════════════════════════════════════════════

export default function SectionHeader({
  id,
  title,
  subtitle,
  icon,
  accent = 'celeste',
}: {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  accent?: 'celeste' | 'sol' | 'magenta';
}) {
  const accentColor =
    accent === 'sol'     ? 'var(--sol)'
  : accent === 'magenta' ? 'var(--magenta)'
  :                        'var(--celeste)';

  return (
    <div id={id} className="mb-8 pt-4">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em]"
          style={{ color: accentColor }}
        >
          ◆ {icon && <span className="mr-1.5">{icon}</span>}{subtitle.split(' — ')[0]?.slice(0, 24) ?? 'Sección'}
        </span>
        <span className="h-px w-12 bg-[var(--line-1)]" />
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--fg-2)]">#{id}</span>
      </div>
      <h2 className="font-display text-[32px] sm:text-[38px] leading-[1.05] tracking-tight text-[var(--fg-0)]">
        {title}
      </h2>
      <p className="mt-2 text-[13px] sm:text-[14px] text-[var(--fg-1)] max-w-2xl leading-relaxed">
        {subtitle}
      </p>
      <div className="mt-5 h-px bg-gradient-to-r from-[var(--line-1)] via-[var(--line-2)] to-transparent" />
    </div>
  );
}
