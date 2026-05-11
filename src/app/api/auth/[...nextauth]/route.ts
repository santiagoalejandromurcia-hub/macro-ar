// Route handler oficial para NextAuth v5.
// Expone /api/auth/signin, /api/auth/callback/*, etc.
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
export const dynamic = 'force-dynamic';
