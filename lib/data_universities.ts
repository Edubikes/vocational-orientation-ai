import { CognitiveStyle } from "./questions";

export interface University {
    name: string;
    type: 'Public' | 'Private';
    location: string;
    website: string;
}

export interface CareerDetail {
    id: string; // matches career name in careers.ts generally, but specific here
    name: string;
    description: string;
    universities: {
        university: University;
        plan: string[]; // List of subjects/materias
    }[];
    relatedStyles: CognitiveStyle[];
}

// Data Investigation: A massive sampling of top Mexican universities and careers
export const careerDetails: CareerDetail[] = [
    {
        id: "Ingeniería en Sistemas Computacionales",
        name: "Ingeniería en Sistemas Computacionales",
        description: "Diseña y optimiza software y hardware. Ideal para mentes Analíticas y Sistémicas.",
        relatedStyles: ["Analítico", "Sistémico", "Práctico"],
        universities: [
            {
                university: { name: "UNAM - Facultad de Ingeniería", type: "Public", location: "CDMX", website: "https://www.ingenieria.unam.mx" },
                plan: ["Cálculo Diferencial", "Álgebra Lineal", "Estructura de Datos", "Programación Orientada a Objetos", "Sistemas Operativos", "Inteligencia Artificial", "Bases de Datos", "Redes de Computadoras", "Ingeniería de Software", "Ética Profesional"]
            },
            {
                university: { name: "Tecnológico de Monterrey (ITESM)", type: "Private", location: "Nacional", website: "https://tec.mx" },
                plan: ["Pensamiento Computacional", "Modelación Matemática", "Desarrollo de Software", "Ciberseguridad", "Arquitectura de Computadoras", "Internet de las Cosas", "Análisis de Algoritmos", "Innovación Tecnológica"]
            },
            {
                university: { name: "IPN - ESCOM", type: "Public", location: "CDMX", website: "https://www.escom.ipn.mx" },
                plan: ["Matemáticas Discretas", "Circuitos Lógicos", "Teoría Computacional", "Compiladores", "Sistemas Distribuidos", "Minería de Datos", "Liderazgo y Emprendimiento"]
            }
        ]
    },
    {
        id: "Psicología Clínica",
        name: "Licenciatura en Psicología",
        description: "Estudio del comportamiento humano y procesos mentales. Ideal para mentes Emocionales y Reflexivas.",
        relatedStyles: ["Emocional", "Reflexivo", "Colaborativo"],
        universities: [
            {
                university: { name: "UNAM - Facultad de Psicología", type: "Public", location: "CDMX", website: "https://www.psicologia.unam.mx" },
                plan: ["Neurobiología", "Teoría Psicoanalítica", "Psicología Social", "Psicometría", "Entrevista Clínica", "Psicopatología", "Desarrollo Humano", "Intervención en Crisis"]
            },
            {
                university: { name: "Universidad Iberoamericana", type: "Private", location: "CDMX", website: "https://ibero.mx" },
                plan: ["Epistemología de la Psicología", "Investigación Cualitativa", "Neuropsicología", "Psicología Educativa", "Psicología Organizacional", "Prácticas Supervisadas"]
            }
        ]
    },
    {
        id: "Diseño Gráfico",
        name: "Licenciatura en Diseño y Comunicación Visual",
        description: "Comunicación visual a través de imágenes y texto. Ideal para mentes Creativas y Detallistas.",
        relatedStyles: ["Creativo", "Detallista", "Conceptual"],
        universities: [
            {
                university: { name: "UNAM - FAD", type: "Public", location: "CDMX", website: "https://www.fad.unam.mx" },
                plan: ["Fundamentos del Diseño", "Geometría", "Tipografía", "Fotografía", "Semiótica", "Diseño Editorial", "Ilustración", "Medios Audiovisuales"]
            },
            {
                university: { name: "Universidad Anáhuac", type: "Private", location: "Nacional", website: "https://www.anahuac.mx" },
                plan: ["Historia del Arte", "Dibujo", "Branding", "Diseño Web", "Animación Digital", "Mercadotecnia", "Gestión de Proyectos de Diseño"]
            }
        ]
    },
    {
        id: "Derecho",
        name: "Licenciatura en Derecho",
        description: "Defensa de la justicia y aplicación de leyes. Ideal para mentes Críticas y Analíticas.",
        relatedStyles: ["Crítico", "Analítico", "Reflexivo"],
        universities: [
            {
                university: { name: "Escuela Libre de Derecho", type: "Private", location: "CDMX", website: "https://www.eld.edu.mx" },
                plan: ["Derecho Romano", "Teoría del Estado", "Derecho Civil", "Derecho Penal", "Derecho Constitucional", "Derecho Mercantil", "Filosofía del Derecho"]
            },
            {
                university: { name: "UNAM - Facultad de Derecho", type: "Public", location: "CDMX", website: "https://www.derecho.unam.mx" },
                plan: ["Sociología Jurídica", "Derechos Humanos", "Derecho Administrativo", "Derecho Laboral", "Derecho Internacional", "Amparo", "Criminología"]
            }
        ]
    },
    {
        id: "Arquitectura",
        name: "Arquitectura",
        description: "Arte y técnica de proyectar y diseñar edificios. Ideal para mentes Abstractas y Prácticas.",
        relatedStyles: ["Abstracto", "Práctico", "Creativo"],
        universities: [
            {
                university: { name: "UNAM - Facultad de Arquitectura", type: "Public", location: "CDMX", website: "https://arquitectura.unam.mx" },
                plan: ["Taller de Proyectos", "Geometría Descriptiva", "Sistemas Estructurales", "Historia de la Arquitectura", "Instalaciones", "Urbanismo", "Costos y Presupuestos"]
            },
            {
                university: { name: "ITESO", type: "Private", location: "Guadalajara", website: "https://www.iteso.mx" },
                plan: ["Diseño Asistido por Computadora", "Teoría de la Arquitectura", "Sustentabilidad", "Patrimonio Edificado", "Administración de Obra", "Paisajismo"]
            }
        ]
    },
    {
        id: "Medicina",
        name: "Médico Cirujano",
        description: "Diagnóstico y tratamiento de enfermedades. Ideal para mentes Prácticas y Sistémicas.",
        relatedStyles: ["Práctico", "Sistémico", "Analítico", "Colaborativo"],
        universities: [
            {
                university: { name: "UNAM - Facultad de Medicina", type: "Public", location: "CDMX", website: "https://www.facmed.unam.mx" },
                plan: ["Anatomía", "Biología Celular", "Fisiología", "Farmacología", "Inmunología", "Salud Pública", "Cirugía", "Medicina Interna", "Pediatría", "Ginecología"]
            },
            {
                university: { name: "Tec de Monterrey - Escuela de Medicina", type: "Private", location: "Monterrey/CDMX", website: "https://tec.mx/es/salud" },
                plan: ["Bases Biológicas", "Bioética", "Gestión en Salud", "Investigación Clínica", "Genética", "Nutrición", "Urgencias", "Cardiología"]
            }
        ]
    },
    {
        id: "Administracion",
        name: "Administración de Empresas",
        description: "Gestión eficiente de recursos y organizaciones. Ideal para mentes Colaborativas y Prácticas.",
        relatedStyles: ["Colaborativo", "Práctico", "Sistémico"],
        universities: [
            {
                university: { name: "ITAM", type: "Private", location: "CDMX", website: "https://www.itam.mx" },
                plan: ["Contabilidad Financiera", "Matemáticas Financieras", "Microeconomía", "Derecho Corporativo", "Mercadotecnia", "Recursos Humanos", "Estrategia Empresarial"]
            },
            {
                university: { name: "UNAM - FCA", type: "Public", location: "CDMX", website: "https://www.fca.unam.mx" },
                plan: ["Administración Básica", "Informática", "Estadística", "Costos", "Finanzas", "Operaciones", "Auditoría"]
            }
        ]
    },
    {
        id: "Filosofia",
        name: "Licenciatura en Filosofía",
        description: "Análisis profundo de la existencia y el pensamiento. Ideal para mentes Reflexivas y Abstractas.",
        relatedStyles: ["Reflexivo", "Abstracto", "Crítico"],
        universities: [
            {
                university: { name: "UNAM - FFyL", type: "Public", location: "CDMX", website: "https://www.filos.unam.mx" },
                plan: ["Lógica", "Ética", "Estética", "Filosofía Antigua", "Filosofía Moderna", "Metafísica", "Filosofía de la Ciencia", "Filosofía Política"]
            },
            {
                university: { name: "Universidad Panamericana", type: "Private", location: "CDMX", website: "https://www.up.edu.mx" },
                plan: ["Antropología Filosófica", "Teodicea", "Filosofía del Lenguaje", "Bioética", "Filosofía de la Cultura", "Seminarios de Investigación"]
            }
        ]
    },
    // Adding more to cover specific styles heavily
    {
        id: "Biologia",
        name: "Biología",
        description: "Estudio de la vida y organismos. Ideal para mentes Detallistas y Sistémicas.",
        relatedStyles: ["Detallista", "Sistémico", "Analítico"],
        universities: [
            {
                university: { name: "UAM Xochimilco", type: "Public", location: "CDMX", website: "https://www.xoc.uam.mx" },
                plan: ["Química Orgánica", "Biología Molecular", "Ecología", "Genética", "Evolución", "Botánica", "Zoología", "Biogeografía"]
            }
        ]
    },
    {
        id: "Mercadotecnia",
        name: "Mercadotecnia",
        description: "Estrategias de mercado y consumidor. Ideal para mentes Intuitivas y Creativas.",
        relatedStyles: ["Intuitivo", "Creativo", "Colaborativo"],
        universities: [
            {
                university: { name: "CECC", type: "Private", location: "CDMX", website: "https://cecc.edu.mx" },
                plan: ["Comportamiento del Consumidor", "Investigación de Mercados", "Publicidad", "Branding", "Marketing Digital", "Relaciones Públicas"]
            }
        ]
    }
];
