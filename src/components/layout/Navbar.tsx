"use client";

import { useState, useEffect } from "react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "backdrop-blur-[20px] border-b"
                    : "bg-transparent border-b border-transparent"
                }`}
            style={{
                background: scrolled ? "rgba(6,6,8,0.85)" : "transparent",
                borderColor: scrolled ? "var(--color-border)" : "transparent",
            }}
        >
            <nav className="container-main flex items-center justify-between h-16">
                {/* Logo with neon gradient */}
                <a
                    href="#hero"
                    className="text-xl font-black tracking-tight transition-opacity hover:opacity-80"
                    style={{
                        background: "var(--gradient-neon)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                    title="Back to top"
                >
                    KR
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-[13px] uppercase tracking-[0.1em] text-text-muted transition-colors duration-300 hover:text-accent-cyan"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/assets/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost text-xs py-2 px-4"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-5 h-px transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                            }`}
                        style={{ background: "var(--color-accent-cyan)" }}
                    />
                    <span
                        className={`block w-5 h-px transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""
                            }`}
                        style={{ background: "var(--color-accent-cyan)" }}
                    />
                    <span
                        className={`block w-5 h-px transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                            }`}
                        style={{ background: "var(--color-accent-cyan)" }}
                    />
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div
                    className="md:hidden border-t py-6 px-6 space-y-4"
                    style={{
                        background: "rgba(6,6,8,0.96)",
                        backdropFilter: "blur(20px)",
                        borderColor: "var(--color-border)",
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm uppercase tracking-widest text-text-secondary hover:text-accent-cyan transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/assets/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost text-sm inline-block mt-2"
                    >
                        Resume
                    </a>
                </div>
            )}
        </header>
    );
}
