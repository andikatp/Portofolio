import { motion } from "framer-motion";
import appstore from "../../../assets/marketplaces/appstore.webp";
import playstore from "../../../assets/marketplaces/playstore.webp";
import { trackEvent } from "../../../lib/analytics";
import { PROJECT_INFO_VARIANTS } from "../animations/work-animations";
import type { WorkItem } from "../data/work-data";

interface WorkDetailInfoProps {
  work: WorkItem;
  isContentReady: boolean;
  isClosing: boolean;
  isInternalSwitch: boolean;
}

export function WorkDetailInfo({
  work,
  isContentReady,
  isClosing,
  isInternalSwitch,
}: WorkDetailInfoProps) {
  const workNumber = String(work.id).padStart(2, "0");
  const isReadyAndOpen = isContentReady && !isClosing;
  const hasStoreLinks = Boolean(work.playStoreUrl || work.appStoreUrl);

  return (
    <motion.div
      key={work.id}
      variants={PROJECT_INFO_VARIANTS}
      initial="initial"
      animate={isReadyAndOpen ? "animate" : "initial"}
      custom={isReadyAndOpen}
      exit="exit"
      transition={{
        duration: isClosing ? 0.1 : 0.3,
        delay: isReadyAndOpen ? (isInternalSwitch ? 0 : 0.05) : 0,
      }}
      className="space-y-4 sm:space-y-6 w-full xl:w-1/3 xl:pr-6 shrink-0 order-3 xl:order-1"
    >
      <div>
        <p className="text-xs sm:text-sm font-medium text-slate-400 tracking-wider">
          {workNumber}
        </p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold text-slate-900 tracking-tight leading-tight">
          {work.title}
        </h1>
      </div>
      <p className="text-slate-600 text-justify text-sm sm:text-base md:text-lg">
        {work.description}
      </p>

      <div className="flex flex-row justify-between w-full gap-4 pt-1 sm:pt-2">
        <div className="border-t border-slate-200 space-y-1 pt-3 w-full">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            TECHSTACKS
          </p>
          <p className="text-xs sm:text-sm font-medium text-slate-900 uppercase">
            {work.techstacks.join(" • ")}
          </p>
        </div>
        <div className="border-t border-slate-200 space-y-1 pt-3 w-full">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            ROLE
          </p>
          <p className="text-xs sm:text-sm font-medium text-slate-900 uppercase">
            {work.role}
          </p>
        </div>
      </div>

      {hasStoreLinks && (
        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 sm:gap-3 pt-3 sm:pt-6">
          {work.playStoreUrl && (
            <a
              href={work.playStoreUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("click_store_link", {
                  store: "Play Store",
                  project: work.title,
                  url: work.playStoreUrl,
                })
              }
              className="bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-slate-50 transition-colors duration-200 flex flex-row justify-center items-center gap-2 cursor-pointer border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 flex-1 sm:flex-none"
            >
              <img
                src={playstore}
                alt="Play Store"
                height={20}
                width={20}
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              />
              <span>Play Store</span>
            </a>
          )}
          {work.appStoreUrl && (
            <a
              href={work.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("click_store_link", {
                  store: "App Store",
                  project: work.title,
                  url: work.appStoreUrl,
                })
              }
              className="bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-slate-50 transition-colors duration-200 flex flex-row justify-center items-center gap-2 cursor-pointer border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 flex-1 sm:flex-none"
            >
              <img
                src={appstore}
                alt="App Store"
                height={20}
                width={20}
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              />
              <span>App Store</span>
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
