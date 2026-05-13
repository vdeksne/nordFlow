"use client";

import { AddDealSheet } from "@/components/crm/add-deal-sheet";
import { PipelineBoard } from "@/components/crm/pipeline-board";
import { useDeals } from "@/components/crm/deals-context";

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
