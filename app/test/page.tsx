'use client';

import { useCallback, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { persistAnswers, type Answers } from '@/lib/lead';
import { clearProgress } from '@/lib/progress';
import ProcessingOverlay from '@/components/ProcessingOverlay';

/**
 * ESTADO 2 — El test. La UI vive en components/QuizEngine.tsx.
 *
 * QuizEngine se monta solo en cliente: restaura el borrador desde localStorage
 * en su estado inicial, y hacerlo en el servidor provocaría un desajuste de
 * hidratación (el servidor no conoce el progreso del usuario).
 *
 * ESTADO 3 (ProcessingOverlay) sigue viviendo aquí como overlay: las respuestas
 * se persisten en `dtf_answers` ANTES de animar, igual que antes, y /checkout
 * las lee de ahí.
 */

const QuizEngine = dynamic(() => import('@/components/QuizEngine'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[100dvh] items-center justify-center bg-papel text-[15px] text-gris">
      Cargando el test…
    </div>
  ),
});

export default function TestPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const code = useRef('');

  const handleComplete = useCallback((answers: Answers) => {
    // Persistir ANTES del overlay y de cualquier red: storage + memoria + código
    // para el hash de la URL. Así el resultado sobrevive aunque el storage falle.
    code.current = persistAnswers(answers);
    setIsProcessing(true);
  }, []);

  const handleProcessingComplete = useCallback(() => {
    // El borrador ya no hace falta: el test terminado vive en `dtf_answers` y en el hash.
    clearProgress();
    router.push(code.current ? `/checkout#r=${code.current}` : '/checkout');
  }, [router]);

  return (
    <>
      <QuizEngine onComplete={handleComplete} />
      <AnimatePresence>
        {isProcessing && <ProcessingOverlay onComplete={handleProcessingComplete} />}
      </AnimatePresence>
    </>
  );
}
