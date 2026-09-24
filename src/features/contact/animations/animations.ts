import type { Variants } from "motion/react";

export const CONTACT_EASE = [0.16, 1, 0.3, 1] as const;

export const CONTACT_TAGLINE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: CONTACT_EASE,
    },
  },
};

export const CONTACT_TITLE_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

export const CONTACT_TITLE_WORD_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.55,
      ease: CONTACT_EASE,
    },
  },
};

export const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.25,
    },
  },
};

export const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: CONTACT_EASE,
    },
  },
};
