import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTransitionContext } from "./page-transition-context";

interface PageTransitionProviderProps {
  children: ReactNode;
  isLoading?: boolean;
}

export function PageTransitionProvider({
  children,
  isLoading = false,
}: PageTransitionProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState<"idle" | "backdrop" | "rising">("idle");
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const navigateWithTransition = (path: string) => {
    if (phase !== "idle") return;
    if (location.pathname === path) return;

    // Bypass page transition for /about modal route
    if (path === "/about") {
      navigate("/about", { state: { backgroundLocation: location } });
      return;
    }
    if (location.pathname === "/about") {
      navigate(path);
      return;
    }

    clearAllTimeouts();
    setTargetPath(path);
    // 1. Show dark modal backdrop over CURRENT page first
    setPhase("backdrop");

    // 2. After 380ms backdrop hold, start the white semicircle arch slide UP
    const t1 = setTimeout(() => {
      setPhase("rising");

      // 3. At 480ms into rising slide (~860ms total), when covered by white curtain, swap route!
      const t2 = setTimeout(() => {
        navigate(path);
        window.scrollTo(0, 0);
      }, 480);
      timeoutsRef.current.push(t2);

      // 4. Complete rising slide at 850ms into rising (~1230ms total).
      // Trigger exit phase by setting phase to "idle", but hold targetPath until AnimatePresence exit completes (~850ms exit)
      const t3 = setTimeout(() => {
        setPhase("idle");
        const t4 = setTimeout(() => {
          setTargetPath(null);
        }, 850);
        timeoutsRef.current.push(t4);
      }, 850);
      timeoutsRef.current.push(t3);
    }, 380);
    timeoutsRef.current.push(t1);
  };

  const isAnimating = phase !== "idle" || targetPath !== null;

  return (
    <PageTransitionContext.Provider
      value={{
        isAnimating,
        isLoading,
        phase,
        targetPath,
        navigateWithTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

