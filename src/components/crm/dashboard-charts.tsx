"use client";

import { Flame, Orbit, Zap, type LucideIcon } from "lucide-react";
import { useId, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deal, DealStage, Lead } from "@/lib/crm/types";
import { formatEur } from "@/lib/format";

import { useCustomers } from "./customers-context";
import { useTasks } from "./tasks-context";

type DashboardChartsProps = {
  deals: Deal[];
  leads: Lead[];
};

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

const STAGE_ORDER: DealStage[] = [
  "qualification",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

function stageLabel(s: DealStage) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function GlassTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-sidebar-border z-50 rounded-xl border border-white/[0.08] bg-[color-mix(in_oklab,var(--popover)_92%,transparent)] px-3 py-2 text-xs shadow-xl backdrop-blur-xl">
      <p className="text-muted-foreground mb-1 font-medium tracking-wide uppercase">
        {label}
      </p>
      <ul className="space-y-1">
        {payload.map((p, i) => (
          <li key={i} className="flex items-center gap-2 tabular-nums">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: p.color ?? "var(--primary)" }}
              aria-hidden
            />
            <span className="text-foreground font-medium">
              {typeof p.value === "number" ? formatEur(Math.round(p.value)) : p.value}
            </span>
            <span className="text-muted-foreground">{p.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GaugeRing({
  value,
  label,
  hint,
  icon: Icon,
}: {
  value: number;
  label: string;
  hint: string;
  icon: LucideIcon;
}) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const dash = c * (1 - pct / 100);

  return (
    <div className="relative flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-4 text-center">
      <div
        className="text-primary relative size-[92px] shrink-0"
        role="img"
        aria-label={`${label} ${pct} percent`}
      >
        <svg className="-rotate-90 size-full" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            className="stroke-white/[0.06]"
            strokeWidth="8"
          />
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={dash}
            style={{
              filter:
                "drop-shadow(0 0 8px color-mix(in oklab, var(--primary) 45%, transparent))",
            }}
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0">
          <Icon className="text-primary/90 mb-0.5 size-5" aria-hidden />
          <span className="text-foreground text-lg font-semibold tabular-nums">
            {pct}
          </span>
          <span className="text-muted-foreground text-[9px] font-semibold tracking-wide uppercase">
            pts
          </span>
        </span>
      </div>
      <p className="text-foreground text-[11px] font-semibold tracking-tight">
        {label}
      </p>
      <p className="text-muted-foreground max-w-[10rem] text-[10px] leading-snug">
        {hint}
      </p>
    </div>
  );
}

export function DashboardCharts({ deals, leads }: DashboardChartsProps) {
  const { customers } = useCustomers();
  const { tasks } = useTasks();
  const gid = useId().replace(/:/g, "");

  const portfolioFees = useMemo(
    () => customers.reduce((s, c) => s + (c.feeEur ?? 0), 0),
    [customers],
  );

  const {
    openPipeline,
    weightedOpen,
    wonSum,
    pipelineByStage,
    pieSlices,
    trajectory,
    leadFunnel,
    executionScore,
    winMixScore,
    funnelHeatScore,
  } = useMemo(() => {
    const open = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
    const weighted = open.reduce(
      (s, d) => s + d.valueEur * (d.probability / 100),
      0,
    );
    const won = deals
      .filter((d) => d.stage === "won")
      .reduce((s, d) => s + d.valueEur, 0);

    const byStage = STAGE_ORDER.filter((s) => s !== "won" && s !== "lost").map(
      (stage) => ({
        stage: stageLabel(stage),
        key: stage,
        value: open
          .filter((d) => d.stage === stage)
          .reduce((s, d) => s + d.valueEur, 0),
        weighted: open
          .filter((d) => d.stage === stage)
          .reduce((s, d) => s + d.valueEur * (d.probability / 100), 0),
      }),
    );

    const leadTotal = leads.reduce((s, l) => s + l.valueEur, 0);

    const pie = [
      {
        name: "Booked wins",
        value: Math.max(0, won),
      },
      {
        name: "Recurring fees",
        value: Math.max(0, portfolioFees),
      },
      {
        name: "Weighted pipeline",
        value: Math.max(0, Math.round(weighted)),
      },
      {
        name: "Lead upside",
        value: Math.max(0, leadTotal),
      },
    ].filter((p) => p.value > 0);

    const secured = portfolioFees + won;
    const peak = secured + weighted + leadTotal * 0.35;
    const steps = 10;
    const trajectoryRows = Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1);
      const ease = 1 - Math.pow(1 - t, 2.35);
      const wave = 0.06 * Math.sin(i * 0.85);
      return {
        step: i === 0 ? "Today" : `${i}`,
        upside: Math.round(secured + (peak - secured) * ease * (1 + wave)),
        runway: Math.round(secured + weighted * ease * 0.92),
      };
    });

    const stageOrder: Lead["stage"][] = ["new", "contacted", "qualified", "lost"];
    const funnel = stageOrder
      .filter((s) => s !== "lost")
      .map((stage) => {
        const subset = leads.filter((l) => l.stage === stage);
        return {
          stage: stage.charAt(0).toUpperCase() + stage.slice(1),
          count: subset.length,
          value: subset.reduce((s, l) => s + l.valueEur, 0),
        };
      });

    const doneTasks = tasks.filter((t) => t.done).length;
    const executionScore = tasks.length
      ? Math.round((doneTasks / tasks.length) * 100)
      : 72;

    const winMixScore =
      deals.length > 0
        ? Math.round(
            (deals.filter((d) => d.stage === "won").length / deals.length) * 100,
          )
        : 0;

    const qualified = leads.filter((l) => l.stage === "qualified").length;
    const funnelHeatScore =
      leads.length > 0 ? Math.round((qualified / leads.length) * 100) : 55;

    return {
      openPipeline: open,
      weightedOpen: weighted,
      wonSum: won,
      pipelineByStage: byStage,
      pieSlices: pie,
      trajectory: trajectoryRows,
      leadFunnel: funnel,
      executionScore,
      winMixScore,
      funnelHeatScore,
    };
  }, [deals, leads, portfolioFees, tasks]);

  const pieData =
    pieSlices.length > 0
      ? pieSlices
      : [{ name: "Feed your funnel", value: 1 }];

  const axisTick = {
    fill: "var(--muted-foreground)",
    fontSize: 10,
    opacity: 0.85,
  };

  return (
    <section className="space-y-6">
      <div className="border-sidebar-border relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_82%,transparent)] p-6 backdrop-blur-md md:p-8">
        <div className="pipeline-deal-aurora pointer-events-none absolute -top-[60%] left-1/2 h-[180%] w-[140%] -translate-x-1/2 opacity-[0.35] blur-3xl" />
        <div className="relative space-y-2">
          <p className="text-primary text-[10px] font-semibold tracking-[0.28em] uppercase">
            Momentum cockpit
          </p>
          <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
            See the upside you&apos;re building, then push one more deal forward.
          </h2>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            Composition of booked revenue, recurring portfolio, probability-weighted
            pipeline, and fresh leads. Charts blend mock CRM rows with your live
            customers & tasks so the board feels personal.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="border-sidebar-border lg:col-span-8 overflow-hidden border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] shadow-none backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Upside trajectory
            </CardTitle>
            <CardDescription>
              Two curves: optimistic stretch toward combined potential vs a
              conservative runway anchored on weighted deals.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-2 pr-2 pb-4 pl-0">
            <ResponsiveContainer width="100%" height={292} minWidth={0}>
              <AreaChart
                data={trajectory}
                margin={{ top: 12, right: 12, left: 4, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`${gid}-up`} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.55}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id={`${gid}-run`} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 8"
                  stroke="rgb(148 163 184 / 0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="step"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={{ stroke: "rgb(148 163 184 / 0.12)" }}
                />
                <YAxis
                  tickFormatter={(v) =>
                    v >= 1_000_000
                      ? `€${(v / 1_000_000).toFixed(1)}M`
                      : `€${Math.round(v / 1000)}k`
                  }
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                />
                <Tooltip content={<GlassTooltip />} cursor={{ strokeDasharray: "4 4" }} />
                <Area
                  type="monotone"
                  dataKey="upside"
                  name="Stretch potential"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill={`url(#${gid}-up)`}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="runway"
                  name="Weighted runway"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  fill={`url(#${gid}-run)`}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-sidebar-border lg:col-span-4 flex flex-col border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] shadow-none backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Revenue mix
            </CardTitle>
            <CardDescription>
              Where value sits today, wins, fees, forecast, lead funnel.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[280px] flex-1 flex-col items-center justify-center pt-2">
            <div className="h-[220px] w-full min-w-0">
              <ResponsiveContainer width="100%" height={220} minWidth={0}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                    stroke="transparent"
                  >
                    {pieData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                        className="stroke-white/[0.04]"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<GlassTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {pieSlices.length > 0 ? (
              <ul className="mt-2 grid w-full gap-2 text-[11px]">
                {pieSlices.map((p, i) => (
                  <li
                    key={p.name}
                    className="text-muted-foreground flex items-center justify-between gap-2"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{
                          background: CHART_COLORS[i % CHART_COLORS.length],
                        }}
                      />
                      {p.name}
                    </span>
                    <span className="text-foreground font-semibold tabular-nums">
                      {formatEur(Math.round(p.value))}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground mt-3 px-2 text-center text-xs leading-relaxed">
                Layer wins, portfolio fees, and pipeline rows, your donut fills in
                automatically.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-sidebar-border lg:col-span-6 border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] shadow-none backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Open pipeline · raw value
            </CardTitle>
            <CardDescription>
              Stage bars sized by deal value, chase the fat bars first.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px] min-w-0 pt-2">
            <ResponsiveContainer width="100%" height={272} minWidth={0}>
              <BarChart
                data={pipelineByStage}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="4 8"
                  stroke="rgb(148 163 184 / 0.08)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tickFormatter={(v) =>
                    v >= 1_000_000
                      ? `€${(v / 1_000_000).toFixed(1)}M`
                      : `€${Math.round(v / 1000)}k`
                  }
                  tick={axisTick}
                  tickLine={false}
                  axisLine={{ stroke: "rgb(148 163 184 / 0.12)" }}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  width={92}
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgb(148 163 184 / 0.06)" }} />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} maxBarSize={28}>
                  {pipelineByStage.map((_, i) => (
                    <Cell
                      key={i}
                      fill={CHART_COLORS[i % CHART_COLORS.length]}
                      className="opacity-95"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-sidebar-border lg:col-span-6 border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] shadow-none backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Lead funnel heat
            </CardTitle>
            <CardDescription>
              Count & attach value, warm up everything below “Qualified”.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px] min-w-0 pt-2">
            <ResponsiveContainer width="100%" height={272} minWidth={0}>
              <BarChart
                data={leadFunnel}
                margin={{ top: 12, right: 12, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="4 8"
                  stroke="rgb(148 163 184 / 0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="stage"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={{ stroke: "rgb(148 163 184 / 0.12)" }}
                />
                <YAxis
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={36}
                />
                <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgb(148 163 184 / 0.06)" }} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={52}>
                  {leadFunnel.map((_, i) => (
                    <Cell
                      key={i}
                      fill={CHART_COLORS[(i + 1) % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-sidebar-border lg:col-span-12 border-white/[0.06] bg-[color-mix(in_oklab,var(--card)_88%,transparent)] shadow-none backdrop-blur-md">
          <CardHeader className="flex flex-col gap-1 pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight">
                Execution orbits
              </CardTitle>
              <CardDescription>
                Gamified scores from tasks, win mix, and qualification density.
                Close the loop to push these rings wider.
              </CardDescription>
            </div>
            <p className="text-primary text-[10px] font-semibold tracking-[0.2em] uppercase">
              Push · convert · compound
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <GaugeRing
                value={executionScore}
                label="Task velocity"
                hint="Done vs total, ship small completions daily."
                icon={Zap}
              />
              <GaugeRing
                value={winMixScore}
                label="Win mix"
                hint="Share of deals already won, defend & expand."
                icon={Flame}
              />
              <GaugeRing
                value={funnelHeatScore}
                label="Qualification heat"
                hint="Qualified share of leads, tighten handoffs."
                icon={Orbit}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-muted-foreground/80 text-center text-[10px] tracking-[0.14em] uppercase">
        Booked wins · {formatEur(Math.round(wonSum))} · Weighted open ·{" "}
        {formatEur(Math.round(weightedOpen))} · {openPipeline.length} active deals ·
        Fees {formatEur(Math.round(portfolioFees))}
      </p>
    </section>
  );
}
