import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcDelete = (props: IconProps) => (
  <BaseIcon {...props}>
    <path
      d="M6 11.0127H18C18.2802 11.0127 18.5149 11.1067 18.7041 11.2959C18.8933 11.4851 18.9873 11.7198 18.9873 12C18.9873 12.2802 18.8933 12.5149 18.7041 12.7041C18.5149 12.8933 18.2802 12.9873 18 12.9873H6C5.71981 12.9873 5.48511 12.8933 5.2959 12.7041C5.10669 12.5149 5.0127 12.2802 5.0127 12C5.0127 11.7198 5.10669 11.4851 5.2959 11.2959C5.48511 11.1067 5.71981 11.0127 6 11.0127Z"
      stroke="currentColor"
      strokeWidth="0.025"
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </BaseIcon>
);
