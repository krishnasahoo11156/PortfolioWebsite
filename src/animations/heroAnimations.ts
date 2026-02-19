import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Create staggered letter entrance animation.
 * Each letter fades in and slides up with a delay.
 */
export function animateLetterStagger(
    selector: string,
    options: {
        stagger?: number;
        duration?: number;
        delay?: number;
        y?: number;
    } = {}
) {
    const { stagger = 0.04, duration = 0.8, delay = 0, y = 40 } = options;

    return gsap.fromTo(
        selector,
        { opacity: 0, y, rotateX: 90 },
        {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger,
            duration,
            delay,
            ease: "power3.out",
        }
    );
}

/**
 * Create a scroll-triggered fade-in animation.
 */
export function scrollFadeIn(
    element: Element | string,
    options: {
        y?: number;
        duration?: number;
        delay?: number;
        start?: string;
    } = {}
) {
    const { y = 30, duration = 0.6, delay = 0, start = "top 80%" } = options;

    return gsap.fromTo(
        element,
        { opacity: 0, y },
        {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element as Element,
                start,
                toggleActions: "play none none none",
            },
        }
    );
}

/**
 * Create a parallax effect for an element.
 */
export function createParallax(
    element: Element | string,
    speed: number = 0.3,
    trigger?: Element | string
) {
    return gsap.to(element, {
        y: () => window.innerHeight * speed * -1,
        ease: "none",
        scrollTrigger: {
            trigger: (trigger || element) as Element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });
}
