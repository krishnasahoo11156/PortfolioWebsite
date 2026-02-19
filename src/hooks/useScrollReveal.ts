"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    delay?: number;
}

/**
 * Hook to reveal elements on scroll entry using IntersectionObserver.
 * Adds the 'revealed' class when element enters viewport.
 */
export function useScrollReveal<T extends HTMLElement>(
    options: ScrollRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const { threshold = 0.1, rootMargin = "0px", delay = 0 } = options;

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("revealed");
                    }, delay);
                }
            });
        },
        [delay]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(handleIntersect, {
            threshold,
            rootMargin,
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [handleIntersect, threshold, rootMargin]);

    return ref;
}
