import { motion } from "framer-motion";
import { getCurveVariants } from "../animations/animations";

interface AboutCurveProps {
  windowHeight: number;
}

export function AboutCurve({ windowHeight }: AboutCurveProps) {
  const initialPath = `M100 0 L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
  const targetPath = `M100 0 L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;
  const curveVariants = getCurveVariants(initialPath, targetPath);

  return (
    <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-white stroke-none pointer-events-none">
      <motion.path
        variants={curveVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}
