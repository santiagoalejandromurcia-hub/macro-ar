// ============================================================
// NextAuth.js v5 — config central
// ============================================================
// Dos providers:
//   1. Google OAuth — botón "Continuar con Google"
//   2. Resend magic link — botón "Continuar con email"
//
// Storage: Postgres (Neon) vía Drizzle adapter.
// Sessions: database-backed (no JWT) para poder invalidar.
// ============================================================

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { users, accounts, sessions, verificationTokens } from '@/db/schema';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_RESEND_FROM ?? 'MacroLibre <onboarding@resend.dev>',
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/login/check-email',
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async session({ session, user }) {
      // Expone el id de usuario en la session — útil en server components.
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  trustHost: true, // necesario para Vercel preview deploys
});
