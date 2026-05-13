import { CrmPage } from "@/components/crm/crm-page";
import { PipelineBoard } from "@/components/crm/pipeline-board";

export default function PipelinePage() {
  return (
    <CrmPage
      title="Pipeline"
      subtitle="Minimal forecast board — stage spine, weighted totals, and confidence orbits. Hover cards for the aurora edge."
    >
      <PipelineBoard />
    </CrmPage>
  );
}
