'use client';

import { useState, useEffect } from 'react';

interface DolarData {
  blue: { value_buy: number; value_sell: number };
  oficial: { value_buy: number; value_sell: number };
  last_update: string;
}

export default function DolarBlueVivo() {
  const [data, setData] = useState<DolarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchDolar() {
      try {
        const res = await fetch('https://api.bluelytics.com.ar/v2/latest');
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        setData(json);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDolar();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchDolar, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-theme-card border border-theme rounded-xl p-4 sm:p-5 animate-pulse">
            <div className="skeleton h-6 w-6 rounded mb-3" />
            <div className="skeleton h-3 w-20 mb-2" />
            <div className="skeleton h-7 w-28 mb-1" />
            <div className="skeleton h-2 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) return null; // Silencioso si falla, se muestran los datos estáticos

  const brecha = data.blue.value_sell > 0 && data.oficial.value_sell > 0
    ? ((data.blue.value_sell / data.oficial.value_sell - 1) * 100).toFixed(1)
    : null;

  const cards = [
    {
      icon: '💵',
      title: 'DÓLAR BLUE',
      value: `$${data.blue.value_sell.toLocaleString('es-AR')}`,
      sub: `Compra: $${data.blue.value_buy.toLocaleString('es-AR')}`,
      accent: 'ar-green',
    },
    {
      icon: '🏦',
      title: 'DÓLAR OFICIAL',
      value: `$${data.oficial.value_sell.toLocaleString('es-AR')}`,
      sub: `Compra: $${data.oficial.value_buy.toLocaleString('es-AR')}`,
      accent: 'ar-celeste',
    },
    {
      icon: '📊',
      title: 'BRECHA',
      value: brecha ? `${brecha}%` : '—',
      sub: 'Blue vs Oficial',
      accent: 'ar-gold',
    },
  ];

  return (
    <div className="col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-3 grid grid-cols-3 gap-3 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="card-hover bg-theme-card border border-theme rounded-xl p-4 sm:p-5 relative overflow-hidden"
        >
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-${card.accent}/80 to-${card.accent}/0`} />

          <div className="flex items-center justify-between mb-2">
            <span className="text-xl sm:text-2xl">{card.icon}</span>
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-ar-green/10 text-ar-green font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-ar-green animate-pulse" />
              EN VIVO
            </span>
          </div>

          <p className="text-[10px] sm:text-xs text-theme-muted uppercase tracking-wider font-medium mb-1">{card.title}</p>
          <p className="text-lg sm:text-2xl font-bold text-theme-primary tracking-tight mb-1 font-mono">{card.value}</p>
          <p className="text-[10px] sm:text-[11px] text-theme-muted">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
