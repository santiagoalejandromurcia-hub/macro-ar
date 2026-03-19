import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import PWARegister from '@/components/PWARegister';

export const metadata: Metadata = {
  title: {
    default: 'MacroLibre — Estadísticas Macroeconómicas de Argentina',
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
    title: 'MacroLibre — Estadísticas Macroeconómicas de Argentina',
    description: 'Dólar blue en vivo, inflación, PBI, reservas, resultado fiscal y simulador económico.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MacroLibre' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacroLibre — Estadísticas Macro de Argentina',
    description: 'Dólar blue en vivo, inflación, PBI, reservas y simulador económico.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MacroLibre',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-app-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0A0E17" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <PWARegister />
          <Navbar />
          <main className="flex-1 pt-16 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
