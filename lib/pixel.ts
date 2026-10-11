/**
 * Meta Pixel. Solo existe si NEXT_PUBLIC_META_PIXEL_ID está definido.
 *
 * Mapa de eventos del embudo:
 *   PageView          → cada ruta (base + navegación cliente)
 *   ViewContent       → el usuario inicia el test (botón del intro de /test)
 *   QuizCheckpoint    → (custom) tras las preguntas 15, 30 y 45
 *   InitiateCheckout  → se abre /checkout con un test completo
 *   Lead              → el usuario envía su correo (pagar o "pídeselo a…")
 *   Purchase          → NO se dispara aquí: el pago ocurre en Shopify.
 *                       Configurarlo en Shopify (canal Facebook & Instagram).
 */

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';

type Fbq = (...args: unknown[]) => void;

function fbq(): Fbq | null {
  if (!PIXEL_ID || typeof window === 'undefined') return null;
  const fn = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fn === 'function' ? fn : null;
}

/**
 * El snippet base carga con strategy="lazyOnload": los eventos que ocurran
 * antes se encolan en window.__fbqQ y el snippet los reenvía tras el init.
 */
function send(...args: unknown[]) {
  if (!PIXEL_ID || typeof window === 'undefined') return;
  const fn = fbq();
  if (fn) {
    fn(...args);
    return;
  }
  const w = window as unknown as { __fbqQ?: unknown[][] };
  (w.__fbqQ ??= []).push(args);
}

export function track(event: 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Lead' | 'AddToCart', params?: Record<string, unknown>) {
  send('track', event, params);
}

export function trackCustom(event: string, params?: Record<string, unknown>) {
  send('trackCustom', event, params);
}
