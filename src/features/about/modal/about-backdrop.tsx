import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { backdropVariants } from "../animations/about-animations";

interface AboutBackdropProps {
  onClose: () => void;
}

export function AboutBackdrop({ onClose }: AboutBackdropProps) {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.2 });
  const y = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.2 });
  const [showCloseCircle, setShowCloseCircle] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX - 38);
    rawY.set(e.clientY - 38);

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

    if (isDesktop !== showCloseCircle) {
      setShowCloseCircle(isDesktop);
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
          rawX.set(e.clientX - 38);
          rawY.set(e.clientY - 38);
          const isDesktop =
            typeof window !== "undefined" && window.innerWidth >= 768;
          setShowCloseCircle(isDesktop);
        }}
        onMouseLeave={() => setShowCloseCircle(false)}
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: showCloseCircle ? 1 : 0,
          opacity: showCloseCircle ? 1 : 0,
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
