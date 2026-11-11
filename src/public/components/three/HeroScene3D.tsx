import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  Sphere,
  Box,
  Plane,
  Ring,
} from '@react-three/drei';
import * as THREE from 'three';

function AbstractHuman({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1 + mouse.x * 0.3;
    groupRef.current.rotation.x = mouse.y * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -0.6, 0]}>
        <Box args={[0.55, 1.6, 0.35]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#1a1a1f" metalness={0.6} roughness={0.3} />
        </Box>
        <Sphere args={[0.28, 32, 32]} position={[0, 1.65, 0]}>
          <meshStandardMaterial color="#1a1a1f" metalness={0.5} roughness={0.4} />
        </Sphere>
        <Box args={[0.18, 0.9, 0.18]} position={[-0.22, -0.1, 0]}>
          <meshStandardMaterial color="#141417" metalness={0.5} roughness={0.4} />
        </Box>
        <Box args={[0.18, 0.9, 0.18]} position={[0.22, -0.1, 0]}>
          <meshStandardMaterial color="#141417" metalness={0.5} roughness={0.4} />
        </Box>
        <Ring args={[0.4, 0.55, 64]} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.4} transparent opacity={0.3} />
        </Ring>
      </group>
    </Float>
  );
}

function ArchitecturalPanel({
  position,
  rotation,
  scale = [4, 3, 0.05],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = (rotation?.[2] || 0) + Math.sin(t * 0.15) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <Box ref={ref} args={scale} position={position} rotation={rotation}>
        <meshStandardMaterial
          color="#141417"
          metalness={0.7}
          roughness={0.25}
          transparent
          opacity={0.85}
        />
      </Box>
    </Float>
  );
}

function GlowingRing({ position, radius = 1.2 }: { position: [number, number, number]; radius?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
    ref.current.rotation.z = Math.cos(t * 0.25) * 0.1;
  });

  return (
    <Float speed={1} floatIntensity={0.2}>
      <Ring ref={ref} args={[radius, radius + 0.03, 64]} position={position}>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          transparent
          opacity={0.25}
        />
      </Ring>
    </Float>
  );
}

function HolographicScreen({
  position,
  rotation,
  width = 2,
  height = 1.2,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.03;
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.08;
  });

  return (
    <Float speed={2} floatIntensity={0.4}>
      <Plane ref={ref} args={[width, height]} position={position} rotation={rotation}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.2}
          anisotropy={0.3}
          distortion={0.1}
          temporalDistortion={0.1}
          attenuationColor="#6366f1"
          attenuationDistance={0.5}
          color="#0a0a0d"
          transparent
          opacity={0.35}
        />
      </Plane>
    </Float>
  );
}

function FloorGrid() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.z = (state.clock.getElapsedTime() * 0.2) % 2;
  });

  return (
    <Plane ref={ref} args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, -2]}>
      <meshStandardMaterial color="#0a0a0d" metalness={0.8} roughness={0.4} transparent opacity={0.9} />
    </Plane>
  );
}

function CameraRig({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_state) => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.6, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.3 + 0.4, 0.05);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * 0.15, 0.05);
  });

  return (
    <group ref={ref}>
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 6, 4]} angle={0.4} penumbra={1} intensity={1.2} color="#ffffff" />
      <spotLight position={[-4, 3, -2]} angle={0.5} penumbra={1} intensity={0.6} color="#6366f1" />
      <pointLight position={[0, 2, 2]} intensity={0.4} color="#06b6d4" distance={10} />
    </group>
  );
}

interface HeroScene3DProps {
  mouse: { x: number; y: number };
}

export function HeroScene3D({ mouse }: HeroScene3DProps): JSX.Element {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraRig mouse={mouse} />
        <fog attach="fog" args={['#0a0a0d', 4, 14]} />

        <AbstractHuman mouse={mouse} />

        <ArchitecturalPanel position={[-2.8, 0.4, -2]} rotation={[0, 0.4, 0.1]} scale={[2.2, 2.8, 0.04]} />
        <ArchitecturalPanel position={[2.8, -0.2, -1.8]} rotation={[0, -0.3, -0.08]} scale={[2, 2.4, 0.04]} />
        <ArchitecturalPanel position={[0, 2.2, -3]} rotation={[0.2, 0, 0]} scale={[5, 1.2, 0.04]} />

        <GlowingRing position={[0, -1.2, -1]} radius={1.4} />
        <GlowingRing position={[1.2, 0.2, -0.8]} radius={0.8} />
        <GlowingRing position={[-1, -0.4, -1.2]} radius={1} />

        <HolographicScreen position={[2.6, 1.2, -1]} rotation={[0, -0.4, 0]} width={1.4} height={0.8} />
        <HolographicScreen position={[-2.4, 0.8, -0.9]} rotation={[0, 0.35, 0]} width={1.2} height={0.7} />

        <FloorGrid />

        <ContactShadows position={[0, -1.59, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#6366f1" />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
