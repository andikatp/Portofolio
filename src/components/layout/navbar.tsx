import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import meImg from "../../assets/me.webp";
import { usePageTransition } from "../../context";
import { Magnetic } from "../ui/magnetic";

function Navbar() {
  const location = useLocation();
  const { navigateWithTransition, isAnimating, targetPath } =
    usePageTransition();

  const currentPath =
    isAnimating && targetPath ? targetPath : location.pathname;
  const isHome = currentPath === "/" || currentPath === "/about";

  const menus = [
    { label: "Works", path: "/works" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isAnimating) return;
    navigateWithTransition(path);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-50 top-0 left-0 right-0 flex flex-row items-start sm:items-center justify-between px-4 sm:px-8 md:px-16 py-3 sm:py-6 short-compact-py"
    >
      {/* Left side: Logo or Back icon */}
      <div className="pointer-events-auto">
        <AnimatePresence mode="wait" initial={false}>
          {isHome ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.85, y: -4, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, y: 4, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "opacity, transform, filter" }}
            >
              <Magnetic strength={0.9}>
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, "/")}
                  aria-label="Andikatp Homepage"
                  className={`flex flex-row items-center space-x-2.5 sm:space-x-4 py-2.5 ${
                    isAnimating
                      ? "cursor-default pointer-events-none"
                      : "cursor-pointer"
                  }`}
                >
                  <img
                    src={meImg}
                    alt="Andika's Profile"
                    width={28}
                    height={28}
                    loading="eager"
                    decoding="async"
                    className="object-cover rounded-full shrink-0 w-6 h-6 sm:w-7 sm:h-7"
                  />
                  <h4 className="text-sm font-medium select-none text-slate-900 sm:text-base">
                    andikatp.
                  </h4>
                </a>
              </Magnetic>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, scale: 0.85, y: -4, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, y: 4, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "opacity, transform, filter" }}
            >
              <Magnetic strength={0.9}>
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, "/")}
                  aria-label="Back to home"
                  className={`flex items-center justify-center text-white transition-all bg-black rounded-full shadow-md select-none w-10 h-10 sm:w-12 sm:h-12 ${
                    isAnimating
                      ? "cursor-default pointer-events-none"
                      : "cursor-pointer hover:scale-105 active:scale-95"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </a>
              </Magnetic>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col items-end space-y-0.5 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2 md:space-x-4 pointer-events-auto">
        {menus.map((menu) => {
          const isActive =
            currentPath === menu.path ||
            (menu.path === "/works" && currentPath.startsWith("/works"));
          return (
            <Magnetic key={menu.label} strength={0.35}>
              <a
                href={menu.path}
                onClick={(e) => handleNavClick(e, menu.path)}
                aria-label={`Navigate to ${menu.label}`}
                className={`font-medium text-xs sm:text-sm md:text-base rounded-full px-3 sm:px-4 py-1 sm:py-2 transition-colors duration-200 ease-in-out select-none block text-right ${
                  isAnimating
                    ? "cursor-default pointer-events-none"
                    : "cursor-pointer"
                } ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                {menu.label}
              </a>
            </Magnetic>
          );
        })}
      </nav>
    </motion.header>
  );
}

export default Navbar;
