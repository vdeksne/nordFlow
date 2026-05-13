import { CrmPage } from "@/components/crm/crm-page";
import { PipelinePageClient } from "@/components/crm/pipeline-page-client";

export default function PipelinePage() {
  return (
    <CrmPage
      title="Pipeline"
      subtitle="Minimal forecast board, stage spine, weighted totals, and confidence orbits. Hover cards for the aurora edge."
    >
      <PipelinePageClient />
    </CrmPage>
  );
}
