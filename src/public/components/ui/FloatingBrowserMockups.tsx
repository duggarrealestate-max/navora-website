import { motion } from 'framer-motion';

const mockups = [
  {
    title: 'REAL ESTATE',
    color: '#6366f1',
    lines: [
      { width: '55%', height: 5 },
      { width: '35%', height: 5 },
      { width: '70%', height: 5 },
    ],
    images: [
      { x: '8%', y: '32%', w: '40%', h: '50%' },
      { x: '52%', y: '32%', w: '40%', h: '50%' },
    ],
    badge: 'Featured',
  },
  {
    title: 'RESTAURANT',
    color: '#06b6d4',
    lines: [
      { width: '45%', height: 5 },
      { width: '65%', height: 5 },
      { width: '25%', height: 5 },
    ],
    images: [
      { x: '10%', y: '28%', w: '80%', h: '55%' },
    ],
    badge: 'Reservations',
  },
  {
    title: 'BUSINESS',
    color: '#8b5cf6',
    lines: [
      { width: '40%', height: 5 },
      { width: '50%', height: 5 },
      { width: '60%', height: 5 },
    ],
    images: [
      { x: '8%', y: '32%', w: '25%', h: '48%' },
      { x: '38%', y: '32%', w: '25%', h: '48%' },
      { x: '68%', y: '32%', w: '25%', h: '48%' },
    ],
    badge: 'Consulting',
  },
  {
    title: 'E-COMMERCE',
    color: '#10b981',
    lines: [
      { width: '50%', height: 5 },
      { width: '30%', height: 5 },
      { width: '70%', height: 5 },
    ],
    images: [
      { x: '6%', y: '28%', w: '25%', h: '55%' },
      { x: '36%', y: '28%', w: '25%', h: '55%' },
      { x: '66%', y: '28%', w: '25%', h: '55%' },
    ],
    badge: 'Shop',
  },
];

export function FloatingBrowserMockups(): JSX.Element {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-3 md:gap-5 z-10 pointer-events-none">
      {mockups.map((mockup, i) => (
        <motion.div
          key={mockup.title}
          className="relative w-24 md:w-36 aspect-[4/3] rounded-lg border border-silver/10 bg-charcoal/50 backdrop-blur-md overflow-hidden shadow-[0_0_25px_rgba(99,102,241,0.04)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            delay: 1.4 + i * 0.12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-4 bg-charcoal/70 border-b border-silver/10 flex items-center px-1.5 gap-1">
            <span className="w-1 h-1 rounded-full bg-silver/25" />
            <span className="w-1 h-1 rounded-full bg-silver/25" />
            <span className="w-1 h-1 rounded-full bg-silver/25" />
          </div>
          <div className="pt-5 px-2 pb-2">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[7px] md:text-[9px] font-semibold tracking-widest text-soft-white/75">
                {mockup.title}
              </p>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full border border-silver/15 text-silver/60">
                {mockup.badge}
              </span>
            </div>
            <div className="space-y-1">
              {mockup.lines.map((line, li) => (
                <div
                  key={li}
                  className="rounded-full bg-silver/8"
                  style={{ width: line.width, height: line.height }}
                />
              ))}
            </div>
            <div className="relative mt-1.5 h-10 md:h-14">
              {mockup.images.map((img, ii) => (
                <div
                  key={ii}
                  className="absolute rounded"
                  style={{
                    left: img.x,
                    top: img.y,
                    width: img.w,
                    height: img.h,
                    background: `linear-gradient(135deg, ${mockup.color}12, ${mockup.color}04)`,
                    border: `1px solid ${mockup.color}25`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
