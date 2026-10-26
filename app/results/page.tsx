'use client';

import { useEffect, useMemo, useState, Suspense, useSyncExternalStore } from 'react';
import { CognitiveStyle } from '@/lib/questions';
import { determineArchetype } from '@/lib/archetypes';
import { affinity, rankCareers } from '@/lib/score';
import { readScores, subscribeScores } from '@/lib/storedScores';
import RadarChart from '@/components/RadarChart';
import { useRouter } from 'next/navigation';

function parseProfile(raw: string | null) {
    if (!raw) return null;
    try {
        const profile = JSON.parse(raw) as Record<CognitiveStyle, number>;
        return {
            profile,
            archetype: determineArchetype(profile),
            topCareers: rankCareers(profile).slice(0, 8),
        };
    } catch {
        return null;
    }
}

function ResultsContent() {
    const [expandedCareer, setExpandedCareer] = useState<string | null>(null);
    const router = useRouter();
    const raw = useSyncExternalStore(subscribeScores, readScores, () => null);
    const data = useMemo(() => parseProfile(raw), [raw]);

    useEffect(() => {
        if (data) return;
        if (parseProfile(readScores())) return;
        router.push('/test');
    }, [data, router]);

    if (!data) {
        return (
            <main className="boot-fallback dtf" style={{ display: 'grid', placeItems: 'center' }}>
                <p>Descifrando tu perfil…</p>
            </main>
        );
    }

    const { profile, archetype, topCareers } = data;
    const stylesEntries = Object.entries(profile).sort(([, a], [, b]) => b - a);
    const topStyles = stylesEntries.slice(0, 3).map(([style]) => style);
    const topScore = topCareers[0]?.score ?? 0;

    return (
        <div className="dtf">
            <main id="contenido" className="report">
                <div className="report-tools">
                    <button type="button" onClick={() => window.print()}>
                        Imprimir
                    </button>
                </div>

                <p className="kicker">Tu arquetipo</p>
                <h1>{archetype.name}</h1>
                <p className="lede">{archetype.description}</p>
                <dl className="facts">
                    <div>
                        <dt>Mantra</dt>
                        <dd>{archetype.powerWord}</dd>
                    </div>
                    <div>
                        <dt>Pico</dt>
                        <dd>{topStyles[0]}</dd>
                    </div>
                </dl>

                <section className="band" style={{ paddingInline: 0 }}>
                    <h2>Doce estilos</h2>
                    <p className="lede">
                        Lo que más pesa: {topStyles[0]} y {topStyles[1]}.
                    </p>
                    <ul className="styles">
                        {topStyles.map((style, i) => (
                            <li key={style}>
                                <b>{i + 1}</b>
                                <span>{style}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="radar-wrap">
                        <RadarChart scores={profile} />
                    </div>
                </section>

                <section>
                    <h2>Ocho rutas</h2>
                    <div>
                        {topCareers.map((item, idx) => {
                            const open = expandedCareer === item.career.name;
                            const match = affinity(item.score, topScore);
                            return (
                                <article key={item.career.name} className="career-block">
                                    <button
                                        type="button"
                                        aria-expanded={open}
                                        onClick={() => setExpandedCareer(open ? null : item.career.name)}
                                    >
                                        <b>{String(idx + 1).padStart(2, '0')}</b>
                                        <span>
                                            <h3>{item.career.name}</h3>
                                            <span className="meta">
                                                {item.career.salary}
                                                {/\d/.test(item.career.salary) ? ' MXN' : ''}
                                            </span>
                                        </span>
                                        <span className="pct">{match ?? '—'}%</span>
                                    </button>
                                    {open ? (
                                        <div className="career-open">
                                            <p>{item.career.description}</p>
                                            <h4>Universidades</h4>
                                            {item.details ? (
                                                <ul>
                                                    {item.details.universities.map((uni) => (
                                                        <li key={uni.university.name}>
                                                            <strong>{uni.university.name}</strong>
                                                            <div>
                                                                {uni.university.type === 'Public' ? 'Pública' : 'Privada'} · {uni.university.location}
                                                            </div>
                                                            <a href={uni.university.website} target="_blank" rel="noreferrer">
                                                                Sitio de la escuela
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>{item.career.universities}</p>
                                            )}
                                            <h4>Materias de referencia</h4>
                                            {item.details && item.details.universities.length > 0 ? (
                                                <ul>
                                                    {item.details.universities[0].plan.map((materia) => (
                                                        <li key={materia}>{materia}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>El plan cambia según la escuela. El informe parte de {item.career.name}.</p>
                                            )}
                                        </div>
                                    ) : null}
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<main className="boot-fallback">Leyendo tus respuestas…</main>}>
            <ResultsContent />
        </Suspense>
    );
}
