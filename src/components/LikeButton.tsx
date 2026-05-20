'use client';

import { useEffect, useState } from 'react';

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const storageKey = `liked-${slug}`;

  useEffect(() => {
    // Verificar si ya le dio like desde este navegador
    setLiked(localStorage.getItem(storageKey) === '1');

    // Obtener el contador actual
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, [slug, storageKey]);

  async function handleLike() {
    if (liked) return;

    // Animación inmediata
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    // Optimistic update
    setLiked(true);
    setCount((prev) => (prev ?? 0) + 1);
    localStorage.setItem(storageKey, '1');

    try {
      const res = await fetch(`/api/likes/${slug}`, { method: 'POST' });
      const data = await res.json();
      setCount(data.count ?? (count ?? 0) + 1);
    } catch {
      // Si falla, revertimos
      setLiked(false);
      setCount((prev) => Math.max((prev ?? 1) - 1, 0));
      localStorage.removeItem(storageKey);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={liked}
        title={liked ? 'Ya le diste like' : 'Me gusta este artículo'}
        className={`
          group flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200
          ${liked
            ? 'border-[var(--celeste)]/40 bg-[var(--celeste)]/8 cursor-default'
            : 'border-[var(--line-1)] hover:border-[var(--celeste)]/50 hover:bg-[var(--celeste)]/5 cursor-pointer active:scale-95'
          }
        `}
      >
        <span
          className={`text-xl transition-transform duration-300 select-none ${
            animating ? 'scale-150' : liked ? 'scale-110' : 'group-hover:scale-110'
          }`}
          style={{ display: 'inline-block' }}
        >
          {liked ? '👍' : '👍'}
        </span>
        <span
          className={`text-sm font-semibold tabular-nums transition-colors ${
            liked ? 'text-[var(--celeste)]' : 'text-[var(--fg-2)]'
          }`}
        >
          {count === null ? '—' : count}
        </span>
        <span className={`text-xs ${liked ? 'text-[var(--celeste)]' : 'text-[var(--fg-3)]'}`}>
          {liked ? '¡Gracias!' : 'Me gusta'}
        </span>
      </button>
    </div>
  );
}
