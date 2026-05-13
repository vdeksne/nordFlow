import type { CustomerPortfolio } from "./types";

/** Row 1 merged headers, spreadsheet portfolio template layout */
export const CUSTOMER_PORTFOLIO_HEADER_GROUPS = [
  { title: "Company info", span: 6 },
  { title: "Client identification (KYC)", span: 5 },
  { title: "Contracting", span: 6 },
  { title: "Invoicing", span: 9 },
  { title: "Contact", span: 5 },
  { title: "Deadlines", span: 3 },
  { title: "Other", span: 4 },
] as const;

export type PortfolioColumnDef = {
  key: keyof CustomerPortfolio;
  label: string;
  format?: "eur";
  sticky?: "nr" | "company";
};

/** Column keys in spreadsheet order (38 columns; excludes internal id). */
export const CUSTOMER_PORTFOLIO_COLUMNS: readonly PortfolioColumnDef[] = [
  { key: "nr", label: "Nr.", sticky: "nr" },
  { key: "companyName", label: "Company name", sticky: "company" },
  { key: "registrationNumber", label: "Reg.No." },
  { key: "lursoft", label: "Lursoft" },
  { key: "industry", label: "Industry" },
  { key: "naceCode", label: "NACE code" },
  { key: "kycForm", label: "KYC form" },
  { key: "idCopy", label: "ID copy" },
  { key: "meetingDate", label: "Meeting date" },
  { key: "clientAcceptanceComplete", label: "Client acceptance complete" },
  { key: "riskLevel", label: "Risk level" },
  { key: "contractNo", label: "Contract No." },
  { key: "period", label: "Period" },
  { key: "contractSigned", label: "Contract signed" },
  { key: "contractDate", label: "Contract date" },
  { key: "scope", label: "Scope" },
  { key: "feeEur", label: "Fee, EUR", format: "eur" },
  { key: "firstInvoicePercent", label: "1st invoice %" },
  { key: "firstInvoiceAmountEur", label: "1st invoice EUR", format: "eur" },
  { key: "secondInvoicePercent", label: "2nd invoice %" },
  { key: "secondInvoiceAmountEur", label: "2nd invoice EUR", format: "eur" },
  { key: "thirdInvoicePercent", label: "3rd invoice %" },
  { key: "thirdInvoiceAmountEur", label: "3rd invoice EUR", format: "eur" },
  { key: "additionalInvoicing", label: "Additional" },
  { key: "invoiceCheck", label: "CHECK" },
  { key: "emailForInvoices", label: "Email for invoices" },
  { key: "clientContactName", label: "Client contact name" },
  { key: "clientContactPosition", label: "Client contact position" },
  { key: "contactEmail", label: "Email" },
  { key: "whatsapp", label: "Whatsapp" },
  { key: "lastContactDate", label: "Last contact date" },
  { key: "infoRequestDeadline", label: "Info request deadline" },
  { key: "reportDraft", label: "Report draft" },
  { key: "finalReport", label: "Final report" },
  { key: "language", label: "Language" },
  { key: "framework", label: "Framework" },
  { key: "sanctionsCheck", label: "Sanctions check" },
  { key: "address", label: "Address" },
];

export function portfolioGroupAt(columnIndex: number): string {
  let idx = 0;
  for (const g of CUSTOMER_PORTFOLIO_HEADER_GROUPS) {
    if (columnIndex < idx + g.span) {
      return g.title;
    }
    idx += g.span;
  }
  return "";
}

export function portfolioFieldsByGroup(): {
  title: string;
  fields: readonly PortfolioColumnDef[];
}[] {
  let offset = 0;
  return CUSTOMER_PORTFOLIO_HEADER_GROUPS.map((g) => {
    const fields = CUSTOMER_PORTFOLIO_COLUMNS.slice(offset, offset + g.span);
    offset += g.span;
    return { title: g.title, fields };
  });
}

export function portfolioCellValue(
  row: CustomerPortfolio,
  col: PortfolioColumnDef,
  formatEur: (n: number) => string,
): string {
  const raw = row[col.key];
  if (raw === null || raw === undefined) {
    return "-";
  }
  if (typeof raw === "number") {
    if (col.format === "eur") {
      return formatEur(raw);
    }
    return String(raw);
  }
  const s = String(raw).trim();
  return s === "" ? "-" : s;
}

/** Raw field has a non-empty stored value (before display formatting). */
export function portfolioColumnHasValue(
  row: CustomerPortfolio,
  col: PortfolioColumnDef,
): boolean {
  const raw = row[col.key];
  if (raw === null || raw === undefined) return false;
  if (typeof raw === "number") return true;
  return String(raw).trim() !== "";
}

const ALWAYS_VISIBLE_PORTFOLIO_KEYS = new Set<keyof CustomerPortfolio>([
  "nr",
  "companyName",
  "registrationNumber",
]);

/** Header group title for a column definition (spreadsheet layout order). */
export function portfolioGroupTitleForColumn(col: PortfolioColumnDef): string {
  const idx = CUSTOMER_PORTFOLIO_COLUMNS.indexOf(col);
  return idx === -1 ? "" : portfolioGroupAt(idx);
}

/**
 * Columns to show in the portfolio table: core identifiers plus any column
 * that has at least one non-empty value in `rows`.
 */
export function visibleCustomerPortfolioColumns(
  rows: CustomerPortfolio[],
): PortfolioColumnDef[] {
  if (rows.length === 0) {
    return CUSTOMER_PORTFOLIO_COLUMNS.filter((c) =>
      ALWAYS_VISIBLE_PORTFOLIO_KEYS.has(c.key),
    );
  }
  return CUSTOMER_PORTFOLIO_COLUMNS.filter(
    (col) =>
      ALWAYS_VISIBLE_PORTFOLIO_KEYS.has(col.key) ||
      rows.some((row) => portfolioColumnHasValue(row, col)),
  );
}
