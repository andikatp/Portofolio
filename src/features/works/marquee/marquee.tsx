import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DUPLICATED_WORKS,
  getWorkSlug,
  type WorkItem,
} from "../data/work-data";
import { usePageTransition } from "../../../context";
import { marqueeContainerVariants, marqueeItemEntryVariants } from "../animations/work-animations";
import { MarqueeCard } from "./marquee-card";
import { SKELETON_WORKS } from "./marquee-constants";
import { MarqueeSkeletonCard } from "./marquee-skeleton";

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

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  if (range <= 0) return v;
  return ((((v - min) % range) + range) % range) + min;
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

  const { isLoading: transitionLoading } = usePageTransition();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (!transitionLoading && !hasAnimated) {
    setHasAnimated(true);
  }

  const shouldAnimate = hasAnimated || !transitionLoading;
  const animateState = shouldAnimate ? "visible" : "hidden";

  const containerRef = useRef<HTMLDivElement>(null);
  const singleWidthRef = useRef<number>(0);
  const x = useMotionValue(0);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const startMotionXRef = useRef(0);
  const dragMovedRef = useRef(false);

  const speed = 0.5;

  const showSkeleton = isLoading || !works || works.length === 0;
  const baseWorks: WorkItem[] = showSkeleton
    ? SKELETON_WORKS
    : works && works.length > 0
      ? works
      : DUPLICATED_WORKS.length > 0
        ? DUPLICATED_WORKS
        : SKELETON_WORKS;

  const baseSetLength = baseWorks.length;
  const setCount = Math.max(6, Math.ceil(24 / Math.max(1, baseSetLength)));

  const marqueeWorks = React.useMemo(() => {
    const list: WorkItem[] = [];
    for (let i = 0; i < setCount; i++) {
      list.push(...baseWorks);
    }
    return list;
  }, [baseWorks, setCount]);

  const updateWidth = useCallback(() => {
    if (!containerRef.current || baseSetLength <= 0) return;
    const children = containerRef.current.children;
    if (children.length > baseSetLength) {
      const firstCard = children[0] as HTMLElement;
      const nextSetFirstCard = children[baseSetLength] as HTMLElement;
      if (firstCard && nextSetFirstCard) {
        const measuredWidth =
          nextSetFirstCard.offsetLeft - firstCard.offsetLeft;
        if (measuredWidth > 0) {
          singleWidthRef.current = measuredWidth;
          return;
        }
      }
    }
    if (containerRef.current.scrollWidth > 0) {
      singleWidthRef.current = containerRef.current.scrollWidth / setCount;
    }
  }, [baseSetLength, setCount]);

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
    if (isPaused || isPausedProp || isDraggingRef.current) return;

    const singleWidth = singleWidthRef.current;
    if (singleWidth <= 0) return;

    const moveBy = speed * (delta / 16);
    const nextX = x.get() - moveBy;
    const wrappedX = wrap(-singleWidth, 0, nextX);

    x.set(wrappedX);
  });

  const lastMousePosRef = useRef<{ clientX: number; clientY: number } | null>(null);

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };
    };
    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
    };
  }, []);

  const detectHoveredWorkFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      if (showSkeleton) return;
      const elem = document.elementFromPoint(clientX, clientY);
      if (!elem) {
        setHoveredCardIndex(null);
        onHoverWork(null);
        return;
      }
      const cardElem = elem.closest("[data-work-index]");
      if (cardElem) {
        const idxStr = cardElem.getAttribute("data-work-index");
        if (idxStr !== null) {
          const idx = parseInt(idxStr, 10);
          if (!isNaN(idx) && marqueeWorks[idx]) {
            setHoveredCardIndex(idx);
            onHoverWork(marqueeWorks[idx]);
            setIsPaused(true);
            return;
          }
        }
      }
      setHoveredCardIndex(null);
      onHoverWork(null);
      if (!isDraggingRef.current) {
        setIsPaused(false);
      }
    },
    [showSkeleton, marqueeWorks, onHoverWork],
  );

  useEffect(() => {
    if (!isPausedProp && lastMousePosRef.current) {
      detectHoveredWorkFromPoint(
        lastMousePosRef.current.clientX,
        lastMousePosRef.current.clientY,
      );
    }
  }, [isPausedProp, detectHoveredWorkFromPoint]);

  const handleDragStart = (clientX: number, clientY: number) => {
    lastMousePosRef.current = { clientX, clientY };
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = clientX;
    startMotionXRef.current = x.get();
    setIsPaused(true);
    detectHoveredWorkFromPoint(clientX, clientY);
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    lastMousePosRef.current = { clientX, clientY };
    const deltaX = clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 5) {
      dragMovedRef.current = true;
    }
    const singleWidth = singleWidthRef.current;
    let newX = startMotionXRef.current + deltaX;
    if (singleWidth > 0) {
      newX = wrap(-singleWidth, 0, newX);
    }
    x.set(newX);
    detectHoveredWorkFromPoint(clientX, clientY);
  };

  const handleDragEnd = useCallback(
    (clientX?: number, clientY?: number) => {
      isDraggingRef.current = false;
      const posX = typeof clientX === "number" ? clientX : lastMousePosRef.current?.clientX;
      const posY = typeof clientY === "number" ? clientY : lastMousePosRef.current?.clientY;

      if (typeof posX === "number" && typeof posY === "number") {
        detectHoveredWorkFromPoint(posX, posY);
      } else {
        setHoveredCardIndex(null);
        onHoverWork(null);
        setIsPaused(false);
      }
    },
    [detectHoveredWorkFromPoint, onHoverWork],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (isPausedProp) return;

      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      const singleWidth = singleWidthRef.current;
      if (singleWidth <= 0) return;

      e.preventDefault();

      const nextX = x.get() - delta * 0.8;
      const wrappedX = wrap(-singleWidth, 0, nextX);
      x.set(wrappedX);

      lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };
      detectHoveredWorkFromPoint(e.clientX, e.clientY);
    };

    element.parentElement?.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.parentElement?.removeEventListener("wheel", handleWheel);
    };
  }, [isPausedProp, detectHoveredWorkFromPoint, x]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 || e.button === 1) {
      if (e.button === 1) {
        e.preventDefault();
      }
      lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };
      handleDragStart(e.clientX, e.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };
    if (isDraggingRef.current) {
      handleDragMove(e.clientX, e.clientY);
    } else {
      detectHoveredWorkFromPoint(e.clientX, e.clientY);
    }
    onMouseMove(e);
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    if (e) {
      handleDragEnd(e.clientX, e.clientY);
    } else {
      handleDragEnd();
    }
  };

  return (
    <motion.div
      variants={marqueeContainerVariants}
      initial="hidden"
      animate={animateState}
      className={`w-full flex-1 min-h-0 flex flex-col justify-end relative touch-pan-y overflow-x-clip select-none cursor-grab active:cursor-grabbing`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={(e) => {
        lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };
        onMouseEnter(e);
        detectHoveredWorkFromPoint(e.clientX, e.clientY);
      }}
      onMouseLeave={() => {
        handleDragEnd();
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
        className="flex w-max shrink-0 items-end space-x-8 sm:space-x-8 py-2 sm:py-4"
      >
        {marqueeWorks.map((work, index) => {
          if (showSkeleton) {
            return (
              <motion.div key={`marquee-skel-${index}`} variants={marqueeItemEntryVariants} className="shrink-0">
                <MarqueeSkeletonCard
                  aspectRatio={work.aspectRatio}
                />
              </motion.div>
            );
          }

          const slug = getWorkSlug(work, works);
          const itemLayoutId = `hero-card-${work.id}-${index}`;
          const isSelected = selectedLayoutId === itemLayoutId;
          const isHoveredCard = hoveredCardIndex === index;

          return (
            <motion.div key={`marquee-item-wrap-${work.id}-${index}`} variants={marqueeItemEntryVariants} className="shrink-0">
              <MarqueeCard
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
                dragMovedRef={dragMovedRef}
                onImageLoad={updateWidth}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
