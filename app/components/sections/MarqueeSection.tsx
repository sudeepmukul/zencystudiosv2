'use client';

import { useRef } from 'react';
import Image from 'next/image';

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

    return (
        <section className={`zc-showcase-section ${className}`} id={id} ref={sectionRef}>
            <h2 className="zc-section-label">{title}</h2>
            <div className="zc-marquees">
                {rows.map((row, ri) => (
                    <div className="zc-marquee-container" key={ri}>
                        <div
                            className={`zc-marquee zc-marquee-loop ${ri % 2 === 0 ? 'zc-marquee-left' : 'zc-marquee-right'}`}
                        >
                            {row.items.map((item, ii) => (
                                item.type === 'img' ? (
                                    <div className="zc-item relative" key={ii}>
                                        <Image src={item.src!} alt="" fill className="object-cover" />
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
                                    <div className="zc-item relative" key={`dup-${ii}`}>
                                        <Image src={item.src!} alt="" fill className="object-cover" />
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
