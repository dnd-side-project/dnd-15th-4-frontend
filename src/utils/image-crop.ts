export interface CropPixelArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.crossOrigin = "anonymous";
    image.src = src;
  });

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const getRotatedBoxSize = (width: number, height: number, rotation: number) => {
  const radians = toRadians(rotation);
  return {
    width:
      Math.abs(Math.cos(radians) * width) +
      Math.abs(Math.sin(radians) * height),
    height:
      Math.abs(Math.sin(radians) * width) +
      Math.abs(Math.cos(radians) * height),
  };
};

export const flipImageHorizontally = async (
  imageSrc: string
): Promise<string> => {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("캔버스 컨텍스트를 생성할 수 없습니다.");
  }

  context.translate(image.width, 0);
  context.scale(-1, 1);
  context.drawImage(image, 0, 0);

  return canvas.toDataURL("image/png");
};

export const cropImageToBlobUrl = async (
  imageSrc: string,
  area: CropPixelArea,
  rotation = 0,
  backgroundColor = "#000000"
): Promise<string> => {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("캔버스 컨텍스트를 생성할 수 없습니다.");
  }

  const { width: boxWidth, height: boxHeight } = getRotatedBoxSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = area.width;
  canvas.height = area.height;

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, area.width, area.height);
  context.translate(-area.x, -area.y);
  context.translate(boxWidth / 2, boxHeight / 2);
  context.rotate(toRadians(rotation));
  context.translate(-image.width / 2, -image.height / 2);
  context.drawImage(image, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("이미지 크롭에 실패했습니다."));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg");
  });
};
