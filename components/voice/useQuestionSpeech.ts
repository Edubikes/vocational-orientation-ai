'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { MUTE_KEY, readMuted } from '@/lib/speech';

export type SpeechPhase = 'idle' | 'speaking' | 'paused' | 'unsupported' | 'blocked';

function subscribeMute(onStoreChange: () => void) {
    window.addEventListener('dtf-mute', onStoreChange);
    return () => window.removeEventListener('dtf-mute', onStoreChange);
}

function pickVoice(synth: SpeechSynthesis) {
    const voices = synth.getVoices();
    const norm = (lang: string) => lang.toLowerCase().replace('_', '-');
    return (
        voices.find((v) => norm(v.lang) === 'es-mx') ||
        voices.find((v) => norm(v.lang).startsWith('es-mx')) ||
        voices.find((v) => norm(v.lang).startsWith('es')) ||
        null
    );
}

export function useQuestionSpeech(script: string) {
    const muted = useSyncExternalStore(subscribeMute, readMuted, () => false);
    const [phase, setPhase] = useState<SpeechPhase>('idle');
    const [progress, setProgress] = useState(0);
    const [charIndex, setCharIndex] = useState(-1);
    const [peak, setPeak] = useState(false);
    const gen = useRef(0);
    const raf = useRef(0);
    const mutedRef = useRef(false);
    const scriptRef = useRef(script);
    const peakTimer = useRef(0);

    useEffect(() => {
        scriptRef.current = script;
    }, [script]);

    useEffect(() => {
        mutedRef.current = muted;
    }, [muted]);

    useEffect(() => {
        return () => {
            gen.current += 1;
            cancelAnimationFrame(raf.current);
            window.clearTimeout(peakTimer.current);
            window.speechSynthesis?.cancel();
        };
    }, []);

    const silence = useCallback(() => {
        gen.current += 1;
        cancelAnimationFrame(raf.current);
        window.clearTimeout(peakTimer.current);
        window.speechSynthesis?.cancel();
    }, []);

    const cancel = useCallback(() => {
        silence();
        setProgress(0);
        setCharIndex(-1);
        setPeak(false);
        setPhase((current) => (current === 'unsupported' ? current : 'idle'));
    }, [silence]);

    const speak = useCallback(() => {
        const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
        if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
            setPhase('unsupported');
            return;
        }
        if (mutedRef.current) {
            setPhase('idle');
            return;
        }

        silence();
        const token = ++gen.current;
        const text = scriptRef.current;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-MX';
        utterance.rate = 0.95;
        utterance.pitch = 1;

        const voice = pickVoice(synth);
        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang || 'es-MX';
        }

        const estimate = Math.max(2.4, text.length / 12.5);

        utterance.onstart = () => {
            if (token !== gen.current) return;
            setPhase('speaking');
            const started = performance.now();
            const tick = () => {
                if (token !== gen.current) return;
                setProgress(Math.min(0.98, (performance.now() - started) / 1000 / estimate));
                raf.current = requestAnimationFrame(tick);
            };
            raf.current = requestAnimationFrame(tick);
        };

        utterance.onboundary = (event) => {
            if (token !== gen.current) return;
            setCharIndex(event.charIndex ?? -1);
            setPeak(true);
            window.clearTimeout(peakTimer.current);
            peakTimer.current = window.setTimeout(() => {
                if (token === gen.current) setPeak(false);
            }, 110);
        };

        utterance.onend = () => {
            if (token !== gen.current) return;
            cancelAnimationFrame(raf.current);
            setProgress(1);
            setCharIndex(-1);
            setPhase('idle');
        };

        utterance.onerror = (event) => {
            if (token !== gen.current) return;
            cancelAnimationFrame(raf.current);
            if (event.error === 'canceled' || event.error === 'interrupted') {
                setPhase('idle');
                return;
            }
            setPhase('blocked');
        };

        try {
            synth.resume();
            synth.speak(utterance);
            window.setTimeout(() => {
                if (token !== gen.current) return;
                if (synth.paused) synth.resume();
            }, 240);
        } catch {
            setPhase('blocked');
        }
    }, [silence]);

    useEffect(() => {
        const synth = window.speechSynthesis;
        if (!synth) return;
        const warm = () => {
            synth.getVoices();
        };
        warm();
        synth.addEventListener?.('voiceschanged', warm);
        return () => synth.removeEventListener?.('voiceschanged', warm);
    }, []);

    const toggleMute = useCallback(() => {
        const next = !mutedRef.current;
        mutedRef.current = next;
        try {
            sessionStorage.setItem(MUTE_KEY, next ? '1' : '0');
            window.dispatchEvent(new Event('dtf-mute'));
        } catch {
            /* ignore */
        }
        if (next) {
            gen.current += 1;
            cancelAnimationFrame(raf.current);
            window.speechSynthesis?.cancel();
            setPhase((current) => (current === 'unsupported' ? current : 'idle'));
            setProgress(0);
            setCharIndex(-1);
        }
    }, []);

    const pause = useCallback(() => {
        const synth = window.speechSynthesis;
        if (!synth) return;
        synth.pause();
        cancelAnimationFrame(raf.current);
        setPhase('paused');
    }, []);

    const resume = useCallback(() => {
        const synth = window.speechSynthesis;
        if (!synth) return;
        synth.resume();
        setPhase('speaking');
    }, []);

    return {
        muted,
        phase,
        progress,
        charIndex,
        peak,
        speak,
        cancel,
        silence,
        toggleMute,
        pause,
        resume,
    };
}
