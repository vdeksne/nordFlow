import Link from "next/link";

import { NordflowLogo } from "@/components/Crm/NordflowLogo";
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

/** Login: ultra-minimal brand strip. Register: fuller story + bullets. */
export function AuthMarketingPanel({
  variant,
  className,
}: AuthMarketingPanelProps) {
  if (variant === "login") {
    return (
      <div
        className={cn(
          "relative hidden min-h-0 overflow-x-hidden overflow-y-auto lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-white/[0.04] lg:p-12 xl:p-16",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute top-1/2 left-1/2 size-[min(90vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-none opacity-40 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 62%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(165deg,rgb(255_255_255/0.03)_0%,transparent_45%)]" />
        </div>

        <div className="relative">
          <Link
            href="/dashboard"
            className="focus-visible:ring-primary inline-block rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
          >
            <NordflowLogo priority className="max-h-28 w-auto max-w-[min(100%,360px)] xl:max-h-36 xl:max-w-[min(100%,440px)] opacity-95" />
          </Link>
        </div>

        <div className="relative mt-auto max-w-[min(100%,380px)] space-y-8 pt-24">
          <div className="space-y-4">
            <p className="text-foreground text-[clamp(2rem,4vw,2.75rem)] font-light leading-[1.08] tracking-tight">
              Grants,
              <br />
              <span className="text-primary/95 font-normal">without the scramble.</span>
            </p>
            <p className="text-muted-foreground text-[13px] leading-relaxed tracking-wide text-pretty">
              NordFlow helps independent grant consultants automate follow-ups,
              stay on top of deadlines, and win more work—with less inbox chaos.
            </p>
          </div>

          <p className="text-muted-foreground text-[13px] leading-relaxed tracking-wide">
            <Link
              href="/pricing"
              className="text-primary hover:text-primary/85 font-medium underline-offset-4 transition-colors hover:underline"
            >
              View pricing
            </Link>
            <span className="text-muted-foreground"> · </span>
            Demo shell — wire billing & auth when you ship.
          </p>
        </div>

        <p className="text-muted-foreground/80 relative pt-16 text-[11px] tracking-wide lg:pt-8">
          © {new Date().getFullYear()} NordFlow
        </p>
      </div>
    );
  }

  const headline = "Create your NordFlow workspace";
  const sub =
    "Built for independent grant consultants who want follow-ups on autopilot and a pipeline that stays legible. Wire Supabase Auth or Clerk when you go live.";

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
          className="absolute -left-24 top-24 size-[520px] rounded-none blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 24%, transparent), transparent 68%)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 size-[440px] rounded-none blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--chart-3) 22%, transparent), transparent 65%)",
          }}
        />
      </div>

      <div className="relative space-y-10">
        <Link
          href="/dashboard"
          className="focus-visible:ring-primary inline-block rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar focus-visible:outline-none"
        >
          <NordflowLogo priority className="max-h-28 w-auto max-w-[min(100%,360px)] xl:max-h-36 xl:max-w-[min(100%,440px)]" />
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
              <span className="bg-primary/12 text-primary mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-none ring-1 ring-primary/25">
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
        © {new Date().getFullYear()} NordFlow · Hackathon demo shell
      </p>
    </div>
  );
}
