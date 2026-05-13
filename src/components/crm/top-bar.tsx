import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TopBarProps = {
  title: string;
  subtitle?: string;
};

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-white/[0.06] bg-[color-mix(in_oklab,var(--background)_82%,transparent)] px-4 py-5 backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_72%,transparent)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-semibold tracking-[-0.02em] sm:text-[1.65rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 opacity-80"
            aria-hidden
          />
          <Input
            placeholder="Search records…"
            className="focus-visible:ring-primary h-10 rounded-xl border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)] pl-10 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)] placeholder:text-muted-foreground/70"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] text-foreground hover:bg-muted/80"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </Button>
        <Avatar className="ring-primary/25 size-10 ring-2">
          <AvatarFallback className="bg-accent text-foreground text-xs font-semibold">
            VK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
