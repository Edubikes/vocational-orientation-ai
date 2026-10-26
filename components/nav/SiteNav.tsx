'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { LogoMark } from '@/components/brand/LogoMark';
import { unlockSpeech } from '@/lib/speech';
import { transitionTo } from '@/lib/navigate';

const LINKS = [
    { href: '/#ritual', label: 'Prueba' },
    { href: '/#mapa', label: 'Rutas' },
    { href: '/#cierre', label: 'Precio' },
];

export function SiteNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [openPath, setOpenPath] = useState<string | null>(null);
    const open = openPath === pathname;
    const closeRef = useRef<HTMLButtonElement>(null);
    const bare = pathname === '/test' || pathname === '/checkout';
    const hide = () => setOpenPath(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpenPath(null);
        };
        window.addEventListener('keydown', onKey);
        const main = document.querySelector('main');
        main?.setAttribute('inert', '');
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            window.removeEventListener('keydown', onKey);
            main?.removeAttribute('inert');
            document.body.style.overflow = previous;
        };
    }, [open]);

    if (bare) return null;

    const start = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        unlockSpeech();
        hide();
        transitionTo(router, '/test?voice=1');
    };

    return (
        <header className="site-nav">
            <a className="skip" href="#contenido">
                Saltar al contenido
            </a>
            <div className="nav-bar">
                <Link href="/" className="brand" aria-label="Descifra Tu Futuro, inicio">
                    <LogoMark />
                    <span className="wordmark">Descifra</span>
                    <span className="sore">SORE</span>
                </Link>

                <nav className="desk" aria-label="Secciones">
                    <div className="index-wrap">
                        <button type="button" className="nav-text" aria-haspopup="true">
                            Índice
                        </button>
                        <div className="mega">
                            <p className="mega-kicker">Cómo funciona</p>
                            <ol>
                                <li>
                                    <b>01</b>
                                    <span>Respondes. La voz lee cada pregunta.</span>
                                </li>
                                <li>
                                    <b>02</b>
                                    <span>Lees el arquetipo y la ruta 1.</span>
                                </li>
                                <li>
                                    <b>03</b>
                                    <span>Recibes ocho rutas al correo.</span>
                                </li>
                            </ol>
                            <Link href="/test?voice=1" onClick={start}>
                                Empezar la prueba
                            </Link>
                        </div>
                    </div>
                    {LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="nav-text">
                            {link.label}
                        </Link>
                    ))}
                    <span className="nav-price">
                        <s>$99</s> $10 MXN
                    </span>
                    <Link href="/test?voice=1" className="nav-text nav-start" onClick={start}>
                        Empezar
                    </Link>
                </nav>

                <button
                    type="button"
                    className="menu-btn"
                    aria-expanded={open}
                    aria-controls="menu-sheet"
                    onClick={() => setOpenPath(open ? null : pathname)}
                >
                    {open ? 'Cerrar' : 'Menú'}
                </button>
            </div>

            {open ? (
                <div className="sheet" id="menu-sheet" role="dialog" aria-modal="true" aria-label="Menú">
                    <button ref={closeRef} type="button" className="sheet-close" onClick={hide}>
                        Cerrar
                    </button>
                    <Link href="/#ritual" onClick={hide}>
                        La prueba
                    </Link>
                    <Link href="/#prueba" onClick={hide}>
                        El informe
                    </Link>
                    <Link href="/#mapa" onClick={hide}>
                        Ocho rutas
                    </Link>
                    <Link href="/#cierre" onClick={hide}>
                        Precio · $10 MXN
                    </Link>
                    <Link className="cta sheet-cta" href="/test?voice=1" onClick={start}>
                        Acércate a tu futuro
                    </Link>
                </div>
            ) : null}
        </header>
    );
}
