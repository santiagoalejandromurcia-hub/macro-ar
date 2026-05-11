'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const initial = (user.name || user.email || '?')[0].toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 h-8 pl-1 pr-2.5 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md hover:border-[var(--celeste)]/40 transition"
        aria-label="Menú de usuario"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name || ''} className="w-6 h-6 rounded-full" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--celeste)] to-[var(--sol)] flex items-center justify-center text-[10px] font-bold text-white">
            {initial}
          </div>
        )}
        <span className="hidden sm:inline text-[12px] text-[var(--fg-1)]">
          {user.name?.split(' ')[0] || user.email?.split('@')[0]}
        </span>
        <svg
          className={`w-3 h-3 text-[var(--fg-2)] transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M3 4.5 L6 7.5 L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 p-2 bg-[var(--bg-0)] border border-[var(--line-1)] rounded-xl shadow-2xl shadow-black/40">
          <div className="px-3 py-2 border-b border-[var(--line-1)] mb-1">
            <div className="text-[13px] font-medium text-[var(--fg-0)] truncate">
              {user.name || 'Usuario'}
            </div>
            <div className="text-[11px] text-[var(--fg-3)] truncate">{user.email}</div>
          </div>
          <Link
            href="/cuenta"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-[13px] text-[var(--fg-1)] hover:text-[var(--fg-0)] hover:bg-[var(--bg-1)] rounded-md"
          >
            Mi cuenta
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: '/' });
            }}
            className="w-full text-left px-3 py-2 text-[13px] text-[var(--fg-1)] hover:text-[var(--magenta)] hover:bg-[var(--bg-1)] rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
