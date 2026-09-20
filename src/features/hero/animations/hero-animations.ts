import type { Variants } from "framer-motion";

export const HERO_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Container variant for staggering title words
 */
export const titleContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
};

/**
 * Individual title word variant sliding up with mask
 */
export const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.7,
      ease: HERO_EASE,
    },
  },
};

/**
 * Container variant for staggering subtitle words
 */
export const subtitleContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.18,
    },
  },
};

/**
 * Individual subtitle word variant
 */
export const subtitleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.5,
      ease: HERO_EASE,
    },
  },
};

/**
 * Current projects list title variant
 */
export const projectsHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: HERO_EASE,
    },
  },
};

/**
 * Individual project item list variant
 */
export const projectItemVariants: Variants = {
  hidden: { opacity: 0, x: 25 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      delay: 0.15 + index * 0.05,
      ease: HERO_EASE,
    },
  }),
};
