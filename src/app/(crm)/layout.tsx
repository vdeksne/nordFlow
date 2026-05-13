import { AiAssistantDock } from "@/components/crm/ai-assistant";
import { AppSidebar } from "@/components/crm/app-sidebar";
import { CustomersProvider } from "@/components/crm/customers-context";
import { DealsProvider } from "@/components/crm/deals-context";
import { LeadsProvider } from "@/components/crm/leads-context";
import { MobileNav } from "@/components/crm/mobile-nav";
import { ProfileProvider } from "@/components/crm/profile-context";
import { TasksProvider } from "@/components/crm/tasks-context";

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomersProvider>
      <ProfileProvider>
        <LeadsProvider>
          <DealsProvider>
            <TasksProvider>
              <div className="flex min-h-screen">
                <div className="hidden w-[260px] shrink-0 lg:block">
                  <div className="border-sidebar-border fixed inset-y-0 left-0 w-[260px] border-r border-white/[0.04]">
                    <AppSidebar />
                  </div>
                </div>
                <div className="bg-background flex min-h-screen flex-1 flex-col">
                  <MobileNav />
                  {children}
                </div>
              </div>
              <AiAssistantDock />
            </TasksProvider>
          </DealsProvider>
        </LeadsProvider>
      </ProfileProvider>
    </CustomersProvider>
  );
}
