import { motion } from "framer-motion";
import { contentVariants } from "../../animations/animations";

export function AboutStory({ customIndex = 2 }: { customIndex?: number }) {
  return (
    <motion.div
      custom={customIndex}
      variants={contentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="space-y-2 pt-4 border-t border-slate-100"
    >
      <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
        Bridging Mobile & Fullstack Ecosystems
      </h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        To craft end-to-end digital experiences, I am actively expanding into
        fullstack development. I leverage React, TypeScript, Node.js, Express,
        and modern database architectures to build robust backend systems,
        secure RESTful APIs, and performant web applications that seamlessly
        power cross-platform client applications.
      </p>
    </motion.div>
  );
}
