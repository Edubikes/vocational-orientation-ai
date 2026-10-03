/**
 * Anotaciones "a mano" en rojo corrección. SVG estático (sin animación):
 * el trazo irregular es lo que lo hace humano, no el movimiento.
 */

export function Underline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full text-rojo ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 9.5 C 40 6.5, 85 10.5, 130 7.8 S 220 5.2, 298 8.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M18 12 C 70 10.4, 140 11.6, 210 10.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function CircleMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={`pointer-events-none absolute text-rojo ${className}`} aria-hidden="true">
      <path
        d="M14 34 C 10 14, 52 4, 86 8 C 116 12, 118 40, 88 50 C 58 59, 18 54, 10 38 C 6 28, 20 18, 34 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 100 figuras: `filled` en tinta, el resto en gris. Visualiza un % real. */
export function PeopleGrid({ filled, label }: { filled: number; label: string }) {
  const cols = 10;
  return (
    <svg viewBox="0 0 200 230" role="img" aria-label={label} className="h-auto w-full">
      {Array.from({ length: 100 }, (_, i) => {
        const x = (i % cols) * 20 + 10;
        const y = Math.floor(i / cols) * 23 + 8;
        const on = i < filled;
        return (
          <g key={i} fill={on ? '#16140f' : '#d8d0bf'}>
            <circle cx={x} cy={y} r="3.1" />
            <rect x={x - 4.2} y={y + 4.6} width="8.4" height="10.5" rx="3.6" />
          </g>
        );
      })}
    </svg>
  );
}
