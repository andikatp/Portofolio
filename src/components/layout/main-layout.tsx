import { useLocation, useOutlet } from "react-router-dom";
import PageTransition from "../ui/page-transition";
import Navbar from "./navbar";
import { usePageTransition } from "../../context";

export default function MainLayout() {
  const outlet = useOutlet();
  const location = useLocation();
  const { targetPath } = usePageTransition();

  const isWorkDetail =
    location.pathname.startsWith("/works/") && location.pathname !== "/works";
    
  const isNewPage = targetPath !== null && location.pathname === targetPath;

  return (
    <div
      className={`flex flex-col relative w-full min-h-dvh ${
        isWorkDetail
          ? "overflow-y-auto"
          : "overflow-y-auto md:h-dvh md:max-h-dvh"
      }`}
    >
      <Navbar />
      <PageTransition />
      <main className={`flex flex-col flex-1 min-h-0 ${isNewPage ? "relative z-50" : ""}`}>
        {outlet}
      </main>
    </div>
  );
}
