'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import type { Question } from '@/lib/questions';
import { questionScript, readMuted } from '@/lib/speech';
import { SpokenLine } from '@/components/voice/SpokenLine';
import { VoiceBar } from '@/components/voice/VoiceBar';
import { useQuestionSpeech } from '@/components/voice/useQuestionSpeech';

export function ExamStage({
    question,
    index,
    total,
    selectedId,
    onSelect,
    dock = false,
    autoSpeak = false,
}: {
    question: Question;
    index: number;
    total: number;
    selectedId?: string;
    onSelect: (optionId: string) => void;
    dock?: boolean;
    autoSpeak?: boolean;
}) {
    const script = questionScript(question);
    const speech = useQuestionSpeech(script);
    const reduce = useReducedMotion();
    const speaking = speech.phase === 'speaking';
    const { speak, silence } = speech;

    useEffect(() => {
        if (!autoSpeak || reduce) return;
        const timer = window.setTimeout(() => {
            if (readMuted()) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            speak();
        }, 260);
        return () => {
            window.clearTimeout(timer);
            silence();
        };
    }, [question.id, autoSpeak, reduce, speak, silence]);

    const play = () => {
        if (speech.phase === 'speaking') speech.pause();
        else if (speech.phase === 'paused') speech.resume();
        else speech.speak();
    };

    return (
        <div className={dock ? 'exam exam-dock' : 'exam'}>
            <div className="q-stack">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={question.id}
                        className="q-panel"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {question.context ? (
                            <SpokenLine
                                as="p"
                                className="q-context"
                                text={question.context}
                                script={script}
                                charIndex={speech.charIndex}
                                active={speaking}
                            />
                        ) : (
                            <p className="q-context q-context-empty" aria-hidden>
                                &nbsp;
                            </p>
                        )}
                        <SpokenLine
                            as="h2"
                            className="q-text"
                            text={question.text}
                            script={script}
                            charIndex={speech.charIndex}
                            active={speaking}
                        />
                        <div className="options" role="listbox" aria-label="Opciones">
                            {question.options.map((option, optionIndex) => {
                                const selected = selectedId === option.id;
                                const letter = String.fromCharCode(97 + optionIndex);
                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        role="option"
                                        aria-selected={selected}
                                        className={selected ? 'option is-on' : 'option'}
                                        onClick={() => onSelect(option.id)}
                                    >
                                        <span className="letter">{letter}</span>
                                        <span>{option.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <VoiceBar
                index={index}
                total={total}
                phase={speech.phase}
                progress={speech.progress}
                peak={speech.peak}
                muted={speech.muted}
                dock={dock}
                onPlay={play}
                onSkip={speech.cancel}
                onRepeat={speech.speak}
                onMute={speech.toggleMute}
            />
        </div>
    );
}
