'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExpertiseSection from './ExpertiseSection';
import MarqueeSection from './MarqueeSection';
import ReelsSection from './ReelsSection';
import AISection from './AISection';
import AutomationFlowSection from './AutomationFlowSection';
import WhyUsSection from './WhyUsSection';
import AboutSection from './AboutSection';
import TeamSection from './TeamSection';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

// Graphic Design marquee data
const graphicDesignRows = [
    {
        items: [
            { type: 'img' as const, src: '/assets/showcase/img1.jpg' },
            { type: 'text' as const, text: 'Design' },
            { type: 'img' as const, src: '/assets/showcase/img2.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img3.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img4.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img5.jpg' },
            { type: 'text' as const, text: 'Craft' },
            { type: 'img' as const, src: '/assets/showcase/img6.jpg' },
        ]
    },
    {
        items: [
            { type: 'img' as const, src: '/assets/showcase/img7.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img8.jpg' },
            { type: 'text' as const, text: 'Visuals' },
            { type: 'img' as const, src: '/assets/showcase/img9.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img10.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img11.jpg' },
            { type: 'text' as const, text: 'Pixel' },
            { type: 'img' as const, src: '/assets/showcase/img12.jpg' },
        ]
    },
    {
        items: [
            { type: 'img' as const, src: '/assets/showcase/img13.jpg' },
            { type: 'text' as const, text: 'Creative' },
            { type: 'img' as const, src: '/assets/showcase/img14.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img15.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img16.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img1.jpg' },
            { type: 'text' as const, text: 'Art' },
            { type: 'img' as const, src: '/assets/showcase/img2.jpg' },
        ]
    },
    {
        items: [
            { type: 'img' as const, src: '/assets/showcase/img3.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img4.jpg' },
            { type: 'text' as const, text: 'Flow' },
            { type: 'img' as const, src: '/assets/showcase/img5.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img6.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img7.jpg' },
            { type: 'text' as const, text: 'Style' },
            { type: 'img' as const, src: '/assets/showcase/img8.jpg' },
        ]
    },
];

// Video Editing marquee data
const videoEditingRows = [
    {
        items: [
            { type: 'text' as const, text: 'Edit' },
            { type: 'img' as const, src: '/assets/showcase/img5.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img6.jpg' },
            { type: 'text' as const, text: 'Cut' },
            { type: 'img' as const, src: '/assets/showcase/img7.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img8.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img9.jpg' },
            { type: 'text' as const, text: 'Trim' },
        ]
    },
    {
        items: [
            { type: 'img' as const, src: '/assets/showcase/img10.jpg' },
            { type: 'text' as const, text: 'Render' },
            { type: 'img' as const, src: '/assets/showcase/img11.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img12.jpg' },
            { type: 'text' as const, text: 'Color' },
            { type: 'img' as const, src: '/assets/showcase/img13.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img14.jpg' },
            { type: 'text' as const, text: 'Grade' },
        ]
    },
    {
        items: [
            { type: 'img' as const, src: '/assets/showcase/img15.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img16.jpg' },
            { type: 'text' as const, text: 'Motion' },
            { type: 'img' as const, src: '/assets/showcase/img1.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img2.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img3.jpg' },
            { type: 'text' as const, text: 'VFX' },
            { type: 'img' as const, src: '/assets/showcase/img4.jpg' },
        ]
    },
    {
        items: [
            { type: 'text' as const, text: 'Sequence' },
            { type: 'img' as const, src: '/assets/showcase/img5.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img10.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img15.jpg' },
            { type: 'text' as const, text: 'Frame' },
            { type: 'img' as const, src: '/assets/showcase/img8.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img12.jpg' },
            { type: 'img' as const, src: '/assets/showcase/img16.jpg' },
        ]
    },
];

export default function SectionsWrapper() {
    useEffect(() => {
        // Refresh ScrollTrigger after all sections mount
        ScrollTrigger.refresh();

        // Also refresh section labels
        document.querySelectorAll('.zc-section-label').forEach((label) => {
            gsap.from(label, {
                y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: label, start: 'top 85%' },
            });
        });
    }, []);

    return (
        <div style={{ background: '#000' }}>
            <ExpertiseSection />
            <MarqueeSection
                title="Graphic Design"
                id="graphic-design"
                rows={graphicDesignRows}
            />
            <MarqueeSection
                title="Video Editing"
                id="video-editing"
                rows={videoEditingRows}
                className="zc-video-section"
            />
            <ReelsSection />
            <AISection />
            <AutomationFlowSection />
            <WhyUsSection />
            <AboutSection />
            <TeamSection />
            <Footer />
        </div>
    );
}
