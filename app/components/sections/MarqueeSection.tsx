'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeRow {
    items: { type: 'img' | 'text'; src?: string; text?: string }[];
}

interface MarqueeSectionProps {
    title: string;
    id: string;
    rows: MarqueeRow[];
    className?: string;
}

export default function MarqueeSection({ title, id, rows, className = '' }: MarqueeSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const containers = sectionRef.current.querySelectorAll('.zc-marquee-container');
        const triggers: ScrollTrigger[] = [];

        containers.forEach((container, index) => {
            const marquee = container.querySelector('.zc-marquee');
            if (!marquee) return;
            const direction = index % 2 === 0 ? -1 : 1;

            const anim = gsap.to(marquee, {
                x: direction * 600,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            });
            if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, []);

    return (
        <section className={`zc-showcase-section ${className}`} id={id} ref={sectionRef}>
            <h2 className="zc-section-label">{title}</h2>
            <div className="zc-marquees">
                {rows.map((row, ri) => (
                    <div className="zc-marquee-container" key={ri}>
                        <div className="zc-marquee">
                            {row.items.map((item, ii) => (
                                item.type === 'img' ? (
                                    <div className="zc-item" key={ii}>
                                        <img src={item.src} alt="" />
                                    </div>
                                ) : (
                                    <div className="zc-item zc-with-text" key={ii}>
                                        <h1>{item.text}</h1>
                                    </div>
                                )
                            ))}
                            {/* Duplicate for seamless loop */}
                            {row.items.map((item, ii) => (
                                item.type === 'img' ? (
                                    <div className="zc-item" key={`dup-${ii}`}>
                                        <img src={item.src} alt="" />
                                    </div>
                                ) : (
                                    <div className="zc-item zc-with-text" key={`dup-${ii}`}>
                                        <h1>{item.text}</h1>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
