import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { usePageTransition } from "../../context";
import { getWorkSlug, useWorks } from "../works";
import {
  projectItemVariants,
  projectsHeaderVariants,
  subtitleContainerVariants,
  subtitleWordVariants,
  titleContainerVariants,
  titleWordVariants,
} from "./animations/animations";

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

  const topProjects = works.slice(0, 5);
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
              className="inline-block overflow-hidden py-1 sm:py-2 -my-1 sm:-my-2 mr-[0.22em] align-bottom"
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
              className="inline-block overflow-hidden py-0.5 -my-0.5 mr-[0.25em] align-bottom"
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

      <div className="flex flex-col w-full md:w-1/3 md:pl-8 lg:pl-16 space-y-1 sm:space-y-2.5">
        <motion.h2
          variants={projectsHeaderVariants}
          initial="hidden"
          animate={animateState}
          className="text-[10px] sm:text-xs font-semibold text-slate-500 select-none lg:text-sm tracking-wider uppercase"
        >
          CURRENT PROJECTS
        </motion.h2>
        <div className="flex flex-col">
          {topProjects.map((project, index) => {
            const slug = getWorkSlug(project, works);
            const path = `/works/${slug}`;
            const isHiddenOnSmallMobile = index >= 3;
            return (
              <motion.a
                key={project.id}
                href={path}
                aria-label={`View project details for ${project.title}`}
                onClick={(e) => handleNavClick(e, path)}
                variants={projectItemVariants}
                custom={index}
                initial="hidden"
                animate={animateState}
                className={`relative flex items-center justify-between w-full py-1 sm:py-2 lg:py-3.5 text-xs sm:text-base lg:text-lg xl:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950 ${
                  isHiddenOnSmallMobile ? "hidden sm:flex" : "flex"
                }`}
              >
                <span>{project.title}</span>
                <div className="overflow-hidden flex items-center justify-center p-0.5">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
                </div>
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </motion.a>
            );
          })}

          <motion.a
            href="/works"
            aria-label="View all projects"
            onClick={(e) => handleNavClick(e, "/works")}
            variants={projectItemVariants}
            custom={topProjects.length}
            initial="hidden"
            animate={animateState}
            className="relative flex items-center justify-between w-full py-1 sm:py-2 lg:py-3.5 text-xs sm:text-base lg:text-lg xl:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950"
          >
            <span>More</span>
            <div className="overflow-hidden flex items-center justify-center p-0.5">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
            </div>
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
