'use client';

export default function LionLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="lion-logo"
    >
      {/* Mane - outer ring */}
      <circle cx="50" cy="48" r="38" fill="url(#maneGradient)" />
      
      {/* Mane spikes */}
      <path d="M50 8 L54 18 L46 18Z" fill="url(#maneGradient)" />
      <path d="M30 14 L36 22 L28 24Z" fill="url(#maneGradient)" />
      <path d="M70 14 L72 24 L64 22Z" fill="url(#maneGradient)" />
      <path d="M14 30 L24 32 L20 40Z" fill="url(#maneGradient)" />
      <path d="M86 30 L80 40 L76 32Z" fill="url(#maneGradient)" />
      <path d="M10 50 L20 46 L20 54Z" fill="url(#maneGradient)" />
      <path d="M90 50 L80 54 L80 46Z" fill="url(#maneGradient)" />
      <path d="M16 68 L24 62 L26 70Z" fill="url(#maneGradient)" />
      <path d="M84 68 L74 70 L76 62Z" fill="url(#maneGradient)" />

      {/* Face */}
      <ellipse cx="50" cy="50" rx="28" ry="30" className="fill-ar-dark dark:fill-ar-dark" fill="#0F172A" />
      
      {/* Inner face lighter area */}
      <ellipse cx="50" cy="54" rx="20" ry="20" fill="#1a2436" />

      {/* Eyes */}
      <ellipse cx="39" cy="42" rx="5" ry="4.5" fill="#E2E8F0" />
      <ellipse cx="61" cy="42" rx="5" ry="4.5" fill="#E2E8F0" />
      <ellipse cx="40" cy="42" rx="2.5" ry="2.8" fill="#0A0E17" />
      <ellipse cx="62" cy="42" rx="2.5" ry="2.8" fill="#0A0E17" />
      {/* Eye shine */}
      <circle cx="41.5" cy="40.5" r="1" fill="white" opacity="0.8" />
      <circle cx="63.5" cy="40.5" r="1" fill="white" opacity="0.8" />

      {/* Nose */}
      <path d="M46 52 Q50 48 54 52 Q50 56 46 52Z" fill="#D4A843" />
      
      {/* Mouth */}
      <path d="M50 56 Q44 62 40 60" stroke="#64748B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 56 Q56 62 60 60" stroke="#64748B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="22" y1="50" x2="36" y2="52" stroke="#64748B" strokeWidth="0.8" opacity="0.5" />
      <line x1="22" y1="56" x2="36" y2="55" stroke="#64748B" strokeWidth="0.8" opacity="0.5" />
      <line x1="64" y1="52" x2="78" y2="50" stroke="#64748B" strokeWidth="0.8" opacity="0.5" />
      <line x1="64" y1="55" x2="78" y2="56" stroke="#64748B" strokeWidth="0.8" opacity="0.5" />

      {/* Ears */}
      <path d="M22 28 Q20 18 30 22 Q26 28 22 28Z" fill="url(#maneGradient)" />
      <path d="M78 28 Q80 18 70 22 Q74 28 78 28Z" fill="url(#maneGradient)" />
      <path d="M24 27 Q23 21 30 24 Q27 27 24 27Z" fill="#1a2436" />
      <path d="M76 27 Q77 21 70 24 Q73 27 76 27Z" fill="#1a2436" />

      <defs>
        <linearGradient id="maneGradient" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#74ACDF" />
          <stop offset="0.5" stopColor="#D4A843" />
          <stop offset="1" stopColor="#74ACDF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
