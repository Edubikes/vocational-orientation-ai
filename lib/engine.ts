/**
 * Motor vocacional. Puerto directo de la lógica de `cuestionario.py`.
 *
 * Única fuente de verdad del scoring: el test, el teaser del muro de pago y el
 * payload que se guarda en Firebase consumen ESTA función. Si el cálculo vive en
 * un solo lugar, el PDF que recibe el cliente nunca contradice lo que vio en pantalla.
 */

import { questions, type CognitiveStyle } from './questions';
import { careers, type Career } from './careers';
import { careerDetails, type CareerDetail } from './data_universities';
import { determineArchetype, type Archetype } from './archetypes';

export const ALL_STYLES: CognitiveStyle[] = [
  'Analítico', 'Creativo', 'Práctico', 'Detallista',
  'Abstracto', 'Crítico', 'Colaborativo', 'Sistémico',
  'Intuitivo', 'Conceptual', 'Emocional', 'Reflexivo',
];

export type Answers = Record<number, string>;

export interface StyleReading {
  style: CognitiveStyle;
  /** Puntos crudos acumulados. */
  score: number;
  /** 0-100 sobre el techo teórico de ese estilo. Es la cifra comparable. */
  intensity: number;
}

export type Profile = Record<CognitiveStyle, number>;

export interface CareerMatch {
  career: Career;
  score: number;
  /** Afinidad normalizada 0-100 contra el mejor match. Es lo que ve el usuario. */
  affinity: number;
  details?: CareerDetail;
}

function emptyProfile(): Profile {
  return ALL_STYLES.reduce((acc, style) => {
    acc[style] = 0;
    return acc;
  }, {} as Profile);
}

/** Suma los pesos de cada opción elegida. Equivale a `matriz_puntaje` en Python. */
export function computeProfile(answers: Answers): Profile {
  const profile = emptyProfile();

  for (const question of questions) {
    const answerId = answers[question.id];
    if (!answerId) continue;

    const option = question.options.find((opt) => opt.id === answerId);
    if (!option?.scores) continue;

    for (const [style, points] of Object.entries(option.scores)) {
      profile[style as CognitiveStyle] += points ?? 0;
    }
  }

  return profile;
}

/**
 * Ordena carreras por compatibilidad.
 *
 * El exponente 1.2 premia los PICOS del perfil sobre los promedios: alguien muy
 * Analítico y nada Emocional obtiene recomendaciones más nítidas que alguien plano.
 * Un producto que recomienda lo mismo a todos no se percibe como personalizado.
 */
export function rankCareers(profile: Profile, limit = 8): CareerMatch[] {
  const scored = careers.map((career) => {
    let score = 0;

    for (const [style, weight] of Object.entries(career.weights)) {
      // Intensidad, no puntaje bruto. Con puntaje bruto, toda carrera cuyos
      // pesos apunten a estilos de techo alto (Práctico 143, Colaborativo 120)
      // ganaba ventaja sobre las que dependen de techos bajos (Crítico 28) —
      // en TODOS los usuarios por igual. Era un sesgo del instrumento colado
      // en la recomendación principal del producto.
      const intensity = styleIntensity(style as CognitiveStyle, profile[style as CognitiveStyle]);
      if (intensity) score += Math.pow(intensity, 1.2) * weight;
    }

    const details =
      careerDetails.find((d) => d.id === career.name || d.name === career.name) ??
      careerDetails.find((d) => career.name.includes(d.name) || d.name.includes(career.name));

    return { career, score, details, affinity: 0 };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0]?.score || 1;
  return scored.slice(0, limit).map((match) => ({
    ...match,
    affinity: Math.round((match.score / best) * 100),
  }));
}

/**
 * Estilos ordenados por INTENSIDAD, no por puntaje bruto. `[0]` es el registro
 * dominante y el último, el residual.
 *
 * Ordenar por puntaje bruto estaba mal y distorsionaba el producto entero:
 * los techos de la matriz son muy desiguales (Práctico llega a 143 puntos,
 * Crítico solo a 28), así que los estilos con más preguntas asociadas salían
 * arriba por diseño de la prueba, no por el perfil de quien la contesta.
 *
 * Caso real: con 58 pts de Práctico y 33 de Detallista, el orden bruto daba una
 * diferencia enorme; en intensidad son 41% y 42% — y el orden se invierte.
 */
export function rankStyles(profile: Profile): StyleReading[] {
  return (Object.entries(profile) as [CognitiveStyle, number][])
    .map(([style, score]) => ({ style, score, intensity: styleIntensity(style, score) }))
    .sort((a, b) => b.intensity - a.intensity);
}

export interface AnalysisResult {
  profile: Profile;
  archetype: Archetype;
  styles: StyleReading[];
  matches: CareerMatch[];
  metrics: ProfileMetrics;
}

/** Un solo paso: respuestas crudas → análisis completo. */
export function analyze(answers: Answers): AnalysisResult {
  const profile = computeProfile(answers);
  const matches = rankCareers(profile);
  const styles = rankStyles(profile);

  return {
    profile,
    archetype: determineArchetype(styles.map((s) => s.style)),
    styles,
    matches,
    metrics: computeMetrics(styles, matches),
  };
}

/* ================================================================== *
 * MÉTRICAS DURAS
 *
 * Todo lo que sigue es computable y verificable. No hay percentiles
 * poblacionales: para decir "estás en el percentil 87" haría falta una
 * muestra normativa de miles de tests reales, y no la tenemos. Inventarla
 * sería fabricar un dato clínico, que es exactamente lo que este reporte
 * no debe hacer.
 *
 * Lo que sí es exacto: el máximo teórico de cada estilo, calculado sumando
 * los puntos máximos que ese estilo puede recibir en cada una de las 60
 * preguntas. Contra ese techo, la intensidad es un porcentaje real.
 * ================================================================== */

/**
 * Techo alcanzable por estilo. Se deriva de la propia matriz de preguntas,
 * así que si algún día cambias los pesos, esto se recalcula solo.
 */
export const STYLE_MAX: Record<CognitiveStyle, number> = (() => {
  const max = ALL_STYLES.reduce((acc, style) => {
    acc[style] = 0;
    return acc;
  }, {} as Record<CognitiveStyle, number>);

  for (const question of questions) {
    for (const style of ALL_STYLES) {
      // Mejor opción posible para este estilo en esta pregunta.
      const best = question.options.reduce(
        (top, option) => Math.max(top, option.scores?.[style] ?? 0),
        0,
      );
      max[style] += best;
    }
  }

  return max;
})();

/** Intensidad 0-100: puntaje obtenido sobre el techo teórico de ese estilo. */
export function styleIntensity(style: CognitiveStyle, score: number): number {
  const ceiling = STYLE_MAX[style];
  if (!ceiling) return 0;
  return Math.round((score / ceiling) * 100);
}

export interface ProfileMetrics {
  /** % del puntaje total acumulado en los 3 estilos dominantes. */
  concentracion: number;
  /** Estilos con intensidad ≥ 40%: cuántos registros operativos tienes activos. */
  amplitud: number;
  /** Puntos porcentuales entre el estilo dominante y el anti-estilo. */
  asimetria: number;
  /** Intensidad del estilo dominante, sobre su propio techo. */
  intensidadDominante: number;
  /** Distancia en afinidad entre la 1.ª y la 2.ª carrera. */
  separacionTop: number;
  /** Lectura clínica derivada de los números anteriores. */
  lectura: {
    concentracion: string;
    amplitud: string;
    asimetria: string;
    separacionTop: string;
  };
}

const AMPLITUD_UMBRAL = 40;

export function computeMetrics(
  styles: StyleReading[],
  matches: CareerMatch[],
): ProfileMetrics {
  // Todas las métricas se calculan sobre intensidad. Mezclar intensidad y
  // puntaje bruto daría índices que no se corresponden con el orden mostrado.
  const intensidades = styles.map((item) => item.intensity);
  const total = intensidades.reduce((sum, value) => sum + value, 0) || 1;

  const concentracion = Math.round(
    (intensidades.slice(0, 3).reduce((sum, value) => sum + value, 0) / total) * 100,
  );

  const amplitud = intensidades.filter((value) => value >= AMPLITUD_UMBRAL).length;

  const intensidadDominante = intensidades[0] ?? 0;
  const asimetria = intensidadDominante - (intensidades[intensidades.length - 1] ?? 0);

  const separacionTop =
    matches.length >= 2 ? matches[0].affinity - matches[1].affinity : 0;

  return {
    concentracion,
    amplitud,
    asimetria,
    intensidadDominante,
    separacionTop,
    lectura: {
      concentracion:
        concentracion >= 55
          ? `Perfil especializado. El ${concentracion}% de tu puntaje se acumula en 3 de 12 registros. Rindes por encima de la media en entornos que premian profundidad; pierdes ventaja en roles que exigen rotar de función cada semana.`
          : concentracion >= 40
            ? `Perfil mixto. El ${concentracion}% de tu puntaje se reparte entre 3 registros dominantes, con una base secundaria activa. Tolera bien los puestos híbridos.`
            : `Perfil distribuido. Ningún grupo de registros concentra tu puntaje (${concentracion}% en el top 3). Versatilidad alta, ventaja comparativa baja en tareas de especialista.`,

      amplitud:
        amplitud >= 7
          ? `${amplitud} de 12 registros operan por encima del ${AMPLITUD_UMBRAL}% de su techo. Alta polivalencia: puedes sostener funciones distintas sin caída de rendimiento.`
          : amplitud >= 4
            ? `${amplitud} de 12 registros superan el ${AMPLITUD_UMBRAL}% de su techo. Rango funcional estándar.`
            : `Solo ${amplitud} de 12 registros superan el ${AMPLITUD_UMBRAL}% de su techo. Rango estrecho y marcado: alta eficiencia dentro de tu zona, coste de adaptación elevado fuera de ella.`,

      asimetria:
        asimetria >= 50
          ? `Asimetría severa: ${asimetria} puntos porcentuales entre tu registro dominante y el residual. Tus decisiones estarán sistemáticamente sesgadas hacia un mismo criterio. Es una ventaja mientras el contexto lo premie, y un punto ciego cuando no.`
          : asimetria >= 25
            ? `Asimetría moderada: ${asimetria} puntos porcentuales de separación. Tienes un criterio preferente identificable sin que anule a los demás.`
            : `Asimetría baja: ${asimetria} puntos porcentuales. Procesas con criterios equilibrados; la contrapartida es que tardas más en resolver decisiones bajo presión.`,

      separacionTop:
        separacionTop <= 4
          ? `Empate técnico en el primer lugar (${separacionTop} puntos de diferencia). El algoritmo no discrimina entre tus dos primeras rutas: la decisión depende de variables que este test no mide — costo, ubicación, red de contactos.`
          : separacionTop <= 12
            ? `Ventaja moderada de la primera ruta (${separacionTop} puntos). Tu segunda opción sigue siendo estadísticamente viable.`
            : `Ventaja decisiva de la primera ruta (${separacionTop} puntos sobre la segunda). La separación es lo bastante amplia como para tratarla como recomendación única.`,
    },
  };
}
