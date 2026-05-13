import { CrmPage } from "@/components/Crm/CrmPage";
import { PipelinePageClient } from "@/components/Crm/PipelinePageClient";

export default function PipelinePage() {
  return (
    <CrmPage
      title="Pipeline"
      subtitle="Forecast board with stage spine and weighted totals. Cards stay calm so you can scan deal health fast."
    >
      <PipelinePageClient />
    </CrmPage>
  );
}
