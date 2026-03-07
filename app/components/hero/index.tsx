'use client';

import { Text } from "@react-three/drei";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";
import { Scroll } from "@react-three/drei";
import Carousel from "../models/Carousel";


const Hero = () => {
  const titleRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(titleRef.current.position, {
        y: -10,
        duration: 1,
        // delay: 1.5,
      }, {
        y: 0,
        duration: 3
      });
    }
  }, [progress]);

  const fontProps = {
    font: "./Vercetti-Regular.woff",
    fontSize: 1.2,
  };

  return (
    <>
      {/* HTML Overlay tied to scroll */}
      <Scroll html style={{ width: '100vw', paddingTop: '10vh' }}>
        <div className="w-full flex w-full h-[150vh] flex-col items-center justify-start pointer-events-none mt-20">
          <h1
            className="text-[12vw] font-black leading-none tracking-tighter uppercase m-0 p-0 text-[#fbff00]"
            style={{ fontFamily: "'Montserrat', 'Vercetti', sans-serif" }}
          >
            CONTENT.
          </h1>
          <p
            className="text-xl md:text-3xl font-bold mt-4 text-black uppercase tracking-widest bg-yellow-400 px-4 py-2"
            style={{ fontFamily: "'Montserrat', 'Vercetti', sans-serif" }}
          >
            {`It's not marketing. It's Zency.`}
          </p>
        </div>
      </Scroll >

      {/* Existing 3D Scene Elements */}
      < Text position={[0, 2, -10]} {...fontProps} ref={titleRef} > Zency Studios</Text >
      <StarsContainer />
      <group position={[0, -15, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10} />
        <WindowModel receiveShadow />
        <TextWindow />
      </group>

      {/* Carousel Model placed at the start of the scroll journey so it's visible with the 'CONTENT.' text */}
      <group position={[0, -8, -15]} scale={1.2}>
        <Carousel />
      </group>
    </>
  );
};

export default Hero;
