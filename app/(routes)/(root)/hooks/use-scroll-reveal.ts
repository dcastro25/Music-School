"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold },
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [threshold]);

    return { ref, isVisible };
}

export function useCountUp(end: number, duration = 2000, startOnView = true) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const start = useCallback(() => {
        if (started) return;
        setStarted(true);
        const startTime = Date.now();
        const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration, started]);

    useEffect(() => {
        if (!startOnView) {
            start();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    start();
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 },
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [start, startOnView]);

    return { count, ref };
}
