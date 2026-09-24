import { motion } from "motion/react";
import { PROJECT_SELECTOR_VARIANTS } from "../../animations/work-animations";
import {
  getSetIndexFromLayoutId,
  getWorkLayoutId,
  type WorkItem,
  WORKS,
} from "../../data/work-data";

interface WorkDetailSelectorProps {
  currentWorkId: number;
  activeLayoutId: string;
  isContentReady: boolean;
  isClosing: boolean;
  works?: WorkItem[];
  onSelectWork?: (work: WorkItem, layoutId?: string) => void;
  onSelectInternal: (work: WorkItem, targetLayoutId: string) => void;
}

export function WorkDetailSelector({
  currentWorkId,
  activeLayoutId,
  isContentReady,
  isClosing,
  works = WORKS,
  onSelectWork,
  onSelectInternal,
}: WorkDetailSelectorProps) {
  const projectsList = works.slice(0, 8);
  const isReadyAndOpen = isContentReady && !isClosing;

  return (
    <motion.div
      variants={PROJECT_SELECTOR_VARIANTS}
      initial="initial"
      animate={isReadyAndOpen ? "animate" : "initial"}
      custom={isReadyAndOpen}
      exit="exit"
      transition={{
        duration: isClosing ? 0.1 : 0.3,
        delay: isReadyAndOpen ? 0.15 : 0,
      }}
      className="hidden md:flex justify-end w-full pt-2 sm:pt-4 overflow-x-auto no-scrollbar py-1"
    >
      <div className="flex flex-row items-center gap-1.5 sm:gap-2 min-w-max">
        {projectsList.map((item) => {
          const isActive = item.id === currentWorkId;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === currentWorkId) return;
                const setIdx = getSetIndexFromLayoutId(
                  activeLayoutId,
                  works.length,
                );
                const targetLayoutId = getWorkLayoutId(item, setIdx, works);
                if (onSelectWork) {
                  onSelectWork(item, targetLayoutId);
                } else {
                  onSelectInternal(item, targetLayoutId);
                }
              }}
              title={item.title}
              className={`rounded-lg p-1 bg-slate-100/80 shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "opacity-100 grayscale-0 scale-105"
                  : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-8 sm:h-11 w-auto max-w-[26px] sm:max-w-[34px] object-contain rounded-md"
              />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
