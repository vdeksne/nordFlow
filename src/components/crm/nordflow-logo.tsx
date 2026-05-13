import Image from "next/image";

import { cn } from "@/lib/utils";

type NordflowLogoProps = {
  className?: string;
  /** Smaller lockup for dense headers */
  compact?: boolean;
  priority?: boolean;
};

/** Brand mark + wordmark from `/public/LOGO_NORDFLOW.svg` (white artwork, use on dark surfaces). */
export function NordflowLogo({
  className,
  compact = false,
  priority = false,
}: NordflowLogoProps) {
  return (
    <Image
      src="/LOGO_NORDFLOW.svg"
      alt="Nordflow"
      width={164}
      height={97}
      priority={priority}
      className={cn(
        "h-auto w-auto shrink-0 object-left object-contain",
        compact ? "max-h-7 max-w-[112px]" : "max-h-8 max-w-[132px] sm:max-h-9 sm:max-w-[148px]",
        className,
      )}
    />
  );
}
