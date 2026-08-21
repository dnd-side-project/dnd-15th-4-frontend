// todo: 커스텀으로 수정 필요
import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./Icon.types";

export const IcPin = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </BaseIcon>
);
