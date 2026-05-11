// ============================================================
// API /api/download/[slug] — descarga gateada por login
// ============================================================
// Sirve archivos desde /private/datasets/* solo a usuarios
// autenticados. Registra cada descarga en la tabla `downloads`
// para tracking interno.
//
// Catálogo de recursos descargables:
//   - break-even → /private/datasets/break-even.xlsx
//
// Para agregar uno nuevo: meté el archivo en /private/datasets/
// y agregá una entrada al objeto CATALOG.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { auth } from '@/auth';
import { db } from '@/db';
import { downloads } from '@/db/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Resource {
  filename: string;
  contentType: string;
  privatePath: string;
}

const CATALOG: Record<string, Resource> = {
  'break-even': {
    filename: 'macrolibre-break-even.xlsx',
    contentType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    privatePath: 'private/datasets/break-even.xlsx',
  },
};

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return crypto
    .createHash('sha256')
    .update(ip + (process.env.AUTH_SECRET ?? ''))
    .digest('hex')
    .slice(0, 16);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  // ─── 1. Verificar sesión ───
  const session = await auth();
  if (!session?.user?.id) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // ─── 2. Buscar recurso en catálogo ───
  const { slug } = await params;
  const resource = CATALOG[slug];
  if (!resource) {
    return NextResponse.json({ error: 'Recurso no encontrado' }, { status: 404 });
  }

  // ─── 3. Leer archivo del disco (fuera de /public) ───
  let file: Buffer;
  try {
    file = await fs.readFile(path.join(process.cwd(), resource.privatePath));
  } catch {
    return NextResponse.json(
      { error: 'Archivo temporalmente no disponible' },
      { status: 503 },
    );
  }

  // ─── 4. Registrar descarga (best-effort, no rompe si falla) ───
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
    await db.insert(downloads).values({
      userId: session.user.id,
      resourceSlug: slug,
      filename: resource.filename,
      userAgent: req.headers.get('user-agent') ?? null,
      ipHash: hashIp(ip),
    });
  } catch (err) {
    console.error('[download] no se pudo registrar', err);
  }

  // ─── 5. Servir el archivo ───
  return new NextResponse(new Uint8Array(file), {
    headers: {
      'Content-Type': resource.contentType,
      'Content-Disposition': `attachment; filename="${resource.filename}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
