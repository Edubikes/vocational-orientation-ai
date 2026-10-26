type Tag = 'h2' | 'p' | 'span';

function tokensFor(text: string, offset: number) {
    const parts = text.split(/(\s+)/);
    const tokens: { part: string; start: number }[] = [];
    let cursor = offset;
    for (const part of parts) {
        tokens.push({ part, start: cursor });
        cursor += part.length;
    }
    return tokens;
}

export function SpokenLine({
    text,
    script,
    charIndex,
    active,
    as = 'span',
    className,
}: {
    text: string;
    script: string;
    charIndex: number;
    active: boolean;
    as?: Tag;
    className?: string;
}) {
    const TagName = as;
    const offset = Math.max(0, script.indexOf(text));
    const tokens = tokensFor(text, offset);

    return (
        <TagName className={className}>
            {tokens.map((token, index) => {
                if (!token.part.trim()) {
                    return <span key={index}>{token.part}</span>;
                }
                const on = active && charIndex >= token.start && charIndex < token.start + token.part.length;
                return (
                    <span key={index} className={on ? 'word is-on' : 'word'}>
                        {token.part}
                    </span>
                );
            })}
        </TagName>
    );
}
