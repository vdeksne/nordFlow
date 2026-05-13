import Link from "next/link";

import { NordflowLogo } from "@/components/crm/nordflow-logo";
import { cn } from "@/lib/utils";
import { BarChart3, ShieldCheck, Zap } from "lucide-react";

const bullets = [
  {
    icon: Zap,
    title: "Fast pipeline reads",
    body: "Weighted forecast and stages without spreadsheet gymnastics.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-ready portfolio",
    body: "Customer registers that mirror how partners actually work.",
  },
  {
    icon: BarChart3,
    title: "Momentum at a glance",
    body: "Dashboard priorities align your team on what ships today.",
  },
] as const;

type AuthMarketingPanelProps = {
  variant: "login" | "register";
  className?: string;
};

export function AuthMarketingPanel({
  variant,
  className,
}: AuthMarketingPanelProps) {
  const headline =
    variant === "login"
      ? "Sign in to Nordflow CRM"
      : "Create your Nordflow workspace";

  const sub =
    variant === "login"
      ? "Modern cockpit for customers, leads, deals, and execution."
      : "Mock signup flow, wire Supabase Auth or Clerk when you go live.";

  return (
    <div
      className={cn(
        "relative hidden overflow-hidden border-white/[0.06] bg-[color-mix(in_oklab,var(--sidebar)_92%,transparent)] px-10 py-14 lg:flex lg:flex-col lg:justify-between lg:border-r lg:px-14 lg:py-16",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      >
        <div
          className="absolute -left-24 top-24 size-[520px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 24%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 size-[440px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--chart-3) 22%, transparent), transparent 65%)",
          }}
        />
      </div>

      <div className="relative space-y-10">
        <Link
          href="/dashboard"
          className="focus-visible:ring-primary inline-block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar focus-visible:outline-none"
        >
          <NordflowLogo priority className="max-h-10 max-w-[180px]" />
        </Link>

        <div className="space-y-4">
          <h1 className="text-foreground max-w-md text-3xl font-semibold tracking-tight text-balance lg:text-4xl lg:leading-[1.15]">
            {headline}
          </h1>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed">
            {sub}
          </p>
        </div>

        <ul className="max-w-md space-y-5">
          {bullets.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <span className="bg-primary/12 text-primary mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-primary/25">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-foreground font-medium">{title}</p>
                <p className="text-muted-foreground mt-1 text-sm leading-snug">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-muted-foreground relative mt-16 text-xs leading-relaxed lg:mt-0">
        © {new Date().getFullYear()} Nordflow · Hackathon demo shell
      </p>
    </div>
  );
}
