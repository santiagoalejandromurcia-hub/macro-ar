// Series del INDEC leídas al compilar desde data/indec/resumen.json
// (generado por scripts/indec-sync.mjs → scripts/indec-derive.mjs a partir de la API del INDEC).
// El sitio NO consulta la API del INDEC en tiempo de ejecución.
import resumen from '../../data/indec/resumen.json';

export const indec = resumen;

const MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** "202608" → "agosto 2026"; "20262T" → "2º trimestre 2026"; "20261S" → "1º semestre 2026" */
export function periodoLargo(p: string | null | undefined): string {
  if (!p) return '';
  if (/^\d{4}\dT$/.test(p)) return `${p[4]}º trimestre ${p.slice(0, 4)}`;
  if (/^\d{4}\dS$/.test(p)) return `${p[4]}º semestre ${p.slice(0, 4)}`;
  return `${MES[Number(p.slice(4, 6)) - 1]} ${p.slice(0, 4)}`;
}

/** "2026-10-21" → "21/10/2026" */
export function fechaCorta(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

/** Leyenda de fuente: «INDEC (API), publicado el 21/10/2026» o «INDEC (API), dato hasta agosto 2026». */
export function fuenteIndec(s: { ultimoPeriodo: string | null; fechaPublicacion: string | null }): string {
  const f = fechaCorta(s.fechaPublicacion);
  return f ? `INDEC (API), publicado el ${f}` : `INDEC (API), dato hasta ${periodoLargo(s.ultimoPeriodo)}`;
}

/** Número con coma decimal (es-AR). null → null (la celda se oculta). */
export function num(v: number | null | undefined, dec = 1, signo = false): string | null {
  if (v == null || !Number.isFinite(v)) return null;
  const s = v.toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  return signo && v > 0 ? `+${s}` : s.replace('-', '−');
}

export const emaeUltimo = indec.emae.serie[indec.emae.serie.length - 1];
export const ipcUltimo = indec.ipc.serie[indec.ipc.serie.length - 1];
export const pobrezaUltimo = indec.pobreza.serie[indec.pobreza.serie.length - 1];
export const trabajoUltimo = indec.trabajo.serie[indec.trabajo.serie.length - 1];

export const salariosUltimo = indec.salarios.serie[indec.salarios.serie.length - 1];
export const uciiUltimo = indec.ucii.puntos[indec.ucii.puntos.length - 1];
