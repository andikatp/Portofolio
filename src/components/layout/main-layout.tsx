import { useLocation, useOutlet } from "react-router-dom";
import PageTransition from "../ui/page-transition";
import Navbar from "./navbar";

export default function MainLayout() {
  const outlet = useOutlet();
  const location = useLocation();

  const isWorkDetail =
    location.pathname.startsWith("/works/") && location.pathname !== "/works";

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
      <main className="flex flex-col flex-1 min-h-0">
        {outlet}
      </main>
    </div>
  );
}
