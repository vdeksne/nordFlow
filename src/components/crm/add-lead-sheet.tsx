"use client";

import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { LeadStage } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

import { useLeads } from "./leads-context";

const LEAD_STAGE_OPTIONS: { value: LeadStage; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "lost", label: "Lost" },
];

export function AddLeadSheet() {
  const { addLead } = useLeads();
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<LeadStage>("new");
  const [valueEur, setValueEur] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setCompany("");
    setContactName("");
    setEmail("");
    setStage("new");
    setValueEur("");
    setOwner("");
    setError(null);
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next) reset();
    },
    [reset],
  );

  const handleSubmit = useCallback(() => {
    const co = company.trim();
    if (!co) {
      setError("Company name is required.");
      return;
    }
    const parsed = Number(valueEur.replace(/\u00a0/g, "").replace(/\s/g, "").replace(",", "."));
    const euros = Number.isFinite(parsed) ? parsed : 0;

    addLead({
      company: co,
      contactName,
      email,
      stage,
      valueEur: euros,
      owner,
    });
    handleOpenChange(false);
  }, [
    addLead,
    company,
    contactName,
    email,
    handleOpenChange,
    owner,
    stage,
    valueEur,
  ]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        type="button"
        className={cn(buttonVariants({ variant: "default" }), "gap-1.5")}
      >
        <Plus className="size-4" aria-hidden />
        Add lead
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 sm:max-w-md"
      >
        <SheetHeader className="border-sidebar-border shrink-0 border-b px-6 py-4">
          <SheetTitle>New lead</SheetTitle>
          <SheetDescription>
            Capture a prospect. It appears in the leads table immediately.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          <div className="space-y-1.5">
            <label
              htmlFor="lead-company"
              className="text-foreground text-xs font-semibold"
            >
              Company<span className="text-primary"> *</span>
            </label>
            <Input
              id="lead-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Nordic SaaS Labs"
              className="h-10 rounded-xl border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)]"
              autoComplete="organization"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="lead-contact"
              className="text-muted-foreground text-xs font-medium"
            >
              Contact name
            </label>
            <Input
              id="lead-contact"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Primary contact"
              className="h-10 rounded-xl border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)]"
              autoComplete="name"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="lead-email"
              className="text-muted-foreground text-xs font-medium"
            >
              Email
            </label>
            <Input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="h-10 rounded-xl border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)]"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <span className="text-muted-foreground text-xs font-medium">
              Stage
            </span>
            <div className="flex flex-wrap gap-2">
              {LEAD_STAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStage(opt.value)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-xl border-white/[0.1]",
                    stage === opt.value &&
                      "border-primary/45 bg-primary/[0.12] text-primary",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="lead-value"
              className="text-muted-foreground text-xs font-medium"
            >
              Est. value (EUR)
            </label>
            <Input
              id="lead-value"
              inputMode="decimal"
              value={valueEur}
              onChange={(e) => setValueEur(e.target.value)}
              placeholder="0"
              className="h-10 rounded-xl border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)] tabular-nums"
              autoComplete="off"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="lead-owner"
              className="text-muted-foreground text-xs font-medium"
            >
              Owner
            </label>
            <Input
              id="lead-owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Defaults to You"
              className="h-10 rounded-xl border-white/[0.08] bg-[color-mix(in_oklab,var(--card)_55%,transparent)]"
              autoComplete="name"
            />
          </div>
        </div>

        {error ? (
          <p className="text-destructive shrink-0 px-6 text-sm">{error}</p>
        ) : null}

        <SheetFooter className="border-sidebar-border shrink-0 flex-row justify-end gap-2 border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Add lead
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
