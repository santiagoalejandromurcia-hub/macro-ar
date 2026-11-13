# Sincronización con la API del INDEC

El sitio **no** consulta la API del INDEC en tiempo de ejecución. Un script local baja las series,
las guarda como snapshots JSON versionados en `data/indec/` y el sitio los lee al compilar.

## Cómo correrlo (días de publicación del INDEC)

```bash
export INDEC_API_TOKEN=...   # token Bearer personal. NO commitear, NO usar NEXT_PUBLIC_
node scripts/indec-sync.mjs            # todas las series
node scripts/indec-sync.mjs ipc_nacional   # una sola (nombre de servicio o de archivo)
node scripts/indec-derive.mjs          # solo regenera data/indec/resumen.json (sin red ni token)
```

Después: cargar en `data/indec/fechas-publicacion.json` la fecha de publicación del informe
(clave `servicio|periodo`, p. ej. `"ipc_nacional|202610": "2026-11-12"`) **solo si está verificada
en el calendario del INDEC**; si no, el sitio muestra «dato hasta <periodo>». Volver a correr
`node scripts/indec-derive.mjs`, revisar el diff, `npm run build` y abrir PR.

## Qué guarda

- `data/indec/<serie>.json`: snapshot crudo (fuente, servicio, URL, `fechaConsulta`, `ultimoPeriodo`,
  `fechaPublicacion` o `null`, y todas las filas). `valor`/`tasa_*` se convierten a número
  (coma decimal → punto). Se conservan `<col>_null` (signos del INDEC) y `observaciones`
  (p. ej. «Dato provisorio», que el sitio muestra).
- `data/indec/resumen.json`: subconjunto liviano que importa `src/data/indec.ts`. No calcula
  variaciones ni desestacionaliza: solo selecciona y redondea lo publicado.

| Servicio | Archivo | Filtro |
|---|---|---|
| estimador-mensual-de-actividad-economica-nivel-general | emae-nivel-general | desde 2016 |
| estimador-mensual-de-actividad-economica-sectores | emae-sectores | desde 2024 |
| ipc_nacional | ipc-nacional | desde 2023; índice y v_m/v_ia/v_acum; sin Grupo/Clase COICOP |
| valorizacion_canastas_cba_cbt | canastas-cba-cbt | desde 2024 |
| mercado_trabajo_eph | mercado-trabajo-eph | desde 2016 |
| pobreza_eph | pobreza-eph | desde 2016 |
| indice_salarios | indice-salarios | desde 2024; se muestra en /actividad#indice-salarios |

UCII no está en la API del INDEC: el snapshot `data/indec/ucii.json` solo tiene valores verificados en el informe técnico y se muestra en `/actividad#ucii`.

Paginación: 1000 filas por pedido (`limit`/`offset`, ordenado por la clave completa).
Base `https://api.indec.gob.ar/v1/` (la barra final es obligatoria).
