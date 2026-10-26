'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { LogoMark } from '@/components/brand/LogoMark';
import { ExamStage } from '@/components/exam/ExamStage';
import { transitionTo } from '@/lib/navigate';
import { questions } from '@/lib/questions';
import { scoreAnswers } from '@/lib/score';
import { isVoiceArmed } from '@/lib/speech';
import { writeScores } from '@/lib/storedScores';
import Link from 'next/link';

function subscribeArmed(onStoreChange: () => void) {
    window.addEventListener('dtf-armed', onStoreChange);
    window.addEventListener('storage', onStoreChange);
    return () => {
        window.removeEventListener('dtf-armed', onStoreChange);
        window.removeEventListener('storage', onStoreChange);
    };
}

function readArmed() {
    return isVoiceArmed();
}

export default function TestClient() {
    const router = useRouter();
    const params = useSearchParams();
    const promo = params.get('promo') === '1';
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [processing, setProcessing] = useState(false);
    const armed = useSyncExternalStore(subscribeArmed, readArmed, () => false);
    const answersRef = useRef(answers);
    const timer = useRef<number | null>(null);
    const question = questions[index];
    const total = questions.length;

    useEffect(() => {
        return () => {
            if (timer.current) window.clearTimeout(timer.current);
        };
    }, []);

    const finish = (finalAnswers: Record<number, string>) => {
        if (timer.current) window.clearTimeout(timer.current);
        const scores = scoreAnswers(finalAnswers);
        try {
            writeScores(JSON.stringify(scores));
        } catch {
            /* still show the profile in this tab if storage fails */
        }
        setProcessing(true);
        window.setTimeout(() => {
            transitionTo(router, promo ? '/perfil?promo=1' : '/perfil');
        }, promo ? 1400 : 900);
    };

    const select = (optionId: string) => {
        if (processing) return;
        const next = { ...answersRef.current, [question.id]: optionId };
        answersRef.current = next;
        setAnswers(next);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            const last = index >= total - 1;
            const promoDone = promo && index >= 1;
            if (last || promoDone) finish(next);
            else {
                setIndex((current) => current + 1);
                window.scrollTo(0, 0);
            }
        }, 420);
    };

    const back = () => {
        if (timer.current) window.clearTimeout(timer.current);
        setIndex((current) => Math.max(0, current - 1));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (!promo || processing) return;
        if (index >= 2) return;
        const timerId = window.setTimeout(() => {
            const option = questions[index].options[Math.min(1, questions[index].options.length - 1)];
            select(option.id);
        }, 4500);
        return () => window.clearTimeout(timerId);
        // select is recreated each render; the promo beat is keyed only by the question index.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [promo, index, processing]);

    useEffect(() => {
        if (!promo) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (timer.current) window.clearTimeout(timer.current);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [promo]);

    const progress = (index / total) * 100;

    return (
        <div className="dtf exam-page">
            <header className="exam-top">
                <Link href="/" className="brand" aria-label="Descifra Tu Futuro, inicio">
                    <LogoMark />
                    <span className="wordmark">Descifra</span>
                </Link>
                <p className="exam-count">
                    {index + 1}/{total}
                </p>
                <button type="button" className="nav-text" onClick={back} disabled={index === 0 || processing}>
                    Atrás
                </button>
            </header>
            <div className="track" aria-hidden>
                <i style={{ width: `${progress}%` }} />
            </div>

            <main id="contenido">
                {processing ? (
                    <div className="processing" role="status" aria-live="polite">
                        <b>Ordenando tus respuestas</b>
                        <div className="bar">
                            <i />
                        </div>
                    </div>
                ) : (
                    <ExamStage
                        question={question}
                        index={index + 1}
                        total={total}
                        selectedId={answers[question.id]}
                        onSelect={select}
                        dock
                        autoSpeak={armed}
                    />
                )}
            </main>
        </div>
    );
}
