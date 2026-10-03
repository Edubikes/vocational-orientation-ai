'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { questions } from '@/lib/questions';
import type { Answers } from '@/lib/engine';
import { loadProgress, saveProgress } from '@/lib/progress';
import { partialReadout, type PartialReadout } from '@/lib/checkpoint';
import { loadAnswers, loadName, saveName } from '@/lib/lead';
import { track, trackCustom } from '@/lib/pixel';
import { ALL_STYLES } from '@/lib/engine';

/**
 * Motor del test — v3, papel claro, mobile-first.
 *
 * - Una pregunta por pantalla, alto fijo (100dvh): el body nunca hace scroll.
 * - Selección = avance. 140 ms de acuse visual y transición de 120 ms.
 * - Teclado: A–E o 1–5 eligen, ← / Retroceso vuelven.
 * - Checkpoints tras las preguntas 15, 30 y 45 con lectura parcial REAL. En v3
 *   el usuario los cierra con un botón (antes: 1.8 s automáticos); en el 2.º se
 *   pide el nombre opcional para la portada del PDF.
 * - Intro de una pantalla antes de la pregunta 1 (dispara ViewContent).
 * - El borrador vive en localStorage (lib/progress.ts): recargar no pierde nada.
 *
 * Se monta solo en cliente (ver app/test/page.tsx), por eso puede leer
 * localStorage en el estado inicial sin desajustes de hidratación.
 */

const ACK_DELAY_MS = 140;
const TRANSITION_S = 0.12;
/** Número de preguntas respondidas tras el cual se muestra un checkpoint. */
const CHECKPOINTS = [15, 30, 45] as const;
const KEYS = 'abcde';

interface QuizEngineProps {
  /** Se llama una sola vez con las 60 respuestas. */
  onComplete: (answers: Answers) => void;
}

interface CheckpointState {
  block: number;
  /** Índice de la pregunta a la que se vuelve al cerrar el checkpoint. */
  next: number;
  readout: PartialReadout;
  previousLeader: string | null;
}

export default function QuizEngine({ onComplete }: QuizEngineProps) {
  const total = questions.length;
  const reduceMotion = useReducedMotion();
  const [initial] = useState(loadProgress);
  const [index, setIndex] = useState(initial.index);
  const [answers, setAnswers] = useState<Answers>(initial.answers);
  const [pending, setPending] = useState<string | null>(null);
  const [, setDirection] = useState<1 | -1>(1);
  const [checkpoint, setCheckpoint] = useState<CheckpointState | null>(null);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(() => Object.keys(initial.answers).length > 0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const question = questions[index];
  const answeredCount = useMemo(
    () => questions.filter((q) => answers[q.id] !== undefined).length,
    [answers],
  );

  // Persistir borrador en cada cambio.
  useEffect(() => {
    if (!done) saveProgress({ answers, index });
  }, [answers, index, done]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const goTo = useCallback((next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (pending || checkpoint || done || !started) return;

      const nextAnswers = { ...answers, [question.id]: optionId };
      try {
        navigator.vibrate?.(10);
      } catch {
        // iOS no soporta vibrate; no pasa nada.
      }
      setPending(optionId);
      setAnswers(nextAnswers);

      later(() => {
        setPending(null);

        if (index === total - 1) {
          const complete = questions.every((q) => nextAnswers[q.id] !== undefined);
          if (complete) {
            setDone(true);
            onComplete(nextAnswers);
            return;
          }
          // Algún hueco (p. ej. borrador antiguo): saltar a la primera sin responder.
          const firstGap = questions.findIndex((q) => nextAnswers[q.id] === undefined);
          goTo(firstGap, -1);
          return;
        }

        const position = index + 1;
        const cpIndex = CHECKPOINTS.indexOf(position as (typeof CHECKPOINTS)[number]);
        // Checkpoint solo al avanzar por primera vez por ese punto (no al re-responder).
        const firstPass = questions.slice(position).every((q) => answers[q.id] === undefined);

        if (cpIndex >= 0 && firstPass) {
          const previous = cpIndex > 0 ? partialReadout(nextAnswers, CHECKPOINTS[cpIndex - 1]) : null;
          setCheckpoint({
            block: cpIndex + 1,
            next: position,
            readout: partialReadout(nextAnswers, position),
            previousLeader: previous?.ranking[0]?.style ?? null,
          });
          trackCustom('QuizCheckpoint', { block: cpIndex + 1, answered: position });
          return;
        }

        goTo(position, 1);
      }, ACK_DELAY_MS);
    },
    [answers, checkpoint, done, goTo, index, later, onComplete, pending, question.id, started, total],
  );

  const handleBack = useCallback(() => {
    if (index === 0 || pending || checkpoint || done) return;
    goTo(index - 1, -1);
  }, [checkpoint, done, goTo, index, pending]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
        event.preventDefault();
        handleBack();
        return;
      }

      const key = event.key.toLowerCase();
      let position = KEYS.indexOf(key);
      if (position < 0 && /^[1-9]$/.test(key)) position = Number(key) - 1;
      if (position >= 0 && position < question.options.length) {
        event.preventDefault();
        handleSelect(question.options[position].id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleBack, handleSelect, question.options]);

  const duration = reduceMotion ? 0 : TRANSITION_S;
  const keyRange = `A–${KEYS[question.options.length - 1].toUpperCase()}`;
  const totalBlocks = Math.ceil(total / 15);

  const closeCheckpoint = useCallback(() => {
    if (!checkpoint) return;
    const next = checkpoint.next;
    setCheckpoint(null);
    goTo(next, 1);
  }, [checkpoint, goTo]);

  const start = useCallback(() => {
    setStarted(true);
    track('ViewContent', { content_name: 'test_inicio' });
  }, []);

  if (!started) return <IntroScreen onStart={start} total={total} />;

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-papel text-tinta">
      {/* Cabecera: atrás + contador */}
      <header className="shrink-0 px-4 pt-2 sm:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={index === 0 || !!checkpoint}
            className="-ml-2 flex min-h-11 items-center gap-1.5 px-2 text-[15px] text-gris transition-colors enabled:hover:text-tinta disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Atrás
          </button>
          <span className="text-[14px] tabular-nums text-gris" aria-label={`Pregunta ${index + 1} de ${total}`}>
            Pregunta <span className="font-semibold text-tinta">{index + 1}</span> de {total}
          </span>
        </div>
        {/* Progreso en 4 bloques; arranca con un tramo dotado (el intro cuenta) */}
        <div
          className="mx-auto mt-1 grid max-w-2xl grid-cols-4 gap-1.5"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answeredCount}
          aria-label="Progreso del test"
        >
          {Array.from({ length: totalBlocks }, (_, b) => {
            const from = b * 15;
            const filled = Math.min(Math.max(answeredCount - from, 0), 15);
            const pct = b === 0 ? Math.max((filled / 15) * 100, 8) : (filled / 15) * 100;
            return (
              <div key={b} className="h-1.5 bg-linea">
                <div className="h-full bg-tinta transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }} />
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-1.5 max-w-2xl text-[12px] text-gris-2">
          Bloque {Math.min(Math.floor(index / 15) + 1, totalBlocks)} de {totalBlocks}
        </p>
      </header>

      <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          {checkpoint ? (
            <CheckpointScreen key={`cp-${checkpoint.block}`} state={checkpoint} duration={duration} onContinue={closeCheckpoint} />
          ) : (
            <motion.section
              key={question.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: duration / 2 } }}
              transition={{ duration, ease: 'linear' }}
              className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-5 pt-4 sm:px-8 sm:pt-10"
            >
              {question.context && (
                <p className="mb-2 font-serif text-[16px] italic leading-snug text-gris sm:text-lg">{question.context}</p>
              )}
              <h1 className="text-pretty font-serif text-[25px] font-semibold leading-[1.16] tracking-[-0.01em] sm:text-[34px]">
                {question.text}
              </h1>

              <div className="mt-auto flex flex-col gap-2 pt-6" role="radiogroup" aria-label={question.text}>
                {question.options.map((option, position) => {
                  const active = pending ? pending === option.id : answers[question.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => handleSelect(option.id)}
                      className={`group flex min-h-14 w-full items-center gap-3 border px-3 py-3 text-left transition-colors duration-100 ${
                        active ? 'border-tinta bg-tinta text-papel' : 'border-linea bg-white/70 text-tinta hover:border-tinta'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold ${
                          active ? 'border-papel/50 text-papel' : 'border-linea text-gris group-hover:border-tinta group-hover:text-tinta'
                        }`}
                        aria-hidden="true"
                      >
                        {KEYS[position].toUpperCase()}
                      </span>
                      <span className="flex-1 text-[16px] leading-snug">{option.text}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 hidden text-center text-[12px] text-gris-2 md:block">
                Teclas {keyRange} o 1–{question.options.length} para responder · Retroceso para volver
              </p>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function IntroScreen({ onStart, total }: { onStart: () => void; total: number }) {
  // Si ya terminó antes (resultado guardado), no lo obligamos a repetir el test.
  const [hasResult] = useState(() => {
    const prev = loadAnswers();
    return !!prev && Object.keys(prev).length >= total;
  });
  return (
    <div className="flex min-h-[100dvh] flex-col bg-papel text-tinta">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 pb-6 pt-10 sm:pt-16">
        <p className="text-[14px] font-medium text-gris">Antes de empezar</p>
        <h1 className="mt-2 text-balance font-serif text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl">
          No hay respuestas buenas. Contesta lo que <em className="font-normal">harías</em>, no lo que se ve bien.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-tinta/85">
          Son {total} preguntas en 4 bloques (≈8 minutos). Cada 15 te enseñamos cómo vas. Al final vas a ver cómo sales en estas{' '}
          {ALL_STYLES.length} dimensiones:
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {ALL_STYLES.map((s) => (
            <li key={s} className="border border-linea bg-white/70 px-2.5 py-1 text-[14px]">
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[15px] text-gris">Tu arquetipo es gratis. Tu avance se guarda en este teléfono.</p>
        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={onStart}
            className="flex h-14 w-full items-center justify-between bg-accion px-5 text-[17px] font-semibold text-white hover:bg-accion-2"
          >
            Va, empezar
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          {hasResult && (
            <a
              href="/checkout"
              className="mt-3 flex h-14 w-full items-center justify-center border border-tinta text-[16px] font-semibold text-tinta"
            >
              Ya lo terminé: ver mi resultado
            </a>
          )}
        </div>
      </main>
    </div>
  );
}

const CP_COPY = (state: CheckpointState): { title: string; body: string } => {
  const { block, readout, previousLeader } = state;
  const leader = readout.ranking[0]?.style ?? '—';
  const faltan = 12 - readout.stylesCovered;
  if (block === 1)
    return {
      title: `Primer patrón: ${leader} va arriba.`,
      body: faltan > 0 ? `Todavía faltan ${faltan} dimensiones por medir.` : 'Ya hay datos de las 12 dimensiones.',
    };
  if (block === 2)
    return {
      title: 'Vas a la mitad.',
      body:
        previousLeader && previousLeader !== leader
          ? `${leader} le quitó el primer lugar a ${previousLeader}. Tu arquetipo empieza a definirse.`
          : `${leader} se mantiene arriba. Tu arquetipo empieza a definirse.`,
    };
  return { title: 'Faltan 15.', body: 'Tu arquetipo ya tiene forma; las últimas preguntas deciden tu ruta #1.' };
};

function CheckpointScreen({
  state,
  duration,
  onContinue,
}: {
  state: CheckpointState;
  duration: number;
  onContinue: () => void;
}) {
  const top = state.readout.ranking.slice(0, 3);
  const copy = CP_COPY(state);
  const [nombre, setNombre] = useState(() => (state.block === 2 ? loadName() : ''));

  const handleContinue = () => {
    if (state.block === 2) saveName(nombre);
    onContinue();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: duration / 2 } }}
      transition={{ duration: Math.min(duration * 2, 0.3) }}
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-5 pt-6 sm:px-8"
      role="status"
      aria-live="polite"
    >
      <p className="text-[14px] font-medium text-gris">Así vas · {state.readout.answered} de 60</p>
      <h2 className="mt-2 font-serif text-[1.9rem] font-semibold leading-[1.1]">{copy.title}</h2>
      <p className="mt-2 text-[17px] leading-relaxed text-tinta/85">{copy.body}</p>

      <div className="mt-6 border border-linea bg-white/70 p-4">
        <p className="text-[13px] text-gris">Lectura parcial · % del máximo posible hasta aquí</p>
        <ul className="mt-3 space-y-3">
          {top.map((item, i) => (
            <li key={item.style}>
              <div className="flex items-baseline justify-between text-[15px]">
                <span className={i === 0 ? 'font-semibold' : ''}>{item.style}</span>
                <span className="tabular-nums">{item.intensity}%</span>
              </div>
              <div className="mt-1 h-2 bg-papel-2">
                <div className={`h-full ${i === 0 ? 'bg-rojo' : 'bg-tinta/70'}`} style={{ width: `${Math.max(item.intensity, 2)}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] text-gris-2">Provisional: puede cambiar con los bloques que faltan.</p>
      </div>

      {state.block === 2 && (
        <div className="mt-5">
          <label htmlFor="nombre" className="text-[15px] font-medium">
            ¿Cómo te llamas? <span className="font-normal text-gris">(opcional, va en la portada de tu reporte)</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="given-name"
            maxLength={60}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleContinue();
            }}
            placeholder="Tu nombre"
            className="mt-2 h-14 w-full border border-linea bg-white px-4 text-[17px] outline-none placeholder:text-gris-2 focus:border-tinta"
          />
        </div>
      )}

      <p className="mt-5 text-[14px] text-gris">Si cierras, tu avance se queda guardado en este teléfono.</p>
      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={handleContinue}
          className="flex h-14 w-full items-center justify-between bg-tinta px-5 text-[17px] font-semibold text-papel"
        >
          Seguir con el bloque {state.block + 1}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  );
}
