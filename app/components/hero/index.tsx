'use client';

import { Text } from "@react-three/drei";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";
import Carousel from "../models/Carousel";


const Hero = () => {
  const titleRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(titleRef.current.position, {
        y: -10,
        duration: 1,
      }, {
        y: 0,
        duration: 3
      });
    }
  }, [progress]);

  const fontProps = {
    font: "./Montserrat-Bold.ttf",
    fontSize: 1.5,
  };

  return (
    <>
      {/* Existing 3D Scene Elements */}
      <Text position={[0, 2, -10]} {...fontProps} fontWeight="bold" ref={titleRef}> Zency Studios</Text>
      <StarsContainer />
      <group position={[0, -15, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10} />
        <WindowModel receiveShadow />
        <TextWindow />
      </group>

      {/* Carousel Model */}
      <group position={[0, -8, -15]} scale={1.2}>
        <Carousel />
      </group>
    </>
  );
};

export default Hero;
