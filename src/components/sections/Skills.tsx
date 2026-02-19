"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

/* ── Proficiency → numeric percentage ─────────────────────── */
const proficiencyMap: Record<string, number> = {
    Beginner: 25,
    Intermediate: 55,
    Advanced: 80,
    Expert: 95,
};

/* ── Category accent colors ──────────────────────────────── */
const categoryColors: Record<string, string> = {
    Frontend: "#00E5FF",
    Backend: "#A855F7",
    Database: "#14B8A6",
    Language: "#3B82F6",
    DevOps: "#FF006E",
    Tool: "#6B6B80",
};

/* ── Category icon SVGs ──────────────────────────────────── */
const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
    ),
    Backend: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
    ),
    Database: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
    ),
    Language: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
    ),
    DevOps: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Tool: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1 5.1a2.121 2.121 0 01-3-3l5.1-5.1m0 0L3.34 8.09a1.5 1.5 0 010-2.12l.88-.88a1.5 1.5 0 012.12 0l4.08 4.08m0 0l1.41-1.41m-1.41 1.41l1.41-1.41m0 0l5.1-5.1a2.121 2.121 0 013 3l-5.1 5.1m0 0l4.08 4.08a1.5 1.5 0 010 2.12l-.88.88a1.5 1.5 0 01-2.12 0L12.83 16.58" />
        </svg>
    ),
};

/* ═══════════════════════════════════════════════════════════
   Circular Progress Ring — individual skill
   ═══════════════════════════════════════════════════════════ */
function SkillRing({
    name,
    percent,
    years,
    color,
    delay,
}: {
    name: string;
    percent: number;
    years: number;
    color: string;
    delay: number;
}) {
    const ringRef = useRef<SVGCircleElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ringRef.current || !containerRef.current) return;

        const radius = 42;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        // Set initial state
        gsap.set(ringRef.current, {
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
        });

        const ctx = gsap.context(() => {
            // Animate ring fill
            gsap.to(ringRef.current, {
                strokeDashoffset: offset,
                duration: 1.4,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });

            // Animate percentage text
            const obj = { val: 0 };
            gsap.to(obj, {
                val: percent,
                duration: 1.4,
                delay: delay,
                ease: "power3.out",
                onUpdate: () => {
                    if (textRef.current) {
                        textRef.current.textContent = `${Math.round(obj.val)}%`;
                    }
                },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });

            // Fade in container
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 20, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: delay,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [percent, delay]);

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center gap-3 group"
            style={{ opacity: 0 }}
        >
            {/* Ring SVG */}
            <div className="relative w-24 h-24 lg:w-28 lg:h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background track */}
                    <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="5"
                    />
                    {/* Progress arc */}
                    <circle
                        ref={ringRef}
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={color}
                        strokeWidth="5"
                        strokeLinecap="round"
                        style={{
                            filter: `drop-shadow(0 0 6px ${color}60)`,
                        }}
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                        ref={textRef}
                        className="text-lg lg:text-xl font-bold"
                        style={{ color }}
                    >
                        0%
                    </span>
                </div>
            </div>

            {/* Label */}
            <div className="text-center">
                <div className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
                    {name}
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                    {years}y exp
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   Animated Horizontal Bar — for category view
   ═══════════════════════════════════════════════════════════ */
function SkillBar({
    name,
    percent,
    years,
    color,
    delay,
}: {
    name: string;
    percent: number;
    years: number;
    color: string;
    delay: number;
}) {
    const barRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!barRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                barRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    delay: delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );

            gsap.fromTo(
                containerRef.current,
                { opacity: 0, x: -16 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: delay,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [percent, delay]);

    return (
        <div ref={containerRef} className="group" style={{ opacity: 0 }}>
            <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
                    {name}
                </span>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted">{years}y</span>
                    <span className="text-xs font-mono" style={{ color, fontFamily: "var(--font-mono)" }}>
                        {percent}%
                    </span>
                </div>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                    ref={barRef}
                    className="h-full rounded-full origin-left"
                    style={{
                        width: `${percent}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        boxShadow: `0 0 12px ${color}30`,
                        transform: "scaleX(0)",
                    }}
                />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   Main Skills Component
   ═══════════════════════════════════════════════════════════ */
export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    // Group by category
    const grouped = skills.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        },
        {} as Record<string, typeof skills>
    );

    const categories = ["All", ...Object.keys(grouped)];

    // Pick the top 8 skills for the circular rings showcase
    const topSkills = [...skills]
        .sort((a, b) => proficiencyMap[b.proficiency] - proficiencyMap[a.proficiency] || b.years - a.years)
        .slice(0, 8);

    // Skills to show in bar chart (filtered by category)
    const filteredSkills =
        activeCategory === "All"
            ? skills
            : skills.filter((s) => s.category === activeCategory);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".skills-heading",
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="section-padding relative overflow-hidden" ref={sectionRef}>
            {/* Glow accents */}
            <div className="glow-spot glow-spot-purple absolute top-0 right-1/4 w-[600px] h-[600px]" />
            <div className="glow-spot glow-spot-cyan absolute bottom-0 left-0 w-[400px] h-[400px]" />

            <div className="container-main relative z-10">
                <div className="section-divider mb-16 lg:mb-24" />

                <span className="label-neon block mb-3">EXPERTISE</span>
                <h2 className="skills-heading heading-section mb-6">
                    Skills &{" "}
                    <span style={{ color: "var(--color-accent-cyan)" }}>Technologies</span>
                </h2>
                <p className="text-text-secondary max-w-2xl mb-16 leading-relaxed">
                    A visual breakdown of my technical proficiency across the full stack — from frontend
                    frameworks to databases and DevOps tooling.
                </p>

                {/* ── Top Skills: Circular Rings ───────────────── */}
                <div className="mb-20">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-text-muted mb-10">
                        Core Proficiencies
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 lg:gap-6">
                        {topSkills.map((skill, i) => (
                            <SkillRing
                                key={skill.id}
                                name={skill.name}
                                percent={proficiencyMap[skill.proficiency]}
                                years={skill.years}
                                color={categoryColors[skill.category] || "#00E5FF"}
                                delay={i * 0.08}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Category Tabs ───────────────────────────── */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        const color = cat === "All" ? "#00E5FF" : categoryColors[cat] || "#6B6B80";
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border"
                                style={{
                                    background: isActive ? `${color}15` : "transparent",
                                    borderColor: isActive ? `${color}40` : "var(--color-border)",
                                    color: isActive ? color : "var(--color-text-muted)",
                                    boxShadow: isActive ? `0 0 16px ${color}10` : "none",
                                }}
                            >
                                {cat !== "All" && categoryIcons[cat]}
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* ── Horizontal Bar Charts ───────────────────── */}
                <div className="neon-card">
                    <div className="p-8 lg:p-10 space-y-5">
                        {filteredSkills.map((skill, i) => (
                            <SkillBar
                                key={`${activeCategory}-${skill.id}`}
                                name={skill.name}
                                percent={proficiencyMap[skill.proficiency]}
                                years={skill.years}
                                color={categoryColors[skill.category] || "#00E5FF"}
                                delay={i * 0.06}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Category Summary Chips ──────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
                    {Object.entries(grouped).map(([category, categorySkills]) => {
                        const color = categoryColors[category] || "#6B6B80";
                        const avgYears =
                            categorySkills.reduce((sum, s) => sum + s.years, 0) /
                            categorySkills.length;
                        return (
                            <div
                                key={category}
                                className="glass-card p-5 text-center group cursor-default"
                                style={{ transform: "translateY(0)" }}
                            >
                                <div className="flex justify-center mb-3" style={{ color }}>
                                    {categoryIcons[category]}
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color }}>
                                    {category}
                                </div>
                                <div className="text-2xl font-bold text-text-primary">
                                    {categorySkills.length}
                                </div>
                                <div className="text-xs text-text-muted mt-1">
                                    Avg {avgYears.toFixed(1)}y
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
