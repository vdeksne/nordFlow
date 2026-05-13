import { AppSidebar } from "@/components/crm/app-sidebar";
import { MobileNav } from "@/components/crm/mobile-nav";

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
