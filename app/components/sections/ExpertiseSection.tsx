'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import Image from 'next/image';

const expertiseCards = [
    { title: 'Marketing', img: '/assets/expertise/01.jpg' },
    { title: 'Branding', img: '/assets/expertise/02.jpg' },
    { title: 'Strategy', img: '/assets/expertise/03.jpg' },
    { title: 'Content', img: '/assets/expertise/04.jpg' },
    { title: 'Analytics', img: '/assets/expertise/05.jpg' },
];

export default function ExpertiseSection() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    function initializeCards() {
        if (!sliderRef.current) return;
        const cards = Array.from(sliderRef.current.querySelectorAll('.zc-card'));
        gsap.to(cards, {
            y: (i: number) => `${-15 + 15 * i}%`,
            z: (i: number) => 15 * i,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: -0.1,
        });
    }

    function cycleCard() {
        if (isAnimating.current || !sliderRef.current) return;
        isAnimating.current = true;

        const cards = Array.from(sliderRef.current.querySelectorAll('.zc-card'));
        const lastCard = cards.pop();
        const nextCard = cards[cards.length - 1];
        if (!lastCard) return;

        gsap.to(lastCard.querySelectorAll('.char'), {
            y: 200, duration: 0.75, ease: 'power3.in',
        });

        gsap.to(lastCard, {
            y: '+=150%', duration: 0.75, ease: 'power3.in',
            onComplete: () => {
                sliderRef.current?.prepend(lastCard);
                initializeCards();
                gsap.set(lastCard.querySelectorAll('.char'), { y: -200 });
                setTimeout(() => { isAnimating.current = false; }, 800);
            },
        });

        if (nextCard) {
            gsap.to(nextCard.querySelectorAll('.char'), {
                y: 0, duration: 1, ease: 'power3.out', stagger: 0.05,
            });
        }
    }

    function startAutoPlay() {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(cycleCard, 2000);
    }

    useEffect(() => {
        if (!sliderRef.current) return;

        // Split text
        sliderRef.current.querySelectorAll('.zc-copy h1').forEach((h1) => {
            new SplitType(h1 as HTMLElement, { types: 'chars' });
        });

        initializeCards();

        // Initial state
        gsap.set('.zc-copy h1 .char', { y: -200 });
        const lastCard = sliderRef.current.querySelector('.zc-card:last-child');
        if (lastCard) {
            gsap.set(lastCard.querySelectorAll('.zc-copy h1 .char'), { y: 0 });
        }

        startAutoPlay();

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, []);

    const handleClick = () => {
        cycleCard();
        startAutoPlay();
    };

    return (
        <section className="zc-expertise" id="expertise">
            <h2 className="zc-section-label">Our Expertise</h2>
            <div className="zc-slider" ref={sliderRef} onClick={handleClick}>
                {expertiseCards.map((card, i) => (
                    <div className="zc-card" key={i}>
                        <Image src={card.img} alt={card.title} fill className="object-cover" />
                        <div className="zc-copy">
                            <h1>{card.title}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
