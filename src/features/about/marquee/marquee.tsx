import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import React, { useEffect, useRef } from "react";

const ITEMS = [
  "Based in Bandung, Indonesia",
  "Open for fulltime job anywhere",
  "3+ years of experiences",
  "Fullstack Developer",
];

const TRACK_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export function AboutMarquee() {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const singleWidthRef = useRef<number>(0);

  const speed = 0.8;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        singleWidthRef.current = containerRef.current.scrollWidth / 4;
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useAnimationFrame((_, delta) => {
    const moveBy = speed * (delta / 16);
    let currentX = baseX.get() - moveBy;

    const singleWidth = singleWidthRef.current;
    if (singleWidth > 0 && Math.abs(currentX) >= singleWidth) {
      currentX = currentX + singleWidth;
    }

    baseX.set(currentX);
  });

  return (
    <div className="relative w-full overflow-hidden bg-amber-400 text-slate-950 py-3 shadow-md select-none font-semibold text-sm sm:text-base tracking-wider">
      <motion.div
        ref={containerRef}
        style={{ x: baseX }}
        className="flex w-max shrink-0 items-center space-x-6 pr-6 transform-gpu will-change-transform"
      >
        {TRACK_ITEMS.map((item, index) => (
          <React.Fragment key={`about-item-${index}`}>
            <span className="text-sm whitespace-nowrap">{item}</span>
            <span className="text-xl opacity-70">•</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default AboutMarquee;
