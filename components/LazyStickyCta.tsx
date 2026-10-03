'use client';

import dynamic from 'next/dynamic';

/**
 * El CTA fijo móvil arranca invisible (aparece al hacer scroll), así que no
 * aporta nada al primer render: se carga en el cliente, fuera del SSR.
 */
const StickyCta = dynamic(() => import('./LandingMotion').then((m) => m.StickyCta), { ssr: false });

export default function LazyStickyCta(props: { targetId: string; href: string; label: string }) {
  return <StickyCta {...props} />;
}
