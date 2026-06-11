# MacroLibre

Plataforma de estadísticas macroeconómicas de Argentina. Datos de fuentes oficiales (INDEC, BCRA, Min. Economía) visualizados con claridad, análisis y herramientas interactivas.

Stack: Next.js 15, TypeScript, Tailwind CSS, Recharts.

---

## Repo y carpetas (canónico)

| Qué | Dónde |
|-----|-------|
| **Carpeta local** | `~/macro-arg` (esta) |
| **Repo GitHub** | [macro-ar](https://github.com/santiagoalejandromurcia-hub/macro-ar) |
| **Producción** | [macrolibre.com](https://macrolibre.com) |

Carpetas deprecadas (no usar):

- `macro-arg-push` — copia previa al deploy; contenido migrado acá
- `macro-arg-local` — workspace editorial suelto; `CONTEXTO/` ya está en este repo
- `macroarg` — prototipo Next 16 abandonado; solo se rescató `ml/` e `INVESTMENT_THESIS.md`

---

## Correr en local

Requisito: Node.js LTS (https://nodejs.org).

```bash
cd ~/macro-arg
npm install
npm run dev
```

Abrir http://localhost:3000.

---

## Deploy

Proyecto pensado para Vercel. Push a GitHub → Import en Vercel → deploy automático. Dominio de producción: `macrolibre.com`.

```bash
git add .
git commit -m "mensaje"
git push
```

---

## Estructura

```
macro-arg/
├── ml/                           Modelos Python (proxy M2, análisis causal)
├── private/                      Docs internos (no públicos)
├── src/
│   ├── app/
│   │   ├── page.tsx              Dashboard (home)
│   │   ├── layout.tsx            Layout (Navbar + Footer + Theme)
│   │   ├── inflacion/page.tsx    Página de inflación
│   │   ├── proxys/page.tsx       Proxys macro (M2, etc.)
│   │   ├── articulos/            Blog (lista + [slug])
│   │   ├── contacto/page.tsx
│   │   └── api/                  Endpoints de datos en vivo
│   │       ├── dolar/            Dólar blue
│   │       ├── riesgo-pais/
│   │       ├── reservas/
│   │       ├── inflacion/
│   │       ├── emae/
│   │       ├── ipim/
│   │       ├── kpis/
│   │       └── newsletter/       Captura de suscriptores
│   ├── components/               UI y gráficos
│   ├── data/
│   │   ├── macroData.ts          Datos macro estáticos (mock / fallback)
│   │   └── articles.ts           Artículos del blog
│   ├── hooks/useLiveData.ts
│   └── lib/                      Utilidades (CSV, data helpers)
├── package.json
└── README.md
```

---

## Agregar un artículo al blog

Editar `src/data/articles.ts` y agregar un objeto al array:

```ts
{
  slug: 'mi-articulo',              // sin espacios ni acentos
  title: 'Título',
  author: 'Autor',
  authorRole: 'Rol — Institución',
  date: '15 de abril de 2026',
  summary: 'Resumen corto.',
  image: '📊',
  tags: ['Economía', 'Análisis'],
  readTime: '5 min',
  content: `
## Sección

Texto con **negritas** y subtítulos con ##.
  `,
},
```

El sitemap se regenera solo.

---

## Suscriptores del newsletter

Los emails capturados por `/api/newsletter` se persisten en `data/subscribers.json` (gitignored). Para producción, migrar a Resend / Buttondown / Mailchimp cambiando el handler del endpoint.

---

© MacroLibre — Datos de fuentes oficiales públicas. No constituye asesoramiento financiero.
