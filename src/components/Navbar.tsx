'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lastUpdate } from '@/data/macroData';
import LionToggle from './LionToggle';

const navLinks = [
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#actividad', label: 'Actividad' },
  { href: '#fiscal', label: 'Fiscal' },
  { href: '#externo', label: 'Externo' },
  { href: '#precios', label: 'Precios' },
  { href: '#simulador', label: 'Interactivo' },   // ← AGREGE ESTA LÍNEA
  { href: '/articulos', label: 'Artículos' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-bg border-b border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo original "M" */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/MACRO.png" alt="MacroLibre" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-lg font-bold tracking-tight">
              <span className="text-theme-primary">Macro</span>
              <span className="text-ar-celeste">Libre</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition-colors rounded-md hover:bg-theme-hover"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: update badge + lion toggle + mobile menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ar-green/10 border border-ar-green/20">
              <span className="w-1.5 h-1.5 rounded-full bg-ar-green animate-pulse" />
              <span className="text-xs text-ar-green font-medium">{lastUpdate}</span>
            </div>

            {/* León para cambiar tema */}
            <LionToggle />

            {/* Mobile menu btn */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-theme-secondary hover:text-theme-primary"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-theme mt-2 pt-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-theme-secondary hover:text-theme-primary hover:bg-theme-hover rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
