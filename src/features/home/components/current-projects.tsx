import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { getWorkSlug, type WorkItem } from "../../works";
import {
  projectItemVariants,
  projectsHeaderVariants,
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

  return (
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
          const isHovered = hoveredIndex === index;

          const words = project.title.trim().split(/\s+/);
          const midIndex = words.length > 1 ? Math.ceil(words.length / 2) : 1;
          const firstPart = words.slice(0, midIndex).join(" ");
          const secondPart =
            words.length > 1 ? words.slice(midIndex).join(" ") : "";

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
              className={`relative flex items-center justify-between w-full py-1 sm:py-2 lg:py-3.5 text-xs sm:text-base lg:text-lg xl:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950 ${
                isHiddenOnSmallMobile ? "hidden sm:flex" : "flex"
              }`}
            >
              <div className="flex items-center overflow-hidden min-w-0">
                {/* Mobile view */}
                <span className="truncate md:hidden">{project.title}</span>

                {/* Desktop view */}
                <div className="hidden md:flex items-center overflow-hidden min-w-0">
                  <span className="truncate shrink-0">{firstPart}</span>
                  {project.image && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden flex items-center shrink-0"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-6 sm:h-7 lg:h-8 w-12 sm:w-16 lg:w-20 object-cover rounded-md shrink-0 shadow-sm border border-slate-200/50 mx-1.5 sm:mx-2"
                      />
                    </motion.div>
                  )}
                  {secondPart && (
                    <span
                      className={`truncate shrink-0 transition-all duration-300 ${
                        isHovered ? "" : "ml-1 sm:ml-1.5"
                      }`}
                    >
                      {secondPart}
                    </span>
                  )}
                </div>
              </div>
              <div className="overflow-hidden flex items-center justify-center p-0.5 shrink-0 ml-2">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
              </div>
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </motion.a>
          );
        })}

        <motion.a
          href="/works"
          aria-label="View all portfolio projects"
          onClick={(e) => handleNavClick(e, "/works")}
          variants={projectItemVariants}
          custom={topProjects.length}
          initial="hidden"
          animate={animateState}
          className="relative flex items-center justify-between w-full py-1 sm:py-2 lg:py-3.5 text-xs sm:text-base lg:text-lg xl:text-xl font-medium border-b cursor-pointer select-none group border-slate-200 text-slate-800 hover:text-slate-950"
        >
          <span>More Works</span>
          <div className="overflow-hidden flex items-center justify-center p-0.5">
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out -translate-x-full lg:w-5 lg:h-5 group-hover:translate-x-0 text-slate-900 shrink-0" />
          </div>
          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </motion.a>
      </div>
    </div>
  );
}

export default CurrentProjects;
