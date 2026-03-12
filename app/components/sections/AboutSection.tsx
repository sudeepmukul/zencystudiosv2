'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT = ' Zency Studios is a creative studio that helps brands, startups, and communities build a strong digital presence through impactful design, engaging video content, and modern website experiences. We focus on creating visuals that not only look good but also communicate a brand’s story and capture audience attention. From social media creatives and promotional videos to event branding and landing pages, our goal is to deliver high-quality digital content that helps businesses grow, attract audiences, and stand out in the digital world.Zency Studios was founded by Sudeep Mukul, Shaik Farhan, and Arshad Azeem, a group of young creators passionate about design, technology, and digital media. Their vision is to build a creative ecosystem that connects talented creatives with organizations that need professional digital content and branding support. By combining creativity, collaboration, and strategic thinking, the team aims to help startups, events, and growing brands strengthen their online presence and communicate their ideas effectively.'
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
                            {/* Force a space character so text-align: justify can expand them */}
                            {index !== wordsArray.length - 1 && ' '}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
