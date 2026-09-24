import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
  onExitStart?: () => void;
}

export default function Preloader({ onComplete, onExitStart }: PreloaderProps) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [phase, setPhase] = useState<"loading" | "waiting" | "exit">("loading");

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight,
      });
    };
    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase("waiting");
    }, 600);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (phase === "waiting") {
      const timer2 = setTimeout(() => {
        setPhase("exit");
      }, 1000);
      return () => clearTimeout(timer2);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "exit") {
      const timerExitStart = setTimeout(() => {
        if (onExitStart) onExitStart();
      }, 380);
      const timerComplete = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1180);

      return () => {
        clearTimeout(timerExitStart);
        clearTimeout(timerComplete);
      };
    }
  }, [phase, onExitStart, onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const w =
    dimension.width ||
    (typeof window !== "undefined" ? window.innerWidth : 1440);
  const h =
    dimension.height ||
    (typeof window !== "undefined" ? window.innerHeight : 900);

  const rawArch = w < 640 ? Math.round(w * 0.12) : Math.round(w * 0.1);
  const archHeight = Math.min(Math.max(rawArch, 40), 160);

  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} Z`;
  const targetPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + archHeight * 1.5} 0 ${h} Z`;

  const EASE = [0.76, 0, 0.24, 1] as const;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={
        phase === "exit" ? { y: `calc(-100% - ${archHeight * 2}px)` } : { y: 0 }
      }
      transition={{ duration: 1.15, ease: EASE }}
      className="fixed inset-0 z-99999 pointer-events-none select-none transform-gpu"
    >
      <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] fill-black stroke-none pointer-events-auto">
        <motion.path
          initial={{ d: initialPath }}
          animate={phase === "exit" ? { d: targetPath } : { d: initialPath }}
          transition={{ duration: 1.15, ease: EASE }}
          style={{ willChange: "d" }}
        />
      </svg>

      <AnimatePresence>
        {phase !== "exit" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="relative z-10 w-full h-full flex items-center justify-center text-white pointer-events-auto"
            style={{ willChange: "opacity" }}
          >
            <AnimatePresence mode="wait">
              {phase === "loading" && (
                <motion.div
                  key="loading-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <h1 className="text-lg sm:text-2xl md:text-2xl font-light tracking-wide text-white/90">
                    Loading<span className="animate-pulse">...</span>
                  </h1>
                </motion.div>
              )}

              {phase === "waiting" && (
                <motion.div
                  key="thank-you-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <h1 className="text-base sm:text-xl md:text-2xl font-light tracking-wide text-slate-200">
                    Thank you for waiting
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
