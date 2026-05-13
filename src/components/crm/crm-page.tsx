import { TopBar } from "@/components/crm/top-bar";

type CrmPageProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function CrmPage({ title, subtitle, children }: CrmPageProps) {
  return (
    <>
      <TopBar title={title} subtitle={subtitle} />
      <div className="mx-auto w-full max-w-[1440px] space-y-6 px-4 pt-5 pb-16 sm:space-y-8 sm:px-8 sm:pt-8 sm:pb-12">
        {children}
      </div>
    </>
  );
}
