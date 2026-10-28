'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { LogoMark } from '@/components/brand/LogoMark';
import { LivingField, type FieldPointer } from '@/components/vivo/LivingField';
import { careers } from '@/lib/careers';
import { PRICE_LABEL } from '@/lib/price';
import { questions } from '@/lib/questions';

const ROUTE_NAMES = [
    'Ingeniería en Inteligencia Artificial',
    'Neurocirugía',
    'Dirección de Cine',
    'Derecho Penal',
    'Arquitectura Sustentable',
    'Biología Marina',
    'Emprendimiento Social',
    'Piloto Aviador',
] as const;

const RITUAL = [
    {
        title: 'Pregunta',
        body: 'Sesenta escenarios reales. Eliges de la a a la e y el mapa se mueve.',
    },
    {
        title: 'Pago',
        body: `${PRICE_LABEL} MXN, una vez. El precio del informe completo.`,
    },
    {
        title: 'Lectura',
        body: 'Arquetipo, ocho rutas, universidades y materias, en esta pantalla.',
    },
] as const;

const FAQ = [
    {
        q: '¿Tengo que registrarme?',
        a: 'No. Entras, respondes y el informe se calcula en este mismo teléfono.',
    },
    {
        q: '¿Cuánto dura?',
        a: 'Sesenta preguntas, a tu ritmo. La mayoría termina en una sentada.',
    },
    {
        q: '¿Qué incluye el pago?',
        a: `${PRICE_LABEL} MXN. El informe completo: arquetipo, ocho rutas, universidades y materias.`,
    },
    {
        q: '¿Las rutas de abajo ya son mías?',
        a: 'No. Son ejemplos del mismo banco. Tu orden sale después de contestar.',
    },
] as const;

const ROUTES = ROUTE_NAMES.map((name) => careers.find((career) => career.name === name)).filter(
    (career) => career != null,
);

function money(value: string) {
    if (!/\d/.test(value) || value.includes('MXN')) return value;
    return `${value} MXN`;
}

function Ritual({ reduce }: { reduce: boolean }) {
    const [beat, setBeat] = useState(0);
    const timer = useRef<number | null>(null);

    const arm = useCallback(() => {
        if (timer.current) window.clearInterval(timer.current);
        if (reduce) return;
        timer.current = window.setInterval(() => {
            setBeat((current) => (current + 1) % RITUAL.length);
        }, 3400);
    }, [reduce]);

    useEffect(() => {
        arm();
        return () => {
            if (timer.current) window.clearInterval(timer.current);
        };
    }, [arm]);

    if (reduce) {
        return (
            <ol className="vivo-beats">
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
        <div className="vivo-ritual">
            <div className="vivo-ritual-nav" role="tablist" aria-label="Pasos del ritual">
                {RITUAL.map((item, index) => {
                    const on = index === beat;
                    return (
                        <button
                            key={item.title}
                            type="button"
                            role="tab"
                            id={`ritual-tab-${index}`}
                            aria-selected={on}
                            aria-controls="ritual-panel"
                            className={on ? 'is-on' : undefined}
                            onClick={() => {
                                setBeat(index);
                                arm();
                            }}
                        >
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            {item.title}
                            {on ? <i key={beat} className="vivo-step-fill" /> : null}
                        </button>
                    );
                })}
            </div>
            <div
                className="vivo-ritual-copy"
                id="ritual-panel"
                role="tabpanel"
                aria-live="polite"
                aria-labelledby={`ritual-tab-${beat}`}
            >
                <p key={step.title}>{step.body}</p>
            </div>
        </div>
    );
}

function SampleExam() {
    const [index, setIndex] = useState(0);
    const [pick, setPick] = useState<string | null>(null);
    const timer = useRef<number | null>(null);
    const question = questions[index];

    useEffect(() => {
        return () => {
            if (timer.current) window.clearTimeout(timer.current);
        };
    }, []);

    const choose = (optionId: string) => {
        if (pick) return;
        setPick(optionId);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            setPick(null);
            setIndex((current) => (current + 1) % 3);
        }, 520);
    };

    return (
        <div className="vivo-exam">
            <p className="vivo-kicker">
                Pregunta {question.id} de {questions.length}
            </p>
            {question.context ? <p className="vivo-context">{question.context}</p> : null}
            <h3>{question.text}</h3>
            <div className="vivo-options">
                {question.options.map((option) => {
                    const on = pick === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            className={on ? 'is-on' : undefined}
                            aria-pressed={on}
                            onClick={() => choose(option.id)}
                        >
                            <b>{option.id.toUpperCase()}</b>
                            <span>{option.text}</span>
                        </button>
                    );
                })}
            </div>
            <p className="vivo-micro">Esto no se guarda. Es para sentir el ritmo.</p>
        </div>
    );
}

function RouteDeck() {
    const [index, setIndex] = useState(0);
    const career = ROUTES[index];
    if (!career) return null;

    return (
        <div className="vivo-map">
            <div className="vivo-scrub" role="tablist" aria-label="Rutas de ejemplo">
                {ROUTES.map((item, itemIndex) => {
                    const on = itemIndex === index;
                    return (
                        <button
                            key={item.name}
                            type="button"
                            role="tab"
                            aria-selected={on}
                            className={on ? 'is-on' : undefined}
                            onClick={() => setIndex(itemIndex)}
                        >
                            {String(itemIndex + 1).padStart(2, '0')}
                        </button>
                    );
                })}
            </div>
            <article className="vivo-route" key={career.name} role="tabpanel">
                <p className="vivo-kicker">Ruta {String(index + 1).padStart(2, '0')}</p>
                <h3>{career.name}</h3>
                <p>{career.description}</p>
                <p className="vivo-salary">
                    <span>Salario de referencia</span>
                    {money(career.salary)}
                </p>
                <p className="vivo-schools">{career.universities}</p>
            </article>
        </div>
    );
}

function Faq() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="vivo-faq">
            {FAQ.map((item, index) => {
                const isOpen = open === index;
                return (
                    <div key={item.q} className={isOpen ? 'is-open' : undefined}>
                        <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpen(isOpen ? null : index)}
                        >
                            {item.q}
                            <span aria-hidden>{isOpen ? '–' : '+'}</span>
                        </button>
                        {isOpen ? <p>{item.a}</p> : null}
                    </div>
                );
            })}
        </div>
    );
}

export function VivoLanding() {
    const pointer = useRef<FieldPointer>({ x: 0.5, y: 0.5, on: false });
    const frameRef = useRef<HTMLDivElement>(null);
    const heroCta = useRef<HTMLAnchorElement>(null);
    const endCta = useRef<HTMLAnchorElement>(null);
    const [reduce, setReduce] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => setReduce(media.matches);
        apply();
        media.addEventListener('change', apply);
        return () => media.removeEventListener('change', apply);
    }, []);

    useEffect(() => {
        if (reduce) return;
        const id = window.setInterval(() => {
            setTick((current) => (current + 1) % careers.length);
        }, 1800);
        return () => window.clearInterval(id);
    }, [reduce]);

    useEffect(() => {
        const nodes = [heroCta.current, endCta.current].filter((node): node is HTMLAnchorElement => node != null);
        if (!nodes.length) return;
        const visible = new Set<Element>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) visible.add(entry.target);
                    else visible.delete(entry.target);
                });
                setSticky(window.scrollY > 420 && visible.size === 0);
            },
            { threshold: 0.4 },
        );
        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    const pull = (event: PointerEvent<HTMLDivElement>) => {
        const frame = frameRef.current;
        if (!frame) return;
        const rect = frame.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return;
        pointer.current.x = (event.clientX - rect.left) / rect.width;
        pointer.current.y = (event.clientY - rect.top) / rect.height;
        pointer.current.on = true;
        frame.dataset.pull = '1';
    };

    const release = () => {
        pointer.current.on = false;
        if (frameRef.current) delete frameRef.current.dataset.pull;
    };

    const careerName = careers[tick]?.name ?? careers[0].name;

    return (
        <div className={sticky ? 'vivo is-sticky' : 'vivo'} data-page="ritual-vivo">
            <a className="vivo-skip" href="#contenido">
                Saltar al contenido
            </a>
            <header className="vivo-bar">
                <div className="vivo-bar-inner">
                    <Link href="/" className="vivo-brand">
                        <LogoMark size={26} />
                        <span>Descifra</span>
                    </Link>
                    <Link href="/test">Empezar</Link>
                </div>
            </header>

            <main id="contenido">
                <section className="vivo-hero">
                    <div className="vivo-hero-copy">
                        <p className="vivo-kicker">SORE · {questions.length} preguntas</p>
                        <h1>
                            Tu carrera ya la eligió <em>alguien más.</em>
                        </h1>
                        <p className="vivo-lede">
                            Sesenta escenarios. Ocho rutas con universidades de México.
                        </p>
                        <Link ref={heroCta} className="vivo-cta" href="/test">
                            Acércate a tu futuro
                        </Link>
                        <p className="vivo-micro">
                            Sin cuenta. A tu ritmo. Informe completo: {PRICE_LABEL} MXN.
                        </p>
                        <p className="vivo-ticker" aria-hidden>
                            <span>En el banco</span>
                            <b key={reduce ? 'still' : careerName}>{careerName}</b>
                        </p>
                    </div>

                    <div
                        className="vivo-frame"
                        ref={frameRef}
                        onPointerDown={pull}
                        onPointerMove={pull}
                        onPointerUp={release}
                        onPointerLeave={release}
                        onPointerCancel={release}
                    >
                        <LivingField pointer={pointer} />
                        <p className="vivo-frame-label">
                            <i /> Brújula
                        </p>
                        <p className="vivo-frame-hint">
                            <span className="idle">Toca y jala el hilo</span>
                            <span className="pull">Jalando</span>
                        </p>
                    </div>
                </section>

                <section className="vivo-section" id="ritual">
                    <p className="vivo-kicker">01 — Ritual</p>
                    <h2>Tres tiempos.</h2>
                    <Ritual reduce={reduce} />
                </section>

                <section className="vivo-section" id="prueba">
                    <p className="vivo-kicker">02 — Banco real</p>
                    <h2>Una pregunta, en serio.</h2>
                    <p className="vivo-lede">Sale del mismo banco de las sesenta. No es un texto de relleno.</p>
                    <SampleExam />
                </section>

                <section className="vivo-section" id="mapa">
                    <p className="vivo-kicker">03 — Mapa</p>
                    <h2>Ocho rutas del informe.</h2>
                    <p className="vivo-lede">Salario de referencia y escuelas. Todavía no es tu orden.</p>
                    <RouteDeck />
                </section>

                <section className="vivo-section vivo-close" id="precio">
                    <p className="vivo-kicker">04 — Precio</p>
                    <h2>El informe completo.</h2>
                    <p className="vivo-price">
                        <span>{PRICE_LABEL}</span>
                        <small>MXN</small>
                    </p>
                    <i className="vivo-price-rule" aria-hidden />
                    <p className="vivo-lede">
                        Un pago. Lees el arquetipo, las ocho rutas, las universidades y las materias en esta pantalla.
                    </p>
                    <ul className="vivo-deliver">
                        <li>
                            <span>01</span>Arquetipo de pensamiento
                        </li>
                        <li>
                            <span>02</span>Ocho rutas por afinidad
                        </li>
                        <li>
                            <span>03</span>Universidades en México
                        </li>
                        <li>
                            <span>04</span>Materias de referencia
                        </li>
                    </ul>
                    <Link ref={endCta} className="vivo-cta" href="/test">
                        Acércate a tu futuro
                    </Link>
                    <Faq />
                </section>
            </main>

            <footer className="vivo-foot">
                <div className="vivo-foot-inner">
                    <LogoMark size={22} />
                    <div>
                        <strong>Descifra Tu Futuro</strong>
                        <span>SORE · orientación vocacional</span>
                    </div>
                    <Link href="/test">Empezar</Link>
                </div>
            </footer>

            <div className={sticky ? 'vivo-sticky is-on' : 'vivo-sticky'} aria-hidden={sticky ? undefined : true}>
                <Link href="/test" tabIndex={sticky ? 0 : -1}>
                    Acércate a tu futuro
                </Link>
            </div>
        </div>
    );
}
