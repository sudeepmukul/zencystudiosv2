'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { usePageScroll } from '@/app/hooks/usePageScroll';
import { Image } from '@react-three/drei';

const cardImages = [
    '/assets/carausel/IMG-20251006-WA0010.webp',
    '/assets/carausel/IMG-20251006-WA0016.webp',
    '/assets/carausel/IMG-20251006-WA0017.webp',
    '/assets/carausel/IMG-20251006-WA0018.webp',
    '/assets/carausel/IMG-20251006-WA0019.webp',
    '/assets/carausel/IMG-20251006-WA0020.webp',
];

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
                    <group
                        key={i}
                        position={[x, 0, z]}
                        rotation={[0, angle, 0]}
                    >
                        <Image
                            url={cardImages[i]}
                            transparent
                            side={THREE.DoubleSide}
                            toneMapped={false}
                            scale={[4, 5]} // scale acts as the dimensions for the Image component
                        />
                    </group>
                );
            })}
        </group>
    );
};

export default Carousel;
