"use client";

import { ListTodo } from "lucide-react";

import { StatCard } from "@/components/Crm/StatCard";

import { useTasks } from "./TasksContext";

export function OpenTasksStatCard() {
  const { tasks } = useTasks();
  const openTasks = tasks.filter((t) => !t.done).length;

  return (
    <StatCard
      title="Follow-ups due"
      value={`${openTasks}`}
      hint="Tasks still marked incomplete."
      icon={ListTodo}
      trend={{ label: "Assign owners from Tasks module", positive: false }}
    />
  );
}
