'use client';

import { useMemo, useState } from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  bonosNominales, bonosReales, remEsperado, senderoMensualBEI, ACTUALIZADO_AL, FUENTE_BONOS,
} from '@/data/breakEven';
import {
  construirCurvaBEI, diasHastaVto, type BeiPunto,
} from '@/lib/breakEven';

// ============================================================
// Componente principal Break-Even — interactivo
// ============================================================

export default function BreakEvenContent() {
  const hoy = useMemo(() => new Date(), []);

  // Curva BEI completa por bucket
  const curva = useMemo(
    () => construirCurvaBEI(bonosNominales, bonosReales, remEsperado, hoy),
    [hoy],
  );

  // Filtrar solo buckets con datos
  const curvaConDatos = curva.filter((p) => p.beiPct !== null);

  // ─── Datos para el gráfico ───
  const chartData = curvaConDatos.map((p) => ({
    plazo: p.bucket.label,
    'TIR LECAP': p.tirNominal !== null ? Number(p.tirNominal.toFixed(1)) : null,
    'TIR CER (real)': p.tirReal !== null ? Number(p.tirReal.toFixed(1)) : null,
    'BEI implícita': p.beiPct !== null ? Number(p.beiPct.toFixed(1)) : null,
    'REM esperado': p.remPct !== null ? Number(p.remPct.toFixed(1)) : null,
  }));

  const [bucketSeleccionado, setBucketSeleccionado] = useState<string>(
    curvaConDatos.find((p) => p.bucket.id === '12-18')?.bucket.id ?? curvaConDatos[0]?.bucket.id ?? '',
  );

  const detalle = curvaConDatos.find((p) => p.bucket.id === bucketSeleccionado);

  return (
    <div className="space-y-8">

      {/* ═══════════════════════════════════════════════════
          SENDERO MENSUAL — tabla BEI vs REM-BCRA
          ═══════════════════════════════════════════════════ */}
      <div className="glass p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[var(--fg-0)] mb-1">
            Sendero mensual · BEI vs REM-BCRA
          </h2>
          <p className="text-xs text-[var(--fg-2)]">
            Break-even implícito mensual derivado de la curva nominal vs CER, comparado con la mediana del REM BCRA.
            Verde = mercado descuenta más inflación que la encuesta (favorece CER). Rojo = mercado más optimista que REM.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[var(--bg-1)] border-b border-[var(--line-1)]">
              <tr className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                <th className="px-4 py-2.5 text-left">Mes</th>
                <th className="px-3 py-2.5 text-center">Días</th>
                <th className="px-3 py-2.5 text-right">BEI Mensual</th>
                <th className="px-3 py-2.5 text-right">REM Mensual</th>
                <th className="px-3 py-2.5 text-right">BEI − REM</th>
              </tr>
            </thead>
            <tbody>
              {senderoMensualBEI.map((row) => {
                const diff = row.rem !== null ? row.bei - row.rem : null;
                const diffPositive = diff !== null && diff > 0;
                const diffNegative = diff !== null && diff < 0;
                return (
                  <tr key={row.mes} className="border-b border-[var(--line-1)] hover:bg-[var(--bg-1)] transition-colors">
                    <td className="px-4 py-2.5 font-mono font-semibold text-[var(--fg-0)] uppercase">{row.mes}</td>
                    <td className="px-3 py-2.5 text-center tnum text-[var(--fg-2)]">{row.dias}</td>
                    <td className="px-3 py-2.5 text-right tnum font-semibold text-[var(--celeste)]">{row.bei.toFixed(2)}%</td>
                    <td className="px-3 py-2.5 text-right tnum text-[var(--fg-1)]">
                      {row.rem !== null ? `${row.rem.toFixed(2)}%` : <span className="text-[var(--fg-3)]">—</span>}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {diff !== null ? (
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                          diffPositive
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : diffNegative
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'text-[var(--fg-3)]'
                        }`}>
                          {diff > 0 ? '+' : ''}{diff.toFixed(2)}%
                        </span>
                      ) : (
                        <span className="text-[var(--fg-3)]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-[var(--fg-3)] mt-3 text-right">
          Fuente: BCRA REM · Curva CER vs nominal — Actualizado {ACTUALIZADO_AL}
        </p>
      </div>

      {/* ─── Header con stats ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Bonos nominales"
          value={String(bonosNominales.length)}
          hint="LECAP + BONTE TF"
          color="celeste"
        />
        <StatCard
          label="Bonos CER"
          value={String(bonosReales.length)}
          hint="LECER + BONCER"
          color="sol"
        />
        <StatCard
          label="Buckets con datos"
          value={`${curvaConDatos.length} / ${curva.length}`}
          hint="Plazos cubiertos"
          color="celeste"
        />
        <StatCard
          label="Última actualización"
          value={ACTUALIZADO_AL}
          hint={FUENTE_BONOS}
          color="muted"
        />
      </div>

      {/* ─── Gráfico de curvas ─── */}
      <div className="glass p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[var(--fg-0)] mb-1">
            Curvas de tasas y BEI implícita
          </h2>
          <p className="text-xs text-[var(--fg-2)]">
            En cada plazo, la diferencia entre la TIR nominal (LECAP) y la TIR real (CER)
            es la inflación que el mercado descuenta. Comparamos contra el REM del BCRA.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid stroke="var(--line-1)" strokeDasharray="2 4" />
            <XAxis dataKey="plazo" tick={{ fontSize: 11, fill: 'var(--fg-2)' }} />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--fg-2)' }}
              label={{ value: '% TEA', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: 'var(--fg-2)' } }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-1)',
                border: '1px solid var(--line-1)',
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: unknown) => (typeof v === 'number' ? `${v}%` : '—')}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <ReferenceLine y={0} stroke="var(--line-1)" />
            <Bar dataKey="BEI implícita" fill="var(--celeste)" opacity={0.4} radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="TIR LECAP"      stroke="var(--sol)"      strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="TIR CER (real)" stroke="var(--magenta)"  strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="REM esperado"   stroke="var(--celeste)"  strokeWidth={2}   strokeDasharray="5 5" dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ─── Tabla con veredicto ─── */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--fg-0)] mb-3">
          Veredicto por plazo
        </h2>
        <p className="text-xs text-[var(--fg-2)] mb-4">
          Si la BEI implícita está por <strong>encima</strong> del REM esperado, el mercado descuenta
          MÁS inflación que los economistas — convendría CER. Si está por <strong>debajo</strong>,
          el mercado descuenta MENOS — convendría tasa fija. Tocá una fila para ver detalle.
        </p>

        <div className="glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-[var(--bg-1)] border-b border-[var(--line-1)]">
                <tr className="text-left text-[11px] font-mono uppercase tracking-wider text-[var(--fg-2)]">
                  <th className="px-4 py-3">Plazo</th>
                  <th className="px-3 py-3 text-right">TIR LECAP</th>
                  <th className="px-3 py-3 text-right">TIR CER</th>
                  <th className="px-3 py-3 text-right">BEI</th>
                  <th className="px-3 py-3 text-right">REM</th>
                  <th className="px-3 py-3 text-right">Δ</th>
                  <th className="px-3 py-3 text-center">Veredicto</th>
                </tr>
              </thead>
              <tbody>
                {curvaConDatos.map((p) => (
                  <tr
                    key={p.bucket.id}
                    onClick={() => setBucketSeleccionado(p.bucket.id)}
                    className={`border-b border-[var(--line-1)] cursor-pointer hover:bg-[var(--bg-1)] transition-colors ${
                      bucketSeleccionado === p.bucket.id ? 'bg-[var(--celeste)]/5' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-[var(--fg-0)]">{p.bucket.label}</td>
                    <td className="px-3 py-3 text-right tnum text-[var(--sol)]">{fmt(p.tirNominal)}</td>
                    <td className="px-3 py-3 text-right tnum text-[var(--magenta)]">{fmt(p.tirReal)}</td>
                    <td className="px-3 py-3 text-right tnum font-semibold text-[var(--fg-0)]">{fmt(p.beiPct)}</td>
                    <td className="px-3 py-3 text-right tnum text-[var(--celeste)]">{fmt(p.remPct)}</td>
                    <td className={`px-3 py-3 text-right tnum ${diffColor(p.diferenciaPct)}`}>{fmtSigned(p.diferenciaPct)}</td>
                    <td className="px-3 py-3 text-center">
                      <VeredictoChip veredicto={p.veredicto} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Detalle del bucket seleccionado ─── */}
      {detalle && (
        <DetalleBucket detalle={detalle} hoy={hoy} />
      )}

      {/* ─── Disclaimer ─── */}
      <div className="glass p-4 text-[12px] text-[var(--fg-2)] leading-relaxed">
        <strong className="text-[var(--fg-1)]">Cómo interpretar:</strong> el BEI no es una predicción —
        es la inflación que el mercado descuenta hoy. Si vos pensás que la inflación va a estar por
        encima del BEI, conviene posicionarse en CER. Si pensás que va a estar por debajo, conviene
        tasa fija. Ni el BEI ni el REM "saben" lo que va a pasar — son referencias para comparar tu
        propia visión.
        <br /><br />
        Las TIRs mostradas son aproximaciones del mercado al{' '}
        <strong className="text-[var(--fg-1)]">{ACTUALIZADO_AL}</strong>. Para usar este tool en
        decisiones reales, validá los valores contra tu broker o IAMC. No constituye recomendación
        de inversión.
      </div>
    </div>
  );
}

// ─── Componentes auxiliares ────────────────────────────────────────

function StatCard({ label, value, hint, color }: { label: string; value: string; hint: string; color: 'celeste' | 'sol' | 'muted' }) {
  const colorClass =
    color === 'celeste' ? 'text-[var(--celeste)]' :
    color === 'sol' ? 'text-[var(--sol)]' :
    'text-[var(--fg-1)]';
  return (
    <div className="glass p-3 sm:p-4">
      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-2)] mb-1">{label}</div>
      <div className={`text-xl font-semibold ${colorClass} tnum`}>{value}</div>
      <div className="text-[11px] text-[var(--fg-3)] mt-1">{hint}</div>
    </div>
  );
}

function VeredictoChip({ veredicto }: { veredicto: BeiPunto['veredicto'] }) {
  if (!veredicto) return <span className="text-[var(--fg-3)] text-xs">—</span>;
  if (veredicto === 'cer') {
    return (
      <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[var(--magenta)]/10 text-[var(--magenta)] border border-[var(--magenta)]/30 rounded-md">
        CER
      </span>
    );
  }
  if (veredicto === 'fija') {
    return (
      <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[var(--sol)]/10 text-[var(--sol)] border border-[var(--sol)]/30 rounded-md">
        TASA FIJA
      </span>
    );
  }
  return (
    <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[var(--bg-1)] text-[var(--fg-2)] border border-[var(--line-1)] rounded-md">
      NEUTRAL
    </span>
  );
}

function DetalleBucket({ detalle, hoy }: { detalle: BeiPunto; hoy: Date }) {
  return (
    <div className="glass p-4 sm:p-6">
      <h3 className="text-base font-semibold text-[var(--fg-0)] mb-1">
        Detalle: {detalle.bucket.label}
      </h3>
      <p className="text-xs text-[var(--fg-2)] mb-4">
        Bonos que componen el promedio del bucket. La TIR mostrada es la usada en el cálculo.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LECAP / Bonte TF */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--sol)] mb-2">
            ◆ Curva nominal ({detalle.bonosNominales.length} bonos)
          </div>
          <BondList bonos={detalle.bonosNominales} hoy={hoy} />
        </div>
        {/* CER */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--magenta)] mb-2">
            ◆ Curva real CER ({detalle.bonosReales.length} bonos)
          </div>
          <BondList bonos={detalle.bonosReales} hoy={hoy} />
        </div>
      </div>
    </div>
  );
}

function BondList({ bonos, hoy }: { bonos: { ticker: string; vencimiento: string; tirAnualPct: number; descripcion: string; precioArs: number }[]; hoy: Date }) {
  if (bonos.length === 0) {
    return <div className="text-[12px] text-[var(--fg-3)] italic">Sin bonos en este plazo</div>;
  }
  return (
    <div className="space-y-1.5">
      {bonos.map((b) => (
        <div key={b.ticker} className="flex items-center justify-between gap-3 px-3 py-2 bg-[var(--bg-1)] border border-[var(--line-1)] rounded-md text-[12px]">
          <div className="min-w-0">
            <div className="font-mono font-semibold text-[var(--fg-0)]">{b.ticker}</div>
            <div className="text-[10px] text-[var(--fg-2)] truncate">{b.descripcion}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="tnum text-[var(--fg-0)]">{b.tirAnualPct.toFixed(1)}%</div>
            <div className="text-[10px] text-[var(--fg-3)] tnum">{diasHastaVto(b.vencimiento, hoy)}d · ${b.precioArs.toLocaleString('es-AR')}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Formatters ───
function fmt(v: number | null): string {
  return v === null ? '—' : `${v.toFixed(1)}%`;
}
function fmtSigned(v: number | null): string {
  if (v === null) return '—';
  const sign = v > 0 ? '+' : '';
  return `${sign}${v.toFixed(1)} pp`;
}
function diffColor(v: number | null): string {
  if (v === null) return 'text-[var(--fg-3)]';
  if (v > 1.5) return 'text-[var(--magenta)]';
  if (v < -1.5) return 'text-[var(--sol)]';
  return 'text-[var(--fg-2)]';
}
