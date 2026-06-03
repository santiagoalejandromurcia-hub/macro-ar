'use client';

import { useState, useEffect, useMemo, type CSSProperties } from 'react';
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { emaeData, inflacionData, reservasData, fiscalData } from '@/data/macroData';

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

  return [
    { id: 'emae',      label: 'EMAE',               value: '+5.5%',        deltaMes: '▲ +0.30%',    sign: 'pos',  fuente: 'INDEC',     tabs: ['TODOS','ACTIVIDAD'] },
    { id: 'pbi',       label: 'PBI Real',            value: '+3.8%',        deltaMes: '▲ var. Q4-25', sign: 'pos', fuente: 'INDEC',     tabs: ['TODOS','ACTIVIDAD'] },
    { id: 'inflacion', label: 'Inflación IPC',       value: '2.6%',         deltaMes: '▼ -0.80%',    sign: 'neg',  fuente: 'INDEC',     tabs: ['TODOS','PRECIOS'] },
    { id: 'superavit', label: 'Superávit Primario',  value: '0.5%',         deltaMes: '▼ -0.90%',    sign: 'neg',  fuente: 'MECON',     tabs: ['TODOS','FISCAL'] },
    { id: 'reservas',  label: 'Reservas BCRA',       value: 'USD 47.874M',  deltaMes: '▲ +1.80%',    sign: 'pos',  fuente: 'BCRA',      tabs: ['TODOS','EXTERNO'] },
    { id: 'tamar',     label: 'TAMAR',               value: '23.00% n.a.',  deltaMes: '— sin cambio', sign: 'flat', fuente: 'BCRA',      tabs: ['TODOS','PRECIOS','FISCAL'] },
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
      id: 'riesgo', label: 'Riesgo País', isLive: true,
      value: riesgo ? `${riesgo.valor.toLocaleString('es-AR')} pb` : '—',
      deltaMes: riesgoDelta !== null ? `${riesgoDelta > 0 ? '▲' : '▼'} ${Math.abs(riesgoDelta)} pb` : null,
      sign: riesgoDelta !== null ? (riesgoDelta <= 0 ? 'pos' : 'neg') : 'flat',
      fuente: 'JP MORGAN', tabs: ['TODOS','EXTERNO'],
    },
  ];
}

function getChartConfig(tab: Tab) {
  switch (tab) {
    case 'PRECIOS':  return { data: inflacionData.slice(-16),                                         key: 'mensual',  colorHex: '#f85149', unit: '%',    title: 'IPC MENSUAL (%)' };
    case 'EXTERNO':  return { data: reservasData.slice(-14),                                          key: 'value',    colorHex: '#74ACDF', unit: 'M',    title: 'RESERVAS BCRA (USD M)' };
    case 'FISCAL':   return { data: fiscalData.slice(-14).map(d => ({ date: d.period, value: d.primario })), key: 'value', colorHex: '#F0A500', unit: '% PIB', title: 'RESULTADO PRIMARIO (% PIB)' };
    default:         return { data: emaeData.slice(-16).map(d => ({ date: d.date, value: d.value })), key: 'value',    colorHex: '#00C9A7', unit: '',     title: 'EMAE — ÍNDICE 2004=100' };
  }
}

const SIGN_COLOR: Record<DeltaSign, CSSProperties> = {
  pos:  { color: 'var(--teal)' },
  neg:  { color: 'var(--down)' },
  flat: { color: 'var(--fg-3)' },
  live: { color: 'var(--celeste)' },
};

function TermTooltip({ active, payload, label, unit }: {
  active?: boolean;
  payload?: Array<{ value?: unknown }>;
  label?: string;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--bg-1)', border:'1px solid var(--line-1)', padding:'6px 10px', fontFamily:'inherit', fontSize:11, borderRadius:2 }}>
      <div style={{ color:'var(--fg-3)', marginBottom:2 }}>{label}</div>
      <div style={{ color:'var(--teal)' }}>{String(payload[0].value)}{unit}</div>
    </div>
  );
}

export default function MacroTerminal() {
  const [tab, setTab]             = useState<Tab>('TODOS');
  const [dolar, setDolar]         = useState<DolarData | null>(null);
  const [riesgo, setRiesgo]       = useState<RiesgoData | null>(null);
  const [riesgoPrev, setPrev]     = useState<RiesgoData | null>(null);
  const [uptime, setUptime]       = useState(0);
  const [hovered, setHovered]     = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [dr, rr] = await Promise.all([fetch('/api/dolar'), fetch('/api/riesgo-pais')]);
        if (dr.ok) setDolar(await dr.json());
        if (rr.ok) {
          const j = await rr.json();
          if (j.ultimo)   setRiesgo({ valor: j.ultimo.valor,   fecha: j.ultimo.fecha });
          if (j.anterior) setPrev  ({ valor: j.anterior.valor, fecha: j.anterior.fecha });
        }
      } catch { /* silencioso */ }
    }
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setUptime(n => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const rows    = useMemo(() => buildRows(dolar, riesgo, riesgoPrev), [dolar, riesgo, riesgoPrev]);
  const visible = useMemo(() => rows.filter(r => r.tabs.includes(tab)), [rows, tab]);
  const chart   = useMemo(() => getChartConfig(tab), [tab]);

  const now     = new Date();
  const timeStr = now.toLocaleTimeString('es-AR', { hour:'2-digit', minute:'2-digit' });
  const dateStr = now.toLocaleDateString('es-AR', { day:'numeric', month:'short', year:'numeric' });

  const TABS: Tab[] = ['TODOS','ACTIVIDAD','PRECIOS','EXTERNO','FISCAL'];

  const S: Record<string, CSSProperties> = {
    wrap:   { fontFamily:'"JetBrains Mono","Geist Mono",ui-monospace,monospace', background:'var(--bg-0)', border:'1px solid var(--line-1)', borderRadius:4, overflow:'hidden' },
    hdr:    { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 16px', background:'var(--bg-1)', borderBottom:'1px solid var(--line-1)' },
    tabs:   { display:'flex', padding:'0 16px', borderBottom:'1px solid var(--line-1)', background:'var(--bg-0)' },
    body:   { display:'grid', gridTemplateColumns:'1fr 380px' },
    left:   { borderRight:'1px solid var(--line-1)' },
    colHdr: { display:'grid', gridTemplateColumns:'1fr 130px 160px 90px', padding:'6px 16px', borderBottom:'1px solid var(--line-1)', fontSize:9, letterSpacing:'0.1em', color:'var(--fg-3)', background:'var(--bg-1)' },
    footer: { padding:'6px 16px', borderTop:'1px solid var(--line-1)', fontSize:9, color:'var(--fg-3)', display:'flex', justifyContent:'space-between', background:'var(--bg-1)' },
    right:  { display:'flex', flexDirection:'column' },
    cWrap:  { flex:1, padding:'12px 16px 8px', borderBottom:'1px solid var(--line-1)' },
  };

  return (
    <div style={S.wrap}>

      {/* header */}
      <div style={S.hdr}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:10, letterSpacing:'0.12em', color:'var(--celeste)', fontWeight:600 }}>◆ MACRO TERMINAL</span>
          <span style={{ color:'var(--line-1)' }}>|</span>
          <span style={{ fontSize:9, color:'var(--fg-3)', letterSpacing:'0.06em' }}>INDEC · BCRA · MECON · JP MORGAN</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16, fontSize:9, color:'var(--fg-3)' }}>
          <span>UPTIME <span style={{ color:'var(--teal)' }}>{uptime}s</span></span>
          <span>FUENTES <span style={{ color:'var(--fg-1)' }}>14 / 14</span></span>
          <span style={{ display:'flex', alignItems:'center', gap:5, color:'var(--up)' }}>
            <span className="live-dot" aria-hidden /> EN VIVO
          </span>
        </div>
      </div>

      {/* tabs */}
      <div style={S.tabs}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'7px 14px', fontSize:10, letterSpacing:'0.08em', fontFamily:'inherit',
            background:'transparent', border:'none',
            borderBottom: t === tab ? '2px solid var(--celeste)' : '2px solid transparent',
            color: t === tab ? 'var(--celeste)' : 'var(--fg-3)',
            fontWeight: t === tab ? 600 : 400,
            cursor:'pointer', transition:'color 120ms', marginBottom:-1,
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* body */}
      <div style={S.body}>

        {/* LEFT — snapshot */}
        <div style={S.left}>
          <div style={S.colHdr}>
            <span>INDICADOR</span>
            <span style={{ textAlign:'right' }}>VALOR</span>
            <span style={{ textAlign:'right' }}>Δ MES / ESTADO</span>
            <span style={{ textAlign:'right' }}>FUENTE</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.15 }}>

              {visible.filter(r => !r.isLive).map(row => (
                <Row key={row.id} row={row} hovered={hovered===row.id} onHover={setHovered} />
              ))}

              {visible.some(r => r.isLive) && (
                <div style={{ padding:'4px 16px', fontSize:9, letterSpacing:'0.12em', color:'var(--fg-3)',
                  background:'color-mix(in oklch, var(--up) 6%, transparent)',
                  borderTop:'1px solid var(--line-1)', borderBottom:'1px solid var(--line-1)',
                  display:'flex', alignItems:'center', gap:6 }}>
                  <span className="live-dot" aria-hidden /> TIEMPO REAL
                </div>
              )}

              {visible.filter(r => r.isLive).map(row => (
                <Row key={row.id} row={row} hovered={hovered===row.id} onHover={setHovered} />
              ))}

            </motion.div>
          </AnimatePresence>

          <div style={S.footer}>
            <span>{dateStr} · {timeStr} ART</span>
            <span>macrolibre.com</span>
          </div>
        </div>

        {/* RIGHT — chart + live strip */}
        <div style={S.right}>
          <div style={S.cWrap}>
            <div style={{ fontSize:9, letterSpacing:'0.1em', color:'var(--fg-3)', marginBottom:10, display:'flex', justifyContent:'space-between' }}>
              <span>{chart.title}</span>
              <span style={{ color:chart.colorHex }}>━━</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chart.data} margin={{ top:4, right:4, left:-20, bottom:0 }}>
                <defs>
                  <linearGradient id={`tg-${tab}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={chart.colorHex} stopOpacity={0.3} />
                    <stop offset="90%" stopColor={chart.colorHex} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="var(--chart-grid)" strokeOpacity={0.5} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize:8, fill:'var(--fg-3)', fontFamily:'inherit' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <YAxis                tick={{ fontSize:8, fill:'var(--fg-3)', fontFamily:'inherit' }} tickLine={false} axisLine={false} width={42} />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <TermTooltip active={active} payload={payload} label={label as string | undefined} unit={chart.unit} />
                  )}
                  cursor={{ stroke:'var(--line-1)', strokeWidth:1, strokeDasharray:'3 3' }}
                />
                <Area type="monotone" dataKey={chart.key} stroke={chart.colorHex} strokeWidth={1.5} fill={`url(#tg-${tab})`} dot={false} activeDot={{ r:3, fill:chart.colorHex, strokeWidth:0 }} animationDuration={500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <LiveStrip dolar={dolar} riesgo={riesgo} riesgoPrev={riesgoPrev} />
        </div>
      </div>
    </div>
  );
}

function Row({ row, hovered, onHover }: { row: SnapshotRow; hovered: boolean; onHover: (id: string | null) => void }) {
  return (
    <div
      onMouseEnter={() => onHover(row.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        display:'grid', gridTemplateColumns:'1fr 130px 160px 90px',
        padding:'7px 16px', borderBottom:'1px solid var(--line-1)',
        background: hovered ? 'color-mix(in oklch, var(--celeste) 6%, transparent)' : 'transparent',
        transition:'background 80ms', cursor:'default', alignItems:'center',
      }}
    >
      <span style={{ fontSize:11, color: row.isLive ? 'var(--fg-1)' : 'var(--fg-0)', display:'flex', alignItems:'center', gap:6 }}>
        {row.isLive && <span className="live-dot" style={{ flexShrink:0 }} aria-hidden />}
        {row.label}
      </span>
      <span style={{ fontSize:12, fontWeight:600, color:'var(--fg-0)', textAlign:'right', letterSpacing:'-0.01em', fontVariantNumeric:'tabular-nums' }}>
        {row.value}
      </span>
      <span style={{ fontSize:10, textAlign:'right', ...SIGN_COLOR[row.sign] }}>
        {row.deltaMes ?? '—'}
      </span>
      <span style={{ fontSize:9, textAlign:'right', color:'var(--fg-3)', letterSpacing:'0.06em' }}>
        {row.fuente}
      </span>
    </div>
  );
}

function LiveStrip({ dolar, riesgo, riesgoPrev }: { dolar: DolarData | null; riesgo: RiesgoData | null; riesgoPrev: RiesgoData | null }) {
  const brecha = dolar && dolar.blue.value_sell > 0 && dolar.oficial.value_sell > 0
    ? (dolar.blue.value_sell / dolar.oficial.value_sell - 1) * 100 : null;
  const rd = riesgo && riesgoPrev ? riesgo.valor - riesgoPrev.valor : null;

  const items = [
    { label:'DÓLAR BLUE',    value: dolar ? `$${dolar.blue.value_sell.toLocaleString('es-AR')}` : '—',    sub: dolar ? `Compra $${dolar.blue.value_buy.toLocaleString('es-AR')}` : null,    color:'var(--teal)' },
    { label:'DÓLAR OFICIAL', value: dolar ? `$${dolar.oficial.value_sell.toLocaleString('es-AR')}` : '—', sub: dolar ? `Compra $${dolar.oficial.value_buy.toLocaleString('es-AR')}` : null, color:'var(--celeste)' },
    { label:'BRECHA',        value: brecha !== null ? `${brecha>0?'+':''}${brecha.toFixed(1)}%` : '—',     sub:'Blue vs Oficial',                                                             color: brecha !== null && brecha>5 ? 'var(--down)' : 'var(--fg-2)' },
    { label:'RIESGO PAÍS',   value: riesgo ? `${riesgo.valor} pb` : '—',                                  sub: rd !== null ? `${rd>0?'▲':'▼'} ${Math.abs(rd)} pb` : null,                   color: rd !== null ? (rd<=0 ? 'var(--teal)' : 'var(--down)') : 'var(--fg-2)' },
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', background:'var(--bg-1)' }}>
      {items.map((item, i) => (
        <div key={item.label} style={{ padding:'10px 14px', borderRight: i%2===0 ? '1px solid var(--line-1)' : 'none', borderBottom: i<2 ? '1px solid var(--line-1)' : 'none' }}>
          <div style={{ fontSize:8, letterSpacing:'0.10em', color:'var(--fg-3)', marginBottom:4, display:'flex', alignItems:'center', gap:4 }}>
            <span className="live-dot" aria-hidden />{item.label}
          </div>
          <div style={{ fontSize:14, fontWeight:600, color:item.color, letterSpacing:'-0.01em', fontVariantNumeric:'tabular-nums' }}>{item.value}</div>
          {item.sub && <div style={{ fontSize:9, color:'var(--fg-3)', marginTop:2 }}>{item.sub}</div>}
        </div>
      ))}
    </div>
  );
}
