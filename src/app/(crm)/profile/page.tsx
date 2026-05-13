import { CrmPage } from "@/components/Crm/CrmPage";
import { ProfilePageClient } from "@/components/Crm/ProfilePageClient";

export default function ProfilePage() {
  return (
    <CrmPage
      title="Profile"
      subtitle="Read-only demo identity card. Production would sync from your auth provider."
    >
      <ProfilePageClient />
    </CrmPage>
  );
}
