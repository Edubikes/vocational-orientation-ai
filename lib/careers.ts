import { CognitiveStyle } from './questions';

export interface Career {
  name: string;
  description: string;
  salary: string;
  universities: string;
  weights: Record<CognitiveStyle, number>;
}

export const careers: Career[] = [
  {
    "name": "Ingeniería en Sistemas Computacionales",
    "description": "Diseño, programación y optimización de software, hardware y redes.",
    "salary": "30000-50000",
    "universities": "UNAM, IPN, Tec de Monterrey, UDLAP",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ingeniería Aeroespacial",
    "description": "Diseño, fabricación y mantenimiento de aeronaves y naves espaciales.",
    "salary": "35000-60000",
    "universities": "UNAM, IPN",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 3,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ingeniería Civil",
    "description": "Diseño, construcción y mantenimiento de infraestructura (edificios, puentes, etc.).",
    "salary": "25000-45000",
    "universities": "UNAM, IPN, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Licenciatura en Música",
    "description": "Formación integral en teoría musical, interpretación, composición e historia.",
    "salary": "8000-15000 (músico) / 12000-25000 (docente)",
    "universities": "UDLAP",
    "weights": {
      "Analítico": 1,
      "Creativo": 3,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 3,
      "Emocional": 3,
      "Sistémico": 1,
      "Reflexivo": 2
    }
  },
  {
    "name": "Artes Visuales",
    "description": "Creación y expresión a través de diversas formas de arte visual (pintura, escultura, etc.).",
    "salary": "8000-15000 (artista) / 10000-20000 (docente/gestor)",
    "universities": "UNAM, UDLAP",
    "weights": {
      "Analítico": 2,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 3,
      "Emocional": 3,
      "Sistémico": 1,
      "Reflexivo": 2
    }
  },
  {
    "name": "Danza",
    "description": "Formación y expresión artística a través del movimiento corporal y la coreografía.",
    "salary": "8000-15000 (bailarín) / 10000-20000 (docente/coreógrafo)",
    "universities": "UNAM, UDLAP",
    "weights": {
      "Analítico": 1,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 3,
      "Emocional": 3,
      "Sistémico": 1,
      "Reflexivo": 2
    }
  },
  {
    "name": "Teatro",
    "description": "Formación y expresión artística a través de la interpretación y producción escénica.",
    "salary": "8000-15000 (actor) / 10000-20000 (director/docente)",
    "universities": "UNAM, UDLAP",
    "weights": {
      "Analítico": 1,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 3,
      "Emocional": 3,
      "Sistémico": 1,
      "Reflexivo": 2
    }
  },
  {
    "name": "Mercadotecnia",
    "description": "Comprender el comportamiento del consumidor, desarrollar e implementar estrategias de marketing.",
    "salary": "15000-30000",
    "universities": "UNILA, UNAM",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Administración de Empresas",
    "description": "Gestión estratégica de recursos, operaciones y estrategias organizacionales.",
    "salary": "12000-25000",
    "universities": "UNACH, IPN, UDLAP, Udelprado, Onmex, Tec de Monterrey",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Contaduría Pública",
    "description": "Registro, análisis e informe de transacciones financieras.",
    "salary": "12000-22000",
    "universities": "UNACH, IPN, UDLAP, Udelprado, Onmex, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Negocios Internacionales",
    "description": "Comercio global, regulaciones comerciales internacionales y estrategias transculturales.",
    "salary": "15000-30000",
    "universities": "UNACH, UNAM, IPN, UDLAP, Udelprado, Tec de Monterrey",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Pedagogía",
    "description": "Estudio de la educación y formación de docentes y procesos de enseñanza-aprendizaje.",
    "salary": "10000-18000",
    "universities": "UNAM, UDLAP, Onmex, UNACH",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Innovación Educativa",
    "description": "Diseño y aplicación de nuevas metodologías y tecnologías en la educación.",
    "salary": "12000-22000",
    "universities": "UNAM, UDLAP, Onmex, UNACH",
    "weights": {
      "Analítico": 2,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Formación Docente",
    "description": "Preparación de profesionales para la enseñanza en distintos niveles educativos.",
    "salary": "10000-18000",
    "universities": "UNAM, UDLAP, Onmex, UNACH",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Gestión Turística",
    "description": "Gestión de servicios turísticos, hotelería y planificación de destinos.",
    "salary": "10000-18000",
    "universities": "UNACH, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 1,
      "Reflexivo": 1
    }
  },
  {
    "name": "Artes Culinarias",
    "description": "Preparación, creación y gestión de alimentos y experiencias gastronómicas.",
    "salary": "9000-18000",
    "universities": "UNACH, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 1,
      "Creativo": 3,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 1,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 1,
      "Reflexivo": 1
    }
  },
  {
    "name": "Banca e Inversiones",
    "description": "Análisis financiero, gestión de carteras y estrategias de inversión.",
    "salary": "15000-35000",
    "universities": "UNACH, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Logística y Cadena de Suministros",
    "description": "Planificación, implementación y control del flujo eficiente de bienes y servicios.",
    "salary": "15000-30000",
    "universities": "UNACH, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Contabilidad",
    "description": "Registro financiero, análisis de datos y cumplimiento fiscal.",
    "salary": "10000-16000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Electrónica",
    "description": "Fabricación, reparación de equipos electrónicos y mantenimiento industrial.",
    "salary": "10000-18000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Diseño Gráfico",
    "description": "Diseño visual, software de diseño, creatividad y composición.",
    "salary": "9000-16000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 2,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 1,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Turismo",
    "description": "Gestión turística, hotelería y atención al cliente.",
    "salary": "8000-15000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 1,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 2,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 1,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ingeniería Mecatrónica",
    "description": "Integra mecánica, electrónica e informática para diseñar máquinas inteligentes.",
    "salary": "28000-48000",
    "universities": "IPN, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 3,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ingeniería Química",
    "description": "Diseño y optimización de procesos químicos y conversión de energía.",
    "salary": "27000-47000",
    "universities": "IPN, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Mecánica Automotriz",
    "description": "Reparación y mantenimiento de vehículos, diagnóstico de fallas.",
    "salary": "10000-18000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Informática",
    "description": "Soporte técnico, programación básica y mantenimiento de redes.",
    "salary": "10000-18000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Electricidad",
    "description": "Instalaciones eléctricas, mantenimiento industrial y seguridad eléctrica.",
    "salary": "10000-18000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Construcción",
    "description": "Procesos constructivos, supervisión de obras y seguridad en construcción.",
    "salary": "10000-18000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico Operador de Maquinaria Pesada",
    "description": "Conducción y operación de maquinaria, seguridad y mantenimiento básico.",
    "salary": "12000-20000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 1,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 1,
      "Detallista": 2,
      "Conceptual": 1,
      "Intuitivo": 3,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Refrigeración y Climatización",
    "description": "Instalación y mantenimiento de sistemas de aire acondicionado y refrigeración.",
    "salary": "10000-18000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Técnico en Telecomunicaciones",
    "description": "Instalación y mantenimiento de sistemas y redes de comunicación.",
    "salary": "12000-20000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ciencia de Datos e Inteligencia Artificial (Técnica)",
    "description": "Análisis de datos, machine learning y procesamiento de datos.",
    "salary": "15000-30000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Pilotaje de Drones (Técnica)",
    "description": "Operación y pilotaje de drones para diversas aplicaciones.",
    "salary": "10000-20000",
    "universities": "CONALEP",
    "weights": {
      "Analítico": 1,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 1,
      "Detallista": 2,
      "Conceptual": 1,
      "Intuitivo": 3,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ingeniero Agrónomo",
    "description": "Estudio y aplicación de la ciencia y tecnología en la producción agrícola.",
    "salary": "12000-22000",
    "universities": "UNACH, UNAM, Tec de Monterrey",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Medicina Veterinaria y Zootecnia",
    "description": "Salud y bienestar de animales, producción pecuaria y salud pública.",
    "salary": "12000-25000",
    "universities": "UNAM, Tec de Monterrey",
    "weights": {
      "Analítico": 2,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Ingeniería en Biosistemas Agroalimentarios",
    "description": "Diseño y optimización de sistemas en la cadena de producción de alimentos.",
    "salary": "15000-28000",
    "universities": "UNACH, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Educación",
    "description": "Estudio y aplicación de la teoría y práctica pedagógica.",
    "salary": "10000-18000",
    "universities": "UNAM, UDLAP, Onmex, UNACH",
    "weights": {
      "Analítico": 2,
      "Creativo": 2,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Médico Cirujano",
    "description": "Diagnóstico, tratamiento y prevención de enfermedades, atención integral al paciente.",
    "salary": "18000-35000 (residente) / 35000-80000+ (especialista)",
    "universities": "UNAM, IPN, Tec de Monterrey, UDLAP, UNACH, CONALEP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Enfermería General",
    "description": "Provisión de cuidados de enfermería generales y atención integral al paciente.",
    "salary": "12000-20000",
    "universities": "UNAM, IPN, Tec de Monterrey, UDLAP, UNACH, CONALEP",
    "weights": {
      "Analítico": 2,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Licenciatura en Nutrición",
    "description": "Nutrición humana, dietética y bienestar integral a través de la alimentación.",
    "salary": "10000-18000",
    "universities": "IPN, Tec de Monterrey, UDLAP",
    "weights": {
      "Analítico": 2,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Licenciatura en Odontología",
    "description": "Diagnóstico y tratamiento de afecciones de salud bucal y atención preventiva.",
    "salary": "15000-25000",
    "universities": "IPN, UDLAP, UNAM",
    "weights": {
      "Analítico": 2,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 1,
      "Reflexivo": 2
    }
  },
  {
    "name": "Licenciatura en Químico Farmacobiólogo",
    "description": "Desarrollo de medicamentos, control de calidad, análisis farmacéutico y laboratorio clínico.",
    "salary": "18000-30000",
    "universities": "UNACH, UDLAP, IPN",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Gerontología",
    "description": "Estudio y atención integral de la salud y el bienestar de las personas mayores.",
    "salary": "10000-18000",
    "universities": "UNAM, IPN, Tec de Monterrey, UDLAP",
    "weights": {
      "Analítico": 2,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 1,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Derecho",
    "description": "Interpretación y aplicación de normas jurídicas.",
    "salary": "15000-30000 (recién egresado) / 30000-80000+ (con experiencia)",
    "universities": "UNAM, IPN, Tec de Monterrey, UDLAP, UNACH, Udelprado, Onmex",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 1,
      "Intuitivo": 1,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Licenciatura en Antropología Social",
    "description": "Estudio sistemático de sociedades y culturas humanas, sus orígenes y diversidad.",
    "salary": "10000-18000",
    "universities": "UNACH, UDLAP",
    "weights": {
      "Analítico": 2,
      "Creativo": 1,
      "Práctico": 1,
      "Abstracto": 3,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Diseño Gráfico",
    "description": "Creación de soluciones de comunicación visual para diversos medios.",
    "salary": "10000-20000",
    "universities": "UNAM, Tec de Monterrey, UDLAP",
    "weights": {
      "Analítico": 2,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 1,
      "Reflexivo": 2
    }
  },
  {
    "name": "Licenciatura en Letras Hispánicas",
    "description": "Estudio profundo de la lengua española, literatura y análisis cultural.",
    "salary": "9000-16000",
    "universities": "UNACH, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 1,
      "Abstracto": 2,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Licenciatura en Psicología Clínica",
    "description": "Evaluación e intervención psicológica en salud mental.",
    "salary": "8000-15000",
    "universities": "UDLAP, Universidad Iberoamericana, UAEM",
    "weights": {
      "Analítico": 1,
      "Creativo": 3,
      "Práctico": 1,
      "Abstracto": 3,
      "Crítico": 3,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 3,
      "Intuitivo": 1,
      "Emocional": 3,
      "Sistémico": 1,
      "Reflexivo": 3
    }
  },
  {
    "name": "Administración Financiera",
    "description": "Gestión estratégica de recursos económicos en empresas.",
    "salary": "15000-30000",
    "universities": "UNACH, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Diseño UX/UI",
    "description": "Diseño de interfaces digitales intuitivas y atractivas.",
    "salary": "15000-30000",
    "universities": "UNACH, UDLAP, Tec de Monterrey",
    "weights": {
      "Analítico": 2,
      "Creativo": 3,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 2
    }
  },
  {
    "name": "Arquitectura",
    "description": "Diseño y desarrollo de espacios arquitectónicos sostenibles y funcionales.",
    "salary": "20000-40000",
    "universities": "UNAM, IPN, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 3,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 3,
      "Intuitivo": 1,
      "Emocional": 2,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ingeniería Industrial",
    "description": "Optimización de procesos industriales y sistemas productivos.",
    "salary": "20000-40000",
    "universities": "UNAM, IPN, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 2
    }
  },
  {
    "name": "Mercadotecnia Digital",
    "description": "Estrategias de marketing en entornos digitales y redes sociales.",
    "salary": "15000-30000",
    "universities": "UNILA, UNAM",
    "weights": {
      "Analítico": 2,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 1,
      "Crítico": 2,
      "Colaborativo": 3,
      "Detallista": 1,
      "Conceptual": 2,
      "Intuitivo": 2,
      "Emocional": 3,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Licenciatura en Ciencias de la Computación",
    "description": "Explora las bases teóricas de la computación y desarrollo tecnológico.",
    "salary": "25000-40000",
    "universities": "UNAM, Cinvestav, ITAM",
    "weights": {
      "Analítico": 3,
      "Creativo": 3,
      "Práctico": 2,
      "Abstracto": 3,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 3,
      "Intuitivo": 3,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 2
    }
  },
  {
    "name": "Contaduría Pública",
    "description": "Registro y análisis contable en contextos empresariales y fiscales.",
    "salary": "12000-25000",
    "universities": "UNACH, IPN, UDLAP",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 1
    }
  },
  {
    "name": "Ingeniería Eléctrica",
    "description": "Diseño y manejo de sistemas eléctrico avanzados.",
    "salary": "25000-45000",
    "universities": "IPN, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 1
    }
  },
  {
    "name": "Licenciatura en Arqueología",
    "description": "Investigación y estudio de civilizaciones pasadas mediante restos materiales.",
    "salary": "10000-18000",
    "universities": "UNAM, UDLAP",
    "weights": {
      "Analítico": 2,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 3,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 3,
      "Intuitivo": 2,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Biología",
    "description": "Estudio de los seres vivos y sus procesos biológicos.",
    "salary": "12000-20000",
    "universities": "UNAM, IPN, UAEM",
    "weights": {
      "Analítico": 3,
      "Creativo": 1,
      "Práctico": 2,
      "Abstracto": 3,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 3,
      "Intuitivo": 2,
      "Emocional": 1,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Ingeniería en Energías Renovables",
    "description": "Desarrollo y gestión de tecnologías energéticas sostenibles.",
    "salary": "18000-35000",
    "universities": "UNAM, IPN, Tec de Monterrey",
    "weights": {
      "Analítico": 3,
      "Creativo": 2,
      "Práctico": 3,
      "Abstracto": 3,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 3,
      "Conceptual": 3,
      "Intuitivo": 1,
      "Emocional": 1,
      "Sistémico": 3,
      "Reflexivo": 2
    }
  },
  {
    "name": "Licenciatura en Filosofía",
    "description": "Estudio crítico de ideas fundamentales sobre la existencia, ética y conocimiento.",
    "salary": "8000-15000",
    "universities": "UNAM, UDLAP",
    "weights": {
      "Analítico": 3,
      "Creativo": 3,
      "Práctico": 1,
      "Abstracto": 3,
      "Crítico": 3,
      "Colaborativo": 2,
      "Detallista": 1,
      "Conceptual": 3,
      "Intuitivo": 3,
      "Emocional": 2,
      "Sistémico": 2,
      "Reflexivo": 3
    }
  },
  {
    "name": "Diseño Industrial",
    "description": "Diseño de productos útiles, funcionales y estéticamente agradables.",
    "salary": "15000-30000",
    "universities": "UNAM, UDLAP, UANL",
    "weights": {
      "Analítico": 2,
      "Creativo": 3,
      "Práctico": 3,
      "Abstracto": 2,
      "Crítico": 2,
      "Colaborativo": 2,
      "Detallista": 2,
      "Conceptual": 2,
      "Intuitivo": 1,
      "Emocional": 2,
      "Sistémico": 3,
      "Reflexivo": 2
    }
  }
];