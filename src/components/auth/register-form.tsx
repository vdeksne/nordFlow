"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, UserRound } from "lucide-react";
import { useCallback, useState } from "react";

import { NordflowLogo } from "@/components/crm/nordflow-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function RegisterForm({ className }: { className?: string }) {
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
          {phase === "form" ? "Create an account" : "Verify & launch"}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {phase === "form"
            ? "Placeholder registration, no backend yet. Perfect for stakeholder demos."
            : "You would normally confirm email and provision a tenant here."}
        </p>

        {phase === "preview" ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-3 text-sm leading-relaxed text-foreground">
              Mock signup complete. Swap this screen for an email OTP or SSO
              handshake.
            </div>
            <Button
              type="button"
              className="h-11 w-full rounded-xl gap-2 text-base font-semibold"
              onClick={() => router.push("/dashboard")}
            >
              Enter workspace (demo)
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground w-full text-center text-sm font-medium transition-colors"
              onClick={() => setPhase("form")}
            >
              Edit details
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="register-name"
                className="text-foreground text-xs font-semibold"
              >
                Full name
              </label>
              <div className="relative">
                <UserRound
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  id="register-name"
                  autoComplete="name"
                  placeholder="Alex Nordstrom"
                  className="h-11 rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] pl-10 text-base md:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="register-email"
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
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-11 rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] pl-10 text-base md:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="register-password"
                className="text-foreground text-xs font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="h-11 rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] pl-10 text-base md:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="register-confirm"
                className="text-foreground text-xs font-semibold"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  id="register-confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  className="h-11 rounded-xl border-white/[0.1] bg-[color-mix(in_oklab,var(--card)_40%,transparent)] pl-10 text-base md:text-sm"
                />
              </div>
            </div>

            <label className="text-muted-foreground flex cursor-pointer items-start gap-2.5 text-sm leading-snug">
              <input
                type="checkbox"
                className="border-input bg-background accent-primary mt-0.5 size-4 shrink-0 rounded border"
              />
              I agree to the Terms and Privacy policy (demo checkbox).
            </label>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl text-base font-semibold shadow-[0_0_40px_-14px_var(--primary)]"
            >
              Create account
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="border-sidebar-border w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs font-medium">
                <span className="bg-[color-mix(in_oklab,var(--card)_88%,transparent)] text-muted-foreground px-3">
                  Or sign up with
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
          Already have access?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/85 font-semibold transition-colors"
          >
            Sign in
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
