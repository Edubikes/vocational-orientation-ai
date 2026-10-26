import { careers, type Career } from './careers';
import { careerDetails, type CareerDetail } from './data_universities';
import { questions, type CognitiveStyle } from './questions';

export const EMPTY_SCORES: Record<CognitiveStyle, number> = {
    'Analítico': 0,
    'Creativo': 0,
    'Práctico': 0,
    'Detallista': 0,
    'Abstracto': 0,
    'Crítico': 0,
    'Colaborativo': 0,
    'Sistémico': 0,
    'Intuitivo': 0,
    'Conceptual': 0,
    'Emocional': 0,
    'Reflexivo': 0,
};

/** Same loop the quiz has always used. Partial answers score as zero. */
export function scoreAnswers(answers: Record<number, string>): Record<CognitiveStyle, number> {
    const finalScores: Record<CognitiveStyle, number> = { ...EMPTY_SCORES };

    questions.forEach((q) => {
        const answerId = answers[q.id];
        const selectedOption = q.options.find((opt) => opt.id === answerId);
        if (selectedOption?.scores) {
            Object.entries(selectedOption.scores).forEach(([style, points]) => {
                finalScores[style as CognitiveStyle] += points || 0;
            });
        }
    });

    return finalScores;
}

export type RankedCareer = {
    career: Career;
    score: number;
    details?: CareerDetail;
};

/** Same ranking the results page used inline, including the fuzzy detail match. */
export function rankCareers(parsedScores: Record<CognitiveStyle, number>): RankedCareer[] {
    const matches = careers.map((career) => {
        let score = 0;
        Object.entries(career.weights).forEach(([style, weight]) => {
            if (parsedScores[style as CognitiveStyle]) {
                score += Math.pow(parsedScores[style as CognitiveStyle], 1.2) * weight;
            }
        });

        const details = careerDetails.find((d) => d.name === career.name || d.id === career.name);
        const fuzzyDetails = careerDetails.find((d) => career.name.includes(d.name) || d.name.includes(career.name));

        return { career, score, details: details || fuzzyDetails };
    });

    matches.sort((a, b) => b.score - a.score);
    return matches;
}

export function affinity(score: number, top: number): number | null {
    if (!top || top <= 0) return null;
    return Math.round((score / top) * 100);
}
