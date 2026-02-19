"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeartCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [clickNum, setClickNum] = useState(0);
    const [showCount, setShowCount] = useState(false);
    const [particles, setParticles] = useState<
        { id: number; x: number; y: number; angle: number }[]
    >([]);
    const btnRef = useRef<HTMLButtonElement>(null);
    const particleIdRef = useRef(0);

    // Load initial count
    useEffect(() => {
        // For now, use localStorage as a stand-in for Supabase
        const stored = localStorage.getItem("heart-count");
        setCount(stored ? parseInt(stored) : 0);
    }, []);

    const handleClick = useCallback(() => {
        const newClickNum = clickNum + 1;
        setClickNum(newClickNum);
        setShowCount(true);

        const newCount = (count ?? 0) + newClickNum;
        setCount(newCount);
        localStorage.setItem("heart-count", String(newCount));

        // Generate burst particles
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: particleIdRef.current++,
            x: 0,
            y: 0,
            angle: (i / 8) * 360 + Math.random() * 30 - 15,
        }));
        setParticles((prev) => [...prev, ...newParticles]);

        // Clean up particles after animation
        setTimeout(() => {
            setParticles((prev) =>
                prev.filter((p) => !newParticles.find((np) => np.id === p.id))
            );
        }, 700);
    }, [clickNum, count]);

    if (count === null) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-2">
            {/* Count display */}
            <AnimatePresence mode="wait">
                {showCount && (
                    <motion.span
                        key={count}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="text-sm font-mono text-text-primary"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {count.toLocaleString()}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Heart button */}
            <motion.button
                ref={btnRef}
                onClick={handleClick}
                whileTap={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-12 h-12 rounded-full flex items-center justify-center border"
                style={{
                    background: "var(--color-bg-secondary)",
                    borderColor: "rgba(255, 0, 110, 0.2)",
                    boxShadow: "0 0 20px rgba(255, 0, 110, 0.06)",
                }}
                aria-label="Like this portfolio"
            >
                {/* Pulsing heart */}
                <motion.svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="#FF006E"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </motion.svg>

                {/* Particle burst */}
                <AnimatePresence>
                    {particles.map((particle) => {
                        const rad = (particle.angle * Math.PI) / 180;
                        const dist = 30 + Math.random() * 20;
                        return (
                            <motion.div
                                key={particle.id}
                                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                animate={{
                                    opacity: 0,
                                    x: Math.cos(rad) * dist,
                                    y: Math.sin(rad) * dist,
                                    scale: 0,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute"
                                style={{ pointerEvents: "none" }}
                            >
                                <svg className="w-2 h-2" viewBox="0 0 24 24" fill="#FF006E">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
