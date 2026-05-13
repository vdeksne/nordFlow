"use client";

import { useMemo } from "react";

import {
  portfolioCellValue,
  portfolioGroupTitleForColumn,
  visibleCustomerPortfolioColumns,
} from "@/lib/crm/customer-portfolio-columns";
import type { CustomerPortfolio } from "@/lib/crm/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Ui/Table";
import { formatEur } from "@/lib/format";
import { cn } from "@/lib/utils";

type CustomerPortfolioTableProps = {
  rows: CustomerPortfolio[];
  scrollMaxHeightClass?: string;
  className?: string;
  selectedId?: string | null;
  onRowClick?: (row: CustomerPortfolio) => void;
};

export function CustomerPortfolioTable({
  rows,
  scrollMaxHeightClass = "max-h-[min(72vh,calc(100vh-12rem))]",
  className,
  selectedId,
  onRowClick,
}: CustomerPortfolioTableProps) {
  const columns = useMemo(
    () => visibleCustomerPortfolioColumns(rows),
    [rows],
  );

  return (
    <div
      className={cn(
        "border-sidebar-border hidden overflow-hidden rounded-none border border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_90%,transparent)] md:block",
        className,
      )}
    >
      <div className={cn(scrollMaxHeightClass, "overflow-auto")}>
        <Table className="w-max min-w-full caption-bottom text-sm">
          <TableHeader className="bg-background/98 sticky top-0 z-40 backdrop-blur-md">
            <TableRow className="border-sidebar-border hover:bg-transparent">
              {columns.map((col, i) => {
                const group = portfolioGroupTitleForColumn(col);
                const prevGroup =
                  i > 0 ? portfolioGroupTitleForColumn(columns[i - 1]!) : null;
                const showGroup = group !== prevGroup;
                const sticky =
                  col.sticky === "nr"
                    ? "sticky left-0 z-30 min-w-[3rem] border-r border-white/[0.06] bg-background/98 backdrop-blur-md px-3 py-3 shadow-[4px_0_12px_-8px_rgba(0,0,0,0.85)]"
                    : col.sticky === "company"
                      ? "sticky left-[3.25rem] z-20 min-w-[220px] max-w-[280px] border-r border-white/[0.06] bg-background/98 backdrop-blur-md px-3 py-3 shadow-[4px_0_12px_-8px_rgba(0,0,0,0.85)]"
                      : "min-w-[7rem] max-w-[14rem] px-3 py-3 whitespace-normal";

                return (
                  <TableHead
                    key={col.key}
                    className={cn(
                      "text-muted-foreground align-bottom font-normal",
                      sticky,
                    )}
                  >
                    {showGroup ? (
                      <span className="text-primary mb-1.5 block text-[10px] leading-tight font-semibold tracking-[0.12em] uppercase">
                        {group}
                      </span>
                    ) : (
                      <span className="mb-1.5 block h-[13px]" aria-hidden />
                    )}
                    <span className="text-foreground block text-xs leading-snug font-medium tracking-tight">
                      {col.label}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selectedId === row.id;
              const label =
                row.companyName?.trim() ||
                (row.registrationNumber != null
                  ? String(row.registrationNumber)
                  : "Client");

              return (
                <TableRow
                  key={row.id}
                  data-selected={isSelected ? "" : undefined}
                  aria-selected={isSelected}
                  tabIndex={onRowClick ? 0 : undefined}
                  role={onRowClick ? "button" : undefined}
                  className={cn(
                    "border-sidebar-border group hover:bg-muted/35",
                    onRowClick &&
                      "hover:bg-muted/45 cursor-pointer transition-colors focus-visible:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                    isSelected && "bg-primary/[0.07] hover:bg-primary/[0.1]",
                  )}
                  onClick={
                    onRowClick
                      ? (e) => {
                          e.preventDefault();
                          onRowClick(row);
                        }
                      : undefined
                  }
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                  aria-label={
                    onRowClick ? `Open record: ${label}` : undefined
                  }
                >
                {columns.map((col) => {
                  const sticky =
                    col.sticky === "nr"
                      ? "sticky left-0 z-10 bg-[color-mix(in_oklab,var(--card)_95%,transparent)] px-3 py-2.5 font-medium backdrop-blur-sm group-hover:bg-muted/45"
                      : col.sticky === "company"
                        ? "sticky left-[3.25rem] z-10 max-w-[280px] min-w-[220px] bg-[color-mix(in_oklab,var(--card)_95%,transparent)] px-3 py-2.5 font-medium backdrop-blur-sm group-hover:bg-muted/45"
                        : "max-w-[14rem] min-w-[7rem] px-3 py-2.5 text-muted-foreground";

                  const text = portfolioCellValue(row, col, formatEur);
                  const isWide =
                    col.key === "scope" ||
                    col.key === "sanctionsCheck" ||
                    col.key === "address";

                  return (
                    <TableCell
                      key={col.key}
                      className={cn(
                        "border-sidebar-border align-top text-[13px] leading-snug",
                        sticky,
                        isWide && "min-w-[240px]",
                        col.format === "eur" &&
                          "text-foreground text-right tabular-nums",
                      )}
                    >
                      {text}
                    </TableCell>
                  );
                })}
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
