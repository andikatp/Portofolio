import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "../../../lib/analytics";
import { contentVariants } from "../animations/animations";
import { DEFAULT_CV_URL, fetchCvUrlFromContentful } from "../services/cv-service";

export function AboutCV({ customIndex = 1 }: { customIndex?: number }) {
  const [cvUrl, setCvUrl] = useState<string>(DEFAULT_CV_URL);

  useEffect(() => {
    let isMounted = true;
    fetchCvUrlFromContentful().then((url) => {
      if (isMounted && url) {
        setCvUrl(url);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        custom={customIndex}
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="space-y-1"
      >
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
          CURRICULUM VITAE
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
          Download Resume
        </h2>
      </motion.div>

      <motion.div
        custom={customIndex + 1}
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-5"
      >
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 text-base">
            Andika Tri Prasetya - Resume
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fullstack & Mobile Developer specializing in Flutter, React Native,
            React, TypeScript, and high-concurrency enterprise architecture.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-0.5">
            <span className="text-slate-400 font-medium">Experiences</span>
            <p className="font-semibold text-slate-900">3+ Years</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-0.5">
            <span className="text-slate-400 font-medium">Core Stack</span>
            <p className="font-semibold text-slate-900">Flutter / React</p>
          </div>
        </div>

        <a
          href={cvUrl}
          download="Andika_Tri_Prasetya_CV.pdf"
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            trackEvent("download_cv", {
              file_url: cvUrl,
            })
          }
          className="w-full bg-slate-900 text-white rounded-xl py-3 px-4 text-xs font-semibold items-center justify-center space-x-2 hover:bg-slate-700 transition-colors shadow-md select-none cursor-pointer flex text-center"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span>Download CV (PDF)</span>
        </a>
      </motion.div>
    </div>
  );
}

export default AboutCV;
