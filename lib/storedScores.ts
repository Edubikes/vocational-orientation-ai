const KEY = 'vocational_scores';

export function subscribeScores(onStoreChange: () => void) {
    window.addEventListener('storage', onStoreChange);
    window.addEventListener('dtf-scores', onStoreChange);
    return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener('dtf-scores', onStoreChange);
    };
}

export function readScores() {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(KEY);
    } catch {
        return null;
    }
}

export function writeScores(json: string) {
    localStorage.setItem(KEY, json);
    window.dispatchEvent(new Event('dtf-scores'));
}
