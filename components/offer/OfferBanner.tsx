'use client';

import { usePathname } from 'next/navigation';
import { OFFER_DAY, OFFER_NOW, OFFER_WAS, offerIsLive } from '@/lib/offer';

export function OfferBanner() {
    const pathname = usePathname();
    if (pathname === '/test') return null;
    if (!offerIsLive()) return null;

    return (
        <aside className="offer-banner" aria-label="Oferta de hoy">
            <p className="offer-day">{OFFER_DAY}</p>
            <p className="offer-now">{OFFER_NOW}</p>
            <p className="offer-was">
                <s>{OFFER_WAS}</s>
                <span>MXN · 25 de octubre</span>
            </p>
        </aside>
    );
}
