import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Forzamos Node runtime (necesitamos fs) y sin cache.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ============================================================
// Persistencia: por ahora archivo JSON local.
// Cuando escalemos, cambiar este handler por una llamada a
// Resend / Buttondown / Mailchimp / Brevo — mantener la misma
// interfaz de request/response.
// ============================================================

type Subscriber = {
  email: string;
  subscribedAt: string; // ISO
  source: string;       // de dónde vino (home, articulo, etc.)
  userAgent?: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'subscribers.json');

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function writeSubscribers(subs: Subscriber[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(subs, null, 2), 'utf-8');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: unknown; source?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body inválido.' }, { status: 400 });
  }

  const emailRaw = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const source = typeof body.source === 'string' ? body.source.slice(0, 50) : 'home';

  if (!emailRaw || !EMAIL_REGEX.test(emailRaw) || emailRaw.length > 254) {
    return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
  }

  try {
    const subs = await readSubscribers();

    // Evitar duplicados (idempotente)
    const existing = subs.find((s) => s.email === emailRaw);
    if (existing) {
      return NextResponse.json({
        ok: true,
        message: 'Ya estabas suscripto. ¡Gracias!',
      });
    }

    const newSub: Subscriber = {
      email: emailRaw,
      subscribedAt: new Date().toISOString(),
      source,
      userAgent: req.headers.get('user-agent') || undefined,
    };

    subs.push(newSub);
    await writeSubscribers(subs);

    // TODO: cuando conectemos provider real, mandar email de
    // bienvenida acá. Por ahora solo persistimos.

    return NextResponse.json({
      ok: true,
      message: '¡Listo! Te vas a enterar antes que nadie.',
    });
  } catch (err) {
    console.error('[newsletter] error persistiendo:', err);
    return NextResponse.json(
      { error: 'No pudimos procesar tu suscripción.' },
      { status: 500 }
    );
  }
}

// GET deshabilitado — no queremos exponer la lista.
export async function GET() {
  return NextResponse.json({ error: 'Método no permitido.' }, { status: 405 });
}
