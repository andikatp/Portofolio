import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePageTransition } from "../../context";

export default function PageTransition() {
  const { phase } = usePageTransition();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width:
          window.innerWidth || document.documentElement.clientWidth || 1440,
        height:
          window.innerHeight || document.documentElement.clientHeight || 900,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const isVisible = phase !== "idle";

  const w = dimensions.width || 1440;
  const h = dimensions.height || 900;

  const rawArch = w < 640 ? Math.round(w * 0.12) : Math.round(w * 0.1);
  const archHeight = Math.min(Math.max(rawArch, 40), 160);

  const archPath = `M 0 0 Q ${w / 2} ${archHeight * 1.5} ${w} 0 L ${w} ${h + archHeight * 2} L 0 ${h + archHeight * 2} Z`;

  const EASE = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-40 pointer-events-none select-none overflow-hidden">
          {/* 1. Dark Modal Backdrop Overlay (Fades in over CURRENT page first) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === "backdrop" || phase === "rising" ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: phase === "backdrop" ? 0.35 : 0.4,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* 2. White Semicircle Arch Panel (Rises after backdrop pause) */}
          <motion.div
            initial={{ y: "100vh" }}
            animate={{
              y:
                phase === "backdrop"
                  ? "100vh"
                  : `calc(0vh - ${archHeight + 10}px)`,
            }}
            exit={{
              y: `calc(0vh - ${archHeight + 10}px)`,
              opacity: 0,
            }}
            transition={{
              duration: phase === "backdrop" ? 0.35 : 0.85,
              ease: EASE,
            }}
            className="absolute left-0 right-0 w-full pointer-events-auto"
            style={{
              height: `calc(100vh + ${archHeight * 2}px)`,
              top: 0,
              willChange: "transform",
            }}
          >
            <svg
              className="w-full h-full fill-white stroke-none filter drop-shadow-2xl"
              preserveAspectRatio="none"
              viewBox={`0 0 ${w} ${h + archHeight * 2}`}
            >
              <path d={archPath} />
            </svg>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
