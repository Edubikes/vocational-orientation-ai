export const MUTE_KEY = 'dtf-muted';
export const ARMED_KEY = 'dtf-voice-armed';

export function readMuted() {
    try {
        return sessionStorage.getItem(MUTE_KEY) === '1';
    } catch {
        return false;
    }
}

export function unlockSpeech() {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.setItem(ARMED_KEY, '1');
        window.dispatchEvent(new Event('dtf-armed'));
    } catch {
        /* private mode */
    }

    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return;

    try {
        synth.resume();
        const primer = new SpeechSynthesisUtterance(' ');
        primer.volume = 0;
        primer.rate = 1;
        primer.lang = 'es-MX';
        synth.speak(primer);
    } catch {
        /* the question still renders */
    }
}

export function isVoiceArmed() {
    try {
        return sessionStorage.getItem(ARMED_KEY) === '1';
    } catch {
        return false;
    }
}

export function questionScript(q: { context?: string; text: string }) {
    const context = q.context?.trim();
    return context ? `${context} ${q.text}` : q.text;
}
