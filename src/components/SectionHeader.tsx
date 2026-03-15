export default function SectionHeader({ id, title, subtitle, icon }: {
  id: string; title: string; subtitle: string; icon: string;
}) {
  return (
    <div id={id} className="mb-8 pt-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-theme-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {title}
        </h2>
      </div>
      <p className="text-sm text-theme-muted ml-11">{subtitle}</p>
      <div className="mt-4 h-px bg-gradient-to-r from-ar-celeste/30 via-ar-gold/20 to-transparent" />
    </div>
  );
}
