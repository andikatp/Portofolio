import { motion } from "framer-motion";
import { contentVariants } from "../../animations/animations";

export function AboutIntro({ customIndex = 1 }: { customIndex?: number }) {
  return (
    <motion.div
      custom={customIndex}
      variants={contentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="space-y-3"
    >
      <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
        ABOUT
      </p>
      <h2 className="text-2xl md:text-3xl font-medium text-slate-900 leading-snug tracking-tight">
        Mobile Developer with deep Flutter roots, expanding into Fullstack Web.
      </h2>
      <p className="text-slate-600 leading-relaxed text-base pt-2">
        With 3+ years of specialized experience in mobile development, I have
        architected and delivered high-impact enterprise solutions including ERP
        systems, HRM platforms, attendance management, and inventory logistics
        using Flutter and React Native.
      </p>
    </motion.div>
  );
}
