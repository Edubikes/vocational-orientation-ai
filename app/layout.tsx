import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Syne } from 'next/font/google';
import { SiteNav } from '@/components/nav/SiteNav';
import './globals.css';

const display = Syne({
    subsets: ['latin'],
    weight: ['600', '700', '800'],
    variable: '--font-display',
    display: 'swap',
});

const ui = Inter_Tight({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-ui',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Descifra Tu Futuro',
    description:
        'Sesenta preguntas en voz alta, un arquetipo y ocho rutas con datos de México. SORE.',
};

export const viewport: Viewport = {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es-MX" className={`${display.variable} ${ui.variable}`}>
            <body>
                <SiteNav />
                {children}
            </body>
        </html>
    );
}
