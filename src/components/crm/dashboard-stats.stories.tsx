import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListTodo, Sparkles, TrendingUp, Users } from "lucide-react";

import { StatCard } from "./stat-card";
import { customers, deals, leads, tasks } from "@/lib/crm/mock-data";
import { formatEur } from "@/lib/format";

function DashboardStatsDemo() {
  const openPipeline = deals.filter(
    (d) => d.stage !== "won" && d.stage !== "lost",
  );
  const weightedPipeline = openPipeline.reduce(
    (sum, d) => sum + d.valueEur * (d.probability / 100),
    0,
  );
  const openTasks = tasks.filter((t) => !t.done).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Weighted pipeline"
        value={formatEur(Math.round(weightedPipeline))}
        hint="Probability-adjusted across open stages."
        icon={TrendingUp}
        trend={{ label: `${openPipeline.length} active deals`, positive: true }}
      />
      <StatCard
        title="Portfolio fees (EUR)"
        value={formatEur(
          customers.reduce((s, c) => s + (c.feeEur ?? 0), 0),
        )}
        hint={`${customers.length} klientu kartītes · līgumu maksa`}
        icon={Users}
      />
      <StatCard
        title="Qualified leads"
        value={`${leads.filter((l) => l.stage === "qualified").length}/${leads.length}`}
        hint="Marketing → Sales handoffs."
        icon={Sparkles}
        trend={{ label: "Sync leads table in Supabase", positive: true }}
      />
      <StatCard
        title="Follow-ups due"
        value={`${openTasks}`}
        hint="Tasks still marked incomplete."
        icon={ListTodo}
        trend={{ label: "Assign owners from Tasks module", positive: false }}
      />
    </div>
  );
}

const meta = {
  title: "CRM/Dashboard stats grid",
  component: DashboardStatsDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardStatsDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FourTiles: Story = {
  render: () => <DashboardStatsDemo />,
};
