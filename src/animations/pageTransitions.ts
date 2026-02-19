import { gsap } from "gsap";

/**
 * Page transition animation config for Framer Motion.
 */
export const pageTransitionVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};

/**
 * Red sweep line animation during transitions.
 */
export function sweepTransition(
    element: Element,
    options: { duration?: number; color?: string } = {}
) {
    const { duration = 0.4, color = "var(--color-accent-red)" } = options;

    gsap.set(element, {
        scaleX: 0,
        transformOrigin: "left center",
        backgroundColor: color,
        opacity: 0.4,
    });

    const tl = gsap.timeline();
    tl.to(element, {
        scaleX: 1,
        duration: duration / 2,
        ease: "power2.in",
    }).to(element, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: duration / 2,
        ease: "power2.out",
    });

    return tl;
}
