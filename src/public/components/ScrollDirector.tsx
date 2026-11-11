import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollDirectorProps {
  onProgress: (progress: number) => void;
  onZoneChange: (zone: number) => void;
  reducedMotion: boolean;
}

export function ScrollDirector({ onProgress, onZoneChange, reducedMotion }: ScrollDirectorProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    if (reducedMotion) {
      onProgress(0);
      onZoneChange(0);
      return;
    }

    // Query the real scroll‑zone elements that exist anywhere in the document.
    const sections = document.querySelectorAll<HTMLElement>('[data-scroll-zone]');
    if (sections.length === 0) return;

    // Use the first and last zones as the trigger range.
    const first = sections[0];
    const last = sections[sections.length - 1];

    const trigger = ScrollTrigger.create({
      trigger: first,
      start: 'top top',
      endTrigger: last,
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
          const progress = self.progress;
          onProgress(progress);
          const zone = Math.min(Math.floor(progress * sections.length), sections.length - 1);
          onZoneChange(zone);
        },
    });

    return () => {
      trigger.kill();
    };
  }, [onProgress, onZoneChange, reducedMotion]);

  return <div ref={containerRef} aria-hidden="true" />;
}
