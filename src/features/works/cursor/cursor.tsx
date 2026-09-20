import { motion, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WorkCursorProps {
  isHovered: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function WorkCursor({ isHovered, x, y }: WorkCursorProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isHovered ? 1 : 0,
        opacity: isHovered ? 1 : 0,
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        scale: { type: "spring", damping: 24, stiffness: 280, mass: 0.4 },
        opacity: { duration: 0.15 },
      }}
      style={{ x, y, backfaceVisibility: "hidden" }}
      className="fixed top-0 left-0 bg-slate-950 text-white rounded-full hidden md:flex flex-row items-center justify-center space-x-2 shadow-2xl pointer-events-none z-50 select-none px-4 py-2.5 transform-gpu will-change-transform"
    >
      <span className="text-xs font-semibold whitespace-nowrap">
        View Project
      </span>
      <ArrowRight className="w-4 h-4 shrink-0" />
    </motion.div>
  );
}
