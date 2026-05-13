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
      <div className="mx-auto w-full max-w-[1440px] space-y-8 px-4 py-8 sm:px-8">
        {children}
      </div>
    </>
  );
}
