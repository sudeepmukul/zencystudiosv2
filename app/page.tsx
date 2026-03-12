'use client';

import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Hero from "./components/hero";
import AnimatedHeroText from "./components/hero/AnimatedHeroText";
import SectionsWrapper from "./components/sections/SectionsWrapper";
import { HERO_SCROLL_PAGES } from "./hooks/usePageScroll";

const Home = () => {
  return (
    <div>
      {/* Fixed canvases behind everything */}
      <CanvasLoader>
        <ScrollWrapper>
          <Hero />
        </ScrollWrapper>
      </CanvasLoader>

      {/* Hero scroll spacer — transparent so the fixed 3D canvases show through */}
      <div style={{ height: `${HERO_SCROLL_PAGES * 100}vh`, position: 'relative' }}>
        {/* Hero HTML overlay text — positioned fixed within hero zone */}
        <div
          className="w-full flex flex-col items-center justify-start pointer-events-none"
          style={{
            position: 'absolute',
            top: 0,
            height: '100vh',
            paddingTop: '10vh',
            zIndex: 1,
          }}
        >
          <AnimatedHeroText />
          <p
            className="text-xl md:text-3xl font-bold mt-4 text-black uppercase tracking-widest bg-[#fbff00] px-4 py-2"
            style={{ fontFamily: 'var(--font-montserrat), var(--font-vercetti), sans-serif' }}
          >
            {`It's not marketing. It's Zency.`}
          </p>
        </div>
      </div>

      {/* Content Sections — normal HTML flow */}
      <SectionsWrapper />
    </div>
  );
};
export default Home;
