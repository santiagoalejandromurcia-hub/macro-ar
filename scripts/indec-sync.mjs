#!/usr/bin/env node
// Sincroniza snapshots de la API del INDEC (https://api.indec.gob.ar/v1/) a data/indec/*.json.
// Lee el token SOLO de la variable de entorno INDEC_API_TOKEN. Nunca lo imprime ni lo escribe.
// Uso: INDEC_API_TOKEN=... node scripts/indec-sync.mjs [servicio ...]
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://api.indec.gob.ar/v1/';
const OUT = path.join(process.cwd(), 'data', 'indec');
const PAGE = 1000;

// servicio → { archivo, orden (clave completa para paginar estable), filtro opcional }
const SERVICES = {
  'estimador-mensual-de-actividad-economica-nivel-general': { file: 'emae-nivel-general', order: 'periodo.asc,tipo_de_indicador.asc', filter: 'anio=gte.2016' },
  'estimador-mensual-de-actividad-economica-sectores': { file: 'emae-sectores', order: 'periodo.asc,codigo.asc,tipo_de_indicador.asc', filter: 'anio=gte.2024' },
  ipc_nacional: { file: 'ipc-nacional', keep: (r) => r.nivel !== 'Grupo' && r.nivel !== 'Clase', order: 'periodo.asc,region.asc,clasificador.asc,codigo.asc,indicador.asc,tipo_de_indicador.asc', filter: 'anio=gte.2023&tipo_de_indicador=in.(Indice,v_m,v_ia,v_acum)' },
  valorizacion_canastas_cba_cbt: { file: 'canastas-cba-cbt', order: 'periodo.asc,region.asc,codigo.asc,indicador.asc,tipo_de_indicador.asc', filter: 'anio=gte.2024' },
  mercado_trabajo_eph: { file: 'mercado-trabajo-eph', order: 'periodo.asc,area_geografica_cod.asc', filter: 'anio=gte.2016' },
  pobreza_eph: { file: 'pobreza-eph', order: 'periodo.asc,area_geografica_cod.asc', filter: 'anio=gte.2016' },
  indice_salarios: { file: 'indice-salarios', order: 'periodo.asc,clasificador.asc,codigo.asc,indicador.asc,tipo_de_indicador.asc', filter: 'anio=gte.2024' },
};

// Fechas de publicación verificadas en el calendario del INDEC (clave: servicio|periodo).
// Solo cargar fechas verificables; si no, queda null y el sitio muestra «dato hasta <periodo>».
import pubDates from '../data/indec/fechas-publicacion.json' with { type: 'json' };

/** "10159,65" → 10159.65; números pasan igual; vacío/no numérico → null */
export function toNum(v) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  const s = String(v).trim().replace(/\./g, (m, i, str) => (str.includes(',') ? '' : m)).replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

async function fetchAll(service, { order, filter }) {
  const token = process.env.INDEC_API_TOKEN;
  if (!token) throw new Error('Falta INDEC_API_TOKEN en el entorno');
  const rows = [];
  for (let offset = 0; ; offset += PAGE) {
    const qs = [`order=${order}`, `limit=${PAGE}`, `offset=${offset}`, filter].filter(Boolean).join('&');
    const res = await fetch(`${BASE}${service}?${qs}`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
    if (!res.ok) throw new Error(`${service}: HTTP ${res.status}`);
    const page = await res.json();
    rows.push(...page);
    if (page.length < PAGE) break;
  }
  return rows;
}

function normalize(rows) {
  return rows.map((r) => {
    const o = {};
    for (const [k, v] of Object.entries(r)) {
      if (k === 'valor' || k.startsWith('tasa_')) o[k] = toNum(v);
      else o[k] = v;
    }
    return o;
  });
}

// Una fila por línea: diffs legibles en git sin inflar el archivo.
function serialize({ datos, ...meta }) {
  const head = JSON.stringify(meta, null, 2).replace(/\n}$/, '');
  return `${head},\n  "datos": [\n${datos.map((r) => '    ' + JSON.stringify(r)).join(',\n')}\n  ]\n}\n`;
}

const wanted = process.argv.slice(2);
await mkdir(OUT, { recursive: true });
const consultedAt = new Date().toISOString();
for (const [service, cfg] of Object.entries(SERVICES)) {
  if (wanted.length && !wanted.includes(service) && !wanted.includes(cfg.file)) continue;
  const rows = normalize(await fetchAll(service, cfg)).filter(cfg.keep ?? (() => true));
  const periodos = [...new Set(rows.map((r) => String(r.periodo)))].sort();
  const ultimo = periodos.at(-1) ?? null;
  const snapshot = {
    fuente: 'INDEC — API de datos (api.indec.gob.ar)',
    servicio: service,
    url: `${BASE}${service}`,
    fechaConsulta: consultedAt,
    ultimoPeriodo: ultimo,
    fechaPublicacion: pubDates[`${service}|${ultimo}`] ?? null,
    filas: rows.length,
    datos: rows,
  };
  await writeFile(path.join(OUT, `${cfg.file}.json`), serialize(snapshot));
  console.log(`✓ ${service}: ${rows.length} filas · último ${ultimo}`);
}

// Regenera el resumen liviano que importa el sitio.
await import('./indec-derive.mjs');
