"use client";

import { AddDealSheet } from "@/components/Crm/AddDealSheet";
import { PipelineBoard } from "@/components/Crm/PipelineBoard";
import { useDeals } from "@/components/Crm/DealsContext";

export function PipelinePageClient() {
  const { deals } = useDeals();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <AddDealSheet />
      </div>
      <PipelineBoard deals={deals} />
    </div>
  );
}
