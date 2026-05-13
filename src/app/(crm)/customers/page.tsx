import { CustomerPortfolioSection } from "@/components/crm/customer-portfolio-section";
import { CrmPage } from "@/components/crm/crm-page";
import { customers } from "@/lib/crm/mock-data";

export default function CustomersPage() {
  return (
    <CrmPage
      title="Klientu portfelis"
      subtitle="Visas kolonnas no «Klientu uzskaites reģistrs» veidlapas (KLIENTU PORTFELIS). Rindiņas ielasītas no jūsu .xlsx parauga. Klikšķiniet uz rindas, lai atvērtu pilnekrāna kartīti."
    >
      <CustomerPortfolioSection rows={customers} />
    </CrmPage>
  );
}
