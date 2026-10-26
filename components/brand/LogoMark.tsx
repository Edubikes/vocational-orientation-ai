export function LogoMark({ size = 28 }: { size?: number }) {
    return (
        <span className="d-badge" style={{ width: size, height: size, fontSize: size * 0.52 }} aria-hidden>
            D
        </span>
    );
}
