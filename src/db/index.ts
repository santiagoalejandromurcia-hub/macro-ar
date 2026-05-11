// ============================================================
// Drizzle DB client — Neon Postgres
// ============================================================
// Usa el pool de pg (node-postgres). Neon es Postgres puro,
// así que esto sirve tanto local (corriendo postgres) como
// en producción contra Neon serverless.
//
// La connection string viene en process.env.DATABASE_URL.
// Si no está, los queries van a tirar error — eso obliga a
// configurar el env antes de deploy.
// ============================================================

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Pool global para reutilizar conexiones entre invocations
// de serverless functions.
const globalForPool = globalThis as unknown as { pool?: Pool };

export const pool =
  globalForPool.pool ??
  new Pool({
    connectionString,
    // Neon requiere SSL en producción
    ssl: connectionString?.includes('localhost')
      ? false
      : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPool.pool = pool;
}

export const db = drizzle(pool, { schema });
export { schema };
