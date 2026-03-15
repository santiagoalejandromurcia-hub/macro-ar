import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'MacroLibre — Estadísticas Macroeconómicas de Argentina',
    template: '%s | MacroLibre',
  },
  description:
    'Plataforma de estadísticas macroeconómicas de Argentina en tiempo real. Dólar blue, inflación, PBI, EMAE, reservas BCRA, resultado fiscal, simulador económico austríaco y más. Datos actualizados de fuentes oficiales.',
  keywords: [
    'Argentina', 'macroeconomía', 'dólar blue', 'inflación', 'PBI',
    'EMAE', 'BCRA', 'reservas', 'fiscal', 'superávit', 'estadísticas',
    'economía argentina', 'riesgo país', 'tipo de cambio', 'simulador económico',
    'escuela austríaca', 'MacroLibre', 'datos económicos Argentina',
  ],
  authors: [{ name: 'MacroLibre' }],
  creator: 'MacroLibre',
  publisher: 'MacroLibre',
  metadataBase: new URL('https://macrolibre.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://macrolibre.com',
    siteName: 'MacroLibre',
    title: 'MacroLibre — Estadísticas Macroeconómicas de Argentina',
    description:
      'Dólar blue en vivo, inflación, PBI, reservas, resultado fiscal y simulador económico austríaco. Datos actualizados de Argentina.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MacroLibre — Estadísticas Macroeconómicas de Argentina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacroLibre — Estadísticas Macro de Argentina',
    description: 'Dólar blue en vivo, inflación, PBI, reservas y simulador económico austríaco.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Cuando des de alta Google Search Console, pegá el código acá:
    // google: 'TU-CODIGO-DE-VERIFICACION',
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
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-16 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
