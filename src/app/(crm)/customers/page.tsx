import { CustomersPageClient } from "@/components/Crm/CustomersPageClient";
import { CrmPage } from "@/components/Crm/CrmPage";

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
