// ============================================================
// Drizzle schema — Auth.js v5 + tabla de descargas
// ============================================================
// Las 4 tablas requeridas por @auth/drizzle-adapter:
//   users, accounts, sessions, verification_tokens
// Tabla propia para registro de descargas: downloads.
// ============================================================

import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  serial,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

// ─── USERS ──────────────────────────────────────────────────
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ─── ACCOUNTS (OAuth providers vinculados) ─────────────────
export const accounts = pgTable(
  'accounts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

// ─── SESSIONS ──────────────────────────────────────────────
export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// ─── VERIFICATION TOKENS (magic links de email) ────────────
export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// ─── DOWNLOADS (tracking propio para analytics) ────────────
export const downloads = pgTable('downloads', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  resourceSlug: text('resource_slug').notNull(), // ej: 'break-even'
  filename: text('filename').notNull(),
  downloadedAt: timestamp('downloaded_at', { mode: 'date' }).defaultNow().notNull(),
  userAgent: text('user_agent'),
  ipHash: text('ip_hash'), // hash sha256 de IP para privacidad
});
