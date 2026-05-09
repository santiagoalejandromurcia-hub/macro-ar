import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopTicker from '@/components/TopTicker';
import ThemeProvider from '@/components/ThemeProvider';
import PWARegister from '@/components/PWARegister';

export const metadata: Metadata = {
  title: {
    default: 'MacroLibre — Pulso económico en tiempo real',
    template: '%s | MacroLibre',
  },
  description:
    'Plataforma de estadísticas macroeconómicas de Argentina en tiempo real. Dólar blue, inflación, PBI, EMAE, reservas BCRA, resultado fiscal, simulador económico y más.',
  keywords: [
    'Argentina', 'macroeconomía', 'dólar blue', 'inflación', 'PBI',
    'EMAE', 'BCRA', 'reservas', 'fiscal', 'superávit', 'estadísticas',
    'economía argentina', 'riesgo país', 'tipo de cambio', 'simulador económico',
    'MacroLibre', 'datos económicos Argentina',
  ],
  authors: [{ name: 'MacroLibre' }],
  creator: 'MacroLibre',
  metadataBase: new URL('https://macrolibre.com'),
  alternates: { canonical: '/' },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://macrolibre.com',
    siteName: 'MacroLibre',
    title: 'MacroLibre — Pulso económico en tiempo real',
    description: 'Dólar blue en vivo, inflación, PBI, reservas, resultado fiscal y simulador económico.',
    // Nota: NO seteamos `images` acá. Next 15 inyecta automáticamente la OG
    // dinámica de src/app/opengraph-image.tsx (y la del slug en artículos).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacroLibre — Pulso económico en tiempo real',
    description: 'Dólar blue en vivo, inflación, PBI, reservas y simulador económico.',
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MacroLibre',
  },
};

// ============================================================
// JSON-LD raíz: Organization + WebSite (con SearchAction).
// Esto le dice a Google qué marca somos y, si lo aprueba,
// puede mostrar un searchbox dentro de la SERP cuando alguien
// busca "macrolibre".
// ============================================================
const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MacroLibre',
  url: 'https://macrolibre.com',
  logo: 'https://macrolibre.com/logo-app-icon.png',
  description:
    'Plataforma de estadísticas macroeconómicas de Argentina en tiempo real.',
  sameAs: [
    'https://www.instagram.com/macrolibre/',
    'https://www.linkedin.com/in/macrolibre/',
  ],
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MacroLibre',
  url: 'https://macrolibre.com',
  inLanguage: 'es-AR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://macrolibre.com/articulos?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JMF7YPTCNY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JMF7YPTCNY');
          `}
        </Script>
        {/* JSON-LD para Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-app-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0a1018" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <PWARegister />
          <TopTicker />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
