import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import { HomeHeroSection } from "@/components/home/hero/HomeHeroSection";
import { HomeUpcomingSection } from "@/components/home/schedule/HomeUpcomingSection";
import { MOCK_MEETINGS } from "@/mocks/mockMeetings";

const HomePage = () => {
  const upcomingMeetings = MOCK_MEETINGS;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <HomeHeroSection />

      <HomeUpcomingSection schedules={upcomingMeetings} />

      <FloatingActionButton />
    </div>
  );
};

export default HomePage;
