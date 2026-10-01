import { motion } from "motion/react";
import { Home } from "lucide-react";
import React, { useState } from "react";
import Magnetic from "../../components/ui/magnetic";
import { usePageTransition } from "../../context";
import {
  NOT_FOUND_CONTAINER_VARIANTS,
  NOT_FOUND_ITEM_VARIANTS,
  NOT_FOUND_TAGLINE_VARIANTS,
  NOT_FOUND_TITLE_CONTAINER_VARIANTS,
  NOT_FOUND_TITLE_WORD_VARIANTS,
} from "./animations/animations";

const TITLE_TEXT = "Page Not Found.";
const TITLE_WORDS = TITLE_TEXT.split(" ");

export function NotFoundSection() {
  const { navigateWithTransition, isAnimating, isLoading } = usePageTransition();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (!isLoading && !hasAnimated) {
    setHasAnimated(true);
  }

  const shouldAnimate = hasAnimated || !isLoading;
  const animateState = shouldAnimate ? "visible" : "hidden";

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isAnimating) return;
    navigateWithTransition(path);
  };

  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 md:px-16 w-full py-6 sm:py-12 my-auto gap-4 sm:gap-6 min-h-0 text-center">
      {/* 404 Badge */}
      <motion.div
        variants={NOT_FOUND_TAGLINE_VARIANTS}
        initial="hidden"
        animate={animateState}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest border border-slate-200/60 select-none"
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Error 404
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={NOT_FOUND_TITLE_CONTAINER_VARIANTS}
        initial="hidden"
        animate={animateState}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-slate-900 tracking-tight text-center select-none"
      >
        {TITLE_WORDS.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden py-1.5 -my-1.5 px-[0.05em] mx-[-0.05em] mr-[0.25em] align-bottom"
          >
            <motion.span
              variants={NOT_FOUND_TITLE_WORD_VARIANTS}
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      {/* Description & Action Buttons */}
      <motion.div
        variants={NOT_FOUND_CONTAINER_VARIANTS}
        initial="hidden"
        animate={animateState}
        className="flex flex-col items-center gap-6 max-w-md mt-2"
      >
        <motion.p
          variants={NOT_FOUND_ITEM_VARIANTS}
          className="text-slate-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed select-none"
        >
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </motion.p>

        <motion.div
          variants={NOT_FOUND_ITEM_VARIANTS}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2"
        >
          <Magnetic strength={0.4}>
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className={`flex items-center gap-2 bg-slate-900 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-full shadow-md hover:bg-slate-800 transition-all select-none ${
                isAnimating
                  ? "cursor-default pointer-events-none"
                  : "cursor-pointer hover:scale-105 active:scale-95"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a
              href="/works"
              onClick={(e) => handleNavClick(e, "/works")}
              className={`flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium text-sm sm:text-base px-5 py-3 rounded-full border border-slate-200 hover:border-slate-400 transition-all select-none ${
                isAnimating
                  ? "cursor-default pointer-events-none"
                  : "cursor-pointer hover:scale-105 active:scale-95"
              }`}
            >
              <span>Explore Works</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default NotFoundSection;
