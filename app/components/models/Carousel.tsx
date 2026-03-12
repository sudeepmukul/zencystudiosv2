'use client';

import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { usePageScroll } from '@/app/hooks/usePageScroll';
import { TextureLoader } from 'three';

const cardImages = [
    '/assets/gfx/gfx01.webp',
    '/assets/gfx/gfx05.webp',
    '/assets/gfx/gfx09.webp',
    '/assets/gfx/gfx13.webp',
    '/assets/gfx/gfx17.webp',
    '/assets/gfx/gfx21.webp',
];

const Carousel = () => {
    const groupRef = useRef<THREE.Group>(null);
    const data = usePageScroll();
    const textures = useLoader(TextureLoader, cardImages);

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
                        <meshStandardMaterial
                            map={textures[i]}
                            side={THREE.DoubleSide}
                            toneMapped={false}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};

export default Carousel;
