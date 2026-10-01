'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import TvMini from '@/components/terminal/TvMini';
import { celdasArchivo, tonoDe, type Tono } from '@/components/terminal/economiaArchivo';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const TZ = 'America/Argentina/Mendoza';

const COMMODITIES: { label: string; symbol: string; unit: string }[] = [
  { label: 'WTI PETRÓLEO', symbol: 'TVC:USOIL', unit: 'USD/bbl' },
  { label: 'SOJA', symbol: 'CAPITALCOM:SOYBEAN', unit: 'CFD · ZS' },
  { label: 'MAÍZ', symbol: 'CAPITALCOM:CORN', unit: 'CFD · ZC' },
  { label: 'TRIGO', symbol: 'CAPITALCOM:WHEAT', unit: 'CFD · ZW' },
  { label: 'ORO', symbol: 'TVC:GOLD', unit: '' },
];

const EMPRESAS: { label: string; symbol: string }[] = [
  { label: 'YPFD', symbol: 'BCBA:YPFD' },
  { label: 'GGAL', symbol: 'BCBA:GGAL' },
  { label: 'PAMP', symbol: 'BCBA:PAMP' },
  { label: 'BMA', symbol: 'BCBA:BMA' },
  { label: 'TXAR', symbol: 'BCBA:TXAR' },
  { label: 'LOMA', symbol: 'BCBA:LOMA' },
  { label: 'SUPV', symbol: 'BCBA:SUPV' },
  { label: 'CEPU', symbol: 'BCBA:CEPU' },
  { label: 'TGSU2', symbol: 'BCBA:TGSU2' },
  { label: 'EDN', symbol: 'BCBA:EDN' },
  { label: 'ALUA', symbol: 'BCBA:ALUA' },
  { label: 'TECO2', symbol: 'BCBA:TECO2' },
  { label: 'TRAN', symbol: 'BCBA:TRAN' },
  { label: 'VIST', symbol: 'BCBA:VIST' },
  { label: 'BBAR', symbol: 'BCBA:BBAR' },
  { label: 'BYMA', symbol: 'BCBA:BYMA' },
];

/**
 * El ticker de Mini Symbol Overview (nombre + último + %) mide 94px.
 * Por debajo de eso el precio se corta. El gráfico recién aparece a 150px,
 * y a 160px la página no entra en 1280×720. Acá el alto visible puede ser
 * menor: el iframe se dibuja a 100px (precio y % enteros) y se escala.
 */
const TV_NATURAL = 100;
const COMMODITY_H = 112;
const EMPRESA_H = 70;
const BONO_TV_H = 64;

/** Precio de mercado lo imprime el widget. La curva de abajo es un cierre, no el vivo. */
const BONOS_TV: { label: string; symbol: string }[] = [
  { label: 'GD30', symbol: 'BCBA:GD30' },
  { label: 'AL30', symbol: 'BCBA:AL30' },
  { label: 'GD35', symbol: 'BCBA:GD35' },
  { label: 'AL35', symbol: 'BCBA:AL35' },
];

/** Cierre que pasó el usuario el 30 sep 2026. No es la impresión del día. */
const CURVA_FECHA = 'cierre 30 sep 2026';
const CURVA_X = ['29', '30', '35', '38', '41', '46'];
const CURVA_Y = [14, 12, 10, 8];
const GD_TIR = [9.34, 10.04, 11.25, 11.20, 11.19, 10.88];
const AL_TIR = [11.74, 12.65, 12.65, 13.11];
const CURVA_LISTA: [string, string, string][] = [
  ['GD29', '87.79', '9.34%'],
  ['GD30', '83.97', '10.04%'],
  ['GD35', '69.91', '11.25%'],
  ['GD38', '73.79', '11.20%'],
  ['AL29', '51.18', '11.74%'],
  ['AL30', '51.73', '12.65%'],
  ['AL35', '66.82', '12.65%'],
  ['AL38', '69.91', '13.11%'],
];

const PLOT = { x0: 44, x1: 306, y14: 16, y8: 108 };

function curvaXY(i: number, tir: number): [number, number] {
  const x = PLOT.x0 + (i / 5) * (PLOT.x1 - PLOT.x0);
  const y = PLOT.y14 + ((14 - tir) / 6) * (PLOT.y8 - PLOT.y14);
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function curvaPath(tirs: number[]): string {
  return tirs.map((tir, i) => {
    const [x, y] = curvaXY(i, tir);
    return `${i === 0 ? 'M' : 'L'}${x} ${y}`;
  }).join(' ');
}

type LiveCell = {
  id: string;
  label: string;
  value: string | null;
  period: string | null;
  source: string;
  tono?: Tono;
};

type YpfLive = {
  mes: string;
  source: string;
  rows: { label: string; precio: string; unidad: string }[];
};

function fechaMendoza(d = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const month = MESES[Number(get('month')) - 1] ?? '';
  return `${Number(get('day'))} ${month} ${get('year')}`;
}

/** Fecha de calendario que devolvió la fuente. No reescribe un día faltante como hoy. */
function fechaFuente(raw: string | null | undefined): string | null {
  if (!raw) return null;
  if (raw.includes('T')) {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return null;
    return fechaMendoza(d);
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim());
  if (!m) return raw.trim();
  const mes = MESES[Number(m[2]) - 1];
  if (!mes) return raw.trim();
  return `${Number(m[3])} ${mes} ${m[1]}`;
}

function fmtNum(n: number): string {
  return n.toLocaleString('es-AR', { maximumFractionDigits: 2 });
}

function Panel({
  title,
  className = '',
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`min-h-0 min-w-0 flex flex-col bg-[#111] border border-[#2a2a2a] ${className}`}>
      <h2 className="shrink-0 px-1.5 pt-1 text-[10px] tracking-[0.14em] text-[#e2b340]">{title}</h2>
      <div className="flex-1 min-h-0 px-1.5 pb-1">{children}</div>
    </section>
  );
}

function SinSerie() {
  return <p className="text-[12px] text-[#9a9a9a]">sin serie en vivo</p>;
}

/** Iframe a 100px (precio y % enteros) y escala si el hueco es más bajo. */
function TvSlot({ symbol, slotH }: { symbol: string; slotH: number }) {
  const naturalH = Math.max(TV_NATURAL, slotH);
  const scale = slotH / naturalH;
  return (
    <div className="relative w-full overflow-hidden" style={{ height: slotH }}>
      <div
        className="absolute left-0 top-0"
        style={{
          width: `${100 / scale}%`,
          height: naturalH,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <TvMini symbol={symbol} height={naturalH} />
      </div>
    </div>
  );
}

export default function TerminalScreen() {
  const archivo = celdasArchivo();
  const [hoy, setHoy] = useState('');
  const [dolar, setDolar] = useState<LiveCell | null>(null);
  const [reservas, setReservas] = useState<LiveCell | null>(null);
  const [riesgo, setRiesgo] = useState<LiveCell | null>(null);
  const [ypf, setYpf] = useState<YpfLive | null | 'no'>(null);
  const [listo, setListo] = useState(false);
  const [bcra, setBcra] = useState<LiveCell[] | null>(null);

  useEffect(() => {
    setHoy(fechaMendoza());
    const id = window.setInterval(() => setHoy(fechaMendoza()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancel = false;

    async function cargar() {
      try {
      const [dolRes, rieRes, ypfRes] = await Promise.all([
        fetch('/api/dolares').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/riesgo-pais').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/surtidores').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);
      if (cancel) return;

      const tc = dolRes?.tc as { fecha?: string; valor?: number } | null | undefined;
      const tcFecha = fechaFuente(tc?.fecha);
      if (tc && typeof tc.valor === 'number' && tc.valor > 0 && tcFecha) {
        setDolar({
          id: 'dolar-oficial',
          label: 'Dólar oficial',
          value: `${fmtNum(tc.valor)} ARS`,
          period: tcFecha,
          source: 'BCRA mayorista var 5',
        });
      } else {
        let oficial: LiveCell | null = null;
        try {
          const blue = await fetch('/api/dolar').then((r) => (r.ok ? r.json() : null));
          const sell = blue?.oficial?.value_sell as number | undefined;
          const cuando = fechaFuente(blue?.last_update);
          if (!cancel && typeof sell === 'number' && sell > 0 && cuando) {
            oficial = {
              id: 'dolar-oficial',
              label: 'Dólar oficial',
              value: `${fmtNum(sell)} ARS`,
              period: cuando,
              source: 'Bluelytics oficial',
            };
          }
        } catch { /* sin fallback de archivo */ }
        if (!cancel) setDolar(oficial);
      }

      const stock = dolRes?.reservas as { fecha?: string; valor?: number } | null | undefined;
      const stockFecha = fechaFuente(stock?.fecha);
      if (stock && typeof stock.valor === 'number' && stock.valor > 0 && stockFecha) {
        setReservas({
          id: 'reservas',
          label: 'Reservas BCRA',
          value: `${fmtNum(stock.valor)} USD M`,
          period: stockFecha,
          source: 'BCRA var 1',
        });
      } else if (!cancel) {
        setReservas(null);
      }

      const ultimo = rieRes?.ultimo as { valor?: number; fecha?: string } | undefined;
      const rieFecha = fechaFuente(ultimo?.fecha);
      const anterior = rieRes?.anterior as { valor?: number } | undefined;
      if (ultimo && typeof ultimo.valor === 'number' && rieFecha) {
        const delta = typeof anterior?.valor === 'number' ? ultimo.valor - anterior.valor : null;
        setRiesgo({
          id: 'riesgo',
          label: 'Riesgo país',
          value: `${fmtNum(ultimo.valor)} bps`,
          period: rieFecha,
          source: 'JP Morgan EMBIGD · ArgentinaDatos',
          tono: tonoDe(delta),
        });
      } else if (!cancel) {
        setRiesgo(null);
      }

      if (
        ypfRes?.isLive === true &&
        typeof ypfRes.super === 'number' &&
        typeof ypfRes.premium === 'number' &&
        typeof ypfRes.gasoil === 'number' &&
        typeof ypfRes.euro === 'number' &&
        ypfRes.mes
      ) {
        setYpf({
          mes: String(ypfRes.mes),
          source: String(ypfRes.source ?? 'Surtidores.com.ar'),
          rows: [
            { label: 'Nafta Súper', precio: fmtNum(ypfRes.super), unidad: 'ARS/litro' },
            { label: 'Infinia', precio: fmtNum(ypfRes.premium), unidad: 'ARS/litro' },
            { label: 'Diesel 500', precio: fmtNum(ypfRes.gasoil), unidad: 'ARS/litro' },
            { label: 'Infinia Diesel', precio: fmtNum(ypfRes.euro), unidad: 'ARS/litro' },
          ],
        });
      } else {
        setYpf('no');
      }
        try {
          const bcraRes = await fetch('/api/terminal/bcra').then((r) => (r.ok ? r.json() : null));
          const rows = Array.isArray(bcraRes?.series) ? bcraRes.series : [];
          const cells: LiveCell[] = [];
          for (const row of rows) {
            const cuando = fechaFuente(row?.fecha);
            if (typeof row?.valor !== 'number' || !cuando) continue;
            const valor = row.key === 'base'
              ? `${fmtNum(row.valor)} ${row.unit ?? ''}`.trim()
              : `${row.valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% n.a.`;
            cells.push({
              id: String(row.key),
              label: String(row.label),
              value: valor,
              period: cuando,
              source: `BCRA var ${row.idVariable}`,
              tono: tonoDe(typeof row.cambio === 'number' ? row.cambio : null),
            });
          }
          if (!cancel) setBcra(cells);
        } catch {
          if (!cancel) setBcra([]);
        }
      } finally {
        if (!cancel) setListo(true);
      }
    }

    cargar();
    return () => {
      cancel = true;
    };
  }, []);

  const vivas: LiveCell[] = [
    dolar ?? { id: 'dolar-oficial', label: 'Dólar oficial', value: null, period: null, source: 'BCRA' },
    reservas ?? { id: 'reservas', label: 'Reservas BCRA', value: null, period: null, source: 'BCRA' },
    riesgo ?? { id: 'riesgo', label: 'Riesgo país', value: null, period: null, source: 'EMBIGD' },
  ];

  const econOrder = ['dolar-oficial', 'fiscal', 'reservas', 'riesgo', 'ipc', 'ipc-nucleo', 'emae'];
  const econ = econOrder.map((id) => {
    const live = vivas.find((c) => c.id === id);
    if (live) return { kind: 'live' as const, ...live };
    const file = archivo.find((c) => c.id === id);
    if (file) return { kind: 'file' as const, ...file };
    return null;
  }).filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <div className="h-dvh max-lg:h-auto overflow-hidden max-lg:overflow-visible bg-[#0b0b0b] text-white font-mono flex flex-col">
      <header className="shrink-0 h-8 border-b border-[#2a2a2a] grid grid-cols-1 lg:grid-cols-[minmax(140px,1fr)_minmax(180px,380px)_minmax(140px,1fr)] items-center gap-2 px-2">
        <Link href="/" className="text-[12px] tracking-[0.16em] text-[#e2b340] hover:text-[#f0d48a]">
          MACROLÍBRE TERMINAL
        </Link>
        <input
          type="text"
          placeholder="BEI   YPF   NAFTA   RES"
          aria-label="Comando"
          autoComplete="off"
          spellCheck={false}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
          className="w-full h-6 bg-transparent border border-[#2a2a2a] px-2 text-[12px] text-white placeholder:text-[#6a6a6a] outline-none"
        />
        <p className="lg:text-right text-[12px] text-[#d7d7d7]">
          TradingView
          <span className="text-[#9a9a9a]"> {hoy}</span>
        </p>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1fr)_minmax(0,1.08fr)] lg:grid-rows-1">
        <div className="min-h-0 lg:h-full grid grid-rows-[auto_auto_auto] lg:grid-rows-[136px_200px_minmax(0,1fr)] lg:gap-0">
          <Panel title="YPF · SURTIDOR" className="lg:border-b-0">
            {ypf === null && <p className="text-[12px] text-[#9a9a9a]">cargando</p>}
            {ypf === 'no' && <SinSerie />}
            {ypf && ypf !== 'no' && (
              <div className="h-full min-h-0 flex flex-col">
                <p className="text-[10px] leading-none text-[#9a9a9a] mb-0.5">
                  {ypf.source} · {ypf.mes}
                </p>
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="text-[#9a9a9a] text-left">
                      <th className="font-normal pb-0.5 border-b border-[#2a2a2a]">producto</th>
                      <th className="font-normal pb-0.5 border-b border-[#2a2a2a] text-right">precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ypf.rows.map((row) => (
                      <tr key={row.label} className="border-b border-[#222]">
                        <td className="py-px">{row.label}</td>
                        <td className="py-px text-right tabular-nums">
                          {row.precio} <span className="text-[#9a9a9a]">{row.unidad}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>

          <Panel title="ECONOMÍA" className="lg:-mt-px">
            <ul className="h-full min-h-0 grid grid-cols-2 gap-x-2 content-start overflow-hidden">
              {[...econ, ...(bcra ?? []).map((c) => ({ kind: 'live' as const, ...c }))].map((cell) => (
                <li key={cell.id} className="min-w-0 border-t border-[#222] pt-px">
                  <p className="text-[9px] leading-none tracking-wide text-[#e2b340]">{cell.label}</p>
                  {cell.value ? (
                    <>
                      <p className={`text-[12px] leading-none tabular-nums ${cell.tono === 'up' ? 'text-[#3cba6a]' : cell.tono === 'down' ? 'text-[#e0544a]' : 'text-white'}`}>{cell.value}</p>
                      <p className="text-[9px] leading-none text-[#b5b5b5] truncate">
                        {cell.period} · {cell.source}
                      </p>
                    </>
                  ) : cell.kind === 'live' && !listo ? (
                    <p className="text-[11px] text-[#9a9a9a]">cargando</p>
                  ) : (
                    <SinSerie />
                  )}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="BONOS · CURVA" className="lg:-mt-px min-h-0">
            <div className="h-full min-h-0 flex flex-col">
              <div className="min-h-0 flex-1 grid grid-cols-[minmax(0,1fr)_88px] gap-1">
                <svg viewBox="0 0 320 150" className="w-full h-full min-h-[120px]" role="img" aria-label={`Curva soberana USD, ${CURVA_FECHA}`}>
                  <line x1="36" y1={PLOT.y14} x2="36" y2={PLOT.y8} stroke="#3a3a3a" strokeWidth="1" />
                  <line x1="36" y1={PLOT.y8} x2={PLOT.x1} y2={PLOT.y8} stroke="#3a3a3a" strokeWidth="1" />
                  {CURVA_Y.map((tick) => {
                    const y = curvaXY(0, tick)[1];
                    return (
                      <g key={tick}>
                        <line x1="36" y1={y} x2={PLOT.x1} y2={y} stroke="#2a2a2a" strokeWidth="1" />
                        <text x="32" y={y + 3} textAnchor="end" fill="#9a9a9a" fontSize="10">{tick}</text>
                      </g>
                    );
                  })}
                  {CURVA_X.map((tick, i) => (
                    <text key={tick} x={curvaXY(i, 8)[0]} y="122" textAnchor="middle" fill="#9a9a9a" fontSize="10">{tick}</text>
                  ))}
                  <path d={curvaPath(GD_TIR)} fill="none" stroke="#e2b340" strokeWidth="1.6" />
                  <path d={curvaPath(AL_TIR)} fill="none" stroke="#d7d7d7" strokeWidth="1.6" />
                  {GD_TIR.map((tir, i) => {
                    const [x, y] = curvaXY(i, tir);
                    return <circle key={`gd${i}`} cx={x} cy={y} r="2.2" fill="#e2b340" />;
                  })}
                  {AL_TIR.map((tir, i) => {
                    const [x, y] = curvaXY(i, tir);
                    return <circle key={`al${i}`} cx={x} cy={y} r="2.2" fill="#d7d7d7" />;
                  })}
                  <line x1="48" y1="138" x2="64" y2="138" stroke="#e2b340" strokeWidth="1.6" />
                  <text x="68" y="141" fill="#e2b340" fontSize="9">ARGENT</text>
                  <line x1="118" y1="138" x2="134" y2="138" stroke="#d7d7d7" strokeWidth="1.6" />
                  <text x="138" y="141" fill="#d7d7d7" fontSize="9">ARGBON</text>
                </svg>
                <ul className="text-[10px] leading-[13px] tabular-nums">
                  {CURVA_LISTA.map(([ticker, px, tir]) => (
                    <li key={ticker} className="flex justify-between gap-1 border-b border-[#222]">
                      <span className={ticker.startsWith('GD') ? 'text-[#e2b340]' : 'text-white'}>{ticker}</span>
                      <span>{px}</span>
                      <span className="text-[#9a9a9a]">{tir}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="shrink-0 text-[10px] text-[#c8c8c8]">{CURVA_FECHA} · no es el vivo</p>
              <div className="shrink-0 grid grid-cols-2 gap-px">
                {BONOS_TV.map((b) => (
                  <div key={b.symbol} className="min-w-0">
                    <TvSlot symbol={b.symbol} slotH={BONO_TV_H} />
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        <Panel title="COMMODITIES · TradingView" className="min-h-0">
          <div className="h-full min-h-0 flex flex-col">
            {COMMODITIES.map((row) => (
              <div key={row.symbol} className="relative border-t border-[#222] min-h-0">
                <div className="pointer-events-none absolute top-1 right-1 z-10 max-w-[46%] text-right">
                  <p className="text-[11px] leading-tight text-white">{row.label}</p>
                  {row.unit && <p className="text-[10px] text-[#9a9a9a]">{row.unit}</p>}
                  <p className="text-[10px] text-[#6a6a6a]">{row.symbol}</p>
                </div>
                <TvSlot symbol={row.symbol} slotH={COMMODITY_H} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="EMPRESAS AR · TradingView" className="min-h-0">
          <div className="h-full min-h-0 grid grid-cols-2 grid-rows-8 gap-px bg-[#2a2a2a]">
            {EMPRESAS.map((card) => (
              <div key={card.symbol} className="bg-[#111] min-w-0 min-h-0">
                <TvSlot symbol={card.symbol} slotH={EMPRESA_H} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <footer className="shrink-0 h-5 px-2 flex items-center border-t border-[#2a2a2a] text-[10px] text-[#9a9a9a]">
        Fuentes oficiales · gráficos de mercados vía TradingView · datos de bonos
      </footer>
    </div>
  );
}
