import { ImageResponse } from 'next/og';

// ============================================================
// OG Image global (para la home y rutas que no tengan su propia)
// Reemplaza /og-image.png estática.
// Aparece como og:image y twitter:image automáticamente.
// ============================================================

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'MacroLibre — Pulso económico de Argentina en tiempo real';

export default async function Image() {
  const BG_DARK = '#0a1018';
  const BG_CARD = '#10182a';
  const FG_PRIMARY = '#f5f7fa';
  const FG_SECONDARY = '#a8b2c1';
  const FG_MUTED = '#6b7787';
  const ACCENT = '#5DC1E0';
  const GOLD = '#D4A843';
  const UP = '#10b981';
  const DOWN = '#ef4444';

  // Mini-tablero con valores de ejemplo (no se actualizan; es portada).
  // Si querés OG con datos en vivo más adelante, hay que mover esto a una
  // route handler /api/og que fetchee el endpoint público.
  const stats = [
    { k: 'Inflación may', v: '2.1%', color: DOWN },
    { k: 'Reservas BCRA', v: 'USD 46Bn', color: UP },
    { k: 'Riesgo país', v: '535 pb', color: ACCENT },
    { k: 'Dólar blue', v: '$1.450', color: GOLD },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, ${BG_DARK} 0%, ${BG_CARD} 100%)`,
          padding: '72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow celeste decorativo */}
        <div
          style={{
            position: 'absolute',
            top: -150,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: -120,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
            display: 'flex',
          }}
        />

        {/* ─── Header marca ─── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 56 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${GOLD} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: BG_DARK,
              fontWeight: 800,
              fontSize: 32,
            }}
          >
            M
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: FG_PRIMARY, fontSize: 32, fontWeight: 700, lineHeight: 1 }}>
              MacroLibre
            </span>
            <span
              style={{
                color: FG_MUTED,
                fontSize: 14,
                fontFamily: 'monospace',
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                marginTop: 6,
              }}
            >
              ARGENTINA · ECONOMÍA EN VIVO
            </span>
          </div>
        </div>

        {/* ─── Título principal ─── */}
        <div
          style={{
            display: 'flex',
            color: FG_PRIMARY,
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 18,
            maxWidth: 1000,
          }}
        >
          Pulso económico
        </div>
        <div
          style={{
            display: 'flex',
            color: ACCENT,
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 32,
          }}
        >
          en tiempo real
        </div>

        {/* ─── Subtítulo ─── */}
        <div
          style={{
            display: 'flex',
            color: FG_SECONDARY,
            fontSize: 24,
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          Dólar, inflación, riesgo país, reservas BCRA, simulador histórico y análisis macro.
        </div>

        {/* ─── Spacer ─── */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* ─── Mini-tablero KPIs ─── */}
        <div
          style={{
            display: 'flex',
            gap: 18,
            paddingTop: 32,
            borderTop: `1px solid ${FG_MUTED}33`,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.k}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '18px 22px',
                background: `${BG_DARK}88`,
                border: `1px solid ${FG_MUTED}22`,
                borderRadius: 12,
              }}
            >
              <span
                style={{
                  color: FG_MUTED,
                  fontSize: 13,
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginBottom: 8,
                }}
              >
                {s.k}
              </span>
              <span style={{ color: s.color, fontSize: 28, fontWeight: 700 }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
