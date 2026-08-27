import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-sub2-normal focus-visible:ring-3 focus-visible:ring-sub2-normal/50 disabled:pointer-events-none disabled:bg-disable",
  {
    variants: {
      variant: {
        default:
          "bg-sub2-normal text-white hover:bg-sub2-normal-hover active:bg-sub2-normal-active",
        secondary: "bg-white text-primary border-border-1",
        outline:
          "border-border-1 bg-bg-normal hover:bg-surface-1 hover:text-primary aria-expanded:bg-surface-1 aria-expanded:text-primary",
      },
      size: {
        default: "bottom-button w-full h-14 rounded-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
