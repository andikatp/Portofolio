import { motion } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HERO_TRANSITION,
  MARQUEE_CARD_VARIANTS,
} from "../animations/work-animations";
import type { WorkItem } from "../data/work-data";
import { CARD_SIZE_CLASSES } from "./marquee-skeleton";

export interface MarqueeCardProps {
  work: WorkItem;
  index: number;
  itemLayoutId: string;
  isSelected: boolean;
  isHoveredCard: boolean;
  onSelectWork?: (work: WorkItem, layoutId: string) => void;
  onHoverWork: (work: WorkItem | null) => void;
  setHoveredCardIndex: (index: number | null) => void;
  setIsPaused: (paused: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
  slug: string;
  touchMovedRef: React.MutableRefObject<boolean>;
  onImageLoad?: () => void;
}

export const MarqueeCard = React.memo(function MarqueeCard({
  work,
  index,
  itemLayoutId,
  isSelected,
  isHoveredCard,
  onSelectWork,
  onHoverWork,
  setHoveredCardIndex,
  setIsPaused,
  navigate,
  slug,
  touchMovedRef,
  onImageLoad,
}: MarqueeCardProps) {
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = work.image;
      return img.complete;
    }
    return false;
  });
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      key={`marquee-item-${work.id}-${index}`}
      data-work-index={index}
      onClick={(e) => {
        if (touchMovedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          touchMovedRef.current = false;
          return;
        }
        if (onSelectWork) {
          onSelectWork(work, itemLayoutId);
        } else {
          navigate(`/works/${slug}`);
        }
      }}
      onMouseEnter={() => {
        setHoveredCardIndex(index);
        onHoverWork(work);
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setHoveredCardIndex(null);
        onHoverWork(null);
        setIsPaused(false);
      }}
      initial={false}
      whileHover="hover"
      animate={isSelected ? "selected" : isHoveredCard ? "hover" : "rest"}
      className={`shrink-0 cursor-pointer relative group rounded-2xl ${isSelected ? "z-30" : "z-10"
        }`}
      style={{ zIndex: isSelected ? 30 : 1 }}
    >
      {/* Skeleton overlay shown while image is downloading */}
      {!isLoaded && !hasError && (
        <div
          className={`${CARD_SIZE_CLASSES} w-auto bg-slate-200/90 dark:bg-slate-800/90 rounded-2xl animate-pulse flex items-center justify-center relative overflow-hidden`}
          style={{ aspectRatio: work.aspectRatio || 1.33 }}
        >
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300 rounded-full animate-spin" />
        </div>
      )}

      {/* Error fallback card */}
      {hasError && (
        <div
          className={`${CARD_SIZE_CLASSES} w-auto min-w-45 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 font-medium text-xs sm:text-sm p-4 text-center`}
          style={{ aspectRatio: work.aspectRatio || 1.33 }}
        >
          {work.title}
        </div>
      )}

      {/* Main Image */}
      {!hasError && (
        <motion.img
          layoutId={itemLayoutId}
          initial={false}
          transition={{
            layout: HERO_TRANSITION,
            duration: 0.25,
            ease: "easeOut",
          }}
          variants={MARQUEE_CARD_VARIANTS}
          src={work.image}
          alt={work.title}
          loading="lazy"
          decoding="async"
          onLoad={() => {
            setIsLoaded(true);
            if (onImageLoad) onImageLoad();
          }}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          style={work.aspectRatio ? { aspectRatio: work.aspectRatio } : undefined}
          className={`${CARD_SIZE_CLASSES} w-auto object-contain rounded-2xl pointer-events-none ${isLoaded ? "opacity-100 block" : "opacity-0 absolute inset-0"
            }`}
        />
      )}
    </motion.div>
  );
});
