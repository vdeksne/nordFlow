import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-none border border-transparent bg-transparent text-[11px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 aria-invalid:border-destructive aria-invalid:ring-destructive/25 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-0 border-b border-primary px-0 pb-1 text-primary shadow-none hover:border-primary/55 hover:text-primary/85",
        solid:
          "border border-primary bg-primary px-6 py-2.5 text-primary-foreground tracking-[0.16em] shadow-none hover:bg-primary/88",
        outline:
          "border-0 border-b border-white/22 px-0 pb-1 text-foreground/90 hover:border-primary/45 hover:text-primary",
        secondary:
          "border border-white/[0.14] px-4 py-2 normal-case tracking-[0.12em] text-foreground hover:bg-white/[0.04]",
        ghost:
          "border-0 border-b border-transparent px-0 pb-1 text-muted-foreground hover:border-white/25 hover:text-foreground",
        destructive:
          "border-0 border-b border-destructive/70 px-0 pb-1 text-destructive hover:border-destructive hover:text-destructive",
        link:
          "border-0 px-0 pb-0 normal-case tracking-normal text-sm font-medium text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-9 px-1 py-2",
        xs: "min-h-8 gap-1 px-1 py-1.5 text-[10px] tracking-[0.2em] [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-8 gap-1.5 px-1 py-2 text-[10px] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-11 gap-2 px-2 py-2.5 text-xs tracking-[0.16em]",
        icon: "size-9 min-h-0 p-0 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs":
          "size-6 min-h-0 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 min-h-0 p-0 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg":
          "size-10 min-h-0 p-0 [&_svg:not([class*='size-'])]:size-[18px]",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        class:
          "border border-primary border-b border-primary bg-primary px-0 pb-0 text-primary-foreground hover:bg-primary/88 hover:text-primary-foreground",
      },
      {
        variant: "outline",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        class:
          "border border-white/[0.14] border-b border-white/[0.14] bg-[color-mix(in_oklab,var(--card)_45%,transparent)] pb-0 normal-case tracking-[0.1em] text-foreground hover:bg-muted/35 hover:text-foreground",
      },
      {
        variant: "secondary",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        class:
          "border border-white/[0.14] border-b border-white/[0.14] pb-0 tracking-[0.12em]",
      },
      {
        variant: "ghost",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        class:
          "border border-transparent border-b-transparent pb-0 normal-case tracking-normal text-muted-foreground hover:border-white/18 hover:bg-white/[0.04] hover:text-foreground",
      },
      {
        variant: "destructive",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        class:
          "border border-destructive/35 border-b border-destructive/35 bg-destructive/10 pb-0 normal-case tracking-normal text-destructive hover:bg-destructive/18",
      },
      {
        variant: "solid",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        class:
          "border-primary bg-primary pb-0 normal-case tracking-normal text-primary-foreground hover:bg-primary/88",
      },
      {
        variant: "link",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        class:
          "border-transparent pb-0 normal-case tracking-normal [&_svg]:size-4",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
