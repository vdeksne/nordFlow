"use client";

import {
  ArrowUpRight,
  Briefcase,
  Gauge,
  Orbit,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { CrmPage } from "@/components/Crm/CrmPage";
import { DashboardCharts } from "@/components/Crm/DashboardCharts";
import { DashboardPrioritiesSection } from "@/components/Crm/DashboardPriorities";
import { useDeals } from "@/components/Crm/DealsContext";
import { useLeads } from "@/components/Crm/LeadsContext";
import { OpenTasksStatCard } from "@/components/Crm/OpenTasksStatCard";
import { PortfolioFeesStatCard } from "@/components/Crm/PortfolioFeesStatCard";
import { StatCard } from "@/components/Crm/StatCard";
import { Badge } from "@/components/Ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Ui/Table";
import { formatEur } from "@/lib/format";

export function DashboardPageClient() {
  const { deals } = useDeals();
  const { leads } = useLeads();

  const openPipeline = deals.filter(
    (d) => d.stage !== "won" && d.stage !== "lost",
  );
  const pipelineValue = openPipeline.reduce((sum, d) => sum + d.valueEur, 0);
  const weightedPipeline = openPipeline.reduce(
    (sum, d) => sum + d.valueEur * (d.probability / 100),
    0,
  );

  const spotlight = [...leads]
    .sort((a, b) => b.valueEur - a.valueEur)
    .slice(0, 4);

  return (
    <CrmPage
      title="Executive overview"
      subtitle="Your NordFlow command center, crush the top three tasks first, then ride pipeline heat and funnel charts."
    >
      <DashboardPrioritiesSection />

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-chart-3/15 text-chart-4 inline-flex size-9 items-center justify-center rounded-full ring-1 ring-white/[0.08]">
              <Orbit className="text-primary size-5" aria-hidden />
            </span>
            <div>
              <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.22em] uppercase">
                Live KPIs
              </p>
              <p className="text-foreground text-base font-semibold tracking-tight">
                Signals & velocity
              </p>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Weighted pipeline"
            value={formatEur(Math.round(weightedPipeline))}
            hint="Probability-adjusted across open stages."
            icon={TrendingUp}
            trend={{ label: `${openPipeline.length} active deals`, positive: true }}
            className="border-white/[0.07]"
          />
          <PortfolioFeesStatCard />
          <StatCard
            title="Qualified leads"
            value={`${leads.filter((l) => l.stage === "qualified").length}/${leads.length}`}
            hint="Marketing → Sales handoffs."
            icon={Sparkles}
            trend={{ label: "Sync leads table in Supabase", positive: true }}
            className="border-white/[0.07]"
          />
          <OpenTasksStatCard />
        </section>
      </div>

      <DashboardCharts deals={deals} leads={leads} />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="border-white/[0.07] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] backdrop-blur-md">
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">
                Pipeline spotlight
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Highest-value motions currently in flight.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="rounded-none">
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
          <Card className="border-white/[0.07] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] backdrop-blur-md">
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
              <div className="flex items-start justify-between gap-3 rounded-none border border-sidebar-border bg-muted/35 px-4 py-3">
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
              <div className="rounded-none border border-sidebar-border bg-muted/20 px-4 py-3">
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

          <Card className="border-white/[0.07] bg-[color-mix(in_oklab,var(--card)_82%,transparent)] backdrop-blur-md">
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
                  className="flex items-center justify-between rounded-none border border-white/[0.06] bg-gradient-to-r from-primary/[0.06] to-transparent px-3 py-2.5 transition-colors hover:border-primary/20"
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
