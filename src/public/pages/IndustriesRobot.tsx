import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

type Props = { phase: number; activity: number; reduced: boolean; variant?: 'opening' | 'journey' | 'ending' };

class RobotBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <RobotFallback /> : this.props.children; }
}

function RobotFallback() {
  return <div className="ni-robot-fallback" aria-hidden="true"><i className="ni-robot-fallback-head" /><i className="ni-robot-fallback-body" /><i className="ni-robot-fallback-arm ni-robot-fallback-arm-left" /><i className="ni-robot-fallback-arm ni-robot-fallback-arm-right" /><i className="ni-robot-fallback-leg ni-robot-fallback-leg-left" /><i className="ni-robot-fallback-leg ni-robot-fallback-leg-right" /></div>;
}

function RobotModel({ phase, activity, reduced, variant = 'journey' }: Props) {
  const { scene, animations } = useGLTF('/models/robot-guide.glb');
  const model = useMemo(() => {
    const copy = clone(scene);
    copy.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      const next = materials.map(material => {
        const styled = material.clone() as THREE.MeshStandardMaterial;
        styled.color.set(object.name.includes('Head') || object.name.includes('Torso') ? '#303b4b' : '#8b9cad');
        styled.metalness = .32;
        styled.roughness = .44;
        styled.emissive.set('#243443');
        styled.emissiveIntensity = .2;
        return styled;
      });
      object.material = Array.isArray(object.material) ? next : next[0];
    });
    return copy;
  }, [scene]);
  useEffect(() => () => {
    model.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(material => material.dispose());
    });
  }, [model]);
  const root = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, root);
  const clip = reduced ? 'Idle' : variant === 'opening' ? 'Wave' : variant === 'ending' ? 'ThumbsUp' : ['Walking', 'Walking', 'Yes', 'Wave', 'ThumbsUp'][phase];
  useEffect(() => {
    const action = actions[clip] ?? actions.Idle;
    if (!action) return;
    action.reset().fadeIn(.3).play();
    action.paused = reduced;
    return () => { action.fadeOut(.3); };
  }, [actions, clip, reduced]);
  useFrame(({ clock }, delta) => {
    if (!root.current) return;
    const positions = variant === 'opening' ? [-.35, -.1, .1, .3, .2] : variant === 'ending' ? [.18, .18, .18, .18, .18] : [-.65, -.32, .12, .42, .2];
    const targetX = positions[phase] + (variant === 'journey' ? (activity % 2 ? .08 : -.08) : 0);
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, targetX, reduced ? 10 : 3.3, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, -1.42 + (!reduced && phase < 2 ? Math.sin(clock.elapsedTime * 3.5) * .035 : 0), 3, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, phase < 3 ? -.42 : .2, 3.5, delta);
  });
  return <group ref={root}><primitive object={model} scale={variant === 'ending' ? .64 : .7} dispose={null} /></group>;
}

export default function IndustriesRobot(props: Props) {
  const webgl = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2');
      const available = Boolean(context);
      context?.getExtension('WEBGL_lose_context')?.loseContext();
      return available;
    } catch { return false; }
  }, []);
  if (!webgl) return <RobotFallback />;
  return <RobotBoundary><Suspense fallback={<RobotFallback />}><Canvas camera={{ position: [0, 1.3, 5.8], fov: 42 }} dpr={[1, 1.5]} frameloop={props.reduced ? 'demand' : 'always'} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} fallback={<RobotFallback />}>
    <ambientLight intensity={1.6} /><hemisphereLight args={['#d9efff', '#28303e', 1.7]} /><spotLight position={[3, 5, 5]} intensity={35} color="#ffffff" /><pointLight position={[-2, 1, 2]} intensity={8} color="#06b6d4" /><pointLight position={[2, 1, 0]} intensity={4} color="#6366f1" />
    <RobotModel {...props} />
  </Canvas></Suspense></RobotBoundary>;
}
