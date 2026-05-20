import { NextResponse } from 'next/server';
import { db } from '@/db';
import { articleLikes } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/likes/[slug] — devuelve el contador actual
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const rows = await db.select().from(articleLikes).where(eq(articleLikes.slug, slug));
    return NextResponse.json({ count: rows[0]?.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

// POST /api/likes/[slug] — incrementa en 1
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const rows = await db.select().from(articleLikes).where(eq(articleLikes.slug, slug));

    if (rows.length === 0) {
      await db.insert(articleLikes).values({ slug, count: 1 });
      return NextResponse.json({ count: 1 });
    }

    const newCount = (rows[0].count ?? 0) + 1;
    await db
      .update(articleLikes)
      .set({ count: newCount, updatedAt: new Date() })
      .where(eq(articleLikes.slug, slug));

    return NextResponse.json({ count: newCount });
  } catch (e) {
    console.error('[API/likes]', e);
    return NextResponse.json({ error: 'Error al guardar like' }, { status: 500 });
  }
}
