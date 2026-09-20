import { AnimatePresence, motion } from "framer-motion";
import type { WorkItem } from "../data/work-data";

interface WorkInfoPanelProps {
  hoveredWork: WorkItem | null;
}

export function WorkInfoPanel({ hoveredWork }: WorkInfoPanelProps) {
  return (
    <div className="w-full min-h-[64px] sm:min-h-[82px] px-4 sm:px-8 md:px-16 pb-4 sm:pb-6 z-40 pointer-events-none select-none flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {hoveredWork && (
          <motion.div
            key={hoveredWork.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col space-y-0.5 sm:space-y-1"
          >
            <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-400 uppercase">
              {hoveredWork.category}
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-slate-950 tracking-tight leading-snug sm:leading-none">
              {hoveredWork.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
