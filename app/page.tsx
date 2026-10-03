import type { Metadata } from 'next';
import BrandLogo from '@/components/BrandLogo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LandingMotion, Reveal, StickyCta } from '@/components/LandingMotion';
import { CircleMark, PeopleGrid, Underline } from '@/components/Annotations';
import SiteFooter from '@/components/SiteFooter';
import { careers } from '@/lib/careers';
import { ALL_STYLES } from '@/lib/engine';
import { questions } from '@/lib/questions';
import { PRODUCT } from '@/lib/config';
import { FACTS } from '@/lib/sources';

import heroImg from '@/public/img/dtf-01-hero-pasillo.jpg';
import filaImg from '@/public/img/dtf-02-fila-admision.jpg';
import deskImg from '@/public/img/dtf-03-escritorio-noche.jpg';
import laminaImg from '@/public/img/dtf-04-lamina-rutas.jpg';
import portadaImg from '@/public/img/reporte-ejemplo-portada.jpg';
import registrosImg from '@/public/img/reporte-ejemplo-registros.jpg';

/**
 * Landing v3 — editorial-documental (ver rediseno-v3/DIRECCION.md).
 *
 * Cifras del instrumento, todas leídas del código:
 *   60 preguntas × 5 opciones .... lib/questions.ts
 *   12 dimensiones ............... lib/engine.ts (ALL_STYLES)
 *   20 rutas ..................... lib/careers.ts (careers.length)
 *   7 páginas .................... backend/informe.py (52 perfiles renderizados: siempre 7)
 * Cifras externas: lib/sources.ts (IMCO, OCDE vía IMCO, SEP).
 */

const N_PREGUNTAS = questions.length;
const N_DIMENSIONES = ALL_STYLES.length;
const N_RUTAS = careers.length;
const PAGINAS_REPORTE = 7;
const CTA = 'Empezar mi análisis';
const SATURADAS = careers.filter((c) => c.saturation);

export const metadata: Metadata = {
  title: 'Descifra Tu Futuro | Alguien en tu salón ya sabe qué va a estudiar',
};

function MainCta({ id }: { id?: string }) {
  return (
    <Link
      id={id}
      href="/test"
      className="group flex h-14 w-full items-center justify-between gap-3 bg-accion px-5 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-accion-2 focus-visible:outline-offset-4 md:w-auto md:min-w-80"
    >
      {CTA}
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

function Nota({ n }: { n: number }) {
  return <sup className="ml-0.5 text-[0.6em] font-medium text-gris">{n}</sup>;
}

export default function Home() {
  return (
    <LandingMotion>
      <div className="min-h-screen bg-papel pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-tinta md:pb-0">
        {/* Barra mínima */}
        <header className="flex items-center justify-between px-5 py-3.5 md:px-10">
          <BrandLogo />
          <span className="text-[13px] text-gris">Orientación con datos · MX</span>
        </header>

        {/* S1 · HERO */}
        <section className="md:mx-auto md:grid md:max-w-6xl md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12 md:px-10 md:pb-16 md:pt-4">
          <figure className="relative md:order-2">
            <div className="relative h-[30svh] min-h-52 w-full overflow-hidden md:h-auto md:aspect-[4/5]">
              <Image
                src={heroImg}
                alt="Pasillo de una prepa: una estudiante mira a dos compañeros que revisan algo en un celular."
                priority
                fetchPriority="high"
                quality={55}
                sizes="(max-width: 768px) 100vw, 46vw"
                className="h-full w-full bg-papel-2 object-cover object-[50%_42%]"
              />
            </div>
            <figcaption className="hidden px-5 pt-2 text-[12px] italic leading-snug text-gris md:block md:px-0">
              Pasillo de prepa, 6.º semestre. Unos ya saben qué van a estudiar.
            </figcaption>
          </figure>

          <div className="px-5 pt-5 md:order-1 md:px-0 md:pt-0">
            <div>
              <p className="text-[14px] font-medium text-gris">
                3 de cada 10 jóvenes no tiene plan de carrera.<Nota n={2} />
              </p>
            </div>
            <div>
              <h1 className="mt-3 text-balance font-serif text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.02em] md:text-6xl lg:text-[4.4rem]">
                Alguien en tu salón ya sabe qué va a estudiar.{' '}
                <span className="relative inline-block font-normal italic">
                  Y no lo adivinó.
                  <Underline />
                </span>
              </h1>
            </div>
            <div className="mt-6">
              <MainCta id="hero-cta" />
              <p className="mt-3 text-[14px] text-gris">≈8 minutos · Gratis hasta ver tu arquetipo · Sin registro</p>
            </div>
            <div>
              <p className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-tinta/85 md:text-lg">
                {N_PREGUNTAS} preguntas. Un mapa de cómo piensas en {N_DIMENSIONES} dimensiones y cuál de {N_RUTAS}{' '}
                rutas te queda. Antes de que elijas lo mismo que todos.
              </p>
            </div>
          </div>
        </section>

        {/* S2 · LA FILA */}
        <section className="mt-12 border-t border-linea md:mt-0">
          <div className="mx-auto max-w-6xl px-5 py-12 md:grid md:grid-cols-2 md:gap-14 md:px-10 md:py-20">
            <div>
              <p className="text-[14px] font-medium text-gris">La fila</p>
              <h2 className="mt-2 text-balance font-serif text-[2rem] font-semibold leading-[1.08] tracking-[-0.015em] md:text-5xl">
                Casi la mitad se forma en la misma fila.
              </h2>
              <p className="mt-5 text-pretty text-[17px] leading-relaxed text-tinta/85">
                El <strong className="font-semibold text-tinta">46%</strong> de los universitarios en México está en solo 10
                carreras: Derecho, Administración, Contabilidad…<Nota n={1} /> Algunas podrían perder hasta 25% de su demanda
                laboral en los próximos cinco años.<Nota n={3} /> Nadie eligió eso a propósito: eligieron lo que eligió el de al lado.
              </p>
              <p className="mt-5 border-l-2 border-rojo pl-4 font-serif text-xl italic leading-snug">
                El problema no es imitar. Es imitar sin saber si eso te queda a ti.
              </p>
            </div>

            <Reveal onView className="mt-10 md:mt-0">
              <figure>
                <div className="relative">
                  <PeopleGrid filled={46} label="De cada 100 universitarios, 46 están en 10 carreras tradicionales." />
                  <span className="absolute -right-1 top-[18%] w-32 rotate-[-4deg] text-right font-serif text-[15px] italic leading-tight text-rojo md:-right-6">
                    aquí se forma casi la mitad
                  </span>
                </div>
                <figcaption className="mt-3 text-[13px] text-gris">
                  De cada 100 universitarios, 46 están en 10 carreras tradicionales. {FACTS.concentracion.source}.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <figure className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[21/9]">
              <Image
                src={filaImg}
                alt="Fila larga de aspirantes con folders y celulares esperando un examen de admisión."
                quality={50}
                sizes="(max-width: 768px) 100vw, 1200px"
                placeholder="blur"
                className="h-full w-full object-cover object-[50%_55%]"
              />
            </div>
            <figcaption className="mx-auto max-w-6xl px-5 pt-2 text-[12px] italic text-gris md:px-10">
              Examen de admisión, 7:00 a. m. Todos con el mismo folder.
            </figcaption>
          </figure>
        </section>

        {/* S2b · CARRERAS SATURADAS */}
        <section className="border-t border-linea bg-papel-2">
          <div className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
            <p className="text-[14px] font-medium text-gris">Si tu opción es de las más concurridas</p>
            <h2 className="mt-2 max-w-3xl text-balance font-serif text-[1.75rem] font-semibold leading-[1.1] md:text-4xl">
              Evaluación de viabilidad, riesgo y resistencia en mercados de alta saturación.
            </h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-tinta/85">
              {FACTS.cinco.text.replace('32.9%', '1 de cada 3 profesionistas (32.9%)')}.<Nota n={4} /> Las incluimos en el
              análisis para que sepas si tu perfil aguanta la competencia o si te conviene una ruta con menos fila.
            </p>
            <ul className="mt-7 divide-y divide-linea border-y border-linea">
              {SATURADAS.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-4 py-3.5">
                  <span className="text-[16px] font-medium">{c.name}</span>
                  <span className="shrink-0 text-right text-[14px] tabular-nums text-gris">
                    <a href={c.saturation!.source} target="_blank" rel="noopener noreferrer" className="underline decoration-linea underline-offset-2">
                      {c.saturation!.share} de los profesionistas
                    </a>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] text-gris">Porcentaje del total de personas con carrera en México. Fuente: fichas de IMCO Compara Carreras.</p>
          </div>
        </section>

        {/* S3 · LO QUE VAS A VER DE TI */}
        <section className="border-t border-linea">
          <div className="mx-auto max-w-6xl px-5 py-12 md:grid md:grid-cols-[1fr_1.1fr] md:gap-14 md:px-10 md:py-20">
            <div>
              <p className="text-[14px] font-medium text-gris">Lo que vas a ver de ti</p>
              <h2 className="mt-2 text-balance font-serif text-[2rem] font-semibold leading-[1.08] md:text-5xl">
                No es un “eres creativo”. Es tu mapa, en números.
              </h2>
              <ul className="mt-6 space-y-3 text-[17px] leading-relaxed">
                <li className="flex gap-3"><span className="mt-[0.6em] h-px w-4 shrink-0 bg-tinta" />{N_PREGUNTAS} preguntas de elección forzada, 5 opciones cada una.</li>
                <li className="flex gap-3"><span className="mt-[0.6em] h-px w-4 shrink-0 bg-tinta" />Tu intensidad en {N_DIMENSIONES} dimensiones, cada una contra su propio máximo.</li>
                <li className="flex gap-3"><span className="mt-[0.6em] h-px w-4 shrink-0 bg-tinta" />Tu afinidad con {N_RUTAS} rutas profesionales, ordenadas.</li>
                <li className="flex gap-3"><span className="mt-[0.6em] h-px w-4 shrink-0 bg-tinta" />Un reporte de {PAGINAS_REPORTE} páginas en PDF, a tu correo.</li>
              </ul>
            </div>

            <Reveal onView className="relative mt-10 md:mt-0">
              <div className="relative mx-auto grid max-w-md grid-cols-2 gap-3 md:max-w-none">
                <div className="relative rotate-[-1.5deg] bg-white shadow-[0_10px_30px_-12px_rgba(22,20,15,0.35)]">
                  <Image src={portadaImg} alt="Portada de un reporte de ejemplo: arquetipo El Auditor." quality={60} sizes="(max-width: 768px) 46vw, 26vw" className="h-auto w-full" />
                  <CircleMark className="left-[18%] top-[22%] h-[14%] w-[64%]" />
                </div>
                <div className="relative mt-6 rotate-[1.2deg] bg-white shadow-[0_10px_30px_-12px_rgba(22,20,15,0.35)]">
                  <Image src={registrosImg} alt="Página de un reporte de ejemplo con los 12 registros en cifras." quality={60} sizes="(max-width: 768px) 46vw, 26vw" className="h-auto w-full" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 font-serif text-[15px] italic leading-snug text-rojo">
                <p>↑ tu arquetipo, con tu nombre</p>
                <p className="text-right">tus 12 dimensiones, en cifras ↑</p>
              </div>
              <p className="mt-2 text-center text-[12px] text-gris">Ejemplo con datos ficticios.</p>
            </Reveal>
          </div>
          <figure>
            <div className="relative aspect-[2/1] w-full overflow-hidden md:aspect-[3/1]">
              <Image src={deskImg} alt="Un estudiante contesta en su celular de noche, sobre la cama, con cuaderno y calculadora." quality={55} sizes="100vw" placeholder="blur" className="h-full w-full object-cover object-[50%_40%]" />
            </div>
            <figcaption className="mx-auto max-w-6xl px-5 pt-2 text-[12px] italic text-gris md:px-10">
              10:40 p. m. Pregunta 23 de 60.
            </figcaption>
          </figure>
        </section>

        {/* S4 · CÓMO FUNCIONA */}
        <section className="border-t border-linea">
          <div className="mx-auto max-w-6xl px-5 py-12 md:grid md:grid-cols-2 md:gap-14 md:px-10 md:py-20">
            <div>
              <p className="text-[14px] font-medium text-gris">Cómo funciona</p>
              <h2 className="mt-2 font-serif text-[2rem] font-semibold leading-[1.08] md:text-5xl">Tres pasos. Uno es gratis.</h2>
              <ol className="mt-8 space-y-7 border-l border-linea pl-6">
                {[
                  ['Contestas 60 preguntas.', 'Una por pantalla. Lo que harías, no lo que se ve bien.'],
                  ['El motor calcula tu mapa.', `Intensidad en ${N_DIMENSIONES} dimensiones, qué tan concentrado está tu perfil y qué tan lejos está tu dimensión fuerte de la débil. Luego, tu afinidad con ${N_RUTAS} rutas.`],
                  ['Ves tu arquetipo gratis.', `Si quieres el mapa completo y tus rutas ordenadas, desbloqueas el reporte de ${PAGINAS_REPORTE} páginas por ${PRODUCT.priceLabel} (${PRODUCT.youthPriceLabel} si tienes menos de 25 años).`],
                ].map(([t, d], i) => (
                  <li key={t} className="relative">
                    <span className="absolute -left-[2.05rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-tinta bg-papel text-[11px] font-semibold">
                      {i + 1}
                    </span>
                    <p className="text-[18px] font-semibold">{t}</p>
                    <p className="mt-1 text-[16px] leading-relaxed text-tinta/80">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <Reveal onView className="mt-10 md:mt-0">
              <figure>
                <Image src={laminaImg} alt="Dibujo técnico a lápiz: un punto de origen que se abre en muchas rutas; una marcada en rojo." quality={55} sizes="(max-width: 768px) 100vw, 45vw" className="h-auto w-full" />
                <figcaption className="mt-2 text-[12px] italic text-gris">
                  Lámina ilustrativa. Tu perfil se compara contra {N_RUTAS} rutas; una sale arriba.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* S5 · PARA PAPÁS (sin foto por ahora: slot listo para dtf-05) */}
        <section className="border-t border-linea bg-tinta text-papel">
          <div className="mx-auto max-w-6xl px-5 py-14 md:grid md:grid-cols-[1.2fr_1fr] md:gap-14 md:px-10 md:py-20">
            <div>
              <p className="text-[14px] font-medium text-papel/60">Para mamá y papá</p>
              <h2 className="mt-2 text-balance font-serif text-[2rem] font-semibold leading-[1.08] md:text-5xl">
                Una colegiatura equivocada no se recupera. Una plática con datos, sí.
              </h2>
            </div>
            <div className="mt-6 md:mt-2">
              <p className="text-[17px] leading-relaxed text-papel/85">
                En las universidades privadas, casi 1 de cada 10 alumnos abandona en un ciclo.<Nota n={5} /> Este reporte no decide
                por tu hijo o tu hija: le da un mapa concreto para platicarlo contigo antes de inscribirse. Para comparar sueldos
                por carrera, el IMCO publica los ingresos promedio en{' '}
                <a href="https://comparacarreras.imco.org.mx/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Compara Carreras
                </a>
                .
              </p>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Mira este test de orientación vocacional, son 60 preguntas: https://descifratufuturo.com')}`}
                className="mt-7 flex h-14 w-full items-center justify-center border border-papel/70 px-5 text-[16px] font-semibold text-papel hover:bg-papel hover:text-tinta md:w-auto"
              >
                Mándaselo por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* S6 · LO QUE NO ES */}
        <section className="border-t border-linea">
          <div className="mx-auto max-w-3xl px-5 py-10 md:py-14">
            <p className="text-[16px] leading-relaxed text-tinta/85">
              <strong className="font-semibold text-tinta">Nota.</strong> El reporte genera {PAGINAS_REPORTE} páginas de datos
              sobre cómo piensas y qué rutas le quedan a ese perfil. No es un test vocacional tradicional, no es un diagnóstico y
              no mide tu inteligencia: mide tus preferencias de pensamiento y te las enseña sin adornos.
            </p>
          </div>
        </section>

        {/* S8 · FAQ */}
        <section className="border-t border-linea">
          <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
            <h2 className="font-serif text-[1.75rem] font-semibold md:text-4xl">Preguntas que nos hacen</h2>
            <div className="mt-6 divide-y divide-linea border-y border-linea">
              {[
                ['¿Cuánto cuesta?', `El test y tu arquetipo son gratis. El reporte completo de ${PAGINAS_REPORTE} páginas cuesta ${PRODUCT.priceLabel}, pago único; si tienes menos de 25 años, ${PRODUCT.youthPriceLabel}.`],
                ['¿Es científico?', `Es un modelo propio de ${N_DIMENSIONES} dimensiones con ${N_PREGUNTAS} preguntas. No está validado clínicamente y no sustituye a un orientador. Te da un mapa para decidir con más información.`],
                ['¿Qué carreras compara?', `${N_RUTAS} rutas: ${careers.map((c) => c.name).join(', ')}.`],
                ['¿Qué hacen con mis respuestas?', 'Las usamos para calcular tu perfil y mandarte el reporte. Los detalles están en el Aviso de privacidad.'],
                ['¿Puedo pedir reembolso?', 'Como el reporte se genera y entrega al instante, las ventas son finales. Si el PDF no te llega o hay una falla técnica, lo corregimos o te lo reenviamos.'],
              ].map(([q, a]) => (
                <details key={q} className="group py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium">
                    {q}
                    <span className="text-xl text-gris-2 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-4 text-[16px] leading-relaxed text-tinta/80">
                    {a}
                    {q.startsWith('¿Qué hacen') && (
                      <>
                        {' '}
                        <Link href="/aviso-de-privacidad" className="underline underline-offset-2">Leer el aviso</Link>.
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* S9 · CIERRE */}
        <section className="border-t border-linea">
          <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
            <p className="text-balance font-serif text-[1.9rem] font-semibold leading-[1.12] md:text-5xl">
              Elegir carrera es la primera decisión grande que vas a tomar. Tómala con datos.
            </p>
            <div className="mt-8">
              <MainCta />
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      <StickyCta targetId="hero-cta" href="/test" label={CTA} />
    </LandingMotion>
  );
}
