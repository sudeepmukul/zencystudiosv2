'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reelsWorks = [
    { title: "CLIP 1", video: "/assets/reels/reel01.webm" },
    { title: "ECELL REEL", video: "/assets/reels/reel02.webm" },
    { title: "ECELL FINAL", video: "/assets/reels/reel03.webm" },
    { title: "GHOST", video: "/assets/reels/reel04.webm" },
    { title: "GKJ", video: "/assets/reels/reel05.webm" },
    { title: "INTENT FINAL", video: "/assets/reels/reel06.webm" },
    { title: "TOP GUN: MAVERICK", video: "/assets/reels/reel07.webm" },
    { title: "BAKLAVA", video: "/assets/reels/reel08.webm" },
    { title: "BATMOBILE", video: "/assets/reels/reel09.webm" },
    { title: "CHEESECAKE", video: "/assets/reels/reel10.webm" },
    { title: "POSTER DESIGN", video: "/assets/reels/reel11.webm" },
    { title: "REEL PRACTICE", video: "/assets/reels/reel12.webm" },
];

function ReelCard({ reel, index, isPlaying }: { reel: typeof reelsWorks[0]; index: number; isPlaying: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoFailed, setVideoFailed] = useState(false);

    const handleError = useCallback(() => {
        setVideoFailed(true);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || videoFailed) return;

        if (isPlaying) {
            video.play().catch(() => {
                // Silently fail — the poster/thumbnail will be visible
            });
        } else {
            video.pause();
        }
    }, [isPlaying, videoFailed]);

    return (
        <div className="zc-reels-card relative" key={index}>
            {!videoFailed ? (
                <video
                    ref={videoRef}
                    src={reel.video}
                    muted
                    loop
                    playsInline
                    preload={index < 4 ? 'auto' : 'metadata'}
                    onError={handleError}
                    className="zc-reels-video"
                />
            ) : (
                <div className="zc-reels-fallback">
                    <div className="zc-reels-fallback-icon">▶</div>
                    <span className="zc-reels-fallback-title">{reel.title}</span>
                </div>
            )}
        </div>
    );
}

export default function ReelsSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const tickerRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        const ticker = tickerRef.current;
        if (!track || !ticker) return;

        const REELS_N = reelsWorks.length;
        const isMobile = window.innerWidth < 768;
        const REELS_GAP = isMobile ? 6 : 10;

        function measure() {
            const vh = window.innerHeight;
            const rch = vh * (isMobile ? 0.45 : 0.60);
            const rcw = rch * (9 / 16);
            const cards = track!.querySelectorAll('.zc-reels-card');

            cards.forEach(c => {
                (c as HTMLElement).style.width = rcw + 'px';
                (c as HTMLElement).style.height = rch + 'px';
            });

            const rtotalW = REELS_N * (rcw + REELS_GAP) - REELS_GAP;
            const rStartX = (rtotalW - rcw) / 2;
            const rEndX = (rtotalW - rcw) / 2 - (REELS_N - 1) * (rcw + REELS_GAP);
            // On mobile, scroll through it 50% faster to avoid feeling too long
            const rscrollDist = isMobile ? (rStartX - rEndX) * 0.7 : (rStartX - rEndX);

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

        // Refresh ScrollTrigger after a short delay to account for video elements loading
        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);

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
                setActiveIdx(activeIdx);
                const ticks = ticker!.querySelectorAll('.zc-reels-tick');
                ticks.forEach((t, i) => t.classList.toggle('active', i === activeIdx));
            }

            rafId = requestAnimationFrame(reelsRaf);
        }
        rafId = requestAnimationFrame(reelsRaf);

        let lastWidth = window.innerWidth;
        const handleResize = () => {
            const newWidth = window.innerWidth;
            if (newWidth === lastWidth && newWidth < 768) return; // Ignore vertical-only resizes on mobile
            lastWidth = newWidth;
            
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
            clearTimeout(refreshTimer);
            cancelAnimationFrame(rafId);
            if (st.scrollTrigger) st.scrollTrigger.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="zc-reels-section" id="reels-content">
            <h2 className="zc-section-label">Reels Content</h2>
            <div className="zc-reels-pin-wrap" id="reelsPinWrap">
                <div className="zc-reels-scene-title" ref={titleRef}>{reelsWorks[activeIdx]?.title}</div>
                <div className="zc-reels-track-outer">
                    <div className="zc-reels-track" ref={trackRef}>
                        {reelsWorks.map((w, i) => (
                            <ReelCard reel={w} index={i} key={i} isPlaying={Math.abs(i - activeIdx) <= 1} />
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
