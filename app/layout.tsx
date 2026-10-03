import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import MetaPixel from '@/components/MetaPixel';
import { careers } from '@/lib/careers';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const SITE_URL = 'https://descifratufuturo.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Descifra Tu Futuro | Elige carrera con datos',
  description: `60 preguntas, 12 dimensiones de pensamiento y ${careers.length} rutas profesionales. Tu arquetipo gratis; el reporte completo de 7 páginas por $199 MXN.`,
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Alguien en tu salón ya sabe qué va a estudiar.',
    description: `60 preguntas · 12 dimensiones · ${careers.length} rutas profesionales. Tu arquetipo es gratis.`,
    locale: 'es_MX',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Descifra Tu Futuro' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
};

export const viewport: Viewport = {
  themeColor: '#f3f0e8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body className={`${inter.variable} ${newsreader.variable} antialiased`}>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
