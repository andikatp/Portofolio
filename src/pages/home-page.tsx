import { AboutMarquee } from "../features/about";
import { HomeSection } from "../features/home";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 min-h-0 justify-between">
      <HomeSection />
      <AboutMarquee />
    </div>
  );
}
