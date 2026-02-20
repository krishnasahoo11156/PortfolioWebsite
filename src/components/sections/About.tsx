"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 2, suffix: "+", label: "Years Experience" },
    { value: 15, suffix: "+", label: "Projects Built" },
    { value: 5, suffix: "+", label: "Hackathons" },
    { value: 3, suffix: "", label: "Open Source" },
];

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const statRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setStatRef = useCallback(
        (index: number) => (el: HTMLDivElement | null) => {
            statRefs.current[index] = el;
        },
        []
    );

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Heading slide-in
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Animated counters with stagger
            statRefs.current.forEach((el, i) => {
                if (!el) return;
                const numEl = el.querySelector(".stat-number");
                if (!numEl) return;

                const target = stats[i].value;
                const suffix = stats[i].suffix;
                const obj = { value: 0 };

                gsap.fromTo(
                    el,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                gsap.to(obj, {
                    value: target,
                    duration: 2,
                    delay: i * 0.15 + 0.3,
                    ease: "power2.out",
                    onUpdate: () => {
                        numEl.textContent = Math.round(obj.value) + suffix;
                    },
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                });
            });

            // Paragraphs stagger in
            gsap.fromTo(
                ".about-para",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="section-padding relative overflow-hidden" ref={sectionRef}>
            {/* Neon glow spots */}
            <div className="glow-spot glow-spot-cyan absolute -top-32 right-0 w-[500px] h-[500px]" />
            <div className="glow-spot glow-spot-purple absolute bottom-0 left-0 w-[400px] h-[400px]" />

            <div className="container-main relative z-10">
                {/* Section divider */}
                <div className="section-divider mb-16 lg:mb-24" />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
                    {/* Left column (60%) */}
                    <div className="lg:col-span-3">
                        <span className="label-neon block mb-4">WHO I AM</span>
                        <h2 ref={headingRef} className="heading-section mb-8">
                            A Developer Who Builds{" "}
                            <span style={{ color: "var(--color-accent-cyan)" }}>
                                with Purpose
                            </span>
                        </h2>
                        <div className="space-y-5 text-text-secondary leading-relaxed mb-12">
                            <p className="about-para">
                                I&apos;m Krishna — a full-stack software engineer who believes
                                that great software is born from equal parts technical mastery
                                and creative thinking. I build applications that are performant,
                                accessible, and thoughtfully designed.
                            </p>
                            <p className="about-para">
                                From cinematic web experiences to robust backend systems, I
                                approach every project as a craft — not just code. My focus is on
                                React, Next.js, Node.js, and the modern web ecosystem, with a
                                growing passion for AI integrations and 3D web experiences.
                            </p>
                        </div>

                        {/* Stat boxes with neon accent */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {stats.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    ref={setStatRef(i)}
                                    className="glass-card p-5 text-center group"
                                    style={{ transform: "translateY(0)" }}
                                >
                                    <div
                                        className="stat-number text-3xl font-bold"
                                        style={{ color: "var(--color-accent-cyan)" }}
                                    >
                                        0{stat.suffix}
                                    </div>
                                    <div className="label-muted mt-1 text-xs group-hover:text-text-secondary transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resume CTA */}
                        <a
                            href="/assets/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about-para btn-neon inline-flex mt-10"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Download Resume
                        </a>
                    </div>

                    {/* Right column — ambient geometric */}
                    <div className="lg:col-span-2 flex items-center justify-center">
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                            <svg
                                viewBox="0 0 200 200"
                                className="w-full h-full animate-[spin_25s_linear_infinite]"
                                fill="none"
                                strokeWidth="0.5"
                            >
                                <polygon
                                    points="100,10 190,60 190,140 100,190 10,140 10,60"
                                    stroke="url(#neonGrad)"
                                    opacity="0.3"
                                />
                                <polygon
                                    points="100,30 170,70 170,130 100,170 30,130 30,70"
                                    stroke="url(#neonGrad)"
                                    opacity="0.2"
                                />
                                <polygon
                                    points="100,50 150,80 150,120 100,150 50,120 50,80"
                                    stroke="url(#neonGrad)"
                                    opacity="0.15"
                                />
                                <circle cx="100" cy="100" r="60" stroke="url(#neonGrad)" opacity="0.1" />
                                <circle cx="100" cy="100" r="3" fill="url(#neonGrad)" opacity="0.6" />
                                <defs>
                                    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00E5FF" />
                                        <stop offset="100%" stopColor="#A855F7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
