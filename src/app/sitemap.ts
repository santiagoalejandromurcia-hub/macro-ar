import { articles } from '@/data/articles';
import { glosario } from '@/data/glosario';
import type { MetadataRoute } from 'next';

// ============================================================
// Sitemap.xml — generado automáticamente por Next.js
// Google lo descubre vía /sitemap.xml y lo usa para indexar.
// Asegurate de tener registrado el sitio en Google Search Console
// y de subir esta URL como sitemap principal.
// ============================================================

const BASE_URL = 'https://macrolibre.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Páginas estáticas ───
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/calculadora`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9, // alto: magnet de tráfico (long-tail keywords)
    },
    {
      url: `${BASE_URL}/break-even`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85, // alto: nicho diferenciado, sin competencia directa en español
    },
    {
      url: `${BASE_URL}/inflacion`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/carnes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8, // alto: nicho diferenciado (faena + exportaciones)
    },
    {
      url: `${BASE_URL}/articulos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/glosario`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7, // alto: long-tail evergreen
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/acerca`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/proxys`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ─── Artículos dinámicos ───
  // Usamos `now` como lastModified para evitar parsear el campo `date`
  // en español. Cuando agregues `publishedAt` en formato ISO al schema
  // Article, usalo acá para mejor señal a Google.
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articulos/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ─── Glosario (1 entrada por concepto) ───
  const glossaryPages: MetadataRoute.Sitemap = glosario.map((entry) => ({
    url: `${BASE_URL}/glosario/${entry.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const, // contenido evergreen
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...glossaryPages];
}
