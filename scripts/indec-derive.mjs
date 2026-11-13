#!/usr/bin/env node
// Deriva data/indec/resumen.json (liviano, lo importa el sitio al compilar) a partir de los
// snapshots crudos data/indec/*.json. No usa la red ni el token. No calcula variaciones:
// solo selecciona y redondea lo que publica la API del INDEC.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'data', 'indec');
const load = async (f) => JSON.parse(await readFile(path.join(DIR, `${f}.json`), 'utf8'));
const MES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const lbl = (p) => `${MES[Number(p.slice(4, 6)) - 1]} ${p.slice(2, 4)}`;
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const meta = (s) => ({ fuente: s.fuente, servicio: s.servicio, fechaConsulta: s.fechaConsulta, ultimoPeriodo: s.ultimoPeriodo, fechaPublicacion: s.fechaPublicacion });
const obsOf = (rows) => [...new Set(rows.map((r) => r.observaciones).filter(Boolean))].join(' · ') || null;

// ---------- EMAE nivel general
const eg = await load('emae-nivel-general');
const EMAE_KEYS = {
  'Índice serie original': 'original', 'Índice serie desestacionalizada': 'desest', 'Índice serie tendencia-ciclo': 'tendencia',
  'Var % interanual serie original': 'ia', 'Var % mensual serie desestacionalizada': 'mmDesest', 'Var % mensual serie tendencia-ciclo': 'mmTendencia',
};
const emaeBy = new Map();
for (const r of eg.datos) {
  const k = EMAE_KEYS[r.tipo_de_indicador_descripcion]; if (!k) continue;
  const o = emaeBy.get(r.periodo) ?? { periodo: r.periodo, date: lbl(r.periodo), obs: [] };
  o[k] = k.startsWith('mm') || k === 'ia' ? r2(r.valor) : r1(r.valor);
  if (r.observaciones) o.obs.push(r.observaciones);
  emaeBy.set(r.periodo, o);
}
const emae = [...emaeBy.values()].sort((a, b) => a.periodo.localeCompare(b.periodo)).map(({ obs, ...o }) => ({ ...o, observaciones: [...new Set(obs)].join(' · ') || null }));

// ---------- EMAE sectores (último período)
const es = await load('emae-sectores');
const secLast = es.datos.filter((r) => r.periodo === es.ultimoPeriodo);
const sectores = [...new Set(secLast.map((r) => r.codigo))].map((c) => {
  const rs = secLast.filter((r) => r.codigo === c);
  return { codigo: c, descripcion: rs[0].descripcion, indice: r1(rs.find((r) => r.tipo_de_indicador.startsWith('Índice'))?.valor), ia: r1(rs.find((r) => r.tipo_de_indicador.includes('interanual'))?.valor), observaciones: obsOf(rs) };
});

// ---------- IPC
const ipcS = await load('ipc-nacional');
const ipcIdx = new Map();
for (const r of ipcS.datos) ipcIdx.set(`${r.region}|${r.clasificador}|${r.codigo}|${r.tipo_de_indicador}|${r.periodo}`, r);
const ipcV = (reg, cl, cod, t, p) => r1(ipcIdx.get(`${reg}|${cl}|${cod}|${t}|${p}`)?.valor);
const ipcPeriodos = [...new Set(ipcS.datos.map((r) => r.periodo))].sort().filter((p) => p >= '202312');
const ENR = 'Estacional, Núcleo y Regulados', BYS = 'Bienes y servicios';
const ipc = ipcPeriodos.map((p) => ({
  periodo: p, date: lbl(p),
  mensual: ipcV('Nacional', 'IPC', '0', 'v_m', p), interanual: ipcV('Nacional', 'IPC', '0', 'v_ia', p), acumulada: ipcV('Nacional', 'IPC', '0', 'v_acum', p),
  indice: r2(ipcIdx.get(`Nacional|IPC|0|Indice|${p}`)?.valor ?? null),
  nucleo: ipcV('Nacional', ENR, 'N', 'v_m', p), nucleoIa: ipcV('Nacional', ENR, 'N', 'v_ia', p),
  regulados: ipcV('Nacional', ENR, 'R', 'v_m', p), estacional: ipcV('Nacional', ENR, 'E', 'v_m', p),
  bienes: ipcV('Nacional', BYS, 'B', 'v_m', p), servicios: ipcV('Nacional', BYS, 'S', 'v_m', p),
  observaciones: obsOf(ipcS.datos.filter((r) => r.periodo === p && r.region === 'Nacional' && r.codigo === '0')),
}));
const pu = ipcS.ultimoPeriodo;
const REG = ['Nacional', 'GBA', 'Pampeana', 'Noreste', 'Noroeste', 'Cuyo', 'Patagonia'];
const ipcRegiones = REG.map((reg) => ({ region: reg, mensual: ipcV(reg, 'IPC', '0', 'v_m', pu), interanual: ipcV(reg, 'IPC', '0', 'v_ia', pu), acumulada: ipcV(reg, 'IPC', '0', 'v_acum', pu) }));
const divs = [...new Set(ipcS.datos.filter((r) => r.nivel === 'División' && r.periodo === pu && r.region === 'Nacional').map((r) => r.codigo))].sort();
const ipcDivisiones = divs.map((c) => {
  const d = ipcS.datos.find((r) => r.nivel === 'División' && r.codigo === c);
  return { codigo: c, descripcion: d.descripcion, mensual: ipcV('Nacional', d.clasificador, c, 'v_m', pu), interanual: ipcV('Nacional', d.clasificador, c, 'v_ia', pu), acumulada: ipcV('Nacional', d.clasificador, c, 'v_acum', pu) };
});

// ---------- Canastas (último período, por región disponible)
const cb = await load('canastas-cba-cbt');
const cLast = cb.datos.filter((r) => r.periodo === cb.ultimoPeriodo);
const cv = (desc, t) => cLast.find((r) => r.descripcion === desc && r.tipo_de_indicador === t)?.valor ?? null;
const canastas = [...new Set(cLast.map((r) => r.region))].map((region) => ({
  region,
  cba: { adultoEquivalente: r2(cv('Canasta Basica Alimentaria', 'CBA')), mensual: r1(cv('Canasta Basica Alimentaria', 'v_m')), interanual: r1(cv('Canasta Basica Alimentaria', 'v_ia')), hogar1: r2(cv('Canasta Basica Alimentaria, Hogar 1', 'Hogar 1')), hogar2: r2(cv('Canasta Basica Alimentaria, Hogar 2', 'Hogar 2')), hogar3: r2(cv('Canasta Basica Alimentaria, Hogar 3', 'Hogar 3')) },
  cbt: { adultoEquivalente: r2(cv('Canasta Basica Total', 'CBT')), mensual: r1(cv('Canasta Basica Total', 'v_m')), interanual: r1(cv('Canasta Basica Total', 'v_ia')), hogar1: r2(cv('Canasta Basica Total, Hogar 1', 'Hogar 1')), hogar2: r2(cv('Canasta Basica Total, Hogar 2', 'Hogar 2')), hogar3: r2(cv('Canasta Basica Total, Hogar 3', 'Hogar 3')) },
  observaciones: obsOf(cLast),
}));
// Descripción de hogares tipo (texto de la API, si la trae)
const hogarDesc = Object.fromEntries(['Hogar 1', 'Hogar 2', 'Hogar 3'].map((h) => [h, cLast.find((r) => r.tipo_de_indicador === h)?.tipo_de_indicador_descripcion ?? null]));

// ---------- EPH
const semLbl = (p) => `${p.slice(-2, -1) === '1' ? 'I' : 'II'}-${p.slice(2, 4)}`;
const pob = await load('pobreza-eph');
const pobreza = pob.datos.filter((r) => r.area_geografica_nom === 'T_31_A').map((r) => ({
  periodo: r.periodo, period: semLbl(r.periodo), personas: r.tasa_pobreza_personas, hogares: r.tasa_pobreza_hogares,
  indigenciaPersonas: r.tasa_indigencia_personas, indigenciaHogares: r.tasa_indigencia_hogares, observaciones: r.observaciones ?? null,
}));
const mt = await load('mercado-trabajo-eph');
const trabajo = mt.datos.filter((r) => r.area_geografica_nom === 'T_31_A').map((r) => ({
  periodo: r.periodo, period: `${r.trimestre}T-${String(r.anio).slice(2)}`,
  actividad: r.tasa_de_actividad, empleo: r.tasa_de_empleo, desocupacion: r.tasa_de_desocupacion, subocupacion: r.tasa_de_subocupacion,
  empleoFormal: r.tasa_de_empleo_formal ?? null, empleoInformal: r.tasa_de_empleo_informal ?? null, observaciones: r.observaciones ?? null,
}));

// ---------- Índice de salarios
const sal = await load('indice-salarios');
const sLast = sal.datos.filter((r) => r.periodo === sal.ultimoPeriodo);
const salarios = [...new Set(sLast.map((r) => r.codigo))].map((c) => {
  const rs = sLast.filter((r) => r.codigo === c); const g = (t) => r2(rs.find((r) => r.tipo_de_indicador === t)?.valor);
  return { codigo: c, descripcion: rs[0].descripcion, indice: g('Indice'), mensual: g('v_m'), interanual: g('v_ia'), acumulada: g('v_acum'), observaciones: obsOf(rs) };
});
const SAL_MM = { '0': 'general', '110': 'privadoReg', '120': 'publico', '200': 'noReg' };
const salBy = new Map();
for (const r of sal.datos) {
  const o = salBy.get(r.periodo) ?? { periodo: r.periodo, date: lbl(r.periodo) };
  if (r.codigo === '0') {
    if (r.tipo_de_indicador === 'v_m') o.mensual = r2(r.valor);
    else if (r.tipo_de_indicador === 'v_ia') o.interanual = r2(r.valor);
    else if (r.tipo_de_indicador === 'v_acum') o.acumulada = r2(r.valor);
    else if (r.tipo_de_indicador === 'Indice') o.indice = r2(r.valor);
  }
  const mm = SAL_MM[r.codigo];
  if (mm && r.tipo_de_indicador === 'v_m') o[mm] = r2(r.valor);
  if (r.observaciones) {
    o.obs = o.obs ?? [];
    o.obs.push(r.observaciones);
  }
  salBy.set(r.periodo, o);
}
const salariosSerie = [...salBy.values()].sort((a, b) => a.periodo.localeCompare(b.periodo)).map(({ obs, ...o }) => ({ ...o, observaciones: obs ? [...new Set(obs)].join(' · ') : null }));

// ---------- UCII (snapshot verificado en el informe técnico; la API no publica esta serie)
const ucii = await load('ucii');

const out = {
  _nota: 'Generado por scripts/indec-derive.mjs desde data/indec/*.json (API del INDEC). No editar a mano.',
  emae: { ...meta(eg), serie: emae },
  emaeSectores: { ...meta(es), periodo: es.ultimoPeriodo, sectores },
  ipc: { ...meta(ipcS), serie: ipc, regiones: ipcRegiones, divisiones: ipcDivisiones },
  canastas: { ...meta(cb), periodo: cb.ultimoPeriodo, regiones: canastas, hogares: hogarDesc },
  pobreza: { ...meta(pob), serie: pobreza },
  trabajo: { ...meta(mt), serie: trabajo },
  salarios: { ...meta(sal), periodo: sal.ultimoPeriodo, series: salarios, serie: salariosSerie },
  ucii,
};
await writeFile(path.join(DIR, 'resumen.json'), JSON.stringify(out, null, 1) + '\n');
console.log('✓ data/indec/resumen.json');
