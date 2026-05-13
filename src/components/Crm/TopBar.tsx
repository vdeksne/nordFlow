import Link from "next/link";

import { NordflowLogo } from "@/components/Crm/NordflowLogo";
import { TopBarProfileLink } from "@/components/Crm/TopBarProfileLink";
import { Button } from "@/components/Ui/Button";
import { Input } from "@/components/Ui/Input";
import { Bell, Search } from "lucide-react";

type TopBarProps = {
  title: string;
  subtitle?: string;
};

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="relative z-30 flex flex-col gap-2.5 border-b border-white/[0.05] bg-[color-mix(in_oklab,var(--background)_97%,transparent)] px-4 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_94%,transparent)] md:sticky md:top-0 md:gap-4 md:py-5 sm:flex-row sm:items-start sm:justify-between sm:px-8">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:gap-5">
        <Link
          href="/dashboard"
          className="focus-visible:ring-primary hidden w-fit shrink-0 rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none lg:inline-flex"
          aria-label="NordFlow · Dashboard"
        >
          <NordflowLogo className="max-h-8 sm:max-h-9 lg:max-h-17 lg:max-w-[268px] xl:max-h-19 xl:max-w-[300px] 2xl:max-h-21 2xl:max-w-[332px]" />
        </Link>
        <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
          <h1 className="text-foreground text-base font-semibold tracking-[-0.02em] sm:text-lg md:text-[1.65rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-muted-foreground max-w-xl text-xs leading-relaxed max-[380px]:hidden sm:text-sm">
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
            className="focus-visible:ring-primary h-11 min-h-[44px] rounded-none border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)] py-2 pl-10 text-base shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)] placeholder:text-muted-foreground/70 sm:h-10 sm:min-h-0 sm:text-sm"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-11 min-h-[44px] min-w-[44px] rounded-none border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] text-foreground hover:bg-muted/80 sm:size-10 sm:min-h-0 sm:min-w-0"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </Button>
          <TopBarProfileLink />
        </div>
      </div>
    </header>
  );
}
