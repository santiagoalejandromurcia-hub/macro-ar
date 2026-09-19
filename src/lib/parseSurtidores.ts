/** Parser de https://surtidores.com.ar/precios/ — tabla YPF CABA. */

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export type SurtidoresLatest = {
  year: number;
  mes: string;
  super: number;
  premium: number;
  gasoil: number;
  euro: number;
};

function cellNums(row: string): number[] {
  const out: number[] = [];
  const re = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let m: RegExpExecArray | null;
  let first = true;
  while ((m = re.exec(row))) {
    if (first) {
      first = false;
      continue;
    }
    const raw = m[1].replace(/<[^>]+>/g, '').replace(/\s/g, '').replace(',', '.');
    if (!raw) continue;
    const n = Number(raw);
    if (Number.isFinite(n) && n > 0) out.push(n);
  }
  return out;
}

function productRow(block: string, label: string): string | null {
  const re = new RegExp(
    `<tr[^>]*>\\s*<td[^>]*>\\s*<strong>\\s*${label}\\s*</strong>\\s*</td>[\\s\\S]*?</tr>`,
    'i',
  );
  const m = block.match(re);
  return m ? m[0] : null;
}

export function parseSurtidoresHtml(html: string): SurtidoresLatest | null {
  const years = [...html.matchAll(/<strong>\s*(20\d{2})\s*<\/strong>/g)].map((m) => ({
    year: Number(m[1]),
    index: m.index ?? 0,
  }));
  if (years.length === 0) return null;
  const latest = years.reduce((a, b) => (a.year >= b.year ? a : b));
  const next = years.filter((y) => y.index > latest.index).sort((a, b) => a.index - b.index)[0];
  const block = html.slice(latest.index, next ? next.index : latest.index + 6000);

  const superN = cellNums(productRow(block, 'Super') ?? '');
  const premium = cellNums(productRow(block, 'Premium') ?? '');
  const gasoil = cellNums(productRow(block, 'Gasoil') ?? '');
  const euro = cellNums(productRow(block, 'Euro') ?? '');
  const n = Math.min(superN.length, premium.length, gasoil.length, euro.length);
  if (n < 1) return null;
  const i = n - 1;
  return {
    year: latest.year,
    mes: `${MESES[i]} ${String(latest.year).slice(2)}`,
    super: superN[i],
    premium: premium[i],
    gasoil: gasoil[i],
    euro: euro[i],
  };
}
