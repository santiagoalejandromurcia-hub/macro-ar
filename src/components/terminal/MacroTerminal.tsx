'use client';

import { useState, useEffect, useMemo, useCallback, type CSSProperties } from 'react';
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  emaeData, inflacionData, reservasData, fiscalData,
  inflacionMayoristaData, remData, pbiData, tcrData, riesgoPaisData,
} from '@/data/macroData';
import { preciosFOB } from '@/data/granos';
import { bonosNominales, bonosReales, remEsperado } from '@/data/breakEven';
import { construirCurvaBEI } from '@/lib/breakEven';

// ══════════════════════════════════════════════════════════════════
// MacroTerminal — Bloomberg-style dashboard
//   · filas clickeables → grafican su serie histórica
//   · sparklines inline por indicador
//   · atajos de teclado: 1-5 tabs · ESC deselecciona
//   · responsive (stack en mobile)
// ══════════════════════════════════════════════════════════════════

type Tab = 'TODOS' | 'ACTIVIDAD' | 'PRECIOS' | 'EXTERNO' | 'FISCAL';
type DeltaSign = 'pos' | 'neg' | 'flat' | 'live';

interface DolarData {
  blue: { value_buy: number; value_sell: number };
  oficial: { value_buy: number; value_sell: number };
}
interface RiesgoData { valor: number; fecha: string }

interface SnapshotRow {
  id: string;
  label: string;
  value: string;
  deltaMes: string | null;
  sign: DeltaSign;
  fuente: string;
  tabs: Tab[];
  isLive?: boolean;
}

// ─── helpers ─────────────────────────────────────────────────────
function last<T>(arr: T[]): T { return arr[arr.length - 1]; }
function prev<T>(arr: T[]): T { return arr[arr.length - 2]; }

// ─── series por fila: alimenta sparklines y el gráfico al click ──
interface RowSeries {
  title: string;
  unit: string;
  color: string;
  data: { date: string; value: number }[];
}

const ROW_SERIES: Record<string, RowSeries> = {
  'emae':           { title: 'EMAE — ÍNDICE 2004=100',        unit: '',        color: '#00C9A7', data: emaeData.map(d => ({ date: d.date, value: d.value })) },
  'pbi':            { title: 'PBI — VAR. INTERANUAL (%)',     unit: '%',       color: '#00C9A7', data: pbiData.map(d => ({ date: d.quarter, value: d.yoy })) },
  'inflacion':      { title: 'IPC MENSUAL (%)',               unit: '%',       color: '#f85149', data: inflacionData.map(d => ({ date: d.date, value: d.mensual })) },
  'ipc-interanual': { title: 'IPC INTERANUAL (%)',            unit: '%',       color: '#f85149', data: inflacionData.map(d => ({ date: d.date, value: d.interanual })) },
  'ipc-nucleo':     { title: 'IPC NÚCLEO MENSUAL (%)',        unit: '%',       color: '#D4A843', data: inflacionData.map(d => ({ date: d.date, value: d.nucleo })) },
  'ipim':           { title: 'IPIM MAYORISTA MENSUAL (%)',    unit: '%',       color: '#A78BFA', data: inflacionMayoristaData.map(d => ({ date: d.date, value: d.mensual })) },
  'superavit':      { title: 'RESULTADO PRIMARIO (% PIB)',    unit: '% PIB',   color: '#F0A500', data: fiscalData.map(d => ({ date: d.period, value: d.primario })) },
  'reservas':       { title: 'RESERVAS BCRA (USD M)',         unit: 'M',       color: '#74ACDF', data: reservasData.map(d => ({ date: d.date, value: d.value })) },
  'rem-prox':       { title: 'REM — MEDIANA ESPERADA (%)',    unit: '%',       color: '#38BDF8', data: remData.map(d => ({ date: d.period, value: d.mediana })) },
  'fob-soja':       { title: 'SOJA FOB (USD/tn)',             unit: ' USD/tn', color: '#22C55E', data: preciosFOB.map(d => ({ date: d.mes, value: d.soja })) },
  'fob-maiz':       { title: 'MAÍZ FOB (USD/tn)',             unit: ' USD/tn', color: '#F0A500', data: preciosFOB.map(d => ({ date: d.mes, value: d.maiz })) },
  'fob-trigo':      { title: 'TRIGO FOB (USD/tn)',            unit: ' USD/tn', color: '#D4A843', data: preciosFOB.map(d => ({ date: d.mes, value: d.trigo })) },
  'dolar-blue':     { title: 'DÓLAR BLUE (ARS)',              unit: ' ARS',    color: '#00C9A7', data: tcrData.map(d => ({ date: d.date, value: d.blue })) },
  'dolar-oficial':  { title: 'DÓLAR OFICIAL (ARS)',           unit: ' ARS',    color: '#74ACDF', data: tcrData.map(d => ({ date: d.date, value: d.oficial })) },
  'brecha':         { title: 'BRECHA CAMBIARIA (%)',          unit: '%',       color: '#F0A500', data: tcrData.map(d => ({ date: d.date, value: Number((((d.blue / d.oficial) - 1) * 100).toFixed(1)) })) },
  'riesgo':         { title: 'RIESGO PAÍS (GD35C YTM - US rf)', unit: ' pb', color: '#f85149', data: riesgoPaisData.map(d => ({ date: d.date, value: d.value })) },
};

function buildRows(
  dolar: DolarData | null,
  riesgo: RiesgoData | null,
  riesgoPrev: RiesgoData | null,
): SnapshotRow[] {
  const brecha =
    dolar && dolar.blue.value_sell > 0 && dolar.oficial.value_sell > 0
      ? (dolar.blue.value_sell / dolar.oficial.value_sell - 1) * 100
      : null;
  const riesgoDelta = riesgo && riesgoPrev ? riesgo.valor - riesgoPrev.valor : null;

  const ipcL = last(inflacionData);
  const ipcP = prev(inflacionData);
  const ipimL = last(inflacionMayoristaData);
  const ipimP = prev(inflacionMayoristaData);
  const fobL = last(preciosFOB);
  const fobP = prev(preciosFOB);
  const fwIdx = remData.findIndex(r => r.actual === null);
  const remFw = remData.filter(r => r.actual === null);

  return [
    // ── ACTIVIDAD ─────────────────────────────────────────────
    { id: 'emae',      label: 'EMAE',               value: '+5.5%',        deltaMes: '▲ +0.30%',    sign: 'pos',  fuente: 'INDEC',  tabs: ['TODOS','ACTIVIDAD'] },
    { id: 'pbi',       label: 'PBI Real',            value: '+3.8%',        deltaMes: '▲ var. Q4-25', sign: 'pos', fuente: 'INDEC',  tabs: ['TODOS','ACTIVIDAD'] },

    // ── PRECIOS: IPC ──────────────────────────────────────────
    { id: 'inflacion', label: 'Inflación IPC',  value: `${ipcL.mensual.toFixed(1)}%`,
      deltaMes: `▼ -0.80%`, sign: 'neg', fuente: 'INDEC', tabs: ['TODOS','PRECIOS'] },
    {
      id: 'ipc-interanual', label: 'IPC Interanual',
      value: `${ipcL.interanual.toFixed(1)}%`,
      deltaMes: (() => {
        const d = ipcL.interanual - ipcP.interanual;
        return `${d > 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)} pp`;
      })(),
      sign: ipcL.interanual <= ipcP.interanual ? 'pos' : 'neg',
      fuente: 'INDEC', tabs: ['PRECIOS'],
    },
    {
      id: 'ipc-nucleo', label: 'IPC Núcleo',
      value: `${ipcL.nucleo.toFixed(1)}%`,
      deltaMes: (() => {
        const d = ipcL.nucleo - ipcP.nucleo;
        return `${d > 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)} pp`;
      })(),
      sign: ipcL.nucleo <= ipcP.nucleo ? 'pos' : 'neg',
      fuente: 'INDEC', tabs: ['PRECIOS'],
    },
    {
      id: 'ipim', label: 'IPIM Mayorista',
      value: `${ipimL.mensual.toFixed(1)}%`,
      deltaMes: (() => {
        const d = ipimL.mensual - ipimP.mensual;
        return `${d > 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)} pp`;
      })(),
      sign: ipimL.mensual <= ipimP.mensual ? 'pos' : 'neg',
      fuente: 'INDEC', tabs: ['TODOS','PRECIOS'],
    },

    // ── FISCAL / EXTERNO ──────────────────────────────────────
    { id: 'superavit', label: 'Superávit Primario', value: '0.7%',  deltaMes: '▲ +0.20 pp', sign: 'pos',  fuente: 'MECON', tabs: ['TODOS','FISCAL'] },
    { id: 'reservas',  label: 'Reservas BCRA',       value: 'USD 47.874M', deltaMes: '▲ +1.80%', sign: 'pos', fuente: 'BCRA',  tabs: ['TODOS','EXTERNO'] },
    { id: 'tamar',     label: 'TAMAR',               value: '23.00% n.a.', deltaMes: '— sin cambio', sign: 'flat', fuente: 'BCRA', tabs: ['TODOS','PRECIOS','FISCAL'] },

    // ── REM ───────────────────────────────────────────────────
    {
      id: 'rem-prox', label: 'REM próx. mes',
      value: fwIdx >= 0 ? `${remData[fwIdx].mediana.toFixed(1)}%` : '—',
      deltaMes: remFw.length >= 2
        ? `+1m ${remFw[0].mediana.toFixed(1)}% / +2m ${remFw[1].mediana.toFixed(1)}%`
        : null,
      sign: 'flat', fuente: 'BCRA REM', tabs: ['PRECIOS'],
    },

    // ── PRECIOS AGRARIOS FOB ──────────────────────────────────
    {
      id: 'fob-soja', label: 'Soja FOB',
      value: `USD ${fobL.soja}`,
      deltaMes: (() => {
        const d = ((fobL.soja / fobP.soja) - 1) * 100;
        return `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}% m/m`;
      })(),
      sign: fobL.soja >= fobP.soja ? 'pos' : 'neg',
      fuente: 'MAGyP', tabs: ['PRECIOS'],
    },
    {
      id: 'fob-maiz', label: 'Maíz FOB',
      value: `USD ${fobL.maiz}`,
      deltaMes: (() => {
        const d = ((fobL.maiz / fobP.maiz) - 1) * 100;
        return `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}% m/m`;
      })(),
      sign: fobL.maiz >= fobP.maiz ? 'pos' : 'neg',
      fuente: 'MAGyP', tabs: ['PRECIOS'],
    },
    {
      id: 'fob-trigo', label: 'Trigo FOB',
      value: `USD ${fobL.trigo}`,
      deltaMes: (() => {
        const d = ((fobL.trigo / fobP.trigo) - 1) * 100;
        return `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}% m/m`;
      })(),
      sign: fobL.trigo >= fobP.trigo ? 'pos' : 'neg',
      fuente: 'MAGyP', tabs: ['PRECIOS'],
    },

    // ── LIVE ─────────────────────────────────────────────────
    {
      id: 'dolar-blue', label: 'Dólar Blue', isLive: true,
      value: dolar ? `$${dolar.blue.value_sell.toLocaleString('es-AR')}` : '—',
      deltaMes: dolar ? `Compra $${dolar.blue.value_buy.toLocaleString('es-AR')}` : null,
      sign: 'live', fuente: 'BLYTICS', tabs: ['TODOS','EXTERNO'],
    },
    {
      id: 'dolar-oficial', label: 'Dólar Oficial', isLive: true,
      value: dolar ? `$${dolar.oficial.value_sell.toLocaleString('es-AR')}` : '—',
      deltaMes: dolar ? `Compra $${dolar.oficial.value_buy.toLocaleString('es-AR')}` : null,
      sign: 'live', fuente: 'BNA', tabs: ['TODOS','EXTERNO'],
    },
    {
      id: 'brecha', label: 'Brecha Cambiaria', isLive: true,
      value: brecha !== null ? `${brecha > 0 ? '+' : ''}${brecha.toFixed(1)}%` : '—',
      deltaMes: 'Blue vs Oficial',
      sign: brecha !== null ? (brecha > 5 ? 'neg' : brecha < 0 ? 'pos' : 'flat') : 'flat',
      fuente: 'CALC.', tabs: ['TODOS','EXTERNO'],
    },
    {
      id: 'riesgo', label: 'Riesgo País (GD35C YTM)', isLive: true,
      value: riesgo ? `${riesgo.valor.toLocaleString('es-AR')} pb` : '—',
      deltaMes: riesgoDelta !== null ? `${riesgoDelta > 0 ? '▲' : '▼'} ${Math.abs(riesgoDelta)} pb` : null,
      sign: riesgoDelta !== null ? (riesgoDelta <= 0 ? 'pos' : 'neg') : 'flat',
      fuente: 'MERCADO (GD35C YTM)', tabs: ['TODOS','EXTERNO'],
    },
  ];
}

// ─── chart config ─────────────────────────────────────────────────
interface ChartConfig {
  data: Array<Record<string, unknown>>;
  key: string;
  colorHex: string;
  colorHex2?: string;   // segunda serie (PRECIOS: núcleo)
  unit: string;
  title: string;
}

function getChartConfig(tab: Tab): ChartConfig {
  switch (tab) {
    case 'PRECIOS':
      return {
        data: inflacionData.slice(-18).map(d => ({ date: d.date, mensual: d.mensual, nucleo: d.nucleo })),
        key: 'mensual', colorHex: '#f85149', colorHex2: '#D4A843',
        unit: '%', title: 'IPC MENSUAL + NÚCLEO (%)',
      };
    case 'EXTERNO':
      return { data: reservasData.slice(-14), key: 'value', colorHex: '#74ACDF', unit: 'M', title: 'RESERVAS BCRA (USD M)' };
    case 'FISCAL':
      return { data: fiscalData.slice(-14).map(d => ({ date: d.period, value: d.primario })), key: 'value', colorHex: '#F0A500', unit: '% PIB', title: 'RESULTADO PRIMARIO (% PIB)' };
    default:
      return { data: emaeData.slice(-16).map(d => ({ date: d.date, value: d.value })), key: 'value', colorHex: '#00C9A7', unit: '', title: 'EMAE — ÍNDICE 2004=100' };
  }
}

// ─── sign colors ─────────────────────────────────────────────────
const SIGN_COLOR: Record<DeltaSign, CSSProperties> = {
  pos:  { color: 'var(--teal)' },
  neg:  { color: 'var(--down)' },
  flat: { color: 'var(--fg-3)' },
  live: { color: 'var(--celeste)' },
};

// ─── tooltip ─────────────────────────────────────────────────────
function TermTooltip({ active, payload, label, unit }: {
  active?: boolean;
  payload?: Array<{ dataKey?: string | number; value?: unknown }>;
  label?: string;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--bg-1)', border:'1px solid var(--line-1)', padding:'6px 10px', fontFamily:'inherit', fontSize:11, borderRadius:2 }}>
      <div style={{ color:'var(--fg-3)', marginBottom:3 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: i === 0 ? 'var(--teal)' : '#D4A843', marginBottom:1 }}>
          {String(p.value)}{unit}
        </div>
      ))}
    </div>
  );
}

// ─── mini sparkline (SVG puro, sin dependencias) ─────────────────
function MiniSpark({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const w = 64, h = 18;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${((i / (data.length - 1)) * w).toFixed(1)},${(h - 2 - ((v - min) / range) * (h - 4)).toFixed(1)}`)
    .join(' ');
  return (
    <svg className="mt-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden style={{ opacity: 0.8, flexShrink: 0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.2} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════
export default function MacroTerminal() {
  const [tab, setTabRaw]      = useState<Tab>('TODOS');
  const [selRow, setSelRow]   = useState<string | null>(null);
  const [dolar, setDolar]     = useState<DolarData | null>(null);
  const [riesgo, setRiesgo]   = useState<RiesgoData | null>(null);
  const [riesgoPrev, setPrev] = useState<RiesgoData | null>(null);
  const [uptime, setUptime]   = useState(0);
  const [now, setNow]         = useState<Date | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // cambiar de tab limpia la selección de fila
  const setTab = useCallback((t: Tab) => { setTabRaw(t); setSelRow(null); }, []);

  useEffect(() => {
    async function load() {
      try {
        const [dr, er, rr] = await Promise.all([
          fetch('/api/dolar'),
          fetch('/api/embi'),
          fetch('/api/riesgo-pais')
        ]);
        if (dr.ok) setDolar(await dr.json());

        let riesgoVal = null;
        let riesgoFecha = null;
        let prevVal = null;

        // Usar el simple GD35C YTM - US risk free (exactamente como BondTerminal / traders)
        // gd35c_spread = YTM(GD35C) - US10y   (en bps)
        if (er.ok) {
          const j = await er.json();
          if (typeof j.gd35c_spread === 'number' && j.gd35c_spread > 0) {
            riesgoVal = j.gd35c_spread;
            riesgoFecha = j.timestamp ? j.timestamp.slice(0,10) : new Date().toISOString().slice(0,10);
            // para delta usamos el embiDelta como proxy (o podríamos almacenar histórico simple)
            if (typeof j.embiDelta === 'number') prevVal = riesgoVal - j.embiDelta; // approx
          }
        }

        // Fallback al índice oficial si el calc simple no da valor
        if (riesgoVal === null && rr.ok) {
          const j = await rr.json();
          if (j.ultimo && typeof j.ultimo.valor === 'number') {
            riesgoVal = j.ultimo.valor;
            riesgoFecha = j.ultimo.fecha;
          }
          if (j.anterior && typeof j.anterior.valor === 'number') {
            prevVal = j.anterior.valor;
          }
        }

        if (riesgoVal !== null) {
          setRiesgo({ valor: riesgoVal, fecha: riesgoFecha || new Date().toISOString().slice(0,10) });
        }
        if (prevVal !== null) {
          setPrev({ valor: prevVal, fecha: 'cierre' });
        } else {
          setPrev(null);
        }
      } catch { /* silencioso */ }
    }
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // tick de 1s: uptime + reloj en vivo (now arranca en null para evitar
  // mismatch de hidratación SSR/cliente)
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => { setUptime(n => n + 1); setNow(new Date()); }, 1000);
    return () => clearInterval(id);
  }, []);

  // atajos de teclado: 1-5 cambian tab · ESC deselecciona fila
  useEffect(() => {
    const TABS_K: Tab[] = ['TODOS','ACTIVIDAD','PRECIOS','EXTERNO','FISCAL'];
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key >= '1' && e.key <= '5') {
        setTabRaw(TABS_K[Number(e.key) - 1]);
        setSelRow(null);
      } else if (e.key === 'Escape') {
        setSelRow(null);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const rows    = useMemo(() => buildRows(dolar, riesgo, riesgoPrev), [dolar, riesgo, riesgoPrev]);
  const visible = useMemo(() => rows.filter(r => r.tabs.includes(tab)), [rows, tab]);

  // gráfico: fila seleccionada > default del tab
  const chart = useMemo<ChartConfig>(() => {
    if (selRow && ROW_SERIES[selRow]) {
      const s = ROW_SERIES[selRow];
      return { data: s.data.slice(-18), key: 'value', colorHex: s.color, unit: s.unit, title: s.title };
    }
    return getChartConfig(tab);
  }, [tab, selRow]);
  const chartKey = selRow ?? tab; // id único para gradientes

  // BEI — solo se computa cuando el tab es PRECIOS
  const beiCurva = useMemo(() => {
    if (tab !== 'PRECIOS') return null;
    return construirCurvaBEI(bonosNominales, bonosReales, remEsperado, new Date())
      .filter(p => p.beiPct !== null)
      .slice(0, 4);
  }, [tab]);

  const timeStr = now ? now.toLocaleTimeString('es-AR', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) : '--:--:--';
  const dateStr = now ? now.toLocaleDateString('es-AR', { day:'numeric', month:'short', year:'numeric' }) : '';

  const TABS: Tab[] = ['TODOS','ACTIVIDAD','PRECIOS','EXTERNO','FISCAL'];

  const S: Record<string, CSSProperties> = {
    wrap:   { fontFamily:'"JetBrains Mono","Geist Mono",ui-monospace,monospace', background:'var(--bg-0)', border:'1px solid var(--line-1)', borderRadius:4, overflow:'hidden' },
    hdr:    { display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8, padding:'11px 22px', background:'var(--bg-1)', borderBottom:'1px solid var(--line-1)' },
    tabs:   { display:'flex', padding:'0 22px', borderBottom:'1px solid var(--line-1)', background:'var(--bg-0)', overflowX:'auto' },
    left:   { borderRight:'1px solid var(--line-1)', minWidth:0 },
    footer: { padding:'8px 22px', borderTop:'1px solid var(--line-1)', fontSize:10, color:'var(--fg-2)', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:4, background:'var(--bg-1)' },
    right:  { display:'flex', flexDirection:'column', minWidth:0 },
    cWrap:  { flex:1, padding:'16px 20px 12px', borderBottom:'1px solid var(--line-1)' },
  };

  // altura del chart — más chico cuando hay BEI para que todo quepa
  const chartH = tab === 'PRECIOS' && beiCurva && beiCurva.length > 0 ? 200 : 240;

  return (
    <div style={S.wrap}>
      {/* responsive: stack en mobile, ocultar fuente/sparkline */}
      <style>{`
        .mt-body { display:grid; grid-template-columns: 1fr 480px; }
        .mt-grid { display:grid; grid-template-columns: 1fr 150px 180px 110px; align-items:center; }
        @media (max-width: 1024px) {
          .mt-body { grid-template-columns: 1fr; }
          .mt-left { border-right: none !important; border-bottom: 1px solid var(--line-1); }
        }
        @media (max-width: 640px) {
          .mt-grid { grid-template-columns: 1fr 110px 120px; }
          .mt-grid > :nth-child(4) { display:none; }
          .mt-spark { display:none; }
          .mt-hdr-meta { display:none !important; }
        }
      `}</style>

      {/* header */}
      <div style={S.hdr}>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <span style={{ fontSize:12, letterSpacing:'0.12em', color:'var(--celeste)', fontWeight:600 }}>◆ MACRO TERMINAL</span>
          <span className="mt-hdr-meta" style={{ color:'var(--line-1)' }}>|</span>
          <span className="mt-hdr-meta" style={{ fontSize:11, color:'var(--fg-2)', letterSpacing:'0.06em' }}>INDEC · BCRA · MECON · DATA912 · TREASURY (GD35C live)</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:20, fontSize:11, color:'var(--fg-2)' }}>
          <span className="mt-hdr-meta" suppressHydrationWarning>{timeStr} <span style={{ color:'var(--fg-3)' }}>ART</span></span>
          <span className="mt-hdr-meta">UPTIME <span style={{ color:'var(--teal)' }}>{uptime}s</span></span>
          <span className="mt-hdr-meta">FUENTES <span style={{ color:'var(--fg-0)' }}>17 / 17</span></span>
          <span style={{ display:'flex', alignItems:'center', gap:5, color:'var(--up)' }}>
            <span className="live-dot" aria-hidden /> EN VIVO
          </span>
        </div>
      </div>

      {/* tabs */}
      <div style={S.tabs}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(t)} title={`Atajo: tecla ${i + 1}`} style={{
            padding:'10px 18px', fontSize:12, letterSpacing:'0.08em', fontFamily:'inherit',
            background:'transparent', border:'none', whiteSpace:'nowrap',
            borderBottom: t === tab ? '2px solid var(--celeste)' : '2px solid transparent',
            color: t === tab ? 'var(--celeste)' : 'var(--fg-2)',
            fontWeight: t === tab ? 600 : 400,
            cursor:'pointer', transition:'color 120ms', marginBottom:-1,
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* body */}
      <div className="mt-body">

        {/* LEFT — snapshot */}
        <div className="mt-left" style={S.left}>
          <div className="mt-grid" style={{ padding:'8px 22px', borderBottom:'1px solid var(--line-1)', fontSize:10, letterSpacing:'0.1em', color:'var(--fg-2)', background:'var(--bg-1)' }}>
            <span>INDICADOR</span>
            <span style={{ textAlign:'right' }}>VALOR</span>
            <span style={{ textAlign:'right' }}>Δ MES / ESTADO</span>
            <span style={{ textAlign:'right' }}>FUENTE</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.15 }}>

              {visible.filter(r => !r.isLive).map(row => (
                <Row key={row.id} row={row} hovered={hovered===row.id} selected={selRow===row.id}
                  onHover={setHovered}
                  onSelect={ROW_SERIES[row.id] ? () => setSelRow(s => s === row.id ? null : row.id) : undefined}
                />
              ))}

              {visible.some(r => r.isLive) && (
                <div style={{ padding:'6px 22px', fontSize:10, letterSpacing:'0.12em', color:'var(--fg-2)',
                  background:'color-mix(in oklch, var(--up) 6%, transparent)',
                  borderTop:'1px solid var(--line-1)', borderBottom:'1px solid var(--line-1)',
                  display:'flex', alignItems:'center', gap:7 }}>
                  <span className="live-dot" aria-hidden /> TIEMPO REAL
                </div>
              )}

              {visible.filter(r => r.isLive).map(row => (
                <Row key={row.id} row={row} hovered={hovered===row.id} selected={selRow===row.id}
                  onHover={setHovered}
                  onSelect={ROW_SERIES[row.id] ? () => setSelRow(s => s === row.id ? null : row.id) : undefined}
                />
              ))}

            </motion.div>
          </AnimatePresence>

          <div style={S.footer}>
            <span suppressHydrationWarning>{dateStr} · {timeStr} ART</span>
            <span style={{ color:'var(--fg-3)' }}>▸ click en una fila para graficar · 1-5 cambia tab</span>
          </div>
        </div>

        {/* RIGHT — chart + BEI (solo PRECIOS) + live strip */}
        <div style={S.right}>

          {/* chart */}
          <div style={S.cWrap}>
            <div style={{ fontSize:11, letterSpacing:'0.1em', color:'var(--fg-2)', marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
              <span style={{ minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{chart.title}</span>
              <span style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                {selRow && (
                  <button onClick={() => setSelRow(null)} style={{
                    background:'transparent', border:'1px solid var(--line-1)', borderRadius:2,
                    color:'var(--fg-2)', fontSize:9, fontFamily:'inherit', letterSpacing:'0.08em',
                    padding:'2px 8px', cursor:'pointer',
                  }}>
                    ✕ VOLVER
                  </button>
                )}
                <span style={{ color:chart.colorHex }}>━━</span>
                {chart.colorHex2 && <span style={{ color:chart.colorHex2 }}>━━</span>}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={chartH}>
              <AreaChart data={chart.data} margin={{ top:4, right:4, left:-20, bottom:0 }}>
                <defs>
                  <linearGradient id={`tg-${chartKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={chart.colorHex} stopOpacity={0.3} />
                    <stop offset="90%" stopColor={chart.colorHex} stopOpacity={0} />
                  </linearGradient>
                  {chart.colorHex2 && (
                    <linearGradient id={`tg2-${chartKey}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={chart.colorHex2} stopOpacity={0.2} />
                      <stop offset="90%" stopColor={chart.colorHex2} stopOpacity={0} />
                    </linearGradient>
                  )}
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="var(--chart-grid)" strokeOpacity={0.5} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize:8, fill:'var(--fg-3)', fontFamily:'inherit' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <YAxis                tick={{ fontSize:8, fill:'var(--fg-3)', fontFamily:'inherit' }} tickLine={false} axisLine={false} width={42} domain={['auto','auto']} />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <TermTooltip active={active} payload={payload} label={label as string | undefined} unit={chart.unit} />
                  )}
                  cursor={{ stroke:'var(--line-1)', strokeWidth:1, strokeDasharray:'3 3' }}
                />
                <Area type="monotone" dataKey={chart.key} stroke={chart.colorHex} strokeWidth={1.5}
                  fill={`url(#tg-${chartKey})`} dot={false}
                  activeDot={{ r:3, fill:chart.colorHex, strokeWidth:0 }}
                  animationDuration={500}
                />
                {chart.colorHex2 && (
                  <Area type="monotone" dataKey="nucleo" stroke={chart.colorHex2} strokeWidth={1.5}
                    fill={`url(#tg2-${chartKey})`} dot={false}
                    activeDot={{ r:3, fill:chart.colorHex2, strokeWidth:0 }}
                    animationDuration={500}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* BEI breakeven — solo cuando tab = PRECIOS */}
          {tab === 'PRECIOS' && beiCurva && beiCurva.length > 0 && (
            <div style={{ padding:'12px 20px 10px', borderBottom:'1px solid var(--line-1)', background:'var(--bg-0)' }}>
              <div style={{ fontSize:10, letterSpacing:'0.10em', color:'var(--fg-2)', marginBottom:8 }}>
                BEI — BREAKEVEN INFLACIONARIO (anual)
              </div>
              <div style={{ display:'grid', gridTemplateColumns:`repeat(${beiCurva.length},1fr)` }}>
                {beiCurva.map((p, i) => {
                  const c = p.veredicto === 'cer'  ? 'var(--teal)'
                          : p.veredicto === 'fija' ? '#f85149'
                          : 'var(--fg-0)';
                  return (
                    <div key={p.bucket.id} style={{
                      padding:'8px 10px', textAlign:'center',
                      borderRight: i < beiCurva.length - 1 ? '1px solid var(--line-1)' : 'none',
                    }}>
                      <div style={{ fontSize:9, color:'var(--fg-3)', marginBottom:4, letterSpacing:'0.06em' }}>
                        {p.bucket.label}
                      </div>
                      <div style={{ fontSize:16, fontWeight:600, color:c, fontVariantNumeric:'tabular-nums' }}>
                        {p.beiPct!.toFixed(1)}%
                      </div>
                      {p.remPct !== null && (
                        <div style={{ fontSize:9, color:'var(--fg-3)', marginTop:2 }}>
                          REM {p.remPct.toFixed(1)}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* live strip — tab-aware */}
          <LiveStrip tab={tab} dolar={dolar} riesgo={riesgo} riesgoPrev={riesgoPrev} />
        </div>
      </div>
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────
function Row({ row, hovered, selected, onHover, onSelect }: {
  row: SnapshotRow;
  hovered: boolean;
  selected: boolean;
  onHover: (id: string | null) => void;
  onSelect?: () => void;
}) {
  const series = ROW_SERIES[row.id];
  const spark = series ? series.data.slice(-14).map(d => d.value) : null;

  return (
    <div
      className="mt-grid"
      onMouseEnter={() => onHover(row.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={onSelect ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } } : undefined}
      title={onSelect ? 'Click para graficar la serie histórica' : undefined}
      style={{
        padding:'11px 22px', borderBottom:'1px solid var(--line-1)',
        borderLeft: selected ? '2px solid var(--celeste)' : '2px solid transparent',
        background: selected
          ? 'color-mix(in oklch, var(--celeste) 12%, transparent)'
          : hovered ? 'color-mix(in oklch, var(--celeste) 8%, transparent)' : 'transparent',
        transition:'background 80ms, border-color 80ms',
        cursor: onSelect ? 'pointer' : 'default',
      }}
    >
      <span style={{ fontSize:13, color: row.isLive ? '#c9d1d9' : '#e6edf3', display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
        {row.isLive && <span className="live-dot" style={{ flexShrink:0 }} aria-hidden />}
        <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{row.label}</span>
        {selected && <span style={{ color:'var(--celeste)', fontSize:10, flexShrink:0 }}>▸ GRAFICANDO</span>}
        {series && spark && spark.length >= 2 && (
          <span style={{ marginLeft:'auto', display:'flex' }}>
            <MiniSpark data={spark} color={series.color} />
          </span>
        )}
      </span>
      <span style={{ fontSize:15, fontWeight:600, color:'#ffffff', textAlign:'right', letterSpacing:'-0.01em', fontVariantNumeric:'tabular-nums' }}>
        {row.value}
      </span>
      <span style={{ fontSize:12, textAlign:'right', ...SIGN_COLOR[row.sign] }}>
        {row.deltaMes ?? '—'}
      </span>
      <span style={{ fontSize:10, textAlign:'right', color:'var(--fg-2)', letterSpacing:'0.06em' }}>
        {row.fuente}
      </span>
    </div>
  );
}

// ─── LiveStrip — tab-aware ────────────────────────────────────────
function LiveStrip({ tab, dolar, riesgo, riesgoPrev }: {
  tab: Tab;
  dolar: DolarData | null;
  riesgo: RiesgoData | null;
  riesgoPrev: RiesgoData | null;
}) {
  const brecha = dolar && dolar.blue.value_sell > 0 && dolar.oficial.value_sell > 0
    ? (dolar.blue.value_sell / dolar.oficial.value_sell - 1) * 100 : null;
  const rd = riesgo && riesgoPrev ? riesgo.valor - riesgoPrev.valor : null;

  const ipcL  = last(inflacionData);
  const ipcP  = prev(inflacionData);
  const ipimL = last(inflacionMayoristaData);

  const items = tab === 'PRECIOS' ? [
    { label:'IPC MENSUAL',    value:`${ipcL.mensual.toFixed(1)}%`,    sub:`${ipcL.date} · INDEC`,          color:'#f85149' },
    { label:'IPC INTERANUAL', value:`${ipcL.interanual.toFixed(1)}%`, sub: ipcL.interanual < ipcP.interanual ? '▼ desacelerando' : '▲ acelerando', color:'var(--teal)' },
    { label:'NÚCLEO',         value:`${ipcL.nucleo.toFixed(1)}%`,     sub:`vs IPC ${ipcL.mensual.toFixed(1)}%`, color:'#D4A843' },
    { label:'IPIM MENS.',     value:`${ipimL.mensual.toFixed(1)}%`,   sub:`i.a. ${ipimL.interanual.toFixed(1)}%`, color:'var(--celeste)' },
  ] : [
    { label:'DÓLAR BLUE',    value: dolar ? `$${dolar.blue.value_sell.toLocaleString('es-AR')}` : '—',    sub: dolar ? `Compra $${dolar.blue.value_buy.toLocaleString('es-AR')}` : null,    color:'var(--teal)' },
    { label:'DÓLAR OFICIAL', value: dolar ? `$${dolar.oficial.value_sell.toLocaleString('es-AR')}` : '—', sub: dolar ? `Compra $${dolar.oficial.value_buy.toLocaleString('es-AR')}` : null, color:'var(--celeste)' },
    { label:'BRECHA',        value: brecha !== null ? `${brecha>0?'+':''}${brecha.toFixed(1)}%` : '—',    sub:'Blue vs Oficial', color: brecha !== null && brecha>5 ? 'var(--down)' : 'var(--fg-2)' },
    { label:'RIESGO PAÍS (GD35C YTM)', value: riesgo ? `${riesgo.valor} pb` : '—', sub: rd !== null ? `${rd>0?'▲':'▼'} ${Math.abs(rd)} pb` : null, color: rd !== null ? (rd<=0 ? 'var(--teal)' : 'var(--down)') : 'var(--fg-2)' },
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', background:'var(--bg-1)' }}>
      {items.map((item, i) => (
        <div key={item.label} style={{ padding:'14px 20px', borderRight: i%2===0 ? '1px solid var(--line-1)' : 'none', borderBottom: i<2 ? '1px solid var(--line-1)' : 'none' }}>
          <div style={{ fontSize:10, letterSpacing:'0.10em', color:'var(--fg-2)', marginBottom:6, display:'flex', alignItems:'center', gap:5 }}>
            <span className="live-dot" aria-hidden />{item.label}
          </div>
          <div style={{ fontSize:20, fontWeight:600, color:item.color, letterSpacing:'-0.02em', fontVariantNumeric:'tabular-nums' }}>{item.value}</div>
          {item.sub && <div style={{ fontSize:11, color:'var(--fg-2)', marginTop:3 }}>{item.sub}</div>}
        </div>
      ))}
    </div>
  );
}
