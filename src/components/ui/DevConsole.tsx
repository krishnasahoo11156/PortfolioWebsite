"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const COMMANDS: Record<string, { description: string; action?: string }> = {
    help: { description: "List all available commands" },
    about: { description: "Navigate to About section" },
    projects: { description: "Navigate to Projects section" },
    skills: { description: "Navigate to Skills section" },
    contact: { description: "Navigate to Contact section" },
    timeline: { description: "Navigate to Timeline section" },
    resume: { description: "Download resume PDF" },
    github: { description: "Open GitHub profile" },
    linkedin: { description: "Open LinkedIn profile" },
    eastereggs: { description: "Show all Easter eggs" },
    likecount: { description: "Show current heart counter total" },
    confetti: { description: "Trigger confetti burst" },
    clear: { description: "Clear console history" },
    whoami: { description: "Who is Krishna?" },
};

const COMMAND_NAMES = Object.keys(COMMANDS);

interface ConsoleLine {
    type: "input" | "output";
    content: string;
}

export default function DevConsole() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<ConsoleLine[]>([]);
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [suggestion, setSuggestion] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    // Auto-focus and scroll
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, history]);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    // Keyboard shortcut to open
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
            // Ctrl+` to toggle
            if (e.key === "`" && e.ctrlKey) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    // Tab autocomplete
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Tab") {
                e.preventDefault();
                if (suggestion) {
                    setInput(suggestion);
                    setSuggestion("");
                }
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (cmdHistory.length > 0) {
                    const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
                    setHistoryIndex(newIndex);
                    setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
                }
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
                } else {
                    setHistoryIndex(-1);
                    setInput("");
                }
            }
        },
        [suggestion, cmdHistory, historyIndex]
    );

    // Input change with autocomplete
    const handleInputChange = (val: string) => {
        setInput(val);
        setHistoryIndex(-1);
        if (val.length > 0) {
            const match = COMMAND_NAMES.find((cmd) => cmd.startsWith(val.toLowerCase()));
            setSuggestion(match && match !== val.toLowerCase() ? match : "");
        } else {
            setSuggestion("");
        }
    };

    // Execute command
    const executeCommand = useCallback(
        (cmd: string) => {
            const trimmed = cmd.trim().toLowerCase();
            if (!trimmed) return;

            const newHistory: ConsoleLine[] = [
                ...history,
                { type: "input", content: `$ ${trimmed}` },
            ];

            setCmdHistory((prev) => [...prev, trimmed]);
            setHistoryIndex(-1);

            let output = "";

            switch (trimmed) {
                case "help":
                    output = Object.entries(COMMANDS)
                        .map(([name, { description }]) => `  ${name.padEnd(14)} ${description}`)
                        .join("\n");
                    break;

                case "about":
                case "projects":
                case "skills":
                case "contact":
                case "timeline":
                    document.getElementById(trimmed)?.scrollIntoView({ behavior: "smooth" });
                    setIsOpen(false);
                    output = `Navigating to ${trimmed}...`;
                    break;

                case "resume":
                    window.open("/assets/resume.pdf", "_blank");
                    output = "Opening resume...";
                    break;

                case "github":
                    window.open("https://github.com/krishna", "_blank");
                    output = "Opening GitHub...";
                    break;

                case "linkedin":
                    window.open("https://linkedin.com/in/krishna", "_blank");
                    output = "Opening LinkedIn...";
                    break;

                case "likecount": {
                    const count = localStorage.getItem("heart-count") || "0";
                    output = `Total heart clicks: ${parseInt(count).toLocaleString()}`;
                    break;
                }

                case "eastereggs":
                    output = [
                        "🥚 Easter Eggs Discovery Tracker:",
                        "  [1] Logo Secret     — Hold the KR logo for 3 seconds",
                        "  [2] Code Hint       — Hover on code for 5 seconds",
                        "  [3] Heart Milestone  — Click heart 10 times rapidly",
                        "  [4] Konami Code     — ↑↑↓↓←→←→BA",
                        "  [5] Footer Tap     — Triple-click the copyright",
                        "  [6] Confetti        — Type 'confetti' here",
                        "  [7] React Master   — Click React skill 5 times",
                    ].join("\n");
                    break;

                case "confetti":
                    output = "✨ Confetti! (monochrome particles)";
                    // Trigger confetti effect on the page
                    triggerConfetti();
                    break;

                case "clear":
                    setHistory([]);
                    setInput("");
                    return;

                case "whoami":
                    output = [
                        "╔══════════════════════════════════════╗",
                        "║         KRISHNA                      ║",
                        "║   Full Stack Developer               ║",
                        "║   React · Next.js · Node.js          ║",
                        "║   Builder · Creator · Engineer        ║",
                        "║                                      ║",
                        "║   'Code is craft, not just logic.'   ║",
                        "╚══════════════════════════════════════╝",
                    ].join("\n");
                    break;

                default:
                    output = `Command not found: '${trimmed}'. Type help for available commands.`;
            }

            setHistory([...newHistory, { type: "output", content: output }]);
            setInput("");
            setSuggestion("");
        },
        [history]
    );

    return (
        <>
            {/* Trigger button in navbar area */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-[90] px-3 py-1.5 text-xs uppercase tracking-widest border rounded"
                style={{
                    background: "var(--color-bg-secondary)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)",
                }}
            >
                Terminal
            </button>

            {/* Console overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[200]"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0"
                        style={{ background: "rgba(0,0,0,0.92)" }}
                    />

                    {/* Console panel — bottom 60% */}
                    <div
                        className="absolute bottom-0 left-0 right-0 flex flex-col"
                        style={{
                            height: "60%",
                            background: "var(--color-bg-secondary)",
                            borderTop: "1px solid var(--color-border)",
                            animation: "slideUp 0.3s ease-out",
                        }}
                    >
                        {/* Header bar */}
                        <div
                            className="flex items-center gap-2 px-4 py-3 border-b"
                            style={{ borderColor: "var(--color-border)" }}
                        >
                            {/* macOS dots */}
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110"
                                />
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                            </div>
                            <span
                                className="text-xs text-text-muted ml-3"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                krishna@portfolio ~ %
                            </span>
                        </div>

                        {/* Output area */}
                        <div
                            ref={outputRef}
                            className="flex-1 overflow-y-auto px-4 py-3 space-y-1"
                            style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
                        >
                            {/* Welcome message */}
                            {history.length === 0 && (
                                <div className="text-text-muted">
                                    <p>Welcome to Krishna&apos;s dev console.</p>
                                    <p>Type &apos;help&apos; for available commands.</p>
                                    <br />
                                </div>
                            )}

                            {history.map((line, i) => (
                                <div
                                    key={i}
                                    className={
                                        line.type === "input"
                                            ? "text-text-primary"
                                            : "text-text-secondary whitespace-pre-wrap"
                                    }
                                >
                                    {line.content}
                                </div>
                            ))}
                        </div>

                        {/* Input line */}
                        <div
                            className="flex items-center gap-2 px-4 py-3 border-t"
                            style={{ borderColor: "var(--color-border)" }}
                        >
                            <span className="text-accent-gray text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                                $
                            </span>
                            <div className="relative flex-1">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            executeCommand(input);
                                        } else {
                                            handleKeyDown(e);
                                        }
                                    }}
                                    className="w-full bg-transparent outline-none text-text-primary text-sm"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                    placeholder="Type a command..."
                                    autoFocus
                                />
                                {/* Autocomplete suggestion */}
                                {suggestion && (
                                    <span
                                        className="absolute top-0 left-0 text-sm pointer-events-none"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            color: "var(--color-text-muted)",
                                            opacity: 0.4,
                                        }}
                                    >
                                        {suggestion}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Slide-up animation */}
            <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}

// ─── Confetti Effect ─────────────────────────────────────────
function triggerConfetti() {
    const container = document.createElement("div");
    container.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
    document.body.appendChild(container);

    for (let i = 0; i < 60; i++) {
        const particle = document.createElement("div");
        const size = 4 + Math.random() * 6;
        const gray = Math.floor(Math.random() * 200 + 55);
        const startX = window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4;
        const startY = window.innerHeight * 0.5;

        particle.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      background:rgb(${gray},${gray},${gray});
      border-radius:${Math.random() > 0.5 ? "50%" : "1px"};
      left:${startX}px;
      top:${startY}px;
      opacity:1;
      transition:all 1s cubic-bezier(0.25,0.46,0.45,0.94);
    `;
        container.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.left = `${startX + (Math.random() - 0.5) * 400}px`;
            particle.style.top = `${startY + (Math.random() - 0.5) * 400}px`;
            particle.style.opacity = "0";
            particle.style.transform = `rotate(${Math.random() * 720}deg)`;
        });
    }

    setTimeout(() => container.remove(), 1500);
}
