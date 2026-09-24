import { motion } from "motion/react";
import { contentVariants } from "../../animations/animations";

export function AboutSummary({ customIndex = 4 }: { customIndex?: number }) {
  return (
    <motion.div
      custom={customIndex}
      variants={contentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="pt-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 space-y-3"
    >
      <p>
        I thrive on solving complex architecture challenges, optimizing state
        management, and ensuring seamless API integrations. Whether engineering
        cross-platform Flutter applications or building scalable web servers, I
        focus on writing clean, maintainable code and delivering exceptional
        user experiences.
      </p>
    </motion.div>
  );
}
