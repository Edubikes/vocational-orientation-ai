/**
 * Lectura parcial para los checkpoints del test (tras las preguntas 15, 30 y 45).
 *
 * Mismo criterio que engine.ts (intensidad = puntos / techo), pero el techo se
 * calcula SOLO sobre las preguntas ya presentadas. Así la lectura parcial no
 * castiga a los estilos que todavía no han aparecido en el banco, y al llegar
 * a la pregunta 60 coincide exactamente con `rankStyles` del motor.
 *
 * No hay nada inventado: cada cifra sale de las respuestas del usuario.
 */

import { questions, type CognitiveStyle } from './questions';
import { ALL_STYLES, type Answers } from './engine';

export interface PartialStyle {
  style: CognitiveStyle;
  score: number;
  /** Máximo alcanzable en el tramo visto. */
  ceiling: number;
  /** 0-100 sobre el techo alcanzable en las preguntas vistas. */
  intensity: number;
}

export interface PartialReadout {
  /** Preguntas consideradas (prefijo del banco). */
  seen: number;
  /** De esas, cuántas tienen respuesta. */
  answered: number;
  /** Estilos con techo > 0 en el tramo visto, ordenados por intensidad. */
  ranking: PartialStyle[];
  /** Cuántos de los 12 estilos ya han podido puntuar en el tramo visto. */
  stylesCovered: number;
}

export function partialReadout(answers: Answers, seen: number): PartialReadout {
  const slice = questions.slice(0, seen);
  const score = Object.fromEntries(ALL_STYLES.map((s) => [s, 0])) as Record<CognitiveStyle, number>;
  const ceiling = Object.fromEntries(ALL_STYLES.map((s) => [s, 0])) as Record<CognitiveStyle, number>;
  let answered = 0;

  for (const question of slice) {
    for (const style of ALL_STYLES) {
      ceiling[style] += question.options.reduce((top, o) => Math.max(top, o.scores?.[style] ?? 0), 0);
    }
    const option = question.options.find((o) => o.id === answers[question.id]);
    if (!option) continue;
    answered += 1;
    for (const [style, points] of Object.entries(option.scores ?? {})) {
      score[style as CognitiveStyle] += points ?? 0;
    }
  }

  const ranking = ALL_STYLES.filter((style) => ceiling[style] > 0)
    .map((style) => ({
      style,
      score: score[style],
      ceiling: ceiling[style],
      intensity: Math.round((score[style] / ceiling[style]) * 100),
    }))
    .sort((a, b) => b.intensity - a.intensity);

  return { seen, answered, ranking, stylesCovered: ranking.length };
}
