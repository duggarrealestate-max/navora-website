import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { World3D } from './World3D';
export default function HomeScene({scrollProgress,mouse,reducedMotion}:{scrollProgress:number;mouse:{x:number;y:number};reducedMotion:boolean}){
 return <Canvas camera={{position:[0,1.2,5],fov:50}} dpr={[1,Math.min(window.devicePixelRatio,2)]} frameloop={reducedMotion?'demand':'always'} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}><Suspense fallback={null}><World3D scrollProgress={scrollProgress} mouse={mouse} reducedMotion={reducedMotion}/></Suspense></Canvas>;
}
