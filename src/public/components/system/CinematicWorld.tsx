import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, RoundedBox, useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

export interface WorldProps { phase: number; scene: number; scenario: number; mobile: boolean; reduced: boolean; active: boolean; pointer: React.MutableRefObject<{x:number;y:number}>; }
const colours = ['#06b6d4', '#8b5cf6', '#10b981'];
const positions: [number,number,number][] = [[-2.1,1.1,.3],[1.8,1.55,-.4],[2.1,-.25,.4],[-1.7,-.5,.4],[.8,2.0,-.7],[-.8,1.95,-.7],[2.35,.7,1]];
const connectedObjects=[[0,1,3,5],[2,3,4],[0,1,5],[0,3,5],[0,3,4],[0,2,3]];

function Robot({phase,reduced}: {phase:number;reduced:boolean}) {
  const { scene, animations } = useGLTF('/models/robot-guide.glb');
  const model = useMemo(() => {
    const copy = clone(scene);
    copy.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      const clonedMaterials = materials.map(material => {
        const next = material.clone() as THREE.MeshStandardMaterial;
        next.color.set(object.name.includes('Head') || object.name.includes('Torso') ? '#374151' : '#94a3b8');
        next.metalness = .25; next.roughness = .45;
        next.emissive.set('#202733'); next.emissiveIntensity = .18;
        return next;
      });
      object.material = Array.isArray(object.material) ? clonedMaterials : clonedMaterials[0];
    });
    return copy;
  }, [scene]);
  useEffect(()=>()=>{model.traverse(object=>{if(object instanceof THREE.Mesh){const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>material.dispose());}});},[model]);
  const scale = .6;
  const root = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, root);
  const clip = reduced ? 'Idle' : ['Wave','Yes','Walking','Walking','Yes','No','ThumbsUp'][phase];
  useEffect(() => {
    const action = actions[clip];
    if (!action) return;
    if(reduced) action.reset().setEffectiveWeight(1).play();
    else action.reset().fadeIn(.4).play();
    action.paused = reduced;
    return () => { action.fadeOut(.4); };
  }, [actions,clip,reduced]);
  useFrame(({clock},delta) => {
    if (!root.current) return;
    if(reduced){root.current.position.set(0,-1.35,0);root.current.rotation.y=0;return;}
    const t = reduced ? 0 : clock.elapsedTime;
    const route = [-.45,-.7,0,.5,.65,-.35,0][phase];
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x,route + (phase===3&&!reduced?Math.sin(t*.8)*.35:0),3,delta);
    root.current.position.y = -1.35;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y,phase===5?-.3:phase===2||phase===3?.35:0,3,delta);
  });
  return <group ref={root}><primitive object={model} scale={scale} dispose={null} /></group>;
}

function BusinessObject({index,phase,reduced}: {index:number;phase:number;reduced:boolean}) {
  const group = useRef<THREE.Group>(null);
  const colour = index===6 ? colours[1] : phase===6 ? colours[2] : colours[0];
  const material = <meshStandardMaterial color="#0f1117" metalness={.8} roughness={.24} emissive={colour} emissiveIntensity={phase>=2?.22:.08} transparent opacity={.9} />;
  useFrame(({clock},delta) => {
    if(!group.current||reduced)return;
    const base=positions[index];
    group.current.position.y=THREE.MathUtils.damp(group.current.position.y,base[1]+Math.sin(clock.elapsedTime*.8+index)*.07,3,delta);
    group.current.rotation.y=Math.sin(clock.elapsedTime*.35+index)*.12;
  });
  return <group ref={group} position={positions[index]} rotation={[.05,-.15,0]}>
    {index===2 ? <><RoundedBox args={[.6,.55,.5]} radius={.05}>{material}</RoundedBox><mesh position={[0,.01,.26]}><boxGeometry args={[.07,.55,.02]}/><meshStandardMaterial color={colour} emissive={colour} emissiveIntensity={.7}/></mesh></> : index===3 ? <>{[0,.13,.26].map(y=><mesh key={y} position={[0,y,0]}><cylinderGeometry args={[.33,.33,.1,32]}/>{material}</mesh>)}<Line points={[[-.3,.31,0],[.3,.31,0]]} color={colour} lineWidth={2}/></> : index===4 ? <><mesh><torusGeometry args={[.27,.065,12,32]}/>{material}</mesh><Line points={[[0,-.16,.1],[0,.16,.1]]} color={colour} lineWidth={2}/></> : <><RoundedBox args={[.7,.5,.09]} radius={.045}>{material}</RoundedBox>{index===0 ? <Line points={[[-.3,.18,.06],[0,-.03,.06],[.3,.18,.06]]} color={colour} lineWidth={2}/> : index===1 ? <><Line points={[[-.29,.1,.06],[.29,.1,.06]]} color={colour} lineWidth={2}/>{[-.15,0,.15].map(x=><mesh key={x} position={[x,-.08,.06]}><boxGeometry args={[.065,.065,.015]}/><meshBasicMaterial color={colour}/></mesh>)}</> : <><mesh position={[0,.06,.08]}><sphereGeometry args={[.085,16,12]}/><meshStandardMaterial color={colour} emissive={colour} emissiveIntensity={.5}/></mesh><Line points={[[-.15,-.16,.08],[-.12,-.06,.08],[.12,-.06,.08],[.15,-.16,.08]]} color={colour} lineWidth={2}/></>}</>}
  </group>;
}

function Signal({index,phase,reduced}: {index:number;phase:number;reduced:boolean}) {
  const packet = useRef<THREE.Mesh>(null);
  const destination = new THREE.Vector3(...positions[index]);
  const start = new THREE.Vector3(0,.15,0);
  const bend = new THREE.Vector3(destination.x*.55,destination.y+.5,.5);
  const curve = new THREE.QuadraticBezierCurve3(start,bend,destination);
  const colour=index===6?'#8b5cf6':phase===6?'#10b981':'#06b6d4';
  useFrame(({clock})=>{if(!packet.current||reduced)return;const p=(clock.elapsedTime*.3+index*.16)%1;packet.current.position.copy(curve.getPoint(phase===0?1-p:p));});
  return <><Line points={curve.getPoints(32)} color={colour} transparent opacity={phase>=2?.5:.18} lineWidth={1}/><mesh ref={packet} visible={!reduced}><sphereGeometry args={[.035,8,8]}/><meshBasicMaterial color={colour}/></mesh></>;
}

function World(props: WorldProps) {
  const {phase,scene,scenario,mobile,reduced,pointer}=props;
  const rings=useRef<THREE.Group>(null);
  const {camera}=useThree();
  useFrame(({clock},delta)=>{
    if(reduced){camera.position.x=0;camera.position.y=1.8;camera.lookAt(0,.3,0);return;}
    const x=reduced||mobile?0:pointer.current.x*.15;
    const y=reduced||mobile?0:pointer.current.y*.08;
    camera.position.x=THREE.MathUtils.damp(camera.position.x,x+(scene===4?.22:0),3,delta);
    camera.position.y=THREE.MathUtils.damp(camera.position.y,1.8+y+(scene===5?.4:0),3,delta);
    camera.lookAt(0,.3,0);
    if(rings.current&&!reduced)rings.current.rotation.y=clock.elapsedTime*.06;
  });
  return <>
    <hemisphereLight args={['#f0f4ff','#374151',1.8]}/>
    <ambientLight intensity={.8}/><spotLight position={[5,6,4]} angle={.4} penumbra={1.2} intensity={45} color="#ffffff"/><spotLight position={[-4,3,-2]} angle={.5} penumbra={1} intensity={25} color="#6366f1"/><pointLight position={[0,2.5,2]} intensity={5} color="#06b6d4"/>
    <Robot phase={phase} reduced={reduced}/>
    <group ref={rings} position={[0,-1.4,0]}>{[1.5,1.9,2.3].map((radius,i)=><mesh key={radius} rotation={[-Math.PI/2,0,0]} position={[0,i*.015,0]}><torusGeometry args={[radius,.015,8,80]}/><meshBasicMaterial color={phase===5?'#8b5cf6':phase===6?'#10b981':'#06b6d4'} transparent opacity={.65-i*.15}/></mesh>)}</group>
    <mesh position={[0,-1.48,0]}><cylinderGeometry args={[1.48,1.65,.14,64]}/><meshStandardMaterial color="#141417" metalness={.9} roughness={.2}/></mesh>
    {(mobile?connectedObjects[scenario].filter(index=>phase!==5||index!==2).slice(0,phase===5?2:3):connectedObjects[scenario]).map(index=><group key={index}><BusinessObject index={index} phase={phase} reduced={reduced}/><Signal index={index} phase={phase} reduced={reduced}/></group>)}
    {phase===5&&<group><BusinessObject index={6} phase={phase} reduced={reduced}/><Signal index={6} phase={phase} reduced={reduced}/></group>}
    {[-3.3,3.3].map(x=><mesh key={x} position={[x,.7,-2.3]}><boxGeometry args={[.025,6,.025]}/><meshBasicMaterial color="#6366f1" transparent opacity={.45}/></mesh>)}
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.58,0]}><planeGeometry args={[20,20]}/><meshStandardMaterial color="#080B12" metalness={.8} roughness={.38}/></mesh>
    <fog attach="fog" args={['#05070B',9,18]}/>
  </>;
}
export default function CinematicWorld(props: WorldProps) {
  return <Canvas camera={{position:[0,1.8,props.mobile?9.8:8.6],fov:40}} dpr={props.mobile?1:[1,1.5]} frameloop={props.reduced||!props.active?'demand':'always'} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}><World {...props}/></Canvas>;
}
