'use client';

import { Environment, useFBX } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { usePageScroll } from '@/app/hooks/usePageScroll';

const WindowModel = (props: Partial<THREE.Object3D>) => {
  const ringRef = useRef<THREE.Group>(null);

  const fbx = useFBX('/models/Abstract_ring.fbx');
  const scene = useMemo(() => fbx.clone(true), [fbx]);

  const data = usePageScroll();

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          color: '#F4D03F',
          roughness: 0.15,
          metalness: 1.0,
        });
      }
    });
  }, [scene]);

  useFrame(() => {
    const approach = data.range(0.05, 0.2);

    if (ringRef.current) {
      ringRef.current.rotation.y = Math.PI * 2 * approach;
      const s = 0.005 + 0.003 * approach;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group {...props} dispose={null}>
      <Environment preset="city" />
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