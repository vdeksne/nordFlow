import { CustomersPageClient } from "@/components/crm/customers-page-client";
import { CrmPage } from "@/components/crm/crm-page";

export default function CustomersPage() {
  return (
    <CrmPage
      title="Klientu portfelis"
      subtitle="Visas kolonnas no «Klientu uzskaites reģistrs» veidlapas (KLIENTU PORTFELIS). Pievienojiet klientus vai importējiet CSV. Klikšķiniet uz rindas, lai atvērtu pilnekrāna kartīti."
    >
      <CustomersPageClient />
    </CrmPage>
  );
}
