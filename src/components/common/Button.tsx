import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-8 border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-primary-normal focus-visible:ring-3 focus-visible:ring-primary-normal/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary-normal text-white hover:bg-primary-normal-hover",
        outline:
          "border-border-1 bg-bg-normal hover:bg-surface-1 hover:text-text-primary aria-expanded:bg-surface-1 aria-expanded:text-text-primary",
        secondary:
          "bg-sub1-light text-text-primary hover:bg-sub1-light-hover aria-expanded:bg-sub1-light aria-expanded:text-text-primary",
        ghost:
          "hover:bg-surface-1 hover:text-text-primary aria-expanded:bg-surface-1 aria-expanded:text-text-primary",
        destructive:
          "bg-red-500/10 text-red-600 hover:bg-red-500/20 focus-visible:border-red-500/40 focus-visible:ring-red-500/20",
        link: "text-primary-normal underline-offset-4 hover:underline",
        kakao:
          "bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/90 active:bg-[#FEE500]/80",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-4 px-2 text-xs in-data-[slot=button-group]:rounded-8 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-4 px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-8 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        cta: "h-12 w-full gap-2 rounded-12 px-4 text-base font-semibold [&_svg:not([class*='size-'])]:size-5",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-4 in-data-[slot=button-group]:rounded-8 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-4 in-data-[slot=button-group]:rounded-8",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
