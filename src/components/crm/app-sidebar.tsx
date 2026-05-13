"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  KanbanSquare,
  LayoutDashboard,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/leads", label: "Leads", icon: UserPlus },
  { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[inset_-1px_0_0_rgb(255_255_255/0.04)] flex h-full w-full flex-col border-r">
      <div className="flex items-center gap-3 px-5 py-7">
        <span className="bg-primary text-primary-foreground shadow-[0_0_28px_-4px_color-mix(in_oklab,var(--primary)_65%,transparent)] inline-flex size-10 items-center justify-center rounded-xl">
          <Sparkles className="size-[18px]" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-[13px] font-semibold tracking-tight">CRM Workspace</p>
          <p className="text-muted-foreground text-[11px] tracking-wide uppercase">
            Hackathon
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 pb-6">
        <p className="text-muted-foreground px-3 pb-2 text-[10px] font-semibold tracking-[0.18em] uppercase">
          Modules
        </p>
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                active
                  ? "from-primary/[0.12] text-sidebar-accent-foreground via-sidebar-accent/90 shadow-[inset_0_0_0_1px_rgb(148_163_184/0.12)] bg-gradient-to-r to-transparent"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-sidebar-border mt-auto border-t border-white/[0.04] px-5 py-5">
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          Connect Supabase to sync accounts. MVP ships with curated demo data.
        </p>
      </div>
    </aside>
  );
}
