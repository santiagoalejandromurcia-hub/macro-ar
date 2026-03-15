# 🇦🇷 MacroAR.app

Plataforma de estadísticas macroeconómicas de Argentina.

---

## 🚀 PASO 1 — Correr en tu computadora

### Requisito previo: instalar Node.js

1. Andá a **https://nodejs.org**
2. Descargá la versión **LTS** (el botón verde grande)
3. Instalalo como cualquier programa (siguiente, siguiente, instalar)
4. Para verificar que se instaló bien, abrí la **Terminal** (Mac) o **CMD/PowerShell** (Windows) y escribí:

```
node --version
```

Si te muestra un número (como `v20.11.0`), está todo bien.

### Ahora sí, correr MacroAR:

```bash
# 1. Abrí la Terminal/CMD y navegá a la carpeta del proyecto
cd macro-ar

# 2. Instalá las dependencias (tarda 1-2 minutos la primera vez)
npm install

# 3. Arrancá el servidor de desarrollo
npm run dev
```

4. Abrí tu navegador en **http://localhost:3000**
5. ¡Listo! Ya ves MacroAR.app andando en tu compu.

Para frenar el servidor: apretá `Ctrl + C` en la Terminal.

---

## ☁️ PASO 2 — Subir a Internet con Vercel (gratis)

### 2A. Subir el código a GitHub

1. Creá una cuenta en **https://github.com** (si no tenés)
2. Creá un repositorio nuevo: click en **"New repository"**
   - Nombre: `macro-ar`
   - Dejalo **público**
   - NO marques "Add README" (ya tenemos uno)
   - Click **"Create repository"**
3. En la Terminal, dentro de la carpeta `macro-ar`:

```bash
git init
git add .
git commit -m "MacroAR.app v1"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/macro-ar.git
git push -u origin main
```

(Reemplazá `TU-USUARIO` por tu nombre de usuario de GitHub)

### 2B. Conectar con Vercel

1. Andá a **https://vercel.com** y logueate con tu cuenta de GitHub
2. Click en **"Add New Project"**
3. Buscá y seleccioná el repo **macro-ar**
4. Framework Preset: **Next.js** (lo detecta solo)
5. Click en **"Deploy"**
6. ¡En 60 segundos tu web está online en `tu-proyecto.vercel.app`!

### 2C. Dominio personalizado (opcional)

En Vercel → tu proyecto → Settings → Domains → escribí `macroar.app` (o el dominio que compres) y seguí las instrucciones de DNS.

---

## 📝 PASO 3 — Agregar un artículo nuevo al blog

1. Abrí el archivo `src/data/articles.ts` con cualquier editor de texto
2. Copiá uno de los artículos existentes
3. Pegalo al final del array (antes del `];`)
4. Cambiá los datos:

```typescript
{
  slug: 'mi-nuevo-articulo',           // sin espacios, sin acentos
  title: 'Título de Mi Artículo',
  author: 'Tu Nombre',
  authorRole: 'Tu cargo — Tu institución',
  date: '15 de marzo de 2026',
  summary: 'Un resumen corto de qué trata...',
  image: '📊',                         // un emoji
  tags: ['Economía', 'Análisis'],
  readTime: '5 min',
  content: `
## Primera sección

Acá va el texto. Podés usar **negritas** y secciones con ##.

## Segunda sección

Más texto...
  `,
},
```

5. Guardá el archivo
6. Si estás corriendo `npm run dev`, el artículo aparece al instante
7. Si ya está en Vercel, hacé `git add . && git commit -m "Nuevo artículo" && git push` y Vercel lo actualiza solo

---

## 📁 Estructura del proyecto

```
macro-ar/
├── src/
│   ├── app/
│   │   ├── page.tsx            ← Página principal (dashboard)
│   │   ├── layout.tsx          ← Layout con Navbar y Footer
│   │   ├── globals.css         ← Estilos
│   │   └── articulos/
│   │       ├── page.tsx        ← Lista de artículos
│   │       └── [slug]/page.tsx ← Artículo individual
│   ├── components/
│   │   ├── Charts.tsx          ← Todos los gráficos
│   │   ├── Navbar.tsx          ← Barra de navegación
│   │   └── ...otros
│   └── data/
│       ├── macroData.ts        ← DATOS MACRO (editá acá los números)
│       └── articles.ts         ← ARTÍCULOS DEL BLOG (agregá acá)
├── package.json
└── README.md                   ← Este archivo
```

## 🔄 Cómo actualizar los datos macro

Abrí `src/data/macroData.ts` y cambiá los números. Por ejemplo, para actualizar el dólar blue:

```typescript
{
  id: 'dolar-blue',
  title: 'Dólar Blue',
  value: '$1.250',        // ← cambiá este número
  change: -2.1,           // ← y este porcentaje
  changeLabel: 'vs. semana anterior',
  icon: '💵',
},
```

---

Hecho con Next.js 15, TypeScript, Tailwind CSS y Recharts.
