import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ImageUploadBox } from "./ImageUploadBox";
import type { MeetingImageSelection } from "@/types/meeting";

const meta = {
  title: "Meeting/Create/ImageUploadBox",
  component: ImageUploadBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageUploadBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    selectedImage: null,
  },
};

export const WithUserImage: Story = {
  args: {
    selectedImage: {
      type: "user",
      src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80",
    },
  },
};

export const WithDefaultImage: Story = {
  args: {
    selectedImage: {
      type: "default",
      src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80",
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedImage, setSelectedImage] =
      useState<MeetingImageSelection | null>(null);

    const handleFileSelected = (file: File) => {
      setSelectedImage((prev) => {
        if (prev?.type === "user") URL.revokeObjectURL(prev.src);
        return { type: "user", src: URL.createObjectURL(file) };
      });
    };

    return (
      <ImageUploadBox
        selectedImage={selectedImage}
        onFileSelected={handleFileSelected}
      />
    );
  },
};
