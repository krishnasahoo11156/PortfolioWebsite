"use client";

const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/krishnasahoo11156",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/krishna-sahoo-b3440537a/",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "Credly",
        url: "https://www.credly.com/users/krishna-sahoo.778cc76d",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3 6 6 .9-4.5 4.4 1.1 6.3L12 17.8 6.4 19.6 7.5 13 3 8.9l6-.9 3-6z" />
            </svg>
        ),
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/krishnasahoo11156/",
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zm5.25-2.75a1 1 0 11-1 1 1 1 0 011-1z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer
            className="pt-10 pb-12 border-t relative"
            style={{
                background:
                    "linear-gradient(180deg, var(--color-bg-primary) 0%, #030305 100%)",
                borderColor: "var(--color-border)",
            }}
        >
            <div className="container-main relative z-10">
                <div
                    className="mb-10 rounded-2xl border px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{
                        background:
                            "radial-gradient(circle at top left, rgba(0,229,255,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(168,85,247,0.16), transparent 55%)",
                        borderColor: "var(--color-border)",
                        boxShadow: "0 0 40px rgba(0,0,0,0.6)",
                    }}
                >
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-text-muted mb-2">
                            Final call
                        </p>
                        <h3 className="text-lg md:text-xl font-semibold text-text-primary">
                            Ready to build your next big thing?
                        </h3>
                        <p className="text-sm text-text-secondary mt-1 max-w-xl">
                            I&apos;m open to internships, freelance collaborations, and impactful product work.
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="btn-neon w-full md:w-auto justify-center px-10 py-3.5 text-sm"
                    >
                        Let&apos;s Talk
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Logo with neon gradient */}
                    <div className="flex items-center gap-3">
                        <span
                            className="text-xl font-black"
                            style={{
                                background: "var(--gradient-neon)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            KR
                        </span>
                        <span className="text-sm text-text-muted">
                            Built with code and obsession.
                        </span>
                    </div>

                    {/* Nav links */}
                    <div className="flex items-center justify-center gap-6">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-xs uppercase tracking-widest text-text-muted hover:text-accent-cyan transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center justify-end gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-muted hover:text-accent-cyan transition-colors duration-300"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom strip */}
                <div
                    className="mt-8 pt-6 border-t flex items-center justify-center"
                    style={{ borderColor: "var(--color-border)" }}
                >
                    <p className="text-xs text-text-muted">
                        © {new Date().getFullYear()} Krishna. Made with Next.js &{" "}
                        <span style={{ color: "var(--color-accent-cyan)" }}>❤️</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
