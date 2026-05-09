import { ImageResponse } from 'next/og';
import { articles } from '@/data/articles';

// ============================================================
// OG Image dinámica por artículo
// Next la genera on-demand y la cachea como /articulos/[slug]/opengraph-image
// Aparece automáticamente como <meta property="og:image"> y twitter:image
// ============================================================

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'MacroLibre — Artículo';

// Nota: Next descubre los slugs vía generateStaticParams del page.tsx
// hermano y genera una OG por cada uno automáticamente.

export default async function Image(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a1018',
            color: '#fff',
            fontSize: 48,
          }}
        >
          MacroLibre
        </div>
      ),
      size,
    );
  }

  // Paleta del sitio (OKLCH aproximado a hex para canvas)
  const BG_DARK = '#0a1018';
  const BG_CARD = '#10182a';
  const FG_PRIMARY = '#f5f7fa';
  const FG_SECONDARY = '#a8b2c1';
  const FG_MUTED = '#6b7787';
  const ACCENT = '#5DC1E0'; // celeste argentino
  const GOLD = '#D4A843';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, ${BG_DARK} 0%, ${BG_CARD} 100%)`,
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow celeste decorativo arriba-derecha */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
            display: 'flex',
          }}
        />

        {/* ─── Header: marca + emoji ─── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${GOLD} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: BG_DARK,
                fontWeight: 800,
                fontSize: 22,
              }}
            >
              M
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: FG_PRIMARY, fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
                MacroLibre
              </span>
              <span
                style={{
                  color: FG_MUTED,
                  fontSize: 12,
                  fontFamily: 'monospace',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                ARGENTINA · ECONOMÍA EN VIVO
              </span>
            </div>
          </div>
          <div style={{ fontSize: 64, display: 'flex' }}>{article.image}</div>
        </div>

        {/* ─── Tags ─── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {article.tags.slice(0, 3).map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '6px 14px',
                borderRadius: 999,
                background: `${ACCENT}15`,
                border: `1px solid ${ACCENT}33`,
                color: ACCENT,
                fontSize: 16,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* ─── Título principal ─── */}
        <div
          style={{
            display: 'flex',
            color: FG_PRIMARY,
            fontSize: article.title.length > 70 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1,
            marginBottom: 24,
            maxWidth: 1000,
          }}
        >
          {article.title}
        </div>

        {/* ─── Resumen (clipped) ─── */}
        <div
          style={{
            display: 'flex',
            color: FG_SECONDARY,
            fontSize: 22,
            lineHeight: 1.4,
            maxWidth: 980,
            overflow: 'hidden',
          }}
        >
          {article.summary.length > 160
            ? article.summary.slice(0, 160).trim() + '…'
            : article.summary}
        </div>

        {/* ─── Spacer ─── */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* ─── Footer: autor + fecha ─── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 24,
            borderTop: `1px solid ${FG_MUTED}33`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${GOLD} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {article.author[0]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: FG_PRIMARY, fontSize: 20, fontWeight: 600, lineHeight: 1 }}>
                {article.author}
              </span>
              <span style={{ color: FG_MUTED, fontSize: 14, marginTop: 4 }}>
                {article.authorRole}
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span style={{ color: FG_PRIMARY, fontSize: 16, fontWeight: 500 }}>
              {article.date}
            </span>
            <span
              style={{
                color: FG_MUTED,
                fontSize: 13,
                marginTop: 4,
                fontFamily: 'monospace',
              }}
            >
              {article.readTime} de lectura
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      // emoji: 'twemoji', // descomentar si querés emojis con estilo Twitter
    },
  );
}
