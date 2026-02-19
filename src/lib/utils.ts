import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names using clsx (Tailwind-friendly).
 */
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}

/**
 * Split text into individual characters wrapped in spans.
 * Used for staggered letter-by-letter animations.
 */
export function splitTextToChars(text: string): string[] {
    return text.split("");
}

/**
 * Split text into words wrapped in spans.
 */
export function splitTextToWords(text: string): string[] {
    return text.split(" ");
}

/**
 * Format a number with commas (e.g., 1234 → "1,234").
 */
export function formatNumber(num: number): string {
    return num.toLocaleString("en-US");
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation.
 */
export function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Generate a random number between min and max.
 */
export function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Check if the code is running on the client (browser).
 */
export function isClient(): boolean {
    return typeof window !== "undefined";
}
