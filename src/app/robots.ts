import type { MetadataRoute } from 'next';

// ============================================================
// robots.txt — control de crawlers
// ============================================================
// Permitimos explícitamente a los bots de IA (GPTBot, ClaudeBot,
// Perplexity, etc.) para maximizar el alcance en motores de
// respuesta generativa (AEO/GEO). Esta es una decisión consciente:
// queremos que las IAs lean MacroLibre y citen los datos.
//
// Si en el futuro querés bloquear alguno, agregalo como un
// objeto separado con `disallow: '/'` en la lista de rules.
// ============================================================

const SITE_URL = 'https://macrolibre.com';

// Bots de IA que sabemos que crawlean. Los permitimos a todos.
const AI_BOTS = [
  'GPTBot',              // OpenAI (ChatGPT)
  'ChatGPT-User',        // OpenAI cuando el usuario clickea un link
  'OAI-SearchBot',       // OpenAI Search
  'ClaudeBot',           // Anthropic (Claude) — entrenamiento
  'Claude-SearchBot',    // Anthropic — citación/retrieval en tiempo real (≠ entrenamiento)
  'Claude-Web',          // Anthropic cuando el usuario clickea un link
  'anthropic-ai',        // Anthropic legacy
  'PerplexityBot',       // Perplexity AI
  'Perplexity-User',     // Perplexity cuando el usuario clickea un link
  'Google-Extended',     // Gemini / Bard
  'GoogleOther',         // Google productos generales
  'CCBot',               // Common Crawl (alimenta muchos LLMs)
  'Bytespider',          // ByteDance / Doubao
  'cohere-ai',           // Cohere
  'Diffbot',             // Diffbot (alimenta varias IAs)
  'Meta-ExternalAgent',  // Meta AI
  'FacebookBot',         // Meta
  'Applebot',            // Apple Intelligence
  'Applebot-Extended',   // Apple AI training
  'YouBot',              // You.com
  'Amazonbot',           // Alexa+/Rufus
  'DuckAssistBot',       // DuckDuckGo AI
  'MistralAI-User',      // Mistral
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla general — todos los crawlers pueden ver todo.
      {
        userAgent: '*',
        allow: '/',
        // Evitamos que indexen los endpoints internos de Next y los
        // assets pesados. (Los endpoints /api/* sí los queremos accesibles.)
        disallow: ['/_next/', '/api/internal/'],
      },
      // Bots de IA — explícitamente permitidos.
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
