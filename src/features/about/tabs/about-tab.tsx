import { motion } from "framer-motion";
import { contentVariants } from "../animations/animations";
import { AboutIntro } from "./components/intro";
import { AboutSkillMatrix } from "./components/skill-matrix";
import { AboutStory } from "./components/story";
import { AboutSummary } from "./components/summary";

export function AboutTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <AboutIntro customIndex={1} />
      <AboutStory customIndex={2} />

      <motion.div
        custom={3}
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <AboutSkillMatrix />
      </motion.div>

      <AboutSummary customIndex={4} />
    </div>
  );
}

export default AboutTab;
