import { CognitiveStyle } from './questions';

export interface Career {
  name: string;
  description: string;
  salary: string;
  universities: string;
  weights: Record<CognitiveStyle, number>;
  /** Fuente del rango salarial. Sin fuente = rango de referencia interno. */
  salarySource?: string;
  /**
   * Carrera de alta concentración de matrícula (IMCO, Compara Carreras 2025).
   * `share` = % del total de personas con carrera en México que la estudiaron.
   */
  saturation?: { share: string; source: string };
}

/** Etiqueta única para cualquier rango salarial mostrado al usuario. */
export const SALARY_LABEL = 'Rango salarial de referencia (MXN/mes)';

export const careers: Career[] = [
  // --- TECH & ENGINEERING ---
  {
    name: "Ingeniería en Inteligencia Artificial",
    description: "Diseño de redes neuronales y sistemas autónomos.",
    salary: "$45,000 - $120,000",
    universities: "Tec de Monterrey, UNAM, IPN",
    weights: { 'Analítico': 3, 'Sistémico': 3, 'Abstracto': 2, 'Creativo': 1, 'Práctico': 2, 'Detallista': 1, 'Crítico': 2, 'Colaborativo': 0, 'Intuitivo': 1, 'Conceptual': 2, 'Emocional': 0, 'Reflexivo': 1 }
  },
  {
    name: "Ciberseguridad",
    description: "Protección de sistemas y análisis de vulnerabilidades.",
    salary: "$40,000 - $90,000",
    universities: "IPN, Tec de Monterrey, UNAM",
    weights: { 'Analítico': 3, 'Detallista': 3, 'Sistémico': 2, 'Crítico': 3, 'Práctico': 2, 'Abstracto': 1, 'Creativo': 1, 'Colaborativo': 1, 'Intuitivo': 1, 'Conceptual': 1, 'Emocional': 0, 'Reflexivo': 1 }
  },
  {
    name: "Desarrollo Full Stack",
    description: "Construcción completa de aplicaciones web.",
    salary: "$30,000 - $80,000",
    universities: "Platzi, Tec de Monterrey, Autónomo",
    weights: { 'Analítico': 2, 'Sistémico': 3, 'Creativo': 2, 'Práctico': 3, 'Abstracto': 1, 'Detallista': 2, 'Crítico': 1, 'Colaborativo': 1, 'Intuitivo': 0, 'Conceptual': 2, 'Emocional': 0, 'Reflexivo': 0 }
  },
  {
    name: "Ingeniería Mecatrónica",
    description: "Integración de mecánica, electrónica y sistemas de control.",
    salary: "$25,000 - $60,000",
    universities: "IPN, UNAM, Tec de Monterrey",
    weights: { 'Práctico': 3, 'Sistémico': 3, 'Analítico': 2, 'Detallista': 2, 'Creativo': 1, 'Abstracto': 1, 'Crítico': 1, 'Colaborativo': 1, 'Intuitivo': 0, 'Conceptual': 1, 'Emocional': 0, 'Reflexivo': 0 }
  },

  // --- HEALTH & SCIENCE ---
  {
    name: "Neurocirugía",
    description: "Cirugía especializada del sistema nervioso central.",
    salary: "$50,000 - $200,000",
    universities: "UNAM, Tec de Monterrey, La Salle",
    weights: { 'Detallista': 3, 'Práctico': 3, 'Analítico': 2, 'Sistémico': 2, 'Crítico': 2, 'Emocional': 1, 'Colaborativo': 1, 'Intuitivo': 1, 'Abstracto': 0, 'Conceptual': 1, 'Creativo': 0, 'Reflexivo': 1 }
  },
  {
    name: "Biología Marina",
    description: "Estudio de los ecosistemas oceánicos.",
    salary: "$15,000 - $40,000",
    universities: "UABCS, UNAM, U. de Guadalajara",
    weights: { 'Analítico': 2, 'Sistémico': 2, 'Reflexivo': 2, 'Detallista': 2, 'Práctico': 2, 'Abstracto': 1, 'Creativo': 0, 'Crítico': 1, 'Colaborativo': 1, 'Intuitivo': 1, 'Conceptual': 1, 'Emocional': 1 }
  },
  {
    name: "Psiquiatría",
    description: "Diagnóstico y tratamiento de trastornos mentales.",
    salary: "$30,000 - $80,000",
    universities: "UNAM, La Salle",
    weights: { 'Emocional': 3, 'Analítico': 2, 'Reflexivo': 3, 'Intuitivo': 2, 'Colaborativo': 1, 'Crítico': 2, 'Conceptual': 2, 'Sistémico': 1, 'Práctico': 1, 'Detallista': 1, 'Abstracto': 1, 'Creativo': 0 }
  },

  // --- ARTS & HUMANITIES ---
  {
    name: "Dirección de Cine",
    description: "Liderazgo artístico y técnico en producciones cinematográficas.",
    salary: "$20,000 - $100,000+",
    universities: "CCC, ENAC, Centro",
    weights: { 'Creativo': 3, 'Conceptual': 3, 'Intuitivo': 3, 'Colaborativo': 2, 'Emocional': 2, 'Sistémico': 1, 'Práctico': 1, 'Detallista': 1, 'Abstracto': 2, 'Analítico': 0, 'Crítico': 1, 'Reflexivo': 2 }
  },
  {
    name: "Arquitectura Sustentable",
    description: "Diseño de espacios eco-amigables y eficientes.",
    salary: "$25,000 - $70,000",
    universities: "UNAM, Ibero, ITESO",
    weights: { 'Creativo': 2, 'Práctico': 2, 'Sistémico': 3, 'Abstracto': 2, 'Detallista': 2, 'Conceptual': 2, 'Colaborativo': 1, 'Analítico': 1, 'Crítico': 1, 'Emocional': 1, 'Intuitivo': 1, 'Reflexivo': 1 }
  },
  {
    name: "Diseño UX/UI",
    description: "Diseño de experiencias digitales centradas en el usuario.",
    salary: "$25,000 - $65,000",
    universities: "Centro, UAM, Cursos Online",
    weights: { 'Emocional': 2, 'Sistémico': 2, 'Creativo': 2, 'Detallista': 2, 'Analítico': 1, 'Conceptual': 2, 'Colaborativo': 1, 'Práctico': 1, 'Intuitivo': 2, 'Crítico': 1, 'Reflexivo': 1, 'Abstracto': 0 }
  },

  // --- BUSINESS & LAW ---
  {
    name: "Capital de Riesgo (VC)",
    description: "Inversión en startups de alto potencial.",
    salary: "$40,000 - $150,000",
    universities: "ITAM, Tec de Monterrey, IPADE",
    weights: { 'Intuitivo': 3, 'Analítico': 3, 'Crítico': 3, 'Conceptual': 2, 'Sistémico': 2, 'Colaborativo': 1, 'Práctico': 1, 'Abstracto': 1, 'Creativo': 1, 'Detallista': 1, 'Emocional': 0, 'Reflexivo': 1 }
  },
  {
    name: "Derecho Penal",
    description: "Defensa o acusación en procesos criminales.",
    salary: "$20,000 - $90,000",
    universities: "Libre de Derecho, UNAM, Panamericana",
    weights: { 'Crítico': 3, 'Analítico': 2, 'Colaborativo': 0, 'Reflexivo': 2, 'Abstracto': 2, 'Sistémico': 1, 'Práctico': 1, 'Detallista': 1, 'Conceptual': 2, 'Emocional': 1, 'Intuitivo': 1, 'Creativo': 1 }
  },
  {
    name: "Emprendimiento Social",
    description: "Creación de empresas con impacto positivo.",
    salary: "Variable",
    universities: "Tec de Monterrey, Ibero",
    weights: { 'Sistémico': 2, 'Colaborativo': 3, 'Emocional': 2, 'Creativo': 3, 'Práctico': 3, 'Intuitivo': 2, 'Conceptual': 2, 'Reflexivo': 1, 'Analítico': 1, 'Crítico': 1, 'Abstracto': 1, 'Detallista': 0 }
  },

  // --- MORE NICHE ---
  {
    name: "Filósofo / Investigador Académico",
    description: "Producción de conocimiento teórico profundo.",
    salary: "$20,000 - $50,000",
    universities: "UNAM, UAM, Colmex",
    weights: { 'Abstracto': 3, 'Reflexivo': 3, 'Conceptual': 3, 'Crítico': 3, 'Analítico': 2, 'Detallista': 0, 'Práctico': 0, 'Sistémico': 1, 'Colaborativo': 0, 'Emocional': 0, 'Intuitivo': 1, 'Creativo': 1 }
  },
  {
    name: "Piloto Aviador",
    description: "Operación de aeronaves comerciales.",
    salary: "$40,000 - $100,000",
    universities: "Escuela de Aviación México",
    weights: { 'Práctico': 3, 'Sistémico': 3, 'Detallista': 3, 'Analítico': 2, 'Emocional': 1, 'Colaborativo': 1, 'Crítico': 1, 'Intuitivo': 1, 'Conceptual': 0, 'Abstracto': 0, 'Reflexivo': 0, 'Creativo': 0 }
  },

  // --- CARRERAS DE ALTA SATURACIÓN (las 5 más estudiadas desde 2005, IMCO) ---
  // Rango salarial = percentil 25 a percentil 75 de quienes la estudiaron,
  // según IMCO Compara Carreras 2025 (datos ENOE, INEGI).
  {
    name: "Licenciatura en Derecho",
    description: "Asesoría, litigio y negociación en materia civil, mercantil, laboral y pública.",
    salary: "$12,950 - $27,358",
    universities: "UNAM, Escuela Libre de Derecho, ITAM",
    weights: { 'Crítico': 3, 'Reflexivo': 2, 'Analítico': 2, 'Conceptual': 2, 'Colaborativo': 2, 'Detallista': 2, 'Emocional': 1, 'Práctico': 1, 'Sistémico': 1, 'Abstracto': 1, 'Intuitivo': 1, 'Creativo': 1 },
    salarySource: "IMCO Compara Carreras 2025 · https://comparacarreras.imco.org.mx/derecho/",
    saturation: { share: "8.7%", source: "https://comparacarreras.imco.org.mx/derecho/" }
  },
  {
    name: "Administración de Empresas",
    description: "Dirección de operaciones, finanzas y personas dentro de una organización.",
    salary: "$13,194 - $26,386",
    universities: "UNAM, IPN, Tec de Monterrey",
    weights: { 'Práctico': 3, 'Colaborativo': 3, 'Sistémico': 2, 'Analítico': 2, 'Intuitivo': 2, 'Detallista': 1, 'Crítico': 1, 'Emocional': 1, 'Conceptual': 1, 'Creativo': 1, 'Reflexivo': 0, 'Abstracto': 0 },
    salarySource: "IMCO Compara Carreras 2025 · https://comparacarreras.imco.org.mx/administraci%C3%B3n_de_empresas/",
    saturation: { share: "8.0%", source: "https://comparacarreras.imco.org.mx/administraci%C3%B3n_de_empresas/" }
  },
  {
    name: "Contaduría Pública",
    description: "Registro, auditoría y fiscalización de la información financiera.",
    salary: "$12,914 - $25,901",
    universities: "UNAM, IPN, ITAM",
    weights: { 'Detallista': 3, 'Analítico': 3, 'Práctico': 2, 'Sistémico': 2, 'Crítico': 2, 'Colaborativo': 1, 'Reflexivo': 1, 'Conceptual': 0, 'Abstracto': 0, 'Creativo': 0, 'Intuitivo': 0, 'Emocional': 0 },
    salarySource: "IMCO Compara Carreras 2025 · https://comparacarreras.imco.org.mx/contabilidad_y_fiscalizaci%C3%B3n/",
    saturation: { share: "7.7%", source: "https://comparacarreras.imco.org.mx/contabilidad_y_fiscalizaci%C3%B3n/" }
  },
  {
    name: "Psicología",
    description: "Evaluación e intervención en conducta, aprendizaje y bienestar de las personas.",
    salary: "$11,878 - $22,145",
    universities: "UNAM, UAM, Ibero",
    weights: { 'Emocional': 3, 'Reflexivo': 3, 'Colaborativo': 2, 'Intuitivo': 2, 'Analítico': 2, 'Conceptual': 1, 'Crítico': 1, 'Sistémico': 1, 'Abstracto': 1, 'Creativo': 1, 'Detallista': 1, 'Práctico': 1 },
    salarySource: "IMCO Compara Carreras 2025 · https://comparacarreras.imco.org.mx/psicolog%C3%ADa/",
    saturation: { share: "4.2%", source: "https://comparacarreras.imco.org.mx/psicolog%C3%ADa/" }
  },
  {
    name: "Ingeniería Industrial",
    description: "Diseño y mejora de procesos productivos, logística y calidad.",
    salary: "$14,432 - $31,291",
    universities: "IPN, UNAM, Tec de Monterrey",
    weights: { 'Sistémico': 3, 'Práctico': 3, 'Analítico': 2, 'Detallista': 2, 'Colaborativo': 2, 'Crítico': 1, 'Conceptual': 1, 'Creativo': 1, 'Abstracto': 1, 'Intuitivo': 0, 'Emocional': 0, 'Reflexivo': 0 },
    salarySource: "IMCO Compara Carreras 2025 · https://comparacarreras.imco.org.mx/ingenier%C3%ADa_industrial/",
    saturation: { share: "4.3%", source: "https://comparacarreras.imco.org.mx/ingenier%C3%ADa_industrial/" }
  }
];