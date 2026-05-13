import Link from "next/link";

import { NordflowLogo } from "@/components/crm/nordflow-logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

type TopBarProps = {
  title: string;
  subtitle?: string;
};

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-white/[0.06] bg-[color-mix(in_oklab,var(--background)_82%,transparent)] px-4 py-4 backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_72%,transparent)] sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:py-5">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
        <Link
          href="/dashboard"
          className="focus-visible:ring-primary inline-flex w-fit shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          aria-label="Nordflow · Dashboard"
        >
          <NordflowLogo className="max-h-8 sm:max-h-9" />
        </Link>
        <div className="min-w-0 flex-1 space-y-1">
          <h1 className="text-foreground text-lg font-semibold tracking-[-0.02em] sm:text-[1.65rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="relative min-w-0 flex-[1_1_100%] sm:flex-[unset] sm:min-w-[200px] sm:max-w-xs">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 opacity-80"
            aria-hidden
          />
          <Input
            placeholder="Search records…"
            className="focus-visible:ring-primary h-11 min-h-[44px] rounded-xl border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)] py-2 pl-10 text-base shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)] placeholder:text-muted-foreground/70 sm:h-10 sm:min-h-0 sm:text-sm"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-11 min-h-[44px] min-w-[44px] rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] text-foreground hover:bg-muted/80 sm:size-10 sm:min-h-0 sm:min-w-0"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </Button>
          <Avatar className="ring-primary/25 size-11 ring-2 sm:size-10">
            <AvatarFallback className="bg-accent text-foreground text-xs font-semibold">
              VK
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
