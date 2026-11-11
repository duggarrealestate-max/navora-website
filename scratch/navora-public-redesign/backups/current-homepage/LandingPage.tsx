import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { ScrollDirector } from '@public/components/ScrollDirector';
import { SceneErrorBoundary } from '@public/components/SceneErrorBoundary';
import { HeroSection } from '@public/components/sections/HeroSection';
import { WebDesignZone } from '@public/components/sections/WebDesignZone';
import { AIZone } from '@public/components/sections/AIZone';
import { AutomationZone } from '@public/components/sections/AutomationZone';
import { CRMZone } from '@public/components/sections/CRMZone';
import { CommunicationZone } from '@public/components/sections/CommunicationZone';
import { DashboardZone } from '@public/components/sections/DashboardZone';
import { ConnectedSystemZone } from '@public/components/sections/ConnectedSystemZone';
import { FinalCTA } from '@public/components/sections/FinalCTA';
import { checkWebGL, checkReducedMotion } from '@public/hooks/useCapabilities';
const HomeScene=lazy(()=>import('@public/components/three/HomeScene'));
export default function LandingPage(){
 const [scrollProgress,setScrollProgress]=useState(0);const [currentZone,setCurrentZone]=useState(0);const [mouse,setMouse]=useState({x:0,y:0});const [webglAvailable]=useState(checkWebGL);const [reducedMotion,setReducedMotion]=useState(checkReducedMotion);
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const change=(e:MediaQueryListEvent)=>setReducedMotion(e.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change);},[]);
 const handleMouseMove=useCallback((e:MouseEvent)=>setMouse({x:(e.clientX/window.innerWidth)*2-1,y:-(e.clientY/window.innerHeight)*2+1}),[]);
 useEffect(()=>{if(reducedMotion)return;window.addEventListener('mousemove',handleMouseMove,{passive:true});return()=>window.removeEventListener('mousemove',handleMouseMove);},[handleMouseMove,reducedMotion]);
 return <><div className="nv-home-scene" aria-hidden="true">{webglAvailable?<SceneErrorBoundary fallback={<div className="nv-scene-fallback"/>}><Suspense fallback={<div className="nv-scene-fallback"/>}><HomeScene scrollProgress={scrollProgress} mouse={mouse} reducedMotion={reducedMotion}/></Suspense></SceneErrorBoundary>:<div className="nv-scene-fallback"/>}</div><ScrollDirector onProgress={setScrollProgress} onZoneChange={setCurrentZone} reducedMotion={reducedMotion}/><div className="nv-home-content"><HeroSection/><WebDesignZone/><AIZone/><AutomationZone/><CRMZone/><CommunicationZone/><DashboardZone/><ConnectedSystemZone/><FinalCTA/></div>{currentZone>0&&<div className="nv-zone-indicator">FOLLOW THE WORK · {currentZone} / 8</div>}</>;
}
