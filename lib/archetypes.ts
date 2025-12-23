import { CognitiveStyle } from "./questions";

export interface Archetype {
    name: string;
    title: string;
    description: string;
    primaryStyles: CognitiveStyle[]; // The combination that triggers this
    powerWord: string;
    shadow: string; // The "Anti-Style" or weakness
}

export const archetypes: Archetype[] = [
    {
        name: "El Arquitecto Visionario",
        title: "El Arquitecto Visionario",
        description: "Tienes la capacidad única de ver sistemas complejos y diseñarlos desde cero. Tu mente une la lógica abstracta con la ejecución práctica. Eres quien construye el futuro.",
        primaryStyles: ["Sistémico", "Abstracto", "Analítico"],
        powerWord: "Estructura",
        shadow: "Emocional"
    },
    {
        name: "El Innovador Disruptivo",
        title: "El Innovador Disruptivo",
        description: "Rompes moldes por naturaleza. Donde otros ven caos, tú ves oportunidades nuevas. Tu creatividad no es solo artística, es estratégica.",
        primaryStyles: ["Creativo", "Intuitivo", "Conceptual"],
        powerWord: "Invención",
        shadow: "Detallista"
    },
    {
        name: "El Estratega Maestro",
        title: "El Estratega Maestro",
        description: "Ves el tablero completo. Tus decisiones están basadas en un análisis profundo y una lógica impecable. Eres el cerebro detrás de las grandes operaciones.",
        primaryStyles: ["Analítico", "Crítico", "Sistémico"],
        powerWord: "Lógica",
        shadow: "Intuitivo"
    },
    {
        name: "El Humanista Empático",
        title: "El Humanista Empático",
        description: "Tu superpoder es la conexión humana. Entiendes lo que otros sienten antes de que lo digan. Eres el pegamento que mantiene unidos a los equipos y comunidades.",
        primaryStyles: ["Emocional", "Colaborativo", "Intuitivo"],
        powerWord: "Conexión",
        shadow: "Analítico"
    },
    {
        name: "El Ejecutor Imparable",
        title: "El Ejecutor Imparable",
        description: "Mientras otros planean, tú actúas. Eres pragmático, directo y eficiente. Haces que las cosas sucedan en el mundo real.",
        primaryStyles: ["Práctico", "Detallista", "Sistémico"],
        powerWord: "Acción",
        shadow: "Abstracto"
    },
    {
        name: "El Filósofo Profundo",
        title: "El Filósofo Profundo",
        description: "Buscas la verdad y el significado detrás de todo. Tu mente es un laboratorio de ideas complejas y reflexiones éticas.",
        primaryStyles: ["Reflexivo", "Abstracto", "Conceptual"],
        powerWord: "Verdad",
        shadow: "Práctico"
    },
    {
        name: "El Creador de Detalles",
        title: "El Creador de Detalles",
        description: "La perfección está en los detalles y tú lo sabes. Tu capacidad de observación y precisión es inigualable.",
        primaryStyles: ["Detallista", "Práctico", "Analítico"],
        powerWord: "Precisión",
        shadow: "Intuitivo"
    },
    {
        name: "El Líder Carismático",
        title: "El Líder Carismático",
        description: "Inspiras a los demás a seguirte. Tu energía y visión compartida mueven montañas y equipos.",
        primaryStyles: ["Colaborativo", "Intuitivo", "Creativo"],
        powerWord: "Influencia",
        shadow: "Detallista"
    }
];

export function determineArchetype(scores: Record<CognitiveStyle, number>): Archetype {
    // 1. Get top 3 styles
    const sortedStyles = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .map(([style]) => style as CognitiveStyle);

    const top3 = sortedStyles.slice(0, 3);

    // 2. Find best match
    let bestMatch = archetypes[0];
    let maxOverlap = 0;

    for (const arch of archetypes) {
        // Count how many of the archetype's primary styles are in the user's top 3
        const overlap = arch.primaryStyles.filter(s => top3.includes(s)).length;
        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestMatch = arch;
        }
    }

    return bestMatch;
}
