import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcMedalSilver = (props: IconProps) => (
  <BaseIcon viewBox="0 0 19 24" {...props}>
    <rect x="3" width="13" height="13" rx="1" fill="#3DBAFF" />
    <path
      d="M7 0H12V12C12 12.5523 11.5523 13 11 13H8C7.44772 13 7 12.5523 7 12V0Z"
      fill="#E2F5FF"
    />
    <circle cx="9.5" cy="14.5" r="9" fill="#F1F1F1" stroke="#BFC4C7" />
    <path
      d="M6.79688 19L6.78516 18.2266L9.67969 15.1797C10.6875 14.1133 11.168 13.5391 11.168 12.7539C11.168 11.8867 10.4297 11.3125 9.48047 11.3125C8.47266 11.3125 7.82812 11.957 7.82812 12.9062H6.83203C6.82031 11.4062 7.98047 10.3984 9.51562 10.3984C11.0508 10.3984 12.1523 11.4297 12.1523 12.7539C12.1523 13.7031 11.707 14.4414 10.207 15.9883L8.26172 17.9922V18.0625H12.3047V19H6.79688Z"
      fill="#797979"
    />
  </BaseIcon>
);
