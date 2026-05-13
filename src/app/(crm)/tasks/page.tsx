import { CrmPage } from "@/components/crm/crm-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { tasks } from "@/lib/crm/mock-data";
import type { TaskPriority } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

function priorityBadge(priority: TaskPriority) {
  if (priority === "high") {
    return (
      <Badge variant="destructive" className="rounded-full uppercase">
        High
      </Badge>
    );
  }
  if (priority === "medium") {
    return (
      <Badge variant="secondary" className="rounded-full uppercase">
        Medium
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="rounded-full uppercase">
      Low
    </Badge>
  );
}

export default function TasksPage() {
  const upcoming = [...tasks].sort(
    (a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime(),
  );

  return (
    <CrmPage
      title="Tasks & follow-ups"
      subtitle="Operational cadence for reps — tie each task back to revenue objects."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {upcoming.map((task) => (
            <Card
              key={task.id}
              className={cn(
                "border-sidebar-border bg-card/90 shadow-none",
                task.done && "opacity-70",
              )}
            >
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {priorityBadge(task.priority)}
                    {task.done ? (
                      <Badge variant="outline" className="rounded-full">
                        Done
                      </Badge>
                    ) : (
                      <Badge variant="default" className="rounded-full">
                        Open
                      </Badge>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-lg font-semibold tracking-tight",
                      task.done && "text-muted-foreground line-through",
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-muted-foreground text-sm">{task.relatedTo}</p>
                </div>
                <div className="text-muted-foreground flex shrink-0 flex-col gap-1 text-sm sm:text-right">
                  <span className="text-foreground font-medium">
                    {new Intl.DateTimeFormat("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(task.dueAt))}
                  </span>
                  <span>{task.assignee}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-sidebar-border bg-card/85 h-fit shadow-none">
          <CardContent className="space-y-4 p-6">
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Playbook
              </p>
              <p className="mt-2 text-lg font-semibold">Daily rhythm</p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Block thirty minutes for proactive touches. Completed tasks roll
                into Supabase activity feeds once connected.
              </p>
            </div>
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Open</span>
                <span className="font-semibold">
                  {tasks.filter((t) => !t.done).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Closed</span>
                <span className="font-semibold">
                  {tasks.filter((t) => t.done).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CrmPage>
  );
}
