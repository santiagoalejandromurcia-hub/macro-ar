// ============================================================
// Middleware — protección liviana de rutas privadas
// ============================================================
// Importante: NO llama a auth() ni toca la DB. Solo chequea
// si existe la cookie de sesión de NextAuth. La validación
// real la hace cada handler/page server-side.
//
// Esto permite que el sitio funcione incluso si las env vars
// de NextAuth no están todavía seteadas en producción.
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected =
    pathname.startsWith('/api/download') || pathname.startsWith('/cuenta');

  if (!isProtected) return NextResponse.next();

  // NextAuth v5 setea estas cookies (la segunda solo en HTTPS)
  const sessionToken =
    req.cookies.get('authjs.session-token')?.value ||
    req.cookies.get('__Secure-authjs.session-token')?.value;

  if (!sessionToken) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/download/:path*', '/cuenta/:path*'],
};
