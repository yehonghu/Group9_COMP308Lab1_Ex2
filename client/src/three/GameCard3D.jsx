import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

const CardObject = ({ title, rating, accent, pointer, hovered, setHovered }) => {
  const group = useRef()
  const edge = useRef()

  useFrame((state) => {
    if (!group.current) return
    const targetY = hovered ? 0.32 + pointer.x * 0.22 : pointer.x * 0.13
    const targetX = hovered ? -0.12 + pointer.y * 0.14 : pointer.y * 0.08
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.075)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.075)
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.15) * 0.06
    const scale = hovered ? 1.055 : 1
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08)
    if (edge.current) edge.current.rotation.z = state.clock.elapsedTime * 0.12
  })

  return (
    <group ref={group}>
      <Float speed={1.35} rotationIntensity={0.1} floatIntensity={0.2}>
        <RoundedBox
          args={[3.28, 1.95, 0.15]}
          radius={0.12}
          smoothness={5}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshStandardMaterial color="#262157" metalness={0.55} roughness={0.28} />
        </RoundedBox>
        <RoundedBox position={[0, 0, 0.084]} args={[3.08, 1.74, 0.025]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={accent} transparent opacity={0.21} metalness={0.4} roughness={0.35} emissive={accent} emissiveIntensity={0.12} />
        </RoundedBox>
        <mesh ref={edge} position={[0, 0, 0.105]} rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[0.44, 0.46, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={0.72} side={THREE.DoubleSide} />
        </mesh>
        <Text position={[0, 0.25, 0.115]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={2.45} textAlign="center">
          {title}
        </Text>
        <Text position={[0, -0.28, 0.115]} fontSize={0.115} color="#ded8ff" anchorX="center" anchorY="middle">
          {`LIBRARY RATING  ${rating.toFixed(1)} / 10`}
        </Text>
        <Text position={[-1.22, 0.67, 0.115]} fontSize={0.09} color={accent} anchorX="center" anchorY="middle">SIGNAL</Text>
      </Float>
    </group>
  )
}

export default function GameCard3D({ title, rating, accent = '#9e8cff' }) {
  const [hovered, setHovered] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  return (
    <div
      className="three-card-stage"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        setPointer({ x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2, y: -((event.clientY - bounds.top) / bounds.height - 0.5) * 2 })
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <Canvas camera={{ position: [0, 0, 4.15], fov: 44 }} dpr={[1, 1.7]}>
        <ambientLight intensity={0.95} />
        <pointLight position={[2.5, 3, 4]} intensity={2.1} color={accent} />
        <pointLight position={[-3, -2, 2]} intensity={1.1} color="#c8c1ff" />
        <CardObject title={title} rating={rating} accent={accent} pointer={pointer} hovered={hovered} setHovered={setHovered} />
      </Canvas>
    </div>
  )
}
