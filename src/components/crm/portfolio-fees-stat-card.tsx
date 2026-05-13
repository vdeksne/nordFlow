"use client";

import { Users } from "lucide-react";

import { StatCard } from "@/components/crm/stat-card";
import { useCustomers } from "@/components/crm/customers-context";
import { formatEur } from "@/lib/format";

export function PortfolioFeesStatCard() {
  const { customers } = useCustomers();
  const total = customers.reduce((sum, c) => sum + (c.feeEur ?? 0), 0);

  return (
    <StatCard
      title="Portfolio fees (EUR)"
      value={formatEur(total)}
      hint={`${customers.length} customer record${customers.length === 1 ? "" : "s"} · contract fees`}
      icon={Users}
    />
  );
}
