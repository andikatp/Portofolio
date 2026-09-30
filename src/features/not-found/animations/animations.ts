import type { Variants } from "motion/react";

export const NOT_FOUND_EASE = [0.16, 1, 0.3, 1] as const;

export const NOT_FOUND_TAGLINE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: NOT_FOUND_EASE,
    },
  },
};

export const NOT_FOUND_TITLE_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const NOT_FOUND_TITLE_WORD_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.55,
      ease: NOT_FOUND_EASE,
    },
  },
};

export const NOT_FOUND_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.25,
    },
  },
};

export const NOT_FOUND_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: NOT_FOUND_EASE,
    },
  },
};
