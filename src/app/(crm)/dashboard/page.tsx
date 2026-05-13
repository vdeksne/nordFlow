import {
  ArrowUpRight,
  Briefcase,
  Gauge,
  ListTodo,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { CrmPage } from "@/components/crm/crm-page";
import { StatCard } from "@/components/crm/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { customers, deals, leads, tasks } from "@/lib/crm/mock-data";
import { formatEur } from "@/lib/format";

export default function DashboardPage() {
  const openPipeline = deals.filter(
    (d) => d.stage !== "won" && d.stage !== "lost",
  );
  const pipelineValue = openPipeline.reduce((sum, d) => sum + d.valueEur, 0);
  const weightedPipeline = openPipeline.reduce(
    (sum, d) => sum + d.valueEur * (d.probability / 100),
    0,
  );
  const openTasks = tasks.filter((t) => !t.done).length;

  const spotlight = [...leads]
    .sort((a, b) => b.valueEur - a.valueEur)
    .slice(0, 4);

  return (
    <CrmPage
      title="Executive overview"
      subtitle="Live pulse across pipeline velocity, active leads, and customer health — wired for Supabase when you connect credentials."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="border-sidebar-border bg-card/85 shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">
                Pipeline spotlight
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Highest-value motions currently in flight.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="rounded-full">
              <Briefcase className="mr-1" aria-hidden />
              Deals
            </Badge>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            <Table>
              <TableHeader>
                <TableRow className="border-sidebar-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground px-6">
                    Deal
                  </TableHead>
                  <TableHead className="text-muted-foreground">Stage</TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Value
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Close
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openPipeline.map((deal) => (
                  <TableRow
                    key={deal.id}
                    className="border-sidebar-border hover:bg-muted/35"
                  >
                    <TableCell className="px-6 font-medium">
                      <div className="flex flex-col gap-0.5">
                        <span>{deal.title}</span>
                        <span className="text-muted-foreground text-xs">
                          {deal.company}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{deal.stage}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatEur(deal.valueEur)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right text-sm">
                      {deal.closeDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-sidebar-border bg-card/85 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Gauge className="text-primary size-5" aria-hidden />
                Velocity signals
              </CardTitle>
              <CardDescription>
                Narrative metrics your leadership reviews each Monday.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start justify-between gap-3 rounded-xl border border-sidebar-border bg-muted/35 px-4 py-3">
                <div>
                  <p className="text-muted-foreground text-xs uppercase">
                    Raw pipeline
                  </p>
                  <p className="text-lg font-semibold tracking-tight">
                    {formatEur(pipelineValue)}
                  </p>
                </div>
                <ArrowUpRight className="text-primary size-5 shrink-0" />
              </div>
              <div className="rounded-xl border border-sidebar-border bg-muted/20 px-4 py-3">
                <p className="text-muted-foreground text-xs uppercase">
                  Coverage
                </p>
                <p className="mt-1 leading-relaxed">
                  Every module maps cleanly to Supabase tables (`customers`,
                  `leads`, `deals`, `tasks`). Swap mock imports for queries when
                  your schema is ready.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sidebar-border bg-card/85 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Lead accelerators
              </CardTitle>
              <CardDescription>Largest funnel candidates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {spotlight.map((lead) => (
                <div
                  key={lead.id}
                  className="border-sidebar-border flex items-center justify-between rounded-xl border bg-muted/25 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{lead.company}</p>
                    <p className="text-muted-foreground text-xs capitalize">
                      {lead.stage} · {lead.owner.split(" ")[0]}
                    </p>
                  </div>
                  <span className="text-primary text-sm font-semibold tabular-nums">
                    {formatEur(lead.valueEur)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </CrmPage>
  );
}
