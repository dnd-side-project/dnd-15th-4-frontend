import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IcPuzzlePiece, PUZZLE_SHAPES } from "@/components/icons";

const meta: Meta<typeof IcPuzzlePiece> = {
  title: "Components/Icons/IcPuzzlePiece",
  component: IcPuzzlePiece,
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: "select",
      options: PUZZLE_SHAPES,
    },
    className: {
      control: "select",
      options: ["text-primary-normal", "text-point-normal"],
      description: "퍼즐 색상 클래스 (Primary / Point)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IcPuzzlePiece>;

export const Default: Story = {
  args: {
    shape: "shape-1",
    className: "text-primary-normal",
  },
};

export const AllVariants: Story = {
  render: () => {
    const colors = [
      { label: "Primary Color", className: "text-primary-normal" },
      { label: "Point Color", className: "text-point-normal" },
    ];

    return (
      <div className="bg-bg-gray flex flex-col gap-6 rounded-xl p-6">
        {colors.map((color) => (
          <div key={color.label} className="flex flex-col gap-3">
            <h3 className="body4 text-text-primary">{color.label}</h3>
            <div className="border-border-1 flex items-center gap-6 rounded-lg border bg-white p-4">
              {PUZZLE_SHAPES.map((shape) => (
                <div key={shape} className="flex flex-col items-center gap-2">
                  <IcPuzzlePiece shape={shape} className={color.className} />
                  <span className="body7 text-text-disable">{shape}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
