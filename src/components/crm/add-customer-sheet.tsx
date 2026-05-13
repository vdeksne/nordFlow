"use client";

import { useCallback, useMemo, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NUMERIC_PORTFOLIO_KEYS } from "@/lib/crm/customer-csv";
import { portfolioFieldsByGroup } from "@/lib/crm/customer-portfolio-columns";
import type { CustomerPortfolio } from "@/lib/crm/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { useCustomers } from "./customers-context";

function parseFieldValue(
  key: keyof CustomerPortfolio,
  raw: string,
): string | number | null {
  const t = raw.trim();
  if (t === "") return null;
  if (NUMERIC_PORTFOLIO_KEYS.has(key)) {
    const n = Number(t.replace(/\u00a0/g, "").replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : null;
  }
  if (key === "nr") {
    const n = Number(t.replace(/\s/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  if (key === "registrationNumber") {
    const digits = t.replace(/\s/g, "");
    if (/^\d+$/.test(digits)) {
      const n = Number(digits);
      return Number.isFinite(n) ? n : t;
    }
    return t;
  }
  return t;
}

export function AddCustomerSheet() {
  const { addCustomer } = useCustomers();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const groups = useMemo(() => portfolioFieldsByGroup(), []);

  const resetForm = useCallback(() => {
    setValues({});
    setError(null);
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next) {
        resetForm();
      }
    },
    [resetForm],
  );

  const handleSubmit = useCallback(() => {
    const partial: Partial<CustomerPortfolio> = {};
    for (const g of groups) {
      for (const f of g.fields) {
        if (f.key === "nr" || f.key === "id") continue;
        const raw = values[f.key];
        if (raw === undefined || raw.trim() === "") continue;
        (partial as Record<string, unknown>)[f.key] = parseFieldValue(
          f.key,
          raw,
        );
      }
    }
    if (!String(partial.companyName ?? "").trim()) {
      setError("Company name is required.");
      return;
    }
    addCustomer(partial);
    handleOpenChange(false);
  }, [addCustomer, groups, handleOpenChange, values]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        type="button"
        className={cn(buttonVariants({ variant: "default" }), "gap-1.5")}
      >
        <Plus className="size-4" aria-hidden />
        Add customer
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-3xl"
      >
        <SheetHeader className="border-sidebar-border shrink-0 border-b px-6 py-4">
          <SheetTitle>New customer</SheetTitle>
          <SheetDescription>
            Fill portfolio fields. Only company name is required; everything
            else can stay empty.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue={groups[0]?.title ?? "tab"} className="flex min-h-0 flex-1 flex-col gap-0">
          <div className="border-sidebar-border shrink-0 border-b px-4 pt-2 pb-0">
            <TabsList
              variant="line"
              className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0"
            >
              {groups.map((g) => (
                <TabsTrigger
                  key={g.title}
                  value={g.title}
                  className="data-active:bg-muted shrink-0 rounded-md px-2.5 py-1.5 text-xs"
                >
                  {g.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-0 px-6 py-4">
              {groups.map((g) => (
                <TabsContent
                  key={g.title}
                  value={g.title}
                  className="mt-0 space-y-4 outline-none"
                >
                  {g.fields.map((f) => {
                    if (f.key === "nr") {
                      return null;
                    }
                    return (
                      <div key={f.key} className="space-y-1.5">
                        <label
                          htmlFor={`new-${f.key}`}
                          className={cn(
                            "text-muted-foreground text-xs font-medium",
                            f.key === "companyName" &&
                              "text-foreground font-semibold",
                          )}
                        >
                          {f.label}
                          {f.key === "companyName" ? " *" : ""}
                        </label>
                        <Input
                          id={`new-${f.key}`}
                          value={values[f.key] ?? ""}
                          onChange={(e) =>
                            setValues((prev) => ({
                              ...prev,
                              [f.key]: e.target.value,
                            }))
                          }
                          placeholder="-"
                          autoComplete="off"
                        />
                      </div>
                    );
                  })}
                </TabsContent>
              ))}
            </div>
          </ScrollArea>
        </Tabs>

        {error ? (
          <p className="text-destructive shrink-0 px-6 text-sm">{error}</p>
        ) : null}

        <SheetFooter className="border-sidebar-border shrink-0 flex-row justify-end gap-2 border-t px-6 py-4">
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save customer
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
