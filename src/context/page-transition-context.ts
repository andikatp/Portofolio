import { createContext, useContext } from "react";

export interface PageTransitionContextType {
  isAnimating: boolean;
  isLoading: boolean;
  phase: "idle" | "backdrop" | "rising";
  targetPath: string | null;
  navigateWithTransition: (path: string) => void;
}

export const PageTransitionContext = createContext<PageTransitionContextType>({
  isAnimating: false,
  isLoading: false,
  phase: "idle",
  targetPath: null,
  navigateWithTransition: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

