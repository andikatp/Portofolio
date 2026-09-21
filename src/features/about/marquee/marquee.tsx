import { motion } from "framer-motion";
import React from "react";

const ITEMS = [
  "Based in Bandung, Indonesia",
  "Open for fulltime job anywhere",
  "3+ years of experiences",
  "Flutter & Fullstack Developer",
];

export function AboutMarquee() {
  // Multiply items to guarantee full screen coverage on any resolution (up to 4K+)
  const REPEATED = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-amber-400 text-slate-950 py-3 shadow-md select-none font-semibold text-sm sm:text-base tracking-wider">
      <motion.div
        className="flex w-max shrink-0 items-center space-x-6 pr-6 transform-gpu will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 35,
          ease: "linear",
        }}
      >
        {/* First set of items */}
        {REPEATED.map((item, index) => (
          <React.Fragment key={`original-${index}`}>
            <span className="text-sm whitespace-nowrap">{item}</span>
            <span className="text-xl opacity-70">•</span>
          </React.Fragment>
        ))}
        {/* Duplicated set of items for seamless loop */}
        {REPEATED.map((item, index) => (
          <React.Fragment key={`duplicate-${index}`}>
            <span className="text-sm whitespace-nowrap">{item}</span>
            <span className="text-xl opacity-70">•</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default AboutMarquee;
