'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
    {
        label: '◈ PROJECT 01', title: 'SEO OPTIMIZED\nWEB BLOGS', desc: 'Automated research, drafting & publishing pipelines that rank.', side: 'left',
        svg: <svg width="88" height="88" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
    },
    {
        label: '◈ PROJECT 02', title: 'AI VIDEO\nGENERATIONS', desc: 'Script to screen in minutes. Bulk video content at scale.', side: 'right',
        svg: <svg width="88" height="88" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="15" height="12" rx="2" ry="2" /><polyline points="17 10 22 6 22 18 17 14" /></svg>
    },
    {
        label: '◈ PROJECT 03', title: 'LEADS\nSCRAPER', desc: 'Extract, enrich and deliver qualified leads directly to your CRM.', side: 'left',
        svg: <svg width="88" height="88" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    },
    {
        label: '◈ PROJECT 04', title: 'CUSTOMER SUPPORT\nAGENTS', desc: '24/7 AI agents that resolve tickets before humans blink.', side: 'right',
        svg: <svg width="88" height="88" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    },
    {
        label: '◈ PROJECT 05', title: 'SOCIAL MEDIA\nMANAGER', desc: 'Schedule, post & analyze across every platform automatically.', side: 'left',
        svg: <svg width="88" height="88" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
    },
];

export default function AutomationFlowSection() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const content = container.querySelector('.zc-automation-content') as HTMLElement;
        const progressBar = container.querySelector('.zc-automation-progress-bar') as HTMLElement;
        const spineActive = container.querySelector('.zc-spine-active') as HTMLElement;
        const spineParticle = container.querySelector('.zc-spine-particle') as HTMLElement;
        const nodeEls = container.querySelectorAll('.zc-automation-node');
        const pips = container.querySelectorAll('.zc-pip');
        const sidePips = container.querySelector('.zc-side-pips') as HTMLElement;
        const outro = container.querySelector('.zc-automation-outro') as HTMLElement;

        if (!content) return;

        const scrollHeight = 500;
        const maxTranslate = 400;
        const activeNodes = new Set<number>();

        gsap.set(sidePips, { opacity: 0 });

        function triggerPulse(i: number) {
            const el = container!.querySelector(`#pulse-${i}`) as HTMLElement;
            if (!el) return;
            el.style.transition = 'none';
            el.style.transform = 'scale(0.8)';
            el.style.opacity = '0.8';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.transition = 'transform 1.4s ease-out, opacity 1.4s ease-out';
                    el.style.transform = 'scale(2.2)';
                    el.style.opacity = '0';
                });
            });
        }

        const st = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: `+=${scrollHeight}%`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                if (progressBar) progressBar.style.width = (progress * 100) + '%';

                gsap.set(content, { y: `${-progress * maxTranslate}vh` });

                if (progress > 0.05 && progress < 0.95) {
                    gsap.to(sidePips, { opacity: 1, duration: 0.3, overwrite: true });
                } else {
                    gsap.to(sidePips, { opacity: 0, duration: 0.3, overwrite: true });
                }

                const spineProgress = Math.max(0, Math.min(1, (progress - 0.05) / 0.85));
                gsap.set(spineActive, { height: `${spineProgress * 100}%` });
                gsap.set(spineParticle, { top: `${spineProgress * 100}%`, opacity: spineProgress > 0 ? 1 : 0 });

                nodeEls.forEach((node, i) => {
                    const nodeY = 88 + (i * 64);
                    const viewportY = nodeY - (progress * maxTranslate);
                    const isActive = viewportY > 30 && viewportY < 70;

                    if (isActive && !activeNodes.has(i)) {
                        activeNodes.add(i);
                        node.classList.add('active');
                        if (pips[i]) pips[i].classList.add('active');
                        triggerPulse(i);
                    } else if (!isActive && activeNodes.has(i)) {
                        activeNodes.delete(i);
                        node.classList.remove('active');
                        if (pips[i]) pips[i].classList.remove('active');
                    }
                });

                if (progress > 0.92) {
                    outro?.classList.add('visible');
                } else {
                    outro?.classList.remove('visible');
                }
            },
            onLeave: () => gsap.to(sidePips, { opacity: 0, duration: 0.3 }),
            onLeaveBack: () => gsap.to(sidePips, { opacity: 0, duration: 0.3 }),
        });

        return () => { st.kill(); };
    }, []);

    return (
        <section className="zc-automation-container" id="our-builds" ref={containerRef}>
            <div className="zc-automation-bg-grid" />
            <div className="zc-automation-bg-scanlines" />
            <div className="zc-automation-progress-bar" />

            <div className="zc-side-pips">
                {nodes.map((_, i) => <div className="zc-pip" key={i} />)}
            </div>

            <div className="zc-automation-content">
                <div className="zc-automation-intro">
                    <span className="zc-corner-label tl">ZENCY.SYS</span>
                    <span className="zc-corner-label tr">v2.0.25</span>
                    <span className="zc-corner-label bl">BOOT OK</span>
                    <span className="zc-corner-label br">◈ LIVE</span>
                    <div className="zc-automation-intro-tag">◈ INITIALIZING WORKFLOW</div>
                    <h1 className="zc-automation-intro-title">OUR BUILDS</h1>
                    <div className="zc-scroll-hint">
                        <span className="arrow">↓</span> SCROLL TO DEPLOY <span className="arrow">↓</span>
                    </div>
                </div>

                <div className="zc-spine-wrapper">
                    <div className="zc-spine-track" />
                    <div className="zc-spine-active" />
                    <div className="zc-spine-particle" />
                </div>

                {nodes.map((node, i) => (
                    <div
                        className={`zc-automation-node ${node.side}`}
                        key={i}
                        style={{ top: `calc(40vh + ${48 + i * 64}vh)` }}
                    >
                        <div className="zc-node-text">
                            <div className="zc-node-text-inner">
                                <div className="zc-node-label">{node.label}</div>
                                <div className="zc-node-title" style={{ whiteSpace: 'pre-line' }}>{node.title}</div>
                                <div className="zc-node-sep" />
                                <div className="zc-node-desc">{node.desc}</div>
                            </div>
                        </div>
                        <div className="zc-node-icon">
                            <div className="zc-node-icon-glow" />
                            <div className="zc-node-icon-ring-outer" />
                            <div className="zc-node-icon-ring-inner" />
                            <div className="zc-node-icon-svg">{node.svg}</div>
                            <div className="zc-node-icon-pulse" id={`pulse-${i}`} />
                        </div>
                        <div className="zc-node-connector" />
                    </div>
                ))}

                <div className="zc-automation-outro">
                    <div className="zc-automation-outro-status">
                        <div className="zc-automation-outro-dot" /> 5 / 5 WORKFLOWS DEPLOYED
                    </div>
                    <h2 className="zc-automation-outro-title">MOREEE<br /><span>AUTOMATIONS</span></h2>
                    <p className="zc-automation-outro-desc">Every manual task is a workflow waiting to be born. We build them all.</p>
                    <button className="zc-automation-outro-btn">
                        AUTOMATE WITH ZENCY
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                    <div className="zc-automation-outro-footer">ZENCY © 2025 — ALL WORKFLOWS RESERVED</div>
                </div>
            </div>
        </section>
    );
}
