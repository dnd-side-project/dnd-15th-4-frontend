import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcMedalGold = (props: IconProps) => (
  <BaseIcon viewBox="0 0 19 24" {...props}>
    <rect x="3" width="13" height="13" rx="1" fill="#3DBAFF" />
    <path
      d="M7 0H12V12C12 12.5523 11.5523 13 11 13H8C7.44772 13 7 12.5523 7 12V0Z"
      fill="#E2F5FF"
    />
    <circle cx="9.5" cy="14.5" r="9" fill="#FFDB53" stroke="#E2A900" />
    <path
      d="M10.7969 10.5156V19H9.73047V11.6172H9.68359L7.62109 12.9883V11.9219L9.73047 10.5156H10.7969Z"
      fill="#A67C00"
    />
  </BaseIcon>
);
