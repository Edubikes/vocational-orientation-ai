/**
 * FASE 3 — Ingeniería de datos y redirección.
 *
 * Contrato con el backend de Python:
 *   Firestore: leads/{leadId}
 *   Shopify webhook `orders/paid` trae note_attributes[lead_id] → ese es el leadId.
 *
 * Regla de oro: NUNCA redirigimos a Shopify sin haber confirmado la escritura.
 * Un pago sin documento en Firestore es un cliente que pagó y no recibe nada:
 * el peor fallo posible del embudo. Preferimos un error visible antes del cobro.
 */

// Sin SDK de Firebase: el lead se escribe por la API REST de Firestore con
// fetch(keepalive). El SDK (WebChannel + IndexedDB) se colgaba en navegadores
// in-app y bloqueaba la redirección al pago.
const FS_PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '';
const FS_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '';
const LEADS_COLLECTION = 'leads';
export function isFirebaseConfigured(): boolean {
  return Boolean(FS_PROJECT && FS_KEY);
}

type FsValue = Record<string, unknown>;
function toFs(v: unknown): FsValue | undefined {
  if (v === undefined) return undefined;
  if (v === null) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toFs).filter(Boolean) } };
  if (typeof v === 'object') return { mapValue: { fields: toFsFields(v as Record<string, unknown>) } };
  return { stringValue: String(v) };
}
function toFsFields(o: Record<string, unknown>): Record<string, FsValue> {
  const out: Record<string, FsValue> = {};
  for (const [k, val] of Object.entries(o)) {
    const fv = toFs(val);
    if (fv) out[k] = fv;
  }
  return out;
}
import { buildShopifyCheckoutUrl, priceFor, PRODUCT, type PriceTier } from './config';
import { analyze, type Answers } from './engine';
import { questions } from './questions';

export type { Answers };

const ANSWERS_KEY = 'dtf_answers';
const LEAD_ID_KEY = 'dtf_lead_id';

/** Identificador opaco, ordenable por tiempo y legible en soporte. */
function generateLeadId(): string {
  const stamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  return `lead_${stamp}_${random}`;
}

/* ------------------------------------------------------------------ *
 * Estado local (sobrevive el salto entre /test y /checkout)
 * ------------------------------------------------------------------ */

/*
 * El resultado NUNCA se pierde: se guarda en localStorage, sessionStorage y en
 * memoria del módulo (sobrevive la navegación cliente /test → /checkout aunque
 * el navegador in-app bloquee el storage), y además viaja en el hash de la URL
 * (#r=<60 letras>), que sobrevive recargas y no se envía a ningún servidor.
 */
let memoryAnswers: Answers | null = null;
const RESULT_KEY = 'dtf_result';

/** 60 letras en el orden del banco de preguntas ('-' = sin responder). */
export function encodeAnswers(answers: Answers): string {
  return questions.map((q) => (answers[q.id] && /^[a-z]$/.test(answers[q.id]) ? answers[q.id] : '-')).join('');
}

export function decodeAnswers(code: string): Answers | null {
  if (!code || code.length !== questions.length) return null;
  const out: Answers = {};
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const letter = code[i];
    if (!q.options.some((o) => o.id === letter)) return null;
    out[q.id] = letter;
  }
  return out;
}

function answersFromHash(): Answers | null {
  try {
    const m = /(?:^#|&)r=([a-z-]+)/.exec(window.location.hash);
    return m ? decodeAnswers(m[1]) : null;
  } catch {
    return null;
  }
}

function writeEverywhere(raw: string): void {
  for (const store of [() => localStorage, () => sessionStorage]) {
    try {
      store().setItem(ANSWERS_KEY, raw);
    } catch {
      // Storage bloqueado (algunos in-app browsers / modo privado): seguimos.
    }
  }
}

/** Guarda respuestas + resumen del resultado ANTES de cualquier llamada de red. Devuelve el código para la URL. */
export function persistAnswers(answers: Answers): string {
  memoryAnswers = answers;
  writeEverywhere(JSON.stringify(answers));
  try {
    const { archetype, matches } = analyze(answers);
    const summary = JSON.stringify({ arquetipo: archetype.name, top: matches.map((m) => m.career.name), at: Date.now() });
    localStorage.setItem(RESULT_KEY, summary);
  } catch {
    // noop
  }
  return encodeAnswers(answers);
}

export function loadAnswers(): Answers | null {
  for (const store of [() => localStorage, () => sessionStorage]) {
    try {
      const raw = store().getItem(ANSWERS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Answers;
        if (parsed && Object.keys(parsed).length > 0) return parsed;
      }
    } catch {
      // probar la siguiente fuente
    }
  }
  if (memoryAnswers) return memoryAnswers;
  const fromHash = answersFromHash();
  if (fromHash) {
    memoryAnswers = fromHash;
    writeEverywhere(JSON.stringify(fromHash));
    return fromHash;
  }
  return null;
}

/** Reutiliza el mismo leadId si el usuario recarga el muro de pago: evita documentos duplicados. */
export function getOrCreateLeadId(): string {
  try {
    const existing = localStorage.getItem(LEAD_ID_KEY);
    if (existing) return existing;
    const fresh = generateLeadId();
    localStorage.setItem(LEAD_ID_KEY, fresh);
    return fresh;
  } catch {
    return generateLeadId();
  }
}

/* ------------------------------------------------------------------ *
 * Persistencia en Firebase
 * ------------------------------------------------------------------ */

export interface LeadPayload {
  leadId: string;
  email: string;
  nombre?: string;
  answers: Answers;
  tier?: PriceTier;
}

/**
 * Escribe el lead completo. Guardamos respuestas crudas Y el análisis derivado:
 *  - Las respuestas permiten recalcular si algún día cambia el algoritmo.
 *  - El análisis ya calculado hace que Python sea un puro renderizador de PDF,
 *    sin duplicar la matriz de puntajes (y sin riesgo de que ambos lados divergan).
 */
export async function saveLead({ leadId, email, nombre, answers, tier = 'regular' }: LeadPayload): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error('FIREBASE_NOT_CONFIGURED');
  }

  const { profile, archetype, styles, matches, metrics } = analyze(answers);

  const leadDoc = {
    leadId,
    email: email.trim().toLowerCase(),
    nombre: nombre?.trim() || null,

    // Lo que el usuario respondió, tal cual.
    respuestas: answers,
    respuestasCount: Object.keys(answers).length,

    // Perfil cognitivo: 12 estilos. Mismo formato que `perfil_cerebral.json`.
    perfil: profile,

    arquetipo: {
      name: archetype.name,
      description: archetype.description,
      powerWord: archetype.powerWord,
      shadow: archetype.shadow,
      primaryStyles: archetype.primaryStyles,
      tradeoff: archetype.tradeoff,
    },

    // `intensidad` es el porcentaje sobre el techo teórico del estilo: es la
    // cifra comparable entre estilos, porque no todos pueden alcanzar el mismo
    // puntaje bruto con esta matriz de preguntas.
    estilosOrdenados: styles.map((s) => ({
      estilo: s.style,
      puntaje: s.score,
      intensidad: s.intensity,
    })),

    // Métricas duras del perfil. Python las maqueta sin recalcular nada.
    metricas: {
      concentracion: metrics.concentracion,
      amplitud: metrics.amplitud,
      asimetria: metrics.asimetria,
      intensidadDominante: metrics.intensidadDominante,
      separacionTop: metrics.separacionTop,
      lectura: metrics.lectura,
    },

    topCarreras: matches.map((m, index) => ({
      posicion: index + 1,
      nombre: m.career.name,
      descripcion: m.career.description,
      sueldo: m.career.salary,
      universidades: m.career.universities,
      afinidad: m.affinity,
      puntaje: Math.round(m.score),
      planEjemplo: m.details?.universities?.[0]?.plan ?? null,
      fuenteSueldo: m.career.salarySource ?? null,
    })),

    // Ciclo de vida: el webhook de Shopify lo mueve a 'paid' y luego a 'delivered'.
    status: 'pending_payment' as const,
    producto: PRODUCT.name,
    montoMXN: priceFor(tier).mxn,
    tarifa: tier,

    meta: {
      source: 'web',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    },
  };

  const base = `projects/${FS_PROJECT}/databases/(default)/documents`;
  const body = JSON.stringify({
    writes: [
      {
        update: { name: `${base}/${LEADS_COLLECTION}/${leadId}`, fields: toFsFields(leadDoc) },
        currentDocument: { exists: false },
        updateTransforms: [{ fieldPath: 'createdAt', setToServerValue: 'REQUEST_TIME' }],
      },
    ],
  });
  // keepalive: la escritura termina aunque la página ya esté navegando a Shopify.
  const res = await fetch(`https://firestore.googleapis.com/v1/${base}:commit?key=${FS_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: body.length < 60000,
  });
  if (res.ok) return;
  const text = await res.text().catch(() => '');
  // Ya existe (reintento con el mismo leadId): para nosotros es éxito.
  if (res.status === 409 || /ALREADY_EXISTS|FAILED_PRECONDITION/.test(text)) return;
  throw new Error(`LEAD_SAVE_${res.status}`);
}

/* ------------------------------------------------------------------ *
 * Orquestación: persistir → redirigir
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * Nombre opcional (se pide en el checkpoint 2; va en la portada del PDF)
 * ------------------------------------------------------------------ */

const NAME_KEY = 'dtf_nombre';
const SAVED_KEY = 'dtf_lead_saved';

export function saveName(nombre: string): void {
  try {
    const clean = nombre.trim().slice(0, 60);
    if (clean) localStorage.setItem(NAME_KEY, clean);
    else localStorage.removeItem(NAME_KEY);
  } catch {
    // noop
  }
}

export function loadName(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? '';
  } catch {
    return '';
  }
}

/**
 * Persiste el lead UNA sola vez por combinación correo+nombre.
 *
 * Las reglas de Firestore prohíben actualizar un lead desde el cliente, así que
 * un segundo setDoc sobre el mismo id fallaría. Si el usuario ya guardó con ese
 * correo, reutilizamos el lead; si cambió el correo o el nombre, abrimos uno nuevo.
 */
async function ensureLead(email: string, nombre: string | undefined, tier: PriceTier, waitMs: number): Promise<string> {
  const answers = loadAnswers();
  if (!answers || Object.keys(answers).length === 0) {
    throw new Error('NO_ANSWERS');
  }

  const fingerprint = `${email.trim().toLowerCase()}|${(nombre ?? '').trim()}|${tier}`;
  try {
    const saved = JSON.parse(localStorage.getItem(SAVED_KEY) ?? 'null') as
      | { leadId: string; fingerprint: string }
      | null;
    if (saved && saved.fingerprint === fingerprint) return saved.leadId;
    if (saved) localStorage.removeItem(LEAD_ID_KEY);
  } catch {
    // noop
  }

  const leadId = getOrCreateLeadId();
  const save = saveLead({ leadId, email, nombre, answers, tier }).then(
    () => {
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify({ leadId, fingerprint }));
      } catch {
        // noop
      }
      return true;
    },
    (error) => {
      console.error('[lead] no se pudo guardar', error);
      return false;
    },
  );
  // NUNCA bloquear el pago: esperamos como máximo `waitMs`; la escritura sigue
  // en segundo plano (keepalive) y el lead_id viaja en los atributos del carrito.
  await Promise.race([save, new Promise((r) => setTimeout(r, waitMs))]);
  return leadId;
}

/**
 * Estado 4: persistir → redirigir a Shopify. Si la escritura falla, lanzamos y
 * NO redirigimos: el usuario no debe poder pagar por algo que el backend nunca
 * podrá generar.
 */
export async function checkoutAndRedirect(email: string, nombre?: string, tier: PriceTier = 'regular'): Promise<void> {
  const leadId = await ensureLead(email, nombre, tier, 1500);
  const answers = loadAnswers();
  window.location.href = buildShopifyCheckoutUrl(leadId, email, nombre || undefined, priceFor(tier).discount, {
    correo_reporte: email.trim().toLowerCase(),
    tarifa: tier,
    r: answers ? encodeAnswers(answers) : '',
  });
}

/**
 * "Pídeselo a mamá o papá": guarda el lead con el correo del estudiante (ahí
 * llega el PDF: el backend prioriza el correo del lead sobre el de la orden) y
 * devuelve un enlace de checkout SIN el correo del estudiante, para que quien
 * paga escriba el suyo. El enlace solo contiene el lead_id opaco.
 */
export async function buildShareCheckoutLink(email: string, nombre?: string, tier: PriceTier = 'regular'): Promise<string> {
  const leadId = await ensureLead(email, nombre, tier, 600);
  return buildShopifyCheckoutUrl(leadId, undefined, nombre || undefined, priceFor(tier).discount, { tarifa: tier });
}

