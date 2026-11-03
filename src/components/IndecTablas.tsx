// Tablas server-side con datos de la API del INDEC (snapshot en data/indec/). Filas sin dato se omiten.
import { indec, trabajoUltimo, fuenteIndec, num, periodoLargo } from '@/data/indec';

const box = 'border border-[var(--line-1)] rounded-xl p-5 overflow-x-auto';

export function EmaeSectoresTabla() {
  const rows = indec.emaeSectores.sectores.filter((r) => r.ia != null);
  if (!rows.length) return null;
  return (
    <div className={box}>
      <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">
        EMAE por sector · {periodoLargo(indec.emaeSectores.periodo)} · var. % interanual
      </h2>
      <table className="w-full text-sm font-mono">
        <tbody>
          {rows.map((r) => (
            <tr key={r.codigo} className="border-t border-[var(--line-1)] text-[var(--fg-0)]">
              <td className="py-1 pr-4 font-sans text-[13px]">{r.descripcion}</td>
              <td className={`text-right py-1 ${r.ia! < 0 ? 'text-[var(--down)]' : ''}`}>{num(r.ia, 1, true)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-[var(--fg-3)] mt-2">
        Serie original (la API no publica desestacionalizado por sector). Fuente: {fuenteIndec(indec.emaeSectores)}.
      </p>
    </div>
  );
}

export function MercadoTrabajoTabla() {
  const t = trabajoUltimo;
  if (!t) return null;
  const items = [
    ['Desocupación', t.desocupacion],
    ['Actividad', t.actividad],
    ['Empleo', t.empleo],
    ['Subocupación', t.subocupacion],
  ].filter(([, v]) => v != null) as Array<[string, number]>;
  if (!items.length) return null;
  return (
    <div className={box}>
      <h2 className="text-[15px] font-semibold text-[var(--fg-0)] mb-3">
        Mercado de trabajo (EPH) · {periodoLargo(t.periodo)}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map(([k, v]) => (
          <div key={k}>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-3)]">{k}</p>
            <p className="text-xl font-semibold text-[var(--fg-0)] font-mono">{num(v)}%</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-[var(--fg-3)] mt-2">
        {t.observaciones ? `${t.observaciones} · ` : ''}Tasas sobre población total (actividad, empleo) y PEA (desocupación, subocupación), 31 aglomerados urbanos. Serie sin desestacionalizar en la API. Fuente: {fuenteIndec(indec.trabajo)}.
      </p>
    </div>
  );
}
