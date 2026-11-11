import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, MeshTransmissionMaterial, Plane, Ring, Box, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Avatar3D } from '@public/components/three/Avatar3D';
import { CameraRig } from '@public/components/three/CameraRig';

interface World3DProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
  reducedMotion: boolean;
}

function getAvatarPosition(progress: number): [number, number, number] {
  const points: { t: number; pos: [number, number, number] }[] = [
    { t: 0.0, pos: [0, -0.6, 2.0] },
    { t: 0.15, pos: [1.5, -0.6, -0.5] },
    { t: 0.3, pos: [-1.5, -0.6, -3.0] },
    { t: 0.45, pos: [1.5, -0.6, -5.5] },
    { t: 0.6, pos: [-1.5, -0.6, -8.0] },
    { t: 0.75, pos: [1.0, -0.6, -10.0] },
    { t: 0.9, pos: [0, -0.6, -11.5] },
    { t: 1.0, pos: [0, -0.6, -11.5] },
  ];

  const clamped = Math.max(0, Math.min(1, progress));

  if (clamped <= points[0].t) return points[0].pos;
  if (clamped >= points[points.length - 1].t) return points[points.length - 1].pos;

  for (let i = 0; i < points.length - 1; i++) {
    if (clamped >= points[i].t && clamped <= points[i + 1].t) {
      const localT = (clamped - points[i].t) / (points[i + 1].t - points[i].t);
      const smoothT = localT * localT * (3 - 2 * localT);
      return [
        points[i].pos[0] + (points[i + 1].pos[0] - points[i].pos[0]) * smoothT,
        points[i].pos[1] + (points[i + 1].pos[1] - points[i].pos[1]) * smoothT,
        points[i].pos[2] + (points[i + 1].pos[2] - points[i].pos[2]) * smoothT,
      ];
    }
  }

  return points[points.length - 1].pos;
}

function CentralPortal({ position }: { position: [number, number, number] }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!outerRef.current || !innerRef.current || !coreRef.current) return;
    const t = state.clock.getElapsedTime();
    outerRef.current.rotation.z = t * 0.05;
    innerRef.current.rotation.z = -t * 0.08;
    coreRef.current.rotation.z = t * 0.12;
    const pulse = 1 + Math.sin(t * 0.8) * 0.05;
    coreRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group position={position}>
      <Float speed={0.8} floatIntensity={0.1}>
        <Ring ref={outerRef} args={[2.2, 2.35, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#141417" metalness={0.9} roughness={0.2} transparent opacity={0.95} />
        </Ring>
      </Float>
      <Float speed={1} floatIntensity={0.15}>
        <Ring ref={innerRef} args={[1.85, 1.92, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.35} transparent opacity={0.5} />
        </Ring>
      </Float>
      <Float speed={1.2} floatIntensity={0.2}>
        <Ring ref={coreRef} args={[1.5, 1.55, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} transparent opacity={0.35} />
        </Ring>
      </Float>
      <Box args={[0.02, 6, 0.02]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.6} transparent opacity={0.4} />
      </Box>
      <Box args={[0.02, 6, 0.02]} position={[0.3, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.4} transparent opacity={0.25} />
      </Box>
    </group>
  );
}

function ArchitecturalPillar({ position, height = 5 }: { position: [number, number, number]; height?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.3 + position[0]) * 0.03;
  });
  return (
    <Float speed={0.7} floatIntensity={0.08}>
      <Box ref={ref} args={[0.06, height, 0.06]} position={position}>
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} transparent opacity={0.7} />
      </Box>
    </Float>
  );
}

function FloorLightStrip({ position, width = 3 }: { position: [number, number, number]; width?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.z = (state.clock.getElapsedTime() * 0.08) % 4;
  });
  return (
    <Plane ref={ref} args={[width, 0.03]} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} transparent opacity={0.5} />
    </Plane>
  );
}

function ParticleField() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.5 + Math.sin(t * 0.2 + i) * 0.5;
      dummy.current.position.set(
        Math.cos(angle + t * 0.02) * radius,
        0.5 + Math.sin(t * 0.3 + i * 0.5) * 0.8,
        Math.sin(angle + t * 0.02) * radius - 2
      );
      dummy.current.scale.setScalar(0.015);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.3} transparent opacity={0.4} />
    </instancedMesh>
  );
}

export function World3D({ scrollProgress, mouse, reducedMotion }: World3DProps): JSX.Element {
  const avatarPos = getAvatarPosition(scrollProgress);
  const nextPos = getAvatarPosition(Math.min(scrollProgress + 0.01, 1));
  const dx = nextPos[0] - avatarPos[0];
  const dz = nextPos[2] - avatarPos[2];
  const targetRotationY = Math.atan2(dx, dz);

  return (
    <>
      <CameraRig scrollProgress={scrollProgress} mouse={mouse} reducedMotion={reducedMotion} />
      <fog attach="fog" args={['#05070B', 3, 16]} />

      <Avatar3D
        position={[avatarPos[0], avatarPos[1], avatarPos[2]]}
        scale={0.9}
        scrollProgress={scrollProgress}
        targetRotationY={targetRotationY}
      />

      <CentralPortal position={[0, 0.2, -2.5]} />

      <Plane args={[40, 40]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, -4]}>
        <meshStandardMaterial color="#080B12" metalness={0.95} roughness={0.25} transparent opacity={0.95} />
      </Plane>

      <Float speed={0.6} floatIntensity={0.05}>
        <mesh position={[0, -1.66, -2.5]}>
          <cylinderGeometry args={[1.8, 2, 0.08, 64]} />
          <meshStandardMaterial color="#141417" metalness={0.8} roughness={0.3} transparent opacity={0.9} />
        </mesh>
      </Float>

      <FloorLightStrip position={[0, -1.68, 0]} width={4} />
      <FloorLightStrip position={[-2, -1.68, -1]} width={2.5} />
      <FloorLightStrip position={[2, -1.68, -1]} width={2.5} />
      <FloorLightStrip position={[0, -1.68, -3]} width={3.5} />

      <ArchitecturalPillar position={[-3.5, 0, -3]} height={5.5} />
      <ArchitecturalPillar position={[3.5, 0, -3]} height={5.5} />
      <ArchitecturalPillar position={[-2, 0, -5.5]} height={4} />
      <ArchitecturalPillar position={[2, 0, -5.5]} height={4} />

      <Box args={[12, 6, 0.05]} position={[0, 0.5, -9]}>
        <meshStandardMaterial color="#0D111A" metalness={0.6} roughness={0.4} transparent opacity={0.8} />
      </Box>
      <Box args={[6, 8, 0.05]} position={[-6, 1, -10]}>
        <meshStandardMaterial color="#0D111A" metalness={0.6} roughness={0.4} transparent opacity={0.7} />
      </Box>
      <Box args={[6, 5, 0.05]} position={[6, -0.5, -10]}>
        <meshStandardMaterial color="#0D111A" metalness={0.6} roughness={0.4} transparent opacity={0.7} />
      </Box>

      <Float speed={1.5} floatIntensity={0.2}>
        <Plane args={[1.2, 0.7]} position={[3, 1.2, -2]} rotation={[0, -0.4, 0]}>
          <MeshTransmissionMaterial backside samples={3} thickness={0.4} chromaticAberration={0.1} anisotropy={0.2} distortion={0.05} temporalDistortion={0.05} attenuationColor="#6366f1" attenuationDistance={0.6} color="#05070B" transparent opacity={0.25} />
        </Plane>
      </Float>
      <Float speed={1.5} floatIntensity={0.2}>
        <Plane args={[1, 0.6]} position={[-3, 0.9, -2]} rotation={[0, 0.35, 0]}>
          <MeshTransmissionMaterial backside samples={3} thickness={0.4} chromaticAberration={0.1} anisotropy={0.2} distortion={0.05} temporalDistortion={0.05} attenuationColor="#8b5cf6" attenuationDistance={0.6} color="#05070B" transparent opacity={0.25} />
        </Plane>
      </Float>

      <ParticleField />

      <ContactShadows position={[0, -1.69, 0]} opacity={0.2} scale={16} blur={3} far={6} color="#6366f1" />

      <Environment preset="city" />
    </>
  );
}
