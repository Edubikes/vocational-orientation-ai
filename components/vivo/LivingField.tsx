'use client';

import { memo, useEffect, useRef, type RefObject } from 'react';

export type FieldPointer = { x: number; y: number; on: boolean };

const SAMPLES = 240;

function LivingFieldBase({ pointer }: { pointer: RefObject<FieldPointer> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !parent || !ctx) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let mounted = true;
        let looping = false;
        let visible = true;
        let frame = 0;

        const resize = () => {
            const rect = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = Math.max(1, rect.width);
            const height = Math.max(1, rect.height);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (now: number) => {
            const rect = parent.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            if (width < 2 || height < 2) return;

            ctx.clearRect(0, 0, width, height);
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            const time = reduce ? 0.6 : now / 1000;
            const centerX = width * 0.5;
            const centerY = height * 0.5;
            const scale = Math.min(width, height) * 0.34;
            const ptr = pointer.current;
            const pulling = ptr?.on === true;
            const pullX = pulling ? ptr.x * width : centerX;
            const pullY = pulling ? ptr.y * height : centerY;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(time * 0.08);
            for (let i = 0; i < 48; i += 1) {
                const angle = (i / 48) * Math.PI * 2;
                const inner = scale * 1.28;
                const major = i % 6 === 0;
                const outer = inner + (major ? 11 : 4);
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
                ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
                ctx.strokeStyle = major ? '#111111' : 'rgba(17,17,17,0.28)';
                ctx.lineWidth = major ? 1.5 : 1;
                ctx.stroke();
            }
            ctx.restore();

            const pts: { x: number; y: number }[] = [];
            const ring = 0.62;
            const pen = 0.42 + Math.sin(time * 0.35) * 0.06;
            const ratio = (1 - ring) / ring;
            for (let i = 0; i < SAMPLES; i += 1) {
                const u = (i / SAMPLES) * Math.PI * 6 + time * 0.22;
                let x = centerX + ((1 - ring) * Math.cos(u) + pen * Math.cos(ratio * u)) * scale * 1.15;
                let y = centerY + ((1 - ring) * Math.sin(u) - pen * Math.sin(ratio * u)) * scale * 1.05;
                x += Math.sin(u * 2 + time * 0.8) * scale * 0.03;
                if (pulling) {
                    const dx = pullX - x;
                    const dy = pullY - y;
                    const dist = Math.hypot(dx, dy) || 1;
                    const pull = Math.max(0, 1 - dist / (scale * 1.6));
                    x += dx * pull * 0.55;
                    y += dy * pull * 0.55;
                }
                pts.push({ x, y });
            }

            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
            ctx.closePath();
            ctx.strokeStyle = '#111111';
            ctx.lineWidth = 1.25;
            ctx.stroke();

            for (let i = 0; i < 7; i += 1) {
                const angle = time * (0.22 + i * 0.035) + (i / 7) * Math.PI * 2;
                const rad = scale * (0.78 + (i % 3) * 0.16) + Math.sin(time * 0.85 + i) * 5;
                const x = centerX + Math.cos(angle) * rad;
                const y = centerY + Math.sin(angle) * rad * 0.7;
                let nearest = pts[0];
                let best = Infinity;
                for (let p = 0; p < pts.length; p += 4) {
                    const dist = (pts[p].x - x) ** 2 + (pts[p].y - y) ** 2;
                    if (dist < best) {
                        best = dist;
                        nearest = pts[p];
                    }
                }
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nearest.x, nearest.y);
                ctx.strokeStyle = 'rgba(17,17,17,0.2)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = '#111111';
                ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
            }

            const beadIndex = Math.floor(((time * 32) % SAMPLES + SAMPLES) % SAMPLES);
            ctx.beginPath();
            for (let k = 28; k >= 0; k -= 1) {
                const point = pts[(beadIndex - k + SAMPLES) % SAMPLES];
                if (k === 28) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            }
            ctx.strokeStyle = '#e02020';
            ctx.lineWidth = 2;
            ctx.stroke();
            const bead = pts[beadIndex];
            ctx.fillStyle = '#e02020';
            ctx.fillRect(bead.x - 5, bead.y - 5, 10, 10);

            ctx.strokeStyle = 'rgba(17,17,17,0.45)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX - 7, centerY);
            ctx.lineTo(centerX + 7, centerY);
            ctx.moveTo(centerX, centerY - 7);
            ctx.lineTo(centerX, centerY + 7);
            ctx.stroke();
        };

        const stopLoop = () => {
            looping = false;
            window.cancelAnimationFrame(frame);
        };

        const startLoop = () => {
            if (!mounted) return;
            if (reduce) {
                draw(0);
                return;
            }
            if (looping) return;
            looping = true;
            const step = (now: number) => {
                if (!looping || !mounted) return;
                draw(now);
                frame = window.requestAnimationFrame(step);
            };
            frame = window.requestAnimationFrame(step);
        };

        const sync = () => {
            if (visible && !document.hidden) startLoop();
            else stopLoop();
        };

        resize();
        const resizeObserver = new ResizeObserver(() => {
            resize();
            if (reduce) draw(0);
        });
        resizeObserver.observe(parent);

        const intersection = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                sync();
            },
            { threshold: 0.08 },
        );
        intersection.observe(parent);

        document.addEventListener('visibilitychange', sync);
        sync();

        return () => {
            mounted = false;
            stopLoop();
            resizeObserver.disconnect();
            intersection.disconnect();
            document.removeEventListener('visibilitychange', sync);
        };
    }, [pointer]);

    return <canvas ref={canvasRef} className="vivo-canvas" aria-hidden />;
}

export const LivingField = memo(LivingFieldBase);
