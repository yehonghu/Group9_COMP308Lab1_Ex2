// Three.js Animated Background Component
// Creates a visually appealing 3D particle system as the page background
// Uses @react-three/fiber and @react-three/drei for React integration

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a sphere
const generateSpherePoints = (count, radius) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

// Animated particle system
const ParticleField = ({ count = 3000, color = '#6366f1' }) => {
  const pointsRef = useRef();
  const positions = useMemo(() => generateSpherePoints(count, 5), [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

// Floating geometric shapes
const FloatingShape = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.3, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
};

// Main animated background component
const AnimatedBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Particle field */}
        <ParticleField count={3000} color="#6366f1" />
        <ParticleField count={1500} color="#a78bfa" />

        {/* Floating shapes */}
        <FloatingShape position={[-3, 1, -2]} color="#818cf8" speed={0.8} />
        <FloatingShape position={[3, -1, -3]} color="#c084fc" speed={1.2} />
        <FloatingShape position={[0, 2, -4]} color="#67e8f9" speed={0.6} />
        <FloatingShape position={[-2, -2, -2]} color="#f472b6" speed={1.0} />
        <FloatingShape position={[2, 0, -1]} color="#34d399" speed={0.9} />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
