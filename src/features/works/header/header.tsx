import { motion } from "framer-motion";
import { useState } from "react";
import { usePageTransition } from "../../../context";
import {
  workHeaderContainerVariants,
  workHeaderTaglineVariants,
  workHeaderWordVariants,
} from "../animations/work-animations";

const HEADER_TEXT =
  "Selected projects in mobile development, web apps, and enterprise systems.";

export function WorkHeader() {
  const { phase, isLoading } = usePageTransition();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (!isLoading && phase === "idle" && !hasAnimated) {
    setHasAnimated(true);
  }

  const shouldAnimate = hasAnimated || (!isLoading && phase === "idle");
  const animateState = shouldAnimate ? "visible" : "hidden";
  const words = HEADER_TEXT.split(" ");

  return (
    <div className="flex flex-col space-y-1.5 sm:space-y-3 short-compact-gap max-w-3xl px-4 sm:px-8 md:px-16">
      <motion.p
        variants={workHeaderTaglineVariants}
        initial="hidden"
        animate={animateState}
        className="text-gray-400 text-xs sm:text-sm font-semibold tracking-wider uppercase"
      >
        FEATURED WORKS
      </motion.p>
      <motion.h1
        variants={workHeaderContainerVariants}
        initial="hidden"
        animate={animateState}
        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl short-subtitle-text font-semibold tracking-tight leading-snug sm:leading-tight select-none text-slate-900"
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden py-1 -my-1 px-[0.04em] mx-[-0.04em] mr-[0.25em] align-bottom"
          >
            <motion.span
              variants={workHeaderWordVariants}
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>
    </div>
  );
}
