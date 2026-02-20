"use client";

const socials = [
    {
        name: "GitHub",
        url: "https://github.com/krishnasahoo11156",
        color: "#F0F0F5",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/krishna-sahoo-b3440537a/",
        color: "#3B82F6",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "Credly",
        url: "https://www.credly.com/users/krishna-sahoo.778cc76d",
        color: "#FF6F00",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3 6 6 .9-4.5 4.4 1.1 6.3L12 17.8 6.4 19.6 7.5 13 3 8.9l6-.9 3-6z" />
            </svg>
        ),
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/krishnasahoo11156/",
        color: "#FF006E",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zm5.25-2.75a1 1 0 11-1 1 1 1 0 011-1z" />
            </svg>
        ),
    },
    {
        name: "Email",
        url: "mailto:krishnasahoo11156@gmail.com",
        color: "#00E5FF",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export default function Contact() {
    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            <div className="glow-spot glow-spot-cyan absolute top-0 right-0 w-[500px] h-[500px]" />
            <div className="glow-spot glow-spot-magenta absolute bottom-0 left-1/4 w-[400px] h-[400px]" />

            <div className="container-main relative z-10">
                <div className="section-divider mb-16 lg:mb-24" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                    {/* Left side */}
                    <div className="space-y-8">
                        <span className="label-neon block mb-1">GET IN TOUCH</span>
                        <h2 className="heading-section">
                            Let&apos;s Build Something{" "}
                            <span style={{ color: "var(--color-accent-cyan)" }}>
                                Together
                            </span>
                        </h2>
                        <p className="text-text-secondary max-w-md leading-relaxed">
                            Whether you have a project in mind, a question about my work, or
                            just want to say hello — I&apos;d love to hear from you.
                        </p>

                        {/* Social links */}
                        <div className="flex items-center gap-6 pt-2">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 transition-colors duration-300"
                                    style={{ color: "var(--color-text-muted)" }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.color = social.color;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                                    }}
                                >
                                    {social.icon}
                                    <span className="text-sm">{social.name}</span>
                                </a>
                            ))}
                        </div>

                        {/* Email with neon border */}
                        <div
                            className="inline-block px-5 py-3 rounded-lg cursor-pointer group border transition-all duration-300"
                            style={{
                                background: "var(--color-bg-tertiary)",
                                borderColor: "var(--color-border)",
                                fontFamily: "var(--font-mono)",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.3)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,229,255,0.08)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText("krishnasahoo11156@gmail.com");
                            }}
                        >
                            <span className="text-text-secondary text-sm">
                                krishnasahoo11156@gmail.com
                            </span>
                            <span className="text-text-muted text-xs ml-3">click to copy</span>
                        </div>
                    </div>

                    {/* Right — Contact form */}
                    <div
                        className="neon-card relative overflow-hidden"
                        style={{
                            background:
                                "radial-gradient(circle at top left, rgba(0,229,255,0.16), transparent 55%)",
                        }}
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-40">
                            <div className="absolute -top-24 right-10 w-56 h-56 rounded-full blur-3xl bg-accent-purple/40" />
                        </div>
                        <div className="relative p-8 lg:p-10 space-y-7">
                            <div className="flex items-center justify-between gap-4 mb-2">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.25em] text-text-muted">
                                        Send a message
                                    </p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Share a project idea, opportunity, or just say hi.
                                    </p>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-text-muted">
                                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Typically replies within 24 hours</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label-muted text-[11px] block mb-2.5">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full px-4 py-3.5 rounded-lg text-sm text-text-primary placeholder-text-muted outline-none border transition-all duration-300"
                                        style={{
                                            background: "var(--color-bg-tertiary)",
                                            borderColor: "var(--color-border)",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)";
                                            e.currentTarget.style.boxShadow =
                                                "0 0 16px rgba(0,229,255,0.06)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "var(--color-border)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="label-muted text-[11px] block mb-2.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3.5 rounded-lg text-sm text-text-primary placeholder-text-muted outline-none border transition-all duration-300"
                                        style={{
                                            background: "var(--color-bg-tertiary)",
                                            borderColor: "var(--color-border)",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)";
                                            e.currentTarget.style.boxShadow =
                                                "0 0 16px rgba(0,229,255,0.06)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "var(--color-border)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="label-muted text-[11px] block mb-2.5">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell me a bit about what you have in mind..."
                                    className="w-full px-4 py-3.5 rounded-lg text-sm text-text-primary placeholder-text-muted outline-none border transition-all duration-300 resize-none"
                                    style={{
                                        background: "var(--color-bg-tertiary)",
                                        borderColor: "var(--color-border)",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)";
                                        e.currentTarget.style.boxShadow =
                                            "0 0 16px rgba(0,229,255,0.06)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "var(--color-border)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                                <p className="text-xs text-text-muted">
                                    No spam, no sharing your details — just a direct reply from me.
                                </p>
                                <button className="btn-neon w-full sm:w-auto justify-center px-10 py-3.5 text-sm">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
