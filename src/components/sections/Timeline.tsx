"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/data/timeline";

gsap.registerPlugin(ScrollTrigger);

const typeColors: Record<string, string> = {
    education: "#A855F7",
    project: "#00E5FF",
    hackathon: "#FF006E",
    opensource: "#14B8A6",
    internship: "#3B82F6",
    milestone: "#F0F0F5",
};

export default function Timeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGLineElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // SVG line draw with neon color
            if (lineRef.current) {
                const lineLength = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, {
                    strokeDasharray: lineLength,
                    strokeDashoffset: lineLength,
                });

                gsap.to(lineRef.current, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                    },
                });
            }

            // Nodes with spring-in
            const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
            const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");

            nodes.forEach((node, i) => {
                gsap.fromTo(
                    node,
                    { scale: 0 },
                    {
                        scale: 1,
                        duration: 0.5,
                        ease: "back.out(2.5)",
                        scrollTrigger: {
                            trigger: node,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                if (cards[i]) {
                    const isLeft = i % 2 === 0;
                    gsap.fromTo(
                        cards[i],
                        { opacity: 0, x: isLeft ? -30 : 30 },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: cards[i],
                                start: "top 85%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="timeline" className="section-padding relative overflow-hidden" ref={sectionRef}>
            <div className="glow-spot glow-spot-cyan absolute top-1/3 left-0 w-[500px] h-[500px]" />
            <div className="glow-spot glow-spot-purple absolute bottom-1/4 right-0 w-[400px] h-[400px]" />

            <div className="container-main relative z-10">
                <div className="section-divider mb-16 lg:mb-24" />

                <span className="label-neon block mb-3">MY JOURNEY</span>
                <h2 className="heading-section mb-16">Timeline</h2>

                <div className="relative">
                    {/* SVG neon line */}
                    <svg
                        className="absolute left-4 lg:left-1/2 top-0 w-[2px] pointer-events-none"
                        style={{ height: "100%", transform: "translateX(-1px)" }}
                    >
                        <defs>
                            <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00E5FF" />
                                <stop offset="50%" stopColor="#A855F7" />
                                <stop offset="100%" stopColor="#00E5FF" />
                            </linearGradient>
                        </defs>
                        <line
                            ref={lineRef}
                            x1="1"
                            y1="0"
                            x2="1"
                            y2="100%"
                            stroke="url(#timelineGrad)"
                            strokeWidth="2"
                        />
                    </svg>

                    <div className="space-y-12 lg:space-y-20">
                        {timeline.map((entry, index) => {
                            const isLeft = index % 2 === 0;
                            const nodeColor = typeColors[entry.type] || "#00E5FF";
                            return (
                                <div
                                    key={entry.id}
                                    className={`relative flex items-start ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                                        }`}
                                >
                                    {/* Glowing node */}
                                    <div
                                        className="timeline-node absolute left-4 lg:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                                        style={{
                                            background: nodeColor,
                                            boxShadow: `0 0 12px ${nodeColor}60, 0 0 4px ${nodeColor}`,
                                        }}
                                    />

                                    <div
                                        className={`timeline-card ml-12 lg:ml-0 lg:w-[44%] ${isLeft ? "lg:mr-auto lg:pr-16" : "lg:ml-auto lg:pl-16"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <span
                                                className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                                                style={{
                                                    color: nodeColor,
                                                    background: `${nodeColor}12`,
                                                    border: `1px solid ${nodeColor}25`,
                                                }}
                                            >
                                                {entry.year}
                                            </span>
                                        </div>

                                        <div className="glass-card p-7" style={{ transform: "translateY(0)" }}>
                                            <h3 className="text-lg font-bold text-text-primary">
                                                {entry.title}
                                            </h3>
                                            <p className="text-sm text-text-muted mt-1">
                                                {entry.institution}
                                            </p>
                                            <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                                                {entry.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {entry.techTags.map((tag) => (
                                                    <span key={tag} className="tech-pill">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
