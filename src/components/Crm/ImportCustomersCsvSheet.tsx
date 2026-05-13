"use client";

import { useCallback, useRef, useState } from "react";

import { Button, buttonVariants } from "@/components/Ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Ui/Sheet";
import {
  customerCsvHeaderLine,
  parseCustomerCsvText,
} from "@/lib/crm/customer-csv";
import { cn } from "@/lib/utils";
import { FileUp } from "lucide-react";

import { useCustomers } from "./CustomersContext";

function downloadCsvTemplate() {
  const bom = "\ufeff";
  const csv = `${bom}${customerCsvHeaderLine()}\n`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "customers-template.csv";
  a.rel = "noopener";
  a.click();
  URL.revokeObjectURL(url);
}

export function ImportCustomersCsvSheet() {
  const { importCustomers } = useCustomers();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [parsedCount, setParsedCount] = useState(0);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [pendingRows, setPendingRows] = useState<
    ReturnType<typeof parseCustomerCsvText>["rows"]
  >([]);

  const reset = useCallback(() => {
    setStatus(null);
    setParsedCount(0);
    setParseErrors([]);
    setPendingRows([]);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next) reset();
    },
    [reset],
  );

  const handleFile = useCallback((file: File) => {
    setStatus(null);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const { rows, parseErrors: errs } = parseCustomerCsvText(text);
      setPendingRows(rows);
      setParsedCount(rows.length);
      setParseErrors(errs.slice(0, 8));
      if (errs.length > 0) {
        setStatus(
          `Parsed with ${errs.length} parser warning(s). Review messages below.`,
        );
      } else {
        setStatus(
          rows.length === 0
            ? "No data rows found (check headers match the template)."
            : `Ready to import ${rows.length} row(s). Rows without company name will be skipped.`,
        );
      }
    };
    reader.onerror = () => {
      setStatus("Could not read file.");
      setPendingRows([]);
      setParsedCount(0);
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const handleConfirmImport = useCallback(() => {
    if (pendingRows.length === 0) return;
    const { added, skipped } = importCustomers(pendingRows);
    setStatus(`Imported ${added} customer(s). Skipped ${skipped} row(s) without company name.`);
    setPendingRows([]);
    setParsedCount(0);
    if (fileRef.current) fileRef.current.value = "";
  }, [importCustomers, pendingRows]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        type="button"
        className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
      >
        <FileUp className="size-4" aria-hidden />
        Import CSV
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 sm:max-w-lg"
      >
        <SheetHeader className="border-sidebar-border shrink-0 border-b px-6 py-4">
          <SheetTitle>Import customers</SheetTitle>
          <SheetDescription>
            Upload a CSV whose first row matches the portfolio column labels.
            Use “Download template” for the correct headers.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={downloadCsvTemplate}
            >
              Download template
            </Button>
          </div>

          <div className="space-y-2">
            <label htmlFor="crm-csv-import" className="text-sm font-medium">
              CSV file
            </label>
            <input
              ref={fileRef}
              id="crm-csv-import"
              type="file"
              accept=".csv,text/csv"
              className="text-muted-foreground block w-full text-sm file:mr-3 file:rounded-none file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted/80"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>

          {status ? (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {status}
            </p>
          ) : null}

          {parsedCount > 0 && pendingRows.length > 0 ? (
            <p className="text-sm font-medium tabular-nums">
              {parsedCount} row(s) parsed · ready to commit
            </p>
          ) : null}

          {parseErrors.length > 0 ? (
            <ul className="text-destructive list-inside list-disc space-y-1 text-xs">
              {parseErrors.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
              {parseErrors.length >= 8 ? (
                <li className="text-muted-foreground">
                  Further warnings omitted.
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <SheetFooter className="border-sidebar-border shrink-0 flex-row justify-end gap-2 border-t px-6 py-4">
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
          <Button
            type="button"
            variant="solid"
            disabled={pendingRows.length === 0}
            onClick={handleConfirmImport}
          >
            Import now
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
