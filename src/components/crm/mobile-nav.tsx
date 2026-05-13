"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { AppSidebar } from "@/components/crm/app-sidebar";
import { NordflowLogo } from "@/components/crm/nordflow-logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  /** Storybook / previews only, bypass `lg:hidden` so the bar is visible on desktop canvas */
  forceVisible?: boolean;
};

export function MobileNav({ forceVisible }: MobileNavProps = {}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "mobile-nav-root border-sidebar-border bg-sidebar flex items-center justify-between border-b border-white/[0.05] px-4 py-3.5",
        !forceVisible && "lg:hidden",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Link
          href="/dashboard"
          className="focus-visible:ring-primary shrink-0 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar focus-visible:outline-none"
          aria-label="Nordflow · Dashboard"
        >
          <NordflowLogo compact className="max-h-6 max-w-[96px]" />
        </Link>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Nordflow CRM</p>
          <p className="text-muted-foreground truncate text-xs capitalize">
            {pathname.replace("/", "") || "dashboard"}
          </p>
        </div>
      </div>
      <Sheet>
        <SheetTrigger
          type="button"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon-sm" }),
            "border-sidebar-border size-11 min-h-[44px] min-w-[44px] bg-card/70 sm:size-9 sm:min-h-0 sm:min-w-0",
          )}
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="border-sidebar-border w-[280px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <AppSidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
