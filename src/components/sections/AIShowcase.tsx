"use client";

const features = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
        ),
        title: "AI Assistant",
        description:
            "An intelligent chat widget powered by Gemini that can answer questions about my skills, projects, and experience in real time.",
        cta: "Try It",
        color: "#00E5FF",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
        ),
        title: "Project Intelligence",
        description:
            "AI-generated 3-sentence project summaries tailored for recruiters — instantly understand the impact and tech behind each project.",
        cta: "See Demo",
        color: "#A855F7",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
        title: "Smart Contact",
        description:
            "A conversational contact form that guides you through a natural chat flow instead of boring form fields.",
        cta: "Send a Message",
        color: "#FF006E",
    },
];

export default function AIShowcase() {
    return (
        <section id="ai-showcase" className="section-padding relative overflow-hidden">
            <div className="glow-spot glow-spot-cyan absolute top-0 left-1/3 w-[600px] h-[600px]" />
            <div className="glow-spot glow-spot-purple absolute bottom-0 right-1/4 w-[400px] h-[400px]" />

            <div className="container-main relative z-10">
                <div className="section-divider mb-16 lg:mb-24" />

                <span className="label-neon block mb-3">POWERED BY AI</span>
                <h2 className="heading-section mb-14">
                    Intelligence{" "}
                    <span style={{ color: "var(--color-accent-purple)" }}>Built In</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="neon-card group"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="p-8 lg:p-10 flex flex-col h-full">
                                {/* SVG Icon instead of emoji */}
                                <div
                                    className="mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{ color: feature.color }}
                                >
                                    {feature.icon}
                                </div>

                                <h3
                                    className="text-xl font-bold mb-4"
                                    style={{ color: feature.color }}
                                >
                                    {feature.title}
                                </h3>

                                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-8">
                                    {feature.description}
                                </p>

                                <button
                                    className="btn-ghost text-sm self-start"
                                    style={{
                                        borderColor: `${feature.color}30`,
                                        color: feature.color,
                                    }}
                                >
                                    {feature.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
