'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useInView } from 'framer-motion'
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Environment,
} from '@react-three/drei'
import * as THREE from 'three'

// Animated ring that pulses - §4.1 gold accent
function PulsingRing({
  radius = 2,
  color = '#C9A84C',
}: {
  radius?: number
  color?: string
}) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      ringRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </mesh>
  )
}

// Floating icosahedron - golden gem per design.md color palette
function FloatingGem() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#C9A84C"
          metalness={0.9}
          roughness={0.1}
          emissive="#C9A84C"
          emissiveIntensity={0.3}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

// Morphing blob sphere - saffron accent per design.md
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[2.5, 0.5, -1]} scale={0.7}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#FF6B00"
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

// Orbiting particles - gold color only
function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null)
  const count = 50

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2 + Math.random() * 1.5
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#C9A84C"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// Energy beams - saffron/gold gradient
function EnergyBeam({
  start,
  end,
  color = '#FF6B00',
}: {
  start: THREE.Vector3
  end: THREE.Vector3
  color?: string
}) {
  const lineRef = useRef<THREE.Line>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([start, end])
    return geo
  }, [start, end])

  useFrame((state) => {
    if (
      lineRef.current &&
      lineRef.current.material instanceof THREE.LineBasicMaterial
    ) {
      lineRef.current.material.opacity =
        0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.5}
        linewidth={2}
      />
    </line>
  )
}

// Floating data cubes - gold edges
function DataCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = state.clock.elapsedTime * 0.5
      edgesRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#0A0A0F" transparent opacity={0.3} />
        </mesh>
        <lineSegments ref={edgesRef}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.3, 0.3, 0.3)]} />
          <lineBasicMaterial color="#C9A84C" transparent opacity={0.8} />
        </lineSegments>
      </group>
    </Float>
  )
}

// Mouse-following light - saffron glow
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = (state.pointer.x * viewport.width) / 2
      lightRef.current.position.y = (state.pointer.y * viewport.height) / 2
    }
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={0.5}
      color="#FF6B00"
      distance={8}
    />
  )
}

function Scene() {
  return (
    <>
      {/* Ambient lighting - warm tone */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#FFFFFF"
      />
      {/* Only saffron and gold point lights per design.md */}
      <pointLight position={[-5, 5, 5]} intensity={0.3} color="#FF6B00" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#C9A84C" />
      <MouseLight />

      {/* Main elements */}
      <group position={[1.5, 0, 0]}>
        <FloatingGem />
        <PulsingRing radius={1.8} color="#C9A84C" />
        <PulsingRing radius={2.2} color="#FF6B00" />
        <OrbitingParticles />
      </group>

      {/* Secondary elements */}
      <MorphingSphere />

      {/* Data cubes */}
      <DataCube position={[-2, 1, 0]} />
      <DataCube position={[-2.5, -0.5, 0.5]} />
      <DataCube position={[3.5, -1, 0]} />

      {/* Energy beams - both saffron/gold */}
      <EnergyBeam
        start={new THREE.Vector3(-3, -2, 0)}
        end={new THREE.Vector3(1.5, 0, 0)}
        color="#C9A84C"
      />
      <EnergyBeam
        start={new THREE.Vector3(4, 2, 0)}
        end={new THREE.Vector3(1.5, 0, 0)}
        color="#FF6B00"
      />

      {/* Sparkles - gold only */}
      <Sparkles
        count={100}
        scale={8}
        size={2}
        speed={0.4}
        color="#C9A84C"
        opacity={0.5}
      />

      {/* Environment */}
      <Environment preset="night" />

      {/* Fog - void black */}
      <fog attach="fog" args={['#0A0A0F', 5, 15]} />
    </>
  )
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        frameloop={isInView ? 'always' : 'demand'}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for better text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #0A0A0F, rgba(10,10,15,0.8), transparent)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #0A0A0F, transparent, rgba(10,10,15,0.5))',
        }}
      />
    </div>
  )
}
