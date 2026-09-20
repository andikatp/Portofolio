import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Magnetic from "../../components/ui/magnetic";
import { usePageTransition } from "../../context";
import { trackEvent } from "../../lib/analytics";
import {
  CONTACT_TAGLINE_VARIANTS,
  CONTACT_TITLE_CONTAINER_VARIANTS,
  CONTACT_TITLE_WORD_VARIANTS,
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
} from "./animations/contact-animations";
import { CONTACT_LINKS } from "./data/contact-data";

const TITLE_TEXT = "Let's Work Together.";

function ContactSection() {
  const { phase, isLoading } = usePageTransition();
  const [hasAnimated, setHasAnimated] = useState(false);

  if (!isLoading && phase === "idle" && !hasAnimated) {
    setHasAnimated(true);
  }

  const shouldAnimate = hasAnimated || (!isLoading && phase === "idle");
  const animateState = shouldAnimate ? "visible" : "hidden";
  const titleWords = TITLE_TEXT.split(" ");

  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 md:px-16 w-full py-4 sm:py-12 my-auto gap-4 sm:gap-8 min-h-0 overflow-hidden">
      <motion.p
        variants={CONTACT_TAGLINE_VARIANTS}
        initial="hidden"
        animate={animateState}
        className="uppercase text-xs sm:text-sm text-gray-400 tracking-wider font-semibold"
      >
        Contact
      </motion.p>
      <motion.h1
        variants={CONTACT_TITLE_CONTAINER_VARIANTS}
        initial="hidden"
        animate={animateState}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 tracking-tight text-center"
      >
        {titleWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden py-0.5 -my-0.5 mr-[0.25em] align-bottom"
          >
            <motion.span
              variants={CONTACT_TITLE_WORD_VARIANTS}
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate={animateState}
        className="mt-2 sm:mt-8 py-2 sm:py-4 items-center border-t border-slate-200 w-full sm:w-3/4 md:w-1/2 flex flex-col gap-y-3 sm:gap-y-6"
      >
        {CONTACT_LINKS.map((item) => (
          <motion.div key={item.id} variants={ITEM_VARIANTS}>
            <Magnetic strength={0.9}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("click_contact_link", {
                    label: item.label,
                    link: item.link,
                  })
                }
                className="flex flex-row items-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 hover:text-slate-600 transition-colors select-none"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default ContactSection;
