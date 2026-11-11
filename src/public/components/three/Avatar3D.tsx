import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import React, { Component, ErrorInfo, ReactNode } from 'react';

class AvatarErrorBoundary extends Component<{fallback: ReactNode, children: ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, _info: ErrorInfo) { console.error("Avatar GLB failed:", error); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

const EXTERNAL_GLB_PATH = '/models/robot-guide.glb';
const BASE_Y_ROTATION = 0;

interface Avatar3DProps {
  position?: [number, number, number];
  scale?: number;
  animationState?: 'idle' | 'walk' | 'look' | 'point' | 'gesture';
  scrollProgress?: number;
  _scrollProgress?: number;
  onReady?: () => void;
  targetRotationY?: number;
}

export function Avatar3D(props: Avatar3DProps): JSX.Element {
  const currentScroll = props.scrollProgress ?? props._scrollProgress ?? 0;
  const fallback = <ProceduralAvatar position={props.position || [0,0,0]} scale={props.scale || 1} scrollProgress={currentScroll} targetRotationY={props.targetRotationY} />;
  
  return (
    <AvatarErrorBoundary fallback={fallback}>
      <React.Suspense fallback={fallback}>
        <ExternalAvatar 
          position={props.position || [0,0,0]} 
          scale={props.scale || 1} 
          scrollProgress={currentScroll}
          targetRotationY={props.targetRotationY}
          onReady={props.onReady} 
        />
      </React.Suspense>
    </AvatarErrorBoundary>
  );
}

function ExternalAvatar({ position, scale, scrollProgress, targetRotationY, onReady }: {
  position: [number, number, number];
  scale: number;
  scrollProgress: number;
  targetRotationY?: number;
  onReady?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const orientationRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(EXTERNAL_GLB_PATH, true);
  const { actions, mixer } = useAnimations(animations, groupRef);

  const prevProgressRef = useRef(scrollProgress);
  const isMoving = Math.abs(scrollProgress - prevProgressRef.current) > 0.0005;
  prevProgressRef.current = scrollProgress;

    // Adjust materials to match dark futuristic palette
    useEffect(() => {
      if (!scene) return;
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (!mat) return;
          const name = mesh.name.toLowerCase();
          if (name.includes('shell') || name.includes('body') || name.includes('torso')) {
            mat.color = new THREE.Color('#11141a'); // primary dark graphite
            mat.roughness = 0.75;
            mat.metalness = 0.2;
          } else if (name.includes('joint') || name.includes('mechanical') || name.includes('leg') || name.includes('arm')) {
            mat.color = new THREE.Color('#5F6B7A'); // dark metallic silver
            mat.roughness = 0.45;
            mat.metalness = 0.6;
          } else if (name.includes('eye') || name.includes('face') || name.includes('light') || name.includes('chest')) {
            mat.color = new THREE.Color('#202733'); // secondary dark blue‑grey
            mat.emissive = new THREE.Color('#55E7FF'); // soft cyan
            mat.emissiveIntensity = 0.4;
            mat.roughness = 0.6;
            mat.metalness = 0.25;
          } else if (name.includes('accent') || name.includes('detail')) {
            mat.color = new THREE.Color('#7C5CFF'); // violet accent
          }
        }
      });
      // Ensure emissive parts are visible
      onReady?.();
    }, [scene]);

  // Normalize scale and position based on RobotExpressive
  // The RobotExpressive model is quite small, scale it up to match procedural
  const normalizedScale = scale * 0.35; 
  const yOffset = -0.55; 

  const zone = Math.min(7, Math.floor(scrollProgress * 8));

  let activeAnimation = 'Idle';
  if (isMoving) {
    activeAnimation = 'Walking';
  } else {
    switch(zone) {
      case 0: activeAnimation = 'Idle'; break;
      case 1: activeAnimation = 'Idle'; break; // ATTRACT: look
      case 2: activeAnimation = 'Wave'; break; // ENGAGE: friendly wave
      case 3: activeAnimation = 'Yes'; break; // CONVERT: gesture yes
      case 4: activeAnimation = 'Walking'; break; // DELIVER: walk alongside
      case 5: activeAnimation = 'ThumbsUp'; break; // RETAIN: friendly gesture
      case 6: activeAnimation = 'Dance'; break; // GROW: stand/gesture (celebrate)
      case 7: activeAnimation = 'Idle'; break; // FINAL: idle
    }
  }

  // Crossfade animations
  useEffect(() => {
    if (!mixer || !actions || !actions[activeAnimation]) return;
    const clip = actions[activeAnimation];
    
    // Fade out others
    Object.values(actions).forEach((action) => {
      if (action && action !== clip) {
        action.fadeOut(0.3);
      }
    });

    // Fade in new
    clip?.reset().fadeIn(0.3).play();
  }, [activeAnimation, actions, mixer]);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
    if (!groupRef.current) return;
    
    // Set movement root position
    if (groupRef.current) {
      groupRef.current.position.set(position[0], position[1] + yOffset, position[2]);
    }
    // Apply orientation (base + target yaw) to orientation root
    if (orientationRef.current) {
      const desiredY = (targetRotationY ?? 0) + BASE_Y_ROTATION;
      orientationRef.current.rotation.y = THREE.MathUtils.lerp(orientationRef.current.rotation.y, desiredY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={orientationRef}>
        <primitive object={scene} scale={normalizedScale} />
      </group>
    </group>
  );
}

useGLTF.preload(EXTERNAL_GLB_PATH);

function ProceduralAvatar({ position, scale, scrollProgress, targetRotationY }: { position: [number, number, number]; scale: number; scrollProgress: number; targetRotationY?: number; }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmUpperRef = useRef<THREE.Mesh>(null);
  const rightArmUpperRef = useRef<THREE.Mesh>(null);
  const leftArmLowerRef = useRef<THREE.Mesh>(null);
  const rightArmLowerRef = useRef<THREE.Mesh>(null);
  const leftLegUpperRef = useRef<THREE.Mesh>(null);
  const rightLegUpperRef = useRef<THREE.Mesh>(null);
  const leftLegLowerRef = useRef<THREE.Mesh>(null);
  const rightLegLowerRef = useRef<THREE.Mesh>(null);

  const prevProgressRef = useRef(scrollProgress);
  const isMoving = Math.abs(scrollProgress - prevProgressRef.current) > 0.0005;
  prevProgressRef.current = scrollProgress;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const effectiveState = isMoving ? 'walk' : 'idle';

    if (effectiveState === 'idle') {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.03;
      if (targetRotationY !== undefined) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.02);
      } else {
        groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.06;
      }
      if (headRef.current) headRef.current.rotation.y = Math.sin(t * 0.25) * 0.04;
      if (leftArmUpperRef.current) leftArmUpperRef.current.rotation.x = Math.sin(t * 0.4) * 0.03;
      if (rightArmUpperRef.current) rightArmUpperRef.current.rotation.x = Math.cos(t * 0.4) * 0.03;
      if (leftArmLowerRef.current) leftArmLowerRef.current.rotation.x = 0;
      if (rightArmLowerRef.current) rightArmLowerRef.current.rotation.x = 0;
      if (leftLegUpperRef.current) leftLegUpperRef.current.rotation.x = 0;
      if (rightLegUpperRef.current) rightLegUpperRef.current.rotation.x = 0;
      if (leftLegLowerRef.current) leftLegLowerRef.current.rotation.x = 0;
      if (rightLegLowerRef.current) rightLegLowerRef.current.rotation.x = 0;
    } else if (effectiveState === 'walk') {
      const speed = 2.5 + Math.abs(scrollProgress) * 1.5;
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * speed)) * 0.06;
      if (targetRotationY !== undefined) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      }
      if (leftArmUpperRef.current) leftArmUpperRef.current.rotation.x = Math.sin(t * speed) * 0.25;
      if (rightArmUpperRef.current) rightArmUpperRef.current.rotation.x = -Math.sin(t * speed) * 0.25;
      if (leftArmLowerRef.current) leftArmLowerRef.current.rotation.x = Math.sin(t * speed) * 0.35;
      if (rightArmLowerRef.current) rightArmLowerRef.current.rotation.x = -Math.sin(t * speed) * 0.35;
      if (leftLegUpperRef.current) leftLegUpperRef.current.rotation.x = -Math.sin(t * speed) * 0.25;
      if (rightLegUpperRef.current) rightLegUpperRef.current.rotation.x = Math.sin(t * speed) * 0.25;
      if (leftLegLowerRef.current) leftLegLowerRef.current.rotation.x = -Math.sin(t * speed) * 0.3;
      if (rightLegLowerRef.current) rightLegLowerRef.current.rotation.x = Math.sin(t * speed) * 0.3;
    }
  });

  const shellMaterial = <meshStandardMaterial color="#1a1a1f" metalness={0.7} roughness={0.3} />;
  const jointMaterial = <meshStandardMaterial color="#0f0f12" metalness={0.9} roughness={0.5} />;
  const faceMaterial = <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />;
  const accentMaterial = <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} />;

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.52, 0]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        {shellMaterial}
        {/* Visor */}
        <mesh position={[0, 0.02, 0.14]}>
          <boxGeometry args={[0.2, 0.08, 0.05]} />
          {faceMaterial}
        </mesh>
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.14, 16]} />
        {jointMaterial}
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.3, 0.55, 0.2]} />
        {shellMaterial}
        {/* Chest Panel */}
        <mesh position={[0, 0.1, 0.1]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          {jointMaterial}
        </mesh>
        {/* Accent */}
        <mesh position={[0, 0.1, 0.11]}>
          <boxGeometry args={[0.02, 0.08, 0.01]} />
          {accentMaterial}
        </mesh>
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.22, 1.15, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        {jointMaterial}
      </mesh>
      <mesh position={[0.22, 1.15, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        {jointMaterial}
      </mesh>

      {/* Upper arms */}
      <mesh ref={leftArmUpperRef} position={[-0.28, 0.52, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        {shellMaterial}
      </mesh>
      <mesh ref={rightArmUpperRef} position={[0.28, 0.52, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        {shellMaterial}
      </mesh>

      {/* Elbow joints */}
      <mesh position={[-0.32, 0.35, 0.02]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        {jointMaterial}
      </mesh>
      <mesh position={[0.32, 0.35, 0.02]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        {jointMaterial}
      </mesh>

      {/* Forearms */}
      <mesh ref={leftArmLowerRef} position={[-0.3, 0.18, 0.05]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.07, 0.35, 0.07]} />
        {shellMaterial}
      </mesh>
      <mesh ref={rightArmLowerRef} position={[0.3, 0.18, 0.05]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.07, 0.35, 0.07]} />
        {shellMaterial}
      </mesh>

      {/* Hands */}
      <mesh position={[-0.32, -0.05, 0.08]}>
        <boxGeometry args={[0.06, 0.08, 0.06]} />
        {jointMaterial}
      </mesh>
      <mesh position={[0.32, -0.05, 0.08]}>
        <boxGeometry args={[0.06, 0.08, 0.06]} />
        {jointMaterial}
      </mesh>

      {/* Hips */}
      <mesh position={[-0.12, 0.65, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        {jointMaterial}
      </mesh>
      <mesh position={[0.12, 0.65, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        {jointMaterial}
      </mesh>

      {/* Upper legs / thighs */}
      <mesh ref={leftLegUpperRef} position={[-0.12, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        {shellMaterial}
      </mesh>
      <mesh ref={rightLegUpperRef} position={[0.12, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        {shellMaterial}
      </mesh>

      {/* Knee joints */}
      <mesh position={[-0.12, -0.22, 0.02]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        {jointMaterial}
      </mesh>
      <mesh position={[0.12, -0.22, 0.02]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        {jointMaterial}
      </mesh>

      {/* Lower legs / shins */}
      <mesh ref={leftLegLowerRef} position={[-0.12, -0.45, 0.02]}>
        <boxGeometry args={[0.09, 0.45, 0.09]} />
        {shellMaterial}
      </mesh>
      <mesh ref={rightLegLowerRef} position={[0.12, -0.45, 0.02]}>
        <boxGeometry args={[0.09, 0.45, 0.09]} />
        {shellMaterial}
      </mesh>

      {/* Feet */}
      <mesh position={[-0.12, -0.72, 0.05]}>
        <boxGeometry args={[0.1, 0.08, 0.16]} />
        {jointMaterial}
      </mesh>
      <mesh position={[0.12, -0.72, 0.05]}>
        <boxGeometry args={[0.1, 0.08, 0.16]} />
        {jointMaterial}
      </mesh>
    </group>
  );
}

