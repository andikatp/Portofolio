import { AnimatePresence } from "motion/react";
import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import Preloader from "./components/ui/preloader";
import { PageTransitionProvider } from "./context";

import { GoogleAnalytics } from "./components/analytics/google-analytics";
import { SEO } from "./components/seo/seo";
import { AboutSection } from "./features/about";

const HomePage = lazy(() => import("./pages/home-page"));
const WorksPage = lazy(() => import("./pages/works-page"));
const ContactPage = lazy(() => import("./pages/contact-page"));

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { backgroundLocation?: Location } | null;
  const currentRouteLocation = state?.backgroundLocation || location;

  const isAboutOpen = location.pathname === "/about";

  const handleCloseAbout = () => {
    if (state?.backgroundLocation?.pathname) {
      navigate(
        state.backgroundLocation.pathname + state.backgroundLocation.search,
      );
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <SEO />
      <GoogleAnalytics />
      <Suspense fallback={null}>
        <Routes location={currentRouteLocation}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<HomePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/:slug" element={<WorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
      <AboutSection isOpen={isAboutOpen} onClose={handleCloseAbout} />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderExiting, setIsPreloaderExiting] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            onExitStart={() => setIsPreloaderExiting(true)}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <PageTransitionProvider isLoading={isLoading && !isPreloaderExiting}>
        <AppRoutes />
      </PageTransitionProvider>
    </>
  );
}

export default App;
