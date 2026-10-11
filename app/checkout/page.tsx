'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import BrandLogo from '@/components/BrandLogo';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { analyze, type Answers } from '@/lib/engine';
import { buildShareCheckoutLink, checkoutAndRedirect, isFirebaseConfigured, loadAnswers, loadName } from '@/lib/lead';
import { GUARANTEE_ENABLED, PRODUCT, priceFor, type PriceTier } from '@/lib/config';
import { careers } from '@/lib/careers';
import { track, trackCustom } from '@/lib/pixel';
import ResultTeaser from '@/components/ResultTeaser';

/**
 * ESTADO 4 — Teaser + muro de pago (v3).
 *
 * Dos acciones al pagar, en orden estricto (ver lib/lead.ts):
 *   1. Persistir respuestas + correo + nombre + análisis en Firebase.
 *   2. Redirigir al checkout de Shopify con lead_id (y nombre) adjuntos.
 *
 * "Pídeselo a mamá o papá": guarda el lead con el correo del estudiante y abre
 * WhatsApp con un enlace de pago que NO lleva ese correo; el backend entrega
 * el PDF al correo del lead, así que llega al estudiante aunque pague otro.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const INCLUDED = [
  `Tus 8 carreras más afines de ${careers.length} analizadas, con su % de afinidad`,
  'Perfil completo de las 12 dimensiones, medidas contra su propio máximo',
  'Universidades en México y qué se estudia en cada carrera',
  'Rango salarial de referencia por profesión (IMCO cuando hay dato)',
  'PDF de 7 páginas a tu correo en cuanto se confirma el pago',
] as const;

const GUARANTEE = 'Si el reporte no te sirve, te devolvemos tu dinero en 7 días.';

const NO_REFUNDS =
  'Debido a la naturaleza automatizada y la entrega instantánea de los recursos de cómputo para este reporte, todas las ventas son finales.';

type Status = 'idle' | 'saving' | 'sharing' | 'error';

/*
 * Las respuestas viven en localStorage (las escribe /test al terminar).
 * useSyncExternalStore las lee sin setState dentro de un efecto y con un
 * snapshot de servidor nulo, así la página prerenderizada no se desajusta.
 */
function subscribeStorage(onChange: () => void) {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
}
const readAnswersSnapshot = () => JSON.stringify(loadAnswers());
const serverAnswersSnapshot = () => null;
const readNameSnapshot = () => loadName();
const serverNameSnapshot = () => '';

export default function CheckoutPage() {
  const router = useRouter();
  const snapshot = useSyncExternalStore(subscribeStorage, readAnswersSnapshot, serverAnswersSnapshot);
  const nombre = useSyncExternalStore(subscribeStorage, readNameSnapshot, serverNameSnapshot);
  const answers = useMemo<Answers | null>(() => (snapshot ? (JSON.parse(snapshot) as Answers | null) : null), [snapshot]);
  const hasAnswers = !!answers && Object.keys(answers).length > 0;
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tier, setTier] = useState<PriceTier>('joven');
  const price = priceFor(tier);
  const firedView = useRef(false);
  const firedIntent = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [askEmail, setAskEmail] = useState(false);

  useEffect(() => {
    if (snapshot !== null && !hasAnswers) router.replace('/test');
  }, [snapshot, hasAnswers, router]);

  const analysis = useMemo(() => (hasAnswers && answers ? analyze(answers) : null), [answers, hasAnswers]);

  useEffect(() => {
    // Vista del muro de pago (custom). InitiateCheckout se dispara al pulsar
    // pagar/compartir, con el precio elegido (199 o 99).
    if (analysis && !firedView.current) {
      firedView.current = true;
      trackCustom('PaywallView', { content_name: PRODUCT.name });
    }
  }, [analysis]);

  const isEmailValid = EMAIL_PATTERN.test(email.trim());
  const isBusy = status === 'saving' || status === 'sharing';
  const showEmailError = touched && !isEmailValid && email.length > 0;

  /** Lleva al usuario al campo de correo con el mensaje de "¿a qué correo?". */
  const askForEmail = () => {
    setAskEmail(true);
    const input = emailRef.current;
    if (!input) return;
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.focus({ preventScroll: true });
  };

  const handleUnlock = async () => {
    if (isBusy) return;
    setTouched(true);
    // Primer clic: señal de intención (no ensucia InitiateCheckout, que sigue abajo).
    if (!firedIntent.current) {
      firedIntent.current = true;
      track('AddToCart', { value: price.mxn, currency: 'MXN' });
      if (!isEmailValid) {
        trackCustom('CheckoutIntent', { value: price.mxn, currency: 'MXN', content_category: tier });
      }
    }
    if (!isEmailValid) {
      askForEmail();
      return;
    }
    setStatus('saving');
    setErrorMessage(null);
    track('Lead', { content_name: 'pago_directo' });
    track('InitiateCheckout', { value: price.mxn, currency: 'MXN', content_name: PRODUCT.name, content_category: tier });
    try {
      await checkoutAndRedirect(email.trim(), nombre, tier);
      // La pestaña ya va camino a Shopify: el botón sigue bloqueado.
    } catch (error) {
      setStatus('error');
      setErrorMessage(resolveErrorMessage(error));
    }
  };

  const handleShare = async () => {
    if (isBusy || !analysis) return;
    setTouched(true);
    if (!isEmailValid) {
      askForEmail();
      return;
    }
    setStatus('sharing');
    setErrorMessage(null);
    track('Lead', { content_name: 'pideselo_whatsapp' });
    track('InitiateCheckout', { value: price.mxn, currency: 'MXN', content_name: PRODUCT.name, content_category: `${tier}_whatsapp` });
    try {
      const link = await buildShareCheckoutLink(email.trim(), nombre, tier);
      const text =
        `Hice un test de orientación vocacional (60 preguntas) y me salió "${analysis.archetype.name}". ` +
        `El reporte completo trae mis 8 carreras más afines, universidades y rangos salariales de referencia. ` +
        `Cuesta ${price.label}, pago único. ¿Me lo compras? Me llega a mi correo: ${link}`;
      window.location.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setErrorMessage(resolveErrorMessage(error));
    }
  };

  if (!analysis) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-papel text-[15px] text-gris">
        Recuperando tu perfil…
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-papel pb-24 text-tinta md:pb-0">
      <header className="flex items-center justify-between border-b border-linea px-4 py-3 sm:px-8">
        <BrandLogo />
        <span className="font-mono text-[12px] text-gris">60/60 · perfil calculado</span>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pt-14">
        <ResultTeaser analysis={analysis} nombre={nombre} />

        {/* R3 · Portada del reporte (maqueta con tus datos) */}
        <section className="mt-10">
          <p className="text-[14px] font-medium text-gris">Tu reporte completo</p>
          <div className="mt-3 flex gap-4">
            <div className="relative aspect-[1/1.294] w-32 shrink-0 border border-linea bg-papel-2 p-3 sm:w-40">
              <p className="text-[6px] font-semibold uppercase tracking-[0.2em] text-gris">Reporte algorítmico</p>
              <p className="mt-3 font-serif text-[13px] font-semibold leading-tight sm:text-[15px]">{analysis.archetype.name}</p>
              <p className="mt-2 text-[7px] uppercase tracking-[0.12em] text-gris">Sujeto</p>
              <p className="truncate text-[9px] font-medium">{nombre || 'Tu nombre'}</p>
              <div className="absolute inset-x-3 bottom-3 space-y-1" aria-hidden="true">
                {[90, 72, 60, 44].map((w) => (
                  <div key={w} className="h-1 bg-papel-2" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
            <ul className="space-y-2 text-[15px] leading-snug">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-rojo" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* R4 · Oferta */}
        <section className="mt-10 scroll-mt-4 border border-linea bg-white/[0.03] p-4 sm:p-6" id="pagar">
          <h2 className="display text-[clamp(30px,6vw,44px)]">Desbloquea tu reporte</h2>
          <p className="mt-2 text-[14px] text-gris">Pago único. Sin suscripción.</p>

          <fieldset className="mt-5">
            <legend className="text-[15px] font-medium">Elige tu precio</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  ['joven', 'Menor de 25', PRODUCT.youthPriceLabel],
                  ['regular', 'Normal', PRODUCT.priceLabel],
                ] as const
              ).map(([value, title, label]) => {
                const active = tier === value;
                return (
                  <label
                    key={value}
                    className={`relative flex min-h-24 cursor-pointer flex-col justify-between border p-3 transition-colors duration-100 ${
                      active ? 'border-accion bg-accion/10' : 'border-linea'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tarifa"
                      value={value}
                      checked={active}
                      onChange={() => setTier(value)}
                      disabled={isBusy}
                      className="h-5 w-5 shrink-0 accent-[#E8A33D]"
                    />
                    <span className="mt-2 block">
                      <span className="block text-[14px] text-gris">{title}</span>
                      <span className="display block text-[32px] tabular-nums">{label.replace(' MXN', '')}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-gris">
              La edad es autodeclarada: al elegir el precio para menores de 25 declaras que tienes menos de 25 años. El
              descuento (código {PRODUCT.youthDiscountCode}) se aplica solo en el pago.
            </p>
          </fieldset>

          <label htmlFor="email" className="mt-5 block text-[15px] font-medium">
            {askEmail && !isEmailValid ? (
              <span className="text-accion">¿A qué correo te lo mandamos?</span>
            ) : (
              <>
                Tu correo <span className="font-normal text-gris">(ahí llega el PDF)</span>
              </>
            )}
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            enterKeyHint="go"
            required
            value={email}
            disabled={isBusy}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleUnlock();
            }}
            placeholder="tu@correo.com"
            aria-invalid={showEmailError}
            aria-describedby={showEmailError ? 'email-error' : undefined}
            className={`mt-2 h-14 w-full scroll-mt-24 border bg-white/[0.06] px-4 text-[18px] outline-none placeholder:text-gris-2 disabled:opacity-60 ${
              showEmailError ? 'border-rojo' : 'border-linea focus:border-tinta'
            }`}
          />
          {showEmailError && (
            <p id="email-error" className="mt-2 text-[14px] text-rojo">
              Escribe un correo válido: es el único canal por el que llega tu PDF.
            </p>
          )}

          <button
            type="button"
            onClick={handleUnlock}
            disabled={isBusy}
            className="mt-4 flex h-16 w-full items-center justify-between gap-3 bg-accion px-5 text-left text-[18px] font-semibold text-papel transition-colors enabled:hover:bg-accion-2 disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'saving' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Preparando tu pago…
              </span>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                  Desbloquear mi reporte · {price.label.replace(' MXN', '')}
                </span>
                <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
              </>
            )}
          </button>

          <p className="mt-3 text-[13px] leading-relaxed text-gris">
            Pago seguro con Shopify · tarjeta, y los métodos que aparezcan en el checkout.
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gris">
            Te llega a tu correo en minutos. Si no te llega, escríbenos a{' '}
            <a href="mailto:hola@descifratufuturo.com" className="underline underline-offset-2">hola@descifratufuturo.com</a>.
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gris">{GUARANTEE_ENABLED ? GUARANTEE : NO_REFUNDS}</p>

          {status === 'error' && errorMessage && (
            <div role="alert" className="mt-4 flex items-start gap-3 border border-rojo p-3 text-[14px] text-rojo">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleShare}
            disabled={isBusy}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-left text-[15px] text-gris underline underline-offset-4 hover:text-tinta disabled:opacity-60"
          >
            {status === 'sharing' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            ¿Lo paga tu mamá o papá? Mándale el link por WhatsApp
          </button>

          <p className="mt-5 text-[12px] leading-relaxed text-gris">
            El pago lo procesa Shopify. Nosotros nunca vemos ni guardamos los datos de tu tarjeta. Consulta nuestro{' '}
            <Link href="/aviso-de-privacidad" className="underline underline-offset-2">Aviso de Privacidad</Link>.
          </p>
        </section>

        {process.env.NODE_ENV === 'development' && !isFirebaseConfigured() && (
          <p className="mt-6 border border-linea p-4 text-xs leading-relaxed text-gris">
            [dev] Firebase sin configurar. Sin eso el botón fallará a propósito, para no cobrar sin poder entregar.
          </p>
        )}
      </main>
      <PayStickyCta label={`Desbloquear mi reporte · ${price.label.replace(' MXN', '')}`} onClick={handleUnlock} busy={isBusy} />
    </div>
  );
}

/** CTA fijo en móvil mientras la oferta (#pagar) sigue debajo del viewport. */
function PayStickyCta({ label, onClick, busy }: { label: string; onClick: () => void; busy: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = document.getElementById('pagar');
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top > 0),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-linea bg-papel/90 px-4 pt-3 backdrop-blur-md transition-opacity duration-200 md:hidden ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        tabIndex={visible ? 0 : -1}
        className="flex h-14 w-full items-center justify-between gap-3 bg-accion px-5 text-left text-[17px] font-semibold text-papel active:bg-accion-2 disabled:opacity-70"
      >
        {label}
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </button>
    </div>
  );
}

/** Traduce fallos técnicos a algo que el usuario pueda accionar. */
function resolveErrorMessage(error: unknown): string {
  const code = error instanceof Error ? error.message : '';

  switch (code) {
    case 'NO_ANSWERS':
      return 'No encontramos tus respuestas. Vuelve a hacer el test — toma 8 minutos.';
    case 'FIREBASE_NOT_CONFIGURED':
      return 'El sistema de entrega no está disponible en este momento. No se te ha cobrado nada. Intenta de nuevo en unos minutos.';
    case 'FIREBASE_TIMEOUT':
      return 'Tu conexión está tardando demasiado. No se te ha cobrado nada — revisa tu red e intenta otra vez.';
    default:
      return 'No pudimos guardar tu perfil, así que detuvimos el pago. No se te ha cobrado nada. Intenta de nuevo.';
  }
}
