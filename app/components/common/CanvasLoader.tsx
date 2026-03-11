'use client';

import { useGSAP } from "@gsap/react";
import { AdaptiveDpr, Preload, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useRef } from "react";

import Preloader from "./Preloader";
import ProgressLoader from "./ProgressLoader";
import { ScrollHint } from "./ScrollHint";
import ThemeSwitcher from "./ThemeSwitcher";

import TopographicBackground from "../models/TopographicBackground";

const CanvasLoader = (props: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { progress } = useProgress();

  // Both canvases are fixed to the viewport so they stay visible behind all sections
  const canvasStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    overflow: "hidden",
    pointerEvents: "none",
  };

  useGSAP(() => {
    if (progress === 100) {
      gsap.to('.base-canvas', { opacity: 1, duration: 3, delay: 1 });
      gsap.to('.bg-canvas', { opacity: 1, duration: 3, delay: 1 });
    }
  }, [progress]);

  return (
    <>
      {/* Fixed Background Canvas — wavy topographic lines behind everything */}
      <Canvas className="bg-canvas"
        style={{ ...canvasStyle, background: 'black', zIndex: -2 }}
        dpr={[1, 2]}>
        <TopographicBackground />
      </Canvas>

      {/* Fixed 3D Hero Canvas — carousel, ring, text window */}
      <Canvas className="base-canvas"
        shadows
        style={{ ...canvasStyle, background: 'transparent', zIndex: -1 }}
        ref={canvasRef}
        dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {props.children}
          <Preloader />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>

      <ProgressLoader progress={progress} />
      <ThemeSwitcher />
      <ScrollHint />
    </>
  );
};

export default CanvasLoader;