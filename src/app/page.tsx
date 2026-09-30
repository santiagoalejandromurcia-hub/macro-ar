import HomeSearch from '@/components/home/HomeSearch';
import { homeChips } from '@/lib/homeChips';
import Link from 'next/link';

export default function HomePage() {
  const chips = homeChips();

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-16 sm:pt-28 pb-24">
      <HomeSearch />
      {chips.length > 0 && (
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <li key={c.id}>
              <Link
                href={c.href}
                className="inline-flex items-center h-8 px-3 rounded-full border border-[var(--line-1)] bg-[var(--bg-1)] text-[12px] font-mono text-[var(--fg-1)] hover:border-[var(--celeste)]/40 hover:text-[var(--fg-0)] transition"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
