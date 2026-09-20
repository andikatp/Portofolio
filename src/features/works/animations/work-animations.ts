import type { Transition, Variants } from "framer-motion";

/**
 * Main hero layout flight transition curve (slower quintic ease)
 */
export const HERO_TRANSITION: Transition = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Fast zero-layout transition used when switching projects within the detail view
 */
export const INTERNAL_SWITCH_TRANSITION: Transition = {
  layout: { duration: 0 },
  opacity: { duration: 0.2, ease: "easeOut" },
  scale: { duration: 0.2, ease: "easeOut" },
};

/**
 * Modal backdrop fade animation
 */
export const BACKDROP_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Close X button scale/fade animation
 */
export const BACK_BUTTON_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (isClosing: boolean) => ({
    opacity: isClosing ? 0 : 1,
    scale: isClosing ? 0.8 : 1,
  }),
  exit: { opacity: 0, scale: 0.8 },
};

/**
 * Left project details info panel animation
 */
export const PROJECT_INFO_VARIANTS: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: (isReadyAndOpen: boolean) => ({
    opacity: isReadyAndOpen ? 1 : 0,
    y: isReadyAndOpen ? 0 : 12,
  }),
  exit: { opacity: 0, y: 12 },
};

/**
 * Photos sidebar gallery animation
 */
export const GALLERY_SIDEBAR_VARIANTS: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: (isReadyAndOpen: boolean) => ({
    opacity: isReadyAndOpen ? 1 : 0,
    x: isReadyAndOpen ? 0 : 10,
  }),
  exit: { opacity: 0, x: 10 },
};

/**
 * Bottom quick project selector bar animation
 */
export const PROJECT_SELECTOR_VARIANTS: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: (isReadyAndOpen: boolean) => ({
    opacity: isReadyAndOpen ? 1 : 0,
    y: isReadyAndOpen ? 0 : 10,
  }),
  exit: { opacity: 0, y: 10 },
};

/**
 * Marquee item card hover / selected variants
 */
export const MARQUEE_CARD_VARIANTS: Variants = {
  rest: {
    scale: 1,
    opacity: 0.7,
    filter: "grayscale(100%)",
  },
  hover: {
    scale: 1.05,
    opacity: 1,
    filter: "grayscale(0%)",
  },
  selected: {
    scale: 1,
    opacity: 1,
    filter: "grayscale(0%)",
  },
};

export const WORK_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Featured works header tagline variant
 */
export const workHeaderTaglineVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: WORK_EASE,
    },
  },
};

/**
 * Featured works title container variant
 */
export const workHeaderContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

/**
 * Individual title word variant for work header
 */
export const workHeaderWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.55,
      ease: WORK_EASE,
    },
  },
};
