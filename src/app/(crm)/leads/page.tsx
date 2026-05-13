import { CrmPage } from "@/components/crm/crm-page";
import { LeadsPageClient } from "@/components/crm/leads-page-client";

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
