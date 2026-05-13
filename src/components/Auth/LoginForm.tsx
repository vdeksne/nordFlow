"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";

import { NordflowLogo } from "@/components/Crm/NordflowLogo";
import { Button } from "@/components/Ui/Button";
import { Input } from "@/components/Ui/Input";
import { cn } from "@/lib/utils";

/** Legible on dark UI: tinted surface, visible rim, bright placeholders. */
const fieldClass = cn(
  "h-12 w-full rounded-none px-4 text-[15px] font-normal normal-case tracking-normal text-foreground",
  "border border-white/[0.12] bg-[color-mix(in_oklab,var(--secondary)_72%,transparent)]",
  "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.05)]",
  "[&::placeholder]:text-foreground/55 [&::placeholder]:opacity-100",
  "transition-[border-color,box-shadow,background-color]",
  "focus-visible:border-primary/55 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 focus-visible:outline-none",
  "dark:bg-[color-mix(in_oklab,var(--secondary)_65%,transparent)]",
);

export function LoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"form" | "preview">("form");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhase("preview");
  }, []);

  return (
    <div className={cn("mx-auto w-full max-w-[340px]", className)}>
      {/* Mobile: logo only */}
      <div className="mb-12 flex justify-center lg:hidden">
        <Link
          href="/dashboard"
          className="focus-visible:ring-primary rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          aria-label="NordFlow · Dashboard"
        >
          <NordflowLogo priority className="max-h-8" />
        </Link>
      </div>

      <div className="space-y-1 lg:pt-4">
        <p className="text-muted-foreground font-mono text-[10px] tracking-[0.28em] uppercase">
          Sign in
        </p>
        <h1 className="text-foreground text-[1.65rem] font-medium tracking-[-0.03em] sm:text-3xl">
          {phase === "form" ? "Welcome back" : "Ready"}
        </h1>
        <p className="text-muted-foreground pt-2 text-[13px] leading-relaxed">
          {phase === "form"
            ? "UI-only preview. Connect your auth provider later."
            : "Credentials would post here in production."}
        </p>
      </div>

      {phase === "preview" ? (
        <div className="mt-12 space-y-6">
          <p className="text-foreground/90 border-l-2 border-primary/50 pl-4 text-sm leading-relaxed">
            Mock login, no data sent. Plug in Supabase Auth, Clerk, or Auth0.
          </p>
          <Button
            type="button"
            variant="solid"
            size="lg"
            className="h-12 w-full gap-2 text-[13px]"
            onClick={() => router.push("/dashboard")}
          >
            Continue
            <ArrowRight className="size-4 opacity-90" aria-hidden />
          </Button>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground w-full text-center text-[13px] transition-colors"
            onClick={() => setPhase("form")}
          >
            Back
          </button>
        </div>
      ) : (
        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="login-email" className="sr-only">
                Email
              </label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="login-password" className="sr-only">
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-[13px]">
            <label className="text-muted-foreground flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                className="border-white/15 accent-primary size-3.5 rounded-none border bg-transparent"
              />
              <span>Remember</span>
            </label>
            <button
              type="button"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot?
            </button>
          </div>

          <Button
            type="submit"
            variant="solid"
            size="lg"
            className="h-12 w-full text-[13px]"
          >
            Continue
          </Button>

          <div className="flex items-center gap-4 pt-2">
            <span className="bg-white/[0.06] h-px flex-1" />
            <span className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
              Or
            </span>
            <span className="bg-white/[0.06] h-px flex-1" />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="text-muted-foreground hover:text-foreground h-11 flex-1 border-white/[0.12] bg-transparent text-[13px] font-normal normal-case tracking-normal"
              onClick={() => setPhase("preview")}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="text-muted-foreground hover:text-foreground h-11 flex-1 border-white/[0.12] bg-transparent text-[13px] font-normal normal-case tracking-normal"
              onClick={() => setPhase("preview")}
            >
              Microsoft
            </Button>
          </div>
        </form>
      )}

      <p className="text-muted-foreground mt-14 text-center text-[13px]">
        <Link
          href="/pricing"
          className="text-primary hover:text-primary/85 font-medium underline-offset-4 transition-colors hover:underline"
        >
          Pricing
        </Link>
        <span className="text-muted-foreground/80 px-2">·</span>
        New here?{" "}
        <Link
          href="/register"
          className="text-foreground hover:text-primary font-medium underline-offset-4 transition-colors hover:underline"
        >
          Create account
        </Link>
      </p>

      <p className="text-muted-foreground/70 mt-8 text-center text-[11px]">
        <Link href="/dashboard" className="transition-colors hover:text-foreground">
          Skip to dashboard
        </Link>
      </p>
    </div>
  );
}
