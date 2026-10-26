'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LogoMark } from '@/components/brand/LogoMark';
import { ExamStage } from '@/components/exam/ExamStage';
import { InkField } from '@/components/hero/InkField';
import { careers } from '@/lib/careers';
import { transitionTo } from '@/lib/navigate';
import { questions } from '@/lib/questions';
import { unlockSpeech } from '@/lib/speech';

const MAP_NAMES = [
    'Ingeniería en Inteligencia Artificial',
    'Neurocirugía',
    'Dirección de Cine',
    'Derecho Penal',
    'Arquitectura Sustentable',
    'Biología Marina',
    'Emprendimiento Social',
    'Piloto Aviador',
];

const FAQ = [
    {
        q: '¿Tengo que registrarme?',
        a: 'No. Entras, respondes y lees el arquetipo en esta misma pantalla.',
    },
    {
        q: '¿La voz es obligatoria?',
        a: 'No. Si la silencias o el navegador la bloquea, la pregunta sigue en pantalla y puedes contestar.',
    },
    {
        q: '¿Qué veo antes de pagar?',
        a: 'El arquetipo y la ruta número uno, nítidos. Las otras siete rutas quedan veladas.',
    },
    {
        q: '¿Cuánto cuesta y qué llega?',
        a: '$10 MXN, antes $99. El análisis completo —ocho rutas, universidades y materias— llega al correo.',
    },
];

const RITUAL = [
    {
        title: 'Pregunta',
        body: 'Cada pregunta se lee en voz alta. Tú eliges de la a a la e.',
    },
    {
        title: 'Perfil',
        body: 'El arquetipo queda a la vista. La primera ruta, nítida. Las otras siete, veladas.',
    },
    {
        title: 'Futuro',
        body: 'Ocho rutas, universidades y materias, al correo.',
    },
];

function money(value: string) {
    return /\d/.test(value) ? `${value} MXN` : value;
}

function RitualMorph() {
    const reduce = useReducedMotion();
    const [beat, setBeat] = useState(0);

    useEffect(() => {
        if (reduce) return;
        const timer = window.setInterval(() => {
            setBeat((current) => (current + 1) % RITUAL.length);
        }, 2800);
        return () => window.clearInterval(timer);
    }, [reduce]);

    if (reduce) {
        return (
            <ol className="beats">
                {RITUAL.map((step, index) => (
                    <li key={step.title}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <div>
                            <strong>{step.title}</strong>
                            <p>{step.body}</p>
                        </div>
                    </li>
                ))}
            </ol>
        );
    }

    const step = RITUAL[beat];
    return (
        <div className="morph" aria-live="polite">
            <div className={`morph-glyph is-${beat}`} aria-hidden>
                <i />
                <i />
                <i />
            </div>
            <div className="morph-copy">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <strong>{step.title}</strong>
                        <p>{step.body}</p>
                    </motion.div>
                </AnimatePresence>
                <div className="morph-dots">
                    {RITUAL.map((item, index) => (
                        <button
                            key={item.title}
                            type="button"
                            aria-label={item.title}
                            aria-pressed={index === beat}
                            onClick={() => setBeat(index)}
                        >
                            <i />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Landing() {
    const router = useRouter();
    const params = useSearchParams();
    const promo = params.get('promo') === '1';
    const total = questions.length;
    const sample = questions.slice(0, 3);
    const [sampleIndex, setSampleIndex] = useState(0);
    const [samplePick, setSamplePick] = useState<string | undefined>();
    const [routeIndex, setRouteIndex] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [sticky, setSticky] = useState(false);
    const heroCta = useRef<HTMLAnchorElement>(null);
    const endCta = useRef<HTMLAnchorElement>(null);
    const sampleTimer = useRef<number | null>(null);

    const routes = useMemo(
        () => MAP_NAMES.map((name) => careers.find((career) => career.name === name)).filter((career) => career != null),
        [],
    );
    const activeRoute = routes[routeIndex] ?? routes[0];

    const goTest = (event: ReactMouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        unlockSpeech();
        transitionTo(router, '/test?voice=1');
    };

    useEffect(() => {
        const ritual = document.getElementById('ritual');
        const nodes = [heroCta.current, endCta.current, ritual].filter((node): node is HTMLElement => node != null);
        if (!nodes.length) return;
        const visible = new Set<Element>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) visible.add(entry.target);
                    else visible.delete(entry.target);
                });
                const past = window.scrollY > document.documentElement.scrollHeight * 0.4 || window.scrollY > 520;
                setSticky(past && visible.size === 0);
            },
            { threshold: 0.4 },
        );
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!promo) return;
        let alive = true;
        try {
            sessionStorage.setItem('dtf-voice-armed', '1');
        } catch {
            /* ignore */
        }

        const stop = () => {
            alive = false;
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') stop();
        };
        const onClick = (event: globalThis.MouseEvent) => {
            const target = event.target;
            if (target instanceof Element && target.closest('a, button')) stop();
        };
        const onPointer = () => unlockSpeech();

        window.addEventListener('keydown', onKey);
        window.addEventListener('click', onClick, true);
        window.addEventListener('pointerdown', onPointer, { capture: true, once: true });

        const toRitual = window.setTimeout(() => {
            if (!alive) return;
            document.getElementById('ritual')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 3800);
        const toTest = window.setTimeout(() => {
            if (!alive) return;
            transitionTo(router, '/test?promo=1');
        }, 8200);

        return () => {
            alive = false;
            window.clearTimeout(toRitual);
            window.clearTimeout(toTest);
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('click', onClick, true);
            window.removeEventListener('pointerdown', onPointer, true);
        };
    }, [promo, router]);

    const pickSample = (optionId: string) => {
        setSamplePick(optionId);
        if (sampleTimer.current) window.clearTimeout(sampleTimer.current);
        sampleTimer.current = window.setTimeout(() => {
            setSamplePick(undefined);
            setSampleIndex((current) => (current + 1) % sample.length);
        }, 420);
    };

    return (
        <div className="dtf">
            <main id="contenido">
                <section className="hook" id="hook">
                    <InkField />
                    <div className="hook-copy">
                        <p className="kicker rise d1">SORE · {total} preguntas</p>
                        <h1 className="rise d2">
                            Tu carrera ya la eligió <span className="mark">alguien más.</span>
                        </h1>
                        <p className="lede">
                            {total} preguntas. Voz que te guía. 8 rutas con datos.
                        </p>
                        <a ref={heroCta} className="cta rise d3" href="/test?voice=1" onClick={goTest}>
                            Acércate a tu futuro
                        </a>
                        <p className="micro">Sin registro. Cerca de doce minutos. La voz se apaga cuando quieras.</p>
                    </div>

                    <RitualMorph />
                </section>

                <section className="band" id="ritual">
                    <div className="band-head">
                        <p className="kicker">02 — La prueba</p>
                        <h2>Una pregunta. En voz alta.</h2>
                        <p className="lede">Del banco real. Si la voz falla, respondes igual.</p>
                    </div>
                    <ExamStage
                        question={sample[sampleIndex]}
                        index={sampleIndex + 1}
                        total={total}
                        selectedId={samplePick}
                        onSelect={pickSample}
                    />
                </section>

                <section className="band" id="prueba">
                    <div className="split">
                        <div>
                            <p className="kicker">03 — El informe</p>
                            <h2>Lo que queda escrito.</h2>
                            <p className="lede">Datos del reporte. Nada de esto se inventa al cerrar la página.</p>
                        </div>
                        <ul className="deliver">
                            <li>
                                <span>Arquetipo</span>
                                <b>Se lee antes de pagar</b>
                            </li>
                            <li>
                                <span>12 estilos</span>
                                <b>El mapa de cómo piensas</b>
                            </li>
                            <li>
                                <span>8 rutas</span>
                                <b>Ordenadas por afinidad</b>
                            </li>
                            <li>
                                <span>Universidades</span>
                                <b>Escuelas en México</b>
                            </li>
                            <li>
                                <span>Materias</span>
                                <b>Un plan de referencia</b>
                            </li>
                        </ul>
                    </div>

                    <div className="dossier" aria-hidden>
                        <article className="sheet sheet-back" />
                        <article className="sheet sheet-mid" />
                        <article className="sheet sheet-front">
                            <p>Informe · ejemplo de lectura</p>
                            <div className="sheet-row sharp">
                                <b>01</b>
                                <span>Dirección de Cine</span>
                            </div>
                            <div className="sheet-row">
                                <b>02</b>
                                <span className="veil">Arquitectura Sustentable</span>
                                <em>86%</em>
                            </div>
                            <div className="sheet-row">
                                <b>03</b>
                                <span className="veil">Derecho Penal</span>
                                <em>74%</em>
                            </div>
                            <div className="sheet-row">
                                <b>04</b>
                                <span className="veil">Psiquiatría</span>
                                <em>69%</em>
                            </div>
                        </article>
                    </div>
                    <p className="micro">Ejemplo de cómo se vela el informe. No es tu resultado.</p>
                </section>

                <section className="band" id="mapa">
                    <div className="band-head">
                        <p className="kicker">04 — Mapa</p>
                        <h2>Ocho rutas del informe.</h2>
                        <p className="lede">Salario de referencia y escuelas del banco. Todavía no es tu orden.</p>
                    </div>
                    <div className="mapa-grid">
                        <div className="mapa-list" role="listbox" aria-label="Rutas de ejemplo">
                            {routes.map((career, index) => (
                                <button
                                    key={career.name}
                                    type="button"
                                    role="option"
                                    aria-selected={index === routeIndex}
                                    className={index === routeIndex ? 'route-btn is-on' : 'route-btn'}
                                    onClick={() => setRouteIndex(index)}
                                >
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    {career.name}
                                </button>
                            ))}
                        </div>
                        {activeRoute ? (
                            <article className="mapa-detail" key={activeRoute.name}>
                                <p className="kicker">Ruta {String(routeIndex + 1).padStart(2, '0')}</p>
                                <h3>{activeRoute.name}</h3>
                                <p>{activeRoute.description}</p>
                                <p className="salary">{money(activeRoute.salary)}</p>
                                <p className="schools">{activeRoute.universities}</p>
                            </article>
                        ) : null}
                    </div>
                </section>

                <section className="band cierre" id="cierre">
                    <p className="kicker">05 — Precio</p>
                    <h2>El análisis completo.</h2>
                    <p className="price">
                        <s>$99</s>
                        <span>$10</span>
                        <small>MXN</small>
                    </p>
                    <p className="offer-day">último día</p>
                    <p className="lede">Arquetipo y ruta 1, antes. El resto, al correo, después de pagar.</p>
                    <a ref={endCta} className="cta" href="/test?voice=1" onClick={goTest}>
                        Acércate a tu futuro
                    </a>

                    <div className="faq">
                        {FAQ.map((item, index) => {
                            const open = openFaq === index;
                            return (
                                <div key={item.q} className={open ? 'faq-item is-open' : 'faq-item'}>
                                    <button
                                        type="button"
                                        aria-expanded={open}
                                        onClick={() => setOpenFaq(open ? null : index)}
                                    >
                                        {item.q}
                                        <span aria-hidden>{open ? '–' : '+'}</span>
                                    </button>
                                    {open ? <p>{item.a}</p> : null}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            <footer className="colophon">
                <LogoMark size={22} />
                <div>
                    <strong>Descifra Tu Futuro</strong>
                    <span>SORE · orientación vocacional</span>
                </div>
                <Link href="/test?voice=1" onClick={goTest}>
                    Empezar
                </Link>
            </footer>

            <div className={sticky ? 'sticky-cta is-on' : 'sticky-cta'} aria-hidden={!sticky}>
                <a className="cta" href="/test?voice=1" onClick={goTest} tabIndex={sticky ? 0 : -1}>
                    Acércate a tu futuro
                </a>
            </div>
        </div>
    );
}
