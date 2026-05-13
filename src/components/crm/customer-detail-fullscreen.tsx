"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

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
            {customer?.companyName?.trim() || "Klienta kartīte"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Pilna klienta kartīte no portfeļa reģistra.
          </DialogPrimitive.Description>

          {customer ? (
            <>
              <header className="border-sidebar-border flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-5 sm:px-10">
                <div className="min-w-0 space-y-1">
                  <p className="text-primary text-[11px] font-semibold tracking-[0.14em] uppercase">
                    Klienta kartīte
                  </p>
                  <h2 className="text-foreground truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                    {customer.companyName ?? "—"}
                  </h2>
                  <p className="text-muted-foreground text-sm tabular-nums">
                    Reg. Nr.{" "}
                    <span className="text-foreground font-medium">
                      {customer.registrationNumber != null &&
                      customer.registrationNumber !== ""
                        ? String(customer.registrationNumber)
                        : "—"}
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
                      className="border-white/[0.1] shrink-0 rounded-xl"
                      aria-label="Aizvērt"
                    />
                  }
                >
                  <XIcon className="size-4" />
                </DialogPrimitive.Close>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-10 sm:py-10">
                <div className="mx-auto max-w-6xl space-y-12 pb-16">
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
              Nav izvēlēta kartīte.
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
