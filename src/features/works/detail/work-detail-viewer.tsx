import { motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  HERO_TRANSITION,
  INTERNAL_SWITCH_TRANSITION,
} from "../animations/work-animations";
import type { WorkItem } from "../data/work-data";

interface WorkDetailViewerProps {
  work: WorkItem;
  activeLayoutId: string;
  images: string[];
  currentImageIndex: number;
  isContentReady: boolean;
  isClosing: boolean;
  isInternalSwitch: boolean;
  onLayoutAnimationComplete: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export function WorkDetailViewer({
  work,
  activeLayoutId,
  images,
  currentImageIndex,
  isContentReady,
  isClosing,
  isInternalSwitch,
  onLayoutAnimationComplete,
  onPrevImage,
  onNextImage,
}: WorkDetailViewerProps) {
  const currentLayoutId = currentImageIndex === 0 ? activeLayoutId : undefined;

  const imageTransition: Transition = isClosing
    ? HERO_TRANSITION
    : isInternalSwitch
      ? INTERNAL_SWITCH_TRANSITION
      : !isContentReady
        ? HERO_TRANSITION
        : { duration: 0.15, ease: "easeOut" };

  const isReadyAndOpen = isContentReady && !isClosing;

  return (
    <div className="relative z-50 flex-1 w-full rounded-3xl flex items-center justify-center min-h-[250px] sm:min-h-[350px] md:min-h-[420px] max-h-[42vh] sm:max-h-[55vh] lg:max-h-[60vh] p-2 sm:p-4 order-1 xl:order-2">
      {/* Gray Container Background - Fades in after image finishes flying */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReadyAndOpen ? 1 : 0 }}
        exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
        transition={{ duration: isClosing ? 0.1 : 0.25 }}
        className="absolute inset-0 bg-slate-100 rounded-3xl z-0 pointer-events-none"
      />

      <motion.img
        key={`${work.id}-${currentImageIndex}`}
        layoutId={currentLayoutId}
        initial={{ opacity: isContentReady ? 0.8 : 1 }}
        animate={{ opacity: 1 }}
        onLayoutAnimationComplete={onLayoutAnimationComplete}
        transition={imageTransition}
        src={images[currentImageIndex]}
        alt={`${work.title} photo ${currentImageIndex + 1}`}
        className="h-full max-h-[38vh] sm:max-h-[52vh] lg:max-h-[56vh] w-auto max-w-full object-contain rounded-2xl z-10 select-none relative"
      />

      {/* Left Arrow Button */}
      {images.length > 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isReadyAndOpen ? 1 : 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
          transition={{ duration: isClosing ? 0.1 : 0.2 }}
          onClick={onPrevImage}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md z-20"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}

      {/* Right Arrow Button */}
      {images.length > 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isReadyAndOpen ? 1 : 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
          transition={{ duration: isClosing ? 0.1 : 0.2 }}
          onClick={onNextImage}
          aria-label="Next photo"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md z-20"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}
    </div>
  );
}
