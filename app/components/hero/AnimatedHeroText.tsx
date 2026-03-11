import { useEffect, useState } from 'react';

const WORDS = [
    "CONTENT.",
    "AUTOMATION.",
    "WEBSITES.",
    "GRAPHIC\u00A0DESIGN.",
    "VIDEO\u00A0EDITS.",
];

export default function AnimatedHeroText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % WORDS.length);
        }, 1000); // 1-second gap per the user's request

        return () => clearInterval(interval);
    }, []);

    return (
        <h1
            className="text-[8vw] md:text-[9vw] xl:text-[10vw] font-black leading-none tracking-tighter uppercase m-0 p-0 text-[#fbff00] zc-animated-hero-text"
            style={{
                fontFamily: "'Montserrat', 'Vercetti', sans-serif",
            }}
        >
            <span className="zc-word-wrapper">
                <span
                    key={index}
                    className="zc-glitch-word"
                    data-text={WORDS[index]}
                >
                    {WORDS[index]}
                </span>
            </span>
        </h1>
    );
}
