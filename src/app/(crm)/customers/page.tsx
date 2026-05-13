import { CustomersPageClient } from "@/components/crm/customers-page-client";
import { CrmPage } from "@/components/crm/crm-page";

export default function CustomersPage() {
  return (
    <CrmPage
      title="Customer portfolio"
      subtitle="All columns from the client register portfolio sheet. Add customers manually or import CSV. Tap or click a row to open the full-screen record."
    >
      <CustomersPageClient />
    </CrmPage>
  );
}
