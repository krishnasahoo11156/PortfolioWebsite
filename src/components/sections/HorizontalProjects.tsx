"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalProjects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const isMobile = useRef(false);

    // Check mobile on mount
    useEffect(() => {
        isMobile.current = window.innerWidth < 768;
        const handleResize = () => {
            isMobile.current = window.innerWidth < 768;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // GSAP horizontal scroll (desktop only)
    useLayoutEffect(() => {
        if (typeof window === "undefined") return;
        if (window.innerWidth < 768) return;

        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // Wait for layout
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                const cards = gsap.utils.toArray<HTMLElement>(".project-card");
                if (cards.length === 0) return;

                const totalWidth = track.scrollWidth - window.innerWidth;

                gsap.to(track, {
                    x: -totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        scrub: 1,
                        end: () => `+=${totalWidth}`,
                        onUpdate: (self) => {
                            // Update progress bar
                            if (progressRef.current) {
                                progressRef.current.style.transform = `scaleX(${self.progress})`;
                            }
                            // Update counter
                            if (counterRef.current) {
                                const currentCard =
                                    Math.min(
                                        Math.floor(self.progress * cards.length) + 1,
                                        cards.length
                                    );
                                counterRef.current.textContent = `${String(currentCard).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
                            }
                        },
                    },
                });
            }, section);

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="relative overflow-hidden">
            {/* Section heading */}
            <div className="container-main section-padding pb-8">
                <div className="section-divider mb-16 lg:mb-24" />
                <span className="label-neon block mb-3">MY WORK</span>
                <h2 className="heading-section">
                    Selected{" "}
                    <span style={{ color: "var(--color-accent-cyan)" }}>Projects</span>
                </h2>
            </div>

            {/* Progress bar (desktop only) */}
            <div className="hidden md:block relative w-full h-[2px] bg-bg-tertiary">
                <div
                    ref={progressRef}
                    className="absolute top-0 left-0 h-full origin-left"
                    style={{
                        width: "100%",
                        background: "var(--gradient-neon)",
                        transform: "scaleX(0)",
                        boxShadow: "0 0 12px rgba(0, 229, 255, 0.3)",
                    }}
                />
            </div>

            {/* Card counter (desktop) */}
            <div className="hidden md:block container-main py-4">
                <span
                    ref={counterRef}
                    className="text-xs text-text-muted float-right"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    01 / {String(projects.length).padStart(2, "0")}
                </span>
            </div>

            {/* Horizontal track (desktop) / Vertical list (mobile) */}
            <div
                ref={trackRef}
                className="flex md:flex-nowrap flex-wrap gap-8 px-6 md:px-12 lg:px-20 pb-16 md:pb-0"
                style={{ willChange: "transform" }}
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="project-card flex-shrink-0 w-full md:w-[80vw] glass-card p-8 lg:p-12 relative overflow-hidden group"
                        style={{ transform: "translateY(0)" }}
                    >
                        {/* Giant number watermark */}
                        <span
                            className="absolute top-4 right-8 font-black leading-none select-none pointer-events-none text-[100px] lg:text-[200px]"
                            style={{ color: "rgba(0, 229, 255, 0.04)" }}
                        >
                            {project.number}
                        </span>

                        <div className="relative z-10 max-w-3xl">
                            {/* Category tag */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-accent-cyan)" }} />
                                <span className="label-muted text-[11px]">
                                    {project.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl lg:text-4xl font-bold text-text-primary mb-4">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-text-secondary max-w-2xl mb-6 line-clamp-3 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tech stack pills */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="tech-pill">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-4">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-ghost text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        View Code
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-ghost text-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
