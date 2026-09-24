import { AnimatePresence, motion } from "motion/react";
import {
  BACKDROP_VARIANTS,
  HERO_TRANSITION,
} from "../animations/work-animations";
import { getWorkLayoutId, type WorkItem } from "../data/work-data";
import { WorkDetailView } from "./view";

interface WorkDetailOverlayProps {
  isOpen: boolean;
  selectedWork: WorkItem | null;
  selectedLayoutId: string | null;
  onClose: () => void;
  onSelectWork: (nextWork: WorkItem, nextLayoutId?: string) => void;
  onExitComplete?: () => void;
}

export function WorkDetailOverlay({
  isOpen,
  selectedWork,
  selectedLayoutId,
  onClose,
  onSelectWork,
  onExitComplete,
}: WorkDetailOverlayProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && selectedWork && (
        <motion.div
          key="work-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: HERO_TRANSITION.ease }}
          className="fixed inset-0 z-500 overflow-y-auto flex flex-col justify-between"
        >
          <motion.div
            key="overlay-backdrop"
            variants={BACKDROP_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: HERO_TRANSITION.ease }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-0"
            onClick={onClose}
          />

          <div className="relative z-10 min-h-screen flex flex-col justify-between">
            <WorkDetailView
              work={selectedWork}
              layoutId={selectedLayoutId || getWorkLayoutId(selectedWork, 0)}
              onClose={onClose}
              onSelectWork={onSelectWork}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
