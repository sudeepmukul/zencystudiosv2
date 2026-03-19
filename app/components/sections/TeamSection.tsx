'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import Image from 'next/image';

const members = [
    { name: 'Sudeep', designation: 'Founder & CEO', img: '/assets/team/Sudeep.png' },
    { name: 'Farhan', designation: 'Co-Founder & Creative Director', img: '/assets/team/Farhan.png' },
    { name: 'Azeem', designation: 'Co-Founder & Project Manager', img: '/assets/team/Azeem.png' },
    { name: 'Praneet', designation: 'Chief Marketing Officer', img: '/assets/team/Praneet.jpg' },
];

export default function TeamSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Split all name headings
        const nameEls = sectionRef.current.querySelectorAll('.zc-name');
        const designationEls = sectionRef.current.querySelectorAll('.zc-designation');
        const splitInstances: SplitType[] = [];
        
        nameEls.forEach((el) => {
            const h1 = el.querySelector('h1');
            if (h1) {
                splitInstances.push(new SplitType(h1 as HTMLElement, { types: 'chars' }));
            }
        });

        const defaultChars = nameEls[0]?.querySelectorAll('.char');
        if (defaultChars) gsap.set(defaultChars, { y: '0%' });

        nameEls.forEach((el, i) => {
            if (i > 0) {
                gsap.set(el.querySelectorAll('.char'), { y: '100%' });
            }
        });
        
        designationEls.forEach((el, i) => {
             if (i > 0) gsap.set(el, { opacity: 0, y: 20 });
        });

        const imgs = sectionRef.current.querySelectorAll('.zc-img');
        imgs.forEach((img, index) => {
            const nameEl = nameEls[index + 1];
            if (!nameEl) return;
            const chars = nameEl.querySelectorAll('.char');

            img.addEventListener('mouseenter', () => {
                gsap.to(img, { width: 130, height: 130, duration: 0.5, ease: 'power4.out', overwrite: true });
                gsap.to(defaultChars!, { y: '-100%', duration: 0.5, ease: 'power4.out', stagger: { each: 0.02, from: 'center' }, overwrite: true });
                gsap.to(chars, { y: '0%', duration: 0.6, ease: 'power4.out', stagger: { each: 0.02, from: 'center' }, overwrite: true });
                
                const designation = designationEls[index + 1];
                if (designation) gsap.to(designation, { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out', delay: 0.2, overwrite: true });
            });

            img.addEventListener('mouseleave', () => {
                gsap.to(img, { width: 70, height: 70, duration: 0.5, ease: 'power4.out', overwrite: true });
                gsap.to(chars, { y: '100%', duration: 0.5, ease: 'power4.out', stagger: { each: 0.02, from: 'center' }, overwrite: true });
                gsap.to(defaultChars!, { y: '0%', duration: 0.6, ease: 'power4.out', stagger: { each: 0.02, from: 'center' }, overwrite: true });
                
                const designation = designationEls[index + 1];
                if (designation) gsap.to(designation, { opacity: 0, y: 20, duration: 0.4, ease: 'power4.out', overwrite: true });
            });
        });

        return () => {
            splitInstances.forEach(instance => instance.revert());
        };
    }, []);

    return (
        <section className="zc-team" id="about" ref={sectionRef}>
            <h2 className="zc-section-label" style={{ color: '#e3e3db' }}>THE TEAM</h2>
            <div className="zc-profile-images">
                {members.map((m) => (
                    <div className="zc-img" key={m.name}>
                        <Image src={m.img} alt={m.name} width={130} height={130} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <div className="zc-profile-names">
                <div className="zc-name default">
                    <h1>The Squad</h1>
                </div>
                {members.map((m) => (
                    <div className="zc-name" key={m.name}>
                        <h1>{m.name}</h1>
                    </div>
                ))}
            </div>
            <div className="zc-profile-designations" style={{ position: 'relative', width: '100%', height: '3rem', display: 'flex', justifyContent: 'center' }}>
                <div className="zc-designation default" style={{ position: 'absolute' }} />
                {members.map((m) => (
                    <p className="zc-designation" key={m.name} style={{ position: 'absolute', width: '100%', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#a0a0a0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {m.designation}
                    </p>
                ))}
            </div>
        </section>
    );
}
