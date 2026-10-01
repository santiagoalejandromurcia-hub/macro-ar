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
 * Mini Symbol Overview: el ticker (nombre + último + variación) mide 94px.
 * El gráfico solo se monta si el alto es >= 150. A 72px el precio y el %
 * quedan cortados y a la derecha del ticker no hay gráfico.
 */
const TV_ROW_H = 160;
const TV_CARD_H = 112;

/** Precio lo imprime el widget. No hay TIR acá: data912 no trae rendimiento. */
const BONOS_TV: { label: string; symbol: string }[] = [
  { label: 'GD30', symbol: 'BCBA:GD30' },
  { label: 'AL30', symbol: 'BCBA:AL30' },
  { label: 'GD35', symbol: 'BCBA:GD35' },
  { label: 'AL35', symbol: 'BCBA:AL35' },
];

const CURVA_X = ['29', '30', '35', '38', '41', '46'];
const CURVA_Y = ['14', '12', '10', '8'];

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
      <h2 className="shrink-0 px-2 pt-1.5 text-[11px] tracking-[0.14em] text-[#e2b340]">{title}</h2>
      <div className="flex-1 min-h-0 px-2 pb-1.5">{children}</div>
    </section>
  );
}

function SinSerie() {
  return <p className="text-[12px] text-[#9a9a9a]">sin serie en vivo</p>;
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
    <div className="min-h-dvh bg-[#0b0b0b] text-white font-mono flex flex-col">
      <header className="shrink-0 h-auto lg:h-9 border-b border-[#2a2a2a] grid grid-cols-1 lg:grid-cols-[minmax(160px,1fr)_minmax(220px,440px)_minmax(160px,1fr)] items-center gap-2 px-3 py-1.5 lg:py-0">
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
          className="w-full h-7 bg-transparent border border-[#2a2a2a] px-2 text-[12px] text-white placeholder:text-[#6a6a6a] outline-none"
        />
        <p className="lg:text-right text-[12px] text-[#d7d7d7]">
          TradingView
          <span className="text-[#9a9a9a]"> {hoy}</span>
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Panel title="YPF · SURTIDOR">
          {ypf === null && <p className="text-[12px] text-[#9a9a9a]">cargando</p>}
          {ypf === 'no' && <SinSerie />}
          {ypf && ypf !== 'no' && (
            <div className="h-full min-h-0 flex flex-col">
              <p className="text-[10px] text-[#9a9a9a] mb-1">
                {ypf.source} · {ypf.mes}
              </p>
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="text-[#9a9a9a] text-left">
                    <th className="font-normal pb-1 border-b border-[#2a2a2a]">producto</th>
                    <th className="font-normal pb-1 border-b border-[#2a2a2a] text-right">precio</th>
                  </tr>
                </thead>
                <tbody>
                  {ypf.rows.map((row) => (
                    <tr key={row.label} className="border-b border-[#222]">
                      <td className="py-0.5">{row.label}</td>
                      <td className="py-0.5 text-right tabular-nums">
                        {row.precio} <span className="text-[#9a9a9a]">{row.unidad}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel title="COMMODITIES · TradingView">
          <div>
            {COMMODITIES.map((row) => (
              <div key={row.symbol} className="relative border-t border-[#222]">
                <div className="pointer-events-none absolute top-1.5 right-2 z-10 max-w-[46%] text-right">
                  <p className="text-[11px] leading-tight text-white">{row.label}</p>
                  {row.unit && <p className="text-[10px] text-[#9a9a9a]">{row.unit}</p>}
                  <p className="text-[10px] text-[#6a6a6a]">{row.symbol}</p>
                </div>
                <TvMini symbol={row.symbol} height={TV_ROW_H} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="ECONOMÍA">
          <ul className="h-full min-h-0 grid grid-cols-2 gap-x-3 gap-y-1 content-start overflow-auto">
            {[...econ, ...(bcra ?? []).map((c) => ({ kind: 'live' as const, ...c }))].map((cell) => (
              <li key={cell.id} className="min-w-0 border-t border-[#222] pt-1">
                <p className="text-[10px] tracking-wide text-[#e2b340]">{cell.label}</p>
                {cell.value ? (
                  <>
                    <p className={`text-[13px] leading-tight tabular-nums ${cell.tono === 'up' ? 'text-[#3cba6a]' : cell.tono === 'down' ? 'text-[#e0544a]' : 'text-white'}`}>{cell.value}</p>
                    <p className="text-[10px] text-[#b5b5b5] leading-snug">
                      {cell.period} · {cell.source}
                    </p>
                  </>
                ) : cell.kind === 'live' && !listo ? (
                  <p className="text-[12px] text-[#9a9a9a]">cargando</p>
                ) : (
                  <SinSerie />
                )}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="BONOS · CURVA">
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)] gap-2">
            <div className="min-h-0 flex flex-col">
              <p className="text-[11px] text-[#e2b340]">Curva soberana USD · TIR</p>
              <svg viewBox="0 0 320 150" className="w-full flex-1 min-h-[120px]" role="img" aria-label="Eje de TIR sin serie">
                <line x1="36" y1="12" x2="36" y2="124" stroke="#3a3a3a" strokeWidth="1" />
                <line x1="36" y1="124" x2="308" y2="124" stroke="#3a3a3a" strokeWidth="1" />
                {CURVA_Y.map((tick, i) => {
                  const y = 18 + i * 26;
                  return (
                    <g key={tick}>
                      <line x1="36" y1={y} x2="308" y2={y} stroke="#2a2a2a" strokeWidth="1" />
                      <text x="30" y={y + 3} textAnchor="end" fill="#9a9a9a" fontSize="10">{tick}</text>
                    </g>
                  );
                })}
                {CURVA_X.map((tick, i) => {
                  const x = 52 + i * 46;
                  return (
                    <text key={tick} x={x} y="140" textAnchor="middle" fill="#9a9a9a" fontSize="10">{tick}</text>
                  );
                })}
              </svg>
              <p className="text-[10px] text-[#6a6a6a]">eje TIR % · vencimientos</p>
            </div>
            <div className="min-w-[280px] flex flex-col gap-1">
              <SinSerie />
              <div className="grid grid-cols-1 gap-1">
                {BONOS_TV.map((b) => (
                  <div key={b.symbol} className="relative min-w-0">
                    <p className="pointer-events-none absolute top-1.5 right-2 z-10 text-[10px] text-[#9a9a9a]">
                      {b.label} <span className="text-[#6a6a6a]">{b.symbol}</span>
                    </p>
                    <TvMini symbol={b.symbol} height={TV_ROW_H} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="EMPRESAS AR · TradingView" className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-px bg-[#2a2a2a]">
            {EMPRESAS.map((card) => (
              <div key={card.symbol} className="bg-[#111] min-w-0 flex flex-col">
                <p className="shrink-0 px-1.5 pt-1 text-[11px] text-white">
                  {card.label} <span className="text-[#6a6a6a]">{card.symbol}</span>
                </p>
                <p className="shrink-0 px-1.5 text-[10px] text-[#9a9a9a]">ARS</p>
                <TvMini symbol={card.symbol} height={TV_CARD_H} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <footer className="shrink-0 h-6 px-3 flex items-center border-t border-[#2a2a2a] text-[10px] text-[#9a9a9a]">
        Fuentes oficiales · gráficos de mercados vía TradingView · datos de bonos
      </footer>
    </div>
  );
}
