'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reelsWorks = [
    { title: "SK Telecom :/Addiction", thumb: "https://images.prismic.io/alcre/aFNobrNJEFaPYFhr_1.png?auto=format,compress" },
    { title: "SK Telecom :/Dopamine", thumb: "https://images.prismic.io/alcre/aFNojLNJEFaPYFhs_2.png?auto=format,compress" },
    { title: "GALAXY S24", thumb: "https://images.prismic.io/alcre/aFNouLNJEFaPYFht_3.png?auto=format,compress" },
    { title: "GALAXY Z 6", thumb: "https://images.prismic.io/alcre/aFNpF7NJEFaPYFhy_4.png?auto=format,compress" },
    { title: "DDANJITRER's AI", thumb: "https://images.prismic.io/alcre/aFUm5Hfc4bHWikLF_flow_2025-06-20_18317930.png?auto=format,compress" },
    { title: "LANEIGE / Cream Skin", thumb: "https://images.prismic.io/alcre/aFNpVbNJEFaPYFh0_6.png?auto=format,compress" },
    { title: "VITAL BEUTY / Meta Green", thumb: "https://images.prismic.io/alcre/aFNparNJEFaPYFh1_7.png?auto=format,compress" },
    { title: "SK Telecom :/AI Help you?", thumb: "https://images.prismic.io/alcre/aFNo3LNJEFaPYFhw_8.png?auto=format,compress" },
    { title: "Always I Love You", thumb: "https://images.prismic.io/alcre/aFNpgbNJEFaPYFh2_9.png?auto=format,compress" },
    { title: "AESTURA / Pop-Up Store", thumb: "https://images.prismic.io/alcre/aFJQ17NJEFaPYDMC_%EB%A6%AC%EC%A0%9C%EB%8D%A4%ED%95%98%EC%9A%B0%EC%8A%A4.jpg?auto=compress,format" },
    { title: "BTS UNIVERSE", thumb: "https://images.prismic.io/alcre/ae7f7d37-e471-4344-b6b3-590ec27def86_0801.webp?auto=compress,format" },
    { title: "SK Telecom WE_ING", thumb: "https://images.prismic.io/alcre/403aff5c-6944-4738-b61f-c80b4265a0d0_pr0901.webp?auto=format,compress" },
];

export default function ReelsSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const tickerRef = useRef<HTMLDivElement>(null);
    const [activeTitle, setActiveTitle] = useState(reelsWorks[0].title);

    useEffect(() => {
        const track = trackRef.current;
        const ticker = tickerRef.current;
        if (!track || !ticker) return;

        const REELS_N = reelsWorks.length;
        const REELS_GAP = 10;

        function measure() {
            const vh = window.innerHeight;
            const rch = vh * 0.60;
            const rcw = rch * (9 / 16);
            const cards = track!.querySelectorAll('.zc-reels-card');

            cards.forEach(c => {
                (c as HTMLElement).style.width = rcw + 'px';
                (c as HTMLElement).style.height = rch + 'px';
            });

            const rtotalW = REELS_N * (rcw + REELS_GAP) - REELS_GAP;
            const rStartX = (rtotalW - rcw) / 2;
            const rEndX = (rtotalW - rcw) / 2 - (REELS_N - 1) * (rcw + REELS_GAP);
            const rscrollDist = rStartX - rEndX;

            track!.style.width = rtotalW + 'px';
            gsap.set(track, { x: rStartX });

            // Ticks
            const ticks = ticker!.querySelectorAll('.zc-reels-tick');
            ticks.forEach((t, i) => {
                const mid = (REELS_N - 1) / 2;
                const dist = Math.abs(i - mid) / mid;
                const h = Math.round(36 - dist * 20);
                (t as HTMLElement).style.height = h + 'px';
            });

            return { rcw, rch, rtotalW, rStartX, rEndX, rscrollDist };
        }

        let dims = measure();

        const st = gsap.fromTo(track,
            { x: dims.rStartX },
            {
                x: dims.rEndX,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#reelsPinWrap',
                    pin: true,
                    start: 'top top',
                    end: () => `+=${dims.rscrollDist}`,
                    scrub: 1,
                    pinSpacing: true,
                }
            }
        );

        // rAF for tilt/scale/opacity
        const TILT_MAX = 14;
        const SCALE_CTR = 1.06;
        const SCALE_EDGE = 0.78;
        const OPACITY_CTR = 1;
        const OPACITY_EDGE = 0.5;
        const FALLOFF = 1.1;

        let lastActive = -1;
        let rafId: number;

        function reelsRaf() {
            const x = gsap.getProperty(track, 'x') as number;
            const vw = window.innerWidth;
            const cx = vw / 2;
            const cards = track!.querySelectorAll('.zc-reels-card');
            let closestD = Infinity;
            let activeIdx = 0;

            cards.forEach((card, i) => {
                const cardCx = x + i * (dims.rcw + REELS_GAP) + dims.rcw / 2 + (vw - dims.rtotalW) / 2;
                const d = (cardCx - cx) / (vw * FALLOFF);
                const dC = Math.max(-1, Math.min(1, d));
                const tilt = dC * TILT_MAX;
                const absD = Math.abs(dC);
                const scale = SCALE_CTR - (SCALE_CTR - SCALE_EDGE) * absD;
                const opacity = OPACITY_CTR - (OPACITY_CTR - OPACITY_EDGE) * absD;

                const el = card as HTMLElement;
                el.style.transformOrigin = '50% 100%';
                el.style.transform = `rotate(${tilt}deg) scale(${scale})`;
                el.style.opacity = String(opacity);
                el.style.zIndex = String(Math.round(50 - absD * 40));

                const realD = Math.abs(cardCx - cx);
                if (realD < closestD) { closestD = realD; activeIdx = i; }
            });

            if (activeIdx !== lastActive) {
                lastActive = activeIdx;
                setActiveTitle(reelsWorks[activeIdx].title);
                const ticks = ticker!.querySelectorAll('.zc-reels-tick');
                ticks.forEach((t, i) => t.classList.toggle('active', i === activeIdx));
            }

            rafId = requestAnimationFrame(reelsRaf);
        }
        rafId = requestAnimationFrame(reelsRaf);

        const handleResize = () => {
            if (st.scrollTrigger) st.scrollTrigger.kill();
            dims = measure();
            gsap.fromTo(track,
                { x: dims.rStartX },
                {
                    x: dims.rEndX,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#reelsPinWrap',
                        pin: true,
                        start: 'top top',
                        end: () => `+=${dims.rscrollDist}`,
                        scrub: 1,
                        pinSpacing: true,
                    }
                }
            );
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(rafId);
            if (st.scrollTrigger) st.scrollTrigger.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="zc-reels-section" id="reels-content">
            <h2 className="zc-section-label">Reels Content</h2>
            <div className="zc-reels-pin-wrap" id="reelsPinWrap">
                <div className="zc-reels-scene-title" ref={titleRef}>{activeTitle}</div>
                <div className="zc-reels-track-outer">
                    <div className="zc-reels-track" ref={trackRef}>
                        {reelsWorks.map((w, i) => (
                            <div className="zc-reels-card" key={i}>
                                <img src={w.thumb} alt={w.title} loading={i < 6 ? 'eager' : 'lazy'} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="zc-reels-ticker-wrap" ref={tickerRef}>
                    {reelsWorks.map((_, i) => (
                        <div className="zc-reels-tick" key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
