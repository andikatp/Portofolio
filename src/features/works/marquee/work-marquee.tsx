import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HERO_TRANSITION,
  MARQUEE_CARD_VARIANTS,
} from "../animations/work-animations";
import {
  DUPLICATED_WORKS,
  getWorkSlug,
  type WorkItem,
} from "../data/work-data";

interface WorkMarqueeProps {
  works?: WorkItem[];
  isLoading?: boolean;
  onHoverWork: (work: WorkItem | null) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onSelectWork?: (work: WorkItem, layoutId: string) => void;
  isPausedProp?: boolean;
  selectedLayoutId?: string | null;
}

const SET_COUNT = 6;

const CARD_SIZE_CLASSES =
  "h-[30vh] min-h-[180px] max-h-[280px] sm:h-[38vh] sm:min-h-[260px] sm:max-h-[340px] md:h-[370px] lg:h-[430px] xl:h-[450px]";

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  if (range <= 0) return v;
  return ((((v - min) % range) + range) % range) + min;
}

interface MarqueeCardProps {
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

function MarqueeCard({
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
  const [isLoaded, setIsLoaded] = useState(false);
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
      initial="rest"
      whileHover="hover"
      animate={isSelected ? "selected" : isHoveredCard ? "hover" : "rest"}
      className={`shrink-0 cursor-pointer relative group rounded-2xl ${
        isSelected ? "z-9999" : "z-10"
      }`}
      style={{ zIndex: isSelected ? 9999 : 1 }}
    >
      {/* Skeleton overlay shown while image is downloading */}
      {!isLoaded && !hasError && (
        <div
          className={`${CARD_SIZE_CLASSES} w-[220px] sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[440px] bg-slate-200/90 dark:bg-slate-800/90 rounded-2xl animate-pulse flex items-center justify-center relative overflow-hidden`}
        >
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300 rounded-full animate-spin" />
        </div>
      )}

      {/* Error fallback card */}
      {hasError && (
        <div
          className={`${CARD_SIZE_CLASSES} w-[220px] sm:w-[300px] md:w-[360px] lg:w-[420px] bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 font-medium text-xs sm:text-sm p-4 text-center`}
        >
          {work.title}
        </div>
      )}

      {/* Main Image */}
      {!hasError && (
        <motion.img
          layoutId={itemLayoutId}
          transition={HERO_TRANSITION}
          variants={MARQUEE_CARD_VARIANTS}
          src={work.image}
          alt={work.title}
          onLoad={() => {
            setIsLoaded(true);
            if (onImageLoad) onImageLoad();
          }}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`${CARD_SIZE_CLASSES} w-auto object-contain rounded-2xl pointer-events-none transition-opacity duration-300 ${
            isLoaded ? "opacity-100 block" : "opacity-0 absolute inset-0"
          }`}
        />
      )}
    </motion.div>
  );
}

export function WorkMarquee({
  works,
  isLoading = false,
  onHoverWork,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onSelectWork,
  isPausedProp = false,
  selectedLayoutId = null,
}: WorkMarqueeProps) {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const singleWidthRef = useRef<number>(0);
  const x = useMotionValue(0);

  const isTouchDraggingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const startMotionXRef = useRef(0);
  const touchMovedRef = useRef(false);

  const speed = 0.5;

  let marqueeWorks: WorkItem[] = [];
  if (works && works.length > 0) {
    for (let i = 0; i < SET_COUNT; i++) {
      marqueeWorks.push(...works);
    }
  } else if (DUPLICATED_WORKS.length > 0) {
    marqueeWorks = DUPLICATED_WORKS;
  }

  const updateWidth = useCallback(() => {
    if (containerRef.current && marqueeWorks.length > 0) {
      singleWidthRef.current = containerRef.current.scrollWidth / SET_COUNT;
    }
  }, [marqueeWorks.length]);

  useEffect(() => {
    updateWidth();
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [updateWidth]);

  useAnimationFrame((_, delta) => {
    if (isPaused || isPausedProp || isTouchDraggingRef.current) return;

    const singleWidth = singleWidthRef.current;
    if (singleWidth <= 0) return;

    const moveBy = speed * (delta / 16);
    const nextX = x.get() - moveBy;
    const wrappedX = wrap(-singleWidth, 0, nextX);

    x.set(wrappedX);
  });

  const detectHoveredWorkFromPoint = (clientX: number, clientY: number) => {
    const elem = document.elementFromPoint(clientX, clientY);
    if (!elem) return;
    const cardElem = elem.closest("[data-work-index]");
    if (cardElem) {
      const idxStr = cardElem.getAttribute("data-work-index");
      if (idxStr !== null) {
        const idx = parseInt(idxStr, 10);
        if (!isNaN(idx) && marqueeWorks[idx]) {
          setHoveredCardIndex(idx);
          onHoverWork(marqueeWorks[idx]);
          setIsPaused(true);
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isTouchDraggingRef.current = true;
      touchMovedRef.current = false;
      touchStartXRef.current = e.touches[0].clientX;
      startMotionXRef.current = x.get();
      setIsPaused(true);
      detectHoveredWorkFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 5) {
      touchMovedRef.current = true;
    }
    const singleWidth = singleWidthRef.current;
    let newX = startMotionXRef.current + deltaX;
    if (singleWidth > 0) {
      newX = wrap(-singleWidth, 0, newX);
    }
    x.set(newX);
    detectHoveredWorkFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isTouchDraggingRef.current = false;
    setHoveredCardIndex(null);
    onHoverWork(null);
    setIsPaused(false);
  };

  if (isLoading || marqueeWorks.length === 0) {
    return (
      <div className="w-full overflow-hidden my-auto py-4 relative pointer-events-none select-none">
        <div className="flex w-max shrink-0 items-center space-x-4 sm:space-x-4 py-4 sm:py-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`marquee-skeleton-${i}`}
              className={`${CARD_SIZE_CLASSES} w-[220px] sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[440px] bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl shrink-0 animate-pulse flex items-center justify-center`}
            >
              <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden my-auto py-4 relative touch-pan-y"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        setHoveredCardIndex(null);
        setIsPaused(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex w-max shrink-0 items-center space-x-4 sm:space-x-4 py-4 sm:py-8"
      >
        {marqueeWorks.map((work, index) => {
          const slug = getWorkSlug(work, works);
          const itemLayoutId = `hero-card-${work.id}-${index}`;
          const isSelected = selectedLayoutId === itemLayoutId;
          const isHoveredCard = hoveredCardIndex === index;

          return (
            <MarqueeCard
              key={`marquee-item-${work.id}-${index}`}
              work={work}
              index={index}
              itemLayoutId={itemLayoutId}
              isSelected={isSelected}
              isHoveredCard={isHoveredCard}
              onSelectWork={onSelectWork}
              onHoverWork={onHoverWork}
              setHoveredCardIndex={setHoveredCardIndex}
              setIsPaused={setIsPaused}
              navigate={navigate}
              slug={slug}
              touchMovedRef={touchMovedRef}
              onImageLoad={updateWidth}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
