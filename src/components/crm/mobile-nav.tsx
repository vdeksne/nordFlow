"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { AppSidebar } from "@/components/crm/app-sidebar";
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
  /** Storybook / previews only — bypass `lg:hidden` so the bar is visible on desktop canvas */
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
      <div>
        <p className="text-sm font-semibold">CRM Workspace</p>
        <p className="text-muted-foreground text-xs capitalize">
          {pathname.replace("/", "") || "dashboard"}
        </p>
      </div>
      <Sheet>
        <SheetTrigger
          type="button"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon-sm" }),
            "border-sidebar-border bg-card/70",
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
