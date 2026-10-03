'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Piezas cliente de la landing.
 * - Entradas: SOLO opacidad, ≤0.3 s, sin layout ni springs.
 * - prefers-reduced-motion: el contenido aparece sin animar.
 * - CTA fijo en móvil: aparece cuando el CTA del hero sale por arriba del
 *   viewport (IntersectionObserver, sin listeners de scroll).
 */

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function LandingMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  onView?: boolean;
}

export function Reveal({ delay = 0, onView = false, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0 } : { duration: 0.3, delay, ease: EASE, type: 'tween' as const };
  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0 }}
      {...(onView
        ? { whileInView: { opacity: 1 }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
        : { animate: { opacity: 1 } })}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
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
        className="flex h-14 w-full items-center justify-between gap-3 bg-accion px-5 text-[17px] font-semibold text-white active:bg-accion-2"
      >
        {label}
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  );
}
