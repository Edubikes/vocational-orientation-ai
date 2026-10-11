# Cambios del rediseño (redesign-artcraft)

## Tema y fuentes
- Tokens de `app/globals.css` remapeados a oscuro (#0B0B0C / hueso #EDE9E1 / gris #8A867E); acento único ámbar #E8A33D (CTA y números). Así quiz, checkout, aviso y footer heredan el tema.
- Fuentes con `next/font` (swap, latin): Fraunces (opsz), Inter Tight, JetBrains Mono. Se quitó Newsreader.
- Utilidades nuevas: `.grain`, `.hero-bg`, `.display`.

## Home (`app/page.tsx`)
- Hero a pantalla completa (grano + gradiente CSS, sin imágenes ni framer-motion), un solo CTA "Haz el test gratis →".
- Secciones 01–06 (problema con fuentes de `lib/sources.ts`, cómo funciona, mockup CSS del resultado, papás, precio $199 / $99, FAQ) + CTA final.
- Sticky CTA móvil reestilado. Footer con hola@descifratufuturo.com.
- Sin contadores, testimonios, cifras de ventas ni escasez.

## Quiz (solo UI)
- Tema oscuro, botones de respuesta min 52px, aviso de progreso dotado en bloque 1, checkpoints 15/30/45 con "Hasta ahora apuntas a: <dimensión>" (usa `partialReadout`, sin tocar el engine). Copy ≈12 min.

## Checkout
- Ruta #1 visible con nombre real (`analysis.matches[0]`); #2–#8 borrosas con su % de afinidad.
- Tarjetas de precio (radios `value="joven"` / `"regular"`), default joven.
- CTA único "Desbloquear mi reporte · $99", sticky en móvil. Primer clic: `AddToCart` + (sin correo válido) `CheckoutIntent`, foco/scroll al correo con "¿A qué correo te lo mandamos?". `InitiateCheckout` sin cambios (correo válido + pagar).
- Correo: type=email, autocomplete, inputMode, enterKeyHint="go", 18px.
- Textos de Shopify/confianza, botón de texto de WhatsApp (`handleShare`).
- `GUARANTEE_ENABLED=false` en `lib/config.ts` (pendiente de aprobación); `'AddToCart'` añadido al tipo de `track` en `lib/pixel.ts`.

## Notas
- No se tocó engine, questions, lead, precios ni `.env*`.
- Antes el teaser nunca ponía nombres de carreras en el DOM; ahora la #1 sí (lo pide el spec). #2–#8 siguen sin nombres en el DOM.
- Con la garantía apagada se mantiene el texto de "ventas finales".
- Pendiente: revisión visual en navegador (solo se verificó build y eslint).
