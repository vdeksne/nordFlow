import { CrmPage } from "@/components/crm/crm-page";
import { ProfilePageClient } from "@/components/crm/profile-page-client";

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
