import { CrmPage } from "@/components/Crm/CrmPage";
import { TasksBoard } from "@/components/Crm/TasksBoard";

export default function TasksPage() {
  return (
    <CrmPage
      title="Tasks"
      subtitle="Minimal focus board with priority lanes and due clarity. Tick wins and stay ahead of the queue."
    >
      <TasksBoard />
    </CrmPage>
  );
}
