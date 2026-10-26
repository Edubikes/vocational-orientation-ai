export function transitionTo(router: { push: (href: string) => void }, href: string) {
    if (typeof document === 'undefined') {
        router.push(href);
        return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = document.startViewTransition?.bind(document);

    if (reduced || !start) {
        router.push(href);
        return;
    }

    start(() => {
        router.push(href);
    });
}
