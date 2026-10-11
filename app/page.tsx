import type { Metadata } from 'next';
import BrandLogo from '@/components/BrandLogo';
import Link from 'next/link';
import LazyStickyCta from '@/components/LazyStickyCta';
import SiteFooter from '@/components/SiteFooter';
import { careers } from '@/lib/careers';
import { ALL_STYLES } from '@/lib/engine';
import { questions } from '@/lib/questions';
import { PRODUCT } from '@/lib/config';
import { FACTS } from '@/lib/sources';

/**
 * Landing editorial oscura (rama redesign-artcraft). Sin framer-motion ni
 * imágenes: fondo con grano + gradiente en CSS. Cifras del código:
 * questions.length, ALL_STYLES.length, careers.length; externas: lib/sources.ts.
 */

const N_PREGUNTAS = questions.length;
const N_DIMENSIONES = ALL_STYLES.length;
const N_RUTAS = careers.length;
const CTA = 'Haz el test gratis →';
const MICRO = 'Gratis · ~12 min · sin registro para empezar';

export const metadata: Metadata = {
  title: 'Descifra Tu Futuro | Elige carrera con datos',
};

function Cta({ id, className = '' }: { id?: string; className?: string }) {
  return (
    <Link
      id={id}
      href="/test"
      className={`inline-flex h-14 items-center justify-center bg-accion px-7 text-[17px] font-semibold text-papel transition-colors hover:bg-accion-2 ${className}`}
    >
      {CTA}
    </Link>
  );
}

function Num({ n, label }: { n: string; label: string }) {
  return (
    <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-gris">
      <span className="text-accion">{n}/</span> {label}
    </p>
  );
}

const H2 = 'display mt-4 text-balance text-[clamp(34px,6vw,72px)]';

export default function Home() {
  return (
    <div className="min-h-screen bg-papel pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-tinta md:pb-0">
      {/* HERO */}
      <section className="hero-bg grain relative flex min-h-[100svh] flex-col overflow-hidden">
        <header className="relative z-10 flex items-center justify-between px-5 py-4 md:px-10">
          <BrandLogo />
          <Link href="/test" className="hidden text-[14px] text-gris hover:text-tinta md:block">
            Hacer el test
          </Link>
        </header>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-6 md:px-10">
          <h1 className="display text-balance text-[clamp(44px,9vw,128px)]">
            Elige carrera <span className="font-serif italic text-accion">con datos,</span> no por la fila.
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] text-gris md:text-xl">
            {N_PREGUNTAS} preguntas, {N_DIMENSIONES} dimensiones, {N_RUTAS} rutas. Tu arquetipo, gratis.
          </p>
          <div className="mt-9">
            <Cta id="hero-cta" className="w-full md:w-auto" />
            <p className="mt-3 text-[14px] text-gris">{MICRO}</p>
          </div>
        </div>
      </section>

      {/* 01 EL PROBLEMA */}
      <section className="border-t border-linea">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
          <Num n="01" label="El problema" />
          <h2 className={`${H2} max-w-5xl`}>Elegir mal cuesta semestres. Y nadie te lo dice antes de inscribirte.</h2>
          <div className="mt-10 grid gap-10 text-[18px] leading-relaxed text-tinta/80 md:grid-cols-2 md:gap-16">
            <p>
              {FACTS.concentracion.text}.<sup className="text-gris">1</sup> Casi nadie eligió eso a propósito: eligieron lo que
              eligió el de al lado.
            </p>
            <p>
              {FACTS.sinPlan.text}.<sup className="text-gris">2</sup> Cambiarte de carrera a la mitad son semestres y colegiaturas
              que no regresan.
            </p>
          </div>
        </div>
      </section>

      {/* 02 CÓMO FUNCIONA */}
      <section className="border-t border-linea">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
          <Num n="02" label="Cómo funciona" />
          <h2 className={H2}>Tres pasos. El primero es gratis.</h2>
          <ol className="mt-14 grid gap-px bg-linea md:grid-cols-3">
            {[
              [`${N_PREGUNTAS} preguntas`, 'Una por pantalla. Contesta lo que harías, no lo que se ve bien.'],
              ['Tu arquetipo, gratis', `Cómo piensas en ${N_DIMENSIONES} dimensiones, con tu punto fuerte y tu punto ciego.`],
              ['Reporte completo', `Tus 8 carreras más afines de ${N_RUTAS}, universidades en México y rangos salariales de referencia.`],
            ].map(([t, d], i) => (
              <li key={t} className="bg-papel p-7 md:p-10">
                <span className="font-mono text-[13px] text-accion">0{i + 1}</span>
                <p className="display mt-6 text-[clamp(26px,3vw,38px)]">{t}</p>
                <p className="mt-4 text-[17px] leading-relaxed text-gris">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 QUÉ TE LLEVAS */}
      <section className="border-t border-linea">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-[1fr_1.1fr] md:items-center md:px-10 md:py-36">
          <div>
            <Num n="03" label="Qué te llevas" />
            <h2 className={H2}>Tu #1 ya está calculada. ¿Quieres verla?</h2>
            <p className="mt-6 max-w-md text-[18px] leading-relaxed text-gris">
              Así se ve tu resultado: el arquetipo se abre gratis; tus rutas, con su afinidad, se desbloquean en el reporte.
            </p>
          </div>
          {/* Mockup CSS del resultado, parcialmente borroso. Datos de ejemplo. */}
          <div className="relative border border-linea bg-papel-2 p-6 md:p-8" aria-hidden="true">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gris">Tu arquetipo es</p>
            <p className="display mt-2 text-[clamp(30px,4vw,48px)]">El Estratega</p>
            <div className="mt-6 space-y-3">
              {[96, 91, 84, 77, 70].map((v, i) => (
                <div key={v} className="flex items-center gap-3">
                  <span className="w-6 font-mono text-[12px] text-gris">#{i + 1}</span>
                  <span className="flex-1">
                    <span className="block h-3 select-none rounded-sm bg-tinta/25 blur-[3px]" style={{ width: `${88 - i * 9}%` }} />
                  </span>
                  <span className="font-mono text-[13px] text-accion">{v}%</span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-papel-2 to-transparent" />
            <p className="mt-6 text-[12px] text-gris">Ejemplo con datos ficticios.</p>
          </div>
        </div>
      </section>

      {/* 04 PARA PAPÁS */}
      <section className="border-t border-linea bg-papel-2">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <Num n="04" label="Para papás" />
          <h2 className={`${H2} max-w-4xl`}>¿Lo va a pagar tu mamá o papá?</h2>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-gris">
            Haz el test, y al llegar al reporte mándale el link de pago por WhatsApp. El PDF te llega a tu correo.
          </p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent('Mira este test de orientación vocacional, son 60 preguntas: https://descifratufuturo.com')}`}
            className="mt-8 inline-flex h-12 items-center border-b border-tinta/60 text-[17px] font-medium text-tinta hover:border-accion hover:text-accion"
          >
            Mándale el link por WhatsApp →
          </a>
        </div>
      </section>

      {/* 05 PRECIO */}
      <section className="border-t border-linea">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
          <Num n="05" label="Precio" />
          <h2 className={H2}>El test y tu arquetipo son gratis. El reporte, pago único.</h2>
          <div className="mt-12 grid gap-4 md:max-w-3xl md:grid-cols-2">
            <div className="border border-linea p-7">
              <p className="text-[15px] text-gris">Normal</p>
              <p className="display mt-3 text-[56px]">{PRODUCT.priceLabel.replace(' MXN', '')}</p>
              <p className="mt-2 text-[14px] text-gris">MXN · pago único</p>
            </div>
            <div className="border border-accion p-7">
              <p className="text-[15px] text-accion">Menos de 25 años</p>
              <p className="display mt-3 text-[56px] text-accion">{PRODUCT.youthPriceLabel.replace(' MXN', '')}</p>
              <p className="mt-2 text-[14px] text-gris">MXN · código {PRODUCT.youthDiscountCode}, autodeclarado</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 FAQ */}
      <section className="border-t border-linea">
        <div className="mx-auto max-w-4xl px-5 py-24 md:py-32">
          <Num n="06" label="Preguntas" />
          <div className="mt-8 divide-y divide-linea border-y border-linea">
            {[
              ['¿Cuánto tarda?', `Unos 12 minutos. Son ${N_PREGUNTAS} preguntas, una por pantalla, y tu avance se guarda en tu teléfono.`],
              [
                '¿Qué recibo?',
                `Gratis: tu arquetipo. Con el reporte: tus 8 carreras más afines de ${N_RUTAS}, universidades en México, rangos salariales de referencia y un PDF de 7 páginas en tu correo.`,
              ],
              [
                '¿Cómo pago?',
                'El pago lo procesa Shopify, con tarjeta y los métodos que aparezcan en el checkout. Si no te llega el PDF, escríbenos a hola@descifratufuturo.com.',
              ],
              [
                '¿Qué hacen con mis datos?',
                'Los usamos para calcular tu perfil y mandarte el reporte. Nunca vemos los datos de tu tarjeta.',
              ],
            ].map(([q, a]) => (
              <details key={q} className="group py-1">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 text-[19px] font-medium">
                  {q}
                  <span className="text-2xl text-gris transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-5 text-[17px] leading-relaxed text-gris">
                  {a}
                  {q.startsWith('¿Qué hacen') && (
                    <>
                      {' '}
                      <Link href="/aviso-de-privacidad" className="underline underline-offset-2">Aviso de privacidad</Link>.
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="hero-bg grain relative overflow-hidden border-t border-linea">
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
          <h2 className="display max-w-5xl text-balance text-[clamp(40px,8vw,104px)]">Tómala con datos.</h2>
          <div className="mt-10">
            <Cta className="w-full md:w-auto" />
            <p className="mt-3 text-[14px] text-gris">{MICRO}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
      <LazyStickyCta targetId="hero-cta" href="/test" label={CTA} />
    </div>
  );
}
