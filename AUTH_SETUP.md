# MacroLibre — Setup de Autenticación

Esta guía te lleva paso a paso por la configuración del sistema de login (Google + Email magic link) y la base de datos. Tiempo estimado: **15-20 minutos**.

---

## 0. Instalar dependencias

```bash
cd ~/macro-arg
npm install
```

Esto instala las nuevas deps: `next-auth@beta`, `@auth/drizzle-adapter`, `drizzle-orm`, `pg`, `resend`, `drizzle-kit`.

---

## 1. Base de datos — Neon Postgres (5 min)

### 1.1. Crear cuenta y proyecto

1. Andá a https://neon.tech y registrate (gratis, sin tarjeta).
2. **Create project** → nombre: `macrolibre` → región: la más cercana (East US 2 si dudás).
3. Te muestra la **Connection string** (algo como `postgresql://user:pass@ep-xxx.neon.tech/macrolibre?sslmode=require`).
4. Copiá esa string entera.

### 1.2. Pegarla en tu `.env.local`

Crea el archivo `.env.local` en la raíz del proyecto (al lado de `package.json`) y pegá:

```
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/macrolibre?sslmode=require"
```

### 1.3. Correr las migraciones

```bash
npm run db:push
```

Esto crea las tablas `users`, `accounts`, `sessions`, `verification_tokens` y `downloads` en Neon. La primera vez te pregunta confirmación — escribí `y` y enter.

---

## 2. Google OAuth (5 min)

### 2.1. Crear OAuth client

1. https://console.cloud.google.com → arriba a la izquierda **Select a project** → **New Project** → nombre: `macrolibre` → Create.
2. En el menú lateral: **APIs & Services** → **OAuth consent screen**.
3. User type: **External** → Create.
4. App name: `MacroLibre` · User support email: tu email · Developer email: tu email · Save & Continue.
5. Scopes: dejá como está, Save & Continue. Test users: agregate a vos mismo, Save & Continue.
6. En el menú lateral: **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**.
7. Application type: **Web application** · Name: `MacroLibre web`.
8. **Authorized redirect URIs** — agregá las dos:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://macrolibre.com/api/auth/callback/google`
9. **Create**. Te muestra **Client ID** y **Client Secret**. Copialos.

### 2.2. Pegarlos en `.env.local`

```
AUTH_GOOGLE_ID="123456789-xxxxxx.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="GOCSPX-xxxxxxxxxxxxx"
```

---

## 3. Resend (email magic link, 5 min)

### 3.1. Crear cuenta y API key

1. https://resend.com → registrate.
2. Dashboard → **API Keys** → **Create API Key** → name: `macrolibre` → permission: **Sending access**.
3. Copiá la key (`re_xxxxxxxxxxxx`).

### 3.2. (Opcional) Verificar tu dominio

Por defecto Resend te deja enviar desde `onboarding@resend.dev` (válido para testing). Para enviar desde `noreply@macrolibre.com`:

1. Dashboard → **Domains** → **Add Domain** → `macrolibre.com`.
2. Te muestra registros DNS. Andá a tu proveedor de dominio (Cloudflare/etc.) y agregalos.
3. Cuando se verifique (verde), podés cambiar `AUTH_RESEND_FROM` abajo.

### 3.3. Pegarlo en `.env.local`

```
AUTH_RESEND_KEY="re_xxxxxxxxxxxxx"
AUTH_RESEND_FROM="MacroLibre <onboarding@resend.dev>"
```

---

## 4. AUTH_SECRET y NEXTAUTH_URL (1 min)

### 4.1. Generar secret random

En terminal:

```bash
openssl rand -base64 32
```

Copiá el output.

### 4.2. Pegarlo en `.env.local` junto con la URL local

```
AUTH_SECRET="el_string_que_te_dio_openssl"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 5. Probar local (2 min)

```bash
npm run dev
```

1. Abrí http://localhost:3000
2. Click en **Iniciar sesión** (esquina superior derecha).
3. Probá **Continuar con Google** → debería redirigirte a Google, pedir permiso, volver al sitio logueado.
4. Probá **Email magic link** → tipeá tu email → te llega un mail → click → logueado.
5. Andá a `/cuenta` → tenés que ver tu perfil.
6. Andá a `/break-even` → click en **Descargar .xlsx** → debería arrancar la descarga (si no estás logueado, te redirige a /login).
7. Volvé a `/cuenta` → tu descarga debería aparecer en la lista.

---

## 6. Deploy a Vercel

### 6.1. Agregar las env vars en Vercel

1. https://vercel.com → tu proyecto MacroLibre → **Settings** → **Environment Variables**.
2. Agregá una por una las **mismas** variables del `.env.local`:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `AUTH_RESEND_KEY`
   - `AUTH_RESEND_FROM`
3. **NO agregues** `NEXTAUTH_URL` en Vercel — Vercel lo setea solo. (Si lo agregás, ponelo en `https://macrolibre.com`.)

### 6.2. Push

```bash
git add .
git commit -m "feat auth con google y email magic link + dataset gateado"
git push
```

Vercel rebuildea automáticamente. Cuando termine, probá el flujo completo en `https://macrolibre.com`.

---

## 7. Limpieza final

El archivo viejo `/public/data/break-even/break-even.xlsx` ya **no se sirve** (el nuevo está en `/private/datasets/`). Borrarlo:

```bash
rm public/data/break-even/break-even.xlsx
git add . && git commit -m "chore remove old public xlsx"
git push
```

---

## Comandos útiles

```bash
# Ver/editar la base de datos en una UI web
npm run db:studio

# Generar nueva migración después de cambiar schema.ts
npm run db:generate

# Aplicar migraciones a la DB
npm run db:migrate

# Push directo del schema sin migration files (dev rápido)
npm run db:push
```

---

## Si algo falla

- **Error "DATABASE_URL is not defined"** → revisá que el `.env.local` esté en la raíz y que la connection string esté entre comillas.
- **Google OAuth tira "redirect_uri_mismatch"** → revisá que la redirect URI en Google Cloud incluya EXACTAMENTE `http://localhost:3000/api/auth/callback/google` (sin trailing slash).
- **Email magic link no llega** → revisá spam. Si nada, mirá los logs en Resend dashboard.
- **El botón Descargar redirige a /login en loop** → revisá `AUTH_SECRET` (tiene que estar seteado).

Cualquier error, pegámelo y lo solucionamos.
