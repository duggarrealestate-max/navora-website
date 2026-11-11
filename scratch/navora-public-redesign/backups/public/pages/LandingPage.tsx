import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
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
import { World3D } from '@public/components/three/World3D';
import { checkWebGL, checkReducedMotion } from '@public/hooks/useCapabilities';

function WebGLFallback(): JSX.Element {
  return (
    <div className="fixed inset-0 z-0 bg-graphite">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-graphite to-graphite" />
    </div>
  );
}

export default function LandingPage(): JSX.Element {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentZone, setCurrentZone] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setWebglAvailable(checkWebGL());
    setReducedMotion(checkReducedMotion());

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      {webglAvailable && (
        <div className="fixed inset-0 z-0">
          <SceneErrorBoundary
            fallback={
              <div className="fixed inset-0 z-0 bg-graphite">
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-graphite to-graphite" />
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 1.2, 5], fov: 50 }}
              dpr={[1, Math.min(window.devicePixelRatio, 2)]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <Suspense fallback={null}>
                <World3D
                  scrollProgress={scrollProgress}
                  mouse={mouse}
                  reducedMotion={reducedMotion}
                />
              </Suspense>
            </Canvas>
          </SceneErrorBoundary>
        </div>
      )}
      {!webglAvailable && <WebGLFallback />}

      <ScrollDirector
        onProgress={setScrollProgress}
        onZoneChange={setCurrentZone}
        reducedMotion={reducedMotion}
      />

      <div className="relative z-10">
        <HeroSection />

        <WebDesignZone />
        <AIZone />
        <AutomationZone />
        <CRMZone />
        <CommunicationZone />
        <DashboardZone />
        <ConnectedSystemZone />
        <FinalCTA />
      </div>

      <AnimatePresence>
        {currentZone > 0 && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal/70 backdrop-blur-xl border border-silver/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="text-[10px] font-semibold tracking-widest text-silver/60 uppercase">
              Zone {currentZone} / 8
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
