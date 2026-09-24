import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useState } from "react";
import { backdropVariants } from "../animations/animations";

interface AboutBackdropProps {
  onClose: () => void;
  isReady?: boolean;
}

export function AboutBackdrop({ onClose, isReady = true }: AboutBackdropProps) {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.2 });
  const y = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.2 });
  const [showCloseCircle, setShowCloseCircle] = useState(false);

  const activeCloseCircle = isReady && showCloseCircle;

  const updatePosition = (clientX: number, clientY: number) => {
    const targetX = clientX - 38;
    const targetY = clientY - 38;

    if (!activeCloseCircle) {
      rawX.jump(targetX);
      rawY.jump(targetY);
      x.jump(targetX);
      y.jump(targetY);
    } else {
      rawX.set(targetX);
      rawY.set(targetY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isReady) {
      if (showCloseCircle) setShowCloseCircle(false);
      return;
    }

    const isHoverable =
      typeof window !== "undefined" && window.innerWidth >= 768;

    if (isHoverable) {
      updatePosition(e.clientX, e.clientY);
    }

    if (isHoverable !== showCloseCircle) {
      setShowCloseCircle(isHoverable);
    }
  };

  return (
    <>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-60 cursor-pointer transform-gpu"
        onClick={onClose}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => {
          if (!isReady) return;
          const isHoverable =
            typeof window !== "undefined" && window.innerWidth >= 768;
          if (isHoverable) {
            updatePosition(e.clientX, e.clientY);
          }
          setShowCloseCircle(isHoverable);
        }}
        onMouseLeave={() => setShowCloseCircle(false)}
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: activeCloseCircle ? 1 : 0,
          opacity: activeCloseCircle ? 1 : 0,
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          scale: { type: "spring", damping: 28, stiffness: 350, mass: 0.2 },
          opacity: { duration: 0.15 },
        }}
        style={{ x, y, backfaceVisibility: "hidden" }}
        className="fixed top-0 left-0 w-19 h-19 bg-slate-950 text-white rounded-full flex items-center justify-center text-[10px] font-semibold tracking-widest shadow-2xl pointer-events-none z-75 select-none will-change-transform transform-gpu"
      >
        Close
      </motion.div>
    </>
  );
}
