'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { determineArchetype } from '@/lib/archetypes';
import type { CognitiveStyle } from '@/lib/questions';
import { affinity, rankCareers } from '@/lib/score';
import { readScores, subscribeScores } from '@/lib/storedScores';

type Scores = Record<CognitiveStyle, number>;

function parseProfile(raw: string | null) {
    if (!raw) return null;
    try {
        const scores = JSON.parse(raw) as Scores;
        return {
            scores,
            archetype: determineArchetype(scores),
            routes: rankCareers(scores).slice(0, 8),
        };
    } catch {
        return null;
    }
}

export default function PerfilClient() {
    const router = useRouter();
    const raw = useSyncExternalStore(subscribeScores, readScores, () => null);
    const profile = useMemo(() => parseProfile(raw), [raw]);

    useEffect(() => {
        if (profile) return;
        if (parseProfile(readScores())) return;
        router.replace('/test');
    }, [profile, router]);

    if (!profile || profile.routes.length === 0) {
        return (
            <main id="contenido" className="dtf boot-fallback">
                <p>Leyendo tus respuestas…</p>
            </main>
        );
    }

    const { scores, archetype, routes } = profile;

    const top = Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0];
    const lead = routes[0];
    const rest = routes.slice(1);
    const topScore = lead.score;

    return (
        <div className="dtf">
            <main id="contenido" className="perfil">
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
                        <dd>{top}</dd>
                    </div>
                </dl>

                <section className="stack" aria-label="Rutas">
                    <article className="lead-route">
                        <p className="kicker">Ruta 01 · nítida</p>
                        <h2>{lead.career.name}</h2>
                        <p className="blurb">{lead.career.description}</p>
                        <p className="salary">
                            {lead.career.salary}
                            {/\d/.test(lead.career.salary) ? ' MXN' : ''}
                            <span>{affinity(lead.score, topScore) ?? 100}%</span>
                        </p>
                        <p className="schools">{lead.career.universities}</p>
                    </article>

                    <ol className="veil-list">
                        {rest.map((item, index) => (
                            <li key={item.career.name}>
                                <span>{String(index + 2).padStart(2, '0')}</span>
                                <span className="veil">{item.career.name}</span>
                                <b>{affinity(item.score, topScore) ?? '—'}%</b>
                            </li>
                        ))}
                    </ol>
                </section>
            </main>

            <div className="paydock">
                <Link className="cta" href="/checkout" prefetch={false}>
                    Acércate a tu futuro
                </Link>
                <p>
                    <s>$99</s> $10 MXN · análisis completo al correo
                </p>
            </div>
        </div>
    );
}
