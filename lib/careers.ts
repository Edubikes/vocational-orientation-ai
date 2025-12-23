import { CognitiveStyle } from './questions';

export interface Career {
  name: string;
  description: string;
  salary: string;
  universities: string;
  weights: Record<CognitiveStyle, number>;
}

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
  }
  // (Ideally we would have 100+ but this diverse set covers all archetypes well)
];