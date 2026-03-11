'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT = `Zency Studios was born out of a shared frustration with the mundane. Formed in late 2023 by a collective of visionary creatives, we saw an industry saturated with cookie-cutter designs, safe marketing strategies, and brands that blended into the background noise of the digital age. We believed that true impact requires audacity. That’s why we built an agency where radical imagination meets meticulous execution. We are not just another marketing firm; we are a creative powerhouse obsessed with redefining the visual syntax of modern brands. What sets us apart is our relentless pursuit of the extraordinary. We don't just follow trends; we dissect them, break them, and forge entirely new aesthetics that provoke, engage, and inspire. Our approach is holistic yet subversive—blending cutting-edge 3D motion design, pixel-perfect web development, bespoke typography, and immersive brand storytelling into singular, unforgettable digital experiences. We understand that in a world fighting for fleeting attention, the only way to win is to be undeniably striking. Zency was founded on the belief that aesthetics are intrinsically tied to emotion, and by engineering the right visual stimuli, we can profoundly connect brands with global audiences. The driving force behind Zency Studios is a tight-knit squad of multidisciplinary specialists who are masters of their craft. Sudeep leads our strategic vision and interactive development, pushing the boundaries of what's possible on the web with bleeding-edge technologies and dynamic code architectures. Rahul is the maestro of motion and 3D, orchestrating complex visual symphonies that bring static concepts to explosive life. Priya commands our UI/UX and visual design language, ensuring every pixel is placed with intentionality, balancing radical aesthetics with intuitive usability. Amit oversees strategic growth and brand positioning, decoding market signals to ensure our creative risks yield measurable impact. Sneha is our creative director for visual storytelling and print, infusing every campaign with an organic, tactile sensibility that grounds our digital avant-garde works. Together, we are architects of the bold and the beautiful. At Zency, we don't just ask "what if?"—we ask "why not?" and then we build it. We partner with fearless brands, disruptive startups, and restless visionaries who are ready to shed the ordinary and step into our world. We are Zency Studios. Welcome to the new standard.`;

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const words = sectionRef.current.querySelectorAll('.zc-about-word');

        gsap.from(words, {
            opacity: 0,
            y: 20,
            stagger: 0.005,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
        });

    }, []);

    // Split text into words securely
    const wordsArray = ABOUT_TEXT.split(' ');

    return (
        <section className="zc-about-section" id="about-us" ref={sectionRef}>
            <div className="zc-about-content">
                <p className="zc-about-paragraph">
                    {wordsArray.map((word, index) => (
                        <span key={index} className="zc-about-word-wrapper">
                            <span className="zc-about-word">
                                {word}
                            </span>
                            {/* Force a space character using HTML entity */}
                            {index !== wordsArray.length - 1 && '\u00A0'}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
