"use client";

import { AddCustomerSheet } from "@/components/crm/add-customer-sheet";
import { CustomerPortfolioSection } from "@/components/crm/customer-portfolio-section";
import { ImportCustomersCsvSheet } from "@/components/crm/import-customers-csv-sheet";
import { useCustomers } from "@/components/crm/customers-context";

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
