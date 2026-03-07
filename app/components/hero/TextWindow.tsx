'use client';

import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const TextWindow = () => {
  const data = useScroll();
  const windowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const c = data.range(0.65, 0.15);

    if (windowRef.current) {
      windowRef.current.setRotationFromAxisAngle(new THREE.Vector3(0, -1, 0), 0.5 * Math.PI * c);
      windowRef.current.position.x = -0.6 * c;
      windowRef.current.position.z = -0.6 * c;
    }
  });

  const fontProps = {
    font: "./Montserrat-Bold.ttf",
  };

  return (
    <group position={[0, 4, 0]} ref={windowRef}> {/*That text dabba is here*/}

      <Text color="#fbff00" anchorX="left" anchorY="middle"
        fontSize={1.3}
        position={[0, 0, 0]}
        {...fontProps}
        scale={[1, -1, 1]}
        rotation={[0, 0, -Math.PI / 2]}>
        CREATIVE DESIGN AGENCY
      </Text>

      <Text color="#fbff00" anchorX="right" anchorY="middle"
        {...fontProps}
        scale={[-1, -1, 1]}
        fontSize={1.3}
        position={[0, 0, -1.4]}
        rotation={[0, 0, -Math.PI / 2]}>
        BRANDING. STRATEGY
      </Text>

      <group position={[-0.45, 0, -0.3]}>
        <Text color="#fbff00" anchorX="left" anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.8}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          WEB. MOBILE
        </Text>

        <Text color="#fbff00" anchorX="left" anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.8}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          UI/UX DESIGN
        </Text>
      </group>

      <group position={[0.45, 0, -0.3]}>
        <Text color="#fbff00" anchorX="right" anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.8}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          MOTION. 3D
        </Text>
        <Text color="#fbff00" anchorX="right" anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.8}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          PRINT. DIGITAL
        </Text>
      </group>
    </group>
  );
}

export default TextWindow;