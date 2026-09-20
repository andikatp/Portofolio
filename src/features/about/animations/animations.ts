import type { Variants } from "framer-motion";

export const EASE = [0.76, 0, 0.24, 1] as const;
export const FAST_EASE = [0.16, 1, 0.3, 1] as const;

export const getCurveVariants = (
  initialPath: string,
  targetPath: string,
): Variants => ({
  initial: {
    d: initialPath,
  },
  enter: {
    d: targetPath,
    transition: { duration: 0.8, ease: EASE },
  },
  exit: {
    d: initialPath,
    transition: { duration: 0.6, ease: EASE },
  },
});

export const menuVariants: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: {
    x: "0%",
    transition: { duration: 0.6, ease: EASE },
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.5, ease: EASE },
  },
};

export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

export const tabVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: EASE },
  },
};

export const contentVariants: Variants = {
  initial: { x: 40, opacity: 0 },
  enter: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.06 * i,
    },
  }),
  exit: (i: number) => ({
    x: 20,
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: EASE,
      delay: 0.01 * i,
    },
  }),
};
