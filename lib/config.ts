import { careers } from './careers';

/**
 * Configuración central del embudo. Todo lo que cambia entre entornos vive aquí.
 * Un solo punto de edición para precio, dominio de Shopify y variante del producto.
 */

export const PRODUCT = {
  /** Precio mostrado en el muro de pago (Estado 4). Debe coincidir con Shopify. */
  priceMXN: 199,
  priceLabel: '$199 MXN',
  /** Precio joven (menores de 25, autodeclarado): cupón de Shopify al 50%. */
  youthPriceMXN: 99,
  youthPriceLabel: '$99 MXN',
  youthDiscountCode: process.env.NEXT_PUBLIC_SHOPIFY_YOUTH_CODE ?? 'JOVEN50',
  name: 'Reporte Algorítmico Completo',
} as const;

export const SHOPIFY = {
  /**
   * Dominio de la tienda, SIN protocolo ni slash final.
   * Ej: 'decifra-tu-futuro.myshopify.com' o 'descifratufuturo.com'
   */
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? 'TU-DOMINIO-SHOPIFY.com',
  /**
   * ID NUMÉRICO de la VARIANTE del producto (no el ID del producto).
   * Se obtiene en Shopify Admin > Productos > variante > el número final de la URL.
   */
  variantId: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ID ?? 'ID_DEL_PRODUCTO',
} as const;

/**
 * Construye el permalink de checkout de Shopify.
 *
 * Formato: /cart/{variantId}:{qty}?checkout
 * Adjuntamos `attributes[lead_id]` — Shopify lo propaga al webhook `orders/paid`
 * como `note_attributes`, que es el puente para que el backend de Python
 * sepa QUÉ documento de Firestore procesar. Sin esto el pago queda huérfano.
 */
export function buildShopifyCheckoutUrl(
  leadId: string,
  email?: string,
  nombre?: string,
  discount?: string,
  extra: Record<string, string> = {},
): string {
  const base = `https://${SHOPIFY.domain}/cart/${SHOPIFY.variantId}:1`;

  const params = new URLSearchParams();
  // `discount` aplica el código en el checkout (cart permalink de Shopify).
  if (discount) params.set('discount', discount);
  params.set('attributes[lead_id]', leadId);
  if (nombre) params.set('attributes[nombre]', nombre);
  for (const [k, v] of Object.entries(extra)) if (v) params.set(`attributes[${k}]`, v);
  if (email) params.set('checkout[email]', email);

  // `checkout` debe ir sin valor para que Shopify salte el carrito y vaya directo a pagar.
  return `${base}?checkout&${params.toString()}`;
}

/**
 * Textos del Estado 3. Cada paso describe algo que el motor SÍ hace
 * (lib/engine.ts). Nada de "neuronal": no hay redes neuronales en este cálculo.
 */
export const PROCESSING_STEPS = [
  'Sumando tus 60 respuestas…',
  'Midiendo cada dimensión contra su propio máximo…',
  `Comparando tu perfil con ${careers.length} rutas profesionales…`,
  'Eligiendo tu arquetipo…',
] as const;

/** Duración total del bloqueo de pantalla en el Estado 3 (ms). */
export const PROCESSING_DURATION_MS = 3500;

export type PriceTier = 'regular' | 'joven';

export function priceFor(tier: PriceTier): { mxn: number; label: string; discount?: string } {
  return tier === 'joven'
    ? { mxn: PRODUCT.youthPriceMXN, label: PRODUCT.youthPriceLabel, discount: PRODUCT.youthDiscountCode }
    : { mxn: PRODUCT.priceMXN, label: PRODUCT.priceLabel };
}

/** Garantía de devolución. Dejar en false hasta que Eduardo la apruebe. */
export const GUARANTEE_ENABLED = false;
