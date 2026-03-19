'use client';

import { useState, useEffect } from 'react';

interface RiesgoData {
  valor: number;
  fecha: string;
}

export default function RiesgoPaisVivo() {
  const [data, setData] = useState<RiesgoData | null>(null);
  const [prev, setPrev] = useState<RiesgoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRiesgo() {
      try {
        // ArgentinaDatos API — último valor riesgo país
        const res = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        setData({ valor: json.valor, fecha: json.fecha });

        // Buscar el valor anterior para calcular variación
        const histRes = await fetch('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais');
        if (histRes.ok) {
          const histJson = await histRes.json();
          if (histJson.length >= 2) {
            const prevData = histJson[histJson.length - 2];
            setPrev({ valor: prevData.valor, fecha: prevData.fecha });
          }
        }
      } catch {
        // Silencioso — se queda con el dato estático
      } finally {
        setLoading(false);
      }
    }

    fetchRiesgo();
    // Actualizar cada 10 minutos
    const interval = setInterval(fetchRiesgo, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return null;

  const cambio = prev ? data.valor - prev.valor : 0;
  const cambioPct = prev ? ((cambio / prev.valor) * 100).toFixed(1) : '0';
  const isDown = cambio <= 0;

  return (
    <div className="card-hover bg-theme-card border border-theme rounded-xl p-4 sm:p-5 relative overflow-hidden animate-fade-in">
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${
        isDown
          ? 'bg-gradient-to-r from-ar-green/80 to-ar-green/0'
          : 'bg-gradient-to-r from-ar-red/80 to-ar-red/0'
      }`} />

      <div className="flex items-center justify-between mb-2">
        <span className="text-xl sm:text-2xl">🌍</span>
        <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-ar-green/10 text-ar-green font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-ar-green animate-pulse" />
          EN VIVO
        </span>
      </div>

      <p className="text-[10px] sm:text-xs text-theme-muted uppercase tracking-wider font-medium mb-1">RIESGO PAÍS</p>
      <p className="text-lg sm:text-2xl font-bold text-theme-primary tracking-tight mb-1 font-mono">{data.valor} pb</p>

      <div className="flex items-center gap-1.5">
        <span className={`inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-mono font-medium ${
          isDown ? 'text-ar-green' : 'text-ar-red'
        }`}>
          {isDown ? '▼' : '▲'} {Math.abs(cambio)} pb ({cambioPct}%)
        </span>
      </div>

      <p className="text-[9px] sm:text-[10px] text-theme-faint mt-1">
        EMBI+ JP Morgan · {data.fecha}
      </p>
    </div>
  );
}
