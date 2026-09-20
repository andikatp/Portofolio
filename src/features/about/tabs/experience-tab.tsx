import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { contentVariants } from "../animations/animations";
import { EXPERIENCE_DATA } from "../data/experience-data";

export function AboutExperience() {
  return (
    <div className="space-y-6">
      <motion.div
        custom={1}
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="space-y-1"
      >
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
          CAREER PATH
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
          Professional Experience
        </h2>
      </motion.div>

      <div className="space-y-8 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-100">
        {EXPERIENCE_DATA.map((exp, index) => (
          <motion.div
            key={exp.id}
            custom={index + 2}
            variants={contentVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="relative pl-8 space-y-2.5"
          >
            <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-900 ring-4 ring-white" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900 leading-tight">
                  {exp.company}
                </h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium mt-1">
                <span className="text-slate-900 font-medium">{exp.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {exp.location}
                </span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed pt-1">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AboutExperience;
