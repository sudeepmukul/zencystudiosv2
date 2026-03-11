'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techCards = [
    { icon: '⚙️', title: 'n8n', desc: 'Workflow Automation' },
    { icon: '🤖', title: 'Clawdbot', desc: 'AI Assistants' },
    { icon: '🧠', title: 'AI Agents', desc: 'Intelligent Automation' },
    { icon: '📊', title: 'Analytics', desc: 'Data-Driven Insights' },
];

export default function AISection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const t1 = gsap.from('.zc-ai-title', {
            y: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.zc-ai-section', start: 'top 70%' },
        });

        const t2 = gsap.from('.zc-tech-card', {
            y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.zc-tech-grid', start: 'top 80%' },
        });

        return () => {
            t1.scrollTrigger?.kill();
            t2.scrollTrigger?.kill();
        };
    }, []);

    return (
        <section className="zc-ai-section" id="ai-automation" ref={sectionRef}>
            <h2 className="zc-ai-title">AI &amp;<br />Automation</h2>
            <div className="zc-tech-grid">
                {techCards.map((card, i) => (
                    <div className="zc-tech-card" key={i}>
                        <div className="zc-tech-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
