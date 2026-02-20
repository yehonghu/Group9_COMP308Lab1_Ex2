// Three.js 3D Game Card Component
// Creates an interactive 3D card effect for game display
// Uses @react-three/fiber for React integration

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// 3D Card mesh
const Card3D = ({ title, rating, hovered, setHovered }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;

      // Rotate slightly when hovered
      if (hovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          0.3,
          0.1
        );
        meshRef.current.scale.setScalar(
          THREE.MathUtils.lerp(meshRef.current.scale.x, 1.05, 0.1)
        );
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          0,
          0.1
        );
        meshRef.current.scale.setScalar(
          THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
        );
      }
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox
        args={[2.5, 1.2, 0.1]}
        radius={0.1}
        smoothness={4}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? '#6366f1' : '#4338ca'}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Game title */}
      <Text
        position={[0, 0.15, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title || 'Game Title'}
      </Text>

      {/* Rating */}
      <Text
        position={[0, -0.25, 0.06]}
        fontSize={0.12}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        {'★ ' + (rating || 0).toFixed(1)}
      </Text>
    </group>
  );
};

// Wrapper component with Canvas
const GameCard3D = ({ title, rating }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ width: '100%', height: '120px', cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 3, 3]} intensity={0.5} />
        <Card3D
          title={title}
          rating={rating}
          hovered={hovered}
          setHovered={setHovered}
        />
      </Canvas>
    </div>
  );
};

export default GameCard3D;
