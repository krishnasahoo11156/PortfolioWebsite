"use client";

import { useEffect, useRef } from "react";
import { lerp } from "@/lib/utils";

/**
 * Custom cursor v2 — neon-accented, CSS-class based state transitions.
 * - Dot: 6px cyan glow dot, tracks instantly
 * - Ring: 36px border ring, lerp-follows with 0.12 factor
 * - On hover: ring expands to 56px with cyan glow background
 * - On click: ring contracts briefly
 * - Disabled on touch devices
 */
export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const isHovering = useRef(false);
    const isClicking = useRef(false);

    useEffect(() => {
        // Skip on touch devices
        if (typeof window === "undefined") return;
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
        if (window.innerWidth < 768) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Show cursors
        dot.style.opacity = "1";
        ring.style.opacity = "1";

        // Hide OS cursor
        document.documentElement.style.cursor = "none";
        const allInteractive = "a, button, [role='button'], input, textarea, select, .clickable";

        const setInteractiveCursors = () => {
            document.querySelectorAll(allInteractive).forEach((el) => {
                (el as HTMLElement).style.cursor = "none";
            });
        };
        setInteractiveCursors();

        // Observe DOM changes to catch dynamically added elements
        const observer = new MutationObserver(setInteractiveCursors);
        observer.observe(document.body, { childList: true, subtree: true });

        // Mouse tracking
        const onMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        // Hover detection via event delegation
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest(allInteractive)) {
                isHovering.current = true;
                ring.classList.add("hovering");
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest(allInteractive)) {
                isHovering.current = false;
                ring.classList.remove("hovering");
            }
        };

        // Click effect
        const onMouseDown = () => {
            isClicking.current = true;
            ring.classList.add("clicking");
        };

        const onMouseUp = () => {
            isClicking.current = false;
            ring.classList.remove("clicking");
        };

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseover", onMouseOver, { passive: true });
        document.addEventListener("mouseout", onMouseOut, { passive: true });
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        // Animation loop — smooth, using transforms only (GPU-accelerated)
        let animId: number;
        const animate = () => {
            // Dot tracks instantly
            dot.style.transform = `translate3d(${mouse.current.x - 3}px, ${mouse.current.y - 3}px, 0)`;

            // Ring follows with smooth lerp
            ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
            ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);

            const ringSize = isHovering.current ? 56 : isClicking.current ? 28 : 36;
            const halfSize = ringSize / 2;
            ring.style.transform = `translate3d(${ringPos.current.x - halfSize}px, ${ringPos.current.y - halfSize}px, 0)`;

            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.documentElement.style.cursor = "auto";
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}
