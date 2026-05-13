import { CrmPage } from "@/components/Crm/CrmPage";
import { LeadsPageClient } from "@/components/Crm/LeadsPageClient";

export default function LeadsPage() {
  return (
    <CrmPage
      title="Leads"
      subtitle="Top-of-funnel momentum with stage-aware badges and projected revenue."
    >
      <LeadsPageClient />
    </CrmPage>
  );
}
