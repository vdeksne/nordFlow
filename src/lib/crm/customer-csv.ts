import Papa from "papaparse";

import { CUSTOMER_PORTFOLIO_COLUMNS } from "./customer-portfolio-columns";
import type { CustomerPortfolio } from "./types";

/** Portfolio fields stored as numbers in `CustomerPortfolio`. */
export const NUMERIC_PORTFOLIO_KEYS = new Set<keyof CustomerPortfolio>([
  "feeEur",
  "firstInvoiceAmountEur",
  "secondInvoiceAmountEur",
  "thirdInvoiceAmountEur",
  "invoiceCheck",
]);

const NUMERIC_KEYS = NUMERIC_PORTFOLIO_KEYS;

/** Extra CSV header aliases (normalized lowercase, collapsed spaces). */
const HEADER_ALIASES: Record<string, keyof CustomerPortfolio> = {
  company: "companyName",
  "company name": "companyName",
  "reg.no": "registrationNumber",
  "reg no": "registrationNumber",
  "reg.no.": "registrationNumber",
  "reg nr": "registrationNumber",
  "nace code": "naceCode",
  "kyc form": "kycForm",
  "id copy": "idCopy",
  "meeting date": "meetingDate",
  "client acceptance complete": "clientAcceptanceComplete",
  "risk level": "riskLevel",
  "contract no": "contractNo",
  "contract no.": "contractNo",
  "contract signed": "contractSigned",
  "contract date": "contractDate",
  "fee, eur": "feeEur",
  "fee eur": "feeEur",
  "1st invoice": "firstInvoicePercent",
  "1st invoice %": "firstInvoicePercent",
  "1st invoice eur": "firstInvoiceAmountEur",
  "2nd invoice": "secondInvoicePercent",
  "2nd invoice %": "secondInvoicePercent",
  "2nd invoice eur": "secondInvoiceAmountEur",
  "3rd invoice": "thirdInvoicePercent",
  "3rd invoice %": "thirdInvoicePercent",
  "3rd invoice eur": "thirdInvoiceAmountEur",
  check: "invoiceCheck",
  "email for invoices": "emailForInvoices",
  "client contact name": "clientContactName",
  "client contact position": "clientContactPosition",
  email: "contactEmail",
  whatsapp: "whatsapp",
  "last contact date": "lastContactDate",
  "info request deadline": "infoRequestDeadline",
  "report draft": "reportDraft",
  "final report": "finalReport",
  language: "language",
  framework: "framework",
  "sanctions check": "sanctionsCheck",
  address: "address",
  lursoft: "lursoft",
  industry: "industry",
  period: "period",
  scope: "scope",
  additional: "additionalInvoicing",
  nr: "nr",
};

function normalizeHeader(h: string) {
  return h.trim().toLowerCase().replace(/\s+/g, " ");
}

function resolveHeaderKey(header: string): keyof CustomerPortfolio | null {
  const n = normalizeHeader(header);
  if (HEADER_ALIASES[n]) {
    return HEADER_ALIASES[n];
  }
  for (const col of CUSTOMER_PORTFOLIO_COLUMNS) {
    if (normalizeHeader(col.label) === n) {
      return col.key;
    }
  }
  return null;
}

function parseCell(
  key: keyof CustomerPortfolio,
  raw: string,
): string | number | null {
  const t = raw.trim();
  if (t === "" || t === "—") {
    return null;
  }
  if (NUMERIC_KEYS.has(key)) {
    const normalized = t.replace(/\u00a0/g, "").replace(/\s/g, "").replace(",", ".");
    const num = Number(normalized);
    return Number.isFinite(num) ? num : null;
  }
  if (key === "nr") {
    const num = Number(t.replace(/\s/g, ""));
    return Number.isFinite(num) ? num : null;
  }
  if (key === "registrationNumber") {
    if (/^\d+$/.test(t.replace(/\s/g, ""))) {
      const num = Number(t.replace(/\s/g, ""));
      return Number.isFinite(num) ? num : t;
    }
    return t;
  }
  return t;
}

export function csvRecordToPartial(
  record: Record<string, string>,
): Partial<CustomerPortfolio> {
  const out: Partial<CustomerPortfolio> = {};
  for (const [header, value] of Object.entries(record)) {
    const key = resolveHeaderKey(header);
    if (!key || key === "id") {
      continue;
    }
    (out as Record<string, unknown>)[key] = parseCell(key, value ?? "");
  }
  return out;
}

export function createEmptyCustomerPortfolio(
  id: string,
  nr: number | null,
): CustomerPortfolio {
  const row: Record<string, unknown> = { id, nr };
  for (const col of CUSTOMER_PORTFOLIO_COLUMNS) {
    if (col.key === "id" || col.key === "nr") {
      continue;
    }
    row[col.key] = null;
  }
  return row as CustomerPortfolio;
}

export function mergeIntoCustomerPortfolio(
  partial: Partial<CustomerPortfolio>,
  id: string,
  nr: number | null,
): CustomerPortfolio {
  const base = createEmptyCustomerPortfolio(id, nr);
  return { ...base, ...partial, id, nr };
}

/** Header row for CSV template / export (English labels). */
export function customerCsvHeaderLine(): string {
  return CUSTOMER_PORTFOLIO_COLUMNS.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(
    ",",
  );
}

export function parseCustomerCsvText(text: string): {
  rows: Partial<CustomerPortfolio>[];
  parseErrors: string[];
} {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => String(h).trim(),
  });
  const parseErrors = result.errors.map((e) =>
    e.message + (e.row !== undefined ? ` (row ${e.row})` : ""),
  );
  const rows = result.data
    .filter(
      (row) =>
        row &&
        Object.values(row).some((v) => String(v ?? "").trim() !== ""),
    )
    .map((record) => csvRecordToPartial(record));
  return { rows, parseErrors };
}
