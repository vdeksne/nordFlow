import { CrmPage } from "@/components/crm/crm-page";
import { TasksBoard } from "@/components/crm/tasks-board";

export default function TasksPage() {
  return (
    <CrmPage
      title="Tasks"
      subtitle="Minimal focus board — glow cards, momentum orbit, and a calm spine. Tick wins; hover for the aurora edge."
    >
      <TasksBoard />
    </CrmPage>
  );
}
