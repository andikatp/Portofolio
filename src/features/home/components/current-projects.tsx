import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { getWorkSlug, type WorkItem } from "../../works";
import {
  projectItemVariants,
  projectsHeaderVariants,
  modalVariants,
} from "../animations/animations";

interface CurrentProjectsProps {
  works: WorkItem[];
  animateState: "visible" | "hidden";
  handleNavClick: (e: React.MouseEvent, path: string) => void;
}

export function CurrentProjects({
  works,
  animateState,
  handleNavClick,
}: CurrentProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const topProjects = works.slice(0, 5);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const isHovered = hoveredIndex !== null;
  const activeIndex = hoveredIndex ?? 0;

  return (
    <div
      className="flex flex-col w-full md:w-1/3 md:pl-8 lg:pl-16 space-y-1 sm:space-y-2.5"
      onMouseMove={handleMouseMove}
    >
      <motion.h2
        variants={projectsHeaderVariants}
        initial="hidden"
        animate={animateState}
        className="text-[10px] sm:text-xs font-semibold text-slate-500 select-none lg:text-sm tracking-wider uppercase"
      >
        CURRENT PROJECTS
      </motion.h2>
      <div className="flex flex-col relative z-10">
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
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              variants={projectItemVariants}
              custom={index}
              initial="hidden"
              animate={animateState}
              className={`relative flex items-center justify-between w-full py-2.5 sm:py-3 md:py-5 lg:py-6 xl:py-8 text-xs sm:text-base lg:text-lg xl:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950 ${isHiddenOnSmallMobile ? "hidden sm:flex" : "flex"
                }`}
            >
              <div className="flex items-center overflow-hidden min-w-0">
                <span className="truncate">{project.title}</span>
              </div>
              <div className="overflow-hidden flex items-center justify-center p-0.5 shrink-0 ml-2">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
              </div>
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </motion.a>
          );
        })}

        <motion.a
          href="/works"
          aria-label="More Works — View all portfolio projects"
          onClick={(e) => handleNavClick(e, "/works")}
          variants={projectItemVariants}
          custom={topProjects.length}
          initial="hidden"
          animate={animateState}
          className="relative flex items-center justify-between w-full py-2.5 sm:py-3 md:py-5 lg:py-6 xl:py-8 text-xs sm:text-base lg:text-lg xl:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950"
        >
          <span>More Works</span>
          <div className="overflow-hidden flex items-center justify-center p-0.5">
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
          </div>
          <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </motion.a>
      </div>

      {/* Floating Gallery Modal Container */}
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate={isHovered ? "enter" : "closed"}
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block will-change-transform"
      >
        <div className="w-50 h-35 lg:w-60 lg:h-40 xl:w-70 xl:h-47.5 overflow-hidden rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-200/50 bg-white -translate-x-1/2 -translate-y-1/2 relative">
          <div
            className="absolute left-0 top-0 w-full h-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ top: `${activeIndex * -100}%` }}
          >
            {topProjects.map((project, idx) => (
              <div
                key={`modal-${project.id}-${idx}`}
                className="w-full h-full flex items-center justify-center bg-slate-100 overflow-hidden p-2"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain drop-shadow-sm rounded-sm"
                  />
                ) : (
                  <div className="text-slate-500 font-medium text-sm">
                    {project.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Cursor Button */}
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate={isHovered ? "enter" : "closed"}
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-60 hidden md:block will-change-transform"
      >
        <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-xl">
          <span className="text-xs font-semibold">View</span>
        </div>
      </motion.div>
    </div>
  );
}

export default CurrentProjects;
