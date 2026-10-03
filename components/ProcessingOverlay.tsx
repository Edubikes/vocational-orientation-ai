'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROCESSING_STEPS, PROCESSING_DURATION_MS } from '@/lib/config';

/**
 * ESTADO 3 — Pausa de procesamiento tras la pregunta 60.
 *
 * El cálculo real es instantáneo; esta pausa narra las etapas que el motor sí
 * ejecuta (sumar, medir contra el máximo, comparar rutas, asignar arquetipo).
 */

interface ProcessingOverlayProps {
  onComplete: () => void;
}

const STEP_DURATION_MS = PROCESSING_DURATION_MS / PROCESSING_STEPS.length;

export default function ProcessingOverlay({ onComplete }: ProcessingOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    PROCESSING_STEPS.forEach((_, index) => {
      if (index === 0) return;
      timers.push(setTimeout(() => setStepIndex(index), index * STEP_DURATION_MS));
    });

    timers.push(setTimeout(onComplete, PROCESSING_DURATION_MS));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-papel text-tinta"
      role="status"
      aria-live="polite"
      aria-label="Procesando tus respuestas"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5">
        <p className="text-[14px] font-medium text-gris">60 de 60 · listo</p>
        <h2 className="mt-2 font-serif text-[2rem] font-semibold leading-[1.1]">Armando tu mapa…</h2>
        <ul className="mt-6 space-y-3 text-[17px]">
          {PROCESSING_STEPS.map((step, i) => (
            <li key={step} className={`flex items-start gap-3 transition-opacity duration-200 ${i <= stepIndex ? 'opacity-100' : 'opacity-30'}`}>
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                  i < stepIndex ? 'border-tinta bg-tinta text-papel' : 'border-gris-2 text-gris'
                }`}
                aria-hidden="true"
              >
                {i < stepIndex ? '✓' : ''}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 h-1.5 bg-linea">
          <motion.div
            className="h-full bg-rojo"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: PROCESSING_DURATION_MS / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
