import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import { HomeHeroSection } from "@/components/home/hero/HomeHeroSection";
import { HomeUpcomingSection } from "@/components/home/schedule/HomeUpcomingSection";

const HomePage = () => {
  return (
    <div className="relative flex flex-1 flex-col">
      <HomeHeroSection />
      <HomeUpcomingSection />
      <FloatingActionButton />
    </div>
  );
};

export default HomePage;
