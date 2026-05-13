"use client";

import { useCallback, useState } from "react";

import { CustomerDetailFullscreen } from "@/components/crm/customer-detail-fullscreen";
import { CustomerPortfolioMobileList } from "@/components/crm/customer-portfolio-mobile-list";
import { CustomerPortfolioTable } from "@/components/crm/customer-portfolio-table";
import type { CustomerPortfolio } from "@/lib/crm/types";

type CustomerPortfolioSectionProps = {
  rows: CustomerPortfolio[];
  scrollMaxHeightClass?: string;
  className?: string;
};

export function CustomerPortfolioSection({
  rows,
  scrollMaxHeightClass,
  className,
}: CustomerPortfolioSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = rows.find((r) => r.id === selectedId) ?? null;
  const dialogOpen = selected !== null;

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSelectedId(null);
    }
  }, []);

  const openRow = useCallback((row: CustomerPortfolio) => {
    setSelectedId(row.id);
  }, []);

  return (
    <>
      <CustomerPortfolioMobileList
        rows={rows}
        selectedId={selectedId}
        onRowClick={openRow}
      />
      <CustomerPortfolioTable
        rows={rows}
        scrollMaxHeightClass={scrollMaxHeightClass}
        className={className}
        selectedId={selectedId}
        onRowClick={openRow}
      />
      <CustomerDetailFullscreen
        customer={selected}
        open={dialogOpen}
        onOpenChange={handleOpenChange}
      />
    </>
  );
}
