'use client';

import { useId } from 'react';

/**
 * Un iframe por símbolo contra el embed oficial de Mini Symbol Overview.
 * El loader de s3 (embed-widget-*.js) lee document.currentScript: con varios
 * widgets el navegador deduplica el src y el script aborta, y el cuadro queda
 * vacío. El hash del iframe es el mismo JSON que ese loader arma, con id propio.
 * El precio y el verde/rojo los pinta TradingView. Acá no hay último precio.
 */
export default function TvMini({ symbol, height }: { symbol: string; height: number }) {
  const reactId = useId().replace(/:/g, '');
  const frameId = `tv_${reactId}`;
  const config = {
    symbol,
    width: '100%',
    height,
    locale: 'es',
    dateRange: '1D',
    colorTheme: 'dark',
    isTransparent: false,
    autosize: false,
    largeChartUrl: '',
  };
  const src =
    `https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=es` +
    `&frameElementId=${frameId}#${encodeURIComponent(JSON.stringify(config))}`;

  return (
    <iframe
      id={frameId}
      title={symbol}
      src={src}
      loading="eager"
      style={{ width: '100%', height, border: 0, display: 'block', background: '#131722' }}
    />
  );
}
