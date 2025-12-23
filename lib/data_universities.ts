export interface CareerDetail {
    id: string; // matches career name in careers.ts
    name: string;
    description: string;
    relatedStyles: string[];
    universities: {
        university: {
            name: string;
            type: 'Public' | 'Private';
            location: string;
            website: string;
        };
        plan: string[]; // List of key subjects
    }[];
}

export const careerDetails: CareerDetail[] = [
    {
        id: "Ingeniería en Inteligencia Artificial",
        name: "Ingeniería en Inteligencia Artificial",
        description: "Desarrollo de algoritmos inteligentes y aprendizaje automático.",
        relatedStyles: ["Analítico", "Sistémico"],
        universities: [
            {
                university: { name: "Tec de Monterrey", type: "Private", location: "Monterrey / CDMX", website: "https://tec.mx" },
                plan: ["Matemáticas Discretas", "Redes Neuronales", "Visión Computacional", "Ética en IA"]
            },
            {
                university: { name: "IPN - ESCOM", type: "Public", location: "CDMX", website: "https://www.escom.ipn.mx" },
                plan: ["Algoritmos Genéticos", "Sistemas Expertos", "Procesamiento de Lenguaje Natural", "Robótica"]
            },
            {
                university: { name: "UNAM - Facultad de Ingeniería", type: "Public", location: "CDMX", website: "https://www.ingenieria.unam.mx" },
                plan: ["Ingeniería de Datos", "Aprendizaje Profundo", "Probabilidad Avanzada", "Sistemas Cognitivos"]
            }
        ]
    },
    {
        id: "Ciberseguridad",
        name: "Ciberseguridad",
        description: "Protección de infraestructura digital.",
        relatedStyles: ["Analítico", "Detallista"],
        universities: [
            {
                university: { name: "Universidad Anáhuac", type: "Private", location: "CDMX", website: "https://www.anahuac.mx" },
                plan: ["Criptografía", "Hacking Ético", "Forense Digital", "Seguridad en Nube"]
            },
            {
                university: { name: "Tec de Monterrey", type: "Private", location: "Nacional", website: "https://tec.mx" },
                plan: ["Seguridad de Redes", "Gestión de Riesgos", "Blockchain", "Legislación Informática"]
            }
        ]
    },
    {
        id: "Neurocirugía",
        name: "Neurocirugía",
        description: "Especialidad médica enfocada en el sistema nervioso.",
        relatedStyles: ["Detallista", "Práctico"],
        universities: [
            {
                university: { name: "UNAM - Fac. Medicina", type: "Public", location: "CDMX", website: "https://medicina.unam.mx" },
                plan: ["Neuroanatomía", "Microcirugía", "Neurología Clínica", "Cuidados Intensivos"]
            },
            {
                university: { name: "Tec de Monterrey - EMIS", type: "Private", location: "Monterrey", website: "https://tec.mx/salud" },
                plan: ["Neuroimagenología", "Cirugía de Columna", "Neurofisiología", "Investigación Clínica"]
            },
            {
                university: { name: "Universidad La Salle", type: "Private", location: "CDMX", website: "https://lasalle.mx" },
                plan: ["Bioética Médica", "Patología del SNC", "Técnicas Quirúrgicas", "Farmacología Avanzada"]
            }
        ]
    },
    {
        id: "Dirección de Cine",
        name: "Dirección de Cine",
        description: "Liderazgo creativo en producciones audiovisuales.",
        relatedStyles: ["Creativo", "Conceptual"],
        universities: [
            {
                university: { name: "Centro de Capacitación Cinematográfica (CCC)", type: "Public", location: "CDMX", website: "https://elccc.com.mx" },
                plan: ["Guion Cinematográfico", "Dirección de Actores", "Montaje y Edición", "Lenguaje Visual"]
            },
            {
                university: { name: "ENAC (antes CUEC) - UNAM", type: "Public", location: "CDMX", website: "https://www.enac.unam.mx" },
                plan: ["Realización Documental", "Realización Ficción", "Fotografía", "Producción Ejecutiva"]
            },
            {
                university: { name: "CENTRO", type: "Private", location: "CDMX", website: "https://centro.edu.mx" },
                plan: ["Cine Digital", "Nuevas Narrativas", "Postproducción", "Dirección de Arte"]
            }
        ]
    },
    {
        id: "Capital de Riesgo (VC)",
        name: "Capital de Riesgo (VC)",
        description: "Finanzas aplicadas a startups y negocios emergentes.",
        relatedStyles: ["Intuitivo", "Analítico"],
        universities: [
            {
                university: { name: "ITAM", type: "Private", location: "CDMX", website: "https://ipade.mx" },
                plan: ["Valuación de Empresas", "Finanzas Corporativas", "Estrategia de Negocios", "Economía Global"]
            },
            {
                university: { name: "IPADE Business School", type: "Private", location: "CDMX / MTY", website: "https://ipade.mx" },
                plan: ["Venture Capital", "Private Equity", "Alta Dirección", "Emprendimiento"]
            }
        ]
    },
    {
        id: "Diseño UX/UI",
        name: "Diseño UX/UI",
        description: "Experiencia de usuario.",
        relatedStyles: ["Sistémico", "Emocional"],
        universities: [
            {
                university: { name: "UAM Azcapotzalco", type: "Public", location: "CDMX", website: "https://www.azc.uam.mx" },
                plan: ["Diseño de Comunicación Gráfica", "Psicología del Usuario", "Tipografía", "Tecnología Web"]
            },
            {
                university: { name: "CENTRO", type: "Private", location: "CDMX", website: "https://centro.edu.mx" },
                plan: ["Diseño de Interacción", "Prototipado", "Investigación de Usuarios", "Diseño Visual"]
            }
        ]
    },
    {
        id: "Arquitectura Sustentable",
        name: "Arquitectura Sustentable",
        description: "Diseño ecológico.",
        relatedStyles: ["Creativo", "Práctico"],
        universities: [
            {
                university: { name: "UNAM - Fac. Arquitectura", type: "Public", location: "CDMX", website: "https://arquitectura.unam.mx" },
                plan: ["Bioclimática", "Urbanismo", "Materiales Sostenibles", "Taller de Proyectos"]
            },
            {
                university: { name: "ITESO", type: "Private", location: "Guadalajara", website: "https://iteso.mx" },
                plan: ["Habitat y Desarrollo", "Construcción Ecológica", "Paisajismo", "Gestión Urbana"]
            }
        ]
    },
    {
        id: "Derecho Penal",
        name: "Derecho Penal",
        description: "Justicia criminal.",
        relatedStyles: ["Crítico", "Analítico"],
        universities: [
            {
                university: { name: "Escuela Libre de Derecho", type: "Private", location: "CDMX", website: "https://eld.edu.mx" },
                plan: ["Teoría del Delito", "Derecho Procesal Penal", "Criminología", "Derechos Humanos"]
            },
            {
                university: { name: "UNAM - Fac. Derecho", type: "Public", location: "CDMX", website: "https://derecho.unam.mx" },
                plan: ["Juicios Orales", "Derecho Constitucional", "Victimología", "Medicina Forense"]
            }
        ]
    }
];
