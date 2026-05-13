import { AiAssistantDock } from "@/components/Crm/AiAssistant";
import { AppSidebar } from "@/components/Crm/AppSidebar";
import { CustomersProvider } from "@/components/Crm/CustomersContext";
import { DealsProvider } from "@/components/Crm/DealsContext";
import { LeadsProvider } from "@/components/Crm/LeadsContext";
import { MobileNav } from "@/components/Crm/MobileNav";
import { ProfileProvider } from "@/components/Crm/ProfileContext";
import { TasksProvider } from "@/components/Crm/TasksContext";

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
