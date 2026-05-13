"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { NordflowLogo } from "@/components/crm/nordflow-logo";
import { Button } from "@/components/ui/button";
import {
  portfolioCellValue,
  portfolioFieldsByGroup,
} from "@/lib/crm/customer-portfolio-columns";
import type { CustomerPortfolio } from "@/lib/crm/types";
import { formatEur } from "@/lib/format";
import { cn } from "@/lib/utils";

type CustomerDetailFullscreenProps = {
  customer: CustomerPortfolio | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CustomerDetailFullscreen({
  customer,
  open,
  onOpenChange,
}: CustomerDetailFullscreenProps) {
  const groups = portfolioFieldsByGroup();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/55 transition-opacity duration-200 supports-[backdrop-filter]:backdrop-blur-sm",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
          )}
        />
        <DialogPrimitive.Popup
          className={cn(
            "fixed inset-0 z-50 flex max-h-[100dvh] flex-col bg-background text-popover-foreground outline-none",
            "transition duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {customer?.companyName?.trim() || "Customer record"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Full customer record from the portfolio register.
          </DialogPrimitive.Description>

          {customer ? (
            <>
              <header className="border-sidebar-border flex shrink-0 items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-4 sm:gap-4 sm:px-10 sm:py-5">
                <div className="min-w-0 flex-1 space-y-2">
                  <NordflowLogo
                    compact
                    className="max-h-5 max-w-[88px] opacity-90"
                  />
                  <p className="text-primary text-[11px] font-semibold tracking-[0.14em] uppercase">
                    Customer record
                  </p>
                  <h2 className="text-foreground line-clamp-2 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                    {customer.companyName ?? "-"}
                  </h2>
                  <p className="text-muted-foreground text-xs tabular-nums sm:text-sm">
                    Reg. Nr.{" "}
                    <span className="text-foreground font-medium">
                      {customer.registrationNumber != null &&
                      customer.registrationNumber !== ""
                        ? String(customer.registrationNumber)
                        : "-"}
                    </span>
                    {customer.nr != null ? (
                      <>
                        {" "}
                        · Nr.{" "}
                        <span className="text-foreground font-medium">
                          {customer.nr}
                        </span>
                      </>
                    ) : null}
                  </p>
                </div>
                <DialogPrimitive.Close
                  render={
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="border-white/[0.1] size-11 min-h-[44px] min-w-[44px] shrink-0 rounded-xl sm:size-9 sm:min-h-0 sm:min-w-0"
                      aria-label="Close"
                    />
                  }
                >
                  <XIcon className="size-4" />
                </DialogPrimitive.Close>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 pb-28 sm:px-10 sm:py-10 sm:pb-16">
                <div className="mx-auto max-w-6xl space-y-12 pb-6 sm:pb-16">
                  {groups.map((group) => (
                    <section key={group.title} className="space-y-5">
                      <h3 className="text-primary border-sidebar-border border-b border-white/[0.06] pb-2 text-[11px] font-semibold tracking-[0.18em] uppercase">
                        {group.title}
                      </h3>
                      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                        {group.fields.map((field) => (
                          <div key={field.key} className="min-w-0 space-y-1.5">
                            <dt className="text-muted-foreground text-xs leading-snug font-medium">
                              {field.label}
                            </dt>
                            <dd
                              className={cn(
                                "text-foreground text-sm leading-relaxed break-words whitespace-pre-wrap",
                                field.format === "eur" &&
                                  "text-right tabular-nums sm:text-left",
                              )}
                            >
                              {portfolioCellValue(customer, field, formatEur)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground flex flex-1 items-center justify-center p-12 text-sm">
              No record selected.
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
