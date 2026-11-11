import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
  reducedMotion: boolean;
}

export function CameraRig({ scrollProgress, mouse, reducedMotion }: CameraRigProps): JSX.Element {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    const progress = reducedMotion ? 0 : scrollProgress;
    const zone = Math.min(Math.floor(progress * 8), 7);
    const zoneProgress = (progress * 8) % 1;

    const positions: [number, number, number][] = [
      [0, 1.2, 6.0],
      [0, 1.4, 4.0],
      [0, 1.5, 2.0],
      [0, 1.4, 0.0],
      [0, 1.5, -2.0],
      [0, 1.4, -4.0],
      [0, 1.5, -5.0],
      [0, 2.5, -5.0],
    ];

    const lookAts: [number, number, number][] = [
      [0, 0, 0],
      [0, 0, -2.0],
      [0, 0, -4.0],
      [0, 0, -6.0],
      [0, 0, -8.0],
      [0, 0, -10.0],
      [0, 0, -11.0],
      [0, -1.0, -11.0],
    ];

    const from = new THREE.Vector3(...positions[zone]);
    const to = new THREE.Vector3(...positions[Math.min(zone + 1, 7)]);
    const lookFrom = new THREE.Vector3(...lookAts[zone]);
    const lookTo = new THREE.Vector3(...lookAts[Math.min(zone + 1, 7)]);

    targetPos.current.lerpVectors(from, to, zoneProgress);
    targetLookAt.current.lerpVectors(lookFrom, lookTo, zoneProgress);

    const parallaxX = reducedMotion ? 0 : mouse.x * 0.15;
    const parallaxY = reducedMotion ? 0 : mouse.y * 0.08;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos.current.x + parallaxX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos.current.y + parallaxY, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos.current.z, 0.03);
    camera.lookAt(targetLookAt.current);
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight position={[5, 6, 4]} angle={0.3} penumbra={1.2} intensity={1.0} color="#ffffff" />
      <spotLight position={[-4, 3, -2]} angle={0.4} penumbra={1} intensity={0.4} color="#6366f1" />
      <pointLight position={[0, 2.5, 2]} intensity={0.3} color="#06b6d4" distance={12} />
      <pointLight position={[-2, 1, -1]} intensity={0.15} color="#8b5cf6" distance={8} />
    </>
  );
}
