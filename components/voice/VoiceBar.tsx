'use client';

import type { SpeechPhase } from './useQuestionSpeech';

const BARS = 12;

export function VoiceBar({
    index,
    total,
    phase,
    progress,
    peak,
    muted,
    dock = false,
    onPlay,
    onSkip,
    onRepeat,
    onMute,
}: {
    index: number;
    total: number;
    phase: SpeechPhase;
    progress: number;
    peak: boolean;
    muted: boolean;
    dock?: boolean;
    onPlay: () => void;
    onSkip: () => void;
    onRepeat: () => void;
    onMute: () => void;
}) {
    const unavailable = phase === 'unsupported' || phase === 'blocked';
    const status =
        phase === 'speaking'
            ? 'Escuchando'
            : phase === 'paused'
              ? 'En pausa'
              : unavailable
                ? 'Sin voz'
                : muted
                  ? 'En silencio'
                  : 'Listo';

    const playLabel = phase === 'speaking' ? 'Pausa' : phase === 'paused' ? 'Seguir' : 'Escuchar';

    return (
        <div className={dock ? 'voice voice-dock' : 'voice voice-inline'} role="group" aria-label="Lectura en voz alta">
            <button type="button" className="wave-btn" onClick={onSkip} aria-label="Saltar voz">
                <span className="wave" aria-hidden>
                    {Array.from({ length: BARS }, (_, i) => {
                        const shape = Math.sin(((i + 0.5) / BARS) * Math.PI);
                        const height = phase === 'speaking' ? 3 + shape * 9 * (0.4 + progress * 0.6) : 3;
                        const hot = peak && i === Math.min(BARS - 1, Math.floor(progress * BARS));
                        return <i key={i} className={hot ? 'peak' : undefined} style={{ height }} />;
                    })}
                </span>
            </button>

            <p className="voice-status" aria-live="polite">
                {status} {index}/{total}
            </p>

            <div className="voice-controls">
                <button type="button" onClick={onPlay} disabled={phase === 'unsupported'}>
                    {playLabel}
                </button>
                <button type="button" onClick={onSkip} disabled={unavailable && phase === 'unsupported'}>
                    Saltar
                </button>
                <button type="button" onClick={onRepeat} disabled={phase === 'unsupported'}>
                    Repetir
                </button>
                <button type="button" onClick={onMute} aria-pressed={muted} disabled={phase === 'unsupported'}>
                    {muted ? 'Activar voz' : 'Silenciar'}
                </button>
            </div>
        </div>
    );
}
