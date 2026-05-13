"use client";

import { ChevronRight } from "lucide-react";

import type { CustomerPortfolio } from "@/lib/crm/types";
import { formatEur } from "@/lib/format";
import { cn } from "@/lib/utils";

type CustomerPortfolioMobileListProps = {
  rows: CustomerPortfolio[];
  selectedId?: string | null;
  onRowClick?: (row: CustomerPortfolio) => void;
};

export function CustomerPortfolioMobileList({
  rows,
  selectedId,
  onRowClick,
}: CustomerPortfolioMobileListProps) {
  return (
    <div className="space-y-3 md:hidden">
      <p className="text-muted-foreground flex items-center gap-2 px-0.5 text-[11px] leading-snug">
        <span className="bg-primary/15 text-primary rounded-none px-2 py-0.5 font-semibold tracking-wide uppercase">
          Mobile
        </span>
        Tap a card for the full portfolio view, optimized for thumbs, no sideways
        scrolling.
      </p>
      <ul className="flex list-none flex-col gap-3 p-0">
        {rows.map((row) => {
          const label =
            row.companyName?.trim() ||
            (row.registrationNumber != null
              ? String(row.registrationNumber)
              : "Client");
          const isSelected = selectedId === row.id;
          const feeText =
            row.feeEur != null && Number.isFinite(row.feeEur)
              ? formatEur(row.feeEur)
              : "-";

          return (
            <li key={row.id}>
              <button
                type="button"
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-sidebar-border flex w-full min-h-[4.5rem] touch-manipulation flex-col gap-2 rounded-none border border-white/[0.07] bg-[color-mix(in_oklab,var(--card)_92%,transparent)] p-4 text-left shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)] backdrop-blur-md transition-[transform,box-shadow,border-color] active:scale-[0.99]",
                  "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                  isSelected &&
                    "border-primary/35 bg-primary/[0.08]",
                )}
                aria-label={`Open record: ${label}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-muted-foreground font-mono text-xs font-semibold tabular-nums">
                        #{row.nr ?? "-"}
                      </span>
                      <span className="text-foreground line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight">
                        {row.companyName ?? "-"}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Reg.&nbsp;
                      <span className="text-foreground/90 font-medium">
                        {row.registrationNumber ?? "-"}
                      </span>
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-primary text-base font-semibold tabular-nums">
                      {feeText}
                    </p>
                    <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
                      Fee
                    </p>
                  </div>
                </div>
                {row.scope ? (
                  <p className="text-muted-foreground line-clamp-2 border-sidebar-border border-t border-white/[0.05] pt-2 text-xs leading-relaxed">
                    {row.scope}
                  </p>
                ) : null}
                <div className="text-primary flex items-center justify-end gap-1 text-[11px] font-semibold">
                  Full record
                  <ChevronRight className="size-3.5 shrink-0 opacity-90" aria-hidden />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
