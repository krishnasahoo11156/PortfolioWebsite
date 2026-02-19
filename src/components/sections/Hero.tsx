"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Floating Particles ─────────────────────────────────────
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Create 12 particles
        const particles: Particle[] = Array.from({ length: 12 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: 2 + Math.random() * 1.5,
            opacity: 0.15 + Math.random() * 0.25,
        }));

        let animId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            }
            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1] pointer-events-none"
        />
    );
}

// ─── Hero Section ────────────────────────────────────────────
export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textBackRef = useRef<HTMLDivElement>(null);
    const textFrontRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Text split into words for individual animation
    const words = ["CRAFTED", "BY", "KRISHNA"];

    useEffect(() => {
        setMounted(true);
    }, []);

    // GSAP ScrollTrigger animation timeline
    useEffect(() => {
        if (!mounted) return;
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // 0% → 5%: Text fades in with stagger
            tl.fromTo(
                ".hero-word",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.3,
                    ease: "power2.out",
                },
                0
            );

            // Photo mask opens: starts slightly zoomed/blurred → crisp
            tl.fromTo(
                photoRef.current,
                { scale: 1.05, filter: "blur(4px)" },
                { scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" },
                0
            );

            // 10%→30%: Parallax — words drift apart
            tl.to(
                ".hero-word-crafted",
                { x: -40, duration: 0.5, ease: "none" },
                0.3
            );
            tl.to(
                ".hero-word-krishna",
                { x: 40, duration: 0.5, ease: "none" },
                0.3
            );
            tl.to(
                ".hero-word-by",
                { y: -20, opacity: 0.5, duration: 0.5, ease: "none" },
                0.3
            );

            // 30%→50%: Z-depth shift using scale (simulating translateZ)
            tl.to(
                ".hero-word-crafted",
                { scale: 1.08, duration: 0.3, ease: "none" },
                0.5
            );
            tl.to(
                ".hero-word-krishna",
                { scale: 0.92, opacity: 0.7, duration: 0.3, ease: "none" },
                0.5
            );

            // 50%→100%: Exit — words scatter, photo scales down
            tl.to(
                ".hero-word-crafted",
                { x: -200, opacity: 0, duration: 0.4, ease: "power2.in" },
                0.7
            );
            tl.to(
                ".hero-word-by",
                { y: -100, opacity: 0, duration: 0.4, ease: "power2.in" },
                0.7
            );
            tl.to(
                ".hero-word-krishna",
                { x: 200, opacity: 0, duration: 0.4, ease: "power2.in" },
                0.7
            );
            tl.to(
                photoRef.current,
                { scale: 0.85, opacity: 0, duration: 0.5, ease: "power2.in" },
                0.7
            );

            // Horizontal line animation on load (separate, not scroll-linked)
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 1.5, ease: "power2.inOut", delay: 0.5 }
            );

            // Scroll indicator fade out on scroll
            tl.to(
                scrollIndicatorRef.current,
                { opacity: 0, y: 20, duration: 0.2 },
                0
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative h-screen w-full overflow-hidden"
            style={{ background: "var(--color-bg-primary)" }}
        >
            {/* Layer 1: Background noise + particles */}
            <div className="noise-overlay absolute inset-0 z-[1]" />
            <FloatingParticles />

            {/* Layer 2: Text BEHIND photo */}
            <div
                ref={textBackRef}
                className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"
            >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                    {words.map((word) => (
                        <span
                            key={`back-${word}`}
                            className={`hero-word hero-word-${word.toLowerCase()} heading-giant select-none opacity-0`}
                            style={{ color: "rgba(255,255,255,0.12)" }}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Layer 3: Portrait photo */}
            <div
                ref={photoRef}
                className="absolute inset-0 z-[3] flex items-center justify-center"
            >
                <div
                    className="relative w-[280px] h-[370px] sm:w-[320px] sm:h-[420px] lg:w-[400px] lg:h-[530px] rounded-lg overflow-hidden"
                    style={{ filter: "grayscale(100%) contrast(1.1)" }}
                >
                    {/* Portrait image */}
                    <img
                        src="/assets/krishna-portrait.jpg"
                        alt="Krishna — Full Stack Developer"
                        className="w-full h-full object-cover object-top"
                        style={{ mixBlendMode: "luminosity" }}
                        onError={(e) => {
                            // Fallback if no image
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            if (target.parentElement) {
                                target.parentElement.style.background =
                                    "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)";
                            }
                        }}
                    />
                    {/* Subtle vignette overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, transparent 40%, rgba(12,12,12,0.6) 100%)",
                        }}
                    />
                </div>
            </div>

            {/* Layer 4: Text IN FRONT of photo (creates the fusion effect) */}
            <div
                ref={textFrontRef}
                className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none"
            >
                <div
                    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6"
                    style={{ mixBlendMode: "difference" }}
                >
                    {words.map((word) => (
                        <span
                            key={`front-${word}`}
                            className={`hero-word hero-word-${word.toLowerCase()} heading-giant select-none opacity-0`}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Horizontal line at 70% height */}
            <div
                ref={lineRef}
                className="absolute left-0 z-[5] w-full h-px"
                style={{
                    top: "70%",
                    background: "var(--color-border)",
                    transform: "scaleX(0)",
                }}
            />

            {/* Scroll indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3"
            >
                <span
                    className="text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    Scroll
                </span>
                <svg
                    className="w-5 h-5 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth={1.5}
                    style={{ opacity: 0.6 }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
