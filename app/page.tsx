import { Bricolage_Grotesque, Outfit } from 'next/font/google';
import { VivoLanding } from '@/components/vivo/VivoLanding';
import './vivo.css';

const display = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['500', '700', '800'],
    variable: '--vivo-display',
    display: 'swap',
});

const sans = Outfit({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--vivo-sans',
    display: 'swap',
});

export default function Home() {
    return (
        <div className={`vivo-root ${display.variable} ${sans.variable}`}>
            <VivoLanding />
        </div>
    );
}
