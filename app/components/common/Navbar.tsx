'use client';

import { useEffect, useState } from 'react';

const navLinks = [
    { label: 'Expertise', href: '#expertise' },
    { label: 'Work', href: '#graphic-design' },
    { label: 'AI', href: '#ai-automation' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'About', href: '#about' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
            
            // Clear active section if we are at the very top (Hero section)
            if (window.scrollY < 200) {
                setActiveSection('');
            }
        };
        window.addEventListener('scroll', handleScroll);

        // Setup Intersection Observer for scroll tracking
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Only set active section from observer if we're past the hero section
                    if (window.scrollY >= 200) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navLinks.forEach((link) => {
            const el = document.querySelector(link.href);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            // Using smooth scroll standard native behavior for standard HTML elements
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`zc-navbar-container ${scrolled ? 'scrolled' : ''}`}
        >
            <nav className="zc-navbar">
                {/* Logo Area */}
                <div className="zc-navbar-logo">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        ZENCY
                    </a>
                </div>

                {/* Links */}
                <ul className="zc-navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className={`zc-navbar-link ${activeSection === link.href ? 'active' : ''}`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Contact CTA */}
                <div className="zc-navbar-cta">
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); /* Scroll or open modal */ }}
                        className="zc-btn-contact"
                    >
                        Contact Us
                    </a>
                </div>
            </nav>
        </header>
    );
}
