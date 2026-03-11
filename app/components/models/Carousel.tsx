'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { usePageScroll } from '@/app/hooks/usePageScroll';

const Carousel = () => {
    const groupRef = useRef<THREE.Group>(null);
    const data = usePageScroll();

    useFrame((state) => {
        if (groupRef.current) {
            const c = data.range(0, 0.4);
            groupRef.current.rotation.y = (c * Math.PI * 2) + (state.clock.elapsedTime * 0.15);
            groupRef.current.rotation.x = -0.2;

            if (data.offset < 0.30) {
                groupRef.current.position.y = -data.offset * 80;
            } else {
                const pastThreshold = data.offset - 0.30;
                groupRef.current.position.y = (-0.30 * 80) + (pastThreshold * 1200);
            }
        }
    });

    const count = 6;
    const radius = 6;

    return (
        <group ref={groupRef}>
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;

                return (
                    <mesh
                        key={i}
                        position={[x, 0, z]}
                        rotation={[0, angle, 0]}
                    >
                        <planeGeometry args={[4, 5]} />
                        <meshStandardMaterial color={new THREE.Color().setHSL(i / count, 0.8, 0.5)} side={THREE.DoubleSide} />
                    </mesh>
                );
            })}
        </group>
    );
};

export default Carousel;
