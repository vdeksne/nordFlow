import type { TaskPriority } from "@/lib/crm/types";

export function defaultDueIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d.toISOString();
}

export function toDatetimeLocalValue(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromDatetimeLocalValue(local: string) {
  return new Date(local).toISOString();
}

export const TASK_PRIORITY_OPTIONS: {
  value: TaskPriority;
  label: string;
  hint: string;
}[] = [
  { value: "high", label: "Peak", hint: "High" },
  { value: "medium", label: "Steady", hint: "Medium" },
  { value: "low", label: "Easy", hint: "Low" },
];
