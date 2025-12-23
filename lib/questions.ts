export type CognitiveStyle =
    | 'Analítico'
    | 'Creativo'
    | 'Práctico'
    | 'Detallista'
    | 'Abstracto'
    | 'Crítico'
    | 'Colaborativo'
    | 'Sistémico'
    | 'Intuitivo'
    | 'Conceptual'
    | 'Emocional'
    | 'Reflexivo';

export interface Option {
    id: string;
    text: string;
    scores: Partial<Record<CognitiveStyle, number>>;
}

export interface Question {
    id: number;
    text: string;
    context?: string; // Psychological context/flavor text
    options: Option[];
}

export const questions: Question[] = [
    {
        id: 1,
        context: "Imagina que te encuentras ante un problema complejo sin solución aparente.",
        text: "¿Cuál es tu primera reacción instintiva al abordarlo?",
        options: [
            { id: 'a', text: "Busco inmediatamente una herramienta o método probado para resolverlo.", scores: { Práctico: 3 } },
            { id: 'b', text: "Imagino múltiples escenarios hipotéticos y soluciones novedosas.", scores: { Creativo: 3 } },
            { id: 'c', text: "Descompongo el problema en sus partes más pequeñas y lógicas.", scores: { Analítico: 3, Detallista: 1 } },
            { id: 'd', text: "Confío en mi corazonada sobre por dónde empezar.", scores: { Intuitivo: 3 } },
            { id: 'e', text: "Pregunto a otros cómo lo abordarían ellos.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 2,
        context: "Estás liderando un proyecto y las cosas no salen según lo planeado.",
        text: "¿Qué aspecto te preocupa más?",
        options: [
            { id: 'a', text: "Que no se cumplan los plazos y resultados tangibles.", scores: { Práctico: 3 } },
            { id: 'b', text: "Que el equipo se sienta desmotivado o frustrado.", scores: { Emocional: 3 } },
            { id: 'c', text: "Que la lógica subyacente del plan estuviera equivocada.", scores: { Analítico: 2, Crítico: 2 } },
            { id: 'd', text: "Que perdamos la visión general de lo que queríamos lograr.", scores: { Conceptual: 3 } },
            { id: 'e', text: "Que no estemos trabajando unidos para solucionarlo.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 3,
        context: "Al aprender algo nuevo, ¿qué enfoque prefieres?",
        text: "Selecciona la opción que mejor te describa.",
        options: [
            { id: 'a', text: "Hacerlo con mis propias manos, prueba y error.", scores: { Práctico: 3 } },
            { id: 'b', text: "Entender cómo se conecta con otros sistemas o conocimientos.", scores: { Sistémico: 3 } },
            { id: 'c', text: "Analizar datos, estadísticas y hechos concretos.", scores: { Analítico: 3 } },
            { id: 'd', text: "Dejarme llevar por lo que siento que es correcto en el momento.", scores: { Intuitivo: 3 } },
            { id: 'e', text: "Discutirlo y debatirlo con un grupo de estudio.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 4,
        context: "Tienes que organizar un evento importante.",
        text: "¿En qué te enfocas principalmente?",
        options: [
            { id: 'a', text: "En que todo funcione logísticamente sin fallos.", scores: { Práctico: 3 } },
            { id: 'b', text: "En que la experiencia sea única, original y memorable.", scores: { Creativo: 3 } },
            { id: 'c', text: "En el presupuesto y la optimización de recursos.", scores: { Analítico: 3 } },
            { id: 'd', text: "En qué simboliza este evento para los asistentes.", scores: { Abstracto: 3 } },
            { id: 'e', text: "En que todos los involucrados se sientan parte del equipo.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 5,
        context: "Te piden tu opinión sobre una obra de arte abstracta.",
        text: "¿Qué comentario es más probable que hagas?",
        options: [
            { id: 'a', text: "(Sin opinión fuerte o prefiero no opinar).", scores: {} },
            { id: 'b', text: "Me pregunto cómo fue construida técnicamente.", scores: { Práctico: 2 } },
            { id: 'c', text: "Analizo la composición, el uso del color y la técnica.", scores: { Analítico: 2, Crítico: 2 } },
            { id: 'd', text: "Me hace sentir una emoción profunda o me recuerda a algo personal.", scores: { Reflexivo: 2, Emocional: 2 } },
            { id: 'e', text: "Me gustaría saber qué piensan otros observadores.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 6,
        context: "Estás revisando un documento importante.",
        text: "¿Qué detectas primero?",
        options: [
            { id: 'a', text: "Errores ortográficos o de formato minúsculos.", scores: { Detallista: 3 } },
            { id: 'b', text: "Si el documento es útil para su propósito inmediato.", scores: { Práctico: 3 } },
            { id: 'c', text: "Si las ideas son originales o hay clichés.", scores: { Creativo: 2, Intuitivo: 1 } },
            { id: 'd', text: "Si la estructura lógica de los argumentos es sólida.", scores: { Analítico: 3 } },
            { id: 'e', text: "Si el tono es adecuado para quien lo va a leer.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 7,
        context: "En una discusión filosófica sobre el futuro de la humanidad.",
        text: "¿Cuál es tu postura habitual?",
        options: [
            { id: 'a', text: "Me centro en qué podemos hacer hoy para mejorar.", scores: { Práctico: 3 } },
            { id: 'b', text: "Me fijo en los datos específicos que definen las tendencias.", scores: { Detallista: 2 } },
            { id: 'c', text: "Imagino escenarios futuros abstractos y utópicos.", scores: { Abstracto: 3, Creativo: 1 } },
            { id: 'd', text: "Analizo las causas y consecuencias lógicas de la historia.", scores: { Analítico: 3 } },
            { id: 'e', text: "Cuestiono las premisas de los demás y busco contradicciones.", scores: { Crítico: 3 } },
        ],
    },
    {
        id: 8,
        context: "Tienes un día libre sin obligaciones.",
        text: "¿Qué actividad te resulta más atractiva?",
        options: [
            { id: 'a', text: "Reparar algo que está roto en casa.", scores: { Práctico: 3 } },
            { id: 'b', text: "Organizar mis cajones o archivos meticulosamente.", scores: { Detallista: 3 } },
            { id: 'c', text: "Escribir, pintar o crear algo nuevo.", scores: { Creativo: 3, Emocional: 1 } },
            { id: 'd', text: "Leer sobre teorías complejas o ciencia ficción.", scores: { Abstracto: 3 } },
            { id: 'e', text: "Salir con amigos o participar en un evento comunitario.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 9,
        context: "Te presentan un nuevo software o herramienta digital.",
        text: "¿Qué es lo primero que investigas?",
        options: [
            { id: 'a', text: "Sus funciones específicas y accesos directos.", scores: { Práctico: 2, Detallista: 2 } },
            { id: 'b', text: "Cómo procesa los datos internamente.", scores: { Analítico: 3 } },
            { id: 'c', text: "Si puedo personalizarlo para hacerlo ver único.", scores: { Creativo: 2 } },
            { id: 'd', text: "Si facilita la comunicación con mi equipo.", scores: { Colaborativo: 3 } },
            { id: 'e', text: "Cuál es la filosofía detrás de su diseño.", scores: { Conceptual: 3 } },
        ],
    },
    {
        id: 10,
        context: "Debes tomar una decisión difícil que afecta a otros.",
        text: "¿En qué basas tu elección final?",
        options: [
            { id: 'a', text: "En un análisis costo-beneficio objetivo.", scores: { Analítico: 3 } },
            { id: 'b', text: "En mis valores internos y reflexión personal.", scores: { Reflexivo: 3 } },
            { id: 'c', text: "En una solución creativa que nadie había pensado.", scores: { Creativo: 3, Abstracto: 1 } },
            { id: 'd', text: "En lo que sea más rápido y eficiente.", scores: { Práctico: 3 } },
            { id: 'e', text: "En cómo se sentirán las personas afectadas.", scores: { Emocional: 3, Colaborativo: 1 } },
        ],
    },
    {
        id: 11,
        context: "Estás observando las estrellas.",
        text: "¿Qué pensamiento cruza tu mente?",
        options: [
            { id: 'a', text: "La inmensidad del universo y mi lugar en él.", scores: { Abstracto: 3 } },
            { id: 'b', text: "Las distancias en años luz y la física estelar.", scores: { Analítico: 3 } },
            { id: 'c', text: "Cómo podría construir un telescopio casero.", scores: { Práctico: 3 } },
            { id: 'd', text: "Lo bonito que sería compartir esto con alguien.", scores: { Colaborativo: 3 } },
            { id: 'e', text: "Me hace reflexionar sobre el sentido de la vida.", scores: { Reflexivo: 3 } },
        ],
    },
    {
        id: 12,
        context: "Tu computadora deja de funcionar repentinamente.",
        text: "¿Qué haces?",
        options: [
            { id: 'a', text: "Investigo la causa raíz del fallo sistemáticamente.", scores: { Analítico: 3 } },
            { id: 'b', text: "Intento reiniciarla o golpearla suavemente a ver si arranca.", scores: { Práctico: 3 } },
            { id: 'c', text: "Reviso cable por cable asegurándome que todo esté conectado.", scores: { Detallista: 3 } },
            { id: 'd', text: "Pienso en cómo podría rediseñar una computadora que no falle.", scores: { Creativo: 3 } },
            { id: 'e', text: "Pido ayuda inmediatamente a un amigo experto.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 13,
        context: "Te piden planificar unas vacaciones grupales.",
        text: "¿Cuál es tu rol natural?",
        options: [
            { id: 'a', text: "Calcular el presupuesto por persona y rutas.", scores: { Analítico: 3 } },
            { id: 'b', text: "Asegurarme de tener todos los horarios y reservas confirmadas.", scores: { Detallista: 3 } },
            { id: 'c', text: "Buscar las actividades más prácticas y convenientes.", scores: { Práctico: 3 } },
            { id: 'd', text: "Proponer destinos exóticos y actividades originales.", scores: { Creativo: 3 } },
            { id: 'e', text: "Consultar con todos para que nadie quede inconforme.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 14,
        context: "Escuchas una noticia impactante.",
        text: "¿Cuál es tu primer instinto?",
        options: [
            { id: 'a', text: "Verificar la fuente y la lógica de la información.", scores: { Analítico: 2, Crítico: 2 } },
            { id: 'b', text: "Pensar en qué debo hacer yo al respecto inmediatamente.", scores: { Práctico: 3 } },
            { id: 'c', text: "Cuestionar quién se beneficia de esta noticia.", scores: { Crítico: 3 } },
            { id: 'd', text: "Imaginar cómo esto cambia el panorama mundial.", scores: { Creativo: 2, Abstracto: 2 } },
            { id: 'e', text: "Compartirla con otros para ver qué opinan.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 15,
        context: "Estás redecorando tu habitación.",
        text: "¿Qué priorizas?",
        options: [
            { id: 'a', text: "Que sea funcional y eficiente.", scores: { Práctico: 3 } },
            { id: 'b', text: "Que tenga un concepto estético abstracto.", scores: { Abstracto: 3 } },
            { id: 'c', text: "Que pueda hacerlo yo mismo con herramientas.", scores: { Práctico: 2, Creativo: 1 } },
            { id: 'd', text: "Que sea un espacio único y artístico.", scores: { Creativo: 3 } },
            { id: 'e', text: "Que sea acogedor para recibir visitas.", scores: { Colaborativo: 2, Emocional: 2 } },
        ],
    },
    {
        id: 16,
        context: "Te invitan a un debate competitivo.",
        text: "¿Cómo te preparas?",
        options: [
            { id: 'a', text: "Preparo argumentos prácticos y ejemplos reales.", scores: { Práctico: 3 } },
            { id: 'b', text: "Busco metáforas y conceptos abstractos para persuadir.", scores: { Creativo: 2, Abstracto: 2 } },
            { id: 'c', text: "Defino los conceptos clave para no caer en ambigüedades.", scores: { Conceptual: 3 } },
            { id: 'd', text: "Estudio cada detalle del reglamento.", scores: { Detallista: 3 } },
            { id: 'e', text: "Me concentro en conectar emocionalmente con el público.", scores: { Emocional: 2, Intuitivo: 2 } },
        ],
    },
    {
        id: 17,
        context: "Ante un sistema burocrático lento.",
        text: "¿Qué piensas?",
        options: [
            { id: 'a', text: "Cómo puedo saltarme los pasos innecesarios.", scores: { Práctico: 3 } },
            { id: 'b', text: "Por qué existe y cuál es su impacto en la sociedad.", scores: { Reflexivo: 3 } },
            { id: 'c', text: "Cómo podría rediseñarse todo el sistema desde cero.", scores: { Abstracto: 2, Sistémico: 2 } },
            { id: 'd', text: "Busco una forma creativa de agilizar mi trámite.", scores: { Creativo: 3 } },
            { id: 'e', text: "Entiendo que es parte de un sistema mayor interconectado.", scores: { Sistémico: 3 } },
        ],
    },
    {
        id: 18,
        context: "Debes escribir un ensayo.",
        text: "¿Cómo empiezas?",
        options: [
            { id: 'a', text: "Hago un esquema punto por punto.", scores: { Práctico: 2, Detallista: 2 } },
            { id: 'b', text: "Reviso minuciosamente la gramática desde el inicio.", scores: { Detallista: 3 } },
            { id: 'c', text: "Empiezo con una idea conceptual fuerte.", scores: { Conceptual: 3, Abstracto: 2 } },
            { id: 'd', text: "Escribo libremente lo que se me ocurra (lluvia de ideas).", scores: { Creativo: 3 } },
            { id: 'e', text: "Escribo pensando en cómo reaccionará el lector.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 19,
        context: "Ves a alguien llorando en la calle.",
        text: "¿Qué sientes/piensas?",
        options: [
            { id: 'a', text: "Pienso si puedo ofrecerle un pañuelo o ayuda práctica.", scores: { Práctico: 3 } },
            { id: 'b', text: "Analizo las posibles causas estadísticas de su tristeza.", scores: { Analítico: 2 } },
            { id: 'c', text: "Me pregunto sobre el sufrimiento humano en general.", scores: { Abstracto: 3 } },
            { id: 'd', text: "Imagino una historia de vida dramática sobre ella.", scores: { Creativo: 3 } },
            { id: 'e', text: "Siento su dolor y quiero consolarla.", scores: { Emocional: 3, Colaborativo: 1 } },
        ],
    },
    {
        id: 20,
        context: "Tienes que armar un mueble complejo.",
        text: "¿Cuál es tu estrategia?",
        options: [
            { id: 'a', text: "Seguir las instrucciones paso a paso sin desviarme.", scores: { Práctico: 2, Detallista: 2 } },
            { id: 'b', text: "Clasificar primero todas las piezas por tamaño y tipo.", scores: { Analítico: 2, Detallista: 2 } },
            { id: 'c', text: "Entender la lógica de cómo se sostiene la estructura.", scores: { Conceptual: 3, Sistémico: 2 } },
            { id: 'd', text: "Inventar una nueva forma de armarlo si me faltan piezas.", scores: { Creativo: 3 } },
            { id: 'e', text: "Hacerlo con alguien más para que sea divertido.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 21,
        context: "En una reunión, alguien propone una idea arriesgada.",
        text: "¿Qué haces?",
        options: [
            { id: 'a', text: "(No digo nada).", scores: { Crítico: 0 } },
            { id: 'b', text: "Evalúo si es viable implementarla mañana mismo.", scores: { Práctico: 3 } },
            { id: 'c', text: "Señalo las fallas lógicas y riesgos potenciales.", scores: { Crítico: 3, Analítico: 1 } },
            { id: 'd', text: "Me entusiasmo con la novedad y aporto más ideas.", scores: { Creativo: 3 } },
            { id: 'e', text: "Busco consenso en el grupo sobre la idea.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 22,
        context: "Estás leyendo un libro de historia.",
        text: "¿Qué te llama la atención?",
        options: [
            { id: 'a', text: "(No leo historia por gusto).", scores: {} },
            { id: 'b', text: "Las alianzas y traiciones entre grupos.", scores: { Colaborativo: 2 } },
            { id: 'c', text: "Los errores estratégicos que llevaron a la derrota.", scores: { Crítico: 3, Analítico: 2 } },
            { id: 'd', text: "La visión romántica de épocas pasadas.", scores: { Abstracto: 2, Creativo: 1 } },
            { id: 'e', text: "Las emociones y vivencias de la gente común.", scores: { Reflexivo: 2, Emocional: 2 } },
        ],
    },
    {
        id: 23,
        context: "Te enfrentas a un dilema ético.",
        text: "¿Cómo lo resuelves?",
        options: [
            { id: 'a', text: "Calculando qué opción beneficia a más personas.", scores: { Analítico: 3 } },
            { id: 'b', text: "Buscando la solución más práctica y menos dolorosa.", scores: { Práctico: 3 } },
            { id: 'c', text: "Analizando las contradicciones morales de cada lado.", scores: { Crítico: 3, Analítico: 2 } },
            { id: 'd', text: "Buscando una tercera vía creativa fuera del dilema.", scores: { Creativo: 3 } },
            { id: 'e', text: "(No sé qué haría).", scores: {} },
        ],
    },
    {
        id: 24,
        context: "Trabajas en equipo y hay un conflicto.",
        text: "¿Qué papel asumes?",
        options: [
            { id: 'a', text: "El mediador que busca armonía.", scores: { Colaborativo: 3 } },
            { id: 'b', text: "El que propone soluciones rápidas para seguir avanzando.", scores: { Práctico: 3 } },
            { id: 'c', text: "El que analiza objetivamente quién tiene la razón.", scores: { Crítico: 2, Analítico: 2 } },
            { id: 'd', text: "El que intenta relajar el ambiente con humor y creatividad.", scores: { Creativo: 3 } },
            { id: 'e', text: "El que reflexiona sobre por qué llegamos a este punto.", scores: { Reflexivo: 3 } },
        ],
    },
    {
        id: 25,
        context: "Se te rompe un plato favorito.",
        text: "¿Qué haces con los pedazos?",
        options: [
            { id: 'a', text: "Los tiro a la basura, ya no sirve.", scores: { Práctico: 3 } },
            { id: 'b', text: "Intento pegarlo con precisión quirúrgica.", scores: { Detallista: 3 } },
            { id: 'c', text: "Critico la calidad del material del plato.", scores: { Crítico: 2 } },
            { id: 'd', text: "Hago un mosaico artístico con los restos.", scores: { Creativo: 3 } },
            { id: 'e', text: "Me siento triste porque tenía valor sentimental.", scores: { Emocional: 3 } },
        ],
    },
    {
        id: 26,
        context: "Estás planeando tu futuro profesional.",
        text: "¿Qué pesa más?",
        options: [
            { id: 'a', text: "El salario y la estabilidad.", scores: { Práctico: 3, Detallista: 1 } },
            { id: 'b', text: "Tener herramientas concretas para trabajar.", scores: { Práctico: 3 } },
            { id: 'c', text: "El ambiente laboral y mis compañeros.", scores: { Colaborativo: 3, Emocional: 2 } },
            { id: 'd', text: "La posibilidad de innovar y crear cosas nuevas.", scores: { Creativo: 3 } },
            { id: 'e', text: "La capacidad de analizar y resolver problemas complejos.", scores: { Analítico: 3 } },
        ],
    },
    {
        id: 27,
        context: "Llegas a una fiesta donde no conoces a nadie.",
        text: "¿Qué haces?",
        options: [
            { id: 'a', text: "(Me voy).", scores: {} },
            { id: 'b', text: "(Me quedo en un rincón).", scores: {} },
            { id: 'c', text: "Busco a alguien que parezca amigable para charlar.", scores: { Colaborativo: 3, Emocional: 2 } },
            { id: 'd', text: "Analizo el comportamiento de la gente desde lejos.", scores: { Analítico: 3 } },
            { id: 'e', text: "Me uno a un grupo grande e intento integrarme.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 28,
        context: "Tienes que explicar algo complicado a un niño.",
        text: "¿Cómo lo haces?",
        options: [
            { id: 'a', text: "Con mucho detalle para que no se pierda nada.", scores: { Detallista: 3 } },
            { id: 'b', text: "Con ejemplos prácticos de su vida diaria.", scores: { Práctico: 3 } },
            { id: 'c', text: "Juntos construimos la explicación jugando.", scores: { Colaborativo: 3 } },
            { id: 'd', text: "Invento una historia fantástica como analogía.", scores: { Creativo: 3 } },
            { id: 'e', text: "Le explico la estructura lógica simplificada.", scores: { Analítico: 3 } },
        ],
    },
    {
        id: 29,
        context: "Ves una película con un final abierto.",
        text: "¿Qué piensas?",
        options: [
            { id: 'a', text: "No me gusta, prefiero finales claros.", scores: { Práctico: 2, Detallista: 1 } },
            { id: 'b', text: "Pienso en qué hubiera hecho yo en esa situación.", scores: { Práctico: 2 } },
            { id: 'c', text: "Discuto con amigos las posibles interpretaciones.", scores: { Colaborativo: 3 } },
            { id: 'd', text: "Imagino cinco finales alternativos.", scores: { Creativo: 3 } },
            { id: 'e', text: "Analizo las pistas que dio el director.", scores: { Analítico: 3 } },
        ],
    },
    {
        id: 30,
        context: "Te regalan un kit de jardinería.",
        text: "¿Qué es lo primero que haces?",
        options: [
            { id: 'a', text: "(Lo guardo y no lo uso).", scores: {} },
            { id: 'b', text: "(Se lo doy a alguien más).", scores: {} },
            { id: 'c', text: "Invito a alguien a plantar conmigo.", scores: { Colaborativo: 3, Emocional: 2 } },
            { id: 'd', text: "Investigo exactamente cuánta agua necesita cada planta.", scores: { Analítico: 3, Detallista: 1 } },
            { id: 'e', text: "Diseño un jardín paisajista creativo.", scores: { Creativo: 3 } },
        ],
    },
    {
        id: 31,
        context: "Frente a una obra de arte moderna incomprensible.",
        text: "¿Cuál es tu reacción?",
        options: [
            { id: 'a', text: "Busco el significado oculto metafórico.", scores: { Abstracto: 3 } },
            { id: 'b', text: "Pienso 'esto lo podría hacer cualquiera'.", scores: { Práctico: 3 } },
            { id: 'c', text: "Me fijo en la técnica de la pincelada.", scores: { Detallista: 2, Analítico: 1 } },
            { id: 'd', text: "Aprecio la originalidad de la propuesta.", scores: { Creativo: 3 } },
            { id: 'e', text: "Comento con otros qué les provoca.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 32,
        context: "Debes convencer a alguien de tu punto de vista.",
        text: "¿Qué estrategia usas?",
        options: [
            { id: 'a', text: "Hablo de ideales y conceptos elevados.", scores: { Abstracto: 3 } },
            { id: 'b', text: "Apelo a sus sentimientos y empatía.", scores: { Emocional: 3 } },
            { id: 'c', text: "Presento datos detallados y hechos irrefutables.", scores: { Detallista: 2, Analítico: 2 } },
            { id: 'd', text: "Uso el humor y la creatividad.", scores: { Creativo: 3 } },
            { id: 'e', text: "Busco un punto medio donde ambos ganemos.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 33,
        context: "Tienes una corazonada de que algo va a salir mal.",
        text: "¿Qué haces?",
        options: [
            { id: 'a', text: "Hago caso a mi intuición inmediatamente y me detengo.", scores: { Intuitivo: 3 } },
            { id: 'b', text: "Reviso si hay razones prácticas para mi miedo.", scores: { Práctico: 2 } },
            { id: 'c', text: "Analizo cada detalle para encontrar el error potencial.", scores: { Detallista: 2, Analítico: 2 } },
            { id: 'd', text: "Imagino creativamente qué es lo peor que podría pasar.", scores: { Creativo: 2 } },
            { id: 'e', text: "Consulto con el equipo si ellos sienten lo mismo.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 34,
        context: "Te piden diseñar un logotipo.",
        text: "¿En qué piensas primero?",
        options: [
            { id: 'a', text: "En que sea legible y aplicable en varios formatos.", scores: { Práctico: 3 } },
            { id: 'b', text: "En bosquejar muchas ideas locas.", scores: { Creativo: 2 } },
            { id: 'c', text: "En que cada línea y pixel esté perfecto.", scores: { Detallista: 3 } },
            { id: 'd', text: "En romper las reglas del diseño tradicional.", scores: { Creativo: 3 } },
            { id: 'e', text: "En que represente los valores de la comunidad.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 35,
        context: "Estás solo en la naturaleza.",
        text: "¿Qué experimentas?",
        options: [
            { id: 'a', text: "Una conexión espiritual con el todo.", scores: { Abstracto: 3 } },
            { id: 'b', text: "Pienso en lo que necesitaría para sobrevivir aquí.", scores: { Práctico: 3 } },
            { id: 'c', text: "Observo los detalles de las plantas e insectos.", scores: { Detallista: 3 } },
            { id: 'd', text: "Me inspiro para crear algo artístico.", scores: { Creativo: 3 } },
            { id: 'e', text: "Desearía que alguien estuviera aquí para verlo.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 36,
        context: "Debes organizar tu biblioteca o archivos.",
        text: "¿Cómo lo haces?",
        options: [
            { id: 'a', text: "De la forma más accesible y rápida de usar.", scores: { Práctico: 3 } },
            { id: 'b', text: "Por orden alfabético, color y tamaño riguroso.", scores: { Detallista: 3 } },
            { id: 'c', text: "Por grandes conceptos o temáticas abstractas.", scores: { Conceptual: 3, Abstracto: 2 } },
            { id: 'd', text: "De una forma creativa y visualmente impactante.", scores: { Creativo: 2 } },
            { id: 'e', text: "Pensando en qué le gustaría a quien venga a visitarme.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 37,
        context: "Un proyecto falla estrepitosamente.",
        text: "¿Cuál es tu análisis post-mortem?",
        options: [
            { id: 'a', text: "Qué acciones específicas no se ejecutaron.", scores: { Práctico: 3 } },
            { id: 'b', text: "Qué detalles pequeños se pasaron por alto.", scores: { Detallista: 3 } },
            { id: 'c', text: "Si el sistema general estaba mal diseñado.", scores: { Sistémico: 3, Conceptual: 2 } },
            { id: 'd', text: "Critico abiertamente las malas decisiones tomadas.", scores: { Crítico: 3 } },
            { id: 'e', text: "Si nos faltó imaginación para ver los riesgos.", scores: { Creativo: 2, Abstracto: 1 } },
        ],
    },
    {
        id: 38,
        context: "Te piden innovar en un proceso.",
        text: "¿Por dónde empiezas?",
        options: [
            { id: 'a', text: "Buscando herramientas que agilicen el trabajo.", scores: { Práctico: 3 } },
            { id: 'b', text: "Revisando cada paso actual minuciosamente.", scores: { Detallista: 3 } },
            { id: 'c', text: "Redefiniendo el concepto mismo del proceso.", scores: { Conceptual: 3, Abstracto: 2 } },
            { id: 'd', text: "Proponiendo algo radicalmente opuesto.", scores: { Creativo: 3 } },
            { id: 'e', text: "Haciendo una lluvia de ideas con todo el equipo.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 39,
        context: "Estás aprendiendo un idioma nuevo.",
        text: "¿Qué se te facilita más?",
        options: [
            { id: 'a', text: "Aprender frases prácticas para sobrevivir.", scores: { Práctico: 3 } },
            { id: 'b', text: "Entender la gramática y sus reglas lógicas.", scores: { Analítico: 3 } },
            { id: 'c', text: "Entender la cultura y conceptos detrás del idioma.", scores: { Conceptual: 3, Abstracto: 2 } },
            { id: 'd', text: "Identificar errores en mi pronunciación.", scores: { Crítico: 2 } },
            { id: 'e', text: "La entonación emocional y expresividad.", scores: { Emocional: 3 } },
        ],
    },
    {
        id: 40,
        context: "Te encuentras un objeto extraño en el suelo.",
        text: "¿Qué haces?",
        options: [
            { id: 'a', text: "Veo si sirve para algo útil.", scores: { Práctico: 3 } },
            { id: 'b', text: "Lo examino con lupa buscando marcas.", scores: { Detallista: 3 } },
            { id: 'c', text: "Pienso en cómo llegó ahí y su historia sistémica.", scores: { Sistémico: 3, Conceptual: 2 } },
            { id: 'd', text: "Imagino que es un artefacto alienígena.", scores: { Creativo: 3 } },
            { id: 'e', text: "Pregunto a los que pasan si a alguien se le cayó.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 41,
        context: "Debes invertir tu dinero.",
        text: "¿Qué criterio usas?",
        options: [
            { id: 'a', text: "Analizo los rendimientos históricos.", scores: { Analítico: 3 } },
            { id: 'b', text: "Invierto en bienes tangibles y prácticos.", scores: { Práctico: 3 } },
            { id: 'c', text: "Sigo mi instinto sobre qué empresa triunfará.", scores: { Intuitivo: 3 } },
            { id: 'd', text: "Veo cómo afecta la inversión al sistema económico.", scores: { Sistémico: 3 } },
            { id: 'e', text: "Me uno a un fondo de inversión grupal.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 42,
        context: "Sientes que alguien te miente.",
        text: "¿Cómo lo sabes?",
        options: [
            { id: 'a', text: "Hay contradicciones lógicas en su historia.", scores: { Analítico: 3 } },
            { id: 'b', text: "Detalles pequeños en su ropa o gestos no cuadran.", scores: { Detallista: 2 } },
            { id: 'c', text: "Simplemente lo sé, lo presiento.", scores: { Intuitivo: 3, Emocional: 1 } },
            { id: 'd', text: "Comparo los datos con la realidad.", scores: { Analítico: 2 } },
            { id: 'e', text: "Pregunto a otros si confían en él.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 43,
        context: "Tienes que resolver un acertijo.",
        text: "¿Qué enfoque usas?",
        options: [
            { id: 'a', text: "Deducción lógica paso a paso.", scores: { Analítico: 3 } },
            { id: 'b', text: "Ensayo y error hasta que salga.", scores: { Práctico: 2 } },
            { id: 'c', text: "Espero a que la respuesta llegue de golpe (insight).", scores: { Intuitivo: 3, Creativo: 1 } },
            { id: 'd', text: "Entiendo el concepto detrás del acertijo.", scores: { Conceptual: 2 } },
            { id: 'e', text: "Pido pistas a mis amigos.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 44,
        context: "Estás cocinando sin receta.",
        text: "¿Cómo procedes?",
        options: [
            { id: 'a', text: "Mido cantidades basadas en proporciones lógicas.", scores: { Analítico: 2 } },
            { id: 'b', text: "Pruebo y ajusto sobre la marcha.", scores: { Práctico: 3 } },
            { id: 'c', text: "Añado ingredientes por intuición olfativa.", scores: { Intuitivo: 3 } },
            { id: 'd', text: "Invento una fusión de sabores nueva.", scores: { Creativo: 3 } },
            { id: 'e', text: "Cocino para compartir y pido opiniones.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 45,
        context: "Lideras un cambio organizacional.",
        text: "¿Qué es clave para ti?",
        options: [
            { id: 'a', text: "Tener un plan estratégico analizado.", scores: { Analítico: 3 } },
            { id: 'b', text: "Ejecutar acciones rápidas y visibles.", scores: { Práctico: 2 } },
            { id: 'c', text: "Intuir cuándo la gente está lista para el cambio.", scores: { Intuitivo: 3 } },
            { id: 'd', text: "Entender cómo afecta a todo el ecosistema de la empresa.", scores: { Sistémico: 3 } },
            { id: 'e', text: "Que todos participen en la decisión.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 46,
        context: "Tu amigo está pasando por una ruptura amorosa.",
        text: "¿Cómo le ayudas?",
        options: [
            { id: 'a', text: "Analizo por qué la relación no funcionaba.", scores: { Analítico: 2 } },
            { id: 'b', text: "Le ayudo con la mudanza o trámites prácticos.", scores: { Práctico: 2 } },
            { id: 'c', text: "Intuyo qué necesita sin que me lo diga.", scores: { Intuitivo: 2, Emocional: 2 } },
            { id: 'd', text: "Me siento a llorar con él y validamos emociones.", scores: { Emocional: 3, Colaborativo: 2 } },
            { id: 'e', text: "Le hago reflexionar sobre el aprendizaje de esto.", scores: { Reflexivo: 3 } },
        ],
    },
    {
        id: 47,
        context: "Debes crear una campaña publicitaria.",
        text: "¿Cuál es el foco?",
        options: [
            { id: 'a', text: "Las estadísticas del mercado objetivo.", scores: { Analítico: 3 } },
            { id: 'b', text: "La utilidad práctica del producto.", scores: { Práctico: 2 } },
            { id: 'c', text: "La conexión emocional con el cliente.", scores: { Emocional: 3, Colaborativo: 1 } },
            { id: 'd', text: "Una idea visualmente revolucionaria.", scores: { Creativo: 3 } },
            { id: 'e', text: "Un concepto abstracto que intrigue.", scores: { Abstracto: 2 } },
        ],
    },
    {
        id: 48,
        context: "Te sientes abrumado por el trabajo.",
        text: "¿Qué te relaja?",
        options: [
            { id: 'a', text: "Ordenar mi lista de tareas.", scores: { Analítico: 2, Práctico: 2 } },
            { id: 'b', text: "Desahogarme emocionalmente con alguien.", scores: { Emocional: 3 } },
            { id: 'c', text: "Salir con amigos a distraerme.", scores: { Colaborativo: 3 } },
            { id: 'd', text: "Hacer garabatos o algo artístico.", scores: { Creativo: 2 } },
            { id: 'e', text: "Meditar y reflexionar en soledad.", scores: { Reflexivo: 3 } },
        ],
    },
    {
        id: 49,
        context: "Tienes que elegir un regalo para alguien.",
        text: "¿Qué buscas?",
        options: [
            { id: 'a', text: "Algo que haya dicho que necesita.", scores: { Analítico: 2 } },
            { id: 'b', text: "Algo útil que use todos los días.", scores: { Práctico: 3 } },
            { id: 'c', text: "Algo que le toque el corazón.", scores: { Emocional: 3 } },
            { id: 'd', text: "Algo único y original hecho por mí.", scores: { Creativo: 2, Abstracto: 1 } },
            { id: 'e', text: "Algo que le invite a reflexionar.", scores: { Reflexivo: 3 } },
        ],
    },
    {
        id: 50,
        context: "Estás diseñando una casa.",
        text: "¿Qué es lo más importante?",
        options: [
            { id: 'a', text: "La eficiencia energética y estructural.", scores: { Analítico: 3 } },
            { id: 'b', text: "Que sea fácil de limpiar y mantener.", scores: { Práctico: 3 } },
            { id: 'c', text: "Que se sienta un hogar cálido y acogedor.", scores: { Emocional: 3, Colaborativo: 1 } },
            { id: 'd', text: "Que tenga un diseño arquitectónico innovador.", scores: { Creativo: 3 } },
            { id: 'e', text: "El concepto de habitabilidad que representa.", scores: { Conceptual: 3 } },
        ],
    },
    {
        id: 51,
        context: "Debes evaluar un software complejo.",
        text: "¿En qué te fijas?",
        options: [
            { id: 'a', text: "En los detalles de la interfaz píxel a píxel.", scores: { Detallista: 3 } },
            { id: 'b', text: "En los algoritmos de rendimiento.", scores: { Analítico: 3 } },
            { id: 'c', text: "En cómo se integra con otros sistemas.", scores: { Sistémico: 3, Conceptual: 1 } },
            { id: 'd', text: "En qué tan rápido puedo hacer mi trabajo.", scores: { Práctico: 3 } },
            { id: 'e', text: "En la experiencia emocional del usuario (UX).", scores: { Emocional: 2, Colaborativo: 1 } },
        ],
    },
    {
        id: 52,
        context: "Un sistema se cae (crash).",
        text: "¿Cuál es tu teoría inmediata?",
        options: [
            { id: 'a', text: "Un error de sintaxis (punto y coma).", scores: { Detallista: 3 } },
            { id: 'b', text: "Falla de hardware o conexión.", scores: { Práctico: 2 } },
            { id: 'c', text: "Sobrecarga sistémica de procesos.", scores: { Sistémico: 3, Analítico: 1 } },
            { id: 'd', text: "Alguien hizo algo que no debía.", scores: { Creativo: 1 } }, // humor
            { id: 'e', text: "Frustración, ¿por qué siempre pasa esto?", scores: { Emocional: 3 } },
        ],
    },
    {
        id: 53,
        context: "Tienes que explicar cómo funciona una ciudad.",
        text: "¿Qué metáfora usas?",
        options: [
            { id: 'a', text: "Es como una máquina con engranajes.", scores: { Práctico: 2 } },
            { id: 'b', text: "Es como un mapa detallado de calles.", scores: { Detallista: 3 } },
            { id: 'c', text: "Es un organismo vivo interconectado.", scores: { Sistémico: 3, Conceptual: 2 } },
            { id: 'd', text: "Es un lienzo en constante pintura.", scores: { Creativo: 2 } },
            { id: 'e', text: "Es un cúmulo de emociones y relaciones.", scores: { Emocional: 3 } },
        ],
    },
    {
        id: 54,
        context: "Ves un patrón repetitivo en la naturaleza.",
        text: "¿Qué piensas?",
        options: [
            { id: 'a', text: "Me fijo en la simetría perfecta.", scores: { Detallista: 3 } },
            { id: 'b', text: "¿Para qué sirve esta forma?", scores: { Práctico: 3 } },
            { id: 'c', text: "Es parte de un sistema fractal mayor.", scores: { Sistémico: 3, Abstracto: 2 } },
            { id: 'd', text: "Me inspira para un diseño.", scores: { Creativo: 3 } },
            { id: 'e', text: "Qué bello compartir esto con el mundo.", scores: { Colaborativo: 2 } },
        ],
    },
    {
        id: 55,
        context: "Te piden mejorar la comunicación en una empresa.",
        text: "¿Qué propones?",
        options: [
            { id: 'a', text: "Analizar los flujos de información actuales.", scores: { Analítico: 3 } },
            { id: 'b', text: "Corregir los manuales de procedimiento.", scores: { Detallista: 2 } },
            { id: 'c', text: "Ver la empresa como un sistema de redes.", scores: { Sistémico: 3, Analítico: 1 } },
            { id: 'd', text: "Crear espacios lúdicos y creativos.", scores: { Creativo: 2 } },
            { id: 'e', text: "Talleres de inteligencia emocional.", scores: { Emocional: 3, Colaborativo: 2 } },
        ],
    },
    {
        id: 56,
        context: "Estás meditando.",
        text: "¿A dónde va tu mente?",
        options: [
            { id: 'a', text: "A mi lista de pendientes prácticos.", scores: { Práctico: 2 } },
            { id: 'b', text: "A un detalle específico que vi hoy.", scores: { Detallista: 2 } },
            { id: 'c', text: "A la reflexión profunda sobre mi existencia.", scores: { Reflexivo: 3, Analítico: 1 } },
            { id: 'd', text: "A mis relaciones con los demás.", scores: { Emocional: 2, Colaborativo: 2 } },
            { id: 'e', text: "A imágenes creativas y sueños.", scores: { Creativo: 2 } },
        ],
    },
    {
        id: 57,
        context: "Te preguntan: ¿Quién eres?",
        text: "¿Cómo respondes?",
        options: [
            { id: 'a', text: "(Silencio incómodo).", scores: {} },
            { id: 'b', text: "Soy lo que hago y mis logros.", scores: { Práctico: 1 } },
            { id: 'c', text: "Soy un ser en constante reflexión y cambio.", scores: { Reflexivo: 3, Analítico: 1 } },
            { id: 'd', text: "(Digo mi nombre y profesión).", scores: {} },
            { id: 'e', text: "Soy parte de esta comunidad y familia.", scores: { Colaborativo: 3 } },
        ],
    },
    {
        id: 58,
        context: "Miras al pasado y te arrepientes de algo.",
        text: "¿Qué haces con ese sentimiento?",
        options: [
            { id: 'a', text: "(Lo ignoro).", scores: {} },
            { id: 'b', text: "Pienso qué haría diferente la próxima vez (lección práctica).", scores: { Práctico: 2 } },
            { id: 'c', text: "Reflexiono profundamente sobre por qué sucedió.", scores: { Reflexivo: 3 } },
            { id: 'd', text: "(Me distraigo).", scores: {} },
            { id: 'e', text: "(No suelo arrepentirme).", scores: {} },
        ],
    },
    {
        id: 59,
        context: "Tienes una idea revolucionaria.",
        text: "¿Qué te frena?",
        options: [
            { id: 'a', text: "(Nada).", scores: {} },
            { id: 'b', text: "La falta de recursos prácticos para hacerla.", scores: { Práctico: 2 } },
            { id: 'c', text: "La duda reflexiva: ¿es realmente bueno?", scores: { Reflexivo: 3, Intuitivo: 1 } },
            { id: 'd', text: "Los detalles técnicos que no sé resolver.", scores: { Detallista: 2, Analítico: 1 } },
            { id: 'e', text: "El miedo al rechazo social.", scores: { Emocional: 3, Colaborativo: 1 } },
        ],
    },
    {
        id: 60,
        context: "Al final de tu vida.",
        text: "¿Qué te gustaría que dijeran de ti?",
        options: [
            { id: 'a', text: "Que fui una persona útil y trabajadora.", scores: { Práctico: 2, Detallista: 1 } },
            { id: 'b', text: "(No me importa).", scores: {} },
            { id: 'c', text: "Que fui una persona sabia y reflexiva.", scores: { Reflexivo: 3, Emocional: 1 } },
            { id: 'd', text: "(Que hablen mis obras).", scores: {} },
            { id: 'e', text: "Que fui un gran amigo y compañero.", scores: { Colaborativo: 3 } },
        ],
    },
];
