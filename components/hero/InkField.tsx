'use client';

import { useEffect, useRef } from 'react';

const COUNT = 42;

type Node = {
    x: number;
    y: number;
    hx: number;
    hy: number;
    phase: number;
};

function unit(index: number) {
    let value = (index * 1664525 + 1013904223) >>> 0;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

export function InkField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const host = canvas?.closest('.hook');
        if (!canvas || !(host instanceof HTMLElement)) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const context = canvas.getContext('2d', { alpha: true });
        if (!context) return;

        const nodes: Node[] = Array.from({ length: COUNT }, (_, index) => {
            const hx = 0.06 + unit(index + 3) * 0.88;
            const hy = 0.08 + unit(index + 80) * 0.84;
            return { x: hx, y: hy, hx, hy, phase: unit(index + 21) * Math.PI * 2 };
        });

        const pointer = { x: 0, y: 0, on: false };
        let frame = 0;
        let alive = true;
        let visible = true;

        const resize = () => {
            const rect = host.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        };

        const paint = (now: number) => {
            if (!alive) return;
            frame = window.requestAnimationFrame(paint);
            if (!visible || document.hidden) return;
            const width = canvas.width;
            const height = canvas.height;
            if (width < 2 || height < 2) return;

            context.clearRect(0, 0, width, height);
            const time = now * 0.001;
            const reach = Math.min(width, height) * 0.28;
            const link = Math.min(width, height) * 0.2;

            for (const node of nodes) {
                const driftX = Math.sin(time * 0.32 + node.phase) * 0.014;
                const driftY = Math.cos(time * 0.26 + node.phase) * 0.014;
                let targetX = node.hx + driftX;
                let targetY = node.hy + driftY;
                if (pointer.on) {
                    const dx = pointer.x - node.x * width;
                    const dy = pointer.y - node.y * height;
                    const distance = Math.hypot(dx, dy);
                    if (distance < reach && distance > 0.5) {
                        const pull = (1 - distance / reach) * 0.22;
                        targetX += (dx / width) * pull;
                        targetY += (dy / height) * pull;
                    }
                }
                node.x += (targetX - node.x) * 0.09;
                node.y += (targetY - node.y) * 0.09;
            }

            context.lineWidth = Math.max(1.25, Math.min(width, height) / 420);
            for (let i = 0; i < nodes.length; i += 1) {
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const dx = (a.x - b.x) * width;
                    const dy = (a.y - b.y) * height;
                    const distance = Math.hypot(dx, dy);
                    if (distance > link) continue;
                    const midX = ((a.x + b.x) * width) / 2;
                    const midY = ((a.y + b.y) * height) / 2;
                    const near = pointer.on ? Math.hypot(pointer.x - midX, pointer.y - midY) : reach * 4;
                    const alpha = (1 - distance / link) * 0.42;
                    context.strokeStyle =
                        near < reach
                            ? `rgba(224, 32, 32, ${Math.min(0.9, alpha + 0.28)})`
                            : `rgba(17, 17, 17, ${alpha})`;
                    context.beginPath();
                    context.moveTo(a.x * width, a.y * height);
                    context.lineTo(b.x * width, b.y * height);
                    context.stroke();
                }
            }

            const radius = Math.max(1.35, width / 380);
            context.fillStyle = '#111111';
            for (const node of nodes) {
                context.beginPath();
                context.arc(node.x * width, node.y * height, radius, 0, Math.PI * 2);
                context.fill();
            }
            if (pointer.on) {
                context.fillStyle = '#e02020';
                context.beginPath();
                context.arc(pointer.x, pointer.y, radius * 2.6, 0, Math.PI * 2);
                context.fill();
            }
        };

        const place = (event: PointerEvent) => {
            const rect = host.getBoundingClientRect();
            const scaleX = canvas.width / Math.max(rect.width, 1);
            const scaleY = canvas.height / Math.max(rect.height, 1);
            pointer.x = (event.clientX - rect.left) * scaleX;
            pointer.y = (event.clientY - rect.top) * scaleY;
            pointer.on =
                pointer.x >= 0 && pointer.y >= 0 && pointer.x <= canvas.width && pointer.y <= canvas.height;
        };

        const leave = () => {
            pointer.on = false;
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        observer.observe(host);
        const resizer = new ResizeObserver(resize);
        resizer.observe(host);
        host.addEventListener('pointermove', place);
        host.addEventListener('pointerdown', place);
        host.addEventListener('pointerleave', leave);
        resize();
        frame = window.requestAnimationFrame(paint);

        return () => {
            alive = false;
            window.cancelAnimationFrame(frame);
            host.removeEventListener('pointermove', place);
            host.removeEventListener('pointerdown', place);
            host.removeEventListener('pointerleave', leave);
            observer.disconnect();
            resizer.disconnect();
        };
    }, []);

    return (
        <div className="ink-slot" aria-hidden>
            <canvas ref={canvasRef} className="ink-field" />
            <div className="ink-fallback" />
        </div>
    );
}
