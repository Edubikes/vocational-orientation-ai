/**
 * Progreso del test en localStorage.
 *
 * Distinto de `dtf_answers` (lib/lead.ts): esa clave solo se escribe al terminar
 * las 60 preguntas y es la que lee el muro de pago. Si escribiéramos ahí en cada
 * respuesta, /checkout aceptaría un test a medias. Aquí guardamos el borrador.
 */

import { questions } from './questions';
import type { Answers } from './engine';

const PROGRESS_KEY = 'dtf_progress_v1';

export interface QuizProgress {
  answers: Answers;
  index: number;
}

const EMPTY: QuizProgress = { answers: {}, index: 0 };

/** Lee y valida el borrador. Cualquier dato que no encaje con el banco actual se descarta. */
export function loadProgress(): QuizProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<QuizProgress>;

    const answers: Answers = {};
    const source = parsed.answers ?? {};
    for (const question of questions) {
      const value = (source as Record<string, unknown>)[String(question.id)];
      if (typeof value === 'string' && question.options.some((o) => o.id === value)) {
        answers[question.id] = value;
      }
    }

    const rawIndex = typeof parsed.index === 'number' ? Math.floor(parsed.index) : 0;
    const index = Math.min(Math.max(rawIndex, 0), questions.length - 1);
    return { answers, index };
  } catch {
    return EMPTY;
  }
}

export function saveProgress(progress: QuizProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Modo privado o storage lleno: el test sigue funcionando en memoria.
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // noop
  }
}
