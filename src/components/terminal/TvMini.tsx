'use client';

import { useEffect, useRef } from 'react';

/**
 * Mini Symbol Overview oficial de TradingView.
 * El precio y la variación los imprime el widget; acá no hay último precio tipeado.
 */
export default function TvMini({ symbol }: { symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.replaceChildren();

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    widget.style.height = '100%';
    widget.style.width = '100%';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      symbol,
      width: '100%',
      height: '100%',
      locale: 'es',
      dateRange: '1M',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: true,
      largeChartUrl: '',
    });

    el.append(widget, script);
    return () => {
      el.replaceChildren();
    };
  }, [symbol]);

  return <div ref={ref} className="tradingview-widget-container h-full w-full min-h-0" />;
}
