import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate a section heading with slide-in from left.
 */
export function animateSectionHeading(
    element: Element | string,
    options: { x?: number; duration?: number } = {}
) {
    const { x = -60, duration = 0.8 } = options;

    return gsap.fromTo(
        element,
        { opacity: 0, x },
        {
            opacity: 1,
            x: 0,
            duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element as Element,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        }
    );
}

/**
 * Stagger fade-in for a group of child elements.
 */
export function staggerFadeIn(
    parent: Element | string,
    childSelector: string,
    options: { stagger?: number; y?: number; duration?: number } = {}
) {
    const { stagger = 0.15, y = 30, duration = 0.6 } = options;

    return gsap.fromTo(
        `${typeof parent === "string" ? parent : ""} ${childSelector}`,
        { opacity: 0, y },
        {
            opacity: 1,
            y: 0,
            stagger,
            duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: parent as Element,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        }
    );
}

/**
 * SVG line draw animation (for timeline and section dividers).
 */
export function drawSVGLine(
    svgElement: SVGPathElement | SVGLineElement,
    options: { start?: string; end?: string; scrub?: boolean } = {}
) {
    const { start = "top center", end = "bottom center", scrub = true } = options;

    const length = svgElement.getTotalLength?.() || 0;
    gsap.set(svgElement, {
        strokeDasharray: length,
        strokeDashoffset: length,
    });

    return gsap.to(svgElement, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: svgElement,
            start,
            end,
            scrub,
        },
    });
}

/**
 * Counter animation — count up from 0 to target value.
 */
export function animateCounter(
    element: Element,
    target: number,
    options: { duration?: number; suffix?: string } = {}
) {
    const { duration = 1.5, suffix = "" } = options;
    const obj = { value: 0 };

    return gsap.to(obj, {
        value: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
            element.textContent = Math.round(obj.value) + suffix;
        },
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
        },
    });
}
