/**
 * Datos públicos usados en el copy. Cada cifra lleva su fuente; si una cifra
 * no está aquí, no se publica.
 */
export const FACTS = {
  concentracion: {
    text: '46% de la matrícula universitaria en México está en 10 carreras tradicionales',
    source: 'IMCO, Compara Carreras 2025',
    url: 'https://imco.org.mx/compara-carreras-2025/',
  },
  sinPlan: {
    text: '3 de cada 10 jóvenes carecen de un plan de carrera (OCDE)',
    source: 'IMCO con datos de la OCDE, 2025',
    url: 'https://imco.org.mx/compara-carreras-2025/',
  },
  demanda: {
    text: 'Administración, Ingeniería industrial, Derecho, Psicología y Contabilidad predominan desde 2005; algunas podrían perder hasta 25% de su demanda laboral en 5 años',
    source: 'IMCO, Compara Carreras 2025',
    url: 'https://imco.org.mx/compara-carreras-2025/',
  },
  cinco: {
    // 8.7 + 8.0 + 7.7 + 4.2 + 4.3 = 32.9% (fichas por carrera de IMCO)
    text: '32.9% de las personas con carrera en México estudió una de esas 5',
    source: 'IMCO Compara Carreras, fichas de Derecho, Administración de empresas, Contabilidad y fiscalización, Psicología e Ingeniería industrial',
    url: 'https://comparacarreras.imco.org.mx/',
  },
  abandonoPrivadas: {
    text: 'Abandono en educación superior: 7.2% (6.4% públicas, 9.6% privadas), ciclo 2022-2023',
    source: 'SEP, vía La Jornada (2 feb 2024)',
    url: 'https://www.jornada.com.mx/2024/02/02/politica/013n1pol',
  },
} as const;

export const SOURCES_LIST = [FACTS.concentracion, FACTS.sinPlan, FACTS.demanda, FACTS.cinco, FACTS.abandonoPrivadas];
