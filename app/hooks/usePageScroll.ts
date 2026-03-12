import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const HERO_SCROLL_PAGES = 2.5; // how many viewports of scroll the 3D hero uses

/**
 * Drop-in replacement for drei's useScroll().
 * Reads window.scrollY instead of a nested ScrollControls container,
 * so the whole page shares one scrollbar.
 */
export function usePageScroll() {
    const ref = useRef<{
        offset: number;
        range: (from: number, distance: number) => number;
    }>({
        offset: 0,    // 0‑1 over the hero zone
        range: () => 0,
    });

    useFrame(() => {
        const vh = window.innerHeight;
        const heroScrollHeight = vh * HERO_SCROLL_PAGES;
        const scrollY = window.scrollY;

        // clamp offset 0-1 within the hero zone
        const offset = Math.min(1, Math.max(0, scrollY / heroScrollHeight));
        ref.current.offset = offset;

        ref.current.range = (from: number, distance: number) => {
            const start = from;
            const end = from + distance;
            if (offset <= start) return 0;
            if (offset >= end) return 1;
            return (offset - start) / distance;
        };
    });

    return ref.current;
}

export { HERO_SCROLL_PAGES };
