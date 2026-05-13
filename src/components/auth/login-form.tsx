"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useCallback, useState } from "react";

import { NordflowLogo } from "@/components/crm/nordflow-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function LoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"form" | "preview">("form");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhase("preview");
  }, []);

  return (
    <div className={cn("mx-auto w-full max-w-[400px]", className)}>
      <div className="mb-8 lg:hidden">
        <Link
          href="/dashboard"
          className="focus-visible:ring-primary inline-block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <NordflowLogo priority />
        </Link>
      </div>

      <div className="rounded-[1.25rem] border border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] p-8 shadow-[0_32px_90px_-52px_color-mix(in_oklab,var(--primary)_45%,transparent)] backdrop-blur-xl sm:p-9">
        <p className="text-primary mb-2 text-[11px] font-bold tracking-[0.2em] uppercase">
          Preview
        </p>
        <h2 className="text-foreground text-2xl font-semibold tracking-tight">
          {phase === "form" ? "Welcome back" : "Almost there"}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {phase === "form"
            ? "Sign in with your work email. Auth is UI-only until you connect a provider."
            : "In production this step exchanges credentials for a secure session."}
        </p>

        {phase === "preview" ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-primary/25 bg-primary/[0.08] px-4 py-3 text-sm leading-relaxed text-foreground">
              Mock login, no data sent. Hook this form to Supabase Auth,
              Clerk, or Auth0 next.
            </div>
            <Button
              type="button"
              className="h-11 w-full rounded-xl gap-2 text-base font-semibold"
              onClick={() => router.push("/dashboard")}
            >
              Continue to app (demo)
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground w-full text-center text-sm font-medium transition-colors"
              onClick={() => setPhase("form")}
            >
              Back to form
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="text-foreground text-xs font-semibold"
              >
                Work email
              </label>
              <div className="relative">
                <Mail
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-11 rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] pl-10 text-base md:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="login-password"
                  className="text-foreground text-xs font-semibold"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-primary hover:text-primary/85 text-xs font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] pl-10 text-base md:text-sm"
                />
              </div>
            </div>

            <label className="text-muted-foreground flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                className="border-input bg-background accent-primary size-4 rounded border"
              />
              Remember this device
            </label>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl text-base font-semibold shadow-[0_0_40px_-14px_var(--primary)]"
            >
              Sign in
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="border-sidebar-border w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs font-medium">
                <span className="bg-[color-mix(in_oklab,var(--card)_88%,transparent)] text-muted-foreground px-3">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-white/[0.1]"
                onClick={() => setPhase("preview")}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-white/[0.1]"
                onClick={() => setPhase("preview")}
              >
                Microsoft
              </Button>
            </div>
          </form>
        )}

        <p className="text-muted-foreground mt-8 text-center text-sm">
          No account?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-primary/85 font-semibold transition-colors"
          >
            Register
          </Link>
        </p>
      </div>

      <p className="text-muted-foreground mt-8 text-center text-xs">
        <Link href="/dashboard" className="underline-offset-4 hover:underline">
          Skip preview → Dashboard
        </Link>
      </p>
    </div>
  );
}
