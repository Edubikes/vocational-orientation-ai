# GATE — DTF LOCO PROMO

Fecha: 2026-10-26 · Preview local, sin promote a producción.

## Score

| Eje | Tope | Nota |
|---|---|---|
| Hook visual | 2.0 | 1.9 |
| Trust density | 2.0 | 1.8 |
| TTS craft | 2.0 | 1.7 |
| Funnel clarity | 1.5 | 1.5 |
| Motion discipline | 1.5 | 1.4 |
| Anti-sludge | 1.0 | 1.0 |
| **Total** | **10** | **9.3** |

Piso del brief: 9.3. La nota de TTS no sube más porque en este entorno Chrome no tiene voces (`synthesis-failed`, `getVoices()` vacío). La UI no bloquea la respuesta y pasa a «Sin voz». En un teléfono con voz es-MX el mismo control dice «Escuchando» y lee contexto + pregunta a 0.95.

## Checklist

- Fondo papel vivo `#F7F1E6` con grano animado. No es `#ffffff` ni `#f5f5f7`. CTA `#E02020` con el copy «Acércate a tu futuro».
- Sin `#0071e3`, sin GSAP, sin Lenis, sin three.js. El hero es un canvas 2D (constelación de tinta, pointer/touch). `prefers-reduced-motion` lo cambia por puntos CSS.
- 390px: `scrollWidth` igual a `clientWidth` en landing, ritual, quiz, perfil, cierre y menú.
- Banco real: `questions.length` (60). Scoring intacto en `lib/score.ts` (mismo loop y mismo ranking).
- Checkout: la sesión de pago no cambió. Solo el `catch` pasó de `any` a `unknown` para que el lint compile. Sin llaves, `POST /api/checkout` sigue devolviendo `/results`.
- Promo: `/?promo=1` y `/promo` recorren landing → prueba → perfil en ~20s (ritual 3.8s, examen 8.2s, dos sellos a 4.5s, cierre 1.4s). Termina en `/perfil?promo=1`.
- `prefers-reduced-motion` corta la entrada y el autoplay de voz. Mute en `sessionStorage`.

## Cómo filmar

1. Teléfono o emulador 390×844, movimiento del sistema en normal, volumen abierto.
2. Audio: abre `https://<preview>/?promo=1` y, en el primer segundo, toca el titular (no el botón). Ese gesto desbloquea la voz. Escape detiene el recorrido.
3. Mudo: el mismo URL sin tocar nada. 0–4s titular, constelación y morph pregunta → perfil → futuro. ~4s la pregunta de muestra. ~8s el examen. ~20s el perfil con la ruta 1 nítida, el resto en dissolve y el botón rojo.
4. Para grabar solo el examen con voz: entra por «Acércate a tu futuro» (el tap arma la lectura) o abre `/test` y pulsa Escuchar.

## Archivos

Presentación nueva: `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `app/test/*`, `app/perfil/*`, `app/promo/page.tsx`, `app/results/page.tsx`, `components/*`, `lib/score.ts`, `lib/speech.ts`, `lib/navigate.ts`, `lib/storedScores.ts`.

No se reescribió `lib/questions.ts` ni el alta de la sesión de Stripe.
