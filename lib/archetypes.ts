import { CognitiveStyle } from "./questions";

/**
 * Clasificación de perfiles cognitivos.
 *
 * Registro deliberadamente analítico: cada arquetipo describe un MECANISMO de
 * procesamiento y su coste asociado, no un halago. Un perfil que solo enumera
 * fortalezas no es información — es horóscopo. El valor de este reporte está en
 * el campo `tradeoff`: lo que el usuario paga por operar así.
 */

export interface Archetype {
    name: string;
    title: string;
    /** Mecanismo: cómo procesa este perfil, en términos observables. */
    description: string;
    primaryStyles: CognitiveStyle[]; // La combinación que lo activa
    /** Término operativo que resume la función dominante. */
    powerWord: string;
    /** El registro residual del perfil. */
    shadow: CognitiveStyle;
    /** El coste de operar con este mecanismo. Frío y concreto. */
    tradeoff: string;
}

export const archetypes: Archetype[] = [
    {
        name: "El Arquitecto de Sistemas",
        title: "El Arquitecto de Sistemas",
        description:
            "Procesas convirtiendo problemas en estructuras. Antes de actuar, modelas: identificas componentes, dependencias y puntos de ruptura. Tu ventaja aparece en problemas de alta complejidad y horizonte largo, donde el coste de una mala arquitectura se paga durante años.",
        primaryStyles: ["Sistémico", "Abstracto", "Analítico"],
        powerWord: "Estructura",
        shadow: "Emocional",
        tradeoff:
            "Sobreindexas el diseño. Tiendes a seguir modelando cuando el dato que falta solo aparece al ejecutar, y subestimas sistemáticamente la variable humana dentro de tus propios sistemas.",
    },
    {
        name: "El Divergente",
        title: "El Divergente",
        description:
            "Generas opciones donde otros ven un camino único. Tu procesamiento es asociativo: saltas entre dominios no relacionados y recombinas. Alta tolerancia a la ambigüedad y al riesgo de estar equivocado en público.",
        primaryStyles: ["Creativo", "Intuitivo", "Conceptual"],
        powerWord: "Divergencia",
        shadow: "Detallista",
        tradeoff:
            "Baja tasa de cierre. Produces más opciones de las que conviertes, y el error de ejecución te alcanza en la fase final — la que exige precisión repetitiva y no genera estímulo nuevo.",
    },
    {
        name: "El Analista Crítico",
        title: "El Analista Crítico",
        description:
            "Operas por descarte. Tu primer movimiento ante una propuesta es buscar el fallo, no el mérito, y eso te hace caro de engañar. Decides con evidencia y toleras mal los argumentos de autoridad.",
        primaryStyles: ["Analítico", "Crítico", "Sistémico"],
        powerWord: "Discriminación",
        shadow: "Intuitivo",
        tradeoff:
            "Coste de oportunidad alto. Exiges un nivel de evidencia que muchas decisiones reales no permiten reunir a tiempo, y descartas opciones viables por no poder verificarlas.",
    },
    {
        name: "El Lector de Personas",
        title: "El Lector de Personas",
        description:
            "Tu canal primario de información es el estado de los demás. Detectas desalineación en un equipo antes de que se verbalice y ajustas tu conducta en consecuencia. Es una capacidad de lectura, no una disposición amable.",
        primaryStyles: ["Emocional", "Colaborativo", "Intuitivo"],
        powerWord: "Calibración social",
        shadow: "Analítico",
        tradeoff:
            "Asimetría en la toma de decisiones: pesas el coste humano por encima del dato, incluso cuando el dato es inequívoco. Y la lectura constante del otro tiene un precio de desgaste que no sueles contabilizar.",
    },
    {
        name: "El Operador",
        title: "El Operador",
        description:
            "Conviertes intención en resultado con pérdida mínima. Tu procesamiento está optimizado para la ejecución: priorizas por impacto, cierras ciclos y toleras la repetición sin caída de rendimiento.",
        primaryStyles: ["Práctico", "Detallista", "Sistémico"],
        powerWord: "Ejecución",
        shadow: "Abstracto",
        tradeoff:
            "Sesgo de acción. Empiezas a ejecutar antes de cuestionar si el objetivo es el correcto, y eso convierte un error de planteamiento en trabajo perfectamente hecho sobre el problema equivocado.",
    },
    {
        name: "El Teórico",
        title: "El Teórico",
        description:
            "Buscas el principio que explica el caso, no el caso. Operas con horizontes largos y tolerancia alta a problemas sin solución inmediata. Tu ventaja está en los dominios donde el marco conceptual vale más que la respuesta rápida.",
        primaryStyles: ["Reflexivo", "Abstracto", "Conceptual"],
        powerWord: "Abstracción",
        shadow: "Práctico",
        tradeoff:
            "Latencia alta. Tu profundidad se paga en tiempo, y hay contextos — operación, crisis, venta — donde una respuesta correcta tarde equivale a una respuesta incorrecta.",
    },
    {
        name: "El Auditor",
        title: "El Auditor",
        description:
            "Detectas la desviación. Tu procesamiento es de verificación: comparas lo declarado contra lo real y localizas la discrepancia. En entornos donde un error pequeño se propaga, esta capacidad es el control de calidad del sistema.",
        primaryStyles: ["Detallista", "Práctico", "Analítico"],
        powerWord: "Verificación",
        shadow: "Intuitivo",
        tradeoff:
            "Resolución excesiva para el problema medio. Aplicas el mismo nivel de escrutinio a lo crítico y a lo trivial, lo que consume capacidad y genera fricción en equipos que operan con tolerancias más amplias.",
    },
    {
        name: "El Catalizador",
        title: "El Catalizador",
        description:
            "Mueves a otros hacia una dirección. Tu procesamiento combina lectura social con generación de opciones: detectas qué motiva a cada persona y construyes el marco que la alinea. Funcionas por influencia, no por autoridad formal.",
        primaryStyles: ["Colaborativo", "Intuitivo", "Creativo"],
        powerWord: "Movilización",
        shadow: "Detallista",
        tradeoff:
            "Dependencia del contexto social. Tu rendimiento cae en trabajo aislado y sin interlocutor, y tiendes a delegar el detalle en gente que asumes que lo cubrirá — sin verificarlo.",
    },
];

/**
 * Asigna el arquetipo por solapamiento con los 3 registros dominantes.
 *
 * Recibe los estilos YA ORDENADOS (el dominante primero), no los puntajes. El
 * orden correcto es por intensidad —% sobre el techo de cada registro—, y ese
 * cálculo vive en engine.ts. Ordenar aquí por puntaje bruto sesgaba el arquetipo
 * hacia los estilos con más techo (Práctico, Colaborativo, Creativo, Analítico)
 * por un artefacto de la matriz de preguntas, no por el perfil del usuario.
 *
 * El desempate importa: con dos arquetipos empatados a 2 coincidencias, gana el
 * que coincide con el registro MÁS dominante. Sin esta regla, el resultado
 * dependía del orden de declaración del array — es decir, del azar.
 */
export function determineArchetype(rankedStyles: CognitiveStyle[]): Archetype {
    const top3 = rankedStyles.slice(0, 3);

    let bestMatch = archetypes[0];
    let bestScore = -1;

    for (const arch of archetypes) {
        const overlap = arch.primaryStyles.filter((s) => top3.includes(s)).length;

        // Peso por posición: coincidir con el estilo #1 vale más que con el #3.
        const positional = arch.primaryStyles.reduce((sum, style) => {
            const rank = top3.indexOf(style);
            return rank === -1 ? sum : sum + (3 - rank);
        }, 0);

        const score = overlap * 10 + positional;

        if (score > bestScore) {
            bestScore = score;
            bestMatch = arch;
        }
    }

    return bestMatch;
}
