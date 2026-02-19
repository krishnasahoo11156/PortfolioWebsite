"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

/**
 * Hook that gives a button a magnetic cursor-following effect.
 * Disabled on touch devices.
 */
export function useMagneticEffect<T extends HTMLElement>(
    strength: number = 0.3
) {
    const ref = useRef<T>(null);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const element = ref.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: "power2.out",
            });
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        const element = ref.current;
        if (!element) return;

        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
        });
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Disable on touch devices
        if ("ontouchstart" in window) return;

        // Extend the hit area by 40px
        const parent = element.parentElement;
        const handleParentMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const pad = 40;
            const inRange =
                e.clientX >= rect.left - pad &&
                e.clientX <= rect.right + pad &&
                e.clientY >= rect.top - pad &&
                e.clientY <= rect.bottom + pad;

            if (inRange) {
                handleMouseMove(e);
            }
        };

        parent?.addEventListener("mousemove", handleParentMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            parent?.removeEventListener("mousemove", handleParentMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return ref;
}
