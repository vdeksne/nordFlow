export type LeadStage = "new" | "contacted" | "qualified" | "lost";

export type Lead = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  stage: LeadStage;
  valueEur: number;
  owner: string;
  updatedAt: string;
};

/** Mirrors the CLIENT PORTFOLIO sheet column layout (spreadsheet template). */
export type CustomerPortfolio = {
  id: string;
  nr: number | null;
  companyName: string | null;
  registrationNumber: string | number | null;
  lursoft: string | null;
  industry: string | null;
  naceCode: string | null;
  kycForm: string | null;
  idCopy: string | null;
  meetingDate: string | null;
  clientAcceptanceComplete: string | null;
  riskLevel: string | null;
  contractNo: string | null;
  period: string | null;
  contractSigned: string | null;
  contractDate: string | null;
  scope: string | null;
  feeEur: number | null;
  firstInvoicePercent: string | null;
  firstInvoiceAmountEur: number | null;
  secondInvoicePercent: string | null;
  secondInvoiceAmountEur: number | null;
  thirdInvoicePercent: string | null;
  thirdInvoiceAmountEur: number | null;
  additionalInvoicing: string | null;
  invoiceCheck: number | null;
  emailForInvoices: string | null;
  clientContactName: string | null;
  clientContactPosition: string | null;
  contactEmail: string | null;
  whatsapp: string | null;
  lastContactDate: string | null;
  infoRequestDeadline: string | null;
  reportDraft: string | null;
  finalReport: string | null;
  language: string | null;
  framework: string | null;
  sanctionsCheck: string | null;
  address: string | null;
};

export type DealStage =
  | "qualification"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type Deal = {
  id: string;
  title: string;
  company: string;
  stage: DealStage;
  valueEur: number;
  probability: number;
  closeDate: string;
  owner: string;
};

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  relatedTo: string;
  dueAt: string;
  priority: TaskPriority;
  done: boolean;
  assignee: string;
};
