import { motion } from "motion/react";
import React, { useState } from "react";
import { usePageTransition } from "../../context";
import { useWorks } from "../works";
import {
  subtitleContainerVariants,
  subtitleWordVariants,
  titleContainerVariants,
  titleWordVariants,
} from "./animations/animations";
import { CurrentProjects } from "./components/current-projects";

const TITLE_TEXT = "I'm Andika Tri Prasetya.";
const SUBTITLE_TEXT =
  "I'm a Flutter & Fullstack developer who loves to build cool stuff. Available for work.";

export function HomeSection() {
  const { works } = useWorks();
  const { navigateWithTransition, isAnimating, phase, isLoading } =
    usePageTransition();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (!isLoading && phase === "idle" && !hasAnimated) {
    setHasAnimated(true);
  }

  const shouldAnimate = hasAnimated || (!isLoading && phase === "idle");
  const animateState = shouldAnimate ? "visible" : "hidden";

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isAnimating) return;
    navigateWithTransition(path);
  };

  const titleWords = TITLE_TEXT.split(" ");
  const subtitleWords = SUBTITLE_TEXT.split(" ");

  return (
    <section className="flex flex-col justify-center md:flex-row items-stretch md:items-center md:justify-between flex-1 w-full px-4 sm:px-8 md:px-16 py-2 sm:py-4 gap-4 sm:gap-8 md:gap-0 min-h-0">
      <div className="flex flex-col w-full md:w-2/3 gap-2 sm:gap-4 md:gap-8 lg:gap-12 short-compact-gap">
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate={animateState}
          className="text-[13vw] sm:text-[14vw] md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] short-title-text font-semibold select-none leading-[0.85] sm:leading-[0.82] tracking-tight text-slate-900"
        >
          {titleWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden py-[0.2em] my-[-0.2em] px-[0.05em] mx-[-0.05em] mr-[0.22em] align-bottom"
            >
              <motion.span
                variants={titleWordVariants}
                className="inline-block"
                style={{ willChange: "transform, opacity" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        <motion.p
          variants={subtitleContainerVariants}
          initial="hidden"
          animate={animateState}
          className="max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl short-subtitle-text font-normal leading-relaxed select-none text-slate-800"
        >
          {subtitleWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden py-[0.15em] my-[-0.15em] px-[0.04em] mx-[-0.04em] mr-[0.25em] align-bottom"
            >
              <motion.span
                variants={subtitleWordVariants}
                className="inline-block"
                style={{ willChange: "transform, opacity" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </div>

      <CurrentProjects
        works={works}
        animateState={animateState}
        handleNavClick={handleNavClick}
      />
    </section>
  );
}

export default HomeSection;
