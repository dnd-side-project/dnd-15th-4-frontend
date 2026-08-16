import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IcKakao, IcPlus, IcProfile } from "@/components/icons";

const meta = {
  title: "Icons/Gallery",
  component: IcProfile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IcProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <IcKakao size={24} aria-label="카카오톡 로그인 버튼" />
        <span className="body7 text-secondary-2">IcKakao</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IcProfile size={24} aria-label="프로필 버튼" />
        <span className="body7 text-secondary-2">IcProfile</span>
      </div>
      <div className="rounded-pill bg-sub2-normal flex flex-col items-center gap-2 p-3">
        <IcPlus
          size={24}
          className="text-white"
          aria-label="플로팅 메뉴 버튼"
        />
        <span className="body7 text-secondary-2">IcPlus</span>
      </div>
    </div>
  ),
};
