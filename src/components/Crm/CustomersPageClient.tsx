"use client";

import { AddCustomerSheet } from "@/components/Crm/AddCustomerSheet";
import { CustomerPortfolioSection } from "@/components/Crm/CustomerPortfolioSection";
import { ImportCustomersCsvSheet } from "@/components/Crm/ImportCustomersCsvSheet";
import { useCustomers } from "@/components/Crm/CustomersContext";

export function CustomersPageClient() {
  const { customers } = useCustomers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <AddCustomerSheet />
        <ImportCustomersCsvSheet />
      </div>
      <CustomerPortfolioSection rows={customers} />
    </div>
  );
}
