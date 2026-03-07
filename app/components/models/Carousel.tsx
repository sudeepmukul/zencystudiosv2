'use client';

import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Carousel = () => {
    const groupRef = useRef<THREE.Group>(null);
    const data = useScroll();

    useFrame((state) => {
        if (groupRef.current && data) {
            // Revert back to original scroll rotation
            const c = data.range(0, 0.4);
            // Combine scroll rotation with continuous time-based rotation
            // state.clock.elapsedTime gives us a continuous value that we can use to rotate over time
            groupRef.current.rotation.y = (c * Math.PI * 2) + (state.clock.elapsedTime * 0.15);

            // Add a slight tilt for that 3D perspective look seen in the reference
            groupRef.current.rotation.x = -0.2;

            // Make the carousel follow the camera downwards for a bit so it stays in view longer
            // The camera scrolls down by moving the scene up (or camera down). 
            // In a standard Setup with ScrollControls, the scene moves based on scroll.
            // We want it to stay relatively fixed to the viewport for the first part of the scroll.
            // data.offset goes from 0 to 1 over the whole scroll area.

            // From 0 to 0.30 scroll, it travels down with the camera to stay in view
            // From 0.30 to 1.0 scroll, it travels back UP rapidly to exit the screen as the ring appears
            if (data.offset < 0.30) {
                groupRef.current.position.y = -data.offset * 80;
            } else {
                // Calculate how far past 0.30 we are
                const pastThreshold = data.offset - 0.30;
                // Start from the lowest point it reached (-0.30 * 80 = -24), 
                // and then add a MUCH larger positive value based on the remaining scroll to send it up out of frame.
                groupRef.current.position.y = (-0.30 * 80) + (pastThreshold * 1200); // Increased multiplier to get it out faster since it starts lower
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
                        // Rotate each item to face outward
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
