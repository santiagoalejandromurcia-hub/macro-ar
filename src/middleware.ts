// ============================================================
// Middleware — protege rutas privadas
// ============================================================
// Protege todas las rutas /api/download/* y /cuenta:
// si no hay sesión activa, redirige a /login.
// ============================================================

import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAuthed = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith('/api/download') || pathname.startsWith('/cuenta');

  if (isProtected && !isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Excluye rutas internas de Next y assets estáticos.
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
