import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  contentVariants,
  menuVariants,
  tabVariants,
} from "./animations/about-animations";
import { AboutBackdrop } from "./modal/about-backdrop";
import { AboutCurve } from "./modal/about-curve";
import { AboutHeader } from "./modal/about-header";
import AboutAdditionals from "./tabs/about-additionals";
import { AboutCV } from "./tabs/about-cv-tab";
import { AboutExperience } from "./tabs/about-experience-tab";
import { AboutIntro } from "./tabs/about-intro";
import { AboutSkillMatrix } from "./tabs/about-skill-matrix";
import { AboutStory } from "./tabs/about-story";
import { AboutSummary } from "./tabs/about-summary";

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "about" | "experience" | "cv";

function AboutSection({ isOpen, onClose }: AboutProps) {
  const [[activeTab, direction], setTab] = useState<[TabType, number]>([
    "about",
    0,
  ]);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const tabs = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "cv", label: "Download CV" },
  ] as const;

  const handleTabChange = (newTab: TabType) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    const newIndex = tabs.findIndex((t) => t.id === newTab);
    if (newIndex !== currentIndex) {
      setTab([newTab, newIndex > currentIndex ? 1 : -1]);
    }
  };

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setTab([tabs[currentIndex + 1].id, 1]);
    }
  };

  const handlePrevTab = () => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex > 0) {
      setTab([tabs[currentIndex - 1].id, -1]);
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <AboutBackdrop onClose={onClose} />

          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed top-0 right-0 flex flex-col w-full h-full bg-white shadow-2xl sm:w-[85%] md:w-[65%] lg:w-1/2 xl:w-2/5 text-slate-900 z-70"
          >
            <AboutCurve windowHeight={windowHeight} />
            <AboutHeader onClose={onClose} customIndex={0} />

            <div className="flex items-center px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 pb-2 space-x-2 border-b border-slate-100 shrink-0 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as TabType)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 select-none cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden overflow-y-auto no-scrollbar">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={tabVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipeThreshold = 50;
                    const velocityThreshold = 400;
                    if (
                      offset.x < -swipeThreshold ||
                      velocity.x < -velocityThreshold
                    ) {
                      handleNextTab();
                    } else if (
                      offset.x > swipeThreshold ||
                      velocity.x > velocityThreshold
                    ) {
                      handlePrevTab();
                    }
                  }}
                  className="touch-pan-y cursor-grab space-y-6 sm:space-y-8 min-h-full"
                >
                  {activeTab === "about" && (
                    <>
                      <AboutIntro customIndex={1} />
                      <AboutStory customIndex={2} />

                      <motion.div
                        custom={3}
                        variants={contentVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                      >
                        <AboutSkillMatrix />
                      </motion.div>

                      <AboutSummary customIndex={4} />
                    </>
                  )}

                  {activeTab === "experience" && <AboutExperience />}

                  {activeTab === "cv" && <AboutCV customIndex={1} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              custom={5}
              variants={contentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="z-10 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white border-t border-slate-100 shrink-0"
            >
              <AboutAdditionals />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default AboutSection;
