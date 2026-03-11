'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const t1 = gsap.from('.zc-why-sub', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.zc-why-us', start: 'top 70%' },
        });

        const titleEl = sectionRef.current.querySelector('.zc-why-title');
        if (titleEl) {
            const whyTitle = new SplitType(titleEl as HTMLElement, { types: 'chars' });
            const t2 = gsap.from(whyTitle.chars!, {
                y: 100, opacity: 0, stagger: 0.03, duration: 1, ease: 'power4.out',
                scrollTrigger: { trigger: '.zc-why-us', start: 'top 60%' },
            });

            return () => {
                t1.scrollTrigger?.kill();
                t2.scrollTrigger?.kill();
            };
        }

        return () => { t1.scrollTrigger?.kill(); };
    }, []);

    return (
        <section className="zc-why-us" id="why-us" ref={sectionRef}>
            <p className="zc-why-sub">More than Marketing</p>
            <h2 className="zc-why-title">WE ARE<br />ZENCY</h2>
        </section>
    );
}
