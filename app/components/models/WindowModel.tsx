'use client';

import { Environment, useFBX, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const WindowModel = (props: Partial<THREE.Object3D>) => {
  const ringRef = useRef<THREE.Group>(null);

  const fbx = useFBX('/models/Abstract_ring.fbx');
  const scene = useMemo(() => fbx.clone(true), [fbx]);

  const data = useScroll();

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          color: '#F4D03F', // Golden color
          roughness: 0.15,  // Very smooth/shiny
          metalness: 1.0,   // Fully metallic
        });
      }
    });
  }, [scene]);

  useFrame(() => {
    // Original window used range(0.4, 0.1) and range(0.5, 0.1)
    // We replicate similar timing: ring scales up as camera approaches
    // Changing the start from 0.20 to 0.05 so it begins to appear almost immediately
    // after the carousel starts moving down
    const approach = data.range(0.05, 0.2);

    if (ringRef.current) {
      // Gentle rotation as user scrolls through
      ringRef.current.rotation.y = Math.PI * 2 * approach;
      // Scale up as camera gets closer
      const s = 0.005 + 0.003 * approach;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group {...props} dispose={null}>
      <Environment preset="city" />
      {/* Ring faces upward along Y so the camera (looking down) sees through the hole */}
      <group
        ref={ringRef}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.005}
        position={[-0.6, 5, -2.9]}
      >
        <primitive object={scene} />
      </group>
    </group>
  );
};

useFBX.preload('/models/Abstract_ring.fbx');

export default WindowModel;