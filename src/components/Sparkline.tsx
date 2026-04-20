'use client';

import { useMemo } from 'react';

// ============================================================
// Sparkline — mini gráfico SVG sin dependencias
// ------------------------------------------------------------
// Pensado para embebirse en KPI cards. No necesita recharts:
// SVG puro con path suavizado y área con gradiente.
// ============================================================

type SparklineProps = {
  data: number[];
  width?: number;
  height?: number;
  /** Color principal (stroke). Default: celeste AR */
  color?: string;
  /** Forzar signo: positivo = verde, negativo = rojo, auto por slope */
  sign?: 'auto' | 'positive' | 'negative' | 'neutral';
  /** Si se muestra o no el área bajo la curva (default: true) */
  showArea?: boolean;
  /** Trazo final con punto */
  showDot?: boolean;
  /** Clases adicionales para el wrapper */
  className?: string;
};

export default function Sparkline({
  data,
  width = 120,
  height = 32,
  color,
  sign = 'auto',
  showArea = true,
  showDot = true,
  className,
}: SparklineProps) {
  const { linePath, areaPath, lastPoint, stroke, area1, area2 } = useMemo(() => {
    if (!data || data.length < 2) {
      return {
        linePath: '',
        areaPath: '',
        lastPoint: null as { x: number; y: number } | null,
        stroke: color ?? '#74ACDF',
        area1: 'rgba(116,172,223,0.25)',
        area2: 'rgba(116,172,223,0)',
      };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padY = 2;
    const usableH = height - padY * 2;

    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = padY + (1 - (v - min) / range) * usableH;
      return [x, y] as const;
    });

    // Smooth path con curvas de Bezier suaves (catmull-rom simplificado)
    const smoothLine = points
      .map(([x, y], i) => {
        if (i === 0) return `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        const [px, py] = points[i - 1];
        const cx = (px + x) / 2;
        return `Q ${px.toFixed(2)} ${py.toFixed(2)} ${cx.toFixed(2)} ${(
          (py + y) / 2
        ).toFixed(2)} T ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');

    const firstX = points[0][0];
    const lastX = points[points.length - 1][0];
    const areaD = `${smoothLine} L ${lastX.toFixed(2)} ${height} L ${firstX.toFixed(2)} ${height} Z`;

    // Color por signo
    const slope = data[data.length - 1] - data[0];
    let computedSign: Exclude<SparklineProps['sign'], 'auto'> =
      sign === 'auto'
        ? slope > 0
          ? 'positive'
          : slope < 0
          ? 'negative'
          : 'neutral'
        : sign!;

    const palette = {
      positive: { stroke: '#22C55E', a1: 'rgba(34,197,94,0.28)', a2: 'rgba(34,197,94,0)' },
      negative: { stroke: '#EF4444', a1: 'rgba(239,68,68,0.28)', a2: 'rgba(239,68,68,0)' },
      neutral:  { stroke: '#94A3B8', a1: 'rgba(148,163,184,0.25)', a2: 'rgba(148,163,184,0)' },
    } as const;

    const p = color
      ? { stroke: color, a1: color + '44', a2: color + '00' }
      : palette[computedSign];

    return {
      linePath: smoothLine,
      areaPath: areaD,
      lastPoint: { x: lastX, y: points[points.length - 1][1] },
      stroke: p.stroke,
      area1: p.a1,
      area2: p.a2,
    };
  }, [data, width, height, color, sign]);

  // Gradient id único por instancia para no colisionar entre sparklines
  const gradientId = useMemo(
    () => `spark-grad-${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  if (!linePath) {
    return (
      <div
        className={className}
        style={{ width, height, opacity: 0.35 }}
        aria-hidden
      />
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={area1} />
          <stop offset="100%" stopColor={area2} />
        </linearGradient>
      </defs>

      {showArea && <path d={areaPath} fill={`url(#${gradientId})`} />}

      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {showDot && lastPoint && (
        <>
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={3.5}
            fill={stroke}
            opacity={0.25}
          />
          <circle cx={lastPoint.x} cy={lastPoint.y} r={2} fill={stroke} />
        </>
      )}
    </svg>
  );
}
