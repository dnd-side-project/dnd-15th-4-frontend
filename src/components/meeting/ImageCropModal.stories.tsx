import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor, within } from "storybook/test";

import { ImageCropModal } from "./ImageCropModal";
import { cropImageToBlobUrl } from "@/utils/image-crop";

const createWideRedImage = (): string => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 50;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#ff0000";
  context.fillRect(0, 0, 200, 50);
  return canvas.toDataURL("image/png");
};

const getPixel = async (
  blobUrl: string,
  x: number,
  y: number
): Promise<[number, number, number]> => {
  const image = new Image();
  image.src = blobUrl;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d")!;
  context.drawImage(image, 0, 0);
  const [r, g, b] = context.getImageData(x, y, 1, 1).data;
  return [r, g, b];
};

const SAMPLE_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

const meta = {
  title: "Components/Meeting/ImageCropModal",
  component: ImageCropModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    imageSrc: SAMPLE_IMAGE,
    onCancel: fn(),
    onConfirm: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageCropModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ConfirmCrop: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await waitFor(() => expect(confirmButton).toBeEnabled(), {
      timeout: 5000,
    });

    await confirmButton.click();

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalled(), {
      timeout: 5000,
    });
  },
};

export const CancelCrop: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const cancelButton = await canvas.findByRole("button", { name: "취소" });

    await cancelButton.click();

    await waitFor(() => expect(args.onCancel).toHaveBeenCalled());
  },
};

export const FlipToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const flipButton = await canvas.findByRole("button", { name: "좌우 반전" });

    expect(flipButton).toHaveAttribute("aria-pressed", "false");

    await flipButton.click();
    await waitFor(() =>
      expect(flipButton).toHaveAttribute("aria-pressed", "true")
    );

    await flipButton.click();
    await waitFor(() =>
      expect(flipButton).toHaveAttribute("aria-pressed", "false")
    );
  },
};

export const RotateLeftCycle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rotateButton = await canvas.findByRole("button", {
      name: "왼쪽으로 90도 회전",
    });

    const getImageTransform = () => {
      const image = canvasElement.querySelector(".reactEasyCrop_Image");
      return image instanceof HTMLElement ? image.style.transform : "";
    };

    for (const expectedDegrees of [270, 180, 90, 0]) {
      await rotateButton.click();
      await waitFor(() =>
        expect(getImageTransform()).toContain(`rotate(${expectedDegrees}deg)`)
      );
    }
  },
};

export const ConstrainedToMainLayoutWidth: Story = {
  play: async ({ canvasElement }) => {
    const modal = await waitFor(() => {
      const el = canvasElement.querySelector<HTMLElement>(
        '[data-testid="image-crop-modal"]'
      );
      if (!el) throw new Error("Modal element not found");
      return el;
    });

    const computedStyle = getComputedStyle(modal);
    expect(computedStyle.maxWidth).toBe("448px");
    expect(computedStyle.marginLeft).toBe(computedStyle.marginRight);
  },
};

export const LetterboxBackgroundFillsBlack: Story = {
  play: async () => {
    const wideImageSrc = createWideRedImage();

    const blobUrl = await cropImageToBlobUrl(wideImageSrc, {
      x: 50,
      y: -25,
      width: 100,
      height: 100,
    });

    const topLetterbox = await getPixel(blobUrl, 50, 10);
    const imageContent = await getPixel(blobUrl, 50, 50);
    const bottomLetterbox = await getPixel(blobUrl, 50, 90);

    const isBlack = ([r, g, b]: number[]) => r < 20 && g < 20 && b < 20;
    const isRed = ([r, g, b]: number[]) => r > 180 && g < 80 && b < 80;

    expect(isBlack(topLetterbox)).toBe(true);
    expect(isRed(imageContent)).toBe(true);
    expect(isBlack(bottomLetterbox)).toBe(true);
  },
};

export const RealCropperContainLetterboxFillsBlack: Story = {
  args: {
    imageSrc: createWideRedImage(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await waitFor(() => expect(confirmButton).toBeEnabled(), {
      timeout: 5000,
    });

    await confirmButton.click();

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalled(), {
      timeout: 5000,
    });

    const onConfirmMock = args.onConfirm as unknown as {
      mock: { calls: [string][] };
    };
    const blobUrl = onConfirmMock.mock.calls[0][0];

    const resultImage = new Image();
    resultImage.src = blobUrl;
    await new Promise((resolve, reject) => {
      resultImage.onload = resolve;
      resultImage.onerror = reject;
    });

    const readCanvas = document.createElement("canvas");
    readCanvas.width = resultImage.width;
    readCanvas.height = resultImage.height;
    const context = readCanvas.getContext("2d")!;
    context.drawImage(resultImage, 0, 0);

    const sampleAtFraction = (fractionY: number) => {
      const x = Math.floor(resultImage.width / 2);
      const y = Math.min(
        resultImage.height - 1,
        Math.floor(resultImage.height * fractionY)
      );
      return Array.from(context.getImageData(x, y, 1, 1).data);
    };

    const isBlack = ([r, g, b]: number[]) => r < 20 && g < 20 && b < 20;
    const isRed = ([r, g, b]: number[]) => r > 180 && g < 80 && b < 80;

    expect(isBlack(sampleAtFraction(0.1))).toBe(true);
    expect(isRed(sampleAtFraction(0.5))).toBe(true);
    expect(isBlack(sampleAtFraction(0.9))).toBe(true);
  },
};

export const ConfirmAfterFlipAndRotate: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const flipButton = await canvas.findByRole("button", { name: "좌우 반전" });
    const rotateButton = await canvas.findByRole("button", {
      name: "왼쪽으로 90도 회전",
    });
    const confirmButton = await canvas.findByRole("button", { name: "확인" });

    await flipButton.click();
    await rotateButton.click();

    await waitFor(() => expect(confirmButton).toBeEnabled(), {
      timeout: 5000,
    });

    await confirmButton.click();

    await waitFor(() => expect(args.onConfirm).toHaveBeenCalled(), {
      timeout: 5000,
    });
  },
};
