import { useState } from "react";
import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Modal } from "./Modal";

const meta = {
  title: "Common/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalPreview = ({ children, ...props }: ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-bg-gray relative flex h-screen w-full items-center justify-center overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-primary-normal rounded-8 px-4 py-2 text-white"
      >
        모달 열기
      </button>

      <Modal {...props} open={open} onOpenChange={setOpen}>
        {children}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  args: {
    title: "예시 모달",
  },
  render: (args) => (
    <ModalPreview {...args} className="gap-3 px-5 py-8">
      <p className="h3 text-primary">모달 콘텐츠</p>
      <p className="body6 text-secondary-2 text-center">
        Modal은 children으로 원하는 콘텐츠를 받는 공용 shell입니다.
      </p>
    </ModalPreview>
  ),
};

export const WithImage: Story = {
  args: {
    title: "이미지 예시 모달",
  },
  render: (args) => (
    <ModalPreview {...args} className="gap-4 px-5 pt-9 pb-8">
      <div className="rounded-20 bg-sub2-light aspect-square w-full max-w-66.25" />
      <p className="body1 text-title">이미지가 들어가는 예시</p>
    </ModalPreview>
  ),
};
