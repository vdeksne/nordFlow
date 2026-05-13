"use client";

import { AddLeadSheet } from "@/components/Crm/AddLeadSheet";
import { useLeads } from "@/components/Crm/LeadsContext";
import { Badge } from "@/components/Ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Ui/Table";
import type { LeadStage } from "@/lib/crm/types";
import { formatEur } from "@/lib/format";

function stageBadge(stage: LeadStage) {
  const label =
    stage === "new"
      ? "New"
      : stage === "contacted"
        ? "Contacted"
        : stage === "qualified"
          ? "Qualified"
          : "Lost";

  if (stage === "qualified") {
    return (
      <Badge variant="default" className="rounded-none">
        {label}
      </Badge>
    );
  }
  if (stage === "lost") {
    return (
      <Badge variant="destructive" className="rounded-none">
        {label}
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="rounded-none">
      {label}
    </Badge>
  );
}

export function LeadsPageClient() {
  const { leads } = useLeads();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <AddLeadSheet />
      </div>
      <div className="border-sidebar-border overflow-hidden rounded-none border bg-card/90">
        <Table>
          <TableHeader>
            <TableRow className="border-sidebar-border hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6">
                Company
              </TableHead>
              <TableHead className="text-muted-foreground">Contact</TableHead>
              <TableHead className="text-muted-foreground">Stage</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Est. value
              </TableHead>
              <TableHead className="text-muted-foreground">Owner</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Updated
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="border-sidebar-border hover:bg-muted/40"
              >
                <TableCell className="px-6 font-medium">{lead.company}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5 text-sm">
                    <span>{lead.contactName}</span>
                    <span className="text-muted-foreground text-xs">
                      {lead.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{stageBadge(lead.stage)}</TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {formatEur(lead.valueEur)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {lead.owner}
                </TableCell>
                <TableCell className="text-muted-foreground text-right text-sm tabular-nums">
                  {lead.updatedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
