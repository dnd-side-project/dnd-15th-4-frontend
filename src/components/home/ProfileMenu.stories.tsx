import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";

import { ProfileMenu } from "@/components/home";
import { useAuthStore } from "@/stores/useAuthStore";

const meta: Meta<typeof ProfileMenu> = {
  title: "Components/Common/ProfileMenu",
  component: ProfileMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-bg-gray flex h-64 justify-end rounded-xl p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileMenu>;

const withAuthState = (
  state: Partial<ReturnType<typeof useAuthStore.getState>>
) => {
  const StoryComponent = () => {
    useEffect(() => {
      useAuthStore.setState(state);
    }, []);

    return <ProfileMenu />;
  };

  return StoryComponent;
};

export const LoggedIn: Story = {
  render: withAuthState({
    user: { id: "mock-id", nickname: "퍼즐밋 유저" },
    _hasHydrated: true,
  }),
};

export const LoadingState: Story = {
  render: withAuthState({
    user: null,
    _hasHydrated: false,
  }),
};
