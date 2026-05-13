import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  trend?: { label: string; positive?: boolean };
  className?: string;
};

export function StatCard({
  title,
  value,
  hint,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] shadow-none backdrop-blur-md",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <CardTitle className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
          {title}
        </CardTitle>
        <span className="bg-primary/[0.12] text-primary ring-white/[0.08] inline-flex size-10 items-center justify-center rounded-xl ring-1 shadow-[0_0_24px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent)]">
          <Icon className="size-[18px]" aria-hidden />
        </span>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-foreground text-[1.85rem] font-semibold tracking-[-0.03em] sm:text-3xl">
          {value}
        </p>
        {hint ? (
          <p className="text-muted-foreground text-sm leading-snug">{hint}</p>
        ) : null}
        {trend ? (
          <p
            className={cn(
              "text-xs font-medium",
              trend.positive === false
                ? "text-destructive"
                : "text-primary",
            )}
          >
            {trend.label}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
