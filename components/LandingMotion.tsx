'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Piezas cliente de la landing — sin framer-motion (≈50 KB gz menos en la home).
 * - Entradas: SOLO opacidad, ≤0.3 s, con transición CSS + IntersectionObserver.
 * - prefers-reduced-motion: el contenido aparece sin animar (motion-reduce:).
 * - CTA fijo en móvil: aparece cuando el CTA del hero sale por arriba del
 *   viewport (IntersectionObserver, sin listeners de scroll).
 */

/** Se conserva por compatibilidad: ya no necesita contexto de animación. */
export function LandingMotion({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  onView?: boolean;
}

export function Reveal({ delay = 0, onView = false, className = '', style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!onView || typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ ...style, transitionDelay: delay ? `${delay}s` : undefined }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function StickyCta({ targetId, href, label }: { targetId: string; href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-linea bg-papel/90 px-4 pt-3 backdrop-blur-md transition-opacity duration-200 md:hidden ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      aria-hidden={!visible}
    >
      <Link
        href={href}
        tabIndex={visible ? 0 : -1}
        className="flex h-14 w-full items-center justify-between gap-3 bg-accion px-5 text-[17px] font-semibold text-papel active:bg-accion-2"
      >
        {label}
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  );
}
