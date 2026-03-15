export default function ChartCard({ title, subtitle, children, className = '' }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-theme-card border border-theme rounded-xl p-4 sm:p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-theme-primary">{title}</h3>
        {subtitle && <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
