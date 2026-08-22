import { MeetingSucessHeroSectoin } from "@/components/meeting/success/MettingSucessHeroSection";
import { MeetingSucessSectoin } from "@/components/meeting/success/MeetingSucessSection";

export default function MeetingCreateSuccessPage() {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <MeetingSucessHeroSectoin />

      <MeetingSucessSectoin />
    </div>
  );
}
