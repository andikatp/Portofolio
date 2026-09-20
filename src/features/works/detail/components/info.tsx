import { motion } from "framer-motion";
import Magnetic from "../../../../components/ui/magnetic";
import { PROJECT_INFO_VARIANTS } from "../../animations/work-animations";
import type { WorkItem } from "../../data/work-data";

interface WorkDetailInfoProps {
  work: WorkItem;
  isContentReady: boolean;
  isClosing: boolean;
  isInternalSwitch?: boolean;
}

export function WorkDetailInfo({
  work,
  isContentReady,
  isClosing,
}: WorkDetailInfoProps) {
  const isReadyAndOpen = isContentReady && !isClosing;
  const formattedTechstack = Array.isArray(work.techstacks)
    ? work.techstacks.join(" • ")
    : work.techstacks;

  return (
    <motion.div
      variants={PROJECT_INFO_VARIANTS}
      initial="initial"
      animate={isReadyAndOpen ? "animate" : "initial"}
      custom={isReadyAndOpen}
      exit="exit"
      transition={{
        duration: isClosing ? 0.1 : 0.3,
        delay: isReadyAndOpen ? 0.1 : 0,
      }}
      className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6 max-w-xl py-2 sm:py-4 order-3 xl:order-1"
    >
      <div className="space-y-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase">
          {work.id < 10 ? `0${work.id}` : work.id}
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          {work.title}
        </h1>
      </div>

      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
        {work.description}
      </p>

      <div className="grid grid-cols-2 gap-4 pt-2 sm:pt-4 border-t border-slate-200">
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            TECHSTACKS
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 uppercase tracking-wide">
            {formattedTechstack}
          </p>
        </div>
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            ROLE
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 uppercase tracking-wide">
            {work.role}
          </p>
        </div>
      </div>

      {(work.playStoreUrl || work.appStoreUrl) && (
        <div className="pt-2 sm:pt-4 flex flex-wrap gap-3">
          {work.playStoreUrl && (
            <Magnetic strength={0.4}>
              <a
                href={work.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer shadow-md hover:shadow-lg"
              >
                Google Play Store
              </a>
            </Magnetic>
          )}
          {work.appStoreUrl && (
            <Magnetic strength={0.4}>
              <a
                href={work.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer shadow-md hover:shadow-lg"
              >
                Apple App Store
              </a>
            </Magnetic>
          )}
        </div>
      )}
    </motion.div>
  );
}
