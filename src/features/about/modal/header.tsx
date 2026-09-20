import { motion } from "framer-motion";
import meImg from "../../../assets/me.webp";
import Magnetic from "../../../components/ui/magnetic";
import { contentVariants } from "../animations/animations";

interface AboutHeaderProps {
  onClose: () => void;
  customIndex?: number;
}

export function AboutHeader({ onClose, customIndex = 0 }: AboutHeaderProps) {
  return (
    <motion.div
      custom={customIndex}
      variants={contentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-slate-100 bg-white sticky top-0 z-10"
    >
      <div className="flex items-center space-x-4">
        <img
          src={meImg}
          alt="Andika Tri Prasetya"
          className="rounded-full h-11 w-11 object-cover ring-1 ring-slate-200"
        />
        <div>
          <h3 className="font-medium text-slate-900 leading-tight text-base">
            Andika Tri Prasetya
          </h3>
          <p className="text-xs text-slate-400 font-normal tracking-wide mt-0.5">
            Fullstack Developer
          </p>
        </div>
      </div>
      <Magnetic strength={0.4}>
        <button
          onClick={onClose}
          className="rounded-full border border-slate-900 px-5 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer select-none block active:scale-95"
          aria-label="Close modal"
        >
          Close
        </button>
      </Magnetic>
    </motion.div>
  );
}
