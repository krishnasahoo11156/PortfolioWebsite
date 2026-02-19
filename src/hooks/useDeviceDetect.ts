"use client";

import { useState, useEffect } from "react";

interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isTouch: boolean;
    isLowPower: boolean;
    prefersReducedMotion: boolean;
}

/**
 * Hook to detect device capabilities for adaptive rendering.
 * Used to swap Three.js for 2D fallbacks, disable cursor effects, etc.
 */
export function useDeviceDetect(): DeviceInfo {
    const [device, setDevice] = useState<DeviceInfo>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouch: false,
        isLowPower: false,
        prefersReducedMotion: false,
    });

    useEffect(() => {
        const width = window.innerWidth;
        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        const isLowPower =
            typeof navigator.hardwareConcurrency === "number" &&
            navigator.hardwareConcurrency < 4;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        setDevice({
            isMobile: width < 640,
            isTablet: width >= 640 && width <= 1024,
            isDesktop: width > 1024,
            isTouch,
            isLowPower,
            prefersReducedMotion,
        });

        const handleResize = () => {
            const w = window.innerWidth;
            setDevice((prev) => ({
                ...prev,
                isMobile: w < 640,
                isTablet: w >= 640 && w <= 1024,
                isDesktop: w > 1024,
            }));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return device;
}
